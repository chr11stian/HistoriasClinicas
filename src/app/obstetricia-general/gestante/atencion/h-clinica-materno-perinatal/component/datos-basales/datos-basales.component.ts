import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FiliancionService } from "../../services/filiancion-atenciones/filiancion.service";

import { DatosBasalesService } from '../../services/datos-basales/datos-basales.service';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import { MenuItem, MessageService } from 'primeng/api';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HemoglobinaDialogComponent } from './hemoglobina-dialog/hemoglobina-dialog.component';
import { ImcService } from 'src/app/obstetricia-general/services/imc.service';
import { DatePipe } from '@angular/common';
import { DialogPatologiasMaternasComponent } from './dialog-patologias-maternas/dialog-patologias-maternas.component';
import Swal from "sweetalert2";
import { LaboratoryResultDialogComponent } from './laboratory-result-dialog/laboratory-result-dialog.component';

@Component({
    selector: 'app-datos-basales',
    templateUrl: './datos-basales.component.html',
    styleUrls: ['./datos-basales.component.css'],
    providers: [DialogService],
})
export class DatosBasalesComponent implements OnInit {

    form: FormGroup;
    formHemoglobina: FormGroup;
    id: any;
    sino = [
        { label: 'Si', value: true },
        { label: 'No', value: false }
    ];
    city: any;
    examenFisico: any;
    hemoglobina: any;
    datosBasales: any;
    otrosExamenes: any;
    rptaDatosBasales: any;
    idGestante: string;
    listaDeCIE: any;
    dataGananciaPeso: any;
    edadGestacional: number;
    hemoglobinaDialog: boolean = false;
    ref: DynamicDialogRef;
    otrosExamHemo: any[] = [];
    tipoGananciaPeso: string;
    listaPatologiasMaternas: any[] = [];
    Gestacion: any;
    // dataPaciente2: any;
    DataCupos: any;
    dialItems: MenuItem[];

    constructor(
        private filiancionService: FiliancionService,
        private fb: FormBuilder,
        private datosBasalesService: DatosBasalesService,
        private obstetriciaService: ObstetriciaGeneralService,
        private CieService: CieService,
        private dialog: DialogService,
        private imcService: ImcService,
    ) {
        this.inicalizarForm();
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        /**Data cupos nos permite visualizar funciones vitales del paciente**/
        this.DataCupos = JSON.parse(localStorage.getItem('datacupos'));

        if (this.Gestacion == null) {
            this.idGestante = JSON.parse(localStorage.getItem('idGestacionRegistro'));
        } else {
            this.idGestante = this.Gestacion.id;
        }

        this.form.get('pesoActual').setValue(this.DataCupos.funcionesVitales.peso);
        this.form.get('talla').setValue(this.DataCupos.funcionesVitales.talla);
        this.dialItems = [
            {
                tooltipOptions: {
                    tooltipLabel: 'Laboratorios'
                },
                icon: 'pi pi-book',
                command: () => {
                    console.log('data de labossss');
                }
            }
        ]
    }

    ngOnInit(): void {
        this.id = this.filiancionService.id;
        this.loadData();
    }

