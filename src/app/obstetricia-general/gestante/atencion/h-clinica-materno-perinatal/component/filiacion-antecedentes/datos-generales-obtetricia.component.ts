import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";
import {DatosBasalesService} from "../../services/datos-basales/datos-basales.service";

@Component({
    selector: "app-datos-generales-obtetricia",
    templateUrl: "./datos-generales-obtetricia.component.html",
    styleUrls: ["./datos-generales-obtetricia.component.css"],
})
export class DatosGeneralesObtetriciaComponent implements OnInit {

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

    date: Date
    departamentos: any;
    opciones: any;
    estadoCivil: any;
    familiares: any
    studies: any;

    selected1: any;
    selected2: any;

    idRecuperado: string = "";
    tipoDocRecuperado: string;
    nroDocRecuperado: string;


    dataAntecedentes: any;
    formAntecedentes: FormGroup;
    formAntecedentesObstetricos: FormGroup;
    formVacunasPrevias: FormGroup;

    gestas = 0;
    abortos: number = 0;
    partos = 0;
    vaginales: number = 0;
    cesarias: number = 0;
    nacidosMuertos: number = 0;
    viven: number = 0;
    muertoPrimeraSemana: number = 0;
    despuesPrimeraSemana: number = 0;
    nacidosVivos = 0;
    RNmayorPeso = 0;

    CeroOTres: any;
    MayorDosMilQuinientos: any;
    Multiple: any;
    MayorTrentaSemanas: any;
    dataPaciente2: any;
    Gestacion: any;
    idGestacion: string;
    DetalleParto: string;
    DetalleParto2: string;
    DetalleParto3: string;
    DetalleParto4: string;

