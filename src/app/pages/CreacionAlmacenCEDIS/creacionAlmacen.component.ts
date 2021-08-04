import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment"
import { DatePipe } from '@angular/common'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
    selector: 'creacionAlmacen-cmp',
    styleUrls: ['./creacionAlmacen.component.css'],
    templateUrl: 'creacionAlmacen.component.html'
})

export class CreacionAlmacen implements OnInit {

    displayedColumns: string[] = ['basedatos', 'tabla', 'mensajeerror', 'direccionespostal', 'moneda', 'addrtype', 'fechacreacion'];
    displayedColumns1: string[] = ['basedatos', 'tabla', 'mensajeerror', 'direccionespostal', 'moneda', 'fechacreacion'];
    displayedColumns2: string[] = ['basedatos', 'tabla', 'mensajeerror', 'direccionespostal', 'addrtype', 'fechacreacion'];
    head = [['baseDatos', 'tabla', 'mensajeError', 'direccionesPostal', 'moneda', 'addrType', 'fechaCreacion']];
    head1 = [['baseDatos', 'tabla', 'mensajeError', 'direccionesPostal', 'moneda', 'fechaCreacion']];
    head2 = [['baseDatos', 'tabla', 'mensajeError', 'direccionesPostal', 'addrType', 'fechaCreacion']];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    dataResponseWHSTG = null;
    dataResponseTableWHSTG = null;

    dataResponseASTG = null;
    dataResponseTableASTG = null;

    dataResponseWHCESTG = null;
    dataResponseTableWHCESTG = null;

    dataResponseVCWSTG = null;
    dataResponseTableVCWSTG = null;

    dataResponseVXMCPSTG = null;
    dataResponseTableVXMCPSTG = null;

    constructor(private http: HttpClient, public datepipe: DatePipe) { }

    ngOnInit(): void {
    }

    createPdf() {

        this.createPdfWHSTG();

        this.createPdfASTG();

        //this.createPdfWHCESTG();

        //THIS.createPdfVCWSTG();

        //this.createPdfVXMCPSTG();

    }

    buscar(fechainicio: string, fechaFin: string) {

        if (fechainicio === "" || fechaFin === "") {
            alert("Se requieren ambas fechas");
        } else {
            let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
            let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

            this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/wh_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
                console.log(response);
                this.dataResponseWHSTG = new MatTableDataSource<any>(response['items'])
                this.dataResponseWHSTG.paginator = this.paginator;
                this.dataResponseTableWHSTG = response['items'];
            });

            this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/addr_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
                console.log(response);
                this.dataResponseASTG = new MatTableDataSource<any>(response['items'])
                this.dataResponseASTG.paginator = this.paginator;
                this.dataResponseTableASTG = response['items'];
            });

            /*this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
                console.log(response);
                this.dataResponseWHCESTG = new MatTableDataSource<any>(response['items'])
                this.dataResponseWHCESTG.paginator = this.paginator;
                this.dataResponseTableWHCESTG = response['items'];
            });

            this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
                console.log(response);
                this.dataResponseVCWSTG = new MatTableDataSource<any>(response['items'])
                this.dataResponseVCWSTG.paginator = this.paginator;
                this.dataResponseTableVCWSTG = response['items'];
            });

            this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr003/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
                console.log(response);
                this.dataResponseVXMCPSTG = new MatTableDataSource<any>(response['items'])
                this.dataResponseVXMCPSTG.paginator = this.paginator;
                this.dataResponseTableVXMCPSTG = response['items'];
            });*/

        }
    }

    createPdfWHSTG() {


        var rows = [];

        this.dataResponseTableWHSTG.forEach(element => {
            var temp = [element.basedatos, element.tabla, element.mensajeerror, element.direccionespostal, element.moneda, element.fechacreacion];
            rows.push(temp);
        })

        var doc1 = new jsPDF();

        doc1.setFontSize(18);
        doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
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
        doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_WH_STG.pdf');
    }

    createPdfASTG() {

        var rows = [];

        this.dataResponseTableASTG.forEach(element => {
            var temp = [element.basedatos, element.tabla, element.mensajeerror, element.direccionespostal, element.addrtype, element.fechacreacion];
            rows.push(temp);
        })

        var doc1 = new jsPDF();

        doc1.setFontSize(18);
        doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.head2,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_ADDR_STG.pdf');
    }

    createPdfWHCESTG() {

        var rows = [];

        this.dataResponseTableWHCESTG.forEach(element => {
            var temp = [element.basedatos, element.tabla, element.mensajeerror, element.direccionespostal, element.moneda, element.addrtype, element.fechacreacion];
            rows.push(temp);
        })

        var doc1 = new jsPDF();

        doc1.setFontSize(18);
        doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
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
        doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_WH_CFA_EXT_STG.pdf');
    }

    createPdfVCWSTG() {

        var rows = [];

        this.dataResponseTableVCWSTG.forEach(element => {
            var temp = [element.basedatos, element.tabla, element.mensajeerror, element.direccionespostal, element.moneda, element.addrtype, element.fechacreacion];
            rows.push(temp);
        })

        var doc1 = new jsPDF();

        var doc1 = new jsPDF();

        doc1.setFontSize(18);
        doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
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
        doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_V_CFGS_WH_STG.pdf');
    }

    createPdfVXMCPSTG() {

        var rows = [];

        this.dataResponseTableVXMCPSTG.forEach(element => {
            var temp = [element.basedatos, element.tabla, element.mensajeerror, element.direccionespostal, element.moneda, element.addrtype, element.fechacreacion];
            rows.push(temp);
        })

        var doc1 = new jsPDF();

        doc1.setFontSize(18);
        doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
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
        doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_V_XXFC_MAPEO_CEDIS_PLAZA_STG.pdf');
    }
}
