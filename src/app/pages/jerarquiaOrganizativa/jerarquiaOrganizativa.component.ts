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
  selector: 'jerarquiaOrganizativa-cmp',
  styleUrls: ['./jerarquiaOrganizativa.component.css'],
  templateUrl: 'jerarquiaOrganizativa.component.html'
})

export class JerarquiaOrganizativa implements OnInit {
  displayedColumns: string[] = ['basedatos', 'tabla', 'mensajeerror', 'id', 'nombrearea', 'fechacreacion', 'asesordistrito'];
  head = [['baseDatos', 'tabla', 'mensajeError', 'id', 'nombreArea', 'fechaCreacion', 'asesorDistrito']]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataResponseASGT = null;
  dataResponseTableASGT = null;

  dataResponseCSTG = null;
  dataResponseTableCSTG = null;

  dataResponseCHSTG = null;
  dataResponseTableCHSTG = null;

  dataResponseDSTG = null;
  dataResponseTableDSTG = null;

  dataResponseRSTG = null;
  dataResponseTableRSTG = null;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }
  
  ngOnInit(): void {
  }

  createPdf() {

    this.createPdfASGT();

    this.createPdfCSTG();

    this.createPdfCHSTG();

    this.createPdfDSTG();

    this.createPdfRSTG();

  }

  buscar(fechainicio: string, fechaFin: string) {

    if (fechainicio === "" || fechaFin === "") {
      alert("Se requieren ambas fechas");
    } else {
      let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
      let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseASGT = new MatTableDataSource<any>(response['items'])
        this.dataResponseASGT.paginator = this.paginator;
        this.dataResponseTableASGT = response['items'];
      });

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseCSTG = new MatTableDataSource<any>(response['items'])
        this.dataResponseCSTG.paginator = this.paginator;
        this.dataResponseTableCSTG = response['items'];
      });

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseCHSTG = new MatTableDataSource<any>(response['items'])
        this.dataResponseCHSTG.paginator = this.paginator;
        this.dataResponseTableCHSTG = response['items'];
      });

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseDSTG = new MatTableDataSource<any>(response['items'])
        this.dataResponseDSTG.paginator = this.paginator;
        this.dataResponseTableDSTG = response['items'];
      });

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseRSTG = new MatTableDataSource<any>(response['items'])
        this.dataResponseRSTG.paginator = this.paginator;
        this.dataResponseTableRSTG = response['items'];
      });

    }
  }

  createPdfASGT() {
    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.head,
      body: this.dataResponseTableASGT,
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
    doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_AREA_STG.pdf');
  }

  createPdfCSTG() {
    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.head,
      body: this.dataResponseTableCSTG,
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
    doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_CHAIN_STG.pdf');
  }

  createPdfCHSTG() {
    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.head,
      body: this.dataResponseTableCHSTG,
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
    doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_COMPHEAD_STG.pdf');
  }

  createPdfDSTG() {
    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.head,
      body: this.dataResponseTableDSTG,
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
    doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_DISTRICT_STG.pdf');
  }

  createPdfRSTG() {
    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.head,
      body: this.dataResponseTableRSTG,
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
    doc1.save('Consultas_de_Alertas_Jerarquia_Organizativa_REGION_STG.pdf');
  }
}