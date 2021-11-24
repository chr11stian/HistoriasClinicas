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
  datosRecienNacido: any[];
  datosEgresos: any[];
  RNDialog: boolean;
  egresoRNDialog: boolean;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.stateOptions = [{ label: 'Si', value: true }, { label: 'No', value: false }];
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
      diagnostico: ['', [Validators.required]],
      egresoRN: ['', [Validators.required]],
      fechaIngreso: ['', [Validators.required]],
      dxFallecimiento: [''],
      dxfNoAplica: [''],
      dxTraslado: [''],
      dxtNoAplica: [''],
      establecimientoTras: [''],
      estaNoAplica: [''],
      fechaContro: [''],
      controlRecienNacido: [''],
      reingreso: [''],
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
  estructurarDataRN() {
    
  }
  enviarEgresosRecienNacido() {
    var recienNacidoEgreso = {
      reingreso: this.formEgresoRN.value.reingreso,
      fecha: this.formEgresoRN.value.fechaRN,
      diagnostico: this.formEgresoRN.value.diagnostico,
      fechaIngreso: this.formEgresoRN.value.fechaIngreso,
      egreso: this.formEgresoRN.value.egreso,
      dxfNoAplica: this.formEgresoRN.value.dxfNoAplica,
      dxFallecimiento: this.formEgresoRN.value.dxFallecimiento,
      dxtNoAplica: this.formEgresoRN.value.dxtNoAplica,
      dxTraslado: this.formEgresoRN.value.dxTraslado,
      estaNoAplica: this.formEgresoRN.value.estaNoAplica,
      establecimientoTraslado: this.formEgresoRN.value.establecimientoTras,
      fechaContro: this.formEgresoRN.value.fechaContro,
      controlRecienNacido: this.formEgresoRN.value.controlRecienNacido
    }
    this.datosEgresos.push(recienNacidoEgreso)
  }
  enviarRecienNacidos() {
    console.log("Datos de los egresos ",this.datosEgresos)
    var recienNacido = {
      recienNacidoHcl: this.form.value.recienNacidoHcl,
      nombreRecienNacido: this.form.value.nombreRecienNacido,
      sexo: this.form.value.sexo,
      talla: this.form.value.talla,
      peso: this.form.value.peso,
      perimetroCefalico: this.form.value.perimetroCefalico,
      patologiaRecienNacido: [{
        patologia: "Sin patologia",
        fecha: "2018-02-23",
        cie10: "2323.2"
      }],
      edadPorExamenFisico: this.form.value.edadPorExamenFisico,
      sem: this.form.value.semanasRN,
      pesoPorEdadGestacional: this.form.value.pesoEdadGes,
      apgar1: this.form.value.apgar1,
      detalleApgar1: this.form.value.detalleApgar1,
      apgar2: this.form.value.apgar2,
      detalleApgar2: this.form.value.detalleApgar2,
      reanimacionRespiratoria: this.form.value.reanimacion !== "No" ? true : false,
      detallesReaminacion: this.form.value.reanimacion !== "No" ? [this.form.value.reanimacion] : [],
      medicacionReanimacionRecienNacido: this.form.value.medicacionReanimacionRecienNacido,
      vitaminaK: this.form.value.vitaminaK,
      profilaxisOcular: this.form.value.profilaxisOcular,
      controlPuerperioInmediato: this.form.value.controlPuerperioInmediato,
      examenFisico: this.form.value.examenFisico,
      examenVih: this.form.value.examenVih,
      hospitalizacion: this.form.value.hospitalizacion,
      necropsia: this.form.value.necropsia,
      sLueticaVdrlRpr: this.form.value.sLueticaVdrlRpr,
      evolucionRecienNacido: {
        deposiciones: this.form.value.deposiciones,
        ictericiaPrecoz: this.form.value.ictericiaPrecoz
      },
      alojamientoConjunto: this.form.value.alojamientoConjunto,
      contactoPielaPielLmh: this.form.value.contactoPielaPielLmh,
      lme: this.form.value.lme,
      vacunaRecienNacido: [
        {
          nombre: "BCG",
          valor: this.form.value.bcg ? "Si" : "No"
        },
        {
          nombre: "Hepatitis B",
          valor: this.form.value.hepatitisb ? "Si" : "No"
        }
      ],
      egresoRecienNacido: {
        fecha: this.form.value.fechaRN,
        egreso: this.form.value.egresoRN,
        dxFallecimiento: this.form.value.dxFallecimiento,
        dxfNoAplica: this.form.value.dxfNoAplica,
        dxTraslado: this.form.value.dxTraslado,
        dxtNoAplica: this.form.value.dxtNoAplica,
        establecimientoTras: this.form.value.establecimientoTras,
        estaNoAplica: this.form.value.estaNoAplica,
        alimentoAlta: this.form.value.alimentoAlta,
        tsh: this.form.value.tsh,
        peso: this.form.value.pesoEgreso
      },
      ingresoMaterno: {
        fecha: this.form.value.fechaIngresoMaterno,
        reIngreso: this.form.value.reIngreso,
        egreso: this.form.value.egresoMaterno,
        dxFallecimiento: this.form.value.dxMaternoFallecimiento,
        dxfNoAplica: this.form.value.dxMfNoAplica,
        dxTraslado: this.form.value.dxMaternoTraslado,
        dxtNoAplica: this.form.value.dxMtNoAplica,
        establecimientoTras: this.form.value.MaternoEstablecimientoTras,
        estaNoAplica: this.form.value.MaternoEstaNoAplica,
        anticonceptivos: this.form.value.anticonceptivos
      },
      egresoRecienNacido2: this.datosEgresos,
      tipoSangre: {
        grupo: this.form.value.grupo,
        rh: this.form.value.rh
      },
    }
    this.datosRecienNacido.push(recienNacido);
    console.log("Datos de los recien nacidos ",this.datosEgresos);
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
