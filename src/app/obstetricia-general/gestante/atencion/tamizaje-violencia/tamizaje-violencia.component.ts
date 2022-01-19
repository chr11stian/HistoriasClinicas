import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../services/obstetricia-general.service";
import {FiliancionService} from "../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import Swal from "sweetalert2";
import {TamizajeViolenciaService} from "../../../services/tamizaje-violencia.service";
import {DatePipe} from "@angular/common";

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
    datePipe = new DatePipe('en-US');
    datafecha: Date = new Date();
    ListaTamizajeDialog: boolean;
    ListaTamizajes: any;
    Recupera_un_Tamizaje: any;

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

        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        // this.tipoDocRecuperado = "DNI";
        // this.nroDocRecuperado = "10101099";
        this.estadoEmbarazo = this.obstetriciaGeneralService.estadoEmbarazo;
    }

    ngOnInit(): void {
        this.buildForm();
        this.formDatos_Tamisaje.get('Fecha').setValue(this.datafecha);
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        console.log("ESTADO", this.estadoEmbarazo);
        this.getpacienteByNroDoc();
        this.obternerFechaActual();
        this.getTamizajeNroDoc();


    }

    /**Recupera un solo tamizaje al hacer un clic en el event**/
    recuperarData(event) {
        this.Recupera_un_Tamizaje = event;
        console.log("EVENT TAMIZAJE", this.Recupera_un_Tamizaje);

        this.formDatos_Tamisaje.get('Fecha').setValue(this.Recupera_un_Tamizaje.fecha);
        this.formDatos_Tamisaje.get('apePaterno').setValue(this.Recupera_un_Tamizaje.apePaterno);
        this.formDatos_Tamisaje.get('apeMaterno').setValue(this.Recupera_un_Tamizaje.apeMaterno);
        this.formDatos_Tamisaje.get('nombres').setValue(this.Recupera_un_Tamizaje.nombres);
        this.formDatos_Tamisaje.get('nroDoc').setValue(this.Recupera_un_Tamizaje.nroDoc);
        this.formDatos_Tamisaje.get('nroHcl').setValue(this.Recupera_un_Tamizaje.nroHcl);
        this.formDatos_Tamisaje.get('Telefono').setValue(this.Recupera_un_Tamizaje.telefono);
        this.formDatos_Tamisaje.get('Edad').setValue(this.Recupera_un_Tamizaje.edad);

        this.formDatos_Tamisaje.get('Respuesta1').setValue(this.Recupera_un_Tamizaje.preguntasMotivoConsulta[0].respuesta);
        this.formDatos_Tamisaje.get('Respuesta2').setValue(this.Recupera_un_Tamizaje.preguntasMotivoConsulta[1].respuesta);
        this.formDatos_Tamisaje.get('Respuesta3').setValue(this.Recupera_un_Tamizaje.preguntasMotivoConsulta[2].respuesta);


        this.formDatos_Tamisaje.get('Respuesta4').setValue(this.Recupera_un_Tamizaje.preguntasRelacionesPareja[0].respuesta);
        this.formDatos_Tamisaje.get('Respuesta5').setValue(this.Recupera_un_Tamizaje.preguntasRelacionesPareja[1].respuesta);
        this.formDatos_Tamisaje.get('Respuesta6').setValue(this.Recupera_un_Tamizaje.preguntasRelacionesPareja[2].respuesta);
        this.formDatos_Tamisaje.get('Respuesta7').setValue(this.Recupera_un_Tamizaje.preguntasRelacionesPareja[3].respuesta);
        this.formDatos_Tamisaje.get('Respuesta8').setValue(this.Recupera_un_Tamizaje.preguntasRelacionesPareja[4].respuesta);

        this.formDatos_Tamisaje.get('Respuesta9').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[0].respuesta);
        this.formDatos_Tamisaje.get('Respuesta10').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[1].respuesta);
        this.formDatos_Tamisaje.get('Respuesta11').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[2].respuesta);
        this.formDatos_Tamisaje.get('Respuesta12').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[3].respuesta);
        this.formDatos_Tamisaje.get('Respuesta13').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[4].respuesta);
        this.formDatos_Tamisaje.get('Respuesta14').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[5].respuesta);
        this.formDatos_Tamisaje.get('Respuesta15').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[6].respuesta);

        this.formDatos_Tamisaje.get('diagnostico').setValue(this.Recupera_un_Tamizaje.diagnostico);
        this.formDatos_Tamisaje.get('nroDodResponsable').setValue(this.Recupera_un_Tamizaje.nroDocResponsable);
        this.formDatos_Tamisaje.get('ApellidosResponsable').setValue(this.Recupera_un_Tamizaje.nombreResponsableAtencion);


        this.ListaTamizajeDialog = false;
    }

    /**Lista todas la fichas del tamizaje de violencia de un paciente**/
    getTamizajeNroDoc() {
        const data = {
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
        }
        this.tamizajeViolenciaService.GetTamizajeViolenciaNroDoc(data).subscribe((res: any) => {
            this.ListaTamizajes = res.object;
            console.log('LISTA TAMIZAJES ', this.ListaTamizajes);
        })
    }

    /**Abre el dialog para listar el tamizaje del paciente**/
    openModal() {
        // this.selectedHorario = null;
        this.ListaTamizajeDialog = true;
    }

    /**Recuperar datos de un paciendo por su documento de identidad**/
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
            diagnostico: new FormControl(''),
            nroDodResponsable: new FormControl(''),
            ApellidosResponsable: new FormControl(''),
        })
    }

    limpiarFormulario() {
        this.Recupera_un_Tamizaje = null;
        this.formDatos_Tamisaje.reset();
        this.formDatos_Tamisaje.get('Fecha').setValue(this.datafecha);
        this.getpacienteByNroDoc();
    }

    save() {
        if (this.Recupera_un_Tamizaje != null) {
            this.UpdateTamizaje();
        } else {
            this.saveTamizaje();
        }
    }

    /**Registra datos, preguntas que se hace al paciente**/
    saveTamizaje() {
        if ((this.estadoEmbarazo != "FINALIZADO") && (this.estadoEmbarazo != "")) {
            this.gestante = true;
        } else {
            this.gestante = false;
        }
        console.log("estado", this.gestante);
        const data = {
            tipoDoc: this.dataPacientes.tipoDoc,
            nroDoc: this.formDatos_Tamisaje.value.nroDoc,
            nroHcl: this.formDatos_Tamisaje.value.nroHcl,
            gestante: this.gestante,
            nroEmbarazo: this.nroEmbarazo,
            nombres: this.formDatos_Tamisaje.value.nombres,
            apePaterno: this.formDatos_Tamisaje.value.apePaterno,
            apeMaterno: this.formDatos_Tamisaje.value.apeMaterno,
            fecha: this.datePipe.transform(this.formDatos_Tamisaje.value.Fecha, 'yyyy-MM-dd'),
            edad: this.formDatos_Tamisaje.value.Edad,
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
            ],
            preguntasRelacionesPareja: [
                {
                    pregunta: "¿Cómo se siente en las relaciones cotidianas con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta4,
                },
                {
                    pregunta: "¿Cuáles son los desacuerdos más frecuentes que se dan con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta5,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta6,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta7,
                },
                {
                    pregunta: "¿Su pareja o expareja se enoja con facilidad o tiene arranques inesperados de cólera?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta8,
                }
            ],
            preguntasPosibleMaltrato: [
                {
                    pregunta: "¿Con que frecuencia su pareja o expareja le dice cosas que a usted le hacen sentir mal?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta9,
                },
                {
                    pregunta: "¿Con que frecuencia su pareja o expareja le dice cosas que a usted le hacen sentir mal?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta10,
                },
                {
                    pregunta: "¿Tiene miedo a su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta11,
                },
                {
                    pregunta: "¿Alguna vez a recibido golpes, empujones, bofetadas o cualquier otra agresión?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta12,
                },
                {
                    pregunta: "¿Alguna vez a recibido golpes, empujones, bofetadas o cualquier otra agresión?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta13,
                },
                {
                    pregunta: "¿Ha realiado alguna denuncia contra su pareja o expareja por algún tipo de maltrato o violencia?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta14,
                },
                {
                    pregunta: "Alguna vez, ¿Ha pensado en abandonar a su pareja o expareja por su mala forma de tratar?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta15,
                },


            ],

            diagnostico: this.formDatos_Tamisaje.value.diagnostico,
            tipoDocResponsable: "DNI",
            nroDocResponsable: this.formDatos_Tamisaje.value.nroDodResponsable,
            nombreResponsableAtencion: this.formDatos_Tamisaje.value.ApellidosResponsable,
        }

        console.log("DATA", data);

        this.tamizajeViolenciaService.addTamizajeViolencia(data).subscribe(result => {
                console.log("DATA", result);
                this.getTamizajeNroDoc();
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

    UpdateTamizaje() {
        const data2 = {
            id: this.Recupera_un_Tamizaje.id,
            tipoDoc: this.dataPacientes.tipoDoc,
            nroDoc: this.formDatos_Tamisaje.value.nroDoc,
            nroHcl: this.formDatos_Tamisaje.value.nroHcl,
            gestante: this.gestante,
            nombres: this.formDatos_Tamisaje.value.nombres,
            apePaterno: this.formDatos_Tamisaje.value.apePaterno,
            apeMaterno: this.formDatos_Tamisaje.value.apeMaterno,
            fecha: this.datePipe.transform(this.formDatos_Tamisaje.value.Fecha, 'yyyy-MM-dd'),
            edad: this.formDatos_Tamisaje.value.Edad,
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
            ],
            preguntasRelacionesPareja: [
                {
                    pregunta: "¿Cómo se siente en las relaciones cotidianas con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta4,
                },
                {
                    pregunta: "¿Cuáles son los desacuerdos más frecuentes que se dan con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta5,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta6,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta7,
                },
                {
                    pregunta: "¿Su pareja o expareja se enoja con facilidad o tiene arranques inesperados de cólera?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta8,
                }
            ],
            preguntasPosibleMaltrato: [
                {
                    pregunta: "¿Con que frecuencia su pareja o expareja le dice cosas que a usted le hacen sentir mal?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta9,
                },
                {
                    pregunta: "¿Con que frecuencia su pareja o expareja le dice cosas que a usted le hacen sentir mal?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta10,
                },
                {
                    pregunta: "¿Tiene miedo a su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta11,
                },
                {
                    pregunta: "¿Alguna vez a recibido golpes, empujones, bofetadas o cualquier otra agresión?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta12,
                },
                {
                    pregunta: "¿Alguna vez a recibido golpes, empujones, bofetadas o cualquier otra agresión?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta13,
                },
                {
                    pregunta: "¿Ha realiado alguna denuncia contra su pareja o expareja por algún tipo de maltrato o violencia?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta14,
                },
                {
                    pregunta: "Alguna vez, ¿Ha pensado en abandonar a su pareja o expareja por su mala forma de tratar?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta15,
                },


            ],
            diagnostico: this.formDatos_Tamisaje.value.diagnostico,
            tipoDocResponsable: "DNI",
            nroDocResponsable: this.formDatos_Tamisaje.value.nroDodResponsable,
            nombreResponsableAtencion: this.formDatos_Tamisaje.value.ApellidosResponsable,

        }
        console.log("DATA UPDATE", data2);

        this.tamizajeViolenciaService.UpdateTamizajeViolencia(data2).subscribe(result => {
                console.log("DATA UPDATE", result);
                this.getTamizajeNroDoc();
                Swal.fire({
                    icon: 'success',
                    title: 'Se Actualizo con exito',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        )
    }
}