    constructor(private form: FormBuilder,
                private filiancionService: FiliancionService,
                private datosBasalesService: DatosBasalesService,
                private obstetriciaGeneralService: ObstetriciaGeneralService) {
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));


        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
            this.nroDocRecuperado = this.dataPaciente2.nroDoc;
            this.idRecuperado = JSON.parse(localStorage.getItem('idGestacionRegistro'));
            console.log("ID RESIEN", this.idRecuperado)

        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idRecuperado = this.Gestacion.id;
        }


        this.opciones = [
            {booleano: true, name: "SI"},
            {booleano: false, name: "NO"}
        ];


        this.studies = [
            {name: 'Analfabeta'},
            {name: 'Primaria'},
            {name: 'Secundaria'},
            {name: 'Superior'},
            {name: 'Superior No Univ.'},
        ];

        this.estadoCivil = [
            {name: 'Soltero', code: 'S'},
            {name: 'Casado', code: 'N'},
            {name: 'Combiviente', code: 'N'},
        ];


        this.familiares = [
            {nombrefamiliar: 'Padre'},
            {nombrefamiliar: 'Madre'},
            {nombrefamiliar: 'Hermano'},
            {nombrefamiliar: 'Hermana'},
            {nombrefamiliar: 'Abuelo'},
            {nombrefamiliar: 'Otros'},
        ];
    }

    ngOnInit(): void {
        console.log("ID RECUPERADo", this.idRecuperado);
        // })
        this.buildForm2();
        this.getpacienteFiiacionByID();
        this.getDatosBasalesVacunasPrevias();
    }


    SumaNacidosVivos() {
        this.nacidosVivos = ((this.viven * 1) + (this.muertoPrimeraSemana * 1) + (this.despuesPrimeraSemana * 1));
    }

    SumaPatos() {
        this.partos = ((this.vaginales * 1) + (this.cesarias * 1));
    }

    SumaGetas() {
        this.gestas = ((this.abortos * 1) + (this.partos * 1))
    }

    async inputViven() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Viven',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.viven = text
            this.SumaNacidosVivos()
            console.log(this.SumaNacidosVivos())

        }

    }

    async inputMueroPrimeraSemana() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Muerto 1ra semana',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.muertoPrimeraSemana = text
            this.SumaNacidosVivos()

        }
    }

    async inputDespuesPrimeraSemana() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Después 1ra semana',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.despuesPrimeraSemana = text
            this.SumaNacidosVivos()

        }
    }

    async inputNacidosMuertos() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Nacidos Muertos',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.nacidosMuertos = text
        }
    }

    async inputVaginales() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Vaginales',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.vaginales = text
            this.SumaPatos()
            this.SumaGetas()
        }
    }

    async inputCesarias() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Cesarias',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.cesarias = text
            this.SumaPatos()
            this.SumaGetas()
        }
    }

    async inputAborto() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese un numero',
            width: '300px',

            inputPlaceholder: 'Abortos',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.abortos = text
            this.SumaGetas()
        }
    }

    async inputRNmayorPeso() {
        const {value: text} = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese RN Mayor Peso',
            width: '300px',

            inputPlaceholder: 'RN Mayor Peso',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            // await Swal.fire(text)
            this.RNmayorPeso = text
            this.SumaGetas()
        }
    }

    limpiarDetalleParto() {
        this.CeroOTres = '';
        this.MayorDosMilQuinientos = '';
        this.Multiple = '';
        this.MayorTrentaSemanas = '';
    }

    ceroOmmas() {
        this.CeroOTres = '✓';
    }

    ceroMayorDosMil() {
        this.MayorDosMilQuinientos = '✓';
    }

    Multiple1() {
        this.Multiple = '✓';
    }

    TrentaSiete() {
        this.MayorTrentaSemanas = '✓';
    }

    detalleParto() {
        if (this.CeroOTres == '✓') {
            this.DetalleParto = '0 ó + 3';
        } else {
            this.DetalleParto = '';
        }

        if (this.MayorDosMilQuinientos == '✓') {
            this.DetalleParto2 = '< 2500g';
        } else {
            this.DetalleParto2 = '';
        }
        if (this.Multiple == '✓') {
            this.DetalleParto3 = 'Múltiple';
        } else {
            this.DetalleParto3 = '';
        }
        if (this.MayorTrentaSemanas == '✓') {
            this.DetalleParto4 = '< 37 sem';
        } else {
            this.DetalleParto4 = '';

        }

        console.log("DETALLE PARTO", this.DetalleParto)
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

    buildForm2() {
        this.formAntecedentesObstetricos = this.form.group({
            viven: new FormControl(''),
            muertoPrimeraSemana: new FormControl(''),
            despuesPrimeraSemana: new FormControl(''),
            NacidosVivos: new FormControl(''),
            NacidosMuertos: new FormControl(''),
            vaginales: new FormControl(''),
            cesarias: new FormControl(''),
            abortos: new FormControl(''),
            partos: new FormControl(''),
        })

        this.formVacunasPrevias = this.form.group({
            rubeola: new FormControl(''),
            hepatitisB: new FormControl(''),
            papiloma: new FormControl(''),
            influenza: new FormControl(''),
            covid: new FormControl(''),
        })

        this.formAntecedentes = this.form.group({
            antecendentesObstetricos: new FormControl(''),

            /**Gestacion anterior**/
            fecha: new FormControl(''),
            terminacion: new FormControl(''),
            intergenesico: new FormControl(''),
            tipoAborto: new FormControl(''),
            lactaciaMaterna: new FormControl(''),
            lugarParto: new FormControl(''),

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


            //********************************
            captada: new FormControl(''),
            referidaporAgComuni: new FormControl(''),


            /**Antecedentes Personales**/
            otros22: new FormControl(''),


            sesiones: new FormControl(''),
            PartosDomiciliarios: new FormControl(''),
        })
    }

    addData() {
        console.log("ZZZZZZZz", this.Ninguno);
        console.log("ZZZZZZZz", this.Abortohabitualrecurrente);
        console.log("annnn", this.antecedentes1);
        this.detalleParto();
        const req = {
            gestacionAnterior: {
                fecha: this.formAntecedentes.value.fecha,
                perIntergenesicoAdecuado: this.formAntecedentes.value.intergenesico,
                terminacion: this.formAntecedentes.value.terminacion,
                tipoAborto: this.formAntecedentes.value.tipoAborto,
                lactanciaMaterna: this.formAntecedentes.value.lactaciaMaterna,
                lugarParto: this.formAntecedentes.value.lugarParto,
            },
            captada: this.formAntecedentes.value.captada,
            referidaAgComunal: this.formAntecedentes.value.referidaporAgComuni,
            psicoprofilaxisNroSesiones: this.formAntecedentes.value.sesiones,
            antecedentesPartosPersonales: this.formAntecedentes.value.PartosDomiciliarios,
            proceso: "EN GESTACION",
            antecedentesFamiliares: [
                {
                    nombre: this.antecedentes1[0],
                    valor: ""
                },
                {
                    nombre: this.antecedentes2[0],
                    valor: this.formAntecedentes.value.nombrefamiliar1,
                },
                {
                    nombre: this.antecedentes3[0],
                    valor: this.formAntecedentes.value.nombrefamiliar2,
                },
                {
                    nombre: this.antecedentes4[0],
                    valor: this.formAntecedentes.value.nombrefamiliar3,
                },
                {
                    nombre: this.antecedentes5[0],
                    valor: this.formAntecedentes.value.nombrefamiliar4,
                },
                {
                    nombre: this.antecedentes6[0],
                    valor: this.formAntecedentes.value.nombrefamiliar5,
                },
                {
                    nombre: this.antecedentes7[0],
                    valor: this.formAntecedentes.value.nombrefamiliar6,
                },
                {
                    nombre: this.antecedentes8[0],
                    valor: this.formAntecedentes.value.nombrefamiliar7,
                },

                {
                    nombre: this.antecedentes9[0],
                    valor: this.formAntecedentes.value.nombrefamiliar8,
                },
                {
                    nombre: this.antecedentes10[0],
                    valor: this.formAntecedentes.value.nombrefamiliar9,
                },
                {
                    nombre: this.antecedentes11[0],
                    valor: this.formAntecedentes.value.nombrefamiliar10,
                },
                {
                    nombre: this.antecedentes12[0],
                    valor: this.formAntecedentes.value.nombrefamiliar11,
                },
            ],
            rnMayorPeso: this.RNmayorPeso,
            antecedentesPersonales: [

                {
                    nombre: this.Ninguno[0],
                    valor: " ",
                },
                {
                    nombre: this.Abortohabitualrecurrente[0],
                    valor: " ",
                },
                {
                    nombre: this.Violencia[0],
                    valor: " ",
                },
                {
                    nombre: this.Cardiopatia[0],
                    valor: " ",
                },
                {
                    nombre: this.cirugiaPelvicaUterina[0],
                    valor: " ",
                },
                {
                    nombre: this.Eclampsia[0],
                    valor: " ",
                },
                {
                    nombre: this.preEclampsia[0],
                    valor: " ",
                },
                {
                    nombre: this.hemorraPostparto[0],
                    valor: " ",
                },
                {
                    nombre: this.TBCPulmonar2[0],
                    valor: " ",
                },
                {
                    nombre: this.VIHSIDA[0],
                    valor: " ",
                },
                {
                    nombre: this.Alcoholismo[0],
                    valor: " ",
                },

                {
                    nombre: this.alergiaAmedicamentos[0],
                    valor: " ",
                },
                {
                    nombre: this.asmaBronquial[0],
                    valor: " ",
                },
                {
                    nombre: this.diabetes2[0],
                    valor: " ",
                },
                {
                    nombre: this.enfermCongenitas[0],
                    valor: " ",
                },
                {
                    nombre: this.enfermInfecciosas[0],
                    valor: " ",
                },
                {
                    nombre: this.epilepsia[0],
                    valor: " ",
                },
                {
                    nombre: this.hipArterial[0],
                    valor: " ",
                },
                {
                    nombre: this.consumoHojaDeCoca[0],
                    valor: " ",
                },

                {
                    nombre: this.infertilidad[0],
                    valor: " ",
                },
                {
                    nombre: this.neoplasias[0],
                    valor: " ",
                },
                {
                    nombre: this.otrasDrogas[0],
                    valor: " ",
                },

                {
                    nombre: this.partoProlong[0],
                    valor: " ",
                },
                {
                    nombre: this.preeclampsia[0],
                    valor: " ",
                },
                {
                    nombre: this.prematuridad[0],
                    valor: " ",
                },
                {
                    nombre: this.retenPlacenta[0],
                    valor: " ",
                },
                {
                    nombre: this.tabaco[0],
                    valor: " ",
                },
                {
                    nombre: this.transtornMentales[0],
                    valor: " ",
                },
            ],
            otroAncedentePersonal: this.otros2,
            otroAntecendeteFamiliar: this.otrosAntecedentesFamiliares,
            antecedentesObstetricos: [
                {
                    nombre: 'Despues - 1ra Semanas',
                    valor: this.despuesPrimeraSemana,
                },
                {
                    nombre: 'Muerto - 1ra semana',
                    valor: this.muertoPrimeraSemana,
                },
                {
                    nombre: 'Viven',
                    valor: this.viven,
                },
                {
                    nombre: 'Nacidos Vivos',
                    valor: this.nacidosVivos,
                },
                {
                    nombre: 'Nacidos Muertos',
                    valor: this.nacidosMuertos,
                },
                {
                    nombre: 'Vaginales',
                    valor: this.vaginales,
                },
                {
                    nombre: 'Cesarias',
                    valor: this.cesarias,
                },
                {
                    nombre: 'Abortos',
                    valor: this.abortos,
                },
                {
                    nombre: 'Partos',
                    valor: this.partos,
                },
                {
                    nombre: 'Gestas',
                    valor: this.gestas,
                },
            ],
            detalleParto: [
                this.DetalleParto,
                this.DetalleParto2,
                this.DetalleParto3,
                this.DetalleParto4,
            ]

        }
        console.log("DATA ANTECEDENTES", req)
        this.filiancionService.UpdateAntecedentesFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado, req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro ',
                    text: 'Fue creado con exito',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.getpacienteFiiacionByID();
                this.addVacunasPrevias();
            }
        )
    }

    addVacunasPrevias() {
        let vacPrev: string[] = [];
        let aux1: boolean = this.formVacunasPrevias.value.rubeola;
        let aux2: boolean = this.formVacunasPrevias.value.hepatitisB;
        let aux3: boolean = this.formVacunasPrevias.value.papiloma;
        let aux4: boolean = this.formVacunasPrevias.value.influenza;
        let aux5: boolean = this.formVacunasPrevias.value.covid;

        if (aux1)
            vacPrev.push('rubeola');
        if (aux2)
            vacPrev.push('hepatitis B')
        if (aux3)
            vacPrev.push('papiloma')
        if (aux4)
            vacPrev.push('influenza')
        if (aux5)
            vacPrev.push('covid')

        const data = {
            vacunasPrevias: vacPrev
        }
        this.datosBasalesService.postDatosBasalesById(this.idRecuperado, data).subscribe((res: any) => {
            console.log('se guardo correctamente ', res.object);
            Swal.fire({
                icon: 'success',
                title: 'Registro',
                text: 'Fue creado con exito',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getDatosBasalesVacunasPrevias();
        });
    }

    getDatosBasalesVacunasPrevias() {
        let auxVac;
        this.datosBasalesService.getDatosBasalesById(this.idRecuperado).subscribe((res: any) => {
            let rptaDatosBasales = res.object;
            console.log('datos de embarazo', rptaDatosBasales)
            if (rptaDatosBasales == null)
                return
            auxVac = rptaDatosBasales.vacunasPrevias.find(item => item == "rubeola")
            this.formVacunasPrevias.patchValue({'rubeola': auxVac == undefined ? false : true});
            auxVac = rptaDatosBasales.vacunasPrevias.find(item => item == "hepatitis B")
            this.formVacunasPrevias.patchValue({'hepatitisB': auxVac == undefined ? false : true});
            auxVac = rptaDatosBasales.vacunasPrevias.find(item => item == "papiloma")
            this.formVacunasPrevias.patchValue({'papiloma': auxVac == undefined ? false : true});
            auxVac = rptaDatosBasales.vacunasPrevias.find(item => item == "influenza")
            this.formVacunasPrevias.patchValue({'influenza': auxVac == undefined ? false : true});
            auxVac = rptaDatosBasales.vacunasPrevias.find(item => item == "covid")
            this.formVacunasPrevias.patchValue({'covid': auxVac == undefined ? false : true});
        })
    }

    getpacienteFiiacionByID() {
        this.filiancionService.getAntecedentesFiliacion(this.idRecuperado).subscribe((res: any) => {
            this.dataAntecedentes = res.object;
            console.log('Antecedentes por ID ', this.dataAntecedentes)

            if (this.dataAntecedentes == null) {
                return
            } else {

                this.viven = Number(this.dataAntecedentes.antecedentesObstetricos[2].valor);
                this.muertoPrimeraSemana = Number(this.dataAntecedentes.antecedentesObstetricos[1].valor);
                this.despuesPrimeraSemana = Number(this.dataAntecedentes.antecedentesObstetricos[0].valor);
                this.nacidosVivos = Number(this.dataAntecedentes.antecedentesObstetricos[3].valor);
                this.nacidosMuertos = Number(this.dataAntecedentes.antecedentesObstetricos[4].valor);
                this.vaginales = Number(this.dataAntecedentes.antecedentesObstetricos[5].valor);
                this.cesarias = Number(this.dataAntecedentes.antecedentesObstetricos[6].valor);
                this.partos = Number(this.dataAntecedentes.antecedentesObstetricos[8].valor);
                this.abortos = Number(this.dataAntecedentes.antecedentesObstetricos[7].valor);
                this.gestas = Number(this.dataAntecedentes.antecedentesObstetricos[9].valor);
                this.RNmayorPeso = this.dataAntecedentes.rnMayorPeso;

                let detallePart1 = this.dataAntecedentes.detalleParto[0];
                let detallePart2 = this.dataAntecedentes.detalleParto[1];
                let detallePart3 = this.dataAntecedentes.detalleParto[2];
                let detallePart4 = this.dataAntecedentes.detalleParto[3];
                if (detallePart1 !== '') {
                    this.CeroOTres = '✓';
                } else {
                    this.CeroOTres = '';
                }
                if (detallePart2 !== '') {
                    this.MayorDosMilQuinientos = '✓';
                } else {
                    this.MayorDosMilQuinientos = '';
                }
                if (detallePart3 !== '') {
                    this.Multiple = '✓';
                } else {
                    this.Multiple = '';
                }
                if (detallePart4 !== '') {
                    this.MayorTrentaSemanas = '✓';
                } else {
                    this.MayorTrentaSemanas = '';
                }

                this.formAntecedentes.get('fecha').setValue(this.dataAntecedentes.gestacionAnterior.fecha);
                this.formAntecedentes.get('intergenesico').setValue(this.dataAntecedentes.gestacionAnterior.perIntergenesicoAdecuado);
                this.formAntecedentes.get('terminacion').setValue(this.dataAntecedentes.gestacionAnterior.terminacion);
                this.formAntecedentes.get('tipoAborto').setValue(this.dataAntecedentes.gestacionAnterior.tipoAborto);
                this.formAntecedentes.get('lactaciaMaterna').setValue(this.dataAntecedentes.gestacionAnterior.lactanciaMaterna);
                this.formAntecedentes.get('lugarParto').setValue(this.dataAntecedentes.gestacionAnterior.lugarParto);


                this.antecedentes1 = [this.dataAntecedentes.antecedentesFamiliares[0].nombre];

                this.antecedentes2 = [this.dataAntecedentes.antecedentesFamiliares[1].nombre];
                this.formAntecedentes.get('nombrefamiliar1').setValue(this.dataAntecedentes.antecedentesFamiliares[1].valor);

                this.antecedentes3 = [this.dataAntecedentes.antecedentesFamiliares[2].nombre];
                this.formAntecedentes.get('nombrefamiliar2').setValue(this.dataAntecedentes.antecedentesFamiliares[2].valor);

                this.antecedentes4 = [this.dataAntecedentes.antecedentesFamiliares[3].nombre];
                this.formAntecedentes.get('nombrefamiliar3').setValue(this.dataAntecedentes.antecedentesFamiliares[3].valor);

                this.antecedentes5 = [this.dataAntecedentes.antecedentesFamiliares[4].nombre];
                this.formAntecedentes.get('nombrefamiliar4').setValue(this.dataAntecedentes.antecedentesFamiliares[4].valor);

                this.antecedentes6 = [this.dataAntecedentes.antecedentesFamiliares[5].nombre];
                this.formAntecedentes.get('nombrefamiliar5').setValue(this.dataAntecedentes.antecedentesFamiliares[5].valor);

                this.antecedentes7 = [this.dataAntecedentes.antecedentesFamiliares[6].nombre];
                this.formAntecedentes.get('nombrefamiliar6').setValue(this.dataAntecedentes.antecedentesFamiliares[6].valor);

                this.antecedentes8 = [this.dataAntecedentes.antecedentesFamiliares[7].nombre];
                this.formAntecedentes.get('nombrefamiliar7').setValue(this.dataAntecedentes.antecedentesFamiliares[7].valor);

                this.antecedentes9 = [this.dataAntecedentes.antecedentesFamiliares[8].nombre];
                this.formAntecedentes.get('nombrefamiliar8').setValue(this.dataAntecedentes.antecedentesFamiliares[8].valor);

                this.antecedentes10 = [this.dataAntecedentes.antecedentesFamiliares[9].nombre];
                this.formAntecedentes.get('nombrefamiliar9').setValue(this.dataAntecedentes.antecedentesFamiliares[9].valor);

                this.antecedentes11 = [this.dataAntecedentes.antecedentesFamiliares[10].nombre];
                this.formAntecedentes.get('nombrefamiliar10').setValue(this.dataAntecedentes.antecedentesFamiliares[10].valor);

                this.antecedentes12 = [this.dataAntecedentes.antecedentesFamiliares[11].nombre];
                this.formAntecedentes.get('nombrefamiliar11').setValue(this.dataAntecedentes.antecedentesFamiliares[11].valor);
                this.transtornMentales = [this.dataAntecedentes.antecedentesPersonales[27].nombre];
                this.otrosAntecedentesFamiliares = this.dataAntecedentes.otroAntecendeteFamiliar;
                if (this.otrosAntecedentesFamiliares !== '') {
                    this.otrosAntecedentesFamiliares2 = ["otros"]
                } else this.otrosAntecedentesFamiliares2 = null

                this.inicializarAregloAntfamiliares();


                this.formAntecedentes.get('captada').setValue(this.dataAntecedentes.captada);
                this.formAntecedentes.get('referidaporAgComuni').setValue(this.dataAntecedentes.referidaAgComunal);


                this.Ninguno = [this.dataAntecedentes.antecedentesPersonales[0].nombre];
                console.log("ERRRR", this.Ninguno);
                this.Abortohabitualrecurrente = [this.dataAntecedentes.antecedentesPersonales[1].nombre];
                this.Violencia = [this.dataAntecedentes.antecedentesPersonales[2].nombre];
                this.Cardiopatia = [this.dataAntecedentes.antecedentesPersonales[3].nombre];
                this.cirugiaPelvicaUterina = [this.dataAntecedentes.antecedentesPersonales[4].nombre];
                this.Eclampsia = [this.dataAntecedentes.antecedentesPersonales[5].nombre];
                this.preEclampsia = [this.dataAntecedentes.antecedentesPersonales[6].nombre];
                this.hemorraPostparto = [this.dataAntecedentes.antecedentesPersonales[7].nombre];
                this.TBCPulmonar2 = [this.dataAntecedentes.antecedentesPersonales[8].nombre];
                this.VIHSIDA = [this.dataAntecedentes.antecedentesPersonales[9].nombre];
                this.Alcoholismo = [this.dataAntecedentes.antecedentesPersonales[10].nombre];
                this.alergiaAmedicamentos = [this.dataAntecedentes.antecedentesPersonales[11].nombre];
                this.asmaBronquial = [this.dataAntecedentes.antecedentesPersonales[12].nombre];
                this.diabetes2 = [this.dataAntecedentes.antecedentesPersonales[13].nombre];
                this.enfermCongenitas = [this.dataAntecedentes.antecedentesPersonales[14].nombre];
                this.enfermInfecciosas = [this.dataAntecedentes.antecedentesPersonales[15].nombre];
                this.epilepsia = [this.dataAntecedentes.antecedentesPersonales[16].nombre];
                this.hipArterial = [this.dataAntecedentes.antecedentesPersonales[17].nombre];
                this.consumoHojaDeCoca = [this.dataAntecedentes.antecedentesPersonales[18].nombre];
                this.infertilidad = [this.dataAntecedentes.antecedentesPersonales[19].nombre];
                this.neoplasias = [this.dataAntecedentes.antecedentesPersonales[20].nombre];
                this.otrasDrogas = [this.dataAntecedentes.antecedentesPersonales[21].nombre];
                this.partoProlong = [this.dataAntecedentes.antecedentesPersonales[22].nombre];
                this.preeclampsia = [this.dataAntecedentes.antecedentesPersonales[23].nombre];
                this.prematuridad = [this.dataAntecedentes.antecedentesPersonales[24].nombre];
                this.retenPlacenta = [this.dataAntecedentes.antecedentesPersonales[25].nombre];
                this.tabaco = [this.dataAntecedentes.antecedentesPersonales[26].nombre];
                this.transtornMentales = [this.dataAntecedentes.antecedentesPersonales[27].nombre];
                this.otros2 = this.dataAntecedentes.otroAncedentePersonal;
                if (this.otros2 !== '') {
                    this.otros23 = ["otros"]
                } else this.otros23 = null

                this.formAntecedentes.get('sesiones').setValue(this.dataAntecedentes.psicoprofilaxisNroSesiones);
                this.formAntecedentes.get('PartosDomiciliarios').setValue(this.dataAntecedentes.antecedentesPartosPersonales);
                this.inicializarArregloAntecedentes();
            }
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

    fnCheckbox(value) {
        console.log(value);
    }
}
