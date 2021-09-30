// import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// import {MenuItem} from 'primeng/api'
// import {trigger, state, style, transition, animate} from '@angular/animations';
// import {Router} from '@angular/router';
// import {FilterService} from 'primeng/api';
// import {PanelMenuModule} from 'primeng/panelmenu'
//
// @Component({
//     selector: 'app-side-bar',
//     templateUrl: './side-bar.component.html',
//     styleUrls: ['./side-bar.component.css'],
//     animations: [
//         trigger('submenu', [
//             state('hidden', style({
//                 height: '0',
//                 overflow: 'hidden',
//                 opacity: 0,
//             })),
//             state('visible', style({
//                 height: '*',
//                 opacity: 1
//             })),
//             transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
//         ])
//     ]
// })
// export class SideBarComponent implements OnInit {
//     items: MenuItem[];
//     filteredRoutes: any[];
//     selectedRoute: any;
//     @Input() active: boolean;
//
//     activeSubmenus: { [key: string]: boolean } = {};
//
//     constructor(private filterService: FilterService, private router: Router) {
//     }
//
//     ngOnInit(): void {
//         this.items = [
//             // {
//             //     label: 'ROL',
//             //     icon: 'pi pi-home',
//             //     routerLink: 'rol',
//             //     items: []
//             // },
//             {
//                 icon: 'pi pi-file',
//                 label: 'ADMINISTRADOR DEL SISTEMA',
//
//
//                 items: [
//                     {
//                         icon: 'pi pi-file',
//                         label: 'Personal de Salud', routerLink: 'historia/personal-salud'
//                     },
//                     {
//                         icon: 'pi pi-file',
//                         label: 'Usuarios', routerLink: 'historia/usuarios'
//                     },
//                     {
//                         icon: 'pi pi-file',
//                         label: 'Cupos', routerLink: 'historia/cupos'
//                     }
//                 ]
//             },
//             {
//                 icon: 'pi pi-file',
//                 label: 'FUNCIONES ADMINISTRATIVAS',
//
//
//                 items: [
//                     {
//                         icon: 'pi pi-file',
//                         label: 'Rol de Guardias', routerLink: 'historia/personal-salud'
//                     },
//                     {
//                         icon: 'pi pi-file',
//                         label: 'Cupos', routerLink: 'historia/personal-salud'
//                     },
//                     {
//                         icon: 'pi pi-file',
//                         label: 'Historias Clinicas', routerLink: 'historia/personal-salud'
//                     }
//                 ]
//             },
//         ]
//     }
//
//     filterGroupedRoute(event) {
//         let query = event.query;
//         let filteredGroups = [];
//
//         for (let optgroup of this.items) {
//             let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
//             if (filteredSubOptions && filteredSubOptions.length) {
//                 filteredGroups.push({
//                     label: optgroup.label,
//                     url: optgroup.url,
//                     items: filteredSubOptions
//                 });
//             }
//         }
//
//         this.filteredRoutes = filteredGroups;
//     }
//
//     onSelect(event) {
//         this.selectedRoute = null;
//         this.router.navigate([event.url]);
//     }
// }


import {Component, Input, OnInit} from '@angular/core';
import {FilterService, MenuItem} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
    model: MenuItem[];
    items: MenuItem[];
    filteredRoutes: any[];
    selectedRoute: any;
    @Input() active: boolean;

    activeSubmenus: { [key: string]: boolean } = {};

    constructor(private filterService: FilterService, private router: Router) {
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Administrador del Sistema',
                items: [
                    {
                        label: 'Personal de Salud', icon: 'pi pi-pw pi-file', routerLink: 'historia/personal-salud',
                    },
                    {
                        label: 'Usuarios', icon: 'pi pi-pw pi-file', routerLink: 'historia/usuarios',
                    }
                ],
            },
            {
                label: 'Funciones Administrativas',
                items: [
                    {
                        icon: 'pi pi-file',
                        label: 'Cupos', routerLink: 'historia/cupos'
                    },

                    {
                        icon: 'pi pi-file',
                        label: 'Tipo Personal', routerLink: 'mantenimientos/tipo-personal'
                    }
                ],
            },

            {
                label: 'Funciones Asistenciales',
                items: [
                    {
                        icon: 'pi pi-file',
                        label: 'Enfermeria', routerLink: 'historia/enfermeria'
                    },
                    {
                        icon: 'pi pi-file',
                        label: 'Medicina General', routerLink: 'historia/medicina_general'
                    }
                ],
            },

            {
                label: 'Mantenimientos',
                items: [
                    {
                        icon: 'pi pi-file',
                        label: 'Tipo Personal', routerLink: 'mantenimientos/tipo-personal'
                    },

                    {
                        label: 'Ubicacion', icon: 'pi pi-pw pi-file', routerLink: 'mantenimientos/ubicacion',
                    },

                    {
                        icon: 'pi pi-pw pi-file',
                        label: 'Colegio Profesional', routerLink: 'mantenimientos/colegio-profesional',
                    },
                    {
                        icon: 'pi pi-pw pi-file',
                        label: 'Especialidad', routerLink: 'mantenimientos/especialidad',
                    },
                    {
                        icon: 'pi pi-pw pi-file',
                        label: 'Documentos de Identidad', routerLink: 'mantenimientos/documentoIdentidad',
                    }
                ],
            },

        ];
    }


    filterGroupedRoute(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.items) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    url: optgroup.url,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredRoutes = filteredGroups;
    }

    onSelect(event) {
        this.selectedRoute = null;
        this.router.navigate([event.url]);
    }
}
