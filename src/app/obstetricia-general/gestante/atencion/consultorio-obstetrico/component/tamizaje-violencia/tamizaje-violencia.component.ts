import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import {
    FiliancionService
} from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import {TamizajeViolenciaService} from "../../../../../services/tamizaje-violencia.service";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {number} from "echarts";

@Component({
    selector: 'app-tamizaje-violencia',
    templateUrl: './tamizaje-violencia.component.html',
    styleUrls: ['./tamizaje-violencia.component.css']
})
export class TamizajeViolenciaComponent implements OnInit {
    opciones: any;
    opcionesA: any;
    opcionesB: any;
    opcionesC: any;
    opcionesD: any;
    opcionesE: any;
    diagnostico2: any;
    preguntasTamizaje: any;
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
    DataCupos: any;
    DataCupos2: any;
    Gestacion: any;
    Recupera_un_Tamizaje: any;

    /**Datos que se recupera**/
    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;
    estadoEmbarazo: string;

    PuntajeTotal: any = 0;
    PuntajeTotalValoracion: any = 0;
    resultadoTamizaje: string = "Resultado";
    NivelRiesgo: string = "Sin puntaje";

    tabIndex = 0;
    IDConsulta: string;
    p2A: string = 'SI';
    p5A: string = 'NO';
    armaBlacnca: any;

    constructor(private form: FormBuilder,
                private filiancionService: FiliancionService,
                private tamizajeViolenciaService: TamizajeViolenciaService) {
        this.opciones = [
            {name: 'SI', boleano: true},
            {name: 'NO', boleano: false}
        ];

        this.opcionesA = [
            {name: 'SI', label: '1'},
            {name: 'NO', label: '0'}
        ];

        this.opcionesB = [
            {name: 'SI', label: '2'},
            {name: 'NO', label: '0'}
        ];
        this.opcionesC = [
            {name: 'SI', label: '3'},
            {name: 'NO', label: '0'}
        ];
        this.opcionesD = [
            {name: 'SI', label: '0'},
            {name: 'NO', label: '4'}
        ];
        this.opcionesE = [
            {name: 'SI', label: '5'},
            {name: 'NO', label: '0'}
        ];

        this.diagnostico2 = [
            {name: 'POSITIVO (+)', diagnostico: 'POSITIVO'},
            {name: 'NEGATIVO (-)', diagnostico: 'NEGATIVO'}
        ];

        this.armaBlacnca = [
            {arma: 'Cuchillo'},
            {arma: 'Pistolo'},
            {arma: 'Machete'},
            {arma: 'Piedra'},
            {arma: 'Otros'},
        ]

        this.IDConsulta = JSON.parse(localStorage.getItem('IDConsulta'));

        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.DataCupos = JSON.parse(localStorage.getItem('datacupos'));
        this.DataCupos2 = JSON.parse(localStorage.getItem('PacienteSinCupo'));

        if (this.DataCupos2 == null) {
            this.tipoDocRecuperado = this.DataCupos.paciente.tipoDoc
            this.nroDocRecuperado = this.DataCupos.paciente.nroDoc
        } else {
            this.tipoDocRecuperado = this.DataCupos2.tipoDoc
            this.nroDocRecuperado = this.DataCupos2.nroDoc
        }

        // this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        // this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        // this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        // this.tipoDocRecuperado = "DNI";
        // this.nroDocRecuperado = "10101099";
        this.estadoEmbarazo = this.Gestacion.estado;
        this.nroEmbarazo = this.Gestacion.nroEmbarazo;

    }

    ngOnInit(): void {
        this.buildForm();
        this.formDatos_Tamisaje.get('Fecha').setValue(this.datafecha);
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        console.log("ESTADO", this.estadoEmbarazo);
        console.log("idConsulta", this.IDConsulta);
        this.getpacienteByNroDoc();
        this.obternerFechaActual();
        this.getTamizajeNroDoc();
        this.getTamizajePorIDConsulta();
    }

