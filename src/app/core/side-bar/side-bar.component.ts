import {
    inmunizaciones
} from "./../../cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {escala} from "./../../cred/citas/models/data";
import {Component, Input, OnInit, DoCheck} from "@angular/core";
import {FilterService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";

const menu_geresa = [
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
                label: "Antecedentes Pacientes",
                routerLink: "mantenimientos/antecedentes-paciente",
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
            {
                icon: "pi pi-pw pi-file",
                label: "Prestacion",
                routerLink: "mantenimientos/prestacion",
            },
            {
                icon: "pi pi-file",
                label: "Medicamentos",
                routerLink: "mantenimientos/medicamentos",
            },
            {
                icon: "pi pi-file",
                label: "Laboratorio",
                routerLink: "mantenimientos/laboratorio",
            },
        ],
    },
];

const menu_red = [
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

const administracion1 = {
    label: "Administración",
    icon: "pi pi-sitemap",
    items: [
        {
            icon: "pi pi-desktop",
            label: "Rol Guardia",
            routerLink: "historia/rol-guardia",
        },

        {
            label: "Personal de Salud",
            icon: "pi pi-users",
            routerLink: "admision/personal-salud",
        },
        {
            label:"Visitas domiciliarias",
            icon: "pi pi pi-home",
            routerLink: "visitas-domiciliarias/ipress-ninios",
        }
        /*{
            label: "Usuarios",
            icon: "pi pi-pw pi-file",
            routerLink: "admision/usuarios",
        },*/
    ],
};
const administracion2 = {
    label: "Mantenimientos",
    icon: "pi pi-cog",
    items: [
        {
            icon: "pi pi-sliders-v",
            label: "Modificar Consulta",
            items: [
                {
                    icon: "pi pi-sliders-v",
                    label: "Consultas del dia",
                    routerLink: "admision/consulta",
                },
                {
                    icon: "pi pi-sliders-v",
                    label: "LAB & TDx",
                    routerLink: "admision/consultalab",
                },
            ],
        },
        {
            label: "Ipress Roles",
            icon: "pi pi-pw pi-sliders-v",
            routerLink: "admision/ipress-roles",
        },
        {
            label: "Ipress Ambientes",
            icon: "pi pi-pw pi-sliders-v",
            routerLink: "admision/ipress-ambientes",
        },
        {
            label: "Ups Auxiliar",
            icon: "pi pi-pw pi-sliders-v",
            routerLink: "mantenimientos/ups-aux",
        },
        {
            label: "Ipress Turnos",
            icon: "pi pi-pw pi-sliders-v",
            routerLink: "admision/ipress-turnos",
        },

        /* {
            label: "Ipress Horarios",
            icon: "pi pi-pw pi-file",
            routerLink: "admision/ipress-horarios",
        }, */
        {
            label: "Ipress Tarifario",
            icon: "pi pi-pw pi-sliders-v",
            routerLink: "admision/ipress-tarifario",
        },
        {
            icon: "pi pi-sliders-v",
            label: "Ipress Farmacia",
            routerLink: "admision/ipress-farmacia",
        },
        {
            icon: "pi pi-sliders-v",
            label: "Ipress Laboratorio",
            routerLink: "admision/ipress-laboratorio",
        },

        // {
        //     icon: "pi pi-sliders-v",
        //     label: "His",
        //     routerLink: "admision/ipress-his",
        // },
    ],
};
const triaje = {
    label: "Triaje",
    icon: "pi pi-user-edit",
    items: [
        {
            icon: "pi pi-book",
            label: "Triaje",
            routerLink: "triaje/registrar",
        },
    ],
};
const admision = {
    label: "Admision",
    icon: "pi pi-sitemap",
    items: [
        {
            icon: "pi pi-id-card",
            label: "Cupos",
            routerLink: "admision/atenciones",
        },
        /* {
            label: "Caja",
            icon: "pi pi-inbox",
            routerLink: "caja/abrir-caja",
        }, */
        {
            icon: "pi pi-users",
            label: "Paciente",
            routerLink: "admision/paciente",
        },
    ],
};
const historias = {
    label: "Historias Clinicas",
    icon: "pi pi-users",
    items: [
        {
            icon: "pi pi-chart-bar",
            label: "Obstetricia",
            items: [
                {
                    label: "Citas",
                    icon: "pi pi-home",
                    routerLink: "obstetricia-general/citas",
                },
                /*{
                    label: "Historia de Consultas",
                    routerLink: "obstetricia-general/historia-consultas",
                },*/
                {
                    label: "Padron nominal",
                    icon: "pi pi-book",
                    routerLink: "padron-nominal-gestante/mantenimiento",
                },
            ],
        },
        {
            icon: "pi pi-chart-line",
            label: "Consultorio Niño/Niña Sano",
            items: [
                {
                    label: "Citas",
                    icon: "pi pi-home",
                    routerLink: "cred/citas",
                },
                /*{
                    label: "Consultas",
                    icon: "pi pi-pw pi-file",
                    routerLink: "cred/consulta-cred-general",
                },*/
            ],
        },
        {
            icon: "pi pi-heart",
            label: "Medicina General",
            items: [
                {
                    label: "Citas",
                    icon: "pi pi-home",
                    routerLink:
                        "consulta-generica/lista-cita/MEDICINA GENERAL",
                },
            ],
        },

        {
            icon: "pi pi-tablet",
            label: "Odontologia",
            items: [
                {
                    label: "Citas",
                    icon: "pi pi-home",
                    routerLink:
                        "consulta-generica/lista-cita/ODONTOLOGIA GENERAL",
                },
            ],
        },
        {
            icon: "pi pi-id-card",
            label: "Psicologia",
            items: [
                {
                    label: "Citas",
                    icon: "pi pi-home",
                    routerLink: "consulta-generica/lista-cita/PSICOLOGIA",
                },
            ],
        },

        {
            icon: "pi pi-globe",
            label: "Nutrición",
            items: [
                {
                    label: "Citas",
                    icon: "pi pi-home",
                    routerLink: "consulta-generica/lista-cita/NUTRICION",
                },
            ],
        },
        /* {
            icon: "pi pi-th-large",
            label: "FUA",
            routerLink: "fua/fua",
        }, */
    ],
};
const laboratorio = {
    label: "Laboratorio",
    icon: "pi pi-search",
    items: [
        {
            label: "Laboratorio",
            icon: "pi pi-pw pi-desktop",
            routerLink: "laboratorios/lista-laboratorio",
        },
    ],
};
const Inmunizacion = {
    label: "Inmunizacion",
    icon: "pi pi-folder",
    items: [
        {
            label: "Inmunizacion",
            icon: "pi pi-pw pi-desktop",
            routerLink: "inmunizacion/Inmunizacion",
        },
    ],
};
const reportes = {
    label: "Reportes",
    icon: "pi pi-send",
    items: [
        {
            label: "Reportes HIS",
            icon: "pi pi-pw pi-paperclip",
            routerLink: "reportes/reportes-his",
        },
    ],
};
const farmacia = {
    label: "Farmacia",
    icon: "pi pi-print",
    items: [
        {
            label: "Sistema Farmacia",
            icon: "pi pi-sitemap",
            routerLink: "admision/ipress-farmacia",
        },
    ],
};
const visitas = {
    label: "Visitas Domiciliarias ",
    icon: "pi pi-home",
    items: [
        {
            label: "Niño(a)s",
            icon: "pi pi-user",
            routerLink: "visitas-domiciliarias/profesional-ninios",
        },
        {
            label: "Gestantes",
            icon: "pi pi-users",
            routerLink: "visitas-domiciliarias/profesional-gestantes",
        },
        {
            label: "Puerperas",
            icon: "pi pi-user-plus",
            routerLink: "visitas-domiciliarias/profesional-puerperas",
        },
        {
            label: "PN Gestantes",
            icon: "pi pi-book",
            routerLink: "padron-nominal-gestante/mantenimiento",
        },
        // {
        //     label:"Visitas domiciliarias",
        //     icon: "pi pi pi-home",
        //     routerLink:"visitas-domiciliarias/ipress-ninios",
        // },
        // {
        //     label:"About",
        //     icon:"pi pi-angle-right",
        //     routerLink:"about/nosotros",
        // },
        // {
        //     label:"profile",
        //     icon:"pi pi-angle-right",
        //     routerLink:"about/profile-detail",
        // }
    ],
};
const root = {
    label: "Administración",
    icon: "pi pi-home",
    items: [
        {
            label: "Administradores",
            icon: "pi pi-pw pi-users",
            routerLink: "admision/personal-salud",
        },
        {
            label: "Ipress",
            icon: "pi pi-pw pi-calendar",
            routerLink: "admision/ipress",
        },
        {
            label: "HIS",
            icon: "pi pi-book",
            routerLink: "mantenimientos/his-crud",
        },
        {
            label: "Centro Poblado",
            icon: "pi pi-pw pi-share-alt",
            routerLink: "admision/centro-poblado",
        },
        {
            icon: "pi pi-th-large",
            label: "Unidad ejecutora",
            routerLink: "mantenimientos/unidad-ejecutora",
        },
        {
            icon: "pi pi-tablet",
            label: "Prestacion",
            routerLink: "mantenimientos/prestacion",
        },
        {
            icon: "pi pi-file",
            label: "Medicamentos",
            routerLink: "mantenimientos/medicamentos",
        },
        {
            icon: "pi pi-file",
            label: "Laboratorio",
            routerLink: "mantenimientos/laboratorio",
        },
    ],
};

const menu_ipress = [];
const menu_root = [];

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit, DoCheck {
    model: MenuItem[] = [];
    items: MenuItem[] = [];
    filteredRoutes: any[];
    selectedRoute: any;
    @Input() active: boolean;
    rol: any;

    activeSubmenus: { [key: string]: boolean } = {};

    constructor(private filterService: FilterService, private router: Router) {
    }

    build() {
        if (this.rol === "ROLE_ADMIN") {
            menu_ipress.length = 0;
            menu_ipress.push(administracion1);
            menu_ipress.push(administracion2);
        }
        if (this.rol === "ROLE_TEC_ADMINI_PERSONAL") {
            menu_ipress.length = 0;
            menu_ipress.push(admision);
        }
        if (this.rol === "ROLE_ENF_PERSONAL") {
            menu_ipress.length = 0;
            menu_ipress.push(triaje);
            menu_ipress.push(historias);
            menu_ipress.push(laboratorio);
            menu_ipress.push(Inmunizacion);
            menu_ipress.push(reportes);
        }
        if (this.rol === "ROLE_LAB_PERSONAL") {
            menu_ipress.length = 0;
            menu_ipress.push(laboratorio);
        }
        if (this.rol === "ROLE_FARM_PERSONAL") {
            menu_ipress.length = 0;
            menu_ipress.push(farmacia);
        }
        if (this.rol === "VISITA_DOMICILIARIA_PROFESIONAL") {
            menu_ipress.length = 0;
            menu_ipress.push(visitas);
        }
        if (this.rol === "ROLE_ADMININ_PERSONAL") {
            menu_root.length = 0;
            menu_root.push(root);
        }
    }

    ngDoCheck() {
        this.rol = JSON.parse(localStorage.getItem("rol"));
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.build();
        }, 100);
        setTimeout(() => {
            this.menu();
        }, 100);
    }

    menu() {
        let data = JSON.parse(localStorage.getItem("usuario"));
        if (data.escalas[0] == "sistema") this.items = menu_root;
        switch (data.escalas[0].escala) {
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
