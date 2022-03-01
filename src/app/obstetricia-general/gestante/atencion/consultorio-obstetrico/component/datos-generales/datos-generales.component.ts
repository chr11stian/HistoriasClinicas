import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ConsultasService } from "../../services/consultas.service";
import Swal from "sweetalert2";
import { FiliancionService } from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-datos-generales',
    templateUrl: './datos-generales.component.html',
    styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
    formDatos_Generales: FormGroup;
    formAntecedentes: FormGroup;

    /**Recupera el Id del Consultorio Obstetrico**/
    idConsultoriObstetrico: string;

    //opciones de vacunas previas///
    nroFetos = 1;
    opciones: any;
    opciones1: any;
    opciones2: any;
    opciones3: any;
    opciones4: any;
    opciones5: any;
    opciones6: any;

    sumagestas: any;

    /**Antecedentes Personales**/
    otrosAntecedentesFamiliares: string;
    otrosAntecedentesFamiliares2: string[] = [];
    otros2: string;
    otros23: string[] = [];
    Ninguno: string[] = [];
    Abortohabitualrecurrente: string[] = [];
    Violencia: string[] = [];
    Cardiopatia: string[] = [];
    cirugiaPelvicaUterina: string[] = [];
    Eclampsia: string[] = [];
    preEclampsia: string[] = [];
    hemorraPostparto: string[] = [];
    TBCPulmonar2: string[] = [];
    VIHSIDA: string[] = [];
    Alcoholismo: string[] = [];
    alergiaAmedicamentos: string[] = [];
    asmaBronquial: string[] = [];
    diabetes2: string[] = [];
    enfermCongenitas: string[] = [];
    enfermInfecciosas: string[] = [];
    epilepsia: string[] = [];
    hipArterial: string[] = [];
    consumoHojaDeCoca: string[] = [];
    infertilidad: string[] = [];
    neoplasias: string[] = [];
    otrasDrogas: string[] = [];
    partoProlong: string[] = [];
    preeclampsia: string[] = [];
    prematuridad: string[] = [];
    retenPlacenta: string[] = [];
    tabaco: string[] = [];
    transtornMentales: string[] = [];

    /**Antecedentes Familiares**/
    antecedentes1: string[] = [];
    antecedentes2: string[] = [];
    antecedentes3: string[] = [];
    antecedentes4: string[] = [];
    antecedentes5: string[] = [];
    antecedentes6: string[] = [];
    antecedentes7: string[] = [];
    antecedentes8: string[] = [];
    antecedentes9: string[] = [];
    antecedentes10: string[] = [];
    antecedentes11: string[] = [];
    antecedentes12: string[] = [];
    antecedentes13: string[] = [];

    familiares: any[];
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
        private filiancionService: FiliancionService,
        private messageService: MessageService,) {

        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.idConsultoriObstetrico = this.obstetriciaGeneralService.idConsultoriObstetrico;

        /** OTRAS OPCIONES**/
        this.opciones = [
            { name: 'SI', boleano: true },
            { name: 'NO', boleano: false }
        ];

        //opciones de vacunas previas///
        this.opciones1 = [
            { name: 'SI', decripcion: 'SI, V. Antitetánica 1° Dosis' },
            { name: 'NO', decripcion: 'No, V. Antitetánica 1° Dosis' }
        ];
        this.opciones2 = [
            { name: 'SI', decripcion: 'SI, V. Antitetánica 2° Dosis' },
            { name: 'NO', decripcion: 'No, V. Antitetánica 2° Dosis' }
        ];
        this.opciones3 = [
            { name: 'SI', decripcion: 'SI, Rubeola' },
            { name: 'NO', decripcion: 'No, Rubeola' }
        ];
        this.opciones4 = [
            { name: 'SI', decripcion: 'SI, Hepatites B' },
            { name: 'NO', decripcion: 'No, Hepatites B' }
        ];
        this.opciones5 = [
            { name: 'SI', decripcion: 'SI, Papiloma V' },
            { name: 'NO', decripcion: 'No, Papiloma V' }
        ];
        this.opciones6 = [
            { name: 'SI', decripcion: 'SI, Covid-19' },
            { name: 'NO', decripcion: 'No, Covid-19' }
        ];
        //opciones de vacunas previas///

        this.familiares = [
            { nombrefamiliar: 'Padre' },
            { nombrefamiliar: 'Madre' },
            { nombrefamiliar: 'Hermano' },
            { nombrefamiliar: 'Hermana' },
            { nombrefamiliar: 'Abuelo' },
            { nombrefamiliar: 'Otros' },
        ];
    }

    buildForm() {
        this.formDatos_Generales = this.form.group({
            //datos de la consulta
            nroAtencion: new FormControl(''),
            nroControl: new FormControl(''),
            nroHcl: new FormControl(''),

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
            nroFetos: new FormControl(''),

            //datos acompaniante
            nroDocAcompaniante: new FormControl(''),
            apellidosAcompaniante: new FormControl(''),
            nombresAcompaniante: new FormControl(''),
            edadAcompaniante: new FormControl(''),
            telefonoAcompaniante: new FormControl(''),
            direccionAcompaniante: new FormControl(''),
            lazoParentesco: new FormControl(''),

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
            influenza: new FormControl(''),

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

            /****ATENCION INTEGRAL******/
            OrientaciónConsejeríaSignosAlarma: new FormControl(''),
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


        });
        this.formAntecedentes = this.form.group({
            /**Nombre Antecedentes Familiares**/
            nombrefamiliar1: new FormControl(''),
            nombrefamiliar2: new FormControl(''),
            nombrefamiliar3: new FormControl(''),
            nombrefamiliar4: new FormControl(''),
            nombrefamiliar5: new FormControl(''),
            nombrefamiliar6: new FormControl(''),
            nombrefamiliar7: new FormControl(''),
            nombrefamiliar8: new FormControl(''),
            nombrefamiliar9: new FormControl(''),
            nombrefamiliar10: new FormControl(''),
            nombrefamiliar11: new FormControl(''),
            nombrefamiliar12: new FormControl(''),
        });
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

            if (this.dataConsultas !== null) {
                this.showSuccess();
                this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
                //this.formDatos_Generales.get('telefono').setValue(this.dataConsultas.datosPersonales.telefono);
                //this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataConsultas.datosPersonales.gradoInstitucional);
                this.formDatos_Generales.get('ocupacion').setValue(this.dataConsultas.ocupacion);
                this.formDatos_Generales.get('edad').setValue(this.dataConsultas.anioEdad);
                this.formDatos_Generales.get('direccion').setValue(this.dataConsultas.direccion);
                this.formDatos_Generales.get('fecha').setValue(this.dataConsultas.fecha);

                //recuperar datos del acompañante
                this.formDatos_Generales.get('nroDocAcompaniante').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.nroDoc:null);
                this.formDatos_Generales.get('apellidosAcompaniante').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.apellidos:null);
                this.formDatos_Generales.get('nombresAcompaniante').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.nombre:null);
                this.formDatos_Generales.get('edadAcompaniante').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.edad:null);
                this.formDatos_Generales.get('telefonoAcompaniante').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.telefono:null);
                this.formDatos_Generales.get('direccionAcompaniante').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.direccion:null);
                this.formDatos_Generales.get('lazoParentesco').setValue(this.dataConsultas.acompanante?this.dataConsultas.acompanante.lazoParentesco:null);

                //Recuperar Vacunas previas
                /*this.formDatos_Generales.get('vAntitetánica1Dosis').setValue(this.dataConsultas.vacunasPrevias[0].descripcion);
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
                */
                //recuperar Antecedentes Gineco Obstetrico
                /*this.formDatos_Generales.get('FUR').setValue(this.dataConsultas.antecedentesGinObs[0].fechaUltRegla);
                this.formDatos_Generales.get('FPP').setValue(this.dataConsultas.antecedentesGinObs[0].fechaPosiParto);
                this.formDatos_Generales.get('RCAT').setValue(this.dataConsultas.antecedentesGinObs[0].rcat);
                this.formDatos_Generales.get('G').setValue(this.dataConsultas.antecedentesGinObs[0].g);
                this.formDatos_Generales.get('P1').setValue(this.dataConsultas.antecedentesGinObs[0].p1);
                this.formDatos_Generales.get('P2').setValue(this.dataConsultas.antecedentesGinObs[0].p2);
                this.formDatos_Generales.get('P3').setValue(this.dataConsultas.antecedentesGinObs[0].p3);
                this.formDatos_Generales.get('P4').setValue(this.dataConsultas.antecedentesGinObs[0].p4);
                this.formDatos_Generales.get('gesAnterior').setValue(this.dataConsultas.antecedentesGinObs[0].gestAnterior);
                this.formDatos_Generales.get('RNpesoMayor').setValue(this.dataConsultas.antecedentesGinObs[0].rnMayorPeso);
                */
                //RECUPERA LOS ANTECEDENTES
                //this.formDatos_Generales.get('AntecedentesFamiliares').setValue(this.dataConsultas.antecedentesFamiliares[0]);
                //this.formDatos_Generales.get('AntecedentesPersonales').setValue(this.dataConsultas.antecedentesPersonales[0]);
                this.formDatos_Generales.get('FumaCigarros').setValue(this.dataConsultas.fumaCigarros);
                this.formDatos_Generales.get('Drogas').setValue(this.dataConsultas.drogas);
                this.formDatos_Generales.get('Psicoprofilaxis').setValue(this.dataConsultas.psicoprofilaxis.estado);

                //RECUPERA DESCARTE SIGNOS DE ALARMA
                this.formDatos_Generales.get('DificultadRespiratoria').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[0].valorSigno:null);
                this.formDatos_Generales.get('HipertenciónArterial').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[1].valorSigno:null);
                this.formDatos_Generales.get('SangradoNasal').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[2].valorSigno:null);
                this.formDatos_Generales.get('DeshidrataciónAguda').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[3].valorSigno:null);
                this.formDatos_Generales.get('CompromisoDelSensorio').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[4].valorSigno:null);
                this.formDatos_Generales.get('TraumatismoQuemadura').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[5].valorSigno:null);
                this.formDatos_Generales.get('AbdomenAgudo').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[6].valorSigno:null);
                this.formDatos_Generales.get('IntoxicaciónEnvenenamiento').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[7].valorSigno:null);
                this.formDatos_Generales.get('FiebreAlta').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[8].valorSigno:null);
                this.formDatos_Generales.get('Convulciones').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[9].valorSigno:null);
                this.formDatos_Generales.get('SangradoGenital').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[10].valorSigno:null);
                this.formDatos_Generales.get('DolorDeCabeza').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[11].valorSigno:null);
                this.formDatos_Generales.get('Edema').setValue(this.dataConsultas.listaSignosAlarma?this.dataConsultas.listaSignosAlarma[12].valorSigno:null);

                //RECUPERA DESCARTE ATENSION INTEGRAL
                this.formDatos_Generales.get('OrientaciónConsejeríaSignosAlarma').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[0].valor:null);
                this.formDatos_Generales.get('ConsejeríaEnfermedadesComunes').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[1].valor:null);
                this.formDatos_Generales.get('SospechasTuberculosis').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[2].valor:null);
                this.formDatos_Generales.get('InfeccionesTransmisiónSexual').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[3].valor:null);
                this.formDatos_Generales.get('OrientaciónNutricional').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[4].valor:null);
                this.formDatos_Generales.get('OrientaciónPlanificaiónFamiliar').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[5].valor:null);
                this.formDatos_Generales.get('OrientaciónPrevenciónDeCancerGinecológico').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[6].valor:null);
                this.formDatos_Generales.get('OrientaciónConsejeriaPretestVIH').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[7].valor:null);
                this.formDatos_Generales.get('OrientaciónEnEstilosDeVidaSaludable').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[8].valor:null);
                this.formDatos_Generales.get('OrientaciónAcompañante').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[9].valor:null);
                this.formDatos_Generales.get('ViolenciaFamiliar').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[10].valor:null);
                this.formDatos_Generales.get('PlanDeParto').setValue(this.dataConsultas.orientaciones?this.dataConsultas.orientaciones[11].valor:null);
            } else {
                this.showInfo();
            }

        });
    }

    inicializarAregloAntfamiliares(): void {
        if (this.antecedentes1[0] == null) {
            this.antecedentes1 = [];
        }
        if (this.antecedentes2[0] == null) {
            this.antecedentes2 = [];
        }
        if (this.antecedentes3[0] == null) {
            this.antecedentes3 = [];
        }
        if (this.antecedentes4[0] == null) {
            this.antecedentes4 = [];
        }
        if (this.antecedentes5[0] == null) {
            this.antecedentes5 = [];
        }
        if (this.antecedentes6[0] == null) {
            this.antecedentes6 = [];
        }
        if (this.antecedentes7[0] == null) {
            this.antecedentes7 = [];
        }
        if (this.antecedentes8[0] == null) {
            this.antecedentes8 = [];
        }
        if (this.antecedentes9[0] == null) {
            this.antecedentes9 = [];
        }
        if (this.antecedentes10[0] == null) {
            this.antecedentes10 = [];
        }
        if (this.antecedentes11[0] == null) {
            this.antecedentes11 = [];
        }
        if (this.antecedentes12[0] == null) {
            this.antecedentes12 = [];
        }

        // if (this.otrosAntecedentesFamiliares == null) {
        //     this.otrosAntecedentesFamiliares = null;
        // }
    }

    /**Inicializa datos del antecedentes personales en vacio**/
    /**Si alguno de los datos tenga null**/
    inicializarArregloAntecedentes(): void {
        if (this.Ninguno[0] == null) {
            this.Ninguno = [];
        }
        if (this.Abortohabitualrecurrente[0] == null) {
            this.Abortohabitualrecurrente = [];
        }
        if (this.Violencia[0] == null) {
            this.Violencia = [];
        }
        if (this.Cardiopatia[0] == null) {
            this.Cardiopatia = [];
        }
        if (this.cirugiaPelvicaUterina[0] == null) {
            this.cirugiaPelvicaUterina = [];
        }
        if (this.Eclampsia[0] == null) {
            this.Eclampsia = [];
        }
        if (this.preEclampsia[0] == null) {
            this.preEclampsia = [];
        }
        if (this.hemorraPostparto[0] == null) {
            this.hemorraPostparto = [];
        }
        if (this.TBCPulmonar2[0] == null) {
            this.TBCPulmonar2 = [];
        }
        if (this.VIHSIDA[0] == null) {
            this.VIHSIDA = [];
        }

        if (this.Alcoholismo[0] == null) {
            this.Alcoholismo = [];
        }
        if (this.alergiaAmedicamentos[0] == null) {
            this.alergiaAmedicamentos = [];
        }
        if (this.asmaBronquial[0] == null) {
            this.asmaBronquial = [];
        }
        if (this.diabetes2[0] == null) {
            this.diabetes2 = [];
        }
        if (this.enfermCongenitas[0] == null) {
            this.enfermCongenitas = [];
        }
        if (this.enfermInfecciosas[0] == null) {
            this.enfermInfecciosas = [];
        }
        if (this.epilepsia[0] == null) {
            this.epilepsia = [];
        }
        if (this.hipArterial[0] == null) {
            this.hipArterial = [];
        }
        if (this.consumoHojaDeCoca[0] == null) {
            this.consumoHojaDeCoca = [];
        }
        if (this.infertilidad[0] == null) {
            this.infertilidad = [];
        }
        if (this.neoplasias[0] == null) {
            this.neoplasias = [];
        }
        if (this.otrasDrogas[0] == null) {
            this.otrasDrogas = [];
        }
        if (this.partoProlong[0] == null) {
            this.partoProlong = [];
        }
        if (this.preeclampsia[0] == null) {
            this.preeclampsia = [];
        }
        if (this.prematuridad[0] == null) {
            this.prematuridad = [];
        }
        if (this.retenPlacenta[0] == null) {
            this.retenPlacenta = [];
        }
        if (this.tabaco[0] == null) {
            this.tabaco = [];
        }
        if (this.transtornMentales[0] == null) {
            this.transtornMentales = [];
        }
        // if (this.otros2 == null) {
        //     this.otros2 = null;
        // }
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

    /***Calcular el año desde la fecha de nacimiento**/
    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            console.log("edad", this.edad);
        }
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
            this.formDatos_Generales.get('fecha').setValue(new Date());
            this.getConsultas();//Recupera la cunsulta por HCL y Numero de embarazo
            let data = {
                nroHcl: this.dataPacientes.nroHcl
            }
            this.consultasService.getUltimaConsultaControl(data).subscribe((res: any) => {
                console.log("datos ultima consulta", res.object)
                let informacion = res.object;
                this.formDatos_Generales.get('ocupacion').setValue(informacion.ocupacion);
                this.formDatos_Generales.get('nroAtencion').setValue(informacion.nroUltimaAtencion + 1);
                this.formDatos_Generales.get('nroControl').setValue(informacion.nroUltimaAtencion + 1);
                this.formDatos_Generales.get('nroHcl').setValue(informacion.nroHcl);
                this.formDatos_Generales.get('FUR').setValue(informacion.fum);
                this.formDatos_Generales.get('FPP').setValue(informacion.fechaProbableParto);
                this.formDatos_Generales.get('FumaCigarros').setValue(informacion.nroCigarrosAlDia > 0 ? true : false);
                this.formDatos_Generales.get('Drogas').setValue(informacion.drogas !== true ? false : true);
                this.formDatos_Generales.get('RNpesoMayor').setValue(informacion.rnMayorPeso);

                //vacunas previas
                this.formDatos_Generales.get('rubeola').setValue(informacion.vacunasPrevias.find(item => item == "rubeola") ? true : false );
                this.formDatos_Generales.get('HepatitesB').setValue( informacion.vacunasPrevias.find(item => item == "hepatitis B") ? true : false );
                this.formDatos_Generales.get('PapilomaV').setValue(informacion.vacunasPrevias.find(item => item == "papiloma") ? true : false );
                this.formDatos_Generales.get('influenza').setValue(informacion.vacunasPrevias.find(item => item == "influenza") ? true : false );
                this.formDatos_Generales.get('Covid19').setValue(informacion.vacunasPrevias.find(item => item == "covid") ? true : false );

                //antecedentes familiares
                this.antecedentes1 = [informacion.antecedentesFamiliares[0].nombre];

                this.antecedentes2 = [informacion.antecedentesFamiliares[1].nombre];
                this.formAntecedentes.get('nombrefamiliar1').setValue(informacion.antecedentesFamiliares[1].valor);

                this.antecedentes3 = [informacion.antecedentesFamiliares[2].nombre];
                this.formAntecedentes.get('nombrefamiliar2').setValue(informacion.antecedentesFamiliares[2].valor);

                this.antecedentes4 = [informacion.antecedentesFamiliares[3].nombre];
                this.formAntecedentes.get('nombrefamiliar3').setValue(informacion.antecedentesFamiliares[3].valor);

                this.antecedentes5 = [informacion.antecedentesFamiliares[4].nombre];
                this.formAntecedentes.get('nombrefamiliar4').setValue(informacion.antecedentesFamiliares[4].valor);

                this.antecedentes6 = [informacion.antecedentesFamiliares[5].nombre];
                this.formAntecedentes.get('nombrefamiliar5').setValue(informacion.antecedentesFamiliares[5].valor);

                this.antecedentes7 = [informacion.antecedentesFamiliares[6].nombre];
                this.formAntecedentes.get('nombrefamiliar6').setValue(informacion.antecedentesFamiliares[6].valor);

                this.antecedentes8 = [informacion.antecedentesFamiliares[7].nombre];
                this.formAntecedentes.get('nombrefamiliar7').setValue(informacion.antecedentesFamiliares[7].valor);

                this.antecedentes9 = [informacion.antecedentesFamiliares[8].nombre];
                this.formAntecedentes.get('nombrefamiliar8').setValue(informacion.antecedentesFamiliares[8].valor);

                this.antecedentes10 = [informacion.antecedentesFamiliares[9].nombre];
                this.formAntecedentes.get('nombrefamiliar9').setValue(informacion.antecedentesFamiliares[9].valor);

                this.antecedentes11 = [informacion.antecedentesFamiliares[10].nombre];
                this.formAntecedentes.get('nombrefamiliar10').setValue(informacion.antecedentesFamiliares[10].valor);

                this.antecedentes12 = [informacion.antecedentesFamiliares[11].nombre];
                this.formAntecedentes.get('nombrefamiliar11').setValue(informacion.antecedentesFamiliares[11].valor);
                this.transtornMentales = [informacion.antecedentesPersonales[27].nombre];
                this.otrosAntecedentesFamiliares = informacion.otroAntecendeteFamiliar;
                if (this.otrosAntecedentesFamiliares !== '') {
                    this.otrosAntecedentesFamiliares2 = ["otros"]
                } else this.otrosAntecedentesFamiliares2 = null

                this.inicializarAregloAntfamiliares();

                //antecedentes personales
                this.Ninguno = [informacion.antecedentesPersonales[0].nombre];
                console.log("ERRRR", this.Ninguno);
                this.Abortohabitualrecurrente = [informacion.antecedentesPersonales[1].nombre];
                this.Violencia = [informacion.antecedentesPersonales[2].nombre];
                this.Cardiopatia = [informacion.antecedentesPersonales[3].nombre];
                this.cirugiaPelvicaUterina = [informacion.antecedentesPersonales[4].nombre];
                this.Eclampsia = [informacion.antecedentesPersonales[5].nombre];
                this.preEclampsia = [informacion.antecedentesPersonales[6].nombre];
                this.hemorraPostparto = [informacion.antecedentesPersonales[7].nombre];
                this.TBCPulmonar2 = [informacion.antecedentesPersonales[8].nombre];
                this.VIHSIDA = [informacion.antecedentesPersonales[9].nombre];
                this.Alcoholismo = [informacion.antecedentesPersonales[10].nombre];
                this.alergiaAmedicamentos = [informacion.antecedentesPersonales[11].nombre];
                this.asmaBronquial = [informacion.antecedentesPersonales[12].nombre];
                this.diabetes2 = [informacion.antecedentesPersonales[13].nombre];
                this.enfermCongenitas = [informacion.antecedentesPersonales[14].nombre];
                this.enfermInfecciosas = [informacion.antecedentesPersonales[15].nombre];
                this.epilepsia = [informacion.antecedentesPersonales[16].nombre];
                this.hipArterial = [informacion.antecedentesPersonales[17].nombre];
                this.consumoHojaDeCoca = [informacion.antecedentesPersonales[18].nombre];
                this.infertilidad = [informacion.antecedentesPersonales[19].nombre];
                this.neoplasias = [informacion.antecedentesPersonales[20].nombre];
                this.otrasDrogas = [informacion.antecedentesPersonales[21].nombre];
                this.partoProlong = [informacion.antecedentesPersonales[22].nombre];
                this.preeclampsia = [informacion.antecedentesPersonales[23].nombre];
                this.prematuridad = [informacion.antecedentesPersonales[24].nombre];
                this.retenPlacenta = [informacion.antecedentesPersonales[25].nombre];
                this.tabaco = [informacion.antecedentesPersonales[26].nombre];
                this.transtornMentales = [informacion.antecedentesPersonales[27].nombre];
                this.otros2 = informacion.otroAncedentePersonal;
                if (this.otros2 !== '') {
                    this.otros23 = ["otros"]
                } else this.otros23 = null
            });
            this.inicializarArregloAntecedentes();
        });


    }

    

    eventoKeyupAntecedentesPersonales() {
        if (this.otros2.length > 0) {
            this.otros23 = ["otros"]
        } else
            this.otros23 = null
    }

    eventoKeyupAntecedentesFamiliares() {
        if (this.otrosAntecedentesFamiliares.length > 0) {
            this.otrosAntecedentesFamiliares2 = ["otros"]
        } else
            this.otrosAntecedentesFamiliares2 = null
    }

    //Agregar, actualizar datos de consultorio obstetrico
    Add_updateConsultas() {
        this.data = {
            fecha: this.datePipe.transform(this.formDatos_Generales.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
            anioEdad: this.formDatos_Generales.value.edad,
            nroHcl: this.dataPacientes.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            direccion: this.formDatos_Generales.value.direccion,
            ocupacion: this.formDatos_Generales.value.ocupacion,

            acompanante: {
                tipoDoc: "DNI",
                nroDoc: this.formDatos_Generales.value.nroDocAcompaniante,
                nombre: this.formDatos_Generales.value.nombresAcompaniante,
                apellidos: this.formDatos_Generales.value.apellidosAcompaniante,
                lazoParentesco: this.formDatos_Generales.value.lazoParentesco,
                edad: this.formDatos_Generales.value.edadAcompaniante,
                direccion: this.formDatos_Generales.value.direccionAcompaniante,
                telefono: this.formDatos_Generales.value.telefonoAcompaniante
            },

            nroAtencion: parseInt(this.formDatos_Generales.value.nroAtencion),
            nroControlSis: this.formDatos_Generales.value.nroControlSis,

            /////----------------------------
            /*vacunasPrevias: [
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
            ],*/

            /*antecedentesGinObs: [{
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
            ],*/
            //fumaCigarros: this.formDatos_Generales.value.FumaCigarros,
            //drogas: this.formDatos_Generales.value.Drogas,

            psicoprofilaxis: {
                estado: this.formDatos_Generales.value.Psicoprofilaxis,
                fecha: "",
            },

            listaSignosAlarma: [
                {
                    tipoEdad: null,
                    nombreSigno: "Dificultad respiratoria",
                    valorSigno: this.formDatos_Generales.value.DificultadRespiratoria,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Hipertención Arterial",
                    valorSigno: this.formDatos_Generales.value.HipertenciónArterial,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Sangrado nasal",
                    valorSigno: this.formDatos_Generales.value.SangradoNasal,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Deshidratación aguda",
                    valorSigno: this.formDatos_Generales.value.DeshidrataciónAguda,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Compromiso del sensorio",
                    valorSigno: this.formDatos_Generales.value.CompromisoDelSensorio,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Traumatismo Quemadura",
                    valorSigno: this.formDatos_Generales.value.TraumatismoQuemadura,
                },

                {
                    tipoEdad: null,
                    nombreSigno: "Abdomen agudo",
                    valorSigno: this.formDatos_Generales.value.AbdomenAgudo,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Intoxicación Envenenamiento",
                    valorSigno: this.formDatos_Generales.value.IntoxicaciónEnvenenamiento,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Fiebre alta",
                    valorSigno: this.formDatos_Generales.value.FiebreAlta,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Convulciones",
                    valorSigno: this.formDatos_Generales.value.Convulciones,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Sangrado genital",
                    valorSigno: this.formDatos_Generales.value.SangradoGenital,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Dolor de cabeza",
                    valorSigno: this.formDatos_Generales.value.DolorDeCabeza,
                },
                {
                    tipoEdad: null,
                    nombreSigno: "Edema",
                    valorSigno: this.formDatos_Generales.value.Edema,
                },

            ],
            orientaciones: [
                {
                    consejeria: "Orientación y Consejería Signos de alarma",
                    valor: this.formDatos_Generales.value.OrientaciónConsejeríaSignosAlarma,
                    cie10: "3232"
                },
                {
                    consejeria: "Consejería en enfermedades comunes",
                    valor: this.formDatos_Generales.value.ConsejeríaEnfermedadesComunes,
                    cie10: "1212"
                },
                {
                    consejeria: "Sospechas de Tuberculosis",
                    valor: this.formDatos_Generales.value.SospechasTuberculosis,
                    cie10: "2232"
                },
                {
                    consejeria: "Infecciones de transmisión sexual",
                    valor: this.formDatos_Generales.value.InfeccionesTransmisiónSexual,
                    cie10: "4866"
                },
                {
                    consejeria: "Orientación Nutricional",
                    valor: this.formDatos_Generales.value.OrientaciónNutricional,
                    cie10: "3233"
                },
                {
                    consejeria: "Orientación en planificaión familiar",
                    valor: this.formDatos_Generales.value.OrientaciónPlanificaiónFamiliar,
                    cie10: "7779"
                },
                {
                    consejeria: "Orientación en prevención de Cancer ginecológico",
                    valor: this.formDatos_Generales.value.OrientaciónPrevenciónDeCancerGinecológico,
                    cie10: "8889"
                },
                {
                    consejeria: "Orientación y consej. Pretest. VIH",
                    valor: this.formDatos_Generales.value.OrientaciónConsejeriaPretestVIH,
                    cie10: "7777"
                },
                {
                    consejeria: "Orientación en estilos de vida saludable",
                    valor: this.formDatos_Generales.value.OrientaciónEnEstilosDeVidaSaludable,
                    cie10: "44545"
                },
                {
                    consejeria: "Orientación al acompañante",
                    valor: this.formDatos_Generales.value.OrientaciónAcompañante,
                    cie10: "21212"
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
            // profesionalACargo:{
            //     tipoDoc:"DNI",
            //     nroDoc:"73145986",
            //     profesion:"ENFERMERA",
            //     colegiatura:"456789"
            // },
        }
        console.log("DATA UPDATE Y ADD CONSULTAS", this.data);
        if (this.dataConsultas == null) {
            this.consultasService.addConsultas(this.nroFetos, this.data).subscribe(result => {
                console.log(result);
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
            this.consultasService.updateConsultas(this.nroFetos, this.data).subscribe((result: any) => {
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

    showInfo() {
        this.messageService.add({
            severity: 'info',
            summary: 'Consulta Vacia',
            detail: 'Ingrese nueva consulta'
        });
    }

    showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Consulta',
            detail: 'Recupero con exito'
        });
    }
}
