import { TratamientoConsultaService } from './../../services/tratamiento-consulta.service';
import { his } from './../../models/his';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import {
    dato,
    motivoConsultaInterface,
    proxCita,
} from "../../../../models/data";
import { SpinnerHandlerService } from "src/app/core/services/spinner-handler.service";
import { DatePipe } from "@angular/common";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { MenuItem, MessageService } from "primeng/api";
import { FinalizarConsultaService } from "../../services/finalizar-consulta.service";

@Component({
    selector: "app-tratamiento-consulta",
    templateUrl: "./tratamiento-consulta.component.html",
    styleUrls: ["./tratamiento-consulta.component.css"],
})
export class TratamientoConsultaComponent implements OnInit {
    data: dato;
    attributeLocalS = "documento";
    //--Interconsulta
    tooltipItems: MenuItem[];
    interconsulta: proxCita[] = [];
    listInterconsulta: proxCita[] = [];
    dialogInterconsulta: boolean;
    formInterconsulta: FormGroup;
    isUpdate: boolean = false;
    datePipe = new DatePipe("en-US");
    fecha: Date;
    servicios: string[] = [];
    loading: boolean = false;
    urgencia = [
        { name: "Nivel 1", code: "Nivel 1" },
        { name: "Nivel 2", code: "Nivel 2" },
        { name: "Nivel 3", code: "Nivel 3" },
        { name: "Nivel 4", code: "Nivel 4" },
        { name: "Nivel 5", code: "Nivel 5" },
    ];
    //--HIS
    dialogHIS: boolean;
    isUpdateHIS: boolean = false;
    formHIS: FormGroup;
    listHIS: his[] = [];
    nexDate: NextDate;
    constructor(
        private tratamientoService: TratamientoConsultaService,
        private rolGuardiaService: RolGuardiaService,
        private consultaGeneralService: ConsultaGeneralService,
        private finalizarConsulta: FinalizarConsultaService
    ) {
        this.build();
        // this.nexDate = this.consultaGeneralService.fecha
        console.log("proxima citaaaa ", this.nexDate);
    }
    build() {
        /* Interconsulta */
        this.formInterconsulta = new FormGroup({
            fecha: new FormControl({ value: null, disabled: false }, []),
            motivo: new FormControl({ value: "", disabled: false }, []),
            servicio: new FormControl({ value: "", disabled: false }, []),
            urgencia: new FormControl({ value: "", disabled: false }, []),
        });
    }
    ngOnInit(): void {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
        /* interconsulta */
        this.ListaServicios();
        this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Reporte",
                    tooltipPosition: "left",
                },
                icon: "pi pi-desktop",
                command: (event: Event) => {
                    this.open();
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Interconsulta",
                    tooltipPosition: "left",
                },
                icon: "pi pi-external-link",
                command: (event: Event) => {
                    this.open();
                },
            },
        ];
        /* lista interconsulta */
        this.listaInterconsulta();
        /* his */
        this.cargarHis();
    }

    /* interconsulta */
    open(): void {
        this.isUpdate = false;
        this.formInterconsulta.reset();
        this.formInterconsulta.get("fecha").setValue("");
        this.formInterconsulta.get("motivo").setValue("");
        this.formInterconsulta.get("servicio").setValue("");
        this.formInterconsulta.get("urgencia").setValue("");
        this.dialogInterconsulta = true;
    }
    ListaServicios() {
        let idIpress = JSON.parse(localStorage.getItem("usuario")).ipress
            .idIpress;
        this.rolGuardiaService
            .getServiciosPorIpress(idIpress)
            .subscribe((res: any) => {
                this.servicios = res.object;
                console.log("LISTA DE SERVICIOS DE IPRESSS", this.servicios);
            });
    }

    eliminarInterconsulta(id, index) {
        this.listInterconsulta.splice(index, 1);
        console.log();
        this.consultaGeneralService
            .deleteInterconsulta(this.data.idConsulta, id)
            .subscribe((r: any) => {
                console.log(r.object);
            });
    }
    listaInterconsulta() {
        this.consultaGeneralService
            .listInterconsulta(this.data.idConsulta)
            .subscribe((r: any) => {
                this.listInterconsulta = r.object;
            });
    }
    agregarInterconsulta() {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1000);
        /* agregar */
        if (
            this.formInterconsulta.value.fecha != null &&
            this.formInterconsulta.value.motivo != "" &&
            this.formInterconsulta.value.servicio != ""
        ) {
            let interconsulta: proxCita = {
                fecha: this.datePipe.transform(
                    this.formInterconsulta.value.fecha,
                    "yyyy-MM-dd"
                ),
                motivo: this.formInterconsulta.value.motivo.toUpperCase(),
                servicio: this.formInterconsulta.value.servicio,
                nivelUrgencia: this.formInterconsulta.value.urgencia,
            };
            this.consultaGeneralService
                .addInterconsulta(this.data.idConsulta, interconsulta)
                .subscribe((r: any) => {
                    this.listInterconsulta = r.object;
                });
            Swal.fire({
                icon: "success",
                title: "Agregado correctamente",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Datos incompletos",
                text: "",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    concludeConsultation(): void {
        this.nexDate = {
            fecha: this.consultaGeneralService.fecha,
            motivo: null,
        };
        this.finalizarConsulta
            .putNextAppointment(this.data.idConsulta, this.nexDate)
            .then((res) => {
                console.log("se guardo la proxima cita");
            });
    }
    /* his */
    his() {
        this.isUpdateHIS = false;
        this.dialogHIS = true;
    }
    cargarHis() {
        this.tratamientoService
            .getHIS(this.data.idConsulta)
            .subscribe((r: any) => {
                this.listHIS = r.object;
                console.log("his", this.listHIS);
            });
    }
}

interface NextDate {
    fecha: string;
    motivo?: string;
}
