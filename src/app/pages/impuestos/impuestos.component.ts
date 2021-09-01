import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'impuestos-cmp',
  styleUrls: ['./impuestos.component.css'],
  templateUrl: 'impuestos.component.html'
})

export class Impuestos implements OnInit {

  displayedColumnsCV: string[] = ['vatcode', 'vatcodedesc', 'mensajeerror', 'id', 'fechacreacion'];
  headVC = [['vatCode', 'vatCodedesc', 'mensajeError', 'id', 'fechaCreacion']]

  displayedColumnsVR: string[] = ['vatregion', 'vatregionname', 'vattype', 'mensajeerror', 'id', 'fechacreacion'];
  headVR = [['vatRegion', 'vatRegionName', 'vatType ', 'mensajeError', 'id', 'fechaCreacion']]

  displayedColumnsGS: string[] = ['numtienda', 'entidad', 'fechacreacion'];
  headGS = [['numtienda', 'entidad', 'fechacreacion ']]

  displayedColumnsGT: string[] = ['estado', 'entidad', 'tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'fechacreacion'];
  headGT = [['estado', 'entidad', 'tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'fechacreacion']]

  displayedColumnsPTC: string[] = ['item', 'tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'fechacreacion'];
  headPTC = [['item', 'tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'fechacreacion']];

  displayedColumnsTR: string[] = ['tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'tasaimpuesto', 'fechacreacion'];
  headTR = [['tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'tasaimpuesto', 'fechacreacion']]

  displayedColumnsVCR: string[] = ['codigoimpuesto', 'fechavigencia', 'tasaimpuesto', 'fechacreacion'];
  headVCR = [['codigoimpuesto', 'fechavigencia', 'tasaimpuesto', 'fechacreacion']]

  displayedColumnsVD: string[] = ['regionimpuestos', 'dept', 'tipoimpuesto', 'codigoimpuesto', 'fechacreacion'];
  headVD = [['regionimpuestos', 'dept', 'tipoimpuesto', 'codigoimpuesto', 'fechacreacion']]

  displayedColumnsVI: string[] = ['item', 'region', 'fechavigencia', 'tipoimpuesto', 'codigoimpuesto', 'tasaimpuesto', 'fechacreacion'];
  headVI = [['item', 'region', 'fechavigencia', 'tipoimpuesto', 'codigoimpuesto', 'tasaimpuesto', 'fechacreacion']]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataResponseVC: MatTableDataSource<any>;
  dataResponseTableVC = null;

  dataResponseVR = null;
  dataResponseTableVR = null;

  dataResponseGS = null;
  dataResponseTableGS = null;

  dataResponseGT = null;
  dataResponseTableGT = null;

  dataResponsePTC = null;
  dataResponseTablePTC = null;

  dataResponseTR = null;
  dataResponseTableTR = null;

  dataResponseVCR = null;
  dataResponseTableVCR = null;

  dataResponseVD = null;
  dataResponseTableVD = null;

  dataResponseVI = null;
  dataResponseTableVI = null;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  createPdf() {

    this.createPdfCV();

    this.createPdfVR();

    this.createPdfGS();

    this.createPdfGT();

    this.createPdfPTC();

    this.createPdfTR();

    this.createPdfVCR();

    this.createPdfVD();

    this.createPdfVI();

  }

  buscar(fechainicio: string, fechaFin: string) {

    //if (fechainicio === "" || fechaFin === "") {
    //alert("Se requieren ambas fechas");
    //} else {
    let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
    let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/vat_codes/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseVC = new MatTableDataSource(response['items'])
      this.dataResponseVC.paginator = this.paginator;
      this.dataResponseVC.sort = this.sort;
      this.dataResponseTableVC = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/vat_region/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseVR = new MatTableDataSource(response['items'])
      this.dataResponseVR.paginator = this.paginator;
      this.dataResponseVR.sort = this.sort;
      this.dataResponseTableVR = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/geocode_store/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseGS = new MatTableDataSource(response['items'])
      this.dataResponseGS.paginator = this.paginator;
      this.dataResponseTableGS = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/geocode_txcde/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseGT = new MatTableDataSource(response['items'])
      this.dataResponseGT.paginator = this.paginator;
      this.dataResponseGT.sort = this.sort;
      this.dataResponseTableGT = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/product_tax_code/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponsePTC = new MatTableDataSource(response['items'])
      this.dataResponsePTC.paginator = this.paginator;
      this.dataResponsePTC.sort = this.sort;
      this.dataResponseTablePTC = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/tax_rates/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseTR = new MatTableDataSource(response['items'])
      this.dataResponseTR.paginator = this.paginator;
      this.dataResponseTR.sort = this.sort;
      this.dataResponseTableTR = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/vat_code_rates/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseVCR = new MatTableDataSource(response['items'])
      this.dataResponseVCR.paginator = this.paginator;
      this.dataResponseVCR.sort = this.sort;
      this.dataResponseTableVCR = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/vat_deps/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseVD = new MatTableDataSource(response['items'])
      this.dataResponseVD.paginator = this.paginator;
      this.dataResponseVD.sort = this.sort;
      this.dataResponseTableVD = response['items'];
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr006/vat_item/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      this.dataResponseVI = new MatTableDataSource(response['items'])
      this.dataResponseVI.paginator = this.paginator;
      this.dataResponseVI.sort = this.sort;
      this.dataResponseTableVI = response['items'];
    });
    //}
  }

  createPdfCV() {

    var rows = [];

    this.dataResponseTableVC.forEach(element => {
      var temp = [element.vatcode, element.vatcodedesc, element.mensajeerror, element.id, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio VAT_CODES', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headVC,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_VAT_CODES.pdf');
  }

  createPdfVR() {

    var rows = [];

    this.dataResponseTableVR.forEach(element => {
      var temp = [element.vatregion, element.vatregionname, element.vattype, element.mensajeerror, element.id, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio VAT_REGIONS', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headVR,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_VAT_REGIONS.pdf');
  }

  createPdfGS() {

    var rows = [];

    this.dataResponseTableGS.forEach(element => {
      var temp = [element.numtienda, element.entidad, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio GEOCODE_STORE', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headGS,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_GEOCODE_STORE.pdf');
  }

  createPdfGT() {

    var rows = [];

    this.dataResponseTableGT.forEach(element => {
      var temp = [element.estado, element.entidad, element.tipoimpuesto, element.fechainiciovigencia, element.fechafinvigencia, element.jurisdiccion, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio GEOCODE_TXCDE', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headGT,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_GEOCODE_TXCDE.pdf');
  }

  createPdfPTC() {

    var rows = [];

    this.dataResponseTablePTC.forEach(element => {
      var temp = [element.item, element.tipoimpuesto, element.fechainiciovigencia, element.fechafinvigencia, element.jurisdiccion, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio PRODUCT_TAX_CODE', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headPTC,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_PRODUCT_TAX_CODE.pdf');
  }

  createPdfTR() {

    var rows = [];

    this.dataResponseTableTR.forEach(element => {
      var temp = [element.tipoimpuesto, element.fechainiciovigencia, element.fechafinvigencia, element.jurisdiccion, element.tasaimpuesto, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio TAX_RATES', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headTR,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_TAX_RATES.pdf');
  }

  createPdfVCR() {

    var rows = [];

    this.dataResponseTableVCR.forEach(element => {
      var temp = [element.codigoimpuesto, element.fechavigencia, element.tasaimpuesto, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio VAT_CODE_RATES', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headVCR,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_VAT_CODE_RATES.pdf');
  }

  createPdfVD() {

    var rows = [];

    this.dataResponseTableVD.forEach(element => {
      var temp = [element.regionimpuestos, element.dept, element.tipoimpuesto, element.codigoimpuesto, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio VAT_DEPS', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headVD,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_VAT_DEPS.pdf');
  }

  createPdfVI() {

    var rows = [];

    this.dataResponseTableVI.forEach(element => {
      var temp = [element.item, element.region, element.fechavigencia, element.tipoimpuesto, element.codigoimpuesto, element.tasaimpuesto, element.fechacreacion];
      rows.push(temp);
    })

    var doc1 = new jsPDF();

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio VAT_ITEM', 11, 8);
    doc1.setFontSize(11);
    doc1.setTextColor(100);


    (doc1 as any).autoTable({
      head: this.headVI,
      body: rows,
      theme: 'striped',
      didDrawCell: data => {
      }
    })

    // below line for Open PDF document in new tab
    doc1.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc1.save('Consultas_DM_Impuestos_VAT_ITEM.pdf');
  }

}