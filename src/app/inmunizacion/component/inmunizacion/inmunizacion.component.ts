import { PersonalService } from "./../../../core/services/personal-services/personal.service";
import { inmunizaciones } from "./../../../cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {
    inmunizacionObject,
    inmunizacionesInterface,
    listInmunizaciones,
} from "./../../interface/inmunizacion.interface";
import { InmunizacionesService } from "./../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/services/inmunizaciones.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
@Component({
    selector: "app-inmunizacion",
    templateUrl: "./inmunizacion.component.html",
    styleUrls: ["./inmunizacion.component.css"],
    providers: [DialogService],
})
export class InmunizacionComponent implements OnInit {
    formListaLabo: FormGroup;
    datePipe = new DatePipe("en-US");
    fechaActual = new Date();
    idIpres = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
    dataInmunizaciones: inmunizacionesInterface[];

    loading: boolean = true;
    ref: DynamicDialogRef;

    //---inmunizaciones
    dialogInmunizaciones: boolean;
    dataListPersonInmunizaciones: listInmunizaciones[];
    tituloDialog: string;

    //--aplicar inmunizacion
    dialogAplicaInmunizacion: boolean;
    tituloInmunizacion: string;
    formInmunizaciones: FormGroup;
    idInmunizacion: string;

    //--rol
    data;
    viaAdministracionList = [
        { name: "Intradermica", code: "INTRADERMICA" },
        { name: "Intramuscular", code: "INTRAMUSCULAR" },
        { name: "Via Oral", code: "VIA ORAL" },
        { name: "Via Subcutanea", code: "VIA SUBCUTANEA" },
    ];
    dosisList = [
        { name: "0.1 CC", code: "0.1 CC" },
        { name: "0.25 CC", code: "0.25 CC" },
        { name: "0.5 CC", code: "0.5 CC" },
        { name: "1 CC", code: "1 CC" },
        { name: "2 gotas", code: "0.1 CC" },
    ];
    constructor(
        private fb: FormBuilder,
        private dialog: DialogService,
        private serviceInmunizacion: InmunizacionesService,
        private personalservice: PersonalService
    ) {}

    ngOnInit(): void {
        this.data = JSON.parse(localStorage.getItem("usuario"));
        this.buildForm();
        this.cargarInmunizaciones();
    }

