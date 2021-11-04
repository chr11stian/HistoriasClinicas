import {Component, Input, OnInit} from "@angular/core";
import {FilterService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"],
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
                label: "Administrador del Sistema",
                items: [
                    {
                        label: "Personal de Salud",
                        icon: "pi pi-pw pi-file",
                        routerLink: "admision/personal-salud",
                    },
                    {
                        label: "Usuarios",
                        icon: "pi pi-pw pi-file",
                        routerLink: "admision/usuarios",
                    },
                    {
                        label: "Institución Prestadora de Servicios de Salud",
                        icon: "pi pi-pw pi-file",
                        routerLink: "admision/ipress",
                    },
                ],
            },

            {
                label: "Historias Clinicas",
                items: [
                    {
                        label: "Obstetricia",
                        icon: "pi pi-pw pi-file",
                        routerLink: "historia/obstetricia",
                    },
                    {
                        icon: "pi pi-file",
                        label: "Rol Guardia",
                        routerLink: "historia/rol-guardia",
                    },
                    {
                        icon: "pi pi-file",
                        label: "Paciente",
                        routerLink: "historia/paciente",
                      },
                      {
                        icon: "pi pi-file",
                        label: "Cred",
                        routerLink: "cred/cabecera",
                      },
                      {
                        icon: "pi pi-file",
                        label: "Gestante",
                        routerLink: "gestante/cabecera",
                      }a
                ],
            },

            {
                label: "Funciones Administrativas",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Cupos",
                        routerLink: "historia/cupos",
                    },

                    {
                        icon: "pi pi-file",
                        label: "Paciente",
                        routerLink: "historia/paciente",
                    },
                    {
                        icon: "pi pi-file",
                        label: "Cred",
                        routerLink: "cred/cabecera",
                    },
                    {
                        icon: "pi pi-file",
                        label: "Gestante",
                        routerLink: "gestante",
                    }
                ],
            },

            {
                label: "Funciones Asistenciales",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Enfermeria",
                        routerLink: "historia/enfermeria",
                    },
                    {
                        icon: "pi pi-file",
                        label: "Medicina General",
                        routerLink: "historia/medicina_general",
                    },
                ],
            },

            {
                label: "Mantenimientos",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Tipo Personal",
                        routerLink: "mantenimientos/tipo-personal",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Tipo Turno",
                        routerLink: "mantenimientos/tipo-turno",
                    },
                    {
                        label: "Ubicacion",
                        icon: "pi pi-pw pi-file",
                        routerLink: "mantenimientos/ubicacion",
                    },

                    {
                        icon: "pi pi-pw pi-file",
                        label: "Colegio Profesional",
                        routerLink: "mantenimientos/colegio-profesional",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Especialidad",
                        routerLink: "mantenimientos/especialidad",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Grupo Etario",
                        routerLink: "mantenimientos/grupo-etario",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Documentos de Identidad",
                        routerLink: "mantenimientos/documento-identidad",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Etnia",
                        routerLink: "mantenimientos/etnia",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Categoria Establecimiento",
                        routerLink: "mantenimientos/categoria-establecimiento",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Red de Servicios de Salud",
                        routerLink: "mantenimientos/red-servicios-salud",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Condicion Paciente",
                        routerLink: "mantenimientos/condicion-paciente",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Nombre Comercial UPS",
                        routerLink: "mantenimientos/nombre-comercial-ups",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Condicion Paciente Riesgo",
                        routerLink: "mantenimientos/condicion-paciente-riesgo",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Tipo Seguro",
                        routerLink: "mantenimientos/tipo-seguro",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Tipo UPS",
                        routerLink: "mantenimientos/tipo-ups",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Condicion Paciente Discapacidad  ",
                        routerLink: "mantenimientos/condicion-paciente-discapacidad",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "Tipo Contrato",
                        routerLink: "mantenimientos/tipo-contrato",
                    },
                    {
                        icon: "pi pi-pw pi-file",
                        label: "UPS",
                        routerLink: "mantenimientos/ups",
                    },
                ],
            },
        ];
    }

    filterGroupedRoute(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.items) {
            let filteredSubOptions = this.filterService.filter(
                optgroup.items,
                ["label"],
                query,
                "contains"
            );
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    url: optgroup.url,
                    items: filteredSubOptions,
                });
            }
        }
    }
}
