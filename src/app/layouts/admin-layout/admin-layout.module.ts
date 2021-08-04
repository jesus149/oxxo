import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { AdminLayoutRoutes } from './admin-layout.routing';

import { ConsultasDM } from '../../pages/consultasDM/consultasDM.component';
import { ConsultasF2 } from '../../pages/consultasF2/consultasF2.component';
import { AdminUsuarios } from '../../pages/adminUsuarios/adminUsuarios.component';
import { Salir } from '../../pages/salir/salir.component';

//ConsultasDM
import { TipoCambio } from '../../pages/tipoCambio/tipoCAmbio.component';
import { JerarquiaOrganizativa } from '../../pages/jerarquiaOrganizativa/jerarquiaOrganizativa.component'
import { CreacionAlmacen } from '../../pages/CreacionAlmacenCEDIS/creacionAlmacen.component'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//angular material

import { MaterialModule } from 'app/material-module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MaterialModule
  ],
  declarations: [
    ConsultasDM,
    ConsultasF2,
    AdminUsuarios,
    Salir,
    TipoCambio,
    JerarquiaOrganizativa,
    CreacionAlmacen
  ],
  providers: [DatePipe]
})

export class AdminLayoutModule { }
