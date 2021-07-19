import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'tipoCambio-cmp',
    moduleId: module.id,
    templateUrl: 'tipoCambio.component.html'
})

export class TipoCambio implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    ngOnInit() {

    }

    head = [['Base de datos', 'Tabla', 'Mensaje Error', 'Componente', 'Tipo cambio', 'Moneda', 'Fecha activación']]

    data = [
        ['DAS', 'CURRENCY_RATES', 'No se encontró el registro', 'Golden Gate', 'Corporativo','MXN','5/2/2021'],
        ['DAS', 'CURRENCY_RATES', 'No se encontró el registro', 'Golden Gate', 'Corporativo','MXN','5/7/2021'],
        ['RMS10', 'CURRENCY_RATES', 'No se encontró el registro', 'ODI', 'Corporativo','MXN','5/7/2021'],
        ['DAS', 'CURRENCY_RATES', 'No se encontró el registro', 'Golden Gate', 'Corporativo','MXN','5/21/2021'],
        ['RMS10', 'CURRENCY_RATES', 'No se encontró el registro', 'ODI', 'Corporativo','MXN','5/21/2021']
    ];


    createPdf() {
        var doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Consultas de Alertas: Tipo de Cambio', 11, 8);
        doc.setFontSize(11);
        doc.setTextColor(100);


        (doc as any).autoTable({
            head: this.head,
            body: this.data,
            theme: 'striped',
            didDrawCell: data => {
                console.log(data.column.index)
            }
        })

        // below line for Open PDF document in new tab
        doc.output('dataurlnewwindow')

        // below line for Download PDF document  
        doc.save('Consultas_de_Alertas_Tipo_de_Cambio.pdf');
    }
}