    inicalizarForm() {
        this.form = this.fb.group({
            //peso y talla
            imc: new FormControl(""),
            pesoActual: new FormControl(""),
            pesoHabitual: new FormControl(""),
            talla: new FormControl(""),
            //antitetanica
            nroDosisPrevias: new FormControl(""),
            primeraDosis: new FormControl(null),
            segundaDosis: new FormControl(""),
            firstDosis: new FormControl(""),
            secondDosis: new FormControl(""),
            aplica: new FormControl(""),
            sinDosis: new FormControl(""),
            //drogas
            drogas: new FormControl(""),
            //cigarros
            cigarrillosDia: new FormControl(""),
            //tipo de sangre
            tipoSangreGrupo: new FormControl(""),
            rh: new FormControl(""),
            //fecha ultima menstruacion
            duda: new FormControl(""),
            dateFUM: new FormControl(""),
            dateProbableParto: new FormControl(""),
            ecografia1: new FormControl(""),
            dateEco1: new FormControl(""),
            ecografia2: new FormControl(""),
            dateEco2: new FormControl(""),
            ecografia3: new FormControl(""),
            dateEco3: new FormControl(""),
            //hospitalizacion  y emergencia
            hospitalizacion: new FormControl(""),
            dateHospitalizacion: new FormControl(""),
            diagnosticoHosp: new FormControl(""),
            hospitalizacionCIE: new FormControl(""),
            dateEmergencia: new FormControl(""),
            diagnosticoEmergenci: new FormControl(""),
            emergenciaCIE: new FormControl(""),
            autocompleteHosp: new FormControl(""),
            autocompleteEmerg: new FormControl(""),
            //vacunas previas
            rubeola: new FormControl(""),
            hepatitisB: new FormControl(""),
            papiloma: new FormControl(""),

            influenza: new FormControl(""),
            covid: new FormControl(""),
            //violencia/genero
            tamizaje: new FormControl(""),
            violencia: new FormControl(""),
            dateViolencia: new FormControl(""),

            //examen fisico
            clinico: new FormControl(""),
            mamas: new FormControl(""),
            cuelloUter: new FormControl(""),
            pelvis: new FormControl(""),
            odont1: new FormControl(""),
            odont2: new FormControl(""),
            //examen laboratorio
            hg1: new FormControl(""),
            conFactor1: new FormControl(""),
            hemo1: new FormControl(""),
            hg2: new FormControl(""),
            conFactor2: new FormControl(""),
            hemo2: new FormControl(""),
            hg3: new FormControl(""),
            conFactor3: new FormControl(""),
            hemo3: new FormControl(""),
            hg4: new FormControl(""),
            conFactor4: new FormControl(""),
            hemo4: new FormControl(""),
            vdrl1: new FormControl(""),
            vdrl2: new FormControl(""),
            tpha: new FormControl(""),
            dateVdrl2: new FormControl(""),
            dateVih2: new FormControl(""),
            vih1: new FormControl(""),
            vih2: new FormControl(""),
            hepatitis: new FormControl(""),
            elisa1: new FormControl(""),
            elisa2: new FormControl(""),
            glicemia1: new FormControl(""),
            glicemia2: new FormControl(""),
            glucosa: new FormControl(""),
            orina1: new FormControl(""),
            orina2: new FormControl(""),
            orina3: new FormControl(""),
            bacteriuria: new FormControl(""),
            nitritos: new FormControl(""),
            urocultivo: new FormControl(""),
            esputo: new FormControl(""),
            western: new FormControl(""),
            thlv1: new FormControl(""),
            torch: new FormControl(""),
            gotaGruesa: new FormControl(""),
            proteinuriaCuanti: new FormControl(""),
            proteinuriaCuali: new FormControl(""),
            secrecionVag: new FormControl(""),
            pap: new FormControl(""),
            ivaa: new FormControl(""),
            datevdrl1: new FormControl(""),
            dateTpha: new FormControl(""),
            dateVih1: new FormControl(""),
            dateHepatitis: new FormControl(""),
            dateElisa1: new FormControl(""),
            dateElisa2: new FormControl(""),
            dateGlicemia1: new FormControl(""),
            dateGlicemia2: new FormControl(""),
            dateGlucosa: new FormControl(""),
            dateOrina1: new FormControl(""),
            dateOrina2: new FormControl(""),
            dateOrina3: new FormControl(""),
            dateBacteriuria: new FormControl(""),
            dateNitritos: new FormControl(""),
            dateUrocultivo: new FormControl(""),
            dateEsputo: new FormControl(""),
            dateWestern: new FormControl(""),
            dateThlv1: new FormControl(""),
            dateTorch: new FormControl(""),
            dateGotaGruesa: new FormControl(""),
            dateProteinuriaCuanti: new FormControl(""),
            dateProteinuriaCuali: new FormControl(""),
            dateSecrecionVag: new FormControl(""),
            datePap: new FormControl(""),
            dateIvaa: new FormControl(""),
            patologiasMaternas1: new FormControl(""),
            patologiasMaternas2: new FormControl(""),
            patologiasMaternas3: new FormControl(""),
            patologiasMaternas4: new FormControl(""),
            datePatolog1: new FormControl(""),
            datePatolog2: new FormControl(""),
            datePatolog3: new FormControl(""),
            datePatolog4: new FormControl(""),
        });

        this.formHemoglobina = this.fb.group({
            hg: new FormControl(""),
            factorCorrec: new FormControl(""),
            fechaHemo: new FormControl(""),
        });
    }

