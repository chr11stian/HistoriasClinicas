import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-basales',
  templateUrl: './datos-basales.component.html',
  styleUrls: ['./datos-basales.component.css']
})
export class DatosBasalesComponent implements OnInit {

  form: FormGroup;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  city: any;
  examenFisico: any;
  hemoglobina: any;
  listExamenFisico = [
    { key: '0', value: 'clinico' },
    { key: '1', value: 'mamas' },
    { key: '2', value: 'cuello uterino' },
    { key: '3', value: 'pelvis' },
    { key: '4', value: 'odontologia 1' },
    { key: '5', value: 'odontologia 2' },
  ];
  datosBasales: any;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicalizarForm();
  }

  ngOnInit(): void {

  }

  inicalizarForm() {
    this.form = this.fb.group({
      imc: new FormControl(''),
      pesoHabitual: new FormControl(''),
      talla: new FormControl(''),
      check: new FormControl(''),
      nroDosisPrevias: new FormControl(''),
      primeraDosis: new FormControl(''),
      segundaDosis: new FormControl(''),
      firstDosis: new FormControl(''),
      secondDosis: new FormControl(''),
      a: new FormControl(''),
      drogas: new FormControl(''),
      date: new FormControl(''),
      rdo: new FormControl(''),
      console: new FormControl(''),
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
    });
  }

  fnCheckbox(value) {
    console.log(value);
  }

  recuperarDatos() {
    // this.recuperarExamenFisico();
    this.recuperarHemoglobina();
    let vacPrev: string[] = [];

    let aux1: boolean = this.form.value.rubeola;
    let aux2: boolean = this.form.value.hepatitisB;
    let aux3: boolean = this.form.value.papiloma;
    let aux4: boolean = this.form.value.influenza;

    if (aux1) {
      vacPrev.push('Rubeola');
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
        nroDosisPrevias: this.form.value.nroDosisPrevias,
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
      nroCigarrillosAlDia: this.form.value.cigarrillosDia,
      drogas: this.form.value.drogas,
      fechaUltimaMenstruacion: {
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
      }
    }
  }

  guardarDatos() {
    this.recuperarDatos();
    // this.recuperarHemoglobina()
    console.log('data to save ', this.datosBasales);


    console.log('examen fisico ', this.form.value.clinico);
    // this.recuperarExamenFisico();
    // const splited = auxExamClin.split("-");
    // console.log('splited data ', splited);
  }

  recuperarExamenFisico() {
    // this.examenFisico = '';
    let auxExamClin = this.form.value.clinico;
    let auxExamMamas = this.form.value.mamas;
    let auxExamCuelloUte = this.form.value.cuelloUter;
    let auxExamPelvis = this.form.value.pelvis;
    let auxExamOdont1 = this.form.value.odont1;
    let auxExamOdont2 = this.form.value.odont2;
    const splitedClinico = auxExamClin.split("-");
    const splitedMamas = auxExamMamas.split("-");
    const splitedCuelloUte = auxExamCuelloUte.split("-");
    const splitedPelvis = auxExamPelvis.split("-");
    const splitedOdont1 = auxExamOdont1.split("-");
    const splitedOdont2 = auxExamOdont2.split("-");
    console.log('name exam fis ', this.listExamenFisico['0'].value);
    this.examenFisico = [
      {
        nombre: this.listExamenFisico[splitedClinico[0]].value,
        valor: splitedClinico[1]
      }, {
        nombre: this.listExamenFisico[splitedMamas[0]].value,
        valor: splitedMamas[1]
      }, {
        nombre: this.listExamenFisico[splitedCuelloUte[0]].value,
        valor: splitedCuelloUte[1]
      }, {
        nombre: this.listExamenFisico[splitedPelvis[0]].value,
        valor: splitedPelvis[1]
      }, {
        nombre: this.listExamenFisico[splitedOdont1[0]].value,
        valor: splitedOdont1[1]
      }, {
        nombre: this.listExamenFisico[splitedOdont2[0]].value,
        valor: splitedOdont2[1]
      }
    ]
    console.log('data examen fisico ', this.examenFisico);
  }

  recuperarHemoglobina() {
    this.hemoglobina = [
      { descripcion: 'hemoglobina 1', hg: this.form.value.hg1, conFactorCorrecion: this.form.value.conFactor1, fecha: this.form.value.hemo1 },
      { descripcion: 'hemoglobina 2', hg: this.form.value.hg2, conFactorCorrecion: this.form.value.conFactor2, fecha: this.form.value.hemo2 },
      { descripcion: 'hemoglobina 3', hg: this.form.value.hg3, conFactorCorrecion: this.form.value.conFactor3, fecha: this.form.value.hemo3 },
      { descripcion: 'hemoglobina 4', hg: this.form.value.hg4, conFactorCorrecion: this.form.value.conFactor4, fecha: this.form.value.hemo4 },
    ]
  }

  rbtn() {
    const auxHemo1 = (this.form.value.clinico).split("-")
    console.log('split rbtn', auxHemo1);
  }
}
