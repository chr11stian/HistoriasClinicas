import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../../obstetricia-general/services/obstetricia-general.service";
import Swal from "sweetalert2";
import {CieService} from "../../../../../../../obstetricia-general/services/cie.service";

@Component({
    selector: 'app-modal-nosologico',
    templateUrl: './modal-nosologico.component.html',
    styleUrls: ['./modal-nosologico.component.css']
})
export class ModalNosologicoComponent implements OnInit {
    FormNosologico: FormGroup;
    dataTratamientosComunes: any[] = [];
    dialogTratamiento = false;
    formTratamientoSuplementos: FormGroup;
    dataTratamientosSuplementos: any[] = [];
    dialogTratamientoSuplementos = false;
    estadoEditar: boolean = false;
    idObstetricia: string;
    isUpdate: boolean = false;
    idUpdate: string = "";
    /*LISTA CIE 10*/
    intervaloList: any[];
    viaadministracionList: any[];

    diagnosticoDialog: boolean;
    opcionBusqueda: string;
    formDiag: FormGroup;
    data: any[] = [];
    diagnosticos: any[]=[];
    Cie10: any;
    hayError: boolean = false;

    constructor(
        private cieService: CieService,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private config: DynamicDialogConfig) {
        this.idObstetricia = this.obstetriciaGeneralService.idGestacion;
        console.log('config.data', config.data);
        this.buildForm();
        if (config.data) {
            this.llenarCamposTratamientoComun();
        }
        if (config.data) {
            this.llenarCamposTratamientoSuplementos();
        }

        /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
        this.intervaloList = [{label: 'CADA 1 HORA', value: '1'},
            {label: 'CADA 2 HORAS', value: 'CADA 2 HORAS'},
            {label: 'CADA 3 HORAS', value: 'CADA 3 HORAS'},
            {label: 'CADA 4 HORAS', value: 'CADA 4 HORAS'},
            {label: 'CADA 5 HORAS', value: 'CADA 5 HORAS'},
            {label: 'CADA 6 HORAS', value: 'CADA 6 HORAS'},
            {label: 'CADA 8 HORAS', value: 'CADA 8 HORAS'},
            {label: 'CADA 12 HORAS', value: 'CADA 12 HORAS'},
            {label: 'CADA 24 HORAS', value: 'CADA 24 HORAS'},
            {label: 'CONDICIONAL A FIEBRE', value: 'CONDICIONAL A FIEBRE'},
            {label: 'DOSIS UNICA', value: 'DOSIS UNICA'},
            {label: 'CADA 48 HORAS', value: 'CADA 48 HORAS'}
        ];

        this.viaadministracionList = [{label: 'ENDOVENOSA', value: 'ENDOVENOSA'},
            {label: 'INHALADORA', value: 'INHALADORA'},
            {label: 'INTRADERMICO', value: 'INTRADERMICO'},
            {label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR'},
            {label: 'NASAL', value: 'NASAL'},
            {label: 'OFTALMICO', value: 'OFTALMICO'},
            {label: 'ORAL', value: 'ORAL'},
            {label: 'OPTICO', value: 'OPTICO'},
            {label: 'RECTAL', value: 'RECTAL'},
            {label: 'SUBCUTANEO', value: 'SUBCUTANEO'},
            {label: 'SUBLINGUAL', value: 'SUBLINGUAL'},
            {label: 'TOPICO', value: 'TOPICO'},
            {label: 'VAGINAL', value: 'VAGINAL'},
        ];

    }

    ngOnInit(): void {
    }

    buildForm() {
        this.FormNosologico = this.formBuilder.group({
            /*CAMPOS DE TRATAMIENTO*/
            //descripcion: new FormControl("", [Validators.required]),
            //numero: new FormControl("", [Validators.required]),
            //dosis: new FormControl("", [Validators.required]),
            //intervalo: new FormControl("", [Validators.required]),
            //viaAdministracion: new FormControl("", [Validators.required]),
            //duracion: new FormControl("", [Validators.required]),
            //observaciones: new FormControl("", []),
            diagnostico: ['', [Validators.required]],
        });
        this.formDiag = this.formBuilder.group({
            diagnostico: ['', [Validators.required]],
        })
    }

    openNew() {
        this.FormNosologico.reset();
        this.dialogTratamiento = true;
        this.formTratamientoSuplementos.reset();
        this.dialogTratamientoSuplementos = true;
    }

    enviarTratamientosComunes() {
        var tratamientosComunes = {
            descripcion: this.FormNosologico.value.descripcion,
            numero: this.FormNosologico.value.numero,
            dosis: this.FormNosologico.value.dosis,
            intervalo: this.FormNosologico.value.intervalo,
            viaAdministracion: this.FormNosologico.value.viaAdministracion,
            duracion: this.FormNosologico.value.duracion,
            observaciones: this.FormNosologico.value.observaciones,
        }
        console.log(tratamientosComunes);
        this.dataTratamientosComunes.push(tratamientosComunes);
        this.dialogTratamiento = false;
    }

    enviarTratamientosSuplementos() {
        var tratamientosInmunizaciones = {
            descripcion: this.FormNosologico.value.descripcion,
            numero: this.FormNosologico.value.numero,
            dosis: this.FormNosologico.value.dosis,
            intervalo: this.FormNosologico.value.intervalo,
            viaAdministracion: this.FormNosologico.value.viaAdministracion,
            duracion: this.FormNosologico.value.duracion,
            observaciones: this.FormNosologico.value.observaciones,

        }
        console.log(tratamientosInmunizaciones);
        this.dataTratamientosSuplementos.push(tratamientosInmunizaciones);
        this.dialogTratamientoSuplementos = false;
    }

    /*EVENTO PARA BUSQUEDA SEGUN FILTRO*/
    filterDiagnostico(event) {
        console.log('event ', event.query);
        this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.Cie10 = res.object;
        })
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.dialogTratamiento = false;
    }

    llenarCamposTratamientoComun() {
        let configuracion = this.config.data.row;
        this.FormNosologico.get("descripcion").setValue(configuracion.descripcion);
        this.FormNosologico.get("numero").setValue(configuracion.numero);
        this.FormNosologico.get("dosis").setValue(configuracion.dosis);
        this.FormNosologico.get("intervalo").setValue(configuracion.intervalo);
        this.FormNosologico.get("viaAdministracion").setValue(configuracion.viaAdministracion);
        this.FormNosologico.get("duracion").setValue(configuracion.duracion);
        this.FormNosologico.get("observaciones").setValue(configuracion.observaciones);
    }

    llenarCamposTratamientoSuplementos() {
        let configuracion = this.config.data.row;
        this.FormNosologico.get("descripcion").setValue(configuracion.descripcion);
        this.FormNosologico.get("numero").setValue(configuracion.numero);
        this.FormNosologico.get("dosis").setValue(configuracion.dosis);
        this.FormNosologico.get("intervalo").setValue(configuracion.intervalo);
        this.FormNosologico.get("viaAdministracion").setValue(configuracion.viaAdministracion);
        this.FormNosologico.get("duracion").setValue(configuracion.duracion);
        this.FormNosologico.get("observaciones").setValue(configuracion.observaciones);
    }

    closeDialogGuardar() {
        this.enviarTratamientosComunes();
        this.ref.close(
            this.config.data ? {
                    index: this.config.data.index,
                    row: this.dataTratamientosComunes[0]
                } :
                this.dataTratamientosComunes[0]);
    }

    closeDialogGuardarSuplementos() {
        this.enviarTratamientosSuplementos();
        this.ref.close(
            this.config.data ? {
                    index: this.config.data.index,
                    row: this.dataTratamientosSuplementos[0]
                } :
                this.dataTratamientosSuplementos[0]);
    }

    closeDialog() {
        this.ref.close();
    }

    /*guardar datos de diagnosticos*/
    save1(form: any) {
        this.isUpdate = false;
        this.data.push(form.value);
        console.log(this.data);
        this.diagnosticos.push({
            diagnostico: this.data[this.data.length - 1]['diagnostico']['descripcionItem'],
            cie10: this.data[this.data.length - 1]['diagnostico']['codigoItem']
        });

        Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.diagnosticoDialog = false;
    }


    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }
    canceled1() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.diagnosticoDialog = false;
    }
}
