import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: 'app-recien-nacido-dialogo',
  templateUrl: './recien-nacido-dialogo.component.html',
  styleUrls: ['./recien-nacido-dialogo.component.css']
})
export class RecienNacidoDialogoComponent implements OnInit {
  form: FormGroup;
  formEgresoRN: FormGroup;
  stateOptions: any[];
  todosEgresosDelRN: any[];
  RNDialog: boolean;
  egresoRNDialog: boolean;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
    this.todosEgresosDelRN = [{
      fecha: "12-05-2021",
      reIngreso: "Si",
      diagnostico: "Presenta sintomas de alerta",
      fechaIngreso: "13-05-2021"
    },
    {
      fecha: "16-05-2021",
      reIngreso: "No",
      diagnostico: "Presenta sintomas leves",
      fechaIngreso: "17-05-2021"
    },
    {
      fecha: "19-05-2021",
      reIngreso: "Si",
      diagnostico: "Presenta sintomas de peligro",
      fechaIngreso: "20-05-2021"
    },
    {
      fecha: "16-05-2021",
      reIngreso: "No",
      diagnostico: "Presenta sintomas leves",
      fechaIngreso: "17-05-2021"
    },
    {
      fecha: "19-05-2021",
      reIngreso: "Si",
      diagnostico: "Presenta sintomas de peligro",
      fechaIngreso: "20-05-2021"
    }
    ]
    
  }
  buildForm() {
    this.form = this.formBuilder.group({
      sexo: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      perimetroCefalico: ['', [Validators.required]],
      temperatura: ['', [Validators.required]],
      pesoRN: ['', [Validators.required]],
      talla: ['', [Validators.required]],
      recienNacidoHcl: ['', [Validators.required]],
      nombreRecienNacido: ['', [Validators.required]],
      sinPatologias: ['', [Validators.required]],
      edadPorExamenFisico: ['', [Validators.required]],
      apgar1: ['', [Validators.required]],
      apgar2: ['', [Validators.required]],
      semanasRN: ['', [Validators.required]],
      detalleApgar1: ['', [Validators.required]],
      detalleApgar2: ['', [Validators.required]],
      pesoEdadGes: ['', [Validators.required]],
      reanimacion: ['', [Validators.required]],
      medicacionReanimacionRecienNacido: ['', [Validators.required]],
      vitaminaK: ['', [Validators.required]],
      profilaxisOcular: ['', [Validators.required]],
      controlPuerperioInmediato: ['', [Validators.required]],
      examenFisico: ['', [Validators.required]],
      examenVih: ['', [Validators.required]],
      hospitalizacion: ['', [Validators.required]],
      necropsia: ['', [Validators.required]],
      sLueticaVdrlRpr: ['', [Validators.required]],
      alojamientoConjunto: ['', [Validators.required]],
      contactoPielaPielLmh: ['', [Validators.required]],
      lme: ['', [Validators.required]],
      deposiciones: ['', [Validators.required]],
      ictericiaPrecoz: ['', [Validators.required]],
      bcg: ['', [Validators.required]],
      hepatitisb: ['', [Validators.required]],
      fechaRN: ['', [Validators.required]],
      egresoRN: ['', [Validators.required]],
      dxFallecimiento: [''],
      dxFallecimientoNoAplica: [''],
      dxTraslado: [''],
      dxTrasladoNoAplica: [''],
      establecimientoTras: [''],
      estaNoAplica: [''],
      alimentoAlta: ['', [Validators.required]],
      tsh: ['', [Validators.required]],
      pesoEgreso: ['', [Validators.required]],
      fechaIngresoMaterno: ['', [Validators.required]],
      reIngreso: ['', [Validators.required]],
      egresoMaterno: ['', [Validators.required]],
      dxMaternoFallecimiento: [''],
      dxMfNoAplica: [''],
      dxMaternoTraslado: [''],
      dxMtNoAplica: [''],
      MaternoEstablecimientoTras: [''],
      MaternoEstaNoAplica: [''],
      anticonceptivos: ['', [Validators.required]],
      grupo: ['', [Validators.required]],
      rh: ['', [Validators.required]],
    })
    this.formEgresoRN = this.formBuilder.group({
      fechaRN: ['', [Validators.required]],
      egresoRN: ['', [Validators.required]],
      dxFallecimiento: [''],
      dxFallecimientoNoAplica: [''],
      dxTraslado: [''],
      dxTrasladoNoAplica: [''],
      establecimientoTras: [''],
      estaNoAplica: [''],
      alimentoAlta: ['', [Validators.required]],
      tsh: ['', [Validators.required]],
      pesoEgreso: ['', [Validators.required]],
    })

  }
  tituloEgresoRN() {
    // if (this.isUpdate) return "Edite Especialidad";
    // else 
    return "Ingrese Nuevo Egreso de RN";
  }
  openNew() {
    //this.isUpdate = false;
    this.formEgresoRN.reset();
    this.egresoRNDialog = true;
  }
  canceledEgreso() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.egresoRNDialog = false;
  }
  ngOnInit(): void {
  }

}
