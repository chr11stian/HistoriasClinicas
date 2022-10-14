import { InmunizacionesService } from "./../../../../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/services/inmunizaciones.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import { AtencionesPrenatalesModalComponent } from "../atenciones-prenatales-modal/atenciones-prenatales-modal.component";
import { InteconsultaObstetriciaModalComponent } from "../inteconsulta-obstetricia-modal/inteconsulta-obstetricia-modal.component";

@Component({
    selector: "app-step-general-consulta",
    templateUrl: "./step-general-consulta.component.html",
    styleUrls: ["./step-general-consulta.component.css"],
    providers: [DialogService],
})
export class StepGeneral_consultaComponent implements OnInit {
    tooltipItems: MenuItem[];
    ref: DynamicDialogRef;
    options: data[];
    selectedOption: data;
    items: MenuItem[];
    indiceActivo: number = 0;
    stepName = "datos";

    data: any;
    IDConsulta: string = null;
    //-- inmunizaciones
    dialogInmunizaciones: boolean;
    formInmunizaciones: FormGroup;
    dataInmunizaciones;
    listInmunizaciones = [
        {
            nombre: "DTPA",
            his: "90715",
            checked: true,
        },
        {
            nombre: "DT",
            his: "90714",
            checked: false,
        },
        {
            nombre: "DPT",
            his: "90701",
            checked: true,
        },
    ];

    constructor(
        private dialog: DialogService,
        public serviceInmunizacion: InmunizacionesService
    ) {
        this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Interconsulta",
                    tooltipPosition: "left",
                },
                icon: "pi pi-reply",
                command: (event: Event) => {
                    this.openDialogInterconsultaObstetricia();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Inmunizaciones",
                    tooltipPosition: "left",
                },
                icon: "pi pi-calendar",
                command: (event: Event) => {
                    this.openDialogInmunizaciones();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Atenciones Prenatales",
                    tooltipPosition: "left",
                },
                icon: "pi pi-tablet",
                command: (event: Event) => {
                    this.openDialogAtencionesPrenatales();
                },
            },
        ];
        this.options = [
            { name: "DNI", code: 1 },
            { name: "CARNET RN", code: 2 },
            { name: "C EXTRANJERIA", code: 3 },
            { name: "OTROS", code: 4 },
        ];
        this.IDConsulta = JSON.parse(localStorage.getItem("IDConsulta"));
    }

    ngOnInit(): void {
        this.items = [
            { label: "Datos Generales" },
            { label: "Interrogatorio" },
            { label: "Tamizaje" },
            { label: "Exámenes Auxiliares" },
            { label: "Diagnosticos" },
            { label: "Procedimientos" },
            { label: "Tratamientos" },
            { label: "Referencia" },
        ];
    }

    name() {
        switch (this.indiceActivo) {
            case 7:
                this.stepName = "finalizar";
                break;
            case 6:
                this.stepName = "tratamiento";
                break;
            case 5:
                this.stepName = "procedimientos";
                // this.stepName = "tratamiento"
                break;
            case 4:
                this.stepName = "diagnostico";
                break;
            case 3:
                this.stepName = "evaluaciones";
                break;
            case 2:
                {
                    console.log("data id consulta ", this.IDConsulta);
                    if (this.IDConsulta == null) {
                        Swal.fire({
                            icon: "warning",
                            title: "Consulta",
                            text: "No resgistrada",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return;
                    } else {
                        this.stepName = "tamizaje";
                    }
                }
                break;

            case 1:
                this.stepName = "interrogatorio";
                break;
            case 0:
                this.stepName = "datos";
                break;
        }
    }

    ChangeStep(event: number) {
        this.indiceActivo = event;
        // console.log("INDEX", this.indiceActivo)
        this.name();
    }
    openDialogAtencionesPrenatales() {
        this.ref = this.dialog.open(AtencionesPrenatalesModalComponent, {
            header: "ATENCIONES PRENATALES",
            contentStyle: {},
            style: {
                width: "80%",
            },
        });
    }
    openDialogInterconsultaObstetricia() {
        this.ref = this.dialog.open(InteconsultaObstetriciaModalComponent, {
            data:{idConsulta:this.IDConsulta},
            header: "INTERCONSULTA",
            contentStyle: {},
            style: {
                width: "80%",
            },
        });
    }
    buildForm() {
        this.formInmunizaciones = new FormGroup({});
    }
    openDialogInmunizaciones() {
        this.cargarInmunizaciones();
        this.dialogInmunizaciones = true;
    }
    checkValue(event: any) {
        this.dataInmunizaciones = [];
        event.map((index) => {
            this.dataInmunizaciones.push(index);
        });
    }
    saveInmunizaciones() {
        let body: any = [];
        this.dataInmunizaciones.map((index) => {
            body.push({
                nombre: index,
                idConsulta: JSON.parse(localStorage.getItem("IDConsulta")),
            });
        });
        this.serviceInmunizacion
            .saveSolicitudInmunizacion(body)
            .subscribe((r: any) => {
                if (r.cod == 2125) {
                    Swal.fire({
                        icon: "success",
                        text: "Se agrego con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                if (r.cod == 2010) {
                    Swal.fire({
                        icon: "warning",
                        text: "Datos duplicados",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    }
    cargarInmunizaciones() {
        this.dataInmunizaciones = [];
        this.serviceInmunizacion
            .getSolicitudInmunizaciones(
                JSON.parse(localStorage.getItem("gestacion")).nroDoc
            )
            .subscribe((r: any) => {
                r.object.map((obj: any) => {
                    this.dataInmunizaciones.push(obj.nombre);
                });
            });
    }
    eliminarInmunizacion(id, row) {}
}

interface data {
    name: string;
    code: number;
}
