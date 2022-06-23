import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ConsultasService } from "../../services/consultas.service";
import Swal from "sweetalert2";
import {
    FiliancionService
} from "../../../h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { image } from "../../../../../../../assets/images/image.const";

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
    dataPacientesReniec: any;
    imagePath: string = image;

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
    nroHcl: string;

    Gestacion: any;
    dataPaciente2: any;
    estadoEdicion: Boolean;

    nroAtencion: any;
    antecedentesDialog: boolean;

    familiares2: any;

    constructor(private form: FormBuilder,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private consultasService: ConsultasService,
        private filiancionService: FiliancionService,
        private messageService: MessageService,) {

        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));

        //estado para saber que estado usar en consultas
        this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

        console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
        console.log("gestacion desde datos generales", this.Gestacion);

        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
            this.nroDocRecuperado = this.dataPaciente2.nroDoc;
            this.idConsultoriObstetrico = JSON.parse(localStorage.getItem('idGestacionRegistro'));
            this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
            this.nroHcl = this.dataPaciente2.nroHcl;

        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idConsultoriObstetrico = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }

        /** OTRAS OPCIONES**/
        this.opciones = [
            { name: 'SI', boleano: true },
            { name: 'NO', boleano: false }
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

        this.familiares2 = [
            { nombrefamiliar: 'PADRE' },
            { nombrefamiliar: 'MADRE' },
            { nombrefamiliar: 'HERMANO' },
            { nombrefamiliar: 'HERMANA' },
            { nombrefamiliar: 'ABUELO' },
            { nombrefamiliar: 'OTROS' },
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

        console.log("TipoDocRecuperado desde datos generales", this.tipoDocRecuperado);
        console.log("NroDocRecuparado desde datos generales", this.nroDocRecuperado);
        console.log("Nro de embarazo desde datos generales", this.nroEmbarazo);
        console.log("Id Consultorio Obstetrico desde datos generales", this.idConsultoriObstetrico);

        /**Si la datos de consultorio esta en vacio recupera los datos del paciente***/
        /**Caso contrario recupera los datos de Consultorio***/
        if (this.dataConsultas == null) {
            this.getpacienteByNroDoc();

        }
    }

    getConsultasID() {
        let data = {
            nroHcl: this.dataPacientes.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion
        }
        console.log(data)
        this.consultasService.getConsultas(data).subscribe((res: any) => {
            this.dataConsultas = res.object
            localStorage.removeItem('IDConsulta');
            // localStorage.setItem('IDConsulta', JSON.stringify(this.dataConsultas.id));
        })
    }

    /***Recupera la consulta por HCL y Numero de embarazo***/
    getConsultas() {
        let data = {
            nroHcl: this.dataPacientes.nroHcl,
            nroEmbarazo: this.nroEmbarazo,
            nroAtencion: this.nroAtencion
        }
        this.consultasService.getConsultas(data).subscribe((res: any) => {
            this.dataConsultas = res.object
            if (this.dataConsultas !== null) {
                localStorage.removeItem('dataConsultasID');
                localStorage.setItem('dataConsultasID', JSON.stringify(this.dataConsultas.id));
                this.showSuccess();
                this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
                this.formDatos_Generales.get('ocupacion').setValue(this.dataConsultas.ocupacion);
                this.formDatos_Generales.get('edad').setValue(this.dataConsultas.anioEdad);
                this.formDatos_Generales.get('direccion').setValue(this.dataConsultas.direccion);
                this.formDatos_Generales.get('fecha').setValue(this.dataConsultas.fecha);

                //recuperar datos del acompañante
                this.formDatos_Generales.get('nroDocAcompaniante').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.nroDoc : null);
                this.formDatos_Generales.get('apellidosAcompaniante').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.apellidos : null);
                this.formDatos_Generales.get('nombresAcompaniante').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.nombre : null);
                this.formDatos_Generales.get('edadAcompaniante').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.edad : null);
                this.formDatos_Generales.get('telefonoAcompaniante').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.telefono : null);
                this.formDatos_Generales.get('direccionAcompaniante').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.direccion : null);
                this.formDatos_Generales.get('lazoParentesco').setValue(this.dataConsultas.acompanante ? this.dataConsultas.acompanante.lazoParentesco : null);

                this.formDatos_Generales.get('RCAT').setValue(this.dataConsultas.rcat);

                //RECUPERA LOS ANTECEDENTES
                this.formDatos_Generales.get('Psicoprofilaxis').setValue(this.dataConsultas.psicoprofilaxis.estado);

                //RECUPERA DESCARTE SIGNOS DE ALARMA
                this.formDatos_Generales.get('DificultadRespiratoria').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[0].valorSigno : null);
                this.formDatos_Generales.get('HipertenciónArterial').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[1].valorSigno : null);
                this.formDatos_Generales.get('SangradoNasal').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[2].valorSigno : null);
                this.formDatos_Generales.get('DeshidrataciónAguda').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[3].valorSigno : null);
                this.formDatos_Generales.get('CompromisoDelSensorio').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[4].valorSigno : null);
                this.formDatos_Generales.get('TraumatismoQuemadura').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[5].valorSigno : null);
                this.formDatos_Generales.get('AbdomenAgudo').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[6].valorSigno : null);
                this.formDatos_Generales.get('IntoxicaciónEnvenenamiento').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[7].valorSigno : null);
                this.formDatos_Generales.get('FiebreAlta').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[8].valorSigno : null);
                this.formDatos_Generales.get('Convulciones').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[9].valorSigno : null);
                this.formDatos_Generales.get('SangradoGenital').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[10].valorSigno : null);
                this.formDatos_Generales.get('DolorDeCabeza').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[11].valorSigno : null);
                this.formDatos_Generales.get('Edema').setValue(this.dataConsultas.listaSignosAlarma ? this.dataConsultas.listaSignosAlarma[12].valorSigno : null);

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
    }

    /***Calcular el año desde la fecha de nacimiento**/
    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
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
    }

    determinarUltimaGesta(cadena) {
        if (cadena == "aborto" || cadena == "abortoMolar" || cadena == "ectopico") {
            return "aborto";
        }
        if (cadena == "cesaria" || cadena == "partoVaginal") {
            return "parto";
        } else return "";
    }

    //Recuperar datos de un paciendo por su documento de identidad
    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object;
            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('nombres').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Generales.get('nroDoc').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('telefono').setValue(this.dataPacientes.celular);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataPacientes.gradoInstruccion);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion + "," + this.dataPacientes.domicilio.departamento);
            this.fechaConvertido = this.dataPacientes.nacimiento.fechaNacimiento;
            this.ageCalculator();//calcula la edad desde la fecha de nacimiento
            this.formDatos_Generales.get('edad').setValue(this.edad);
            this.formDatos_Generales.get('fecha').setValue(new Date());
            this.getConsultas();//Recupera la consulta por HCL y Numero de embarazo
            let data = {
                nroHcl: this.dataPacientes.nroHcl
            }
            this.consultasService.getUltimaConsultaControl(data).subscribe((res: any) => {
                let informacion = res.object;

                if (!this.estadoEdicion) {
                    //guardar en el ls el nroAtencion
                    let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
                    this.formDatos_Generales.get('nroAtencion').setValue(nroAtencion);
                    this.formDatos_Generales.get('nroControl').setValue(nroAtencion);
                    this.nroAtencion = nroAtencion;
                } else {
                    let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
                    this.formDatos_Generales.get('nroAtencion').setValue(nroAtencion);
                    this.formDatos_Generales.get('nroControl').setValue(nroAtencion);
                    this.nroAtencion = nroAtencion;
                }
                this.getConsultas();

                this.formDatos_Generales.get('ocupacion').setValue(informacion.ocupacion);

                this.formDatos_Generales.get('nroHcl').setValue(informacion.nroHcl);
                this.formDatos_Generales.get('FUR').setValue(informacion.fum);
                this.formDatos_Generales.get('FPP').setValue(informacion.fechaProbableParto);
                this.formDatos_Generales.get('P1').setValue(informacion.antecedentesObstetricos ? informacion.antecedentesObstetricos[8].valor : null);
                this.formDatos_Generales.get('P2').setValue(informacion.nroPartosPrematuros);
                this.formDatos_Generales.get('P3').setValue(informacion.antecedentesObstetricos ? informacion.antecedentesObstetricos[7].valor : null);
                this.formDatos_Generales.get('P4').setValue(informacion.antecedentesObstetricos ? informacion.antecedentesObstetricos[3].valor : null);
                this.formDatos_Generales.get('G').setValue(informacion.antecedentesObstetricos ? informacion.antecedentesObstetricos[9].valor : null);
                this.formDatos_Generales.get('RNpesoMayor').setValue(informacion.rnMayorPeso);
                this.formDatos_Generales.get('gesAnterior').setValue(this.determinarUltimaGesta(informacion.terminacion));
                this.formDatos_Generales.get('RCAT').setValue(informacion.rcat);
                this.formDatos_Generales.get('FumaCigarros').setValue(informacion.nroCigarrosAlDia > 0 ? true : false);
                this.formDatos_Generales.get('Drogas').setValue(informacion.drogas !== true ? false : true);

                //vacunas previas
                this.formDatos_Generales.get('vAntitetánica1Dosis').setValue(informacion.antitetanica.nroDosisPrevia > 0 || informacion.antitetanica.dosis[0].dosis !== null ? true : false);
                this.formDatos_Generales.get('vAntitetánica2Dosis').setValue(informacion.antitetanica.nroDosisPrevia > 1 || informacion.antitetanica.dosis[1].dosis !== null ? true : false);
                this.formDatos_Generales.get('rubeola').setValue(informacion.vacunasPrevias.find(item => item == "rubeola") ? true : false);
                this.formDatos_Generales.get('HepatitesB').setValue(informacion.vacunasPrevias.find(item => item == "hepatitis B") ? true : false);
                this.formDatos_Generales.get('PapilomaV').setValue(informacion.vacunasPrevias.find(item => item == "papiloma") ? true : false);
                this.formDatos_Generales.get('influenza').setValue(informacion.vacunasPrevias.find(item => item == "influenza") ? true : false);
                this.formDatos_Generales.get('Covid19').setValue(informacion.vacunasPrevias.find(item => item == "covid") ? true : false);

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

            fum: this.datePipe.transform(this.formDatos_Generales.value.FUR, 'yyyy-MM-dd'),
            rcat: this.formDatos_Generales.value.RCAT,

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
                    nombreSigno: "Convulsiones",
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
        }

        if (this.dataConsultas == null) {
            this.consultasService.addConsultas(this.nroFetos, this.data).subscribe((result: any) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Se guardo con exito',
                    showConfirmButton: false,
                    timer: 1500,
                })
                // this.getConsultasID();
                localStorage.setItem('IDConsulta', JSON.stringify(result.object.id));
                // console.log('data de creacion ', result);
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

    openAntecedentes() {
        //this.isUpdate = false;
        /*this.formAntecedentes.reset();
        this.formAntecedentes.get('diagnosticoSIS').setValue("");
        this.formAntecedentes.get('diagnosticoHIS').setValue("");
        this.formAntecedentes.get('subtitulo').setValue("MATERNO");*/
        this.antecedentesDialog = true;
    }

    canceled1() {
        this.antecedentesDialog = false;
    }

    traerDataReniec() {
        this.filiancionService.getDatosReniec(this.formDatos_Generales.value.nroDocAcompaniante).subscribe((res: any) => {
            this.dataPacientesReniec = res;
            console.log(res);
            // this.imagePath = res.foto;
            this.formDatos_Generales.get('nroDocAcompaniante').setValue(this.dataPacientesReniec.nroDocumento);
            this.formDatos_Generales.get('apellidosAcompaniante').setValue(this.dataPacientesReniec.apePaterno + '' + this.dataPacientesReniec.apeMaterno);
            this.formDatos_Generales.get('nombresAcompaniante').setValue(this.dataPacientesReniec.nombres);
        });
    }
}
