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
  selector: 'jerarquiaOrganizativa-cmp',
  styleUrls: ['./jerarquiaOrganizativa.component.css'],
  templateUrl: 'jerarquiaOrganizativa.component.html'
})

export class JerarquiaOrganizativa implements OnInit {
  displayedColumns: string[] = ['mensajeerror', 'basedatos', 'tabla', 'area_id', 'nombrearea', 'fechacreacion',];
  head = [['Mensaje Error', 'Base de Datos', 'Tabla', 'id', 'name', 'create_date']]

  displayedColumnsD: string[] = ['mensajeerror', 'basedatos', 'tabla', 'area_id', 'nombrearea', 'fechacreacion', 'asesordistrito'];
  headD = [['Mensaje Error', 'Base de Datos', 'Tabla', 'district_id', 'district_name', 'create_date', 'mgr_name']]

  @ViewChild('PaginatorASGT', { static: true }) paginatorASGT: MatPaginator;
  @ViewChild('SortASGT', { static: true }) sortASGT: MatSort
  dataResponseASGT: MatTableDataSource<any>;
  dataResponseTableASGT = null;
  alertSuccessASGT = false;
  alertWarningASGT = false;
  showComponentsASGT = false;
  alertElementsASGT = false;
  numElementsASGT: any;
  showSpinnerASGT = false;
  hideButtonMostarASGT = true;
  responseASGT: any;

  @ViewChild('PaginatorCSTG', { static: true }) paginatorCSTG: MatPaginator;
  @ViewChild('SortCSTG', { static: true }) sortCSTG: MatSort
  dataResponseCSTG: MatTableDataSource<any>;
  dataResponseTableCSTG = null;
  alertSuccessCSTG = false;
  alertWarningCSTG = false;
  showComponentsCSTG = false;
  alertElementsCSTG = false;
  numElementsCSTG: any;
  showSpinnerCSTG = false;
  hideButtonMostarCSTG = true;
  responseCSTG: any;

  @ViewChild('PaginatorCHSTG', { static: true }) paginatorCHSTG: MatPaginator;
  @ViewChild('SortCHSTG', { static: true }) sortCHSTG: MatSort
  dataResponseCHSTG: MatTableDataSource<any>;
  dataResponseTableCHSTG = null;
  alertSuccessCHSTG = false;
  alertWarningCHSTG = false;
  showComponentsCHSTG = false;
  alertElementsCHSTG = false;
  numElementsCHSTG: any;
  showSpinnerCHSTG = false;
  hideButtonMostarCHSTG = true;
  responseCHSTG: any;

  @ViewChild('PaginatorDSTG', { static: true }) paginatorDSTG: MatPaginator;
  @ViewChild('SortDSTG', { static: true }) sortDSTG: MatSort
  dataResponseDSTG: MatTableDataSource<any>;
  dataResponseTableDSTG = null;
  alertSuccessDSTG = false;
  alertWarningDSTG = false;
  showComponentsDSTG = false;
  alertElementsDSTG = false;
  numElementsDSTG: any;
  showSpinnerDSTG = false;
  hideButtonMostarDSTG = true;
  responseDSTG: any;

  @ViewChild('PaginatorRSTG', { static: true }) paginatorRSTG: MatPaginator;
  @ViewChild('SortRSTG', { static: true }) sortRSTG: MatSort
  dataResponseRSTG: MatTableDataSource<any>;
  dataResponseTableRSTG = null;
  alertSuccessRSTG = false;
  alertWarningRSTG = false;
  showComponentsRSTG = false;
  alertElementsRSTG = false;
  numElementsRSTG: any;
  showSpinnerRSTG = false;
  hideButtonMostarRSTG = true;
  responseRSTG: any;

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

    this.createPdfASGT();

    this.createPdfCSTG();

    this.createPdfCHSTG();

    this.createPdfDSTG();

    this.createPdfRSTG();

  }

  buscar(fechainicio: string, fechaFin: string) {

    /*if (fechainicio === "" || fechaFin === "") {
      alert("Se requieren ambas fechas");
    } else {*/
    let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
    let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

    this.showSpinnerASGT = true;
    this.showSpinnerCSTG = true;
    this.showSpinnerCHSTG = true;
    this.showSpinnerDSTG = true;
    this.showSpinnerRSTG = true;

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr002/xxmon_area_fr002/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseASGT = response;
        this.dataResponseTableASGT = response['items'];
        this.numElementsASGT = response['count'];
        this.alertElementsASGT = true;
      } else {
        this.alertSuccessASGT = true;
      }
      this.showSpinnerASGT = false;
    }, err => {
      this.alertWarningASGT = true;
      this.showSpinnerASGT = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr002/xxmon_chain_fr002/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseCSTG = response;
        this.dataResponseTableCSTG = response['items'];
        this.numElementsCSTG = response['count'];
        this.alertElementsCSTG = true;
      } else {
        this.alertSuccessCSTG = true;
      }
      this.showSpinnerCSTG = false;
    }, err => {
      this.alertWarningCSTG = true;
      this.showSpinnerCSTG = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr002/xxmon_comphead_fr002/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseCHSTG = response;
        this.dataResponseTableCHSTG = response['items'];
        this.numElementsCHSTG = response['count'];
        this.alertElementsCHSTG = true;
      } else {
        this.alertSuccessCHSTG = true;
      }
      this.showSpinnerCHSTG = false;
    }, err => {
      this.alertWarningCHSTG = true;
      this.showSpinnerCHSTG = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr002/xxmon_district_fr002/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseDSTG = response;
        this.dataResponseTableDSTG = response['items'];
        this.numElementsDSTG = response['count'];
        this.alertElementsDSTG = true;
      } else {
        this.alertSuccessDSTG = true;
      }
      this.showSpinnerDSTG = false;
    }, err => {
      this.alertWarningDSTG = true;
      this.showSpinnerDSTG = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr002/xxmon_region_fr002/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseRSTG = response;
        this.dataResponseTableRSTG = response['items'];
        this.numElementsRSTG = response['count'];
        this.alertElementsRSTG = true;
      } else {
        this.alertSuccessRSTG = true;
      }
      this.showSpinnerRSTG = false;
    }, err => {
      this.alertWarningRSTG = true;
      this.showSpinnerRSTG = false;
    });

    //}
  }

  showTableASGT() {
    this.dataResponseASGT = new MatTableDataSource<any>(this.responseASGT['items'])
    this.dataResponseASGT.paginator = this.paginatorASGT;
    this.dataResponseASGT.sort = this.sortASGT;
    this.showComponentsASGT = true;
    this.hideButtonMostarASGT = false;
  }

  showTableCSTG() {
    this.dataResponseCSTG = new MatTableDataSource<any>(this.responseCSTG['items'])
    this.dataResponseCSTG.paginator = this.paginatorCSTG;
    this.dataResponseCSTG.sort = this.sortCSTG;
    this.showComponentsCSTG = true;
    this.hideButtonMostarCSTG = false;
  }

  showTableCHSTG() {
    this.dataResponseCHSTG = new MatTableDataSource<any>(this.responseCHSTG['items'])
    this.dataResponseCHSTG.paginator = this.paginatorCHSTG;
    this.dataResponseCHSTG.sort = this.sortCHSTG;
    this.showComponentsCHSTG = true;
    this.hideButtonMostarCHSTG = false;
  }

  showTableDSTG() {
    this.dataResponseDSTG = new MatTableDataSource<any>(this.responseDSTG['items'])
    this.dataResponseDSTG.paginator = this.paginatorDSTG;
    this.dataResponseDSTG.sort = this.sortDSTG;
    this.showComponentsDSTG = true;
    this.hideButtonMostarDSTG = false;
  }

  showTableRSTG() {
    this.dataResponseRSTG = new MatTableDataSource<any>(this.responseRSTG['items'])
    this.dataResponseRSTG.paginator = this.paginatorRSTG;
    this.dataResponseRSTG.sort = this.sortRSTG;
    this.showComponentsRSTG = true;
    this.hideButtonMostarRSTG = false;
  }

  createPdfASGT() {

    var rows = [];

    this.dataResponseTableASGT.forEach(element => {
      var temp = [element.mensajeerror, element.basedatos, element.tabla, element.id, element.nombrearea, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Área', 11, 8);
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
    doc1.save('Consultas_DM_Area.pdf');
  }

  createPdfCSTG() {

    var rows = [];

    this.dataResponseTableCSTG.forEach(element => {
      var temp = [element.mensajeerror, element.basedatos, element.tabla, element.id, element.nombrearea, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Cadena', 11, 8);
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
    doc1.save('Consultas_DM_Cadena.pdf');
  }

  createPdfCHSTG() {

    var rows = [];

    this.dataResponseTableCHSTG.forEach(element => {
      var temp = [element.mensajeerror, element.basedatos, element.tabla, element.id, element.nombrearea, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: COMPHEAD', 11, 8);
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
    doc1.save('Consultas_DM_COMPHEAD.pdf');
  }

  createPdfDSTG() {

    var rows = [];

    this.dataResponseTableDSTG.forEach(element => {
      var temp = [element.mensajeerror, element.basedatos, element.tabla, element.id, element.nombrearea, element.fechacreacion?.substr(0, 10), element.asesordistrito];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Distrito', 11, 8);
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
    doc1.save('Consultas_DM_Distrito.pdf');
  }

  createPdfRSTG() {

    var rows = [];

    this.dataResponseTableRSTG.forEach(element => {
      var temp = [element.mensajeerror, element.basedatos, element.tabla, element.id, element.nombrearea, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Region', 11, 8);
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
    doc1.save('Consultas_DM_Region.pdf');
  }
}