import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-modal-plan-atencion-adulto-mayor',
  templateUrl: './modal-plan-atencion-adulto-mayor.component.html',
  styleUrls: ['./modal-plan-atencion-adulto-mayor.component.css']
})
export class ModalPlanAtencionAdultoMayorComponent implements OnInit {
  formPlan:FormGroup;
  dialogPlan:boolean=false;
  dataPlan:any[]=[];
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private form: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private messageService: MessageService) {
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
      fecha:  new FormControl("", [Validators.required]),
      observacion:new FormControl("", [Validators.required]),
      lugar: new FormControl("", [Validators.required]),
    });
  }
  openNew(){
    this.formPlan.reset();
    this.dialogPlan = true;
  }
  enviarPlan(){
    var plan:any = {
      descripcion:this.formPlan.value.descripcion,
      fecha:this.formPlan.value.fecha,
      observacion:this.formPlan.value.observacion,
      lugar:this.formPlan.value.lugar
    }

      console.log("plan", plan);
      this.dataPlan.push(plan);
      this.dialogPlan = false;
  }
  llenarCamposPlan(){
    let configuracion=this.config.data.row;
    this.formPlan.get("descripcion").setValue(configuracion.descripcion);
    this.formPlan.get("fecha").setValue(configuracion.fecha);
    this.formPlan.get("observacion").setValue(configuracion.observacion);
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
