import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-antecedentes',
  templateUrl: './modal-antecedentes.component.html',
  styleUrls: ['./modal-antecedentes.component.css']
})
export class ModalAntecedentesComponent implements OnInit {
  formAntecedentes: FormGroup;
  dialogAntecedente:boolean=false;
  esPersonal:boolean=false;
  esFamiliar:boolean=false;
  // dataAntecedentesPersonales:antecedentesPer[]=[];
  dataAntecedentes:antecedentesFam[]=[];
  dataPipe = new DatePipe('en-US');

  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig) {
    console.log(config.data);
    this.buildForm();
    if(config.data){
      this.esFamiliar=this.config.data.esFamiliar;
      this.esPersonal=this.config.data.esPersonal;
      this.llenarCamposAntecedentes();
    }
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formAntecedentes = this.form.group({
      nombre: new FormControl("", [Validators.required]),
      fechaDiagnosticado: new FormControl("", [Validators.required]),
      edadAnio: new FormControl("", [Validators.required]),
      edadMes: new FormControl("", [Validators.required]),
      edadDia: new FormControl("", [Validators.required]),
      pariente: new FormControl("", [Validators.required]),

    })
  }

  openNew(){
    this.formAntecedentes.reset();
    this.dialogAntecedente = true;
  }

  canceled() {
    this.ref.close();
    this.dialogAntecedente = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: 'No se guardo ningún registro',
      showConfirmButton: false,
      timer: 1000
    })
  }
  enviarAntecedentes(){
    let antecedentes={}
      antecedentes = {
        nombre:this.formAntecedentes.value.nombre,
        fechaDiagnosticado:this.formAntecedentes.value.fechaDiagnosticado,
        edadAnio:this.formAntecedentes.value.edadAnio,
        edadMes:this.formAntecedentes.value.edadMes,
        edadDia:this.formAntecedentes.value.edadDia,
        pariente:this.formAntecedentes.value.pariente,
      }
      this.dataAntecedentes.push(antecedentes);
    this.dialogAntecedente=false;
  }

  llenarCamposAntecedentes() {
    let configuracion = this.config.data;
    this.formAntecedentes.get("nombre").setValue(configuracion.nombre);
    this.formAntecedentes.get("fechaDiagnosticado").setValue(configuracion.fechaDiagnosticado);
    this.formAntecedentes.get("edadAnio").setValue(configuracion.edadAnio);
    this.formAntecedentes.get("edadMes").setValue(configuracion.edadMes);
    this.formAntecedentes.get("edadDia").setValue(configuracion.edadDia);
    this.formAntecedentes.get("pariente").setValue(configuracion.pariente);
  }

  closeDialogGuardar() {
    this.enviarAntecedentes();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataAntecedentes[0]
            }:
            this.dataAntecedentes[0]);
  }
  closeDialog() {
    this.ref.close();
  }
}


interface antecedentesPer{
  nombre?:string,
  fechaDiagnosticado?:string,
  edadAnio?:string,
  edadMes?:string,
  edadDia?:string,
}

interface antecedentesFam{
  nombre?:string,
  fechaDiagnosticado?:string,
  edadAnio?:string,
  edadMes?:string,
  edadDia?:string,
  pariente?:string
}
