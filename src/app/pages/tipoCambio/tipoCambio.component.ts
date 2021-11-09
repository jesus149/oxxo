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
  selector: 'tipoCambio-cmp',
  templateUrl: 'tipoCambio.component.html',
  styleUrls: ['tipoCambio.component.css']
})

export class TipoCambio implements OnInit {
  displayedColumns: string[] = ['mensajeerror', 'basedatos', 'tabla', 'exchangetype', 'effectivedate', 'tipocambio', 'moneda', 'fechaactivacion'];
  head = [['Mensaje de Error', 'Dase de Datos', 'Tabla', 'exchange_type', 'effective_date', 'Tipo Cambio', 'Moneda', 'Fecha Ejecución']]

  @ViewChild('PaginatorCRSTG', { static: true }) paginatorCRSTG: MatPaginator;
  @ViewChild('SortCRSTG', { static: true }) sortCRSTG: MatSort
  dataResponseCRSTG = null;
  dataResponseTableCRSTG = null;
  alertSuccessCRSTG = false;
  alertWarningCRSTG = false;
  showComponentsCRSTG = false;
  alertElementsCRSTG = false;
  numElementsCRSTG: any;
  showSpinnerCRSTG = false;
  hideButtonMostarCRSTG = true;
  responseCRSTG: any;

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

    this.createPdfCRSTG();

    //this.createPdFDCTSTG();

  }

  buscar(fechainicio: string, fechaFin: string) {

    /* if (fechainicio === "" || fechaFin === "") {
       alert("Se requieren ambas fechas");
     } else {*/
    let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
    let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

    this.showSpinnerCRSTG = true;

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr001/currency_rates_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseCRSTG = response;
        this.dataResponseTableCRSTG = response['items'];
        this.numElementsCRSTG = response['count'];
        this.alertElementsCRSTG = true;
      } else {
        this.alertSuccessCRSTG = true;
      }
      this.showSpinnerCRSTG = false;
    }, err => {
      this.alertWarningCRSTG = true;
      this.showSpinnerCRSTG = false;
    });

    //}
  }

  showTableCRSTG() {
    this.dataResponseCRSTG = new MatTableDataSource<any>(this.responseCRSTG['items'])
    this.dataResponseCRSTG.paginator = this.paginatorCRSTG;
    this.dataResponseCRSTG.sort = this.sortCRSTG;
    this.showComponentsCRSTG = true;
    this.hideButtonMostarCRSTG = false;
  }

  createPdfCRSTG() {

    var rows = [];

    this.dataResponseTableCRSTG.forEach(element => {
      var temp = [element.mensajeerror, element.basedatos, element.tabla, element.effectivedate?.substr(0, 10), element.exchangetype, element.tipocambio, element.moneda, element.fechaactivacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tipo de Cambio', 11, 8);
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
    doc1.save('Consultas_DM_Tipo_de_Cambio.pdf');
  }
}
