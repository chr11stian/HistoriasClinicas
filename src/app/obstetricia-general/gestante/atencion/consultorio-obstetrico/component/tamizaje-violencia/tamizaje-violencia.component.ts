import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import {
    FiliancionService
} from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import { TamizajeViolenciaService } from "../../../../../services/tamizaje-violencia.service";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";

@Component({
    selector: 'app-tamizaje-violencia',
    templateUrl: './tamizaje-violencia.component.html',
    styleUrls: ['./tamizaje-violencia.component.css']
})
export class TamizajeViolenciaComponent implements OnInit {
    indiceActivo: number = 0
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
    datosConsultaActual: any
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
    IdConsulta: string;
    p2A: string = 'SI';
    p5A: string = 'NO';
    armaBlacnca: any;
    consultationStatus$ = this.obstetriciaGeneralService.consultationStatus$;
    consultationFinished: boolean = false;
    actualConsultation: any;

    constructor(private form: FormBuilder,
        private filiancionService: FiliancionService,
        private tamizajeViolenciaService: TamizajeViolenciaService,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
    ) {
        this.opciones = [
            { name: 'SI', boleano: true },
            { name: 'NO', boleano: false }
        ];

        this.opcionesA = [
            { name: 'SI', label: '1' },
            { name: 'NO', label: '0' }
        ];

        this.opcionesB = [
            { name: 'SI', label: '2' },
            { name: 'NO', label: '0' }
        ];
        this.opcionesC = [
            { name: 'SI', label: '3' },
            { name: 'NO', label: '0' }
        ];
        this.opcionesD = [
            { name: 'SI', label: '0' },
            { name: 'NO', label: '4' }
        ];
        this.opcionesE = [
            { name: 'SI', label: '5' },
            { name: 'NO', label: '0' }
        ];

        this.diagnostico2 = [
            { name: 'POSITIVO (+)', diagnostico: 'POSITIVO' },
            { name: 'NEGATIVO (-)', diagnostico: 'NEGATIVO' }
        ];

        this.armaBlacnca = [
            { arma: 'Cuchillo' },
            { arma: 'Pistolo' },
            { arma: 'Machete' },
            { arma: 'Piedra' },
            { arma: 'Otros' },
        ]

        this.IdConsulta = JSON.parse(localStorage.getItem('IDConsulta'));

        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.DataCupos = JSON.parse(localStorage.getItem('datacupos'));
        this.DataCupos2 = JSON.parse(localStorage.getItem('PacienteSinCupo'));
        this.datosConsultaActual = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.actualConsultation = JSON.parse(localStorage.getItem('datosConsultaActual'));
        this.actualConsultation ? this.actualConsultation.estadoAtencion == 2 ? this.consultationFinished = true : this.consultationFinished = false : this.consultationFinished = false;


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
        this.getDataPacienteByNroDoc()
        this.getTamizajePorIDConsulta();
    }
    buildForm() {
        this.formDatos_Tamisaje = this.form.group({
            /**Datos personales**/
            nroDoc: new FormControl({ value: '', disabled: true }),
            apePaterno: new FormControl({ value: '', disabled: true }),
            apeMaterno: new FormControl({ value: '', disabled: true }),
            nombres: new FormControl({ value: '', disabled: true }),
            Ocupacion: new FormControl({ value: '', disabled: true }),
            Direccion: new FormControl({ value: '', disabled: true }),
            Telefono: new FormControl({ value: '', disabled: true }),
            nroHcl: new FormControl({ value: '', disabled: true }),
            Edad: new FormControl({ value: '', disabled: true }),
            Fecha: new FormControl({ value: '', disabled: true }),//fecha atencion

            /**Preguntas respuestas**/
            Respuesta1: new FormControl({ value: '', disabled: false }),
            Respuesta2: new FormControl({ value: '', disabled: false }),
            Respuesta3: new FormControl({ value: '', disabled: false }),
            Respuesta4: new FormControl({ value: '', disabled: false }),
            Respuesta5: new FormControl({ value: '', disabled: false }),
            Respuesta6: new FormControl({ value: '', disabled: false }),
            Respuesta7: new FormControl({ value: '', disabled: false }),
            Respuesta8: new FormControl({ value: '', disabled: false }),

            Respuesta9: new FormControl({ value: '', disabled: false }),
            Respuesta10: new FormControl({ value: '', disabled: false }),
            Respuesta11: new FormControl({ value: '', disabled: false }),
            Respuesta12: new FormControl({ value: '', disabled: false }),
            Respuesta13: new FormControl({ value: '', disabled: false }),
            Respuesta14: new FormControl({ value: '', disabled: false }),
            Respuesta15: new FormControl({ value: '', disabled: false }),
            Respuesta16: new FormControl({ value: '', disabled: false }),
            PuntajeTotal: new FormControl({ value: '', disabled: false }),

            /**Diagnostico y responsable**/
            diagnostico: new FormControl({ value: '', disabled: false }),
            nroDodResponsable: new FormControl({ value: '', disabled: false }),
            ApellidosResponsable: new FormControl({ value: '', disabled: false }),

            respuestaValoracion1: new FormControl({ value: '', disabled: false }),
            respuestaValoracion2: new FormControl({ value: '', disabled: false }),
            respuestaValoracion2A: new FormControl({ value: '', disabled: false }),
            respuestaValoracion3: new FormControl({ value: '', disabled: false }),
            respuestaValoracion4: new FormControl({ value: '', disabled: false }),
            respuestaValoracion5: new FormControl({ value: '', disabled: false }),
            respuestaValoracion5A: new FormControl({ value: '', disabled: false }),
            respuestaValoracion6: new FormControl({ value: '', disabled: false }),
            respuestaValoracion7: new FormControl({ value: '', disabled: false }),
            respuestaValoracion8: new FormControl({ value: '', disabled: false }),
            respuestaValoracion9: new FormControl({ value: '', disabled: false }),
            respuestaValoracion10: new FormControl({ value: '', disabled: false }),
            respuestaValoracion11: new FormControl({ value: '', disabled: false }),
            respuestaValoracion12: new FormControl({ value: '', disabled: false }),
            respuestaValoracion12A: new FormControl({ value: '', disabled: false }),
            respuestaValoracion13: new FormControl({ value: '', disabled: false }),
            respuestaValoracion14: new FormControl({ value: '', disabled: false }),
            respuestaValoracion15: new FormControl({ value: '', disabled: false }),
            respuestaValoracion16: new FormControl({ value: '', disabled: false }),
            respuestaValoracion17: new FormControl({ value: '', disabled: false }),
            respuestaValoracion18: new FormControl({ value: '', disabled: false }),
            respuestaValoracion19: new FormControl({ value: '', disabled: false }),
            SumaTotalvalor: new FormControl({ value: '', disabled: true }),
            arma: new FormControl(),
            observaciones: new FormControl({ value: '', disabled: false }),
            NivelRiesgo: new FormControl({ value: '', disabled: true }),
        })
    }