    recuperarDatos() {
        this.recuperarExamenFisico();
        this.recuperarHemoglobina();
        this.recuperarOtrosExamenes();
        let vacPrev: string[] = [];
        let aux1: boolean = this.form.value.rubeola;
        let aux2: boolean = this.form.value.hepatitisB;
        let aux3: boolean = this.form.value.papiloma;
        let aux4: boolean = this.form.value.influenza;
        let aux5: boolean = this.form.value.covid;

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

        this.datosBasales = {
            pesoTalla: {
                imc: this.form.value.imc,
                pesoHabitual: this.form.value.pesoHabitual,
                talla: this.form.value.talla,
                pesoActual: this.form.value.pesoActual
            },
            antitetanica: {
                nroDosisPrevia: this.form.value.nroDosisPrevias,
                dosis: [
                    {
                        dosis: this.form.value.primeraDosis,
                        detalle: this.form.value.firstDosis
                    },
                    {
                        dosis: this.form.value.segundaDosis,
                        detalle: this.form.value.secondDosis
                    }
                ]
            },
            tipoSangre: {
                grupo: this.form.value.tipoSangreGrupo,
                rh: this.form.value.rh
            },
            nroCigarrosAlDia: this.form.value.cigarrillosDia,
            drogas: this.form.value.drogas,
            fechaUltimaMestruacion: {
                fum: this.form.value.dateFUM,
                duda: this.form.value.duda,
                fechaProbableParto: this.form.value.dateProbableParto,
                primeraEcografia: this.form.value.ecografia1,
                fechaPrimeraEcografia: this.form.value.dateEco1,
                segundaEcografia: this.form.value.ecografia2,
                fechaSegundaEcografia: this.form.value.dateEco2,
                terceraEcografia: this.form.value.ecografia3,
                fechaTerceraEcografia: this.form.value.dateEco3
            },
            hospitalizacion: [{
                hospitalizacion: this.form.value.hospitalizacion,
                fecha: this.form.value.dateHospitalizacion,
                diagnostico: this.form.value.diagnosticoHosp,
                cie10: this.form.value.hospitalizacionCIE == "" ? "" : this.form.value.hospitalizacionCIE.codigoItem,
            }],
            emergencia: {
                fecha: this.form.value.dateEmergencia,
                diagnostico: this.form.value.diagnosticoEmergenci,
                cie10: this.form.value.emergenciaCIE == "" ? "" : this.form.value.emergenciaCIE.codigoItem
            },
            vacunasPrevias: vacPrev,
            violenciaGenero: {
                fichaTamizaje: this.form.value.tamizaje,
                violencia: this.form.value.violencia,
                fecha: this.form.value.dateViolencia
            },
            examenFisico: this.examenFisico,
            examenLaboratorio: {
                hemoglobina: this.hemoglobina,
                otrosExamenes: this.otrosExamenes
            },
            patologiaMaternoDiagnosticado: this.listaPatologiasMaternas,
            proceso: 'datosBasales'
        }
    }

    recuperarExamenFisico() {
        this.examenFisico = [
            {
                nombre: 'clinico',
                valor: this.form.value.clinico
            }, {
                nombre: 'mamas',
                valor: this.form.value.mamas
            }, {
                nombre: 'cuello uterino',
                valor: this.form.value.cuelloUter
            }, {
                nombre: 'pelvis',
                valor: this.form.value.pelvis
            }, {
                nombre: 'odonto 1',
                valor: this.form.value.odont1
            }, {
                nombre: 'odonto 2',
                valor: this.form.value.odont2
            }
        ]
    }

    recuperarHemoglobina() {
        this.hemoglobina = [
            {
                descripcion: 'HEMOGLOBINA 1',
                hg: this.form.value.hg1,
                conFactorCorreccion: this.form.value.conFactor1,
                fecha: this.form.value.hemo1
            },
            {
                descripcion: 'HEMOGLOBINA 2',
                hg: this.form.value.hg2,
                conFactorCorreccion: this.form.value.conFactor2,
                fecha: this.form.value.hemo2
            },
            {
                descripcion: 'HEMOGLOBINA 3',
                hg: this.form.value.hg3,
                conFactorCorreccion: this.form.value.conFactor3,
                fecha: this.form.value.hemo3
            },
        ]
        if (this.otrosExamHemo.length > 0) {
            for (let i = 0; i < this.otrosExamHemo.length; i++) {
                this.hemoglobina.push(this.otrosExamHemo[i]);
            }
        }
    }

