import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Network, DataSet} from 'vis';
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-datos-generales-obtetricia",
    templateUrl: "./datos-generales-obtetricia.component.html",
    styleUrls: ["./datos-generales-obtetricia.component.css"],
})
export class DatosGeneralesObtetriciaComponent implements OnInit {


    // // @ViewChild('network', {static: false})
    // @ViewChild('visNetwork', {static: false})
    // visNetwork!: ElementRef;
    // private networkInstance: any;

    @ViewChild('canvasEl', {static: true})
    canvasEl: ElementRef<HTMLCanvasElement>;

    // @ViewChild('canvasEl') canvasEl: ElementRef<HTMLCanvasElement>;

    /**Canvas 2d context*/
    private context: CanvasRenderingContext2D;


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


    constructor(private form: FormBuilder,
                private filiancionService: FiliancionService,
                private obstetriciaGeneralService: ObstetriciaGeneralService) {

        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.idRecuperado = this.obstetriciaGeneralService.idGestacion;

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

        this.departamentos = [
            {name: 'Cusco'},
            {name: 'Lima'},
            {name: 'Arequipa'},
            {name: 'Puno'},
            {name: 'Madre de Dios'},
            {name: 'Loreto'},
            {name: 'Cajamarca'},
            {name: 'Ayacucho'},
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
        // this.obstetriciaGeneralService.observable$.subscribe(id => {
        //     this.idDocumento = id;
        console.log("ID RECUPERADo", this.idRecuperado);
        // })
        this.buildForm2();
        this.getpacienteFiiacionByID();
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


    // ngAfterViewInit(): void {
    //     // create an array with nodes
    //     const nodes = new DataSet<any>([
    //         {id: 1, label: 'Node 1'},
    //         {id: 2, label: 'Node 2'},
    //         {id: 3, label: 'Node 3'},
    //         {id: 4, label: 'Node 4'},
    //         {id: 5, label: 'Node 5'},
    //     ]);
    //
    //     // create an array with edges
    //     const edges = new DataSet<any>([
    //         {from: '1', to: '3'},
    //         {from: '1', to: '2'},
    //         {from: '2', to: '4'},
    //         {from: '2', to: '5'},
    //     ]);
    //
    //     const data = {nodes, edges};
    //
    //     const container = this.visNetwork;
    //     this.networkInstance = new Network(container.nativeElement, data, {});
    // }


    buildForm2() {
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


            /**Antecedentes Familiares**/
            // ninguno: new FormControl(''),
            // alergia: new FormControl(''),
            // EnferHepertens: new FormControl(''),
            // epilepcia: new FormControl(''),
            // diabetes: new FormControl(''),
            // EnfCongenitas: new FormControl(''),
            // EmbMultiple: new FormControl(''),
            // malaria: new FormControl(''),
            // HipArterial: new FormControl(''),
            // HipoTiroidismo: new FormControl(''),
            // neoplásica: new FormControl(''),
            // TBCPulmonar: new FormControl(''),
            // otros: new FormControl(''),

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

        }
        console.log("DATA ANTECEDENTES", req)
        this.filiancionService.UpdateAntecedentesFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado, req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizo con exito',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(

                )
            }
        )
    }


    getpacienteFiiacionByID() {
        this.filiancionService.getAntecedentesFiliacion(this.idRecuperado).subscribe((res: any) => {
            this.dataAntecedentes = res.object;
            console.log('Antecedentes por ID ', this.dataAntecedentes)
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
