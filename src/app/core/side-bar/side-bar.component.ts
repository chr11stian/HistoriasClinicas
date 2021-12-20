import {Component, Input, OnInit} from "@angular/core";
import {FilterService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";

const menu_geresa = [
    {
        label: "Triaje",
        items: [{
            label: "Paciente",
        }]
    },

    {
        label: "Admision",
        items: [
            {
                icon: "pi pi-file",
                label: "Cupos",
                routerLink: "admision/cupos",
            },
            {
                label: "Caja",
                icon: "pi pi-pw pi-file",
                routerLink: "caja/pagos",
            },
            {
                icon: "pi pi-file",
                label: "Paciente",
                routerLink: "admision/paciente",
            },
        ],
    },

    {
        label: "Historias Clinicas",
        items: [
            {
                icon: "pi pi-file",
                label: "obstetricia",
                items: [
                    {
                        label: "Citas",
                        routerLink: "obstetricia-general/citas",
                    },
                    {
                        label: "Historia de Consultas",
                        routerLink: "obstetricia-general/historia-consultas",
                    },
                ]
            },
            {
                icon: "pi pi-file",
                label: "cred",
                items: [
                    {
                        label: "Citas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/citas",
                    },
                    {
                        label: "Consultas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/consulta-cred-general",
                    },
                ]
            },

            {
                icon: "pi pi-file",
                label: "Medicina General",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Adolescente",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas",
                            },
                            {
                                label: "Consultas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas/consulta",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto/citas",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto Mayor",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto-mayor/citas",
                            },
                        ]
                    },
                ],
            },


            {
                icon: "pi pi-file",
                label: "Odontologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Psicologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Nutrición",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "FUA",
                routerLink: "fua/fua",
            },

        ],
    },

    {
        label: "Administración",
        items: [

            {
                icon: "pi pi-file",
                label: "Rol Guardia",
                routerLink: "historia/rol-guardia",
            },

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

        ],
    },


    {
        label: "Mantenimientos",
        items: [
            {
                label: "Crear Red",
                icon: "pi pi-pw pi-file",
                routerLink: "admision/ipress",
            },
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
                label: "Etapa de vida",
                routerLink: "mantenimientos/condicion-paciente",
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

const menu_red = [
    {
        label: "Triaje",
        items: [{
            label: "Paciente",
        }]
    },

    {
        label: "Admision",
        items: [
            {
                icon: "pi pi-file",
                label: "Cupos",
                routerLink: "admision/cupos",
            },
            {
                label: "Caja",
                icon: "pi pi-pw pi-file",
                routerLink: "caja/pagos",
            },
            {
                icon: "pi pi-file",
                label: "Paciente",
                routerLink: "admision/paciente",
            },
        ],
    },

    {
        label: "Historias Clinicas",
        items: [
            {
                icon: "pi pi-file",
                label: "obstetricia",
                items: [
                    {
                        label: "Citas",
                        routerLink: "obstetricia-general/citas",
                    },
                    {
                        label: "Historia de Consultas",
                        routerLink: "obstetricia-general/historia-consultas",
                    },
                ]
            },
            {
                icon: "pi pi-file",
                label: "cred",
                items: [
                    {
                        label: "Citas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/citas",
                    },
                    {
                        label: "Consultas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/consulta-cred-general",
                    },
                ]
            },

            {
                icon: "pi pi-file",
                label: "Medicina General",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Adolescente",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas",
                            },
                            {
                                label: "Consultas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas/consulta",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto/citas",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto Mayor",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto-mayor/citas",
                            },
                        ]
                    },
                ],
            },


            {
                icon: "pi pi-file",
                label: "Odontologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Psicologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Nutrición",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "FUA",
                routerLink: "fua/fua",
            },

        ],
    },

    {
        label: "Administración",
        items: [

            {
                icon: "pi pi-file",
                label: "Rol Guardia",
                routerLink: "historia/rol-guardia",
            },

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

        ],
    },


    {
        label: "Mantenimientos",
        items: [
            {
                label: "Crear Microred",
                icon: "pi pi-pw pi-file",
                routerLink: "admision/ipress",
            },
            {
                icon: "pi pi-pw pi-file",
                label: "Tipo Turno",
                routerLink: "mantenimientos/tipo-turno",
            },
            {
                icon: "pi pi-file",
                label: "Tipo Personal",
                routerLink: "mantenimientos/tipo-personal",
            },
        ],
    },
];