    recuperarOtrosExamenes() {
        this.otrosExamenes = [
            {
                nombre: 'VDRL/RPR 1',
                valor: this.form.value.vdrl1,
                fecha: this.form.value.datevdrl1
            }, {
                nombre: 'VDRL/RPR 2',
                valor: this.form.value.vdrl2,
                fecha: this.form.value.dateVdrl2
            }, {
                nombre: 'TPHA/VDRL (RPR REACTIVO)',
                valor: this.form.value.tpha,
                fecha: this.form.value.dateTpha
            }, {
                nombre: 'VIH PRUEBA RAPIDA 1',
                valor: this.form.value.vih1,
                fecha: this.form.value.dateVih1
            }, {
                nombre: 'VIH PRUEBA RAPIDA 2',
                valor: this.form.value.vih2,
                fecha: this.form.value.dateVih2
            }, {
                nombre: 'PR HEPATITIS',
                valor: this.form.value.hepatitis,
                fecha: this.form.value.dateHepatitis
            }, {
                nombre: 'ELISA 1',
                valor: this.form.value.elisa1,
                fecha: this.form.value.dateElisa1
            }, {
                nombre: 'ELISA 2',
                valor: this.form.value.elisa2,
                fecha: this.form.value.dateElisa2
            }, {
                nombre: 'GLICEMIA 1',
                valor: this.form.value.glicemia1,
                fecha: this.form.value.dateGlicemia1
            }, {
                nombre: 'GLICEMIA 2',
                valor: this.form.value.glicemia2,
                fecha: this.form.value.dateGlicemia2
            }, {
                nombre: 'TOLERANCIA GLUCOSA',
                valor: this.form.value.glucosa,
                fecha: this.form.value.dateGlucosa
            }, {
                nombre: 'EX. COMP ORINA 1',
                valor: this.form.value.orina1,
                fecha: this.form.value.dateOrina1
            }, {
                nombre: 'EX. COMP ORINA 2',
                valor: this.form.value.orina2,
                fecha: this.form.value.dateOrina2
            }, {
                nombre: 'EX. COMP ORINA 3',
                valor: this.form.value.orina3,
                fecha: this.form.value.dateOrina3
            }, {
                nombre: 'BACTERIURIA',
                valor: this.form.value.bacteriuria,
                fecha: this.form.value.dateBacteriuria
            }, {
                nombre: 'NITRITOS',
                valor: this.form.value.nitritos,
                fecha: this.form.value.datevdrl1
            }, {
                nombre: 'UROCULTIVO',
                valor: this.form.value.urocultivo,
                fecha: this.form.value.dateUrocultivo
            }, {
                nombre: 'BK EN ESPUTO',
                valor: this.form.value.esputo,
                fecha: this.form.value.dateEsputo
            }, {
                nombre: 'WESTERN BOLT/IFI',
                valor: this.form.value.western,
                fecha: this.form.value.dateWestern
            }, {
                nombre: 'THLV1',
                valor: this.form.value.thlv1,
                fecha: this.form.value.dateThlv1
            }, {
                nombre: 'TORCH',
                valor: this.form.value.torch,
                fecha: this.form.value.dateTorch
            }, {
                nombre: 'GOTA GRUESA',
                valor: this.form.value.gotaGruesa,
                fecha: this.form.value.dateGotaGruesa
            }, {
                nombre: 'PROTEINURIA CUANTITATIVA',
                valor: this.form.value.proteinuriaCuanti,
                fecha: this.form.value.dateProteinuriaCuanti
            }, {
                nombre: 'PROTEINURIA CUALITATIVA',
                valor: this.form.value.proteinuriaCuali,
                fecha: this.form.value.dateProteinuriaCuali
            }, {
                nombre: 'SECRECION VAGINAL',
                valor: this.form.value.secrecionVag,
                fecha: this.form.value.dateSecrecionVag
            }, {
                nombre: 'PAP',
                valor: this.form.value.pap,
                fecha: this.form.value.datevdrl1
            }, {
                nombre: 'IVAA',
                valor: this.form.value.ivaa,
                fecha: this.form.value.dateIvaa
            }
        ]
    }

    guardarDatos() {
        this.recuperarDatos();
        console.log('data to save ', this.datosBasales);
        this.datosBasalesService.postDatosBasalesById(this.idGestante, this.datosBasales).subscribe((res: any) => {
            console.log('se guardo correctamente ', res.object);
            Swal.fire({
                icon: 'success',
                title: 'Registro',
                text: 'Fue creado con exito',
                showConfirmButton: false,
                timer: 1500,
            })
        });
    }

