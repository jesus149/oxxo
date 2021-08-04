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
  selector: 'tipoCambio-cmp',
  templateUrl: 'tipoCambio.component.html',
  styleUrls: ['./tipoCambio.component.css']
})

export class TipoCambio implements OnInit {
  displayedColumns: string[] = ['basedatos', 'tabla', 'mensajeerror', 'tipocambio', 'moneda', 'fechaactivacion'];
  head = [['baseDatos', 'tabla', 'mensajeError', 'tipoCambio', 'moneda', 'fechaActivacion']]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataResponseCRSTG = null;
  dataResponseTableCRSTG = null;

  dataResponsDCTSTG = null;
  dataResponseTableDCTSTG = null;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }
  ngOnInit(): void {
  }

  createPdf() {

    this.createPdfCRSTG();

    //this.createPdFDCTSTG();

  }

  buscar(fechainicio: string, fechaFin: string) {

    if (fechainicio === "" || fechaFin === "") {
      alert("Se requieren ambas fechas");
    } else {
      let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
      let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseCRSTG = new MatTableDataSource<any>(response['items'])
        this.dataResponseCRSTG.paginator = this.paginator;
        this.dataResponseTableCRSTG = response['items'];
      });

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponsDCTSTG = new MatTableDataSource<any>(response['items'])
        this.dataResponsDCTSTG.paginator = this.paginator;
        this.dataResponseTableDCTSTG = response['items'];
      });

    }
  }

  createPdfCRSTG() {

    var rows = [];

    this.dataResponseTableCRSTG.forEach(element => {
      var temp = [element.basedatos, element.tabla, element.mensajeerror, element.tipocambio, element.moneda, element.fechaactivacion];
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
        console.log(data.column.index)
        console.log(data.column)
        console.log(data)
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_de_Alertas_Tipo_de_Cambio_CURRENCY_RATES_STG.pdf');
  }

  createPdFDCTSTG() {

    var rows = [];

    this.dataResponseTableDCTSTG.forEach(element => {
      var temp = [element.basedatos, element.tabla, element.mensajeerror, element.tipocambio, element.moneda, element.fechaactivacion];
      rows.push(temp);
    })

    var doc2 = new jsPDF();

    doc2.setFontSize(18);
    doc2.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
    doc2.setFontSize(11);
    doc2.setTextColor(100);


    (doc2 as any).autoTable({
      head: this.head,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc2.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc2.save('Consultas_de_Alertas_Tipo_de_Cambio_DAILY_CONVERTION_TYPES_STG.pdf');
  }
}