    tab(event) {
        this.tabIndex = event.index;
        console.log("evento tab", this.tabIndex)
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

        // this.formDatos_Tamisaje.get('Respuesta9').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[0].respuesta);
        // this.formDatos_Tamisaje.get('Respuesta10').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[1].respuesta);
        // this.formDatos_Tamisaje.get('Respuesta11').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[2].respuesta);
        // this.formDatos_Tamisaje.get('Respuesta12').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[3].respuesta);
        // this.formDatos_Tamisaje.get('Respuesta13').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[4].respuesta);
        // this.formDatos_Tamisaje.get('Respuesta14').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[5].respuesta);
        // this.formDatos_Tamisaje.get('Respuesta15').setValue(this.Recupera_un_Tamizaje.preguntasPosibleMaltrato[6].respuesta);

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
            Respuesta16: new FormControl(''),
            PuntajeTotal: new FormControl(''),

            /**Diagnostico y responsable**/
            diagnostico: new FormControl(''),
            nroDodResponsable: new FormControl(''),
            ApellidosResponsable: new FormControl(''),

            respuestaValoracion1: new FormControl(''),
            respuestaValoracion2: new FormControl(''),
            respuestaValoracion2A: new FormControl(''),
            respuestaValoracion3: new FormControl(''),
            respuestaValoracion4: new FormControl(''),
            respuestaValoracion5: new FormControl(''),
            respuestaValoracion5A: new FormControl(''),
            respuestaValoracion6: new FormControl(''),
            respuestaValoracion7: new FormControl(''),
            respuestaValoracion8: new FormControl(''),
            respuestaValoracion9: new FormControl(''),
            respuestaValoracion10: new FormControl(''),
            respuestaValoracion11: new FormControl(''),
            respuestaValoracion12: new FormControl(''),
            respuestaValoracion12A: new FormControl(''),
            respuestaValoracion13: new FormControl(''),
            respuestaValoracion14: new FormControl(''),
            respuestaValoracion15: new FormControl(''),
            respuestaValoracion16: new FormControl(''),
            respuestaValoracion17: new FormControl(''),
            respuestaValoracion18: new FormControl(''),
            respuestaValoracion19: new FormControl(''),
            SumaTotalvalor: new FormControl({value: '', disabled: true}),
            arma: new FormControl(''),
            observaciones: new FormControl(''),
            NivelRiesgo: new FormControl({value: '', disabled: true}),
        })
    }

    calcularValoracion() {
        console.log();
        let p1 = this.formDatos_Tamisaje.value.respuestaValoracion1;
        let p2 = this.formDatos_Tamisaje.value.respuestaValoracion2;
        this.p2A = this.formDatos_Tamisaje.value.respuestaValoracion2A;
        let p3 = this.formDatos_Tamisaje.value.respuestaValoracion3;
        let p4 = this.formDatos_Tamisaje.value.respuestaValoracion4;
        let p5 = this.formDatos_Tamisaje.value.respuestaValoracion5;
        this.p5A = this.formDatos_Tamisaje.value.respuestaValoracion5A;
        let p6 = this.formDatos_Tamisaje.value.respuestaValoracion6;
        let p7 = this.formDatos_Tamisaje.value.respuestaValoracion7;
        let p8 = this.formDatos_Tamisaje.value.respuestaValoracion8;
        let p9 = this.formDatos_Tamisaje.value.respuestaValoracion9;
        let p10 = this.formDatos_Tamisaje.value.respuestaValoracion10;
        let p11 = this.formDatos_Tamisaje.value.respuestaValoracion11;
        let p12 = this.formDatos_Tamisaje.value.respuestaValoracion12;
        let p12A = this.formDatos_Tamisaje.value.respuestaValoracion12A;
        let p13 = this.formDatos_Tamisaje.value.respuestaValoracion13;
        let p14 = this.formDatos_Tamisaje.value.respuestaValoracion14;
        let p15 = this.formDatos_Tamisaje.value.respuestaValoracion15;
        let p16 = this.formDatos_Tamisaje.value.respuestaValoracion16;
        let p17 = this.formDatos_Tamisaje.value.respuestaValoracion17;
        let p18 = this.formDatos_Tamisaje.value.respuestaValoracion18;
        let p19 = this.formDatos_Tamisaje.value.respuestaValoracion19;

        console.log("Valor", this.p5A);

        // this.NivelRiesgo=

        this.PuntajeTotalValoracion = Number(p1) + Number(p2) + Number(p3) + Number(p4) + Number(p5) + Number(p6) + Number(p7) +
            Number(p8) + Number(p9) + Number(p10) + Number(p11) + Number(p12) + Number(p13) + Number(p14) + Number(p15) + Number(p16) + Number(p17) +
            Number(p18) + Number(p19)
        this.formDatos_Tamisaje.get('SumaTotalvalor').setValue(this.PuntajeTotalValoracion);
        // this.formDatos_Tamisaje.get('arma').setValue(this.p5A);

        if ((this.PuntajeTotalValoracion <= 7) && (this.PuntajeTotalValoracion >= 0)) {
            this.NivelRiesgo = "Leve (riesgo variable)";
        }
        if ((this.PuntajeTotalValoracion <= 13) && (this.PuntajeTotalValoracion >= 8)) {
            this.NivelRiesgo = "moderado (riesgo en aumento) ";
        }
        if ((this.PuntajeTotalValoracion <= 17) && (this.PuntajeTotalValoracion >= 14)) {
            this.NivelRiesgo = "Severo 1 (severo)";
        }
        if ((this.PuntajeTotalValoracion <= 37) && (this.PuntajeTotalValoracion >= 18)) {
            this.NivelRiesgo = "Severo 2 (severo extremo)";
        }
        this.formDatos_Tamisaje.get('NivelRiesgo').setValue(this.NivelRiesgo);

    }

    calcularPuntaje() {
        let R9 = this.formDatos_Tamisaje.value.Respuesta9
        let R10 = this.formDatos_Tamisaje.value.Respuesta10
        let R11 = this.formDatos_Tamisaje.value.Respuesta11
        let R12 = this.formDatos_Tamisaje.value.Respuesta12//
        let R13 = this.formDatos_Tamisaje.value.Respuesta13
        let R14 = this.formDatos_Tamisaje.value.Respuesta14
        let R15 = this.formDatos_Tamisaje.value.Respuesta15//
        let R16 = this.formDatos_Tamisaje.value.Respuesta16

        this.PuntajeTotal = Number(R9) + Number(R10) + Number(R11) + Number(R12) + Number(R13) + Number(R14) + Number(R15) + Number(R16)
        this.formDatos_Tamisaje.get('PuntajeTotal').setValue(this.PuntajeTotal);

        if ((Number(R12) == 2) || (Number(R12) == 3) || (Number(R15) == 2) || (Number(R15) == 3) || (this.PuntajeTotal > 15)) {
            this.resultadoTamizaje = "POSITIVO";
            console.log("RESULTADO:", this.resultadoTamizaje)
        } else {
            if ((Number(R12 == 1)) || (Number(R15 == 1)) || (this.PuntajeTotal <= 15)) {
                this.resultadoTamizaje = "NEGATIVO";
                console.log("RESULTADO:", this.resultadoTamizaje)
            } else {
                return
            }
        }
    }

    limpiarFormulario() {
        this.Recupera_un_Tamizaje = null;
        this.formDatos_Tamisaje.reset();
        this.formDatos_Tamisaje.get('Fecha').setValue(this.datafecha);
        this.getpacienteByNroDoc();
    }

    save() {
        if (this.Recupera_un_Tamizaje != null) {
            switch (this.tabIndex) {
                case 0:
                    this.UpdateTamizaje();
                    break;
                case 1:
                    this.UpdateTamizaje2();
                    break;
                case 2:
                    this.UpdateTamizajeValoracion();
                    break;
            }
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
            idConsulta: this.IDConsulta,
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

            tipoDocResponsable: "DNI",
            nroDocResponsable: this.formDatos_Tamisaje.value.nroDodResponsable,
            nombreResponsableAtencion: this.formDatos_Tamisaje.value.ApellidosResponsable,
        }

        console.log("DATA", data);

        this.tamizajeViolenciaService.addTamizajeViolencia(data).subscribe((result: any) => {
                console.log("DATA", result);
                this.getTamizajeNroDoc();
                if (result.object == null) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Registro',
                        text: result.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro',
                        text: result.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }

            }
        )
    }

    UpdateTamizaje() {
        const data2 = {
            idConsulta: this.IDConsulta,
            tipoDoc: this.dataPacientes.tipoDoc,
            nroDoc: this.formDatos_Tamisaje.value.nroDoc,
            nroHcl: this.formDatos_Tamisaje.value.nroHcl,
            gestante: this.Recupera_un_Tamizaje.gestante,
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

            // tipoDocResponsable: "DNI",
            // nroDocResponsable: this.formDatos_Tamisaje.value.nroDodResponsable,
            // nombreResponsableAtencion: this.formDatos_Tamisaje.value.ApellidosResponsable,

        }
        console.log("DATA UPDATE", data2);

        this.tamizajeViolenciaService.UpdateTamizajeViolencia(this.Recupera_un_Tamizaje.id, data2).subscribe(result => {
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

    UpdateTamizaje2() {
        const data2 = {
            cuestionario: [
                {
                    pregunta: "En general ¿Cómo describiría su relación de pareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta9,

                },
                {
                    pregunta: "Usted y su pareja resuelven las discusiones con:",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta10,
                },
                {
                    pregunta: "Al terminar las discusiones usted ¿Se siente decaída o mal con usted misma?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta11,
                },
                {
                    pregunta: "Las discusiones ¿terminan en golpes, patadas o empujones?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta12,
                },
                {
                    pregunta: "¿Hay situaciones en las cuales ha sentido miedo de las reacciones de su pareja?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta13,
                },
                {
                    pregunta: "Su pareja ¿controla el dinero que usted gasta, o la obliga a realizar trabajo en exceso?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta14,
                },
                {
                    pregunta: " Su pareja ¿la insulta, grita, humilla o descalifica verbalmente?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta15,
                },
                {
                    pregunta: "¿Se ha sentido obligada a tener relaciones sexuales con su pareja para evitar problemas?",
                    respuesta: this.formDatos_Tamisaje.value.Respuesta16,
                },

            ],
            puntajeTotal: this.formDatos_Tamisaje.value.PuntajeTotal,
            diagnostico: this.resultadoTamizaje

        }
        console.log("DATA UPDATE", data2);
        console.log("ID", this.Recupera_un_Tamizaje.id);

        this.tamizajeViolenciaService.UpdateTamizajeCuestionario(this.Recupera_un_Tamizaje.id, data2).subscribe(result => {
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

    UpdateTamizajeValoracion() {
        const data2 = {
            id: this.Recupera_un_Tamizaje.id,
            cuestionario: [
                {
                    pregunta: "¿En el último año, la violencia física contra usted ha aumentado en gravedad o frecuencia?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion1,
                },
                {
                    pregunta: "¿Él tiene algún arma o podría conseguir un arma con facilidad? (pistola, cuchillo, machete, u otros)",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion2,
                },
                {
                    pregunta: "2a.- ¿Han vivido juntos durante el último año? [si dice NO, pasar a pregunta 4]",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion2A,
                },
                {
                    pregunta: "Usted me dice que han vivido juntos en el último año. ¿Siguen viviendo juntos o lo ha dejado? [Si siguen viviendo juntos marcar SI; si lo ha dejado marcar NO]",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion3,
                },
                {
                    pregunta: "¿Actualmente, él tiene trabajo estable? [si ella no sabe, no marcar nada]",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion4,
                },
                {
                    pregunta: "¿Alguna vez él ha usado o la ha amenazado con un arma (pistola, cuchillo, machete u otros)?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion5,
                },
                {
                    pregunta: "5a.- Si su respuesta fue “SI”, ¿fue con una pistola o cuchillo?",
                    respuesta: this.formDatos_Tamisaje.value.arma,
                },
                {
                    pregunta: "¿La ha amenazado con matarla?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion6,
                },
                {
                    pregunta: "¿Alguna vez usted lo denunció por violencia familiar (porque él le pegó) ante la comisaría, fiscalía, juzgado o ante alguna autoridad comunal?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion7,
                },
                {
                    pregunta: "¿Él la ha obligado alguna vez a tener relaciones sexuales?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion8,
                },
                {
                    pregunta: "¿Él ha intentado ahorcarla?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion9,
                },
                {
                    pregunta: "¿Él consume drogas? Por ejemplo, como la marihuana, pasta básica, cocaína u otras",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion10,
                },
                {
                    pregunta: "¿Él es alcohólico o tiene problemas con el alcohol (trago o licor)?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion11,
                },
                {
                    pregunta: "¿Le controla la mayoría o todas sus actividades diarias? Por ejemplo, no le deja que vea a sus familiares o amistades, le controla cuánto dinero puede gastar, etc.",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion12,
                },
                {
                    pregunta: "12a.- Si él trata de controlarla, pero ella no lo permite, márquelo aquí:",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion12A,
                },
                {
                    pregunta: "¿Él se pone celoso de forma constante y violenta? Por ejemplo, le dice: “si no eres mía, no serás de nadie” u otras similares.",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion13,
                },
                {
                    pregunta: "¿Cuándo usted estuvo embarazada, alguna vez él la golpeó?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion14,
                },
                {
                    pregunta: "¿Alguna vez él ha amenazado o ha intentado suicidarse?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion15,
                },
                {
                    pregunta: "¿Él la ha amenazado con hacerle daño a sus hijos?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion16,
                },
                {
                    pregunta: "¿Cree que él es capaz de matarla?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion17,
                },
                {
                    pregunta: "¿Él realiza alguna de las siguientes acciones?: La llama insistentemente, le deja mensajes en su teléfono o en redes sociales o destruye sus cosas (celular, ropa u otro)",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion18,
                },
                {
                    pregunta: "¿Alguna vez usted ha intentado o ha amenazado con quitarse la vida?",
                    respuesta: this.formDatos_Tamisaje.value.respuestaValoracion19,
                },
            ],
            puntajeTotal: this.PuntajeTotalValoracion,
            nivelRiesgo: this.NivelRiesgo,
            observaciones: this.formDatos_Tamisaje.value.observaciones,

        }

        console.log("DATA UPDATE", data2);
        console.log("ID", this.Recupera_un_Tamizaje.id);

        this.tamizajeViolenciaService.UpdateTamizajeValorRiesgo(this.Recupera_un_Tamizaje.id, data2).subscribe(result => {
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

    getTamizajePorIDConsulta() {
        this.tamizajeViolenciaService.GetTamizajePorIDConsulta(this.IDConsulta).subscribe((result: any) => {
            this.Recupera_un_Tamizaje = result.object[0]
            console.log("DATA Tamizaje por id COnsulta", this.Recupera_un_Tamizaje);

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

            this.formDatos_Tamisaje.get('Respuesta9').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[0].respuesta);
            this.formDatos_Tamisaje.get('Respuesta10').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[1].respuesta);
            this.formDatos_Tamisaje.get('Respuesta11').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[2].respuesta);
            this.formDatos_Tamisaje.get('Respuesta12').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[3].respuesta);
            this.formDatos_Tamisaje.get('Respuesta13').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[4].respuesta);
            this.formDatos_Tamisaje.get('Respuesta14').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[5].respuesta);
            this.formDatos_Tamisaje.get('Respuesta15').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[6].respuesta);
            this.formDatos_Tamisaje.get('Respuesta16').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.cuestionario[7].respuesta);
            this.formDatos_Tamisaje.get('PuntajeTotal').setValue(this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.puntajeTotal);
            this.resultadoTamizaje = this.Recupera_un_Tamizaje.cuestionarioPosibleViolencia.diagnostico;

            this.formDatos_Tamisaje.get('respuestaValoracion1').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[0].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion2').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[1].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion2A').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[2].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion3').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[3].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion4').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[4].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion5').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[5].respuesta);
            // this.formDatos_Tamisaje.get('respuestaValoracion5A').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[6].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion6').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[7].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion7').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[8].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion8').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[9].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion9').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[10].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion10').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[11].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion11').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[12].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion12').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[13].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion12A').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[14].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion13').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[15].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion14').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[16].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion15').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[17].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion16').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[18].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion17').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[19].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion18').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[20].respuesta);
            this.formDatos_Tamisaje.get('respuestaValoracion19').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[21].respuesta);
            this.formDatos_Tamisaje.get('SumaTotalvalor').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.puntajeTotal);
            this.formDatos_Tamisaje.get('NivelRiesgo').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.nivelRiesgo);
            this.formDatos_Tamisaje.get('observaciones').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.observaciones);


            let p5A_String = this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[6].respuesta;
            if ((p5A_String == null) || (p5A_String == '')) {
                this.p5A = 'NO';
                this.formDatos_Tamisaje.get('respuestaValoracion5A').setValue(this.p5A);
            } else {
                this.formDatos_Tamisaje.get('arma').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[6].respuesta);
                this.p5A = 'SI';
                this.formDatos_Tamisaje.get('respuestaValoracion5A').setValue(this.p5A);
            }
        })
    }
}