    loadData() {
        let auxVac;
        this.datosBasalesService.getDatosBasalesById(this.idGestante).subscribe((res: any) => {
            this.rptaDatosBasales = res.object;
            console.log('datos de embarazo', this.rptaDatosBasales)
            if (this.rptaDatosBasales == null)
                return
            auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "rubeola")
            this.form.patchValue({ 'rubeola': auxVac == undefined ? false : true });
            auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "hepatitis B")
            this.form.patchValue({ 'hepatitisB': auxVac == undefined ? false : true });
            auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "papiloma")
            this.form.patchValue({ 'papiloma': auxVac == undefined ? false : true });
            auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "influenza")
            this.form.patchValue({ 'influenza': auxVac == undefined ? false : true });
            auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "covid")
            this.form.patchValue({ 'covid': auxVac == undefined ? false : true });

            this.form.patchValue({ 'imc': this.rptaDatosBasales.pesoTalla.imc });
            this.form.patchValue({ 'pesoHabitual': this.rptaDatosBasales.pesoTalla.pesoHabitual });
            this.form.patchValue({ 'talla': this.rptaDatosBasales.pesoTalla.talla });
            this.form.patchValue({ 'nroDosisPrevias': this.rptaDatosBasales.antitetanica.nroDosisPrevia });
            if (this.rptaDatosBasales.antitetanica.dosis[0].dosis) {
                this.form.patchValue({ 'primeraDosis': this.rptaDatosBasales.antitetanica.dosis[0].dosis });
            } else {
                this.form.patchValue({ 'primeraDosis': "" });
            }
            if (this.rptaDatosBasales.antitetanica.dosis[1].dosis) {
                this.form.patchValue({ 'segundaDosis': this.rptaDatosBasales.antitetanica.dosis[1].dosis });
            } else {
                this.form.patchValue({ 'segundaDosis': "" });
            }

            this.form.patchValue({ 'firstDosis': this.rptaDatosBasales.antitetanica.dosis[0].detalle });
            this.form.patchValue({ 'secondDosis': this.rptaDatosBasales.antitetanica.dosis[1].detalle });
            this.form.patchValue({ 'tipoSangreGrupo': this.rptaDatosBasales.tipoSangre.grupo });
            this.form.patchValue({ 'rh': this.rptaDatosBasales.tipoSangre.rh });
            this.form.patchValue({ 'drogas': this.rptaDatosBasales.drogas });
            this.form.patchValue({ 'cigarrillosDia': this.rptaDatosBasales.nroCigarrosAlDia });
            if (this.rptaDatosBasales.fechaUltimaMestruacion.fum != null) {
                this.form.patchValue({ 'dateFUM': this.rptaDatosBasales.fechaUltimaMestruacion.fum });
            } else {
                this.form.patchValue({ 'dateFUM': "" });
            }
            this.form.patchValue({ 'duda': this.rptaDatosBasales.fechaUltimaMestruacion.duda });
            if (this.rptaDatosBasales.fechaUltimaMestruacion.fechaProbableParto) {
                this.form.patchValue({ 'dateProbableParto': this.rptaDatosBasales.fechaUltimaMestruacion.fechaProbableParto });
            } else {
                this.form.patchValue({ 'dateProbableParto': "" });
            }
            this.form.patchValue({ 'ecografia1': this.rptaDatosBasales.fechaUltimaMestruacion.primeraEcografia });
            this.form.patchValue({ 'dateEco1': this.rptaDatosBasales.fechaUltimaMestruacion.fechaPrimeraEcografia });
            this.form.patchValue({ 'ecografia2': this.rptaDatosBasales.fechaUltimaMestruacion.segundaEcografia });
            this.form.patchValue({ 'dateEco2': this.rptaDatosBasales.fechaUltimaMestruacion.fechaSegundaEcografia });
            this.form.patchValue({ 'ecografia3': this.rptaDatosBasales.fechaUltimaMestruacion.terceraEcografia });
            this.form.patchValue({ 'dateEco3': this.rptaDatosBasales.fechaUltimaMestruacion.fechaTerceraEcografia });
            this.form.patchValue({ 'hospitalizacion': this.rptaDatosBasales.hospitalizacion[0].hospitalizacion });
            this.form.patchValue({ 'dateHospitalizacion': this.rptaDatosBasales.hospitalizacion[0].fecha });
            this.form.patchValue({ 'diagnosticoHosp': this.rptaDatosBasales.hospitalizacion[0].diagnostico });
            if (this.rptaDatosBasales.hospitalizacion[0].cie10 != "") {
                this.CieService.getCIEByCod(this.rptaDatosBasales.hospitalizacion[0].cie10).subscribe((resCIE: any) => {
                    this.form.patchValue({ 'hospitalizacionCIE': resCIE.object });
                })
            }
            this.form.patchValue({ 'dateEmergencia': this.rptaDatosBasales.emergencia.fecha });
            this.form.patchValue({ 'diagnosticoEmergenci': this.rptaDatosBasales.emergencia.diagnostico });
            if (this.rptaDatosBasales.emergencia.cie10 != "") {
                this.CieService.getCIEByCod(this.rptaDatosBasales.emergencia.cie10).subscribe((resCIE: any) => {
                    this.form.patchValue({ 'emergenciaCIE': resCIE.object });
                });
            }
            this.form.patchValue({ 'tamizaje': this.rptaDatosBasales.violenciaGenero.fichaTamizaje });
            this.form.patchValue({ 'violencia': this.rptaDatosBasales.violenciaGenero.violencia });
            this.form.patchValue({ 'dateViolencia': this.rptaDatosBasales.violenciaGenero.fecha });
            this.form.patchValue({ 'dateViolencia': this.rptaDatosBasales.violenciaGenero.fecha });
            this.form.patchValue({ 'clinico': this.rptaDatosBasales.examenFisico[0].valor });
            this.form.patchValue({ 'mamas': this.rptaDatosBasales.examenFisico[1].valor });
            this.form.patchValue({ 'cuelloUter': this.rptaDatosBasales.examenFisico[2].valor });
            this.form.patchValue({ 'pelvis': this.rptaDatosBasales.examenFisico[3].valor });
            this.form.patchValue({ 'odont1': this.rptaDatosBasales.examenFisico[4].valor });
            this.form.patchValue({ 'odont2': this.rptaDatosBasales.examenFisico[5].valor });

            this.form.patchValue({ 'vdrl1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[0].valor });
            this.form.patchValue({ 'datevdrl1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[0].fecha });
            this.form.patchValue({ 'vdrl2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[1].valor });
            this.form.patchValue({ 'dateVdrl2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[1].fecha });
            this.form.patchValue({ 'tpha': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[2].valor });
            this.form.patchValue({ 'dateTpha': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[2].fecha });
            this.form.patchValue({ 'vih1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[3].valor });
            this.form.patchValue({ 'dateVih1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[3].fecha });
            this.form.patchValue({ 'vih2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[4].valor });
            this.form.patchValue({ 'dateVih2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[4].fecha });
            this.form.patchValue({ 'hepatitis': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[5].valor });
            this.form.patchValue({ 'dateHepatitis': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[5].fecha });
            this.form.patchValue({ 'elisa1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[6].valor });
            this.form.patchValue({ 'dateElisa1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[6].fecha });
            this.form.patchValue({ 'elisa2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[7].valor });
            this.form.patchValue({ 'dateElisa2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[7].fecha });
            this.form.patchValue({ 'glicemia1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[8].valor });
            this.form.patchValue({ 'dateGlicemia1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[8].fecha });
            this.form.patchValue({ 'glicemia2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[9].valor });
            this.form.patchValue({ 'dateGlicemia2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[9].fecha });
            this.form.patchValue({ 'glucosa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[10].valor });
            this.form.patchValue({ 'dateGlucosa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[10].fecha });

            this.form.patchValue({ 'orina1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[11].valor });
            this.form.patchValue({ 'dateOrina1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[11].fecha });
            this.form.patchValue({ 'orina2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[12].valor });
            this.form.patchValue({ 'dateOrina2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[12].fecha });
            this.form.patchValue({ 'orina3': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[13].valor });
            this.form.patchValue({ 'dateOrina3': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[13].fecha });
            this.form.patchValue({ 'bacteriuria': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[14].valor });
            this.form.patchValue({ 'dateBacteriuria': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[14].fecha });
            this.form.patchValue({ 'nitritos': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[15].valor });
            this.form.patchValue({ 'dateNitritos': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[15].fecha });
            this.form.patchValue({ 'urocultivo': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[16].valor });
            this.form.patchValue({ 'dateUrocultivo': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[16].fecha });
            this.form.patchValue({ 'esputo': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[17].valor });
            this.form.patchValue({ 'dateEsputo': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[17].fecha });
            this.form.patchValue({ 'western': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[18].valor });
            this.form.patchValue({ 'dateWestern': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[18].fecha });
            this.form.patchValue({ 'thlv1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[19].valor });
            this.form.patchValue({ 'dateThlv1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[19].fecha });
            this.form.patchValue({ 'torch': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[20].valor });
            this.form.patchValue({ 'dateTorch': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[20].fecha });
            this.form.patchValue({ 'gotaGruesa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[21].valor });
            this.form.patchValue({ 'dateGotaGruesa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[21].fecha });
            this.form.patchValue({ 'proteinuriaCuanti': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[22].valor });
            this.form.patchValue({ 'dateProteinuriaCuanti': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[22].fecha });
            this.form.patchValue({ 'proteinuriaCuali': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[23].valor });
            this.form.patchValue({ 'dateProteinuriaCuali': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[23].fecha });
            this.form.patchValue({ 'secrecionVag': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[24].valor });
            this.form.patchValue({ 'dateSecrecionVag': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[24].fecha });
            this.form.patchValue({ 'pap': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[25].valor });
            this.form.patchValue({ 'datePap': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[25].fecha });
            this.form.patchValue({ 'ivaa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[26].valor });
            this.form.patchValue({ 'dateIvaa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[26].fecha });
            this.listaPatologiasMaternas = this.rptaDatosBasales.patologiaMaternoDiagnosticado;
            this.form.patchValue({
                hg1: this.rptaDatosBasales.examenLaboratorio.hemoglobina[0].hg,
                conFactor1: this.rptaDatosBasales.examenLaboratorio.hemoglobina[0].conFactorCorreccion,
                hemo1: this.rptaDatosBasales.examenLaboratorio.hemoglobina[0].fecha,
                hg2: this.rptaDatosBasales.examenLaboratorio.hemoglobina[1].hg,
                conFactor2: this.rptaDatosBasales.examenLaboratorio.hemoglobina[1].conFactorCorreccion,
                hemo2: this.rptaDatosBasales.examenLaboratorio.hemoglobina[1].fecha,
                hg3: this.rptaDatosBasales.examenLaboratorio.hemoglobina[2].hg,
                conFactor3: this.rptaDatosBasales.examenLaboratorio.hemoglobina[2].conFactorCorreccion,
                hemo3: this.rptaDatosBasales.examenLaboratorio.hemoglobina[2].fecha,
            })
        });
    }

    filterCIE10(event) {
        this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.listaDeCIE = res.object
        })
    }

    selectedOption(event, cieType) {
        if (cieType == 0) {
            this.form.patchValue({ diagnosticoHosp: event.descripcionItem });
        }
        if (cieType == 1) {
            this.form.patchValue({ diagnosticoEmergenci: event.descripcionItem });
        }
    }

    selectedOptionNameCIE(event, cieType) {
        console.log('lista de cie ', this.listaDeCIE);
        if (cieType == 0) {
            this.form.patchValue({ diagnosticoHosp: event.descripcionItem });
            this.form.patchValue({ autocompleteHosp: "" });
            this.form.patchValue({ hospitalizacionCIE: event }, { emitEvent: false });
        }
        if (cieType == 1) {
            this.form.patchValue({ diagnosticoEmergenci: event.descripcionItem });
            this.form.patchValue({ autocompleteEmerg: "" });
            this.form.patchValue({ emergenciaCIE: event }, { emitEvent: false });
        }
    }

    calcularIMC() {
        // this.fecha = this.datePipe.transform(this.formCuposListar.value.fechaBusqueda, 'yyyy-MM-dd')
        let today = new Date().getTime();
        let auxFUM = new Date(this.form.value.dateFUM).getTime();
        console.log("FECHA", auxFUM);
        auxFUM = auxFUM + 0;
        console.log('auxFUM ', auxFUM, 'today ', today);
        let auxWeek = today - auxFUM;
        this.edadGestacional = auxWeek / (1000 * 60 * 60 * 24);
        let semanasGestacional = Math.trunc(this.edadGestacional / 7);
        let redondearDecimal = Math.round(this.form.value.talla)
        let alturaMetros = redondearDecimal / 100;
        let diasGestacional = Math.trunc(this.edadGestacional % 7);
        let rptaClasific: any;
        let pesoActual = this.form.value.pesoActual;
        let rptaRecomendaciones: any;
        let pesoHabitual;
        let imcAux;
        console.log("METROS", alturaMetros)
        if (semanasGestacional < 13) {
            this.imcService.getClasificacionEstadoNutricionalByTalla(alturaMetros).subscribe((res: any) => {
                // rptaClasific = res;
                rptaClasific = res.object.clasificaionEstadoNutricionalIMCPG[0];
                if (pesoActual <= rptaClasific.bajoPeso) {
                    this.imcService.getGananciaBajoPeso(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomendacionGestanteBajoPeso[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        console.log('peso Habitual ', pesoHabitual);
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'bajoPeso';
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                        console.log('imc ', imcAux);
                    });
                }
                if (pesoActual >= rptaClasific.normal18 && pesoActual <= rptaClasific.normal25) {
                    this.imcService.getGananciaPesoRegular(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomendacionGananciaPesoRegular[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'normal';
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                        console.log('imc ', imcAux);
                    });

                    console.log('peso normal ');
                }
                if (pesoActual >= rptaClasific.sobrePeso25 && pesoActual <= rptaClasific.sobrePeso30) {
                    this.imcService.getGananciaSobrePeso(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomencacionGananciaSobrePeso[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'sobrePeso';
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                        console.log('imc ', imcAux);
                        console.log('sobrepeso');
                    });
                }
                if (pesoActual >= rptaClasific.obesidad) {
                    this.imcService.getGananciaObesa(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomendacionGananciaObesa[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'obesidad';
                        console.log('imc ', imcAux);
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                    });
                }
            });
        } else {
            console.log('es mayor a 13 semanas ', semanasGestacional);
            this.imcService.getClasificacionEstadoNutricionalByTallaSemanas(semanasGestacional, alturaMetros * 100).subscribe((res: any) => {
                rptaClasific = res.object.edadGestacionalP10P90[0];
                console.log('es mddsdsds ', rptaClasific);

                if (pesoActual < rptaClasific.p10) {

                    this.imcService.getGananciaBajoPeso(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomendacionGestanteBajoPeso[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        console.log('peso Habitual ', pesoHabitual);
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'bajoPeso';
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                        console.log('imc ', imcAux);
                    });


                    this.tipoGananciaPeso = 'bajoPeso';
                    console.log(this.tipoGananciaPeso);
                }
                if (pesoActual >= rptaClasific.p10 && pesoActual <= rptaClasific.p90) {
                    this.imcService.getGananciaPesoRegular(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomendacionGananciaPesoRegular[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'normal';
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                        console.log('imc ', imcAux);
                    });
                }
                if (pesoActual > rptaClasific.p90) {
                    this.imcService.getGananciaSobrePeso(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomencacionGananciaSobrePeso[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'sobrePeso';
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                        console.log('imc ', imcAux);
                        console.log('sobrepeso');
                    });
                }
                if (pesoActual > rptaClasific.p90 + 10) {
                    this.imcService.getGananciaObesa(semanasGestacional).subscribe((res: any) => {
                        rptaRecomendaciones = res.object.recomendacionGananciaObesa[0];
                        if (alturaMetros < 1.57)
                            pesoHabitual = pesoActual - rptaRecomendaciones.min
                        else
                            pesoHabitual = pesoActual - rptaRecomendaciones.med
                        imcAux = pesoHabitual / Math.pow(alturaMetros, 2);
                        this.tipoGananciaPeso = 'obesidad';
                        console.log('imc ', imcAux);
                        this.form.patchValue({ imc: imcAux.toFixed(2) });
                        this.form.patchValue({ pesoHabitual: pesoHabitual });
                    });
                }
            });
        }

        let fum: any = new DatePipe('en-CO').transform(this.form.value.dateFUM, 'yyyy/MM/dd').split("/");
        console.log('split date ', fum);
        let newDay: any = parseInt(fum[2]) + 7;
        let newMonth: any = parseInt(fum[1]) - 3;
        let newYear: any = parseInt(fum[0]);

        console.log('enfrio ', newDay);
        if (newMonth == 2) {
            if (newDay > 28 && newDay <= 30) {
                newDay = newDay - 28;
                newMonth = newMonth + 1;
            }
        }
        if (parseInt(fum[1]) <= 3) {
            newMonth = 12 + newMonth;
        } else {
            newYear = (newYear) + 1;
        }
        console.log('enfrio 2 ', newDay);
        if (newDay > 30) {
            console.log('actual day ', newDay);
            newDay = newDay - 30;
            newMonth = newMonth + 1
        }
        if (newMonth > 12) {
            newMonth = newMonth - 12
            newYear = newYear + 1
        }
        if (newDay < 10) {
            newDay = '0' + newDay
        }
        if (newMonth < 10) {
            newMonth = '0' + newMonth
        }

        let auxBirth = newYear + '-' + newMonth + '-' + newDay;
        console.log(' posible fecha ', auxBirth);
        fum = new Date(fum);
        fum.setMonth(fum.getMonth() + 9);
        fum.setDate(fum.getDate() + 7);
        this.form.patchValue({ dateProbableParto: auxBirth });
    }

    openDialogHemoglobina() {
        this.ref = this.dialog.open(HemoglobinaDialogComponent, {
            header: "HEMOGLOBINA EXTRA",
            width: "50%",
            height: "500px",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            data: {
                texto: 'datossss'
            }
        });

        this.ref.onClose.subscribe((data: any) => {
            this.otrosExamHemo = data;
            console.log('data de dialog hemoglobina ', data)
        });
    }

    openDialogPatologias() {
        this.ref = this.dialog.open(DialogPatologiasMaternasComponent, {
            header: "PATOLOGIAS MATERNAS DIAGNOSTICADAS",
            width: "30%",
            height: "auto",
            contentStyle: {
                "max-height": "500px",
            },
            data: {
                texto: 'datossss'
            }
        });
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de dialog ', data);
            if (data.nombre != '') {
                this.listaPatologiasMaternas.push(data);
            }
        })
    }

    eliminarPatologia(index) {
        this.listaPatologiasMaternas.splice(index, 1);
    }

    openLaboResultDialog() {
        this.ref = this.dialog.open(LaboratoryResultDialogComponent, {
            header: "Resultados de Laboratorio",
            width: "70%",
            height: "auto",
            contentStyle: {
                "max-height": "500px",
            },
        });
        console.log('data de labos ');
    }
}