const menu_microred = [
    {
        label: "Triaje",
        items: [{
            label: "Paciente",
        }]
    },

    {
        label: "Admision",
        items: [
            {
                icon: "pi pi-file",
                label: "Cupos",
                routerLink: "admision/cupos",
            },
            {
                label: "Caja",
                icon: "pi pi-pw pi-file",
                routerLink: "caja/pagos",
            },
            {
                icon: "pi pi-file",
                label: "Paciente",
                routerLink: "admision/paciente",
            },
        ],
    },

    {
        label: "Historias Clinicas",
        items: [
            {
                icon: "pi pi-file",
                label: "obstetricia",
                items: [
                    {
                        label: "Citas",
                        routerLink: "obstetricia-general/citas",
                    },
                    {
                        label: "Historia de Consultas",
                        routerLink: "obstetricia-general/historia-consultas",
                    },
                ]
            },
            {
                icon: "pi pi-file",
                label: "cred",
                items: [
                    {
                        label: "Citas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/citas",
                    },
                    {
                        label: "Consultas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/consulta-cred-general",
                    },
                ]
            },

            {
                icon: "pi pi-file",
                label: "Medicina General",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Adolescente",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas",
                            },
                            {
                                label: "Consultas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas/consulta",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto/citas",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto Mayor",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto-mayor/citas",
                            },
                        ]
                    },
                ],
            },


            {
                icon: "pi pi-file",
                label: "Odontologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Psicologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Nutrición",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "FUA",
                routerLink: "fua/fua",
            },

        ],
    },

    {
        label: "Administración",
        items: [

            {
                icon: "pi pi-file",
                label: "Rol Guardia",
                routerLink: "historia/rol-guardia",
            },

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

        ],
    },


    {
        label: "Mantenimientos",
        items: [
            {
                label: "Crear Ipress",
                icon: "pi pi-pw pi-file",
                routerLink: "admision/ipress",
            },
            {
                icon: "pi pi-pw pi-file",
                label: "Tipo Turno",
                routerLink: "mantenimientos/tipo-turno",
            },
            {
                icon: "pi pi-file",
                label: "Tipo Personal",
                routerLink: "mantenimientos/tipo-personal",
            },
            {
                label: "Ubicacion",
                icon: "pi pi-pw pi-file",
                routerLink: "mantenimientos/ubicacion",
            },
        ],
    },
];

const menu_ipress = [
    {
        label: "Triaje",
        items: [{
            label: "Paciente",
        }]
    },

    {
        label: "Admision",
        items: [
            {
                icon: "pi pi-file",
                label: "Cupos",
                routerLink: "admision/cupos",
            },
            {
                label: "Caja",
                icon: "pi pi-pw pi-file",
                routerLink: "caja/pagos",
            },
            {
                icon: "pi pi-file",
                label: "Paciente",
                routerLink: "admision/paciente",
            },
        ],
    },

    {
        label: "Historias Clinicas",
        items: [
            {
                icon: "pi pi-file",
                label: "obstetricia",
                items: [
                    {
                        label: "Citas",
                        routerLink: "obstetricia-general/citas",
                    },
                    {
                        label: "Historia de Consultas",
                        routerLink: "obstetricia-general/historia-consultas",
                    },
                ]
            },
            {
                icon: "pi pi-file",
                label: "cred",
                items: [
                    {
                        label: "Citas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/citas",
                    },
                    {
                        label: "Consultas",
                        icon: "pi pi-pw pi-file",
                        routerLink: "cred/consulta-cred-general",
                    },
                ]
            },

            {
                icon: "pi pi-file",
                label: "Medicina General",
                items: [
                    {
                        icon: "pi pi-file",
                        label: "Adolescente",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas",
                            },
                            {
                                label: "Consultas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adolescente/citas/consulta",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto/citas",
                            },
                        ]
                    },
                    {
                        icon: "pi pi-file",
                        label: "Adulto Mayor",
                        items: [
                            {
                                label: "Citas",
                                icon: "pi pi-pw pi-file",
                                routerLink: "adulto-mayor/citas",
                            },
                        ]
                    },
                ],
            },


            {
                icon: "pi pi-file",
                label: "Odontologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Psicologia",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "Nutrición",
                items: []
            },

            {
                icon: "pi pi-file",
                label: "FUA",
                routerLink: "fua/fua",
            },

        ],
    },

    {
        label: "Administración",
        items: [

            {
                icon: "pi pi-file",
                label: "Rol Guardia",
                routerLink: "historia/rol-guardia",
            },

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

        ],
    },


    {
        label: "Mantenimientos",
        items: [
            {
                label: "Ipress",
                icon: "pi pi-pw pi-file",
                routerLink: "admision/ipress",
            },
            {
                icon: "pi pi-file",
                label: "Tipo Personal",
                routerLink: "mantenimientos/tipo-personal",
            },
        ],
    },
];
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

    ngOnInit(): void {
        let token = JSON.parse(localStorage.getItem('token'));
        console.log('token en side bar', token)

        switch (token.roles) {
            case "GERESA":
                this.items = menu_geresa;
                break;
            case "RED":
                this.items = menu_red;
                break;
            case "MICRORED":
                this.items = menu_microred;
                break;
            case "IPRESS":
                this.items = menu_ipress;
                break;
        }
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

        this.filteredRoutes = filteredGroups;
    }

    onSelect(event) {
        this.selectedRoute = null;
        this.router.navigate([event.url]);
    }
}
