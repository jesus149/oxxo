import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
    selector: 'creacionMantenimientoUDAs-cmp',
    templateUrl: 'creacionMantenimientoUDAs.component.html',
    styleUrls: ['creacionMantenimientoUDAs.component.css']
})

export class CreacionMantenimientoUDAs implements OnInit {

    displayedColumns: string[] = ['mensaje', 'uda_id', 'uda_value', 'dept', 'class', 'subclass', 'create_date'];
    head = [['Mensaje', 'uda_id', 'uda_value', 'dept', 'class', 'subclass', 'create_date']]

    @ViewChild('PaginatorU', { static: true }) paginatorU: MatPaginator;
    @ViewChild('SortU', { static: true }) sortU: MatSort
    dataResponseU = null;
    dataResponseTableU = null;
    alertSuccessU = false;
    alertWarningU = false;
    showComponentsU = false;
    alertElementsU = false;
    numElementsU: any;
    showSpinnerU = false;
    hideButtonMostarU = true;
    responseU: any;

    appId: any;
    encrypt: any;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        public datepipe: DatePipe,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.spinner.show();
        this.appId = localStorage.getItem('appId');
        this.encrypt = localStorage.getItem('encrypt');

        this.http.get<any>('https://fcportaldes.femcom.net:8443//userapi/api/user/keys?appId=' + this.appId + '&encrypt=' + this.encrypt + '').subscribe(response => {
            console.log("todo ok")
            this.spinner.hide();
        }, err => {
            console.log("Error: ", err);
            //const dialogRef = this.dialog.open(DialogContentExampleDialog);
            this.spinner.hide();
            this.router.navigate(['/login']);
        });
    }

    createPdf() {

        this.createPdfU();

        //this.createPdFDCTSTG();

    }

    buscar(fechainicio: string, fechaFin: string) {

        /* if (fechainicio === "" || fechaFin === "") {
           alert("Se requieren ambas fechas");
         } else {*/
        let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
        let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

        this.showSpinnerU = true;

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr012/uda/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseU = response;
                this.dataResponseTableU = response['items'];
                this.numElementsU = response['count'];
                this.alertElementsU = true;
            } else {
                this.alertSuccessU = true;
            }
            this.showSpinnerU = false;
        }, err => {
            this.alertWarningU = true;
            this.showSpinnerU = false;
        });

        //}
    }

    showTableU() {
        this.dataResponseU = new MatTableDataSource<any>(this.responseU['items'])
        this.dataResponseU.paginator = this.paginatorU;
        this.dataResponseU.sort = this.sortU;
        this.showComponentsU = true;
        this.hideButtonMostarU = false;
    }

    createPdfU() {

        var rows = [];

        this.dataResponseTableU.forEach(element => {
            var temp = [element.mensaje, element.uda_id, element.uda_value, element.dept, element.class, element.subclass, element.create_date];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Tipo de Cambio', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);

        (doc1 as any).autoTable({
            head: this.head,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
                console.log(data.column.index)
                console.log(data.column)
                console.log(data)
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_Creación__Mantenimiento_UDAs.pdf');
    }

}