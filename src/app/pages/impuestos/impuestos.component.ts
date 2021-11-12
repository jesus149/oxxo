import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'impuestos-cmp',
  styleUrls: ['./impuestos.component.css'],
  templateUrl: 'impuestos.component.html'
})

export class Impuestos implements OnInit {

  displayedColumnsVC: string[] = ['mensajeerror', 'vatcode', 'vatcodedesc', 'id', 'fechacreacion'];
  headVC = [['Mensaje', 'vat_code', 'vat_code_desc', 'id', 'create_date']]

  displayedColumnsVR: string[] = ['mensajeerror', 'vatregion', 'vatregionname', 'vattype', 'id', 'fechacreacion'];
  headVR = [['Mensaje', 'vat_region', 'vat_region_name', 'vat_region_type ', 'id', 'create_date']]

  displayedColumnsGS: string[] = ['mensajeerror', 'numtienda', 'entidad', 'fechacreacion'];
  headGS = [['Mensaje', 'store', 'state_geocode_id', 'create_date ']]

  displayedColumnsGT: string[] = ['mensajeerror', 'estado', 'entidad', 'tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'fechacreacion'];
  headGT = [['Mensaje', 'geocode_level', 'state_geocode_id', 'tax_type_id', 'start_date', 'end_date', 'tax_jurisdiction_id', 'Fecha Ejecución']]

  displayedColumnsPTC: string[] = ['mensajeerror', 'idcreacion', 'tipoimpuesto', 'jurisdiccion', 'fechacreacion'];
  headPTC = [['Mensaje', 'create_id', 'tax_type_id', 'tax_jurisdiction_id', 'create_date']];

  displayedColumnsTR: string[] = ['mensajeerror', 'tipoimpuesto', 'fechainiciovigencia', 'fechafinvigencia', 'jurisdiccion', 'tasaimpuesto', 'fechacreacion'];
  headTR = [['Mensaje', 'tax_type_id', 'start_date', 'end_date', 'tax_jurisdiction_id_bk', 'tax_rate_bk', 'create_date']]

  displayedColumnsVCR: string[] = ['mensajeerror', 'codigoimpuesto', 'fechavigencia', 'tasaimpuesto', 'fechacreacion'];
  headVCR = [['Mensaje', 'vat_code', 'active_date', 'vat_rate', 'create_date']]

  displayedColumnsVD: string[] = ['mensajeerror', 'regionimpuestos', 'dept', 'tipoimpuesto', 'codigoimpuesto', 'fechacreacion'];
  headVD = [['Mensaje', 'vat_region', 'dept', 'vat_type', 'vat_code', 'create_date']]

  displayedColumnsVI: string[] = ['mensajeerror', 'item', 'region', 'fechavigencia', 'tipoimpuesto', 'codigoimpuesto', 'tasaimpuesto', 'fechacreacion'];
  headVI = [['Mensaje', 'item', 'vat_region', 'active_date', 'vat_type', 'vat_code', 'vat_rate', 'create_date']]

  @ViewChild('PaginatorVC', { static: true }) paginatorVC: MatPaginator;
  @ViewChild('SortVC', { static: true }) sortVC: MatSort
  dataResponseVC: MatTableDataSource<any>;
  dataResponseTableVC = null;
  alertSuccessVC = false;
  alertWarningVC = false;
  showComponentsVC = false;
  alertElementsVC = false;
  numElementsVC: any;
  showSpinnerVC = false;
  hideButtonMostarVC = true;
  responseVC: any;

  @ViewChild('PaginatorVR', { static: true }) paginatorVR: MatPaginator;
  @ViewChild('SortVR', { static: true }) sortVR: MatSort
  dataResponseVR: MatTableDataSource<any>;
  dataResponseTableVR = null;
  alertSuccessVR = false;
  alertWarningVR = false;
  showComponentsVR = false;
  alertElementsVR = false;
  numElementsVR: any;
  showSpinnerVR = false;
  hideButtonMostarVR = true;
  responseVR: any;

  @ViewChild('PaginatorGS', { static: true }) paginatorGS: MatPaginator;
  @ViewChild('SortGS', { static: true }) sortGS: MatSort
  dataResponseGS: MatTableDataSource<any>;
  dataResponseTableGS = null;
  alertSuccessGS = false;
  alertWarningGS = false;
  showComponentsGS = false;
  alertElementsGS = false;
  numElementsGS: any;
  showSpinnerGS = false;
  hideButtonMostarGS = true;
  responseGS: any;

  @ViewChild('PaginatorGT', { static: true }) paginatorGT: MatPaginator;
  @ViewChild('SortGT', { static: true }) sortGT: MatSort
  dataResponseGT: MatTableDataSource<any>;
  dataResponseTableGT = null;
  alertSuccessGT = false;
  alertWarningGT = false;
  showComponentsGT = false;
  alertElementsGT = false;
  numElementsGT: any;
  showSpinnerGT = false;
  hideButtonMostarGT = true;
  responseGT: any;

  @ViewChild('PaginatorPTC', { static: true }) paginatorPTC: MatPaginator;
  @ViewChild('SortPTC', { static: true }) sortPTC: MatSort
  dataResponsePTC: MatTableDataSource<any>;
  dataResponseTablePTC = null;
  alertSuccessPTC = false;
  alertWarningPTC = false;
  showComponentsPTC = false;
  alertElementsPTC = false;
  numElementsPTC: any;
  showSpinnerPTC = false;
  hideButtonMostarPTC = true;
  responsePTC: any;

  @ViewChild('PaginatorTR', { static: true }) paginatorTR: MatPaginator;
  @ViewChild('SortTR', { static: true }) sortTR: MatSort
  dataResponseTR: MatTableDataSource<any>;
  dataResponseTableTR = null;
  alertSuccessTR = false;
  alertWarningTR = false;
  showComponentsTR = false;
  alertElementsTR = false;
  numElementsTR: any;
  showSpinnerTR = false;
  hideButtonMostarTR = true;
  responseTR: any;

  @ViewChild('PaginatorVCR', { static: true }) paginatorVCR: MatPaginator;
  @ViewChild('SortVCR', { static: true }) sortVCR: MatSort
  dataResponseVCR: MatTableDataSource<any>;
  dataResponseTableVCR = null;
  alertSuccessVCR = false;
  alertWarningVCR = false;
  showComponentsVCR = false;
  alertElementsVCR = false;
  numElementsVCR: any;
  showSpinnerVCR = false;
  hideButtonMostarVCR = true;
  responseVCR: any;

  @ViewChild('PaginatorVD', { static: true }) paginatorVD: MatPaginator;
  @ViewChild('SortVD', { static: true }) sortVD: MatSort
  dataResponseVD: MatTableDataSource<any>;
  dataResponseTableVD = null;
  alertSuccessVD = false;
  alertWarningVD = false;
  showComponentsVD = false;
  alertElementsVD = false;
  numElementsVD: any;
  showSpinnerVD = false;
  hideButtonMostarVD = true;
  responseVD: any;

  @ViewChild('PaginatorVI', { static: true }) paginatorVI: MatPaginator;
  @ViewChild('SortVI', { static: true }) sortVI: MatSort
  dataResponseVI: MatTableDataSource<any>;
  dataResponseTableVI = null;
  alertSuccessVI = false;
  alertWarningVI = false;
  showComponentsVI = false;
  alertElementsVI = false;
  numElementsVI: any;
  showSpinnerVI = false;
  hideButtonMostarVI = true;
  responseVI: any;

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

    this.createPdfVC();

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

    this.showSpinnerVC = true;
    this.showSpinnerVR = true;
    this.showSpinnerGS = true;
    this.showSpinnerGT = true;
    this.showSpinnerPTC = true;
    this.showSpinnerTR = true;
    this.showSpinnerVCR = true;
    this.showSpinnerVD = true;
    this.showSpinnerVI = true;

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_vat_codes_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseVC = response;
        this.dataResponseTableVC = response['items'];
        this.numElementsVC = response['count'];
        this.alertElementsVC = true;
      } else {
        this.alertSuccessVC = true;
      }
      this.showSpinnerVC = false;
    }, err => {
      this.alertWarningVC = true;
      this.showSpinnerVC = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_vat_region_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseVR = response;
        this.dataResponseTableVR = response['items'];
        this.numElementsVR = response['count'];
        this.alertElementsVR = true;
      } else {
        this.alertSuccessVR = true;
      }
      this.showSpinnerVR = false;
    }, err => {
      this.alertWarningVR = true;
      this.showSpinnerVR = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_geocode_store_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseGS = response;
        this.dataResponseTableGS = response['items'];
        this.numElementsGS = response['count'];
        this.alertElementsGS = true;
      } else {
        this.alertSuccessGS = true;
      }
      this.showSpinnerGS = false;
    }, err => {
      this.alertWarningGS = true;
      this.showSpinnerGS = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_geocode_txcde_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseGT = response;
        this.dataResponseTableGT = response['items'];
        this.numElementsGT = response['count'];
        this.alertElementsGT = true;
      } else {
        this.alertSuccessGT = true;
      }
      this.showSpinnerGT = false;
    }, err => {
      this.alertWarningGT = true;
      this.showSpinnerGT = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_product_tax_code_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responsePTC = response;
        this.dataResponseTablePTC = response['items'];
        this.numElementsPTC = response['count'];
        this.alertElementsPTC = true;
      } else {
        this.alertSuccessPTC = true;
      }
      this.showSpinnerPTC = false;
    }, err => {
      this.alertWarningPTC = true;
      this.showSpinnerPTC = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_tax_rates_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseTR = response;
        this.dataResponseTableTR = response['items'];
        this.numElementsTR = response['count'];
        this.alertElementsTR = true;
      } else {
        this.alertSuccessTR = true;
      }
      this.showSpinnerTR = false;
    }, err => {
      this.alertWarningTR = true;
      this.showSpinnerTR = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_vat_code_rates_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseVCR = response;
        this.dataResponseTableVCR = response['items'];
        this.numElementsVCR = response['count'];
        this.alertElementsVCR = true;
      } else {
        this.alertSuccessVCR = true;
      }
      this.showSpinnerVCR = false;
    }, err => {
      this.alertWarningVCR = true;
      this.showSpinnerVCR = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_vat_deps_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseVD = response;
        this.dataResponseTableVD = response['items'];
        this.numElementsVD = response['count'];
        this.alertElementsVD = true;
      } else {
        this.alertSuccessVD = true;
      }
      this.showSpinnerVD = false;
    }, err => {
      this.alertWarningVD = true;
      this.showSpinnerVD = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/xxmon/fr006/xxmon_vat_item_fr006/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseVI = response;
        this.dataResponseTableVI = response['items'];
        this.numElementsVI = response['count'];
        this.alertElementsVI = true;
      } else {
        this.alertSuccessVI = true;
      }
      this.showSpinnerVI = false;
    }, err => {
      this.alertWarningVI = true;
      this.showSpinnerVI = false;
    });
    //}
  }

  showTableVC() {
    this.dataResponseVC = new MatTableDataSource<any>(this.responseVC['items'])
    this.dataResponseVC.paginator = this.paginatorVC;
    this.dataResponseVC.sort = this.sortVC;
    this.showComponentsVC = true;
    this.hideButtonMostarVC = false;
  }

  showTableVR() {
    this.dataResponseVR = new MatTableDataSource<any>(this.responseVR['items'])
    this.dataResponseVR.paginator = this.paginatorVR;
    this.dataResponseVR.sort = this.sortVR;
    this.showComponentsVR = true;
    this.hideButtonMostarVR = false;
  }

  showTableGS() {
    this.dataResponseGS = new MatTableDataSource<any>(this.responseGS['items'])
    this.dataResponseGS.paginator = this.paginatorGS;
    this.dataResponseGS.sort = this.sortGS;
    this.showComponentsGS = true;
    this.hideButtonMostarGS = false;
  }

  showTableGT() {
    this.dataResponseGT = new MatTableDataSource<any>(this.responseGT['items'])
    this.dataResponseGT.paginator = this.paginatorGT;
    this.dataResponseGT.sort = this.sortGT;
    this.showComponentsGT = true;
    this.hideButtonMostarGT = false;
  }

  showTablePTC() {
    this.dataResponsePTC = new MatTableDataSource<any>(this.responsePTC['items'])
    this.dataResponsePTC.paginator = this.paginatorPTC;
    this.dataResponsePTC.sort = this.sortPTC;
    this.showComponentsPTC = true;
    this.hideButtonMostarPTC = false;
  }

  showTableTR() {
    this.dataResponseTR = new MatTableDataSource<any>(this.responseTR['items'])
    this.dataResponseTR.paginator = this.paginatorTR;
    this.dataResponseTR.sort = this.sortTR;
    this.showComponentsTR = true;
    this.hideButtonMostarTR = false;
  }

  showTableVCR() {
    this.dataResponseVCR = new MatTableDataSource<any>(this.responseVCR['items'])
    this.dataResponseVCR.paginator = this.paginatorVCR;
    this.dataResponseVCR.sort = this.sortVCR;
    this.showComponentsVCR = true;
    this.hideButtonMostarVCR = false;
  }

  showTableVD() {
    this.dataResponseVD = new MatTableDataSource<any>(this.responseVD['items'])
    this.dataResponseVD.paginator = this.paginatorVD;
    this.dataResponseVD.sort = this.sortVD;
    this.showComponentsVD = true;
    this.hideButtonMostarVD = false;
  }

  showTableVI() {
    this.dataResponseVI = new MatTableDataSource<any>(this.responseVI['items'])
    this.dataResponseVI.paginator = this.paginatorVI;
    this.dataResponseVI.sort = this.sortVI;
    this.showComponentsVI = true;
    this.hideButtonMostarVI = false;
  }

  createPdfVC() {

    var rows = [];

    this.dataResponseTableVC.forEach(element => {
      var temp = [element.mensajeerror, element.vatcode, element.vatcodedesc, element.id, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: VAT_CODES', 11, 8);
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
    doc1.save('Consultas_DM_VAT_CODES.pdf');
  }

  createPdfVR() {

    var rows = [];

    this.dataResponseTableVR.forEach(element => {
      var temp = [element.mensajeerror, element.vatregion, element.vatregionname, element.vattype, element.id, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: VAT_REGIONS', 11, 8);
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
    doc1.save('Consultas_DM_VAT_REGIONS.pdf');
  }

  createPdfGS() {

    var rows = [];

    this.dataResponseTableGS.forEach(element => {
      var temp = [element.mensajeerror, element.numtienda, element.entidad, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: GEOCODE_STORE', 11, 8);
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
    doc1.save('Consultas_DM_GEOCODE_STORE.pdf');
  }

  createPdfGT() {

    var rows = [];

    this.dataResponseTableGT.forEach(element => {
      var temp = [element.mensajeerror, element.estado, element.entidad, element.tipoimpuesto, element.fechainiciovigencia?.substr(0, 10), element.fechafinvigencia?.substr(0, 10), element.jurisdiccion, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: GEOCODE_TXCDE', 11, 8);
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
    doc1.save('Consultas_DM_GEOCODE_TXCDE.pdf');
  }

  createPdfPTC() {

    var rows = [];

    this.dataResponseTablePTC.forEach(element => {
      var temp = [element.mensajeerror, element.idcreacio, element.tipoimpuesto, element.jurisdiccion, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: PRODUCT_TAX_CODE', 11, 8);
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
    doc1.save('Consultas_DM_PRODUCT_TAX_CODE.pdf');
  }

  createPdfTR() {

    var rows = [];

    this.dataResponseTableTR.forEach(element => {
      var temp = [element.mensajeerror, element.tipoimpuesto, element.fechainiciovigencia?.substr(0, 10), element.fechafinvigencia?.substr(0, 10), element.jurisdiccion, element.tasaimpuesto, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: TAX_RATES', 11, 8);
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
    doc1.save('Consultas_DM_TAX_RATES.pdf');
  }

  createPdfVCR() {

    var rows = [];

    this.dataResponseTableVCR.forEach(element => {
      var temp = [element.mensajeerror, element.codigoimpuesto, element.fechavigencia?.substr(0, 10), element.tasaimpuesto, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: VAT_CODE_RATES', 11, 8);
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
    doc1.save('Consultas_DM_VAT_CODE_RATES.pdf');
  }

  createPdfVD() {

    var rows = [];

    this.dataResponseTableVD.forEach(element => {
      var temp = [element.mensajeerror, element.regionimpuestos, element.dept, element.tipoimpuesto, element.codigoimpuesto, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: VAT_DEPS', 11, 8);
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
    doc1.save('Consultas_DM_VAT_DEPS.pdf');
  }

  createPdfVI() {

    var rows = [];

    this.dataResponseTableVI.forEach(element => {
      var temp = [element.mensajeerror, element.item, element.region, element.fechavigencia?.substr(0, 10), element.tipoimpuesto, element.codigoimpuesto, element.tasaimpuesto, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: VAT_ITEM', 11, 8);
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
    doc1.save('Consultas_DM_VAT_ITEM.pdf');
  }
}


export interface GeocodeStore {
  mensajeerror: string,
  numtienda: number
  entidad: string,
  fechacreacion: string
}