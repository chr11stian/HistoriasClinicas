import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-recomendaciones',
  templateUrl: './modal-recomendaciones.component.html',
  styleUrls: ['./modal-recomendaciones.component.css']
})
export class ModalRecomendacionesComponent implements OnInit {

  formRecomendaciones:FormGroup;
  dialogRecomendaciones=false;
  dataRecomendaciones:any[]=[];

  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig)
  {
    console.log(config.data);
    this.builForm();
    if(config.data){
      this.llenarCamposRecomendaciones();
    }
  }

  ngOnInit(): void {
  }
  builForm() {
    this.formRecomendaciones = this.form.group({
      recomendaciones:new FormControl("",[Validators.required])
    })
  }
  openNew(){
    this.formRecomendaciones.reset();
    this.dialogRecomendaciones = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogRecomendaciones = false;
  }
  enviarRecomendaciones(){
    var recomendaciones = this.formRecomendaciones.value.recomendaciones;
    // var recomendaciones = {
    //   recomendaciones:this.formRecomendaciones.value.recomendaciones,
    // }
    console.log(recomendaciones);
    this.dataRecomendaciones.push(recomendaciones);
    this.dialogRecomendaciones = false;
  }
  llenarCamposRecomendaciones(){
    let configuracion = this.config.data.row;
    this.formRecomendaciones.get("recomendaciones").setValue(configuracion);

  }
  closeDialogGuardar() {
    this.enviarRecomendaciones();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataRecomendaciones[0]
            }:
            this.dataRecomendaciones[0]);
  }

  closeDialog() {
    this.ref.close();
  }
}