    tab(event) {
        this.tabIndex = event.index;

    }

    /**Recupera un solo tamizaje al hacer un clic en el event**/
    getTamizajePorIdConsulta() {
        this.Recupera_un_Tamizaje = event;


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

        // this.formDatos_Tamisaje.get('nroDodResponsable').setValue(this.Recupera_un_Tamizaje.nroDocResponsable);
        // this.formDatos_Tamisaje.get('ApellidosResponsable').setValue(this.Recupera_un_Tamizaje.nombreResponsableAtencion);

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
        })
    }

    /**Abre el dialog para listar el tamizaje del paciente**/
    openModal() {
        // this.selectedHorario = null;
        this.ListaTamizajeDialog = true;
    }

    /**Recuperar datos de un paciendo por su documento de identidad**/
    getDataPacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object
            this.formDatos_Tamisaje.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Tamisaje.get('nroHcl').setValue(this.dataPacientes.nroHcl);
            this.formDatos_Tamisaje.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Tamisaje.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Tamisaje.get('nombres').setValue(this.dataPacientes.primerNombre);
            this.fechaConvertido = this.dataPacientes.nacimiento.fechaNacimiento;
            this.ageCalculator();//calcula la edad desde la fecha de nacimiento
            this.formDatos_Tamisaje.get('Edad').setValue(this.edad);
            this.formDatos_Tamisaje.get('Direccion').setValue(this.dataPacientes.domicilio.direccion + "," + this.dataPacientes.domicilio.departamento);
            this.formDatos_Tamisaje.get('Telefono').setValue(this.dataPacientes.celular);
            // this.formDatos_Tamisaje.get('Fecha').setValue(this.datosConsultaActual.fecha);
            // this.formDatos_Tamisaje.get('Fecha').setValue(this.datePipe.transform(this.datosConsultaActual.fecha, 'yyyy-MM-dd'),);

        });
    }

    /***Calcular el año desde la fecha de nacimiento**/
    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
    }

    /***Recupera la el dia, el mes y el año de la fecha actual***/


    calcularValoracion() {
        let p1 = this.formDatos_Tamisaje.get('respuestaValoracion1').value;
        let p2 = this.formDatos_Tamisaje.get('respuestaValoracion2').value;
        this.p2A = this.formDatos_Tamisaje.get('respuestaValoracion2A').value;
        // this.p2A!='SI'?this.formDatos_Tamisaje.get('respuestaValoracion3').disable():this.formDatos_Tamisaje.get('respuestaValoracion3').enable();
        // this.formDatos_Tamisaje.get('respuestaValoracion3').setValue('4');
        let p3 = this.formDatos_Tamisaje.get('respuestaValoracion3').value;
        let p4 = this.formDatos_Tamisaje.get('respuestaValoracion4').value;
        let p5 = this.formDatos_Tamisaje.get('respuestaValoracion5').value;
        this.p5A = this.formDatos_Tamisaje.get('respuestaValoracion5').value;

        let p6 = this.formDatos_Tamisaje.get('respuestaValoracion6').value;
        let p7 = this.formDatos_Tamisaje.get('respuestaValoracion7').value;
        let p8 = this.formDatos_Tamisaje.get('respuestaValoracion8').value;
        let p9 = this.formDatos_Tamisaje.get('respuestaValoracion9').value;
        let p10 = this.formDatos_Tamisaje.get('respuestaValoracion10').value;
        let p11 = this.formDatos_Tamisaje.get('respuestaValoracion11').value;
        let p12 = this.formDatos_Tamisaje.get('respuestaValoracion12').value;
        let p12A = this.formDatos_Tamisaje.get('respuestaValoracion12A').value;
        let p13 = this.formDatos_Tamisaje.get('respuestaValoracion13').value;
        let p14 = this.formDatos_Tamisaje.get('respuestaValoracion14').value;
        let p15 = this.formDatos_Tamisaje.get('respuestaValoracion15').value;
        let p16 = this.formDatos_Tamisaje.get('respuestaValoracion16').value;
        let p17 = this.formDatos_Tamisaje.get('respuestaValoracion17').value;
        let p18 = this.formDatos_Tamisaje.get('respuestaValoracion18').value;
        let p19 = this.formDatos_Tamisaje.get('respuestaValoracion19').value;


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
    evaluamos() {
        if (this.p2A != 'SI') {
            this.formDatos_Tamisaje.get('respuestaValoracion3').disable();
            this.formDatos_Tamisaje.get('respuestaValoracion3').setValue('')
        }
        else {
            this.formDatos_Tamisaje.get('respuestaValoracion3').enable();
        }
    }
    usaArmas = false
    evaluar2() {
        this.formDatos_Tamisaje.get('respuestaValoracion5').value == 3 ? this.usaArmas = true : this.usaArmas = false
        //     if(this.formDatos_Tamisaje.get('respuestaValoracion5').value==3){
        //         this.usaArmas=true
        //     }
        //     else
        //     {
        //         this.usaArmas=false
        //     }
    }

    calcularPuntaje() {
        let R9 = this.formDatos_Tamisaje.get('Respuesta9').value
        let R10 = this.formDatos_Tamisaje.get('Respuesta10').value
        let R11 = this.formDatos_Tamisaje.get('Respuesta11').value
        let R12 = this.formDatos_Tamisaje.get('Respuesta12').value//
        let R13 = this.formDatos_Tamisaje.get('Respuesta13').value
        let R14 = this.formDatos_Tamisaje.get('Respuesta14').value
        let R15 = this.formDatos_Tamisaje.get('Respuesta15').value//
        let R16 = this.formDatos_Tamisaje.get('Respuesta16').value

        this.PuntajeTotal = Number(R9) + Number(R10) + Number(R11) + Number(R12) + Number(R13) + Number(R14) + Number(R15) + Number(R16)
        this.formDatos_Tamisaje.get('PuntajeTotal').setValue(this.PuntajeTotal);

        if ((Number(R12) == 2) || (Number(R12) == 3) || (Number(R15) == 2) || (Number(R15) == 3) || (this.PuntajeTotal > 15)) {
            this.resultadoTamizaje = "POSITIVO";
        } else {
            if ((Number(R12 == 1)) || (Number(R15 == 1)) || (this.PuntajeTotal <= 15)) {
                this.resultadoTamizaje = "NEGATIVO";
            } else {
                return
            }
        }
    }

    limpiarFormulario() {
        this.Recupera_un_Tamizaje = null;
        this.formDatos_Tamisaje.reset();
        this.formDatos_Tamisaje.get('Fecha').setValue(this.datafecha);
        this.getDataPacienteByNroDoc();
    }

    // save() {
    //     if (this.Recupera_un_Tamizaje != null) {
    //         switch (this.tabIndex) {
    //             case 0:
    //                 this.UpdateTamizaje1();
    //                 break;
    //             case 1:
    //                 this.UpdateTamizaje2();
    //                 break;
    //             case 2:
    //                 this.UpdateTamizajeValoracion();
    //                 break;
    //         }
    //     } else {
    //         this.saveTamizaje();
    //     }
    // }

    /**Registra datos, preguntas que se hace al paciente**/
    guardarActualizar() {
        if ((this.estadoEmbarazo != "FINALIZADO") && (this.estadoEmbarazo != "")) {
            this.gestante = true;
        } else {
            this.gestante = false;
        }
        const data = {
            idConsulta: this.IdConsulta,
            tipoDoc: this.dataPacientes.tipoDoc,
            nroDoc: this.formDatos_Tamisaje.get('nroDoc').value,
            nroHcl: this.formDatos_Tamisaje.get('nroHcl').value,
            gestante: this.gestante,
            nroEmbarazo: this.nroEmbarazo,
            nombres: this.formDatos_Tamisaje.get('nombres').value,
            apePaterno: this.formDatos_Tamisaje.get('apePaterno').value,
            apeMaterno: this.formDatos_Tamisaje.get('apeMaterno').value,
            fecha: this.datePipe.transform(this.formDatos_Tamisaje.get('Fecha').value, 'yyyy-MM-dd'),
            // fecha: ('2022-09-26'),
            edad: this.formDatos_Tamisaje.get('Edad').value,
            direccion: this.formDatos_Tamisaje.get('Direccion').value,
            telefono: this.formDatos_Tamisaje.get('Telefono').value,

            preguntasMotivoConsulta: [
                {
                    pregunta: "¿Como se siente con usted misma?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta1').value,
                },
                {
                    pregunta: "¿Mantiene su apetito, sueño y deseo de realizar sus actividades como de costumbre?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta2').value,
                },
                {
                    pregunta: "¿Toma algo (medicacon u otro que le hayan recomendado)?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta3').value,
                }
            ],
            preguntasRelacionesPareja: [
                {
                    pregunta: "¿Cómo se siente en las relaciones cotidianas con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta4').value,
                },
                {
                    pregunta: "¿Cuáles son los desacuerdos más frecuentes que se dan con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta5').value,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta6').value,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta7').value,
                },
                {
                    pregunta: "¿Su pareja o expareja se enoja con facilidad o tiene arranques inesperados de cólera?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta8').value,
                }
            ],

            tipoDocResponsable: "DNI",
            // nroDocResponsable: this.formDatos_Tamisaje.get('nroDodResponsable').value,
            // nombreResponsableAtencion: this.formDatos_Tamisaje.get('ApellidosResponsable').value,
        }

        if (this.isUpdate) {
            this.tamizajeViolenciaService.UpdateTamizajeViolencia(this.tamisajeData.id, data).subscribe(result => {

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
        else {
            this.tamizajeViolenciaService.addTamizajeViolencia(data).toPromise()
                .then((result: any) => {
                    console.log("-intentamos-");

                    if (result.Object == null) {
                        throw result
                    }

                    this.getTamizajePorIDConsulta()
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro',
                        text: result.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    })


                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Registro',
                        text: error.cod = "2010" ? "no se puede evaluar en una misma fecha" : "error",
                        showConfirmButton: false,
                        timer: 1500,
                    })

                })

        }
        // this.tamizajeViolenciaService.addTamizajeViolencia(data).subscribe((result: any) => {
        //         this.getTamizajeNroDoc();
        //         if (result.object == null) {
        //             Swal.fire({
        //                 icon: 'warning',
        //                 title: 'Registro',
        //                 text: result.mensaje,
        //                 showConfirmButton: false,
        //                 timer: 1500,
        //             })
        //         } else {
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Registro',
        //                 text: result.mensaje,
        //                 showConfirmButton: false,
        //                 timer: 1500,
        //             })
        //         }

        //      }
        // )
    }

    UpdateTamizaje1() {
        const data2 = {
            idConsulta: this.IdConsulta,
            tipoDoc: this.dataPacientes.tipoDoc,
            nroDoc: this.formDatos_Tamisaje.get('nroDoc').value,
            nroHcl: this.formDatos_Tamisaje.get('nroHcl').value,
            gestante: this.Recupera_un_Tamizaje.gestante,
            nombres: this.formDatos_Tamisaje.get('nombres').value,
            apePaterno: this.formDatos_Tamisaje.get('apePaterno').value,
            apeMaterno: this.formDatos_Tamisaje.get('apeMaterno').value,
            fecha: this.datePipe.transform(this.formDatos_Tamisaje.value.Fecha, 'yyyy-MM-dd'),
            edad: this.formDatos_Tamisaje.get('Edad').value,
            direccion: this.formDatos_Tamisaje.get('Direccion').value,
            telefono: this.formDatos_Tamisaje.get('Telefono').value,

            preguntasMotivoConsulta: [
                {
                    pregunta: "¿Como se siente con usted misma?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta1').value,
                },
                {
                    pregunta: "¿Mantiene su apetito, sueño y deseo de realizar sus actividades como de costumbre?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta2').value,
                },
                {
                    pregunta: "¿Toma algo (medicacon u otro que le hayan recomendado)?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta3').value,
                }
            ],
            preguntasRelacionesPareja: [
                {
                    pregunta: "¿Cómo se siente en las relaciones cotidianas con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta4').value,
                },
                {
                    pregunta: "¿Cuáles son los desacuerdos más frecuentes que se dan con su pareja o expareja?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta5').value,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta6').value,
                },
                {
                    pregunta: "Cómo manejan estos desacuerdos? ¿Llegan a las discuciones?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta7').value,
                },
                {
                    pregunta: "¿Su pareja o expareja se enoja con facilidad o tiene arranques inesperados de cólera?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta8').value,
                }
            ],

            // tipoDocResponsable: "DNI",
            // nroDocResponsable: this.formDatos_Tamisaje.value.nroDodResponsable,
            // nombreResponsableAtencion: this.formDatos_Tamisaje.value.ApellidosResponsable,

        }

        this.tamizajeViolenciaService.UpdateTamizajeViolencia(this.Recupera_un_Tamizaje.id, data2).subscribe(result => {
            this.getTamizajePorIDConsulta();
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
                    respuesta: this.formDatos_Tamisaje.get('Respuesta9').value,
                },
                {
                    pregunta: "Usted y su pareja resuelven las discusiones con:",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta10').value,
                },
                {
                    pregunta: "Al terminar las discusiones usted ¿Se siente decaída o mal con usted misma?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta11').value,
                },
                {
                    pregunta: "Las discusiones ¿terminan en golpes, patadas o empujones?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta12').value,
                },
                {
                    pregunta: "¿Hay situaciones en las cuales ha sentido miedo de las reacciones de su pareja?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta13').value,
                },
                {
                    pregunta: "Su pareja ¿controla el dinero que usted gasta, o la obliga a realizar trabajo en exceso?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta14').value,
                },
                {
                    pregunta: " Su pareja ¿la insulta, grita, humilla o descalifica verbalmente?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta15').value,
                },
                {
                    pregunta: "¿Se ha sentido obligada a tener relaciones sexuales con su pareja para evitar problemas?",
                    respuesta: this.formDatos_Tamisaje.get('Respuesta16').value,
                },

            ],
            puntajeTotal: this.formDatos_Tamisaje.get('PuntajeTotal').value,
            diagnostico: this.resultadoTamizaje

        }
        this.tamizajeViolenciaService.postSaveViolenceScreening(this.IdConsulta, data2).then((res: any) => {
            if (res.cod == "2125") {
                Swal.fire({
                    icon: 'success',
                    title: 'Se Guardo con éxito',
                    showConfirmButton: false,
                    timer: 2000,
                })
                return;
            }
            if (res.cod == "2126") {
                Swal.fire({
                    icon: 'success',
                    title: 'Se Actualizo con éxito',
                    showConfirmButton: false,
                    timer: 2000,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo guardar el tamizaje',
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        })
        // this.tamizajeViolenciaService.UpdateTamizajeCuestionario(this.tamisajeData.id, data2).subscribe(result => {
        //         this.getTamizajeNroDoc();
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Se Actualizo con exito',
        //             text: '',
        //             showConfirmButton: false,
        //             timer: 1500,
        //         })
        //     }
        // )
    }

    UpdateTamizajeValoracion() {
        const data2 = {
            id: this.tamisajeData.id,
            cuestionario: [
                {
                    pregunta: "¿En el último año, la violencia física contra usted ha aumentado en gravedad o frecuencia?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion1').value,
                },
                {
                    pregunta: "¿Él tiene algún arma o podría conseguir un arma con facilidad? (pistola, cuchillo, machete, u otros)",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion2').value,
                },
                {
                    pregunta: "2a.- ¿Han vivido juntos durante el último año? [si dice NO, pasar a pregunta 4]",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion2A').value,
                },
                {
                    pregunta: "Usted me dice que han vivido juntos en el último año. ¿Siguen viviendo juntos o lo ha dejado? [Si siguen viviendo juntos marcar SI; si lo ha dejado marcar NO]",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion3').value,
                },
                {
                    pregunta: "¿Actualmente, él tiene trabajo estable? [si ella no sabe, no marcar nada]",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion4').value,
                },
                {
                    pregunta: "¿Alguna vez él ha usado o la ha amenazado con un arma (pistola, cuchillo, machete u otros)?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion5').value,
                },
                {
                    pregunta: "5a.- Si su respuesta fue “SI”, ¿fue con una pistola o cuchillo?",
                    respuesta: this.formDatos_Tamisaje.get('arma').value,
                },
                {
                    pregunta: "¿La ha amenazado con matarla?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion6').value,
                },
                {
                    pregunta: "¿Alguna vez usted lo denunció por violencia familiar (porque él le pegó) ante la comisaría, fiscalía, juzgado o ante alguna autoridad comunal?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion7').value,
                },
                {
                    pregunta: "¿Él la ha obligado alguna vez a tener relaciones sexuales?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion8').value,
                },
                {
                    pregunta: "¿Él ha intentado ahorcarla?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion9').value,
                },
                {
                    pregunta: "¿Él consume drogas? Por ejemplo, como la marihuana, pasta básica, cocaína u otras",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion10').value,
                },
                {
                    pregunta: "¿Él es alcohólico o tiene problemas con el alcohol (trago o licor)?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion11').value,
                },
                {
                    pregunta: "¿Le controla la mayoría o todas sus actividades diarias? Por ejemplo, no le deja que vea a sus familiares o amistades, le controla cuánto dinero puede gastar, etc.",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion12').value,
                },
                {
                    pregunta: "12a.- Si él trata de controlarla, pero ella no lo permite, márquelo aquí:",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion12A').value,
                },
                {
                    pregunta: "¿Él se pone celoso de forma constante y violenta? Por ejemplo, le dice: “si no eres mía, no serás de nadie” u otras similares.",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion13').value,
                },
                {
                    pregunta: "¿Cuándo usted estuvo embarazada, alguna vez él la golpeó?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion14').value,
                },
                {
                    pregunta: "¿Alguna vez él ha amenazado o ha intentado suicidarse?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion15').value,
                },
                {
                    pregunta: "¿Él la ha amenazado con hacerle daño a sus hijos?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion16').value,
                },
                {
                    pregunta: "¿Cree que él es capaz de matarla?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion17').value,
                },
                {
                    pregunta: "¿Él realiza alguna de las siguientes acciones?: La llama insistentemente, le deja mensajes en su teléfono o en redes sociales o destruye sus cosas (celular, ropa u otro)",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion18').value,
                },
                {
                    pregunta: "¿Alguna vez usted ha intentado o ha amenazado con quitarse la vida?",
                    respuesta: this.formDatos_Tamisaje.get('respuestaValoracion19').value,
                },
            ],
            puntajeTotal: this.PuntajeTotalValoracion,
            nivelRiesgo: this.NivelRiesgo,
            observaciones: this.formDatos_Tamisaje.get('observaciones').value,

        }
        this.tamizajeViolenciaService.UpdateTamizajeValorRiesgo(this.tamisajeData.id, data2).subscribe(result => {
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
    tamisajeData: any
    isUpdate = false

    getTamizajePorIDConsulta() {
        this.tamizajeViolenciaService.GetTamizajePorIDConsulta(this.IdConsulta).subscribe((result: any) => {
            if (result.object[0]) {
                this.isUpdate = true
                this.tamisajeData = result.object[0]
                /* datos generales */
                this.formDatos_Tamisaje.get('Fecha').setValue(this.tamisajeData.fecha);
                this.formDatos_Tamisaje.get('apePaterno').setValue(this.tamisajeData.apePaterno);
                this.formDatos_Tamisaje.get('apeMaterno').setValue(this.tamisajeData.apeMaterno);
                this.formDatos_Tamisaje.get('nombres').setValue(this.tamisajeData.nombres);
                this.formDatos_Tamisaje.get('nroDoc').setValue(this.tamisajeData.nroDoc);
                this.formDatos_Tamisaje.get('nroHcl').setValue(this.tamisajeData.nroHcl);
                this.formDatos_Tamisaje.get('Telefono').setValue(this.tamisajeData.telefono);
                this.formDatos_Tamisaje.get('Edad').setValue(this.tamisajeData.edad);
                /* preguntas relacionadas con motivo de consulta */
                if (this.tamisajeData.preguntasMotivoConsulta) {
                    this.formDatos_Tamisaje.get('Respuesta1').setValue(this.tamisajeData.preguntasMotivoConsulta[0].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta2').setValue(this.tamisajeData.preguntasMotivoConsulta[1].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta3').setValue(this.tamisajeData.preguntasMotivoConsulta[2].respuesta);
                }
                if (this.tamisajeData.preguntasRelacionesPareja) {
                    this.formDatos_Tamisaje.get('Respuesta4').setValue(this.tamisajeData.preguntasRelacionesPareja[0].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta5').setValue(this.tamisajeData.preguntasRelacionesPareja[1].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta6').setValue(this.tamisajeData.preguntasRelacionesPareja[2].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta7').setValue(this.tamisajeData.preguntasRelacionesPareja[3].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta8').setValue(this.tamisajeData.preguntasRelacionesPareja[4].respuesta);
                }
                /* preguntas paciente II */
                if (this.tamisajeData.cuestionarioPosibleViolencia) {
                    this.formDatos_Tamisaje.get('Respuesta9').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[0].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta10').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[1].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta11').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[2].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta12').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[3].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta13').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[4].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta14').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[5].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta15').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[6].respuesta);
                    this.formDatos_Tamisaje.get('Respuesta16').setValue(this.tamisajeData.cuestionarioPosibleViolencia.cuestionario[7].respuesta);
                    this.formDatos_Tamisaje.get('PuntajeTotal').setValue(this.tamisajeData.cuestionarioPosibleViolencia.puntajeTotal);
                    this.resultadoTamizaje = this.tamisajeData.cuestionarioPosibleViolencia.diagnostico;
                }
                /* ficha de valoracion */
                if (this.tamisajeData.fichaValoracionRiesgo) {

                    this.formDatos_Tamisaje.get('respuestaValoracion1').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[0].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion2').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[1].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion2A').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[2].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion3').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[3].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion4').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[4].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion5').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[5].respuesta);
                    this.evaluar2()
                    this.formDatos_Tamisaje.get('arma').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[6].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion6').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[7].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion7').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[8].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion8').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[9].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion9').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[10].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion10').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[11].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion11').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[12].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion12').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[13].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion12A').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[14].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion13').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[15].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion14').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[16].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion15').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[17].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion16').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[18].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion17').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[19].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion18').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[20].respuesta);
                    this.formDatos_Tamisaje.get('respuestaValoracion19').setValue(this.tamisajeData.fichaValoracionRiesgo.cuestionario[21].respuesta);
                    this.formDatos_Tamisaje.get('observaciones').setValue(this.tamisajeData.fichaValoracionRiesgo.observaciones);
                    this.formDatos_Tamisaje.get('NivelRiesgo').setValue(this.tamisajeData.fichaValoracionRiesgo.nivelRiesgo);
                    this.formDatos_Tamisaje.get('SumaTotalvalor').setValue(this.tamisajeData.fichaValoracionRiesgo.puntajeTotal);
                }

            }
            //  let p5A_String = this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[6].respuesta;
            //  if ((p5A_String == null) || (p5A_String == '')) {
            //      this.p5A = 'NO';
            //      this.formDatos_Tamisaje.get('respuestaValoracion5A').setValue(this.p5A);
            //  } else {
            //      this.formDatos_Tamisaje.get('arma').setValue(this.Recupera_un_Tamizaje.fichaValoracionRiesgo.cuestionario[6].respuesta);
            //      this.p5A = 'SI';
            //      this.formDatos_Tamisaje.get('respuestaValoracion5A').setValue(this.p5A);
            //  }
        })
    }
}
