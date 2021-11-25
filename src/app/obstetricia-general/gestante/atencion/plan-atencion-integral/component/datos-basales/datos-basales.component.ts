import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FiliancionService } from "../../services/filiancion-atenciones/filiancion.service";

import { DatosBasalesService } from '../../services/datos-basales/datos-basales.service';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-datos-basales',
  templateUrl: './datos-basales.component.html',
  styleUrls: ['./datos-basales.component.css']
})
export class DatosBasalesComponent implements OnInit {

  form: FormGroup;
  id: any;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  city: any;
  examenFisico: any;
  hemoglobina: any;
  datosBasales: any;
  otrosExamenes: any;
  rptaDatosBasales: any;
  idGestante: string;
  listaDeCIE = [
    { "name": "Afghanistan", "code": "AF" },
    { "name": "Åland Islands", "code": "AX" },
    { "name": "Albania", "code": "AL" },
    { "name": "Algeria", "code": "DZ" },
    { "name": "American Samoa", "code": "AS" },
    { "name": "Andorra", "code": "AD" },
    { "name": "Angola", "code": "AO" },
  ]



  constructor(private filiancionService: FiliancionService,
    private fb: FormBuilder,
    private datosBasalesService: DatosBasalesService,
    private obstetriciaService: ObstetriciaGeneralService,
    private messageService: MessageService,
  ) {
    this.inicalizarForm();
    this.idGestante = this.obstetriciaService.idGestacion

    console.log('id en datos basales ', this.idGestante);
  }

  ngOnInit(): void {
    this.id = this.filiancionService.id;
    console.log(this.id);
    this.loadData();
  }

  inicalizarForm() {
    this.form = this.fb.group({
      imc: new FormControl(''),
      pesoHabitual: new FormControl(''),
      talla: new FormControl(''),
      nroDosisPrevias: new FormControl(''),
      primeraDosis: new FormControl(''),
      segundaDosis: new FormControl(''),
      firstDosis: new FormControl(''),
      secondDosis: new FormControl(''),
      drogas: new FormControl(''),
      aplica: new FormControl(''),
      sinDosis: new FormControl(''),
      dosisNoAplica: new FormControl(''),
      cigarrillosDia: new FormControl(''),
      tipoSangreGrupo: new FormControl(''),
      rh: new FormControl(''),
      duda: new FormControl(''),
      hospitalizacion: new FormControl(''),
      diagnosticoHosp: new FormControl(''),
      diagnosticoEmergenci: new FormControl(''),
      hospitalizacionCIE: new FormControl(''),
      emergenciaCIE: new FormControl(''),
      rubeola: new FormControl(''),
      hepatitisB: new FormControl(''),
      papiloma: new FormControl(''),
      influenza: new FormControl(''),
      tamizaje: new FormControl(''),
      violencia: new FormControl(''),
      clinico: new FormControl(''),
      mamas: new FormControl(''),
      cuelloUter: new FormControl(''),
      pelvis: new FormControl(''),
      odont1: new FormControl(''),
      odont2: new FormControl(''),
      hg1: new FormControl(''),
      conFactor1: new FormControl(''),
      hemo1: new FormControl(''),
      hg2: new FormControl(''),
      conFactor2: new FormControl(''),
      hemo2: new FormControl(''),
      hg3: new FormControl(''),
      conFactor3: new FormControl(''),
      hemo3: new FormControl(''),
      hg4: new FormControl(''),
      conFactor4: new FormControl(''),
      hemo4: new FormControl(''),
      vdrl1: new FormControl(''),
      vdrl2: new FormControl(''),
      tpha: new FormControl(''),
      dateVdrl2: new FormControl(''),
      dateVih2: new FormControl(''),
      vih1: new FormControl(''),
      vih2: new FormControl(''),
      hepatitis: new FormControl(''),
      elisa1: new FormControl(''),
      elisa2: new FormControl(''),
      glicemia1: new FormControl(''),
      glicemia2: new FormControl(''),
      glucosa: new FormControl(''),
      orina1: new FormControl(''),
      orina2: new FormControl(''),
      orina3: new FormControl(''),
      bacteriuria: new FormControl(''),
      nitritos: new FormControl(''),
      urocultivo: new FormControl(''),
      esputo: new FormControl(''),
      western: new FormControl(''),
      thlv1: new FormControl(''),
      torch: new FormControl(''),
      gotaGruesa: new FormControl(''),
      proteinuriaCuanti: new FormControl(''),
      proteinuriaCuali: new FormControl(''),
      secrecionVag: new FormControl(''),
      pap: new FormControl(''),
      ivaa: new FormControl(''),
      patologiasMaternas1: new FormControl(''),
      patologiasMaternas2: new FormControl(''),
      patologiasMaternas3: new FormControl(''),
      patologiasMaternas4: new FormControl(''),
      dateFUM: new FormControl(''),
      dateProbableParto: new FormControl(''),
      ecografia1: new FormControl(''),
      dateEco1: new FormControl(''),
      ecografia2: new FormControl(''),
      dateEco2: new FormControl(''),
      ecografia3: new FormControl(''),
      dateEco3: new FormControl(''),
      dateHospitalizacion: new FormControl(''),
      dateEmergencia: new FormControl(''),
      dateViolencia: new FormControl(''),
      datevdrl1: new FormControl(''),
      dateTpha: new FormControl(''),
      dateVih1: new FormControl(''),
      dateHepatitis: new FormControl(''),
      dateElisa1: new FormControl(''),
      dateElisa2: new FormControl(''),
      dateGlicemia1: new FormControl(''),
      dateGlicemia2: new FormControl(''),
      dateGlucosa: new FormControl(''),
      dateOrina1: new FormControl(''),
      dateOrina2: new FormControl(''),
      dateOrina3: new FormControl(''),
      dateBacteriuria: new FormControl(''),
      dateNitritos: new FormControl(''),
      dateUrocultivo: new FormControl(''),
      dateEsputo: new FormControl(''),
      dateWestern: new FormControl(''),
      dateThlv1: new FormControl(''),
      dateTorch: new FormControl(''),
      dateGotaGruesa: new FormControl(''),
      dateProteinuriaCuanti: new FormControl(''),
      dateProteinuriaCuali: new FormControl(''),
      dateSecrecionVag: new FormControl(''),
      datePap: new FormControl(''),
      dateIvaa: new FormControl(''),
      datePatolog1: new FormControl(''),
      datePatolog2: new FormControl(''),
      datePatolog3: new FormControl(''),
      datePatolog4: new FormControl(''),
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

    if (aux1) {
      vacPrev.push('rubeola');
    }
    if (aux2) {
      vacPrev.push('hepatitis B')
    }
    if (aux3) {
      vacPrev.push('papiloma')
    }
    if (aux4) {
      vacPrev.push('influenza')
    }
    this.datosBasales = {
      pesoTalla: {
        imc: this.form.value.imc,
        pesoHabitual: this.form.value.pesoHabitual,
        talla: this.form.value.talla
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
        cie10: this.form.value.hospitalizacionCIE,
      }],
      emergencia: {
        fecha: this.form.value.dateEmergencia,
        diagnostico: this.form.value.diagnosticoEmergenci,
        cie10: this.form.value.emergenciaCIE
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
      patologiaMaternoDiagnosticado: [
        {
          nombre: this.form.value.patologiasMaternas1,
          fecha: this.form.value.datePatolog1
        },
        {
          nombre: this.form.value.patologiasMaternas2,
          fecha: this.form.value.datePatolog2
        },
        {
          nombre: this.form.value.patologiasMaternas3,
          fecha: this.form.value.datePatolog3
        },
        {
          nombre: this.form.value.patologiasMaternas4,
          fecha: this.form.value.datePatolog4
        }
      ],
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
        descripcion: 'hemoglobina 1',
        hg: this.form.value.hg1,
        conFactorCorrecion: this.form.value.conFactor1,
        fecha: this.form.value.hemo1
      },
      {
        descripcion: 'hemoglobina 2',
        hg: this.form.value.hg2,
        conFactorCorrecion: this.form.value.conFactor2,
        fecha: this.form.value.hemo2
      },
      {
        descripcion: 'hemoglobina 3',
        hg: this.form.value.hg3,
        conFactorCorrecion: this.form.value.conFactor3,
        fecha: this.form.value.hemo3
      },
      {
        descripcion: 'hemoglobina 4',
        hg: this.form.value.hg4,
        conFactorCorrecion: this.form.value.conFactor4,
        fecha: this.form.value.hemo4
      },
    ]
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
        nombre: 'TPHA/VDRL (RPR reactivo)',
        valor: this.form.value.tpha,
        fecha: this.form.value.dateTpha
      }, {
        nombre: 'VIH Prueba Rapida 1',
        valor: this.form.value.vih1,
        fecha: this.form.value.dateVih1
      }, {
        nombre: 'VIH Prueba Rapida 2',
        valor: this.form.value.vih2,
        fecha: this.form.value.dateVih2
      }, {
        nombre: 'PR Hepatitis',
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
        nombre: 'Glicemia 1',
        valor: this.form.value.glicemia1,
        fecha: this.form.value.dateGlicemia1
      }, {
        nombre: 'Glicemia 2',
        valor: this.form.value.glicemia2,
        fecha: this.form.value.dateGlicemia2
      }, {
        nombre: 'Tolerancia Glucosa',
        valor: this.form.value.glucosa,
        fecha: this.form.value.dateGlucosa
      }, {
        nombre: 'Ex. Comp Orina 1',
        valor: this.form.value.orina1,
        fecha: this.form.value.dateOrina1
      }, {
        nombre: 'Ex. Comp Orina 2',
        valor: this.form.value.orina2,
        fecha: this.form.value.dateOrina2
      }, {
        nombre: 'Ex. Comp Orina 3',
        valor: this.form.value.orina3,
        fecha: this.form.value.dateOrina3
      }, {
        nombre: 'Bacteriuria',
        valor: this.form.value.bacteriuria,
        fecha: this.form.value.dateBacteriuria
      }, {
        nombre: 'Nitritos',
        valor: this.form.value.nitritos,
        fecha: this.form.value.datevdrl1
      }, {
        nombre: 'Urocultivo',
        valor: this.form.value.urocultivo,
        fecha: this.form.value.dateUrocultivo
      }, {
        nombre: 'BK en Esputo',
        valor: this.form.value.esputo,
        fecha: this.form.value.dateEsputo
      }, {
        nombre: 'Western Bolt/Ifi',
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
        nombre: 'Gota Gruesa',
        valor: this.form.value.gotaGruesa,
        fecha: this.form.value.dateGotaGruesa
      }, {
        nombre: 'Proteinuria Cuantitativa',
        valor: this.form.value.proteinuriaCuanti,
        fecha: this.form.value.dateProteinuriaCuanti
      }, {
        nombre: 'Proteinuria Cualitativa',
        valor: this.form.value.proteinuriaCuali,
        fecha: this.form.value.dateProteinuriaCuali
      }, {
        nombre: 'Secreción Vaginal',
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

    this.datosBasalesService.postDatosBasalesById(this.idGestante, this.datosBasales).subscribe((res: any) => {
      console.log('se guardo correctamente ', res.object);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    });
  }

  loadData() {
    let auxVac;
    this.datosBasalesService.getDatosBasalesById(this.idGestante).subscribe((res: any) => {
      this.rptaDatosBasales = res.object;
      console.log('datos de embarazo', this.rptaDatosBasales)
      this.form.patchValue({ 'imc': this.rptaDatosBasales.pesoTalla.imc });
      this.form.patchValue({ 'pesoHabitual': this.rptaDatosBasales.pesoTalla.pesoHabitual });
      this.form.patchValue({ 'talla': this.rptaDatosBasales.pesoTalla.talla });
      this.form.patchValue({ 'nroDosisPrevias': this.rptaDatosBasales.antitetanica.nroDosisPrevia });
      this.form.patchValue({ 'primeraDosis': new Date(this.rptaDatosBasales.antitetanica.dosis[0].dosis) });
      this.form.patchValue({ 'segundaDosis': new Date(this.rptaDatosBasales.antitetanica.dosis[1].dosis) });
      this.form.patchValue({ 'firstDosis': this.rptaDatosBasales.antitetanica.dosis[0].detalle });
      this.form.patchValue({ 'secondDosis': this.rptaDatosBasales.antitetanica.dosis[1].detalle });
      this.form.patchValue({ 'tipoSangreGrupo': this.rptaDatosBasales.tipoSangre.grupo });
      this.form.patchValue({ 'rh': this.rptaDatosBasales.tipoSangre.rh });
      this.form.patchValue({ 'drogas': this.rptaDatosBasales.drogas });
      this.form.patchValue({ 'cigarrillosDia': this.rptaDatosBasales.nroCigarrosAlDia });
      this.form.patchValue({ 'dateFUM': new Date(this.rptaDatosBasales.fechaUltimaMestruacion.fum) });
      this.form.patchValue({ 'duda': this.rptaDatosBasales.fechaUltimaMestruacion.duda });
      this.form.patchValue({ 'dateProbableParto': new Date(this.rptaDatosBasales.fechaUltimaMestruacion.fechaProbableParto) });
      this.form.patchValue({ 'ecografia1': this.rptaDatosBasales.fechaUltimaMestruacion.primeraEcografia });
      this.form.patchValue({ 'dateEco1': new Date(this.rptaDatosBasales.fechaUltimaMestruacion.fechaPrimeraEcografia) });
      this.form.patchValue({ 'ecografia2': this.rptaDatosBasales.fechaUltimaMestruacion.segundaEcografia });
      this.form.patchValue({ 'dateEco2': new Date(this.rptaDatosBasales.fechaUltimaMestruacion.fechaSegundaEcografia) });
      this.form.patchValue({ 'ecografia3': this.rptaDatosBasales.fechaUltimaMestruacion.terceraEcografia });
      this.form.patchValue({ 'dateEco3': new Date(this.rptaDatosBasales.fechaUltimaMestruacion.fechaTerceraEcografia) });
      this.form.patchValue({ 'hospitalizacion': this.rptaDatosBasales.hospitalizacion[0].hospitalizacion });
      this.form.patchValue({ 'dateHospitalizacion': new Date(this.rptaDatosBasales.hospitalizacion[0].fecha) });
      this.form.patchValue({ 'diagnosticoHosp': this.rptaDatosBasales.hospitalizacion[0].diagnostico });
      this.form.patchValue({ 'hospitalizacionCIE': this.rptaDatosBasales.hospitalizacion[0].cie10 });
      this.form.patchValue({ 'dateEmergencia': new Date(this.rptaDatosBasales.emergencia.fecha) });
      this.form.patchValue({ 'diagnosticoEmergenci': this.rptaDatosBasales.emergencia.diagnostico });
      this.form.patchValue({ 'emergenciaCIE': this.rptaDatosBasales.emergencia.cie10 });
      auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "rubeola")
      this.form.patchValue({ 'rubeola': auxVac == undefined ? false : true });
      auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "hepatitis B")
      this.form.patchValue({ 'hepatitisB': auxVac == undefined ? false : true });
      auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "papiloma")
      this.form.patchValue({ 'papiloma': auxVac == undefined ? false : true });
      auxVac = this.rptaDatosBasales.vacunasPrevias.find(item => item == "influenza")
      this.form.patchValue({ 'influenza': auxVac == undefined ? false : true });
      this.form.patchValue({ 'tamizaje': this.rptaDatosBasales.violenciaGenero.fichaTamizaje });
      this.form.patchValue({ 'violencia': this.rptaDatosBasales.violenciaGenero.violencia });
      this.form.patchValue({ 'dateViolencia': new Date(this.rptaDatosBasales.violenciaGenero.fecha) });
      this.form.patchValue({ 'dateViolencia': new Date(this.rptaDatosBasales.violenciaGenero.fecha) });
      this.form.patchValue({ 'clinico': this.rptaDatosBasales.examenFisico[0].valor });
      this.form.patchValue({ 'mamas': this.rptaDatosBasales.examenFisico[1].valor });
      this.form.patchValue({ 'cuelloUter': this.rptaDatosBasales.examenFisico[2].valor });
      this.form.patchValue({ 'pelvis': this.rptaDatosBasales.examenFisico[3].valor });
      this.form.patchValue({ 'odont1': this.rptaDatosBasales.examenFisico[4].valor });
      this.form.patchValue({ 'odont2': this.rptaDatosBasales.examenFisico[5].valor });

      this.form.patchValue({ 'vdrl1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[0].valor });
      this.form.patchValue({ 'datevdrl1': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[0].fecha) });
      this.form.patchValue({ 'vdrl2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[1].valor });
      this.form.patchValue({ 'dateVdrl2': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[1].fecha) });
      this.form.patchValue({ 'tpha': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[2].valor });
      this.form.patchValue({ 'dateTpha': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[2].fecha) });
      this.form.patchValue({ 'vih1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[3].valor });
      this.form.patchValue({ 'dateVih1': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[3].fecha) });
      this.form.patchValue({ 'vih2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[4].valor });
      this.form.patchValue({ 'dateVih2': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[4].fecha) });
      this.form.patchValue({ 'hepatitis': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[5].valor });
      this.form.patchValue({ 'dateHepatitis': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[5].fecha) });
      this.form.patchValue({ 'elisa1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[6].valor });
      this.form.patchValue({ 'dateElisa1': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[6].fecha) });
      this.form.patchValue({ 'elisa2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[7].valor });
      this.form.patchValue({ 'dateElisa2': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[7].fecha) });
      this.form.patchValue({ 'glicemia1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[8].valor });
      this.form.patchValue({ 'dateGlicemia1': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[8].fecha) });
      this.form.patchValue({ 'glicemia2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[9].valor });
      this.form.patchValue({ 'dateGlicemia2': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[9].fecha) });
      this.form.patchValue({ 'glucosa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[10].valor });
      this.form.patchValue({ 'dateGlucosa': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[10].fecha) });

      this.form.patchValue({ 'orina1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[11].valor });
      this.form.patchValue({ 'dateOrina1': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[11].fecha) });
      this.form.patchValue({ 'orina2': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[12].valor });
      this.form.patchValue({ 'dateOrina2': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[12].fecha) });
      this.form.patchValue({ 'orina3': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[13].valor });
      this.form.patchValue({ 'dateOrina3': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[13].fecha) });
      this.form.patchValue({ 'bacteriuria': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[14].valor });
      this.form.patchValue({ 'dateBacteriuria': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[14].fecha) });
      this.form.patchValue({ 'nitritos': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[15].valor });
      this.form.patchValue({ 'dateNitritos': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[15].fecha) });
      this.form.patchValue({ 'urocultivo': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[16].valor });
      this.form.patchValue({ 'dateUrocultivo': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[16].fecha) });
      this.form.patchValue({ 'esputo': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[17].valor });
      this.form.patchValue({ 'dateEsputo': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[17].fecha) });
      this.form.patchValue({ 'western': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[18].valor });
      this.form.patchValue({ 'dateWestern': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[18].fecha) });
      this.form.patchValue({ 'thlv1': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[19].valor });
      this.form.patchValue({ 'dateThlv1': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[19].fecha) });
      this.form.patchValue({ 'torch': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[20].valor });
      this.form.patchValue({ 'dateTorch': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[20].fecha) });
      this.form.patchValue({ 'gotaGruesa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[21].valor });
      this.form.patchValue({ 'dateGotaGruesa': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[21].fecha) });
      this.form.patchValue({ 'proteinuriaCuanti': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[22].valor });
      this.form.patchValue({ 'dateProteinuriaCuanti': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[22].fecha) });
      this.form.patchValue({ 'proteinuriaCuali': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[23].valor });
      this.form.patchValue({ 'dateProteinuriaCuali': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[23].fecha) });
      this.form.patchValue({ 'secrecionVag': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[24].valor });
      this.form.patchValue({ 'dateSecrecionVag': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[24].fecha) });
      this.form.patchValue({ 'pap': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[25].valor });
      this.form.patchValue({ 'datePap': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[25].fecha) });
      this.form.patchValue({ 'ivaa': this.rptaDatosBasales.examenLaboratorio.otrosExamenes[26].valor });
      this.form.patchValue({ 'dateIvaa': new Date(this.rptaDatosBasales.examenLaboratorio.otrosExamenes[26].fecha) });

      this.form.patchValue({ 'patologiasMaternas1': this.rptaDatosBasales.patologiaMaternoDiagnosticado[0].nombre });
      this.form.patchValue({ 'datePatolog1': new Date(this.rptaDatosBasales.patologiaMaternoDiagnosticado[0].fecha) });
      this.form.patchValue({ 'patologiasMaternas2': this.rptaDatosBasales.patologiaMaternoDiagnosticado[1].nombre });
      this.form.patchValue({ 'datePatolog2': new Date(this.rptaDatosBasales.patologiaMaternoDiagnosticado[1].fecha) });
      this.form.patchValue({ 'patologiasMaternas3': this.rptaDatosBasales.patologiaMaternoDiagnosticado[2].nombre });
      this.form.patchValue({ 'datePatolog3': new Date(this.rptaDatosBasales.patologiaMaternoDiagnosticado[2].fecha) });
      this.form.patchValue({ 'patologiasMaternas4': this.rptaDatosBasales.patologiaMaternoDiagnosticado[3].nombre });
      this.form.patchValue({ 'datePatolog4': new Date(this.rptaDatosBasales.patologiaMaternoDiagnosticado[3].fecha) });;
    });
  }

  filterCountry(event) {
    console.log('event autocomplete ', event, this.listaDeCIE)
    this.listaDeCIE = this.listaDeCIE;
  }
}
