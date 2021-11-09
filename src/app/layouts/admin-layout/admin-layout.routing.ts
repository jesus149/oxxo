import { Routes } from '@angular/router';

import { ConsultasDM } from '../../pages/consultasDM/consultasDM.component';
import { ConsultasF2 } from '../../pages/consultasF2/consultasF2.component';
import { AdminUsuarios } from '../../pages/adminUsuarios/adminUsuarios.component';
import { Salir } from '../../pages/salir/salir.component';

//ConsultasDM
import { TipoCambio } from '../../pages/tipoCambio/tipoCAmbio.component';
import { JerarquiaOrganizativa } from '../../pages/jerarquiaOrganizativa/jerarquiaOrganizativa.component';
import { CreacionAlmacen } from '../../pages/CreacionAlmacenCEDIS/creacionAlmacen.component'
import { Proveedores } from '../../pages/proveedores/proveedores.component'
import { Impuestos } from '../../pages/impuestos/impuestos.component'
import { CreacionTienda } from '../../pages/creacionTienda/creacionTienda.component'
import { CreacionArticulosServicio } from '../../pages/creacionArticulosServicio/creacionArticulosServicio.component'
import { CreacionArticulosNormales } from '../../pages/creacionArticulosNormales/creacionArticulosNormales.component'
import { MantenimientoArticulos } from '../../pages/mantenimientoArticulos/mantenimientoArticulos.component'
import { CreacionMantenimientoUDAs } from '../../pages/creacionMantenimientoUDAs/creacionMantenimientoUDAs.component'
import { GestionAlmacenPMO } from '../../pages/gestionAlmacenPMO/gestionAlmacenPMO.component'
import { GestionAlmacenRecibo } from '../../pages/gestionAlmacenRecibo/gestionAlmacenRecibo.component'

export const AdminLayoutRoutes: Routes = [
    { path: 'consultasDM', component: ConsultasDM },
    { path: 'consultasF2', component: ConsultasF2 },
    { path: 'adminUsuarios', component: AdminUsuarios },
    { path: 'salir', component: Salir },
    { path: 'tipoCambio', component: TipoCambio },
    { path: 'jerarquiaOrganizativa', component: JerarquiaOrganizativa },
    { path: 'creacionAlmacen', component: CreacionAlmacen },
    { path: 'proveedores', component: Proveedores },
    { path: 'impuestos', component: Impuestos },
    { path: 'creacionTienda', component: CreacionTienda },
    { path: 'creacionArticulosServicio', component: CreacionArticulosServicio },
    { path: 'creacionArticulosNormales', component: CreacionArticulosNormales },
    { path: 'mantenimientoArticulos', component: MantenimientoArticulos },
    { path: 'creacionMantenimientoUDAs', component: CreacionMantenimientoUDAs },
    { path: 'gestionAlmacenPMO', component: GestionAlmacenPMO },
    { path: 'gestionAlmacenRecibo', component: GestionAlmacenRecibo }
];
