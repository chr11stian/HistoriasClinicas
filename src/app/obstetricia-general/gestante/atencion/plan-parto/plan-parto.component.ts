import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatosGeneralesPartoService} from "./services/datos-generales-parto/datos-generales-parto.service";
import {DatePipe, formatNumber} from "@angular/common";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {IntervaloPartoService} from "./services/intervalo-parto/intervalo-parto.service";
import {IntervaloDialogoComponent} from "./intervalo-dialogo/intervalo-dialogo.component";
import {number} from "echarts";
import Swal from "sweetalert2";

@Component({
    selector: 'app-plan-parto',
    templateUrl: './plan-parto.component.html',
    styleUrls: ['./plan-parto.component.css'],
    providers: [DialogService]
})
export class PlanPartoComponent implements OnInit {
    formPlanParto: FormGroup;
    ref: DynamicDialogRef;

    idRecuperado: string = "";
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    gestacion: any;
    dataPacientes: any;
    dataPacientes2Plan: any;
    datePipe = new DatePipe('en-US');
    twoOptions: any[];
    todasAtenciones: any[] = [];


    constructor(private form: FormBuilder,
                private datosGeneralesPartoService: DatosGeneralesPartoService,
                public dialog: DialogService,
                public obstetriciaIntervalos: IntervaloPartoService,) {
        this.twoOptions = [
            {value: "Si", label: "Si"},
            {value: "No", label: "No"},
        ];

        this.gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.idRecuperado = this.gestacion.id;
        this.tipoDocRecuperado = this.gestacion.tipoDoc;
        this.nroDocRecuperado = this.gestacion.nroDoc;
    }

    ngOnInit(): void {
        this.buildForm();
        this.consultaExistePlanParto();
        this.getpacienteByNroDoc();
        this.recuperarIntervalos();
        // this.getDatosGeneralesById();
    }

    buildForm() {
        this.formPlanParto = this.form.group({
            docIndentidad: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            primerNombre: new FormControl(''),
            edad: new FormControl(''),
            HCL: new FormControl(''),
            GrupoSanguineo: new FormControl(''),
            FPP: new FormControl(''),
            direccionAnexo: new FormControl(''),
            EESS: new FormControl(''),
            MicroRed: new FormControl(''),
            Red: new FormControl(''),
            TelfEESS: new FormControl(''),
            FrecuenciaRadio: new FormControl(''),
            TelfComunidad: new FormControl(''),
            nombrePromotorSalud: new FormControl(''),
            tiempoLlegarEESS: new FormControl(''),
            direccionReferencia: new FormControl(''),
        })
    }

