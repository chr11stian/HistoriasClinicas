import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-examenes-auxiliares',
  templateUrl: './modal-examenes-auxiliares.component.html',
  styleUrls: ['./modal-examenes-auxiliares.component.css']
})
export class ModalExamenesAuxiliaresComponent implements OnInit {
  formExamenesAuxiliares: FormGroup;
  dialogExamenesAuxiliares:false;
  dataExamenesAuxiliares:any[]=[];
  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig) {
    console.log(config.data);
    this.builForm();
    if(config.data){
      this.llenarCamposRecomendaciones();
    }
  }

  ngOnInit(): void {
  }
  builForm() {
    this.formExamenesAuxiliares = this.form.group({
      examenesAuxiliares:new FormControl("",[Validators.required])
    })
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogExamenesAuxiliares = false;
  }
  enviarExamenesAuxiliares(){
    var examenesAuxiliares = this.formExamenesAuxiliares.value.examenesAuxiliares;
    // var recomendaciones = {
    //   recomendaciones:this.formRecomendaciones.value.recomendaciones,
    // }
    console.log(examenesAuxiliares);
    this.dataExamenesAuxiliares.push(examenesAuxiliares);
    this.dialogExamenesAuxiliares = false;
  }
  llenarCamposRecomendaciones(){
    let configuracion = this.config.data.row;
    this.formExamenesAuxiliares.get("examenesAuxiliares").setValue(configuracion);

  }
  closeDialogGuardar() {
    this.enviarExamenesAuxiliares();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataExamenesAuxiliares[0]
            }:
            this.dataExamenesAuxiliares[0]);
  }

  closeDialog() {
    this.ref.close();
  }
}
