import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
    selector: 'tipoCambio-cmp',
    moduleId: module.id,
    templateUrl: 'tipoCambio.component.html'
})

export class TipoCambio implements OnInit {
    displayedColumns: string[] = ['baseDatos', 'tabla', 'mensajeError', 'tipoCambio', 'moneda', 'fechaActivacion'];
    head = [['baseDatos', 'tabla', 'mensajeError', 'tipoCambio', 'moneda', 'fechaActivacion']]
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    nombreIntegracion: string = "Tipo Cambio";
    curretMenu: string = "Tipo Cambio";
    iconDash: string = "payments";
  
    dataResponse = null;
  
    dataResponseTable = null;
  
    constructor(private http: HttpClient) { }
  
    ngOnInit(): void {
    }
  
    createPdf() {
  
      console.log("this.dataResponseTable: ")
      console.log(this.dataResponseTable)
  
      var doc = new jsPDF();
  
      doc.setFontSize(18);
      doc.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
      doc.setFontSize(11);
      doc.setTextColor(100);
  
  
      (doc as any).autoTable({
        head: this.head,
        body: this.dataResponseTable,
        theme: 'striped',
        didDrawCell: data => {
          console.log(data.column.index)
          console.log(data.column)
          console.log(data)
        }
      })
  
      // below line for Open PDF document in new tab
      doc.output('dataurlnewwindow')
  
      // below line for Download PDF document  
      doc.save('Consultas_de_Alertas_Tipo_de_Cambio.pdf');
    }
  
    buscar() {
  
    this.http.get<any>('https://jsonplaceholder.typicode.com/users').subscribe(response => {
      console.log(response);
      this.dataResponse = new MatTableDataSource<any>(response)
      this.dataResponse.paginator = this.paginator;
      this.dataResponseTable = response;
    });

    /*this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=02-AUG-21&fechaFin=02-AUG-21').subscribe(response => {
      console.log(response);
      this.dataResponse = new MatTableDataSource<any>(response['items'])
      this.dataResponse.paginator = this.paginator;
      this.dataResponseTable = response['items'];
    });*/
  
      return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
    }
}
