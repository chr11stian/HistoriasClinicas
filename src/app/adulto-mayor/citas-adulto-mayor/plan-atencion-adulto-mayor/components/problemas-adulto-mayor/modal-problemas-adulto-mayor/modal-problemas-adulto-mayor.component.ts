import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProblemasCronicos} from "../../models/plan-atencion-adulto-mayor.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-problemas-adulto-mayor',
  templateUrl: './modal-problemas-adulto-mayor.component.html',
  styleUrls: ['./modal-problemas-adulto-mayor.component.css']
})
export class ModalProblemasAdultoMayorComponent implements OnInit {
  formProblemasCronicos:FormGroup;
  dialogProblemaCronico:boolean=false;
  dataProblemasCronicos:ProblemasCronicos[]=[];
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];

  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig) {
    console.log(config.data);
    this.builForm();
    if(config.data){
      this.llenarCamposProblemasCronicos();
    }
  }

  ngOnInit(): void {
  }
  builForm() {
    this.formProblemasCronicos = this.form.group({
      fechaProblemasCronicos:new FormControl("",[Validators.required]),
      controladoCronico:new FormControl("",[Validators.required]),
      problemaCronico:new FormControl("",[Validators.required]),
      observaciones:new FormControl("",[Validators.required])

    })
  }
  openNew(){
    this.formProblemasCronicos.reset();
    this.dialogProblemaCronico = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogProblemaCronico = false;
  }
  enviarProblemasCronicos(){
    var problemasCronicos={
      fecha:this.formProblemasCronicos.value.fechaProblemasCronicos,
      controlado:this.formProblemasCronicos.value.controlado,
      problema:this.formProblemasCronicos.value.problemaCronico,
      observaciones:this.formProblemasCronicos.value.observaciones
    }
    console.log(problemasCronicos);
    this.dataProblemasCronicos.push(problemasCronicos);
    this.dialogProblemaCronico = false;
  }
  closeDialogGuardar() {
    this.enviarProblemasCronicos();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataProblemasCronicos[0]
            }:
            this.dataProblemasCronicos[0]);
  }
  closeDialog() {
    this.ref.close();
  }

  llenarCamposProblemasCronicos() {
    let configuracion = this.config.data.row;
    this.formProblemasCronicos.get("fecha").setValue(configuracion.fechaProblemasCronicos);
    this.formProblemasCronicos.get("controlado").setValue(configuracion.codigo);
    this.formProblemasCronicos.get("problemasCronicos").setValue(configuracion.problemasCronicos);
    this.formProblemasCronicos.get("observaciones").setValue(configuracion.observaciones);
  }
}