    buildForm() {
        this.formListaLabo = this.fb.group({
            fechaInicio: new FormControl(""),
            fechaBusqueda: new FormControl(""),
            tipoDoc: new FormControl(""),
            nroDoc: new FormControl(""),
        });
        this.formInmunizaciones = this.fb.group({
            viaAdministracion: new FormControl(""),
            dosis: new FormControl(""),
            tipoDosis: new FormControl(""),
            tipoDx: new FormControl(""),
            cantidad: new FormControl(""),
            lote: new FormControl(""),
        });
    }
    cargarInmunizaciones() {
        this.dataInmunizaciones = [];
        this.serviceInmunizacion
            .getListInmunizaciones()
            .subscribe((r: inmunizacionObject) => {
                this.dataInmunizaciones = r.object;
            });
    }
    openDialogInmunizacion(data: any) {
        this.tituloDialog =
            "INMUNIZACIONES DE " +
            data.datosPaciente.apePaterno +
            " " +
            data.datosPaciente.apeMaterno +
            " " +
            data.datosPaciente.primerNombre +
            " " +
            data.datosPaciente.otrosNombres;
        this.dialogInmunizaciones = true;
        let inmunizacion: any[] = [];
        data.inmunizaciones.map((aux) => {
            inmunizacion.push({
                ...aux,
                id: aux.idInmunizacion,
                estado: "pendiente",
                datosPaciente: {
                    nroDoc: data.datosPaciente.nroDoc,
                    tipoDoc: data.datosPaciente.tipoDoc,
                },
            });
        });
        this.dataListPersonInmunizaciones = inmunizacion;
        console.log("list", inmunizacion);
    }
    saveInmunizaciones() {
        this.dataListPersonInmunizaciones.map((aux) => {
            delete aux.idInmunizacion;
        });
        console.log("body", this.dataListPersonInmunizaciones);
        this.serviceInmunizacion
            .saveListInmunizaciones(this.dataListPersonInmunizaciones)
            .subscribe((r: any) => {
                if (r.cod == 2125) {
                    Swal.fire({
                        icon: "success",
                        text: "Se agrego con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }

                this.dialogInmunizaciones = false;
                this.cargarInmunizaciones();
            });
    }
    openDialogAplicarInmunizacion(inmunizacion: listInmunizaciones) {
        this.inicializarForm();
        this.tituloInmunizacion = "INMUNIZACION: " + inmunizacion.nombre;
        this.idInmunizacion = inmunizacion.id;
        this.dialogAplicaInmunizacion = true;
        console.log("inmunizacion", inmunizacion);
    }
    inicializarForm() {
        this.formInmunizaciones.get("viaAdministracion").setValue("");
        this.formInmunizaciones.get("dosis").setValue("");
        this.formInmunizaciones.get("lote").setValue("");
        this.formInmunizaciones.get("cantidad").setValue("");
    }

    updateInmunizacion() {
        console.log("inmunizacion", this.idInmunizacion);
        let i = this.dataListPersonInmunizaciones.findIndex(
            (aux) => aux.id === this.idInmunizacion
        );
        //--rol obstetricia - enfermeria
        let nombreUPS;
        this.personalservice
            .listServiceStaff(this.data.nroDocumento)
            .subscribe((r: any) => {
                nombreUPS = r.object[0].roles[0].nombreUPS;
            });
        this.dataListPersonInmunizaciones[i].tipoDx = "D";
        this.dataListPersonInmunizaciones[i].estado = "administrado";
        this.dataListPersonInmunizaciones[i].nombreUPS =
            nombreUPS === "ATENCION INTEGRAL DEL NINO"
                ? "ENFERMERIA"
                : nombreUPS;
        this.dataListPersonInmunizaciones[i].nombreUPSaux = "INMUNIZACIONES";
        this.dataListPersonInmunizaciones[i].cantidad =
            this.formInmunizaciones.value.cantidad;
        this.dataListPersonInmunizaciones[i].lote =
            this.formInmunizaciones.value.lote;
        this.dataListPersonInmunizaciones[i].viaAdministracion =
            this.formInmunizaciones.value.viaAdministracion === ""
                ? this.viaAdministracionList[0].name
                : this.formInmunizaciones.value.viaAdministracion;
        this.dataListPersonInmunizaciones[i].dosis =
            this.formInmunizaciones.value.dosis === ""
                ? this.dosisList[0].name
                : this.formInmunizaciones.value.dosis;
        this.dataListPersonInmunizaciones[i].codPrestacion = "001";

        if (this.dataListPersonInmunizaciones[i].nombre === "DTPA") {
            this.dataListPersonInmunizaciones[i].cie10SIS = "90715";
            this.dataListPersonInmunizaciones[i].codProcedimientoHIS = "90715";
            this.dataListPersonInmunizaciones[i].nombreComercial =
                "VACUNA PARA TÉTANOS TOXOIDE DIFTÉRICO Y VACUNA ACELULAR DE PERTUSIS (TDAP) CUANDO SE ADMINISTRA A INDIVIDUOS DE 7 AÑOS O MAS PARA USO INTRAMUSCULAR";
        }
        if (this.dataListPersonInmunizaciones[i].nombre === "DT") {
            this.dataListPersonInmunizaciones[i].cie10SIS = "90714";
            this.dataListPersonInmunizaciones[i].codProcedimientoHIS = "90714";
            this.dataListPersonInmunizaciones[i].nombreComercial =
                "TOXOIDE TETÁNICO Y DIFETÉRICO (TD) ADSOBIDO LIBRE DE PRESERVANTE CUANDO SE ADMINISTRA EN INDIVIDUOS DE 7 AÑOS O MAYORES PARA USO INTRAMUSCULAR";
        }
        if (this.dataListPersonInmunizaciones[i].nombre === "DPT") {
            this.dataListPersonInmunizaciones[i].cie10SIS = "90701";
            this.dataListPersonInmunizaciones[i].codProcedimientoHIS = "90701";
            this.dataListPersonInmunizaciones[i].nombreComercial =
                "ADMINISTRACIÓN DE DPT";
        }
        this.dialogAplicaInmunizacion = false;
        console.log("listIN2", this.dataListPersonInmunizaciones);
    }
}
