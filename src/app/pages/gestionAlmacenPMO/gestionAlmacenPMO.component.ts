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
    selector: 'gestionAlmacenPMO-cmp',
    templateUrl: 'gestionAlmacenPMO.component.html',
    styleUrls: ['gestionAlmacenPMO.component.css']
})

export class GestionAlmacenPMO implements OnInit {

    displayedColumns: string[] = ['mensaje', 'cedis', 'tipo_distro', 'carrier_code', 'service_code', 'route', 'dia_prog', 'h_prog', 'dia_ini_prod', 'dia_fin_prod', 'dia_ini_carga', 'dia_fin_carga', 'dia_salida', 'recorrido', 'ciclo_atn', 'ciclo_tot', 'status', 'fecha_carga', 'create_date'];
    head = [['Mensaje', 'cedis', 'tipo_distro', 'carrier_code', 'route', 'Tipo Cambio', 'dia_prog', 'h_prog', 'dia_ini_prod', 'dia_fin_prod', 'dia_ini_carga', 'dia_fin_carga', 'dia_salida', 'recorrido', 'ciclo_atn', 'ciclo_tot', 'status', 'fecha_carga', 'create_date']]

    @ViewChild('PaginatorPM', { static: true }) paginatorPM: MatPaginator;
    @ViewChild('SortPM', { static: true }) sortPM: MatSort
    dataResponsePM = null;
    dataResponseTablePM = null;
    alertSuccessPM = false;
    alertWarningPM = false;
    showComponentsPM = false;
    alertElementsPM = false;
    numElementsPM: any;
    showSpinnerPM = false;
    hideButtonMostarPM = true;
    responsePM: any;

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

        this.createPdfPM();

        //this.createPdFDCTSTG();

    }

    buscar(fechainicio: string, fechaFin: string) {

        /* if (fechainicio === "" || fechaFin === "") {
           alert("Se requieren ambas fechas");
         } else {*/
        let fInicio = this.datepipe.transform(fechainicio, 'yyyy-MM-dd');
        let fFinal = this.datepipe.transform(fechaFin, 'yyyy-MM-dd');

        this.showSpinnerPM = true;

        this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr011/pmo_route/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            if (response['count'] > 0) {
                this.responsePM = response;
                this.dataResponseTablePM = response['items'];
                this.numElementsPM = response['count'];
                this.alertElementsPM = true;
            } else {
                this.alertSuccessPM = true;
            }
            this.showSpinnerPM = false;
        }, err => {
            this.alertWarningPM = true;
            this.showSpinnerPM = false;
        });

        //}
    }

    showTablePM() {
        this.dataResponsePM = new MatTableDataSource<any>(this.responsePM['items'])
        this.dataResponsePM.paginator = this.paginatorPM;
        this.dataResponsePM.sort = this.sortPM;
        this.showComponentsPM = true;
        this.hideButtonMostarPM = false;
    }

    createPdfPM() {

        var rows = [];

        this.dataResponseTablePM.forEach(element => {
            var temp = [element.mensaje, element.cedis, element.tipo_distro, element.carrier_code, element.service_code, element.route, element.dia_prog, element.h_prog, element.dia_ini_prod, element.dia_fin_prod, element.dia_ini_carga, element.dia_fin_carga, element.dia_salida, element.recorrido, element.ciclo_atn, element.ciclo_tot, element.status, element.fecha_carga, element.create_date];
            rows.push(temp);
        })

        var doc1 = new jsPDF({ orientation: "landscape" });

        doc1.setFontSize(18);
        doc1.text('Consultas DM: Gestión Almacén PMO', 11, 8);
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
        doc1.save('Consultas_DM_Gestión_Almacén_PMO.pdf');
    }

}