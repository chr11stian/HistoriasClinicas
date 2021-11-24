import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-recien-nacido-dialogo',
  templateUrl: './recien-nacido-dialogo.component.html',
  styleUrls: ['./recien-nacido-dialogo.component.css']
})
export class RecienNacidoDialogoComponent implements OnInit {
  form: FormGroup;
  formEgresoRN: FormGroup;
  stateOptions: any[];
  todosEgresosDelRN: any[] = [];
  datosRecienNacido: any[] = [];
  RNDialog: boolean;
  egresoRNDialog: boolean;
  datePipe = new DatePipe('en-US');
  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.stateOptions = [{ label: 'Si', value: true }, { label: 'No', value: false }];
    this.buildForm();
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
      patologia1: ['', [Validators.required]],
      patologiaFecha1: ['', [Validators.required]],
      patologiaCIE1: ['', [Validators.required]],
      patologia2: ['', [Validators.required]],
      patologiaFecha2: ['', [Validators.required]],
      patologiaCIE2: ['', [Validators.required]],
      patologia3: ['', [Validators.required]],
      patologiaFecha3: ['', [Validators.required]],
      patologiaCIE3: ['', [Validators.required]],
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
      reIngreso: [false, [Validators.required]],
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
      reingreso: [false],
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
  closeDialogGuardar(){
    this.enviarRecienNacidos();
    this.ref.close(this.datosRecienNacido[0]);
  }
  closeDialog(){
    this.ref.close();
  }
  enviarEgresosRecienNacido() {
    var recienNacidoEgreso = {
      reingreso: this.formEgresoRN.value.reingreso,
      fecha: this.datePipe.transform(this.formEgresoRN.value.fechaRN, 'yyyy-MM-dd HH:mm:ss'),
      diagnostico: this.formEgresoRN.value.diagnostico,
      fechaIngreso: this.datePipe.transform(this.formEgresoRN.value.fechaIngreso, 'yyyy-MM-dd HH:mm:ss'),
      egreso: this.formEgresoRN.value.egresoRN,
      dxfNoAplica: this.formEgresoRN.value.dxfNoAplica?true:false,
      dxFallecimiento: this.formEgresoRN.value.dxFallecimiento?this.formEgresoRN.value.dxFallecimiento:"",
      dxtNoAplica: this.formEgresoRN.value.dxtNoAplica?true:false,
      dxTraslado: this.formEgresoRN.value.dxTraslado?this.formEgresoRN.value.dxTraslado:"",
      estaNoAplica: this.formEgresoRN.value.estaNoAplica?true:false,
      establecimientoTraslado: this.formEgresoRN.value.establecimientoTras?this.formEgresoRN.value.establecimientoTras:"",
      fechaContro: this.datePipe.transform(this.formEgresoRN.value.fechaContro, 'yyyy-MM-dd HH:mm:ss'),
      controlRecienNacido: this.formEgresoRN.value.controlRecienNacido
    }
    console.log(recienNacidoEgreso);
    this.todosEgresosDelRN.push(recienNacidoEgreso);
    this.egresoRNDialog = false;
  }
  enviarRecienNacidos() {
    console.log("Datos de los egresos ",this.todosEgresosDelRN)
    var recienNacido = {
      recienNacidoHcl: this.form.value.recienNacidoHcl,
      nombreRecienNacido: this.form.value.nombreRecienNacido,
      sexo: this.form.value.sexo,
      talla: parseFloat(this.form.value.talla),
      peso: parseFloat(this.form.value.peso),
      perimetroCefalico: parseFloat(this.form.value.perimetroCefalico),
      patologiaRecienNacido: [{
        patologia: this.form.value.patologia1,
        fecha: this.form.value.patologiaFecha1,
        cie10: this.form.value.patologiaCIE1,
      },
      {
        patologia: this.form.value.patologia2,
        fecha: this.form.value.patologiaFecha2,
        cie10: this.form.value.patologiaCIE2,
      },
      {
        patologia: this.form.value.patologia3,
        fecha: this.form.value.patologiaFecha3,
        cie10: this.form.value.patologiaCIE3,
      }
      ],
      edadPorExamenFisico: this.form.value.edadPorExamenFisico,
      sem: this.form.value.semanasRN,
      pesoPorEdadGestacional: this.form.value.pesoEdadGes,
      apgar1: this.form.value.apgar1,
      detalleApgar1: this.form.value.detalleApgar1?this.form.value.detalleApgar1[0]:"",
      apgar2: this.form.value.apgar2,
      detalleApgar2: this.form.value.detalleApgar2?this.form.value.detalleApgar2[0]:"",
      reanimacionRespiratoria: this.form.value.reanimacion !== "No" ? true : false,
      detallesReaminacion: this.form.value.reanimacion !== "No" ? [this.form.value.reanimacion] : [],
      medicacionReanimacionRecienNacido: this.form.value.medicacionReanimacionRecienNacido,
      vitaminaK: this.form.value.vitaminaK,
      profilaxisOcular: this.form.value.profilaxisOcular,
      controlPuerperioInmediato: this.form.value.controlPuerperioInmediato,
      examenFisico: this.form.value.examenFisico,
      examenVih: this.form.value.examenVih,
      hospitalizacion: this.form.value.hospitalizacion=="true"? true : false,
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
        fecha: this.datePipe.transform(this.form.value.fechaRN, 'yyyy-MM-dd HH:mm:ss'),
        egreso: this.form.value.egresoRN,
        dxFallecimiento: this.form.value.dxFallecimiento,
        dxfNoAplica: this.form.value.dxFallecimientoNoAplica?true:false,
        dxTraslado: this.form.value.dxTraslado,
        dxtNoAplica: this.form.value.dxTrasladoNoAplica?true:false,
        establecimientoTras: this.form.value.establecimientoTras,
        estaNoAplica: this.form.value.estaNoAplica?true:false,
        alimentoAlta: this.form.value.alimentoAlta,
        tsh: this.form.value.tsh,
        peso: parseFloat(this.form.value.pesoEgreso)
      },
      ingresoMaterno: {
        fecha: this.datePipe.transform(this.form.value.fechaIngresoMaterno, 'yyyy-MM-dd HH:mm:ss'),
        reIngreso: this.form.value.reIngreso,
        egreso: this.form.value.egresoMaterno,
        dxFallecimiento: this.form.value.dxMaternoFallecimiento,
        dxfNoAplica: this.form.value.dxMfNoAplica?true:false,
        dxTraslado: this.form.value.dxMaternoTraslado,
        dxtNoAplica: this.form.value.dxMtNoAplica?true:false,
        establecimientoTras: this.form.value.MaternoEstablecimientoTras,
        estaNoAplica: this.form.value.MaternoEstaNoAplica?true:false,
        anticonceptivos: this.form.value.anticonceptivos
      },
      egresoRecienNacido2: this.todosEgresosDelRN,
      tipoSangre: {
        grupo: this.form.value.grupo,
        rh: this.form.value.rh
      },
    }
    console.log("Datos del recien nacido ",recienNacido);
    this.datosRecienNacido.push(recienNacido);
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
