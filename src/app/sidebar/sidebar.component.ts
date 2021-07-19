import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/consultasDM',     title: 'Consultas DM',                icon:'fa fa-search',      class: '' },
    { path: '/consultasF2',     title: 'Consultas F2',                icon:'fa fa-search',      class: '' },
    { path: '/adminUsuarios',   title: 'Administración de usuarios',  icon:'fa fa-user',        class: '' },
    { path: '/salir',           title: 'Salir',                       icon:'fa fa-sign-out',    class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
