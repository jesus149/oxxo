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
    selector: "mantenimientoArticulos-cmp",
    styleUrls: ["./mantenimientoArticulos.component.css"],
    templateUrl: "mantenimientoArticulos.component.html",
})
export class MantenimientoArticulos implements OnInit {
    displayedColumnsIL: string[] = ['mensaje', 'articulo', 'localizador', 'tipolocalizador', 'unidadminorista', 'unidadventaminorista', 'ventauom', 'promocionminorista', 'aplicaimpuesto', 'ti', 'hi', 'estatuslocalizador', 'fechacreacion'];
    headIL = [['Mensaje', 'Artículo', 'Localizador', 'Tipo Localizador', 'Unidad Minorista', 'Unidad Venta Minorista', 'Venta OUM', 'Promoción Minorista', 'Aplica Impuesto', 'ti', 'hi', 'Estatus Localizador', 'Fecha Creación']]

    displayedColumnsIM: string[] = ['mensaje', 'articulo', 'nivelarticulo', 'niveltransitivo', 'item_aggregate_ind', 'dept', 'class', 'subclass', 'status', 'descripcionarticulo', 'descripconcortaarticulo', 'descripcionsuerior', 'fechacreacion'];
    headIM = [['Mensaje', 'Artículo', 'Nivel Artículo', 'Nivel Transitivo', 'item_aggregate_ind', 'dept', 'class', 'subclass', 'status', 'Descripción Artículo', 'Descripción Corta Artículo', 'Descripción Superior', 'Fecha Creación']]

    displayedColumnsIS: string[] = ['mensaje', 'articulo', 'proveedor', 'nombrepallet', 'case_name', 'inner_name', 'fechacreacion'];
    headIS = [['Mensaje', 'Artículo', 'Proveedor', 'Nombre Pallet', 'case_name', 'inner_name', 'Fecha Creación']]

    displayedColumnsVI: string[] = ['mensaje', 'articulo', 'region', 'tipo', 'codigo', 'taza', 'fechacreacion'];
    headVI = [['Mensaje', 'Artículo', 'Región', 'Tipo', 'Código', 'Taza', 'Fecha Creación']];

    displayedColumnsU: string[] = ['mensaje', 'identificadoruda', 'descripcionuda', 'valoruda', 'valordescripcionuda', 'fechacreacion'];
    headU = [['Mensaje', 'Identificador UDA', 'Descripción UDA', 'Valor UDA', 'Valor Descripción UDA', 'Fecha Creación']];

    @ViewChild('PaginatorIL', { static: true }) paginatorIL: MatPaginator;
    @ViewChild('SortIL', { static: true }) sortIL: MatSort
    dataResponseIL: MatTableDataSource<any>;
    dataResponseTableIL = null;
    alertSuccessIL = false;
    alertWarningIL = false;
    showComponentsIL = false;
    alertElementsIL = false;
    numElementsIL: any;
    showSpinnerIL = false;
    hideButtonMostarIL = true;
    responseIL: any;

    @ViewChild('PaginatorIM', { static: true }) paginatorIM: MatPaginator;
    @ViewChild('SortIM', { static: true }) sortIM: MatSort
    dataResponseIM: MatTableDataSource<any>;
    dataResponseTableIM = null;
    alertSuccessIM = false;
    alertWarningIM = false;
    showComponentsIM = false;
    alertElementsIM = false;
    numElementsIM: any;
    showSpinnerIM = false;
    hideButtonMostarIM = true;
    responseIM: any;

    @ViewChild('PaginatorIS', { static: true }) paginatorIS: MatPaginator;
    @ViewChild('SortIS', { static: true }) sortIS: MatSort
    dataResponseIS: MatTableDataSource<any>;
    dataResponseTableIS = null;
    alertSuccessIS = false;
    alertWarningIS = false;
    showComponentsIS = false;
    alertElementsIS = false;
    numElementsIS: any;
    showSpinnerIS = false;
    hideButtonMostarIS = true;
    responseIS: any;

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

    @ViewChild('PaginatorU', { static: true }) paginatorU: MatPaginator;
    @ViewChild('SortU', { static: true }) sortU: MatSort
    dataResponseU: MatTableDataSource<any>;
    dataResponseTableU = null;
    alertSuccessU = false;
    alertWarningU = false;
    showComponentsU = false;
    alertElementsU = false;
    numElementsU: any;
    showSpinnerU = false;
    hideButtonMostarU = true;
    responseU: any;

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

    buscar(fechainicio: string, fechaFin: string) {

        /*if (fechainicio === "" || fechaFin === "") {
          alert("Se requieren ambas fechas");
        } else {*/
        let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
        let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

        this.showSpinnerIL = true;
        this.showSpinnerIM = true;
        this.showSpinnerIS = true;
        this.showSpinnerVI = true;
        this.showSpinnerU = true;

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr009/item_loc/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseIL = response;
                this.dataResponseTableIL = response['items'];
                this.numElementsIL = response['count'];
                this.alertElementsIL = true;
            } else {
                this.alertSuccessIL = true;
            }
            this.showSpinnerIL = false;
        }, err => {
            this.alertWarningIL = true;
            this.showSpinnerIL = false;
        });

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr009/item_master/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseIM = response;
                this.dataResponseTableIM = response['items'];
                this.numElementsIM = response['count'];
                this.alertElementsIM = true;
            } else {
                this.alertSuccessIM = true;
            }
            this.showSpinnerIM = false;
        }, err => {
            this.alertWarningIM = true;
            this.showSpinnerIM = false;
        });

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr009/item_supplier/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseIS = response;
                this.dataResponseTableIS = response['items'];
                this.numElementsIS = response['count'];
                this.alertElementsIS = true;
            } else {
                this.alertSuccessIS = true;
            }
            this.showSpinnerIS = false;
        }, err => {
            this.alertWarningIS = true;
            this.showSpinnerIS = false;
        });

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr009/uda/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responseU = response;
                this.dataResponseTableU = response['items'];
                this.numElementsU = response['count'];
                this.alertElementsU = true;
            } else {
                this.alertSuccessU = true;
            }
            this.showSpinnerU = false;
        }, err => {
            this.alertWarningU = true;
            this.showSpinnerU = false;
        });

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr009/vat_item/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
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

    showTableIL() {
        this.dataResponseIL = new MatTableDataSource<any>(this.responseIL['items'])
        this.dataResponseIL.paginator = this.paginatorIL;
        this.dataResponseIL.sort = this.sortIL;
        this.showComponentsIL = true;
        this.hideButtonMostarIL = false;
    }

    showTableIM() {
        this.dataResponseIM = new MatTableDataSource<any>(this.responseIM['items'])
        this.dataResponseIM.paginator = this.paginatorIM;
        this.dataResponseIM.sort = this.sortIM;
        this.showComponentsIM = true;
        this.hideButtonMostarIM = false;
    }

    showTableIS() {
        this.dataResponseIS = new MatTableDataSource<any>(this.responseIS['items'])
        this.dataResponseIS.paginator = this.paginatorIS;
        this.dataResponseIS.sort = this.sortIS;
        this.showComponentsIS = true;
        this.hideButtonMostarIS = false;
    }

    showTableVI() {
        this.dataResponseVI = new MatTableDataSource<any>(this.responseVI['items'])
        this.dataResponseVI.paginator = this.paginatorVI;
        this.dataResponseVI.sort = this.sortVI;
        this.showComponentsVI = true;
        this.hideButtonMostarVI = false;
    }

    showTableU() {
        this.dataResponseU = new MatTableDataSource<any>(this.responseU['items'])
        this.dataResponseU.paginator = this.paginatorU;
        this.dataResponseU.sort = this.sortU;
        this.showComponentsU = true;
        this.hideButtonMostarU = false;
    }

    createPdf() {

        this.createPdfIL();

        this.createPdfIM();

        this.createPdfIS();

        this.createPdfVI();

        this.createPdfU();

    }


    createPdfIL() {

        var rows = [];

        this.dataResponseTableIL.forEach(element => {
            var temp = [element.mensaje, element.articulo, element.localizador, element.tipolocalizador, element.unidadminorista, element.unidadventaminorista, element.ventauom, element.promocionminorista, element.aplicaimpuesto, element.ti, element.hi, element.estatuslocalizador, element.fechacreacion?.substr(0, 10)];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Localizador Artículos', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.headIL,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_Localizador_Articulos.pdf');
    }

    createPdfIM() {

        var rows = [];

        this.dataResponseTableIM.forEach(element => {
            var temp = [element.mensaje, element.articulo, element.nivelarticulo, element.niveltransitivo, element.item_aggregate_ind, element.dept, element.class, element.subclass, element.status, element.descripcionarticulo, element.descripconcortaarticulo, element.descripcionsuerior, element.fechacreacion?.substr(0, 10)];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Artículos', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.headIM,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_Articulos.pdf');
    }

    createPdfIS() {

        var rows = [];

        this.dataResponseTableIS.forEach(element => {
            var temp = [element.mensaje, element.articulo, element.proveedor, element.nombrepallet, element.case_name, element.inner_name, element.fechacreacion?.substr(0, 10)];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Artículos Asociados a Proveedores', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.headIS,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_Articulos_Asociados_Proveedores.pdf');
    }

    createPdfVI() {

        var rows = [];

        this.dataResponseTableVI.forEach(element => {
            var temp = [element.mensaje, element.articulo, element.region, element.tipo, element.codigo, element.taza, element.fechacreacion?.substr(0, 10)];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Impuesto Asociado a Artículos', 11, 8);
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
        doc1.save('Consultas_DM_Impuesto_Asociado_Articulos.pdf');
    }

    createPdfU() {

        var rows = [];

        this.dataResponseTableU.forEach(element => {
            var temp = [element.mensaje, element.identificadoruda, element.descripcionuda, element.valoruda, element.valordescripcionuda, element.fechacreacion?.substr(0, 10)];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: UDA', 11, 8);
        doc1.setFontSize(11);
        doc1.setTextColor(100);


        (doc1 as any).autoTable({
            head: this.headU,
            body: rows,
            theme: 'striped',
            didDrawCell: data => {
            }
        })

        // below line for Open PDF document in new tab
        doc1.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc1.save('Consultas_DM_UDA.pdf');

    }


}