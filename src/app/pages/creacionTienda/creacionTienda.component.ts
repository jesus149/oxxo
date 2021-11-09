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
  selector: 'creacionTienda-cmp',
  styleUrls: ['./creacionTienda.component.css'],
  templateUrl: 'creacionTienda.component.html'
})

export class CreacionTienda implements OnInit {

  displayedColumnsS: string[] = ['id', 'name', 'add1', 'add2', 'city', 'state', 'fechacreacion'];
  headS = [['store_id', 'store_name', 'store_add1', 'store_add2', 'store_city', 'state', 'create_date']]

  displayedColumnsSH: string[] = ['id', 'company', 'chain', 'area', 'region', 'district', 'fechacreacion'];
  headSH = [['store_id', 'company ', 'chain', 'area', 'region', 'district', 'create_date']]

  @ViewChild('PaginatorS', { static: true }) paginatorS: MatPaginator;
  @ViewChild('SortS', { static: true }) sortS: MatSort
  dataResponseS: MatTableDataSource<any>;
  dataResponseTableS = null;
  alertSuccessS = false;
  alertWarningS = false;
  showComponentsS = false;
  alertElementsS = false;
  numElementsS: any;
  showSpinnerS = false;
  hideButtonMostarS = true;
  responseS: any;

  @ViewChild('PaginatorSH', { static: true }) paginatorSH: MatPaginator;
  @ViewChild('SortSH', { static: true }) sortSH: MatSort
  dataResponseSH: MatTableDataSource<any>;
  dataResponseTableSH = null;
  alertSuccessSH = false;
  alertWarningSH = false;
  showComponentsSH = false;
  alertElementsSH = false;
  numElementsSH: any;
  showSpinnerSH = false;
  hideButtonMostarSH = true;
  responseSH: any;

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

    this.createS();

    this.createSH();

  }

  buscar(fechainicio: string, fechaFin: string) {

    //if (fechainicio === "" || fechaFin === "") {
    //alert("Se requieren ambas fechas");
    //} else {
    let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
    let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

    this.showSpinnerS = true;
    this.showSpinnerSH = true;

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr004/store/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseS = response;
        this.dataResponseTableS = response['items'];
        this.numElementsS = response['count'];
        this.alertElementsS = true;
      } else {
        this.alertSuccessS = true;
      }
      this.showSpinnerS = false;
    }, err => {
      this.alertWarningS = true;
      this.showSpinnerS = false;
    });

    this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr004/store_hierarchy/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
      console.log(response);
      if (response['count'] > 0) {
        this.responseSH = response;
        this.dataResponseTableSH = response['items'];
        this.numElementsSH = response['count'];
        this.alertElementsSH = true;
      } else {
        this.alertSuccessSH = true;
      }
      this.showSpinnerSH = false;
    }, err => {
      this.alertWarningSH = true;
      this.showSpinnerSH = false;
    });
    //}
  }

  showTableS() {
    this.dataResponseS = new MatTableDataSource<any>(this.responseS['items'])
    this.dataResponseS.paginator = this.paginatorS;
    this.dataResponseS.sort = this.sortS;
    this.showComponentsS = true;
    this.hideButtonMostarS = false;
  }

  showTableSH() {
    this.dataResponseSH = new MatTableDataSource<any>(this.responseSH['items'])
    this.dataResponseSH.paginator = this.paginatorSH;
    this.dataResponseSH.sort = this.sortSH;
    this.showComponentsSH = true;
    this.hideButtonMostarSH = false;
  }

  createS() {

    var rows = [];

    this.dataResponseTableS.forEach(element => {
      var temp = [element.id, element.name, element.add1, element.add2, element.city, element.state, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Tiendas', 11, 8);
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
    doc1.save('Consultas_DM_Tiendas.pdf');
  }

  createSH() {

    var rows = [];

    this.dataResponseTableSH.forEach(element => {
      var temp = [element.id, element.company, element.chain, element.area, element.region, element.district, element.fechacreacion?.substr(0, 10)];
      rows.push(temp);
    })

    var doc1 = new jsPDF({ orientation: "landscape" });

    doc1.setFontSize(18);
    doc1.text('Consultas DM: Jerarquia de Tiendas', 11, 8);
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
    doc1.save('Consultas_DM_Jerarquia_de_Tiendas.pdf');
  }

}