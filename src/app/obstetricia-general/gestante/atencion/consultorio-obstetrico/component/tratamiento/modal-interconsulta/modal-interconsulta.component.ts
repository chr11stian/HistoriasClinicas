import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-interconsulta',
  templateUrl: './modal-interconsulta.component.html',
  styleUrls: ['./modal-interconsulta.component.css']
})
export class ModalInterconsultaComponent implements OnInit {

  formInterconsultas:FormGroup;
  dialogInterconsulta = false;
  dataInterconsultas:any[]=[];
  dataPipe = new DatePipe('en-US');
  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig)
  {
    console.log(config.data);
    this.buildForm();
    if(config.data){
      this.llenarCamposInterconsulta();
    }
  }

  ngOnInit(): void {
  }
  buildForm(){
    this.formInterconsultas = this.form.group({
      consultorio:new FormControl("",[Validators.required]),
      motivo:new FormControl("",[Validators.required]),
      fecha:new FormControl("",[Validators.required])
    })
  }
  openNew(){
    this.formInterconsultas.reset();
    this.dialogInterconsulta = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogInterconsulta = false;
  }
  enviarInterconsultas(){
    var interconsultas = {
      consultorio:this.formInterconsultas.value.consultorio,
      motivo:this.formInterconsultas.value.motivo,
      fecha:this.dataPipe.transform(this.formInterconsultas.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
    }
    console.log(interconsultas);
    this.dataInterconsultas.push(interconsultas);
    this.dialogInterconsulta = false;
  }
  llenarCamposInterconsulta(){
    let configuracion = this.config.data.row;
    this.formInterconsultas.get("consultorio").setValue(configuracion.consultorio);
    this.formInterconsultas.get("motivo").setValue(configuracion.motivo);
    this.formInterconsultas.get("fecha").setValue(configuracion.fecha);
  }
  closeDialogGuardar() {
    this.enviarInterconsultas();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataInterconsultas[0]
            }:
            this.dataInterconsultas[0]);
  }

  closeDialog() {
    this.ref.close();
  }


}
