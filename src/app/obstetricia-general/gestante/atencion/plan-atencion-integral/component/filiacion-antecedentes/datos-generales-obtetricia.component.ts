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


    buildForm2() {
        this.formAntecedentes = this.form.group({
            fecha: new FormControl(''),
            intergenesico: new FormControl(''),
            tipoAborto: new FormControl(''),
            lactaciaMaterna: new FormControl(''),
            lugarParto: new FormControl(''),

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

            ninguno: new FormControl(''),
            alergia: new FormControl(''),
            EnferHepertens: new FormControl(''),
            epilepcia: new FormControl(''),
            diabetes: new FormControl(''),
            EnfCongenitas: new FormControl(''),
            EmbMultiple: new FormControl(''),

            malaria: new FormControl(''),
            HipArterial: new FormControl(''),
            HipoTiroidismo: new FormControl(''),
            neoplásica: new FormControl(''),
            TBCPulmonar: new FormControl(''),
            otros: new FormControl(''),
            captada: new FormControl(''),
            referidaporAgComuni: new FormControl(''),


            Ninguno1: new FormControl(''),
            Abortohabitualrecurrente: new FormControl(''),
            violencia: new FormControl(''),
            cardiopatia: new FormControl(''),
            cirugiaPélvicaUterina: new FormControl(''),
            eclampsia: new FormControl(''),
            preEclampsia: new FormControl(''),
            hemorraPostparto: new FormControl(''),
            TBCPulmonar2: new FormControl(''),
            VIHSIDA: new FormControl(''),
            alcoholismo: new FormControl(''),
            alergiaAmedicamentos: new FormControl(''),
            asmaBronquial: new FormControl(''),
            diabetes2: new FormControl(''),
            enfermCongénitas: new FormControl(''),
            enfermInfecciosas: new FormControl(''),
            epilepsia: new FormControl(''),
            hipArterial: new FormControl(''),
            consumoHojaDeCoca: new FormControl(''),
            infertilidad: new FormControl(''),
            neoplasias: new FormControl(''),
            otrasDrogas: new FormControl(''),
            partoProlong: new FormControl(''),
            preeclampsia: new FormControl(''),
            prematuridad: new FormControl(''),
            retenPlacenta: new FormControl(''),
            tabaco: new FormControl(''),
            transtornMentales: new FormControl(''),
            Otros2: new FormControl(''),

            terminacion: new FormControl(''),

            sesiones: new FormControl(''),
            PartosDomiciliarios: new FormControl(''),


            abortoMolar: new FormControl(''),
            noAplica: new FormControl(''),
            incompleto: new FormControl(''),
            completo: new FormControl(''),
            frustoRetenido: new FormControl(''),
            septico: new FormControl(''),
            noAplica2: new FormControl(''),
            noHubo: new FormControl(''),
            menorSeisMeses: new FormControl(''),
            SeisMesesMas: new FormControl(''),
            noAplica3: new FormControl(''),


            EESS: new FormControl(''),
            domic: new FormControl(''),
        })
    }

    addData() {

        console.log("aaaaa", this.formAntecedentes.value.alergia[0])
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


            antecedentesFamiliares: [
                {
                    nombre: this.formAntecedentes.value.ninguno[0],
                    valor: null
                },
                {
                    nombre: this.formAntecedentes.value.alergia[0],
                    valor: this.formAntecedentes.value.nombrefamiliar1,
                },
                {
                    nombre: this.formAntecedentes.value.EnferHepertens[0],
                    valor: this.formAntecedentes.value.nombrefamiliar2,
                },
                {
                    nombre: this.formAntecedentes.value.epilepcia[0],
                    valor: this.formAntecedentes.value.nombrefamiliar3,
                },
                {
                    nombre: this.formAntecedentes.value.diabetes[0],
                    valor: this.formAntecedentes.value.nombrefamiliar4,
                },
                {
                    nombre: this.formAntecedentes.value.EnfCongenitas[0],
                    valor: this.formAntecedentes.value.nombrefamiliar5,
                },
                {
                    nombre: this.formAntecedentes.value.EmbMultiple[0],
                    valor: this.formAntecedentes.value.nombrefamiliar6,
                },
                {
                    nombre: this.formAntecedentes.value.malaria[0],
                    valor: this.formAntecedentes.value.nombrefamiliar7,
                },
                {
                    nombre: this.formAntecedentes.value.HipArterial[0],
                    valor: this.formAntecedentes.value.nombrefamiliar8,
                },
                {
                    nombre: this.formAntecedentes.value.HipoTiroidismo[0],
                    valor: this.formAntecedentes.value.nombrefamiliar9,
                },
                {
                    nombre: this.formAntecedentes.value.neoplásica[0],
                    valor: this.formAntecedentes.value.nombrefamiliar10,
                },
                {
                    nombre: this.formAntecedentes.value.TBCPulmonar[0],
                    valor: this.formAntecedentes.value.nombrefamiliar11,
                },
                {
                    nombre: this.formAntecedentes.value.otros[0],
                    valor: this.formAntecedentes.value.nombrefamiliar12,
                },
            ],

            antecedentesPersonales: [

                this.formAntecedentes.value.Ninguno1[0],
                this.formAntecedentes.value.Abortohabitualrecurrente[0],
                this.formAntecedentes.value.violencia[0],
                this.formAntecedentes.value.cardiopatia[0],
                this.formAntecedentes.value.cirugiaPélvicaUterina[0],
                this.formAntecedentes.value.eclampsia[0],
                this.formAntecedentes.value.preEclampsia[0],
                this.formAntecedentes.value.hemorraPostparto[0],
                this.formAntecedentes.value.TBCPulmonar2[0],
                this.formAntecedentes.value.VIHSIDA[0],
                this.formAntecedentes.value.alcoholismo[0],
                this.formAntecedentes.value.alergiaAmedicamentos[0],
                this.formAntecedentes.value.asmaBronquial[0],
                this.formAntecedentes.value.diabetes2[0],
                this.formAntecedentes.value.enfermCongénitas[0],
                this.formAntecedentes.value.enfermInfecciosas[0],
                this.formAntecedentes.value.epilepsia[0],
                this.formAntecedentes.value.hipArterial[0],
                this.formAntecedentes.value.consumoHojaDeCoca[0],
                this.formAntecedentes.value.infertilidad[0],
                this.formAntecedentes.value.neoplasias[0],
                this.formAntecedentes.value.otrasDrogas[0],
                this.formAntecedentes.value.partoProlong[0],
                this.formAntecedentes.value.preeclampsia[0],
                this.formAntecedentes.value.prematuridad[0],
                this.formAntecedentes.value.retenPlacenta[0],
                this.formAntecedentes.value.tabaco[0],
                this.formAntecedentes.value.transtornMentales[0],

            ],
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
                })
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

            this.formAntecedentes.get('ninguno').setValue([this.dataAntecedentes.antecedentesFamiliares[0].nombre]);

            this.formAntecedentes.get('alergia').setValue([this.dataAntecedentes.antecedentesFamiliares[1].nombre]);
            this.formAntecedentes.get('nombrefamiliar1').setValue(this.dataAntecedentes.antecedentesFamiliares[1].valor);

            this.formAntecedentes.get('EnferHepertens').setValue([this.dataAntecedentes.antecedentesFamiliares[2].nombre]);
            this.formAntecedentes.get('nombrefamiliar2').setValue(this.dataAntecedentes.antecedentesFamiliares[2].valor);

            this.formAntecedentes.get('epilepcia').setValue([this.dataAntecedentes.antecedentesFamiliares[3].nombre]);
            this.formAntecedentes.get('nombrefamiliar3').setValue(this.dataAntecedentes.antecedentesFamiliares[3].valor);

            this.formAntecedentes.get('diabetes').setValue([this.dataAntecedentes.antecedentesFamiliares[4].nombre]);
            this.formAntecedentes.get('nombrefamiliar4').setValue(this.dataAntecedentes.antecedentesFamiliares[4].valor);

            this.formAntecedentes.get('EnfCongenitas').setValue([this.dataAntecedentes.antecedentesFamiliares[5].nombre]);
            this.formAntecedentes.get('nombrefamiliar5').setValue(this.dataAntecedentes.antecedentesFamiliares[5].valor);

            this.formAntecedentes.get('EmbMultiple').setValue([this.dataAntecedentes.antecedentesFamiliares[6].nombre]);
            this.formAntecedentes.get('nombrefamiliar6').setValue(this.dataAntecedentes.antecedentesFamiliares[6].valor);


            this.formAntecedentes.get('malaria').setValue([this.dataAntecedentes.antecedentesFamiliares[7].nombre]);
            this.formAntecedentes.get('nombrefamiliar7').setValue(this.dataAntecedentes.antecedentesFamiliares[7].valor);

            this.formAntecedentes.get('HipArterial').setValue([this.dataAntecedentes.antecedentesFamiliares[8].nombre]);
            this.formAntecedentes.get('nombrefamiliar8').setValue(this.dataAntecedentes.antecedentesFamiliares[8].valor);

            this.formAntecedentes.get('HipoTiroidismo').setValue([this.dataAntecedentes.antecedentesFamiliares[9].nombre]);
            this.formAntecedentes.get('nombrefamiliar9').setValue(this.dataAntecedentes.antecedentesFamiliares[9].valor);

            this.formAntecedentes.get('neoplásica').setValue([this.dataAntecedentes.antecedentesFamiliares[10].nombre]);
            this.formAntecedentes.get('nombrefamiliar10').setValue(this.dataAntecedentes.antecedentesFamiliares[10].valor);

            this.formAntecedentes.get('TBCPulmonar').setValue([this.dataAntecedentes.antecedentesFamiliares[11].nombre]);
            this.formAntecedentes.get('nombrefamiliar11').setValue(this.dataAntecedentes.antecedentesFamiliares[11].valor);

            this.formAntecedentes.get('otros').setValue([this.dataAntecedentes.antecedentesFamiliares[12].nombre]);
            this.formAntecedentes.get('nombrefamiliar12').setValue(this.dataAntecedentes.antecedentesFamiliares[12].valor);


            this.formAntecedentes.get('captada').setValue(this.dataAntecedentes.captada);
            this.formAntecedentes.get('referidaporAgComuni').setValue(this.dataAntecedentes.referidaAgComunal);


            this.formAntecedentes.get('Ninguno1').setValue([this.dataAntecedentes.antecedentesPersonales[0]]);
            this.formAntecedentes.get('Abortohabitualrecurrente').setValue([this.dataAntecedentes.antecedentesPersonales[1]]);
            this.formAntecedentes.get('violencia').setValue([this.dataAntecedentes.antecedentesPersonales[2]]);
            this.formAntecedentes.get('cardiopatia').setValue([this.dataAntecedentes.antecedentesPersonales[3]]);
            this.formAntecedentes.get('cirugiaPélvicaUterina').setValue([this.dataAntecedentes.antecedentesPersonales[4]]);
            this.formAntecedentes.get('eclampsia').setValue([this.dataAntecedentes.antecedentesPersonales[5]]);
            this.formAntecedentes.get('preEclampsia').setValue([this.dataAntecedentes.antecedentesPersonales[6]]);
            this.formAntecedentes.get('hemorraPostparto').setValue([this.dataAntecedentes.antecedentesPersonales[7]]);
            this.formAntecedentes.get('TBCPulmonar2').setValue([this.dataAntecedentes.antecedentesPersonales[8]]);
            this.formAntecedentes.get('VIHSIDA').setValue([this.dataAntecedentes.antecedentesPersonales[9]]);
            this.formAntecedentes.get('alcoholismo').setValue([this.dataAntecedentes.antecedentesPersonales[10]]);
            this.formAntecedentes.get('alergiaAmedicamentos').setValue([this.dataAntecedentes.antecedentesPersonales[11]]);
            this.formAntecedentes.get('asmaBronquial').setValue([this.dataAntecedentes.antecedentesPersonales[12]]);
            this.formAntecedentes.get('diabetes2').setValue([this.dataAntecedentes.antecedentesPersonales[13]]);
            this.formAntecedentes.get('enfermCongénitas').setValue([this.dataAntecedentes.antecedentesPersonales[14]]);
            this.formAntecedentes.get('enfermInfecciosas').setValue([this.dataAntecedentes.antecedentesPersonales[15]]);
            this.formAntecedentes.get('epilepsia').setValue([this.dataAntecedentes.antecedentesPersonales[16]]);
            this.formAntecedentes.get('hipArterial').setValue([this.dataAntecedentes.antecedentesPersonales[17]]);
            this.formAntecedentes.get('consumoHojaDeCoca').setValue([this.dataAntecedentes.antecedentesPersonales[18]]);
            this.formAntecedentes.get('infertilidad').setValue([this.dataAntecedentes.antecedentesPersonales[19]]);
            this.formAntecedentes.get('neoplasias').setValue([this.dataAntecedentes.antecedentesPersonales[20]]);
            this.formAntecedentes.get('otrasDrogas').setValue([this.dataAntecedentes.antecedentesPersonales[21]]);
            this.formAntecedentes.get('partoProlong').setValue([this.dataAntecedentes.antecedentesPersonales[22]]);
            this.formAntecedentes.get('preeclampsia').setValue([this.dataAntecedentes.antecedentesPersonales[23]]);
            this.formAntecedentes.get('prematuridad').setValue([this.dataAntecedentes.antecedentesPersonales[24]]);
            this.formAntecedentes.get('retenPlacenta').setValue([this.dataAntecedentes.antecedentesPersonales[25]]);
            this.formAntecedentes.get('tabaco').setValue([this.dataAntecedentes.antecedentesPersonales[26]]);
            this.formAntecedentes.get('transtornMentales').setValue([this.dataAntecedentes.antecedentesPersonales[27]]);


            this.formAntecedentes.get('sesiones').setValue(this.dataAntecedentes.psicoprofilaxisNroSesiones);
            this.formAntecedentes.get('PartosDomiciliarios').setValue(this.dataAntecedentes.antecedentesPartosPersonales);

        });
    }

    fnCheckbox(value) {
        console.log(value);
    }
}
