import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
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
  selector: 'proveedores-cmp',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class Proveedores implements OnInit {

  displayedColumns: string[] = ['mensaje', 'proveedor', 'nombreproveedor', 'fechacreacion'];
  head = [['mensaje', 'supplier', 'sup_name', 'create_date']]

  @ViewChild('PaginatorProveedor', { static: true }) paginatorProveedor: MatPaginator;
  @ViewChild('SortProveedor', { static: true }) sortProveedor: MatSort
  dataResponseProveedor = null;
  dataResponseTableProveedor = null;
  alertSuccessProveedor = false;
  alertWarningProveedor = false;
  showComponentsProveedor = false;
  alertElementsProveedor = false;
  numElementsProveedor: any;
  showSpinnerProveedor = false;
  hideButtonMostarProveedor = true;
  responseProveedor: any;

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

    this.createPdfProveedor();

  }

  buscar(fechainicio: string, fechaFin: string) {

    //if (fechainicio === "" || fechaFin === "") {
    //alert("Se requieren ambas fechas");
    //} else {
    let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
    let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

    this.showSpinnerProveedor = true;

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr005/supps_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseProveedor = response;
        this.dataResponseTableProveedor = response['items'];
        this.numElementsProveedor = response['count'];
        this.alertElementsProveedor = true;
      } else {
        this.alertSuccessProveedor = true;
      }
      this.showSpinnerProveedor = false;
    }, err => {
      this.alertWarningProveedor = true;
      this.showSpinnerProveedor = false;
    });

    //}
  }

  showTableProveedor() {
    this.dataResponseProveedor = new MatTableDataSource<any>(this.responseProveedor['items'])
    this.dataResponseProveedor.paginator = this.paginatorProveedor;
    this.dataResponseProveedor.sort = this.sortProveedor;
    this.showComponentsProveedor = true;
    this.hideButtonMostarProveedor = false;
  }

  createPdfProveedor() {

    var rows = [];

    this.dataResponseTableProveedor.forEach(element => {
      var temp = [element.mensaje, element.proveedor, element.nombreproveedor, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Proveedores', 11, 8);
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
    doc1.save('Consultas_DM_Proveedores.pdf');
  }

}
