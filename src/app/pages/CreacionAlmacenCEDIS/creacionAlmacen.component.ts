import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
    selector: 'creacionAlmacen-cmp',
    styleUrls: ['./creacionAlmacen.component.css'],
    templateUrl: 'creacionAlmacen.component.html'
})

export class CreacionAlmacen implements OnInit {

    displayedColumns: string[] = ['mensajeerror', 'basedatos', 'tabla', 'direccionespostal', 'moneda', 'addrtype', 'fechacreacion', 'cedis'];
    head = [['Mensaje Error', 'Base de Datos', 'Tabla', 'Direccion Postal', 'currency_code', 'addrtype', 'create_date', 'wh_name']];

    displayedColumns1: string[] = ['mensajeerror', 'basedatos', 'tabla', 'direccionespostal', 'addrtype', 'fechacreacion'];
    head1 = [['Mensaje Error', 'Base de Datos', 'Tabla', 'Direccion Postal', 'addrtype', 'create_date']];

    @ViewChild('PaginatorWHSTG', { static: true }) paginatorWHSTG: MatPaginator;
    @ViewChild('SortWHSTG', { static: true }) sortWHSTG: MatSort
    dataResponseWHSTG: MatTableDataSource<any>;
    dataResponseTableWHSTG = null;
    alertSuccessWHSTG = false;
    alertWarningWHSTG = false;
    showComponentsWHSTG = false;
    alertElementsWHSTG = false;
    numElementsWHSTG: any;
    showSpinnerWHSTG = false;
    hideButtonMostarWHSTG = true;
    responseWHSTG: any;

    @ViewChild('PaginatorASTG', { static: true }) paginatorASTG: MatPaginator;
    @ViewChild('SortASTG', { static: true }) sortASTG: MatSort
    dataResponseASTG: MatTableDataSource<any>;
    dataResponseTableASTG = null;
    alertSuccessASTG = false;
    alertWarningASTG = false;
    showComponentsASTG = false;
    alertElementsASTG = false;
    numElementsASTG: any;
    showSpinnerASTG = false;
    hideButtonMostarASTG = true;
    responseASTG: any;

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

        this.createPdfWHSTG();

        this.createPdfASTG();

    }

    buscar(fechainicio: string, fechaFin: string) {

        /*if (fechainicio === "" || fechaFin === "") {
            alert("Se requieren ambas fechas");
        } else {*/
        let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
        let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

        this.showSpinnerWHSTG = true;
        this.showSpinnerASTG = true;

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/wh_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseWHSTG = response;
                this.dataResponseTableWHSTG = response['items'];
                this.numElementsWHSTG = response['count'];
                this.alertElementsWHSTG = true;
            } else {
                this.alertSuccessWHSTG = true;
            }
            this.showSpinnerWHSTG = false;
        }, err => {
            this.alertWarningWHSTG = true;
            this.showSpinnerWHSTG = false;
        });

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/addr_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseASTG = response;
                this.dataResponseTableASTG = response['items'];
                this.numElementsASTG = response['count'];
                this.alertElementsASTG = true;
            } else {
                this.alertSuccessASTG = true;
            }
            this.showSpinnerASTG = false;
        }, err => {
            this.alertWarningASTG = true;
            this.showSpinnerASTG = false;
        });

        //}
    }

    showTableWHSTG() {
        this.dataResponseWHSTG = new MatTableDataSource<any>(this.responseWHSTG['items'])
        this.dataResponseWHSTG.paginator = this.paginatorWHSTG;
        this.dataResponseWHSTG.sort = this.sortWHSTG;
        this.showComponentsWHSTG = true;
        this.hideButtonMostarWHSTG = false;
    }

    showTableASTG() {
        this.dataResponseASTG = new MatTableDataSource<any>(this.responseASTG['items'])
        this.dataResponseASTG.paginator = this.paginatorASTG;
        this.dataResponseASTG.sort = this.sortASTG;
        this.showComponentsASTG = true;
        this.hideButtonMostarASTG = false;
    }

    createPdfWHSTG() {


        var rows = [];

        this.dataResponseTableWHSTG.forEach(element => {
            var temp = [element.mensajeerror, element.basedatos, element.tabla, element.direccionespostal, element.moneda, element.addrtype, element.fechacreacion?.substr(0, 10), element.cedis];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Almacén', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.head,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_Almacén.pdf');
    }

    createPdfASTG() {

        var rows = [];

        this.dataResponseTableASTG.forEach(element => {
            var temp = [element.mensajeerror, element.basedatos, element.tabla, element.direccionespostal, element.addrtype, element.fechacreacion?.substr(0, 10)];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Dirección Almacén', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.head1,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_Dirección_Almacén.pdf');
    }


}