    consultaExistePlanParto() {
        this.datosGeneralesPartoService.getConsultaExistePlanParto(this.idRecuperado).subscribe((res: any) => {
            if (res.mensaje === "Se encontro un registro.") {
                console.log(res.mensaje);

                let timerInterval
                Swal.fire({
                    icon: 'info',
                    title: 'Plan de parto',
                    html: 'Se encontro un registro<b>' +
                        '<br>' +
                        '</b>',
                    text: 'Resgiste nuevo paciente en la Base de Datos',
                    timer: 2000,
                    timerProgressBar: true,
                    target: document.getElementById('swal'),
                    didOpen: () => {
                        Swal.showLoading()
                        setTimeout(() => {
                            this.getDatosGeneralesById();
                        }, 1500);
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Plan de parto',
                    text: 'No se encontro ningun registro',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            ;
        })
    }

    getDatosGeneralesById() {
        this.datosGeneralesPartoService.getDatosGeneralesById(this.idRecuperado).subscribe((res: any) => {
            console.log('datos traidos por el plan de parto', res.object);
            this.dataPacientes2Plan = res.object;
            this.formPlanParto.get('edad').setValue(this.dataPacientes2Plan.edad);
            this.formPlanParto.get('GrupoSanguineo').setValue(this.dataPacientes2Plan.grupoSanguineo);
            let myDate = this.dataPacientes2Plan.fpp.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
            let newDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
            this.formPlanParto.get('FPP').setValue(newDate);
            this.formPlanParto.get('EESS').setValue(this.dataPacientes2Plan.eess);
            this.formPlanParto.get('MicroRed').setValue(this.dataPacientes2Plan.microRed);
            this.formPlanParto.get('Red').setValue(this.dataPacientes2Plan.red);
            this.formPlanParto.get('TelfEESS').setValue(this.dataPacientes2Plan.telefonoEess);
            this.formPlanParto.get('FrecuenciaRadio').setValue(this.dataPacientes2Plan.frecuenciaRadioEess);
            this.formPlanParto.get('TelfComunidad').setValue(this.dataPacientes2Plan.telefonoComunidad);
            this.formPlanParto.get('nombrePromotorSalud').setValue(this.dataPacientes2Plan.nombrePromotorSalud);
            this.formPlanParto.get('tiempoLlegarEESS').setValue(this.dataPacientes2Plan.tiempoLlegarEess);
            this.formPlanParto.get('direccionReferencia').setValue(this.dataPacientes2Plan.referenciaDireccion);
        })
    }

    getpacienteByNroDoc() {
        this.datosGeneralesPartoService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object;
            this.getDatosGeneralesById();
            console.log('paciente por doc ', this.dataPacientes)
            this.formPlanParto.get('docIndentidad').setValue(this.dataPacientes.nroDoc);
            this.formPlanParto.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formPlanParto.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formPlanParto.get('primerNombre').setValue(this.dataPacientes.primerNombre + ' ' + this.dataPacientes.otrosNombres);
            this.formPlanParto.get('HCL').setValue(this.dataPacientes.nroHcl);
            this.formPlanParto.get('direccionAnexo').setValue(this.dataPacientes.domicilio.direccion);
        });
    }

    async guardarDatosGeneralesPlanParto() {
        let data = {
            nombreGestante: this.dataPacientes2Plan.nombreGestante,
            edad: this.formPlanParto.value.edad,
            nroHcl: this.formPlanParto.value.HCL,
            grupoSanguineo: this.formPlanParto.value.GrupoSanguineo,
            fpp: this.datePipe.transform(this.formPlanParto.value.FPP, 'dd-MM-yyyy'),
            direccion: this.formPlanParto.value.direccionAnexo,
            referenciaDireccion: this.formPlanParto.value.direccionReferencia,
            eess: this.formPlanParto.value.EESS,
            microRed: this.formPlanParto.value.MicroRed,
            red: this.formPlanParto.value.Red,
            telefonoEess: this.formPlanParto.value.TelfEESS,
            frecuenciaRadioEess: this.formPlanParto.value.FrecuenciaRadio,
            telefonoComunidad: this.formPlanParto.value.TelfComunidad,
            nombrePromotorSalud: this.formPlanParto.value.nombrePromotorSalud,
            tiempoLlegarEess: this.formPlanParto.value.tiempoLlegarEESS,
        }

        console.log("DATA", data);
        await this.datosGeneralesPartoService.postDatosGenerales(this.idRecuperado, data).then((res: any) => {
            console.log("Guardado correctamente", res);
            if ((res == undefined) || (res.object == null)) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Registro',
                    text: 'Su registro no fue registrada',
                    showConfirmButton: false,
                    timer: 1500
                })
                return;
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro',
                    text: 'Su registro fue guardado con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    openDialogIntervaloNuevo() {
        this.ref = this.dialog.open(IntervaloDialogoComponent, {
            header: "INTERVALOS DEL PLAN DE PARTO",
            width: "80%",
            contentStyle: {
                "max-height": "800px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if (data !== undefined) this.recuperarIntervalos();
        })
    }

    openDialogIntervaloEditar(row, index) {
        console.log(typeof (row.fecha));
        let aux = {
            index: index,
            row: row
        }
        this.ref = this.dialog.open(IntervaloDialogoComponent, {
            header: "INTERVALOS DEL PLAN DE PARTO",
            width: "80%",
            contentStyle: {
                "max-height": "800px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if (data !== undefined) {
                this.recuperarIntervalos();
            }
        })
    }

    recuperarIntervalos() {
        console.log('data to save ', this.todasAtenciones);
        this.obstetriciaIntervalos.getIntervalosPartoById(this.idRecuperado).subscribe((res: any) => {
            console.log('trajo datos exito ', res)
            this.todasAtenciones = res.object ? res.object : [];
        })
    }

}
