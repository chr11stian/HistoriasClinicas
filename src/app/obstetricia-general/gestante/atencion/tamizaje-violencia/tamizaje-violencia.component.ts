import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../services/obstetricia-general.service";
import {FiliancionService} from "../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import Swal from "sweetalert2";
import {TamizajeViolenciaService} from "../../../services/tamizaje-violencia.service";

@Component({
    selector: 'app-tamizaje-violencia',
    templateUrl: './tamizaje-violencia.component.html',
    styleUrls: ['./tamizaje-violencia.component.css']
})
export class TamizajeViolenciaComponent implements OnInit {
    opciones: any;
    diagnostico: any;
    formDatos_Tamisaje: FormGroup;
    dataPacientes: any;
    fechaConvertido: string;//fecha convertido
    fecha: Date;//fecha Actual
    edad: any;
    gestante: boolean;

    /**Datos que se recupera**/
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;
    estadoEmbarazo: string;


    constructor(private form: FormBuilder,
                private filiancionService: FiliancionService,
                private tamizajeViolenciaService: TamizajeViolenciaService,
                private obstetriciaGeneralService: ObstetriciaGeneralService,) {
        this.opciones = [
            {name: 'SI', boleano: true},
            {name: 'NO', boleano: false}
        ];

        this.diagnostico = [
            {name: 'POSITIVO (+)', boleano: true},
            {name: 'NEGATIVO (-)', boleano: false}
        ];

        // this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        // this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        // this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.tipoDocRecuperado = "DNI";
        this.nroDocRecuperado = "10101099";
        this.estadoEmbarazo = this.obstetriciaGeneralService.estadoEmbarazo;
    }

    ngOnInit(): void {
        this.buildForm();
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        console.log("ESTADO", this.estadoEmbarazo);
        this.getpacienteByNroDoc();
        this.obternerFechaActual();
    }


    //Recuperar datos de un paciendo por su documento de identidad
    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('PACIENTES POR DOC ', this.dataPacientes)
            this.formDatos_Tamisaje.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Tamisaje.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Tamisaje.get('nombres').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Tamisaje.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Tamisaje.get('nroHcl').setValue(this.dataPacientes.nroHcl);
            this.formDatos_Tamisaje.get('Telefono').setValue(this.dataPacientes.celular);
            this.formDatos_Tamisaje.get('Direccion').setValue(this.dataPacientes.domicilio.direccion + "," + this.dataPacientes.domicilio.departamento);
            this.fechaConvertido = this.dataPacientes.nacimiento.fechaNacimiento;
            console.log("nacimiento", this.fechaConvertido)
            this.ageCalculator();//calcula la edad desde la fecha de nacimiento
            this.formDatos_Tamisaje.get('Edad').setValue(this.edad);
        });
    }

    /***Calcular el año desde la fecha de nacimiento**/
    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            console.log("edad", this.edad);
        }
    }

    /***Recupera la el dia, el mes y el año de la fecha actual***/
    obternerFechaActual() {
        this.fecha = new Date();
        let dd = this.fecha.getDate();
        let mm = this.fecha.getMonth() + 1;
        let yy = this.fecha.getFullYear();
        this.fechaConvertido = dd + '-' + mm + '-' + yy;
        console.log("FECHAS ACTUAL", this.fechaConvertido);
    }

    buildForm() {
        this.formDatos_Tamisaje = this.form.group({
            /**Datos personales**/
            nroDoc: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            nombres: new FormControl(''),
            Ocupacion: new FormControl(''),
            Direccion: new FormControl(''),
            Telefono: new FormControl(''),
            nroHcl: new FormControl(''),
            Edad: new FormControl(''),


            Fecha: new FormControl(''),//fecha atencion

            /**Preguntas respuestas**/
            Respuesta1: new FormControl(''),
            Respuesta2: new FormControl(''),
            Respuesta3: new FormControl(''),
            Respuesta4: new FormControl(''),
            Respuesta5: new FormControl(''),
            Respuesta6: new FormControl(''),
            Respuesta7: new FormControl(''),
            Respuesta8: new FormControl(''),
            Respuesta9: new FormControl(''),
            Respuesta10: new FormControl(''),
            Respuesta11: new FormControl(''),
            Respuesta12: new FormControl(''),
            Respuesta13: new FormControl(''),
            Respuesta14: new FormControl(''),
            Respuesta15: new FormControl(''),

            /**Diagnostico y responsable**/
            giagnostico: new FormControl(''),
            nroDodResponsable: new FormControl(''),
            ApellidosResponsable: new FormControl(''),
            nombresResponsable: new FormControl(''),
        })
    }

    saveTamizaje() {
        if (this.estadoEmbarazo != "FINALIZADO") {
            this.gestante = true;
        } else {
            this.gestante = false
        }
        console.log("estado", this.gestante);

        const data = {
            tipoDoc: this.dataPacientes.tipoDoc,
            nroDoc: this.formDatos_Tamisaje.value.nroDoc,
            nroHcl: this.formDatos_Tamisaje.value.nroHcl,
            gestante: this.gestante,
            nombres: this.formDatos_Tamisaje.value.nombres,
            apePaterno: this.formDatos_Tamisaje.value.apePaterno,
            apeMaterno: this.formDatos_Tamisaje.value.apeMaterno,
            edad: this.formDatos_Tamisaje.value.Edad,
            fecha: this.formDatos_Tamisaje.value.Fecha,
            direccion: this.formDatos_Tamisaje.value.Direccion,
            telefono: this.formDatos_Tamisaje.value.Telefono,

            preguntasMotivoConsulta: [
                {
                    pregunta: "¿Como se siente con usted misma?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta1,
                },
                {
                    pregunta: "¿Mantiene su apetito, sueño y deseo de realizar sus actividades como de costumbre?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta2,
                },
                {
                    pregunta: "¿Toma algo (medicacon u otro que le hayan recomendado)?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta3,
                }
            ]


        }
        console.log("DATA", data);

        this.tamizajeViolenciaService.addTamizajeViolencia(data).subscribe(result => {
                console.log("DATA", result);
                Swal.fire({
                    icon: 'success',
                    title: 'Se guardo con exito',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        )
    }
}
