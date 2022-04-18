import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ServicesService} from "../services-lab/services.service";
import {number} from "echarts";
import {ConsultasService} from "../../../../services/consultas.service";
import {PrestacionService} from "../../../../../../../../mantenimientos/services/prestacion/prestacion.service";
import {CieService} from "../../../../../../../services/cie.service";

@Component({
    selector: 'app-lab-solicitud',
    templateUrl: './lab-solicitud.component.html',
    styleUrls: ['./lab-solicitud.component.css']
})
export class LabSolicitudComponent implements OnInit {
    formSolicitudLab: FormGroup;
    listaSolicitud: any[] = [];
    listaSolicitud2: any[] = [];
    ListaLab: any;
    dataConsulta: any;
    idConsulta: string;
    prestacion2: any;


    PrestacionLaboratorio: any;
    procedimientos: any;

    Gestacion: any;
    nroAtencion: any;
    diagnosticosList: string;
    listaDeCIESIS: string;
    estadoEdicion: boolean;

    subTipoLaboratorio: any;
    listaDeCIE: any;
    LugarExamen: any;

    constructor(private ref: DynamicDialogRef,
                private DxService: ConsultasService,
                public config: DynamicDialogConfig,
                private servicesService: ServicesService,
                private prestacionService: PrestacionService,
                private CieService: CieService,
                private form: FormBuilder) {

        /**Usando localStorage **/
        this.dataConsulta = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));
        if (!this.estadoEdicion) {
            //guardar en el ls el nroAtencion
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
            this.nroAtencion = nroAtencion;
            console.log("entre a nueva consulta", this.nroAtencion)
        } else {
            let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
            this.nroAtencion = nroAtencion;
            console.log("entre a edicion consulta", this.nroAtencion)
        }

        this.idConsulta = this.dataConsulta.id;

        this.LugarExamen=[
            {nombre:"CONSULTORIO"},
            {nombre:"LABORATORIO"},
        ]
        this.subTipoLaboratorio = [
            {
                nombre: "HEMATOLOGIA"
            },
            {
                nombre: "INMUNOLOGIA"
            },
            {
                nombre: "BIOQUIMICA"
            },
            {
                nombre: "UROANALISIS"
            },
            {
                nombre: "PARASITOLOGIA"
            },
            {
                nombre: "MICROBIOLOGIA"
            },
            {
                nombre: "OTROS EXAMENES"
            },

        ]


    }

    ngOnInit(): void {
        this.buildForm();
        this.getPrestacion();
        this.recuperaDataPaciente();
        this.traerDiagnosticosDeConsulta();
        console.log("Gestacion", this.Gestacion)

    }

    getPrestacion() {
        this.prestacionService.getPrestacion().subscribe((resp) => {
            this.prestacion2 = resp['object']
            console.log("PRestacion", this.prestacion2[2].descripcion);
        })
    }

    filterCIE10(event) {
        this.CieService.getCIEByDescripcionTipo("EX", event.query).subscribe((res: any) => {
            this.listaDeCIE = res.object
        })
    }


    recuperaDataPaciente() {
        this.formSolicitudLab.get('edad').setValue(this.dataConsulta.anioEdad);
        this.formSolicitudLab.get('HCL').setValue(this.dataConsulta.nroHcl);
        this.formSolicitudLab.get('servicio').setValue(this.dataConsulta.servicio);
        this.formSolicitudLab.get('apellidosNombres').setValue(this.dataConsulta.datosPaciente.apePaterno + ' ' + this.dataConsulta.datosPaciente.apeMaterno + ' ' + this.dataConsulta.datosPaciente.primerNombre + ' ' + this.dataConsulta.datosPaciente.otrosNombres);
    }

    buildForm() {
        this.formSolicitudLab = this.form.group({
            lista: new FormControl(''),

            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            HCL: new FormControl(''),
            servicio: new FormControl(''),
            camaNro: new FormControl(''),
            DxPresuntivo: new FormControl(''),
            observaciones: new FormControl(''),

            /**EXAMENES**/
            HEMATOLOGIA: new FormControl({value: '', disabled: false}),
            INMUNOLOGIA: new FormControl({value: '', disabled: false}),
            BIOQUIMICA: new FormControl({value: '', disabled: false}),
            UROANALISIS: new FormControl({value: '', disabled: false}),
            PARASITOLOGIA: new FormControl({value: '', disabled: false}),
            MICRIBIOLOGIA: new FormControl({value: '', disabled: false}),
            OTROSEXAMENES: new FormControl({value: '', disabled: false}),

            examen: new FormControl({value: '', disabled: false}),
            diagnostico: new FormControl({value: '', disabled: false}),
            prestacion: new FormControl({value: '', disabled: false}),
            codPrestacion: new FormControl({value: '', disabled: true}),

            autocompleteSIS: new FormControl({value: '', disabled: false}),
            SISCIE: new FormControl({value: '', disabled: false}),
            diagnosticoSIS: new FormControl({value: '', disabled: false}),
            subTipo: new FormControl({value: '', disabled: false}),
            HISCIE: new FormControl({value: '', disabled: false}),
            diagnosticoHIS: new FormControl({value: '', disabled: false}),
            autocompleteHIS: new FormControl({value: '', disabled: false}),

        })
    }

    traerDiagnosticosDeConsulta() {
        this.DxService.listarDiagnosticosDeUnaConsulta(this.Gestacion.nroHcl, this.Gestacion.nroEmbarazo, this.nroAtencion).then((res: any) => {
            this.diagnosticosList = res.object;
            console.log("diagnosticos:", this.diagnosticosList);
        })
    }

    onChangeDiagnostico(event) {
        console.log("Evento", event.value)
        this.procedimientos = event.value.procedimientos;
        this.PrestacionLaboratorio = event.value;
        this.formSolicitudLab.get('codPrestacion').setValue(event.value.codigo);

        console.log("procedimiento", this.procedimientos)
    }

    selectedOptionNameCIE(event, cieType) {
        console.log('evento desde diagnos ', event);
        if (cieType == 0) {
            this.formSolicitudLab.patchValue({diagnosticoSIS: event.value.procedimiento});
            this.formSolicitudLab.patchValue({autocompleteSIS: ""});
            this.formSolicitudLab.patchValue({SISCIE: event.value}, {emitEvent: false});
            console.log(event.value)
        }
        if (cieType == 1) {
            this.formSolicitudLab.patchValue({diagnosticoHIS: event.descripcionItem});
            this.formSolicitudLab.patchValue({autocompleteHIS: ""});
            this.formSolicitudLab.patchValue({HISCIE: event}, {emitEvent: false});
        }
    }

    selectedOption(event, cieType) {
        if (cieType == 0) {
            this.formSolicitudLab.patchValue({diagnosticoSIS: event.value.procedimiento});
        }
        if (cieType == 1) {
            this.formSolicitudLab.patchValue({diagnosticoHIS: event.descripcionItem});
        }
    }

    recuperarLaboratorio(opcion) {
        console.log("opcion", opcion)
    }

    hem1() {
        // this.h1 = null;
        // if (this.formSolicitudLab.value.hemoglobina[0] != undefined) {
        //     this.h1 = {
        //         tipoLaboratorio: "EXAMEN_LABORATORIO",
        //         subTipo: "HEMATOLOGÍA",
        //         nombreExamen: this.formSolicitudLab.value.hemoglobina[0],
        //         nombreExamenSIS: "",
        //         cie10SIS: "85015",
        //         nombreUPS: "",
        //         nombreUPSaux: "",
        //         codPrestacion: "",
        //         codigoSIS: "",
        //         codigoHIS: "HIS",
        //         tipoDx: "",
        //         lab: "",
        //         lugarExamen: "CONSULTORIO",
        //         labExterno: false,
        //     }
        // }

        console.log(this.formSolicitudLab.value.HEMATOLOGIA);
    }

    add() {

        this.listaSolicitud2 = [];
        this.listaSolicitud = [];
        // this.listaSolicitud.push(this.h1)
        // this.listaSolicitud.push(this.h2)
        // this.listaSolicitud.push(this.h3)
        // this.listaSolicitud.push(this.h4)
        // this.listaSolicitud.push(this.h5)
        // this.listaSolicitud.push(this.h6)
        // this.listaSolicitud.push(this.h7)
        // console.log(this.listaSolicitud)
        for (let i = 0; i <= this.listaSolicitud.length; i++) {
            if (this.listaSolicitud[i] != undefined) {
                this.listaSolicitud2.push(this.listaSolicitud[i]);
            }
        }


        console.log("no se puede2")
        this.listaSolicitud.push(this.formSolicitudLab.value.otro1);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro2);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro3);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro4);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro5);
        this.listaSolicitud.push(this.formSolicitudLab.value.otro6);

        console.log(this.listaSolicitud2)

        const data = {
            servicio: this.formSolicitudLab.value.servicio,
            nroCama: this.formSolicitudLab.value.camaNro,
            dxPresuntivo: this.formSolicitudLab.value.DxPresuntivo,
            examenesAuxiliares: this.listaSolicitud2,
            observaciones: this.formSolicitudLab.value.observaciones,
        }
        console.log("DATA", data)
        // this.servicesService.addSolicitudLab(this.idConsulta, data).subscribe((res: any) => {
        //     console.log('SOLICITUD LAB', res);
        // })
    }
}