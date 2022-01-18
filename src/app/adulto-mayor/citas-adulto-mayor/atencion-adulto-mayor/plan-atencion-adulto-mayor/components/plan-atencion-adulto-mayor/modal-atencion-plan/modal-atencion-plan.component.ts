import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-atencion-plan',
  templateUrl: './modal-atencion-plan.component.html',
  styleUrls: ['./modal-atencion-plan.component.css']
})
export class ModalAtencionPlanComponent implements OnInit {
  formAtencion:FormGroup;
  dialogAtencion:boolean = false;
  dataAtencion:any[]=[];
  sino=[
      { label: 'SI', value: true },
      { label: 'NO', value: false }
  ];

  constructor(private form: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private messageService: MessageService) {
    this.buildForm();
    if(config.data){
      this.llenarCamposAtencion();
    }
  }

  ngOnInit(): void {
  }
  buildForm(){
    this.formAtencion = this.form.group({
      fecha:  new FormControl("", [Validators.required]),
      observacion:new FormControl("", [Validators.required]),
      lugar: new FormControl("", [Validators.required]),
    });
  }
  openNew(){
    this.formAtencion.reset();
    this.dialogAtencion = true;
  }
  enviarPlan(){
    var atencion:any = {
      fecha:this.formAtencion.value.fecha,
      observacion:this.formAtencion.value.observacion,
      lugar:this.formAtencion.value.lugar
    }

    console.log("plan", atencion);
    this.dataAtencion.push(atencion);
    this.dialogAtencion = false;
  }
  llenarCamposAtencion(){
    let configuracion=this.config.data;
    this.formAtencion.get("fecha").setValue(configuracion.fecha);
    this.formAtencion.get("observacion").setValue(configuracion.observacion);
    this.formAtencion.get("lugar").setValue(configuracion.lugar);

  }
  closeDialogGuardar() {
    this.enviarPlan();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataAtencion[0]
            }:
            this.dataAtencion[0]);
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
