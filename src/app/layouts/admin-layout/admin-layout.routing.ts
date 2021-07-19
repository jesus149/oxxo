import { Routes } from '@angular/router';

import { ConsultasDM } from '../../pages/consultasDM/consultasDM.component';
import { ConsultasF2 } from '../../pages/consultasF2/consultasF2.component';
import { AdminUsuarios } from '../../pages/adminUsuarios/adminUsuarios.component';
import { Salir } from '../../pages/salir/salir.component';

//ConsultasDM
import { TipoCambio }      from '../../pages/tipoCambio/tipoCAmbio.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'consultasDM',      component: ConsultasDM },
    { path: 'consultasF2',      component: ConsultasF2 },
    { path: 'adminUsuarios',    component: AdminUsuarios },
    { path: 'salir',            component: Salir },
    { path: 'tipoCambio',       component: TipoCambio }
];
