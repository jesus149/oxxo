import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/consultasDM',                 title: 'Consultas DM',                      icon:'fa fa-search',      class: '' },
    { path: '/consultasF2',                 title: 'Consultas F2',                      icon:'fa fa-search',      class: '' },
    { path: '/adminUsuarios',               title: 'Administración de usuarios',        icon:'fa fa-user',        class: '' },
    { path: '/salir',                       title: 'Salir',                             icon:'fa fa-sign-out',    class: '' }    
];      

export const ROUTESTitle: RouteInfo[] = [       
    { path: '/consultasDM',                 title: 'Consultas DM',                      icon:'fa fa-search',      class: '' },
    { path: '/consultasF2',                 title: 'Consultas F2',                      icon:'fa fa-search',      class: '' },
    { path: '/adminUsuarios',               title: 'Administración de usuarios',        icon:'fa fa-user',        class: '' },
    { path: '/salir',                       title: 'Salir',                             icon:'fa fa-sign-out',    class: '' },
    { path: '/tipoCambio',                  title: 'Tipo de Cambio',                    icon:'fa fa-sign-out',    class: '' },
    { path: '/jerarquiaOrganizativa',       title: 'Jerarquia Organizativa',            icon:'fa fa-sign-out',    class: '' },
    { path: '/creacionAlmacen',             title: 'Creación De Almacen',               icon:'fa fa-sign-out',    class: '' },
    { path: '/proveedores',                 title: 'Proveedor',                         icon:'fa fa-sign-out',    class: '' },
    { path: '/impuestos',                   title: 'Impuestos',                         icon:'fa fa-sign-out',    class: '' },
    { path: '/creacionTienda',              title: 'Creación Tienda',                   icon:'fa fa-sign-out',    class: '' },
    { path: '/creacionArticulosNormales',   title: 'Creación Artículos Normales',       icon:'fa fa-sign-out',    class: '' },
    { path: '/creacionArticulosServicio',   title: 'Creación Artículos Servicio',       icon:'fa fa-sign-out',    class: '' },
    { path: '/mantenimientoArticulos',      title: 'Mantenimiento Artículos',           icon:'fa fa-sign-out',    class: '' },
    { path: '/login',                       title: 'Herramienta de Monitoreo',          icon:'fa fa-sign-out',    class: '' },
    { path: '/creacionMantenimientoUDAs',   title: 'Creación y Mantenimiento UDAs',     icon:'fa fa-sign-out',    class: '' },
    { path: '/gestionAlmacenPMO',           title: 'Gestión Almacén PMO',               icon:'fa fa-sign-out',    class: '' },
    { path: '/gestionAlmacenRecibo',        title: 'Gestión Almacén Recibo',            icon:'fa fa-sign-out',    class: '' }
    
];


@Component({
    
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ["sidebar.component.css"],
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
