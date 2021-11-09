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
    selector: 'gestionAlmacenRecibo-cmp',
    templateUrl: 'gestionAlmacenRecibo.component.html',
    styleUrls: ['gestionAlmacenRecibo.component.css']
})

export class GestionAlmacenRecibo implements OnInit {

    displayedColumns: string[] = ['mensaje', 'item', 'supplier', 'supp_pack_size', 'inner_pack_size', 'ti', 'hi', 'create_datetime'];
    head = [['Mensaje', 'item', 'supplier', 'supp_pack_size', 'inner_pack_size', 'ti', 'hi', 'create_datetime']]

    @ViewChild('PaginatorSP', { static: true }) paginatorSP: MatPaginator;
    @ViewChild('SortSP', { static: true }) sortSP: MatSort
    dataResponseSP = null;
    dataResponseTableSP = null;
    alertSuccessSP = false;
    alertWarningSP = false;
    showComponentsSP = false;
    alertElementsSP = false;
    numElementsSP: any;
    showSpinnerSP = false;
    hideButtonMostarSP = true;
    responseSP: any;

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

        this.createPdfSP();

        //this.createPdFDCTSTG();

    }

    buscar(fechainicio: string, fechaFin: string) {

        /* if (fechainicio === "" || fechaFin === "") {
           alert("Se requieren ambas fechas");
         } else {*/
        let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
        let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

        this.showSpinnerSP = true;

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr010/item_supp_country/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseSP = response;
                this.dataResponseTableSP = response['items'];
                this.numElementsSP = response['count'];
                this.alertElementsSP = true;
            } else {
                this.alertSuccessSP = true;
            }
            this.showSpinnerSP = false;
        }, err => {
            this.alertWarningSP = true;
            this.showSpinnerSP = false;
        });

        //}
    }

    showTableSP() {
        this.dataResponseSP = new MatTableDataSource<any>(this.responseSP['items'])
        this.dataResponseSP.paginator = this.paginatorSP;
        this.dataResponseSP.sort = this.sortSP;
        this.showComponentsSP = true;
        this.hideButtonMostarSP = false;
    }

    createPdfSP() {

        var rows = [];

        this.dataResponseTableSP.forEach(element => {
            var temp = [element.mensajeerror, element.mensaje, element.item, element.supplier, element.supp_pack_size, element.inner_pack_size, element.ti, element.hi, element.create_datetime];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Gestión Almacén Recibo', 11, 8);
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
        doc1.save('Consultas_DM_Gestión_Almacén_Recibo.pdf');
    }

}