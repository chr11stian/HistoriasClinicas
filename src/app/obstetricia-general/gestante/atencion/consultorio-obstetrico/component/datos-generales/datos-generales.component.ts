import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {ConsultasService} from "../../services/consultas.service";
import Swal from "sweetalert2";
import {FiliancionService} from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-datos-generales',
    templateUrl: './datos-generales.component.html',
    styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
    formDatos_Generales: FormGroup;

    /**Recupera el Id del Consultorio Obstetrico**/
    idConsultoriObstetrico: string;

    //opciones de vacunas previas///
    opciones: any;
    opciones1: any;
    opciones2: any;
    opciones3: any;
    opciones4: any;
    opciones5: any;
    opciones6: any;

    sumagestas: any;

    /****DESCARTE SIGNO DE ALARMA******/
    descarteSigAlarma: any;

    data: any;
    dataPacientes: any;
    gradInstruccion: any;
    fechanacimiento: any;
    datafecha: Date = new Date();
    datePipe = new DatePipe('en-US');
    horaActualString: string;
    fecha: Date;//fecha Actual
    fechaConvertido: string;//fecha convertido
    edad: any;
    dataConsultas: any; //consultas en general

    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    nroEmbarazo: string;

    constructor(private form: FormBuilder,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                private consultasService: ConsultasService,
                private filiancionService: FiliancionService,) {

        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.idConsultoriObstetrico = this.obstetriciaGeneralService.idConsultoriObstetrico;

        /** OTRAS OPCIONES**/
        this.opciones = [
            {name: 'SI', boleano: true},
            {name: 'NO', boleano: false}
        ];

        //opciones de vacunas previas///
        this.opciones1 = [
            {name: 'SI', decripcion: 'SI, V. Antitetánica 1° Dosis'},
            {name: 'NO', decripcion: 'No, V. Antitetánica 1° Dosis'}
        ];
        this.opciones2 = [
            {name: 'SI', decripcion: 'SI, V. Antitetánica 2° Dosis'},
            {name: 'NO', decripcion: 'No, V. Antitetánica 2° Dosis'}
        ];
        this.opciones3 = [
            {name: 'SI', decripcion: 'SI, Rubeola'},
            {name: 'NO', decripcion: 'No, Rubeola'}
        ];
        this.opciones4 = [
            {name: 'SI', decripcion: 'SI, Hepatites B'},
            {name: 'NO', decripcion: 'No, Hepatites B'}
        ];
        this.opciones5 = [
            {name: 'SI', decripcion: 'SI, Papiloma V'},
            {name: 'NO', decripcion: 'No, Papiloma V'}
        ];
        this.opciones6 = [
            {name: 'SI', decripcion: 'SI, Covid-19'},
            {name: 'NO', decripcion: 'No, Covid-19'}
        ];
        //opciones de vacunas previas///
    }

    ngOnInit(): void {
        this.buildForm();
        this.obternerFechaActual();

        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("Nro de embarazo", this.nroEmbarazo);
        console.log("Id Consultorio Obstetrico", this.idConsultoriObstetrico);

        /**Si la datos de consultorio esta en vacio recupera los datos del paciente***/
        /**Caso contrario recupera los datos de Consultorio***/
        if (this.dataConsultas == null) {
            this.getpacienteByNroDoc();
        } else {
            this.getConsultas();
        }
    }
    /***Recupera la cunsulta por HCL y Numero de embarazo***/
    getConsultas() {
        let data = {
            nroHcl: this.dataPacientes.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: 1
        }
        console.log("data", data);
        this.consultasService.getConsultas(data).subscribe((res: any) => {
            this.dataConsultas = res.object
            console.log('DATA CONSULTAS ', this.dataConsultas)
            this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('telefono').setValue(this.dataConsultas.datosPersonales.telefono);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataConsultas.datosPersonales.gradoInstitucional);
            this.formDatos_Generales.get('ocupacion').setValue(this.dataConsultas.datosPersonales.ocupacion);
            this.formDatos_Generales.get('edad').setValue(this.dataConsultas.datosPerHist.edad);
            this.formDatos_Generales.get('direccion').setValue(this.dataConsultas.datosPerHist.direccion);
            this.formDatos_Generales.get('fecha').setValue(this.dataConsultas.fecha);
            // this.formDatos_Generales.get('hora').setValue(this.dataConsultas.fecha);

            //Recuperar Vacunas previas
            this.formDatos_Generales.get('vAntitetánica1Dosis').setValue(this.dataConsultas.vacunasPrevias[0].descripcion);
            this.formDatos_Generales.get('fecha1').setValue(this.dataConsultas.vacunasPrevias[0].fecha);
            this.formDatos_Generales.get('vAntitetánica2Dosis').setValue(this.dataConsultas.vacunasPrevias[1].descripcion);
            this.formDatos_Generales.get('fecha2').setValue(this.dataConsultas.vacunasPrevias[1].fecha);
            this.formDatos_Generales.get('rubeola').setValue(this.dataConsultas.vacunasPrevias[2].descripcion);
            this.formDatos_Generales.get('fecha3').setValue(this.dataConsultas.vacunasPrevias[2].fecha);
            this.formDatos_Generales.get('HepatitesB').setValue(this.dataConsultas.vacunasPrevias[3].descripcion);
            this.formDatos_Generales.get('fecha4').setValue(this.dataConsultas.vacunasPrevias[3].fecha);
            this.formDatos_Generales.get('PapilomaV').setValue(this.dataConsultas.vacunasPrevias[4].descripcion);
            this.formDatos_Generales.get('fecha5').setValue(this.dataConsultas.vacunasPrevias[4].fecha);
            this.formDatos_Generales.get('Covid19').setValue(this.dataConsultas.vacunasPrevias[5].descripcion);
            this.formDatos_Generales.get('fecha6').setValue(this.dataConsultas.vacunasPrevias[5].fecha);

            //recuperar Antecedentes Gineco Obstetrico
            this.formDatos_Generales.get('FUR').setValue(this.dataConsultas.antecedentesGinObs[0].fechaUltRegla);
            this.formDatos_Generales.get('FPP').setValue(this.dataConsultas.antecedentesGinObs[0].fechaPosiParto);
            this.formDatos_Generales.get('RCAT').setValue(this.dataConsultas.antecedentesGinObs[0].rcat);
            this.formDatos_Generales.get('G').setValue(this.dataConsultas.antecedentesGinObs[0].g);
            this.formDatos_Generales.get('P1').setValue(this.dataConsultas.antecedentesGinObs[0].p1);
            this.formDatos_Generales.get('P2').setValue(this.dataConsultas.antecedentesGinObs[0].p2);
            this.formDatos_Generales.get('P3').setValue(this.dataConsultas.antecedentesGinObs[0].p3);
            this.formDatos_Generales.get('P4').setValue(this.dataConsultas.antecedentesGinObs[0].p4);
            this.formDatos_Generales.get('gesAnterior').setValue(this.dataConsultas.antecedentesGinObs[0].gestAnterior);
            this.formDatos_Generales.get('RNpesoMayor').setValue(this.dataConsultas.antecedentesGinObs[0].rnMayorPeso);

            //RECUPERA LOS ANTECEDENTES
            this.formDatos_Generales.get('AntecedentesFamiliares').setValue(this.dataConsultas.antecedentesFamiliares[0]);
            this.formDatos_Generales.get('AntecedentesPersonales').setValue(this.dataConsultas.antecedentesPersonales[0]);
            this.formDatos_Generales.get('FumaCigarros').setValue(this.dataConsultas.fumaCigarros);
            this.formDatos_Generales.get('Drogas').setValue(this.dataConsultas.drogas);
            this.formDatos_Generales.get('Psicoprofilaxis').setValue(this.dataConsultas.psicoprofilaxis.estado);

            //RECUPERA DESCARTE SIGNOS DE ALARMA
            this.formDatos_Generales.get('DificultadRespiratoria').setValue(this.dataConsultas.descarteSignosAlarmas[0].valor);
            this.formDatos_Generales.get('HipertenciónArterial').setValue(this.dataConsultas.descarteSignosAlarmas[1].valor);
            this.formDatos_Generales.get('SangradoNasal').setValue(this.dataConsultas.descarteSignosAlarmas[2].valor);
            this.formDatos_Generales.get('DeshidrataciónAguda').setValue(this.dataConsultas.descarteSignosAlarmas[3].valor);
            this.formDatos_Generales.get('CompromisoDelSensorio').setValue(this.dataConsultas.descarteSignosAlarmas[4].valor);
            this.formDatos_Generales.get('TraumatismoQuemadura').setValue(this.dataConsultas.descarteSignosAlarmas[5].valor);
            this.formDatos_Generales.get('AbdomenAgudo').setValue(this.dataConsultas.descarteSignosAlarmas[6].valor);
            this.formDatos_Generales.get('IntoxicaciónEnvenenamiento').setValue(this.dataConsultas.descarteSignosAlarmas[7].valor);
            this.formDatos_Generales.get('FiebreAlta').setValue(this.dataConsultas.descarteSignosAlarmas[8].valor);
            this.formDatos_Generales.get('Convulciones').setValue(this.dataConsultas.descarteSignosAlarmas[9].valor);
            this.formDatos_Generales.get('SangradoGenital').setValue(this.dataConsultas.descarteSignosAlarmas[10].valor);
            this.formDatos_Generales.get('DolorDeCabeza').setValue(this.dataConsultas.descarteSignosAlarmas[11].valor);
            this.formDatos_Generales.get('Edema').setValue(this.dataConsultas.descarteSignosAlarmas[12].valor);

            //RECUPERA DESCARTE ATENSION INTEGRAL
            this.formDatos_Generales.get('OrientaciónConsegeríaSignosAlarma').setValue(this.dataConsultas.orientaciones[0].valor);
            this.formDatos_Generales.get('ConsejeríaEnfermedadesComunes').setValue(this.dataConsultas.orientaciones[1].valor);
            this.formDatos_Generales.get('SospechasTuberculosis').setValue(this.dataConsultas.orientaciones[2].valor);
            this.formDatos_Generales.get('InfeccionesTransmisiónSexual').setValue(this.dataConsultas.orientaciones[3].valor);
            this.formDatos_Generales.get('OrientaciónNutricional').setValue(this.dataConsultas.orientaciones[4].valor);
            this.formDatos_Generales.get('OrientaciónPlanificaiónFamiliar').setValue(this.dataConsultas.orientaciones[5].valor);
            this.formDatos_Generales.get('OrientaciónPrevenciónDeCancerGinecológico').setValue(this.dataConsultas.orientaciones[6].valor);
            this.formDatos_Generales.get('OrientaciónConsejeriaPretestVIH').setValue(this.dataConsultas.orientaciones[7].valor);
            this.formDatos_Generales.get('OrientaciónEnEstilosDeVidaSaludable').setValue(this.dataConsultas.orientaciones[8].valor);
            this.formDatos_Generales.get('OrientaciónAcompañante').setValue(this.dataConsultas.orientaciones[9].valor);
            this.formDatos_Generales.get('ViolenciaFamiliar').setValue(this.dataConsultas.orientaciones[10].valor);
            this.formDatos_Generales.get('PlanDeParto').setValue(this.dataConsultas.orientaciones[11].valor);

        });
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


    /**Calcula las gestas del paciente con los primeros digitos**/
    calcularGestas() {
        let p1 = ((document.getElementById("txt1") as HTMLInputElement).value);
        let p2 = ((document.getElementById("txt2") as HTMLInputElement).value);
        let p3 = ((document.getElementById("txt3") as HTMLInputElement).value);
        let p11 = Number(p1);
        let p22 = Number(p2);
        let p33 = Number(p3);
        this.sumagestas = p11 + p22 + p33;
        this.formDatos_Generales.get('G').setValue(this.sumagestas);
        console.log("GESTAS", this.sumagestas);
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

    //Recuperar datos de un paciendo por su documento de identidad
    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object
            console.log('PACIENTES POR DOC ', this.dataPacientes)
            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('nombres').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('telefono').setValue(this.dataPacientes.celular);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataPacientes.gradoInstruccion);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion + "," + this.dataPacientes.domicilio.departamento);
            this.fechaConvertido = this.dataPacientes.nacimiento.fechaNacimiento;
            console.log("nacimiento", this.fechaConvertido)
            this.ageCalculator();//calcula la edad desde la fecha de nacimiento
            this.formDatos_Generales.get('edad').setValue(this.edad);
            this.formDatos_Generales.get('hora').setValue(this.horaActualString);
            this.getConsultas();//Recupera la cunsulta por HCL y Numero de embarazo
        });
    }
    buildForm() {
        this.formDatos_Generales = this.form.group({
            //Datos generales del paciente
            nroDoc: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            nombres: new FormControl(''),
            edad: new FormControl(''),
            telefono: new FormControl(''),
            gradoInstruccion: new FormControl(''),
            direccion: new FormControl(''),
            ocupacion: new FormControl(''),
            fecha: new FormControl(''),
            hora: new FormControl(''),

            //Vacunas previas del paciente
            vAntitetánica1Dosis: new FormControl(''),
            fecha1: new FormControl(''),
            vAntitetánica2Dosis: new FormControl(''),
            fecha2: new FormControl(''),
            rubeola: new FormControl(''),
            fecha3: new FormControl(''),
            HepatitesB: new FormControl(''),
            fecha4: new FormControl(''),
            PapilomaV: new FormControl(''),
            fecha5: new FormControl(''),
            Covid19: new FormControl(''),
            fecha6: new FormControl(''),


            //Antecedentes Gineco Obstetrico
            FUR: new FormControl(''),
            FPP: new FormControl(''),
            RCAT: new FormControl(''),
            G: new FormControl('',),
            P1: new FormControl(''),
            P2: new FormControl(''),
            P3: new FormControl(''),
            P4: new FormControl(''),
            gesAnterior: new FormControl(''),
            RNpesoMayor: new FormControl(''),

            //ANTECEDENTES
            AntecedentesFamiliares: new FormControl(''),
            AntecedentesPersonales: new FormControl(''),
            FumaCigarros: new FormControl(''),
            Drogas: new FormControl(''),
            Psicoprofilaxis: new FormControl(''),

            /****DESCARTE SIGNO DE ALARMA******/
            DificultadRespiratoria: new FormControl(''),
            HipertenciónArterial: new FormControl(''),
            SangradoNasal: new FormControl(''),
            DeshidrataciónAguda: new FormControl(''),
            CompromisoDelSensorio: new FormControl(''),
            TraumatismoQuemadura: new FormControl(''),
            AbdomenAgudo: new FormControl(''),
            IntoxicaciónEnvenenamiento: new FormControl(''),
            FiebreAlta: new FormControl(''),
            Convulciones: new FormControl(''),
            SangradoGenital: new FormControl(''),
            DolorDeCabeza: new FormControl(''),
            Edema: new FormControl(''),

            /****ATENSION INTEGRAL******/
            OrientaciónConsegeríaSignosAlarma: new FormControl(''),
            ConsejeríaEnfermedadesComunes: new FormControl(''),
            SospechasTuberculosis: new FormControl(''),
            InfeccionesTransmisiónSexual: new FormControl(''),
            OrientaciónNutricional: new FormControl(''),
            OrientaciónPlanificaiónFamiliar: new FormControl(''),
            OrientaciónPrevenciónDeCancerGinecológico: new FormControl(''),
            OrientaciónConsejeriaPretestVIH: new FormControl(''),
            OrientaciónEnEstilosDeVidaSaludable: new FormControl(''),
            OrientaciónAcompañante: new FormControl(''),
            ViolenciaFamiliar: new FormControl(''),
            PlanDeParto: new FormControl(''),


        })
    }


    //Agregar, actualizar datos de consultorio obstetrico
    Add_updateConsultas() {
        this.data = {
            nroHcl: this.dataPacientes.nroHcl,
            nroAtencion: 1,
            nroControlSis: 1,
            nroEmbarazo: this.nroEmbarazo,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha, 'yyyy-MM-dd HH:mm:ss'),

            datosPerHist: {
                edad: this.formDatos_Generales.value.edad,
                direccion: this.formDatos_Generales.value.direccion,
            },
            datosPersonales: {
                telefono: this.formDatos_Generales.value.telefono,
                ocupacion: this.formDatos_Generales.value.ocupacion,
                gradoInstitucional: this.formDatos_Generales.value.gradoInstruccion,
            },
            vacunasPrevias: [
                {
                    descripcion: this.formDatos_Generales.value.vAntitetánica1Dosis,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha1, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.vAntitetánica2Dosis,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha2, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.rubeola,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha3, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.HepatitesB,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha4, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.PapilomaV,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha5, 'yyyy-MM-dd HH:mm:ss'),
                },
                {
                    descripcion: this.formDatos_Generales.value.Covid19,
                    fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha6, 'yyyy-MM-dd HH:mm:ss'),
                },
            ],

            antecedentesGinObs: [{
                fechaUltRegla: this.formDatos_Generales.value.FUR,
                fechaPosiParto: this.formDatos_Generales.value.FPP,
                rcat: this.formDatos_Generales.value.RCAT,
                g: this.formDatos_Generales.value.G,
                p1: this.formDatos_Generales.value.P1,
                p2: this.formDatos_Generales.value.P2,
                p3: this.formDatos_Generales.value.P3,
                p4: this.formDatos_Generales.value.P4,
                gestAnterior: this.formDatos_Generales.value.gesAnterior,
                rnMayorPeso: this.formDatos_Generales.value.RNpesoMayor,

            }],
            antecedentesFamiliares: [
                this.formDatos_Generales.value.AntecedentesFamiliares,
            ],
            antecedentesPersonales: [
                this.formDatos_Generales.value.AntecedentesPersonales,
            ],
            fumaCigarros: this.formDatos_Generales.value.FumaCigarros,
            drogas: this.formDatos_Generales.value.Drogas,

            psicoprofilaxis: {
                estado: this.formDatos_Generales.value.Psicoprofilaxis,
                fecha: "",
            },

            descarteSignosAlarmas: [
                {
                    descripcion: "Dificultad respiratoria",
                    valor: this.formDatos_Generales.value.DificultadRespiratoria,
                },
                {
                    descripcion: "Hipertención Arterial",
                    valor: this.formDatos_Generales.value.HipertenciónArterial,
                },
                {
                    descripcion: "Sangrado nasal",
                    valor: this.formDatos_Generales.value.SangradoNasal,
                },
                {
                    descripcion: "Deshidratación aguda",
                    valor: this.formDatos_Generales.value.DeshidrataciónAguda,
                },
                {
                    descripcion: "Compromiso del sensorio",
                    valor: this.formDatos_Generales.value.CompromisoDelSensorio,
                },
                {
                    descripcion: "Traumatismo Quemadura",
                    valor: this.formDatos_Generales.value.TraumatismoQuemadura,
                },

                {
                    descripcion: "Abdomen agudo",
                    valor: this.formDatos_Generales.value.AbdomenAgudo,
                },
                {
                    descripcion: "Intoxicación Envenenamiento",
                    valor: this.formDatos_Generales.value.IntoxicaciónEnvenenamiento,
                },

                {
                    descripcion: "Fiebre alta",
                    valor: this.formDatos_Generales.value.FiebreAlta,
                },
                {
                    descripcion: "Convulciones",
                    valor: this.formDatos_Generales.value.Convulciones,
                },
                {
                    descripcion: "Sangrado genital",
                    valor: this.formDatos_Generales.value.SangradoGenital,
                },
                {
                    descripcion: "Dolor de cabeza",
                    valor: this.formDatos_Generales.value.DolorDeCabeza,
                },
                {
                    descripcion: "Edema",
                    valor: this.formDatos_Generales.value.Edema,
                },

            ],
            orientaciones: [
                {
                    consejeria: "Orientación y Consegería Signos de alarma",
                    valor: this.formDatos_Generales.value.OrientaciónConsegeríaSignosAlarma,
                    cie10: ""
                },
                {
                    consejeria: "Consejería en enfermedades comunes",
                    valor: this.formDatos_Generales.value.ConsejeríaEnfermedadesComunes,
                    cie10: ""
                },
                {
                    consejeria: "Sospechas de Tuberculosis",
                    valor: this.formDatos_Generales.value.SospechasTuberculosis,
                    cie10: ""
                },
                {
                    consejeria: "Infecciones de transmisión sexual",
                    valor: this.formDatos_Generales.value.InfeccionesTransmisiónSexual,
                    cie10: ""
                },
                {
                    consejeria: "Orientación Nutricional",
                    valor: this.formDatos_Generales.value.OrientaciónNutricional,
                    cie10: ""
                },
                {
                    consejeria: "Orientación en planificaión familiar",
                    valor: this.formDatos_Generales.value.OrientaciónPlanificaiónFamiliar,
                    cie10: ""
                },
                {
                    consejeria: "Orientación en prevención de Cancer ginecológico",
                    valor: this.formDatos_Generales.value.OrientaciónPrevenciónDeCancerGinecológico,
                    cie10: ""
                },
                {
                    consejeria: "Orientación y consej. Pretest. VIH",
                    valor: this.formDatos_Generales.value.OrientaciónConsejeriaPretestVIH,
                    cie10: ""
                },
                {
                    consejeria: "Orientación en estilos de vida saludable",
                    valor: this.formDatos_Generales.value.OrientaciónEnEstilosDeVidaSaludable,
                    cie10: ""
                },
                {
                    consejeria: "Orientación al acompañante",
                    valor: this.formDatos_Generales.value.OrientaciónAcompañante,
                    cie10: ""
                },
                {
                    consejeria: "Violencia familiar",
                    valor: this.formDatos_Generales.value.ViolenciaFamiliar,
                    cie10: "Z6381"
                },
                {
                    consejeria: "Plan de parto",
                    valor: this.formDatos_Generales.value.PlanDeParto,
                    cie10: "U1692"
                },
            ],
        }
        console.log("DATA UPDATE ADD CONSULTAS", this.data);
        if (this.dataConsultas == null) {
            this.consultasService.addConsultas(this.data).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Se guardo con exito',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        } else {
            this.consultasService.updateConsultas(this.data).subscribe((result: any) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizo con exito',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    console.log('rpta', result);
                }
            );
        }
    }
}
