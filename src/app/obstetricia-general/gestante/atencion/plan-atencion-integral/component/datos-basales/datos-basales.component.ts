import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";

@Component({
  selector: 'app-datos-basales',
  templateUrl: './datos-basales.component.html',
  styleUrls: ['./datos-basales.component.css']
})
export class DatosBasalesComponent implements OnInit {

  form: FormGroup;
  id:any;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  city: any;
  datosBasales: any;

  constructor(private filiancionService: FiliancionService,
    private fb: FormBuilder,
  ) {
    this.inicalizarForm();
  }

  ngOnInit(): void {
   this.id=this.filiancionService.id;
   console.log(this.id);
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

  recuperarDatos() {
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
      fechaUltimaMenstruacion:{
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
        
      }]
    }
  }

  guardarDatos() {
    this.recuperarDatos();
    console.log('data to save ', this.datosBasales);
  }
}
