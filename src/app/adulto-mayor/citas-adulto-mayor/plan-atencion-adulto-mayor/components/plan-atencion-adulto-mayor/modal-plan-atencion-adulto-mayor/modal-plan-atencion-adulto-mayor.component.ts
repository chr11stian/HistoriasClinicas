import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {PlanEvaluacionAdulto} from "../../models/plan-atencion-adulto-mayor.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modal-plan-atencion-adulto-mayor',
  templateUrl: './modal-plan-atencion-adulto-mayor.component.html',
  styleUrls: ['./modal-plan-atencion-adulto-mayor.component.css']
})
export class ModalPlanAtencionAdultoMayorComponent implements OnInit {
  formPlan:FormGroup;
  dialogPlan:boolean=false;
  dataPlan:PlanEvaluacionAdulto[]=[];
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private form: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig) {
    this.buildForm();
    if(config.data){
      this.llenarCamposPlan();
    }
  }
  ngOnInit(): void {
  }
  buildForm(){
    this.formPlan = this.form.group({
      descripcion : new FormControl("", [Validators.required]),
      primeraFecha:  new FormControl("", [Validators.required]),
      atendido1:new FormControl("", [Validators.required]),
      segundaFecha: new FormControl("", [Validators.required]),
      atendido2:new FormControl("", [Validators.required]),
      terceraFecha: new FormControl("", [Validators.required]),
      atendido3:new FormControl("", [Validators.required]),
      lugar: new FormControl("", [Validators.required]),
    });
  }
  openNew(){
    this.formPlan.reset();
    this.dialogPlan = true;
  }
  enviarPlan(){
    var plan:PlanEvaluacionAdulto = {
      descripcion:this.formPlan.value.descripcion,
      primeraFecha:this.formPlan.value.primeraFecha,
      atendido1:this.formPlan.value.atendido1,
      segundaFecha:this.formPlan.value.segundaFecha,
      atendido2:this.formPlan.value.atendido2,
      terceraFecha:this.formPlan.value.terceraFecha,
      atendido3:this.formPlan.value.atendido3,
      lugar:this.formPlan.value.lugar
    }
    console.log("plan", plan);
    this.dataPlan.push(plan);
    this.dialogPlan = false;
  }
  llenarCamposPlan(){
    let configuracion=this.config.data.row;
    this.formPlan.get("descripcion").setValue(configuracion.descripcion);
    this.formPlan.get("primeraFecha").setValue(configuracion.primeraFecha);
    this.formPlan.get("atendido1").setValue(configuracion.atendido1);
    this.formPlan.get("segundaFecha").setValue(configuracion.segundaFecha);
    this.formPlan.get("atendido2").setValue(configuracion.atendido2);
    this.formPlan.get("terceraFecha").setValue(configuracion.terceraFecha);
    this.formPlan.get("atendido3").setValue(configuracion.atendido3);
    this.formPlan.get("lugar").setValue(configuracion.lugar);
  }
  closeDialogGuardar() {
    this.enviarPlan();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataPlan[0]
            }:
            this.dataPlan[0]);
  }
  canceled() {
    this.ref.close();
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })

  }
}
