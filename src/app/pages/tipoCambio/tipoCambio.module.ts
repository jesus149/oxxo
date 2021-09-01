import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TipoCambio } from './tipoCambio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'app/material-module';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule, MaterialModule ],
    declarations: [ TipoCambio ],
    exports: [ TipoCambio ]
})

export class TipoCambioModule {}
