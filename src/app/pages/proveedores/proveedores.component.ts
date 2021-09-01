import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
    selector: 'proveedores-cmp',
    templateUrl: 'proveedores.component.html',
    styleUrls: ['./proveedores.component.css']
})

export class Proveedores implements OnInit {

    displayedColumns: string[] = ['mensaje', 'proveedor', 'nombreproveedor', 'fechacreacion'];
    head = [['mensaje', '# Proveedor', 'Nombre Proveedor', 'Fecha Creacion']]

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    dataResponseProveedor = null;
    dataResponseTableProveedor = null;

    constructor(private http: HttpClient, public datepipe: DatePipe) { }

    ngOnInit(): void {
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
    
          this.http.get<any>('http://10.184.17.48:7003/ords/nucleo/fr005/supps_stg/?fechaInicio=' + fInicio + '&fechaFin=' + fFinal + '').subscribe(response => {
            console.log(response);
            this.dataResponseProveedor = new MatTableDataSource<any>(response['items'])
            this.dataResponseProveedor.paginator = this.paginator;
            this.dataResponseTableProveedor = response['items'];
          });   
    
       //}
      }
    
      createPdfProveedor() {
    
        var rows = [];
    
        this.dataResponseTableProveedor.forEach(element => {
          var temp = [element.mensaje, element.proveedor, element.nombreproveedor, element.fechacreacion];
          rows.push(temp);
        })
    
        var doc1 = new jsPDF({ orientation: "landscape" });
    
        doc1.setFontSize(18);
        doc1.text('Consultas DM: Proveedor SUPPS_STG', 11, 8);
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
        doc1.save('Consultas_DM_Proveedor_SUPPS_STG.pdf');
      }

}