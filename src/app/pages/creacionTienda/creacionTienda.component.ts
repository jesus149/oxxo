import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'creacionTienda-cmp',
  styleUrls: ['./creacionTienda.component.css'],
  templateUrl: 'creacionTienda.component.html'
})

export class CreacionTienda implements OnInit {

  displayedColumnsS: string[] = ['id', 'name', 'add1', 'add2', 'city', 'state', 'fechacreacion'];
  headS = [['id', 'name', 'add1', 'add2', 'city', 'state', 'fechacreacion']]

  displayedColumnsSH: string[] = ['id', 'company', 'chain', 'area', 'region', 'district', 'fechacreacion'];
  headSH = [['id', 'company ', 'chain', 'area', 'region', 'district', 'fechacreacion']]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataResponseS = null;
  dataResponseTableS = null;

  dataResponseSH = null;
  dataResponseTableSH = null;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  createPdf() {

    this.createS();

    this.createSH();

  }

  buscar(fechainicio: string, fechaFin: string) {

    //if (fechainicio === "" || fechaFin === "") {
      //alert("Se requieren ambas fechas");
    //} else {
      let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
      let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr004/store/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseS = new MatTableDataSource<any>(response['items'])
        this.dataResponseS.paginator = this.paginator;
        this.dataResponseTableS = response['items'];
      });

      this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr004/store_hierarchy/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
        console.log(response);
        this.dataResponseSH = new MatTableDataSource<any>(response['items'])
        this.dataResponseSH.paginator = this.paginator;
        this.dataResponseTableSH = response['items'];
      });
    //}
  }

  createS() {

    var rows = [];

    this.dataResponseTableS.forEach(element => {
      var temp = [element.id, element.name, element.add1, element.add2, element.city, element.state, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio STORE', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headS,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Creacion_Tienda_STORE.pdf');
  }

  createSH() {

    var rows = [];

    this.dataResponseTableSH.forEach(element => {
      var temp = [element.id, element.company, element.chain, element.area, element.region, element.district, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio STORE_HIERARCHY', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headSH,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Creacion_Tienda_STORE_HIERARCHY.pdf');
  }

}