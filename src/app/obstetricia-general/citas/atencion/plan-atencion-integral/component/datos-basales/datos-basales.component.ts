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
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  city: any;

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
      hemo1: new FormControl(''),
      hemo2: new FormControl(''),
      hemo3: new FormControl(''),
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
}
