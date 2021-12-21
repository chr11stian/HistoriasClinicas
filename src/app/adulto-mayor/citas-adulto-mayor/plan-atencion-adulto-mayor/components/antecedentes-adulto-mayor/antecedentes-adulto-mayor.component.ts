import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TratamientosFrecuentes} from "../models/plan-atencion-adulto-mayor.model";
import {MessageService} from "primeng/api";
import Swal from "sweetalert2";

@Component({
  selector: 'app-antecedentes-adulto-mayor',
  templateUrl: './antecedentes-adulto-mayor.component.html',
  styleUrls: ['./antecedentes-adulto-mayor.component.css']
})
export class AntecedentesAdultoMayorComponent implements OnInit {
  dialogTratamientoFrecuente:boolean=false;
  formTratamientoFrecuente:FormGroup;
  medicamentoFrecuentes: TratamientosFrecuentes;
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  familiares = [
    {nombrefamiliar: 'Padre'},
    {nombrefamiliar: 'Madre'},
    {nombrefamiliar: 'Hermano'},
    {nombrefamiliar: 'Hermana'},
    {nombrefamiliar: 'Abuelo'},
    {nombrefamiliar: 'Otros'},
  ];
  constructor(private messageService: MessageService,
              private form:FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
  }

  builForm() {
    this.formTratamientoFrecuente = this.form.group({
      nombre:new FormControl("",[Validators.required]),
      dosis:new FormControl("",[Validators.required]),
      observaciones:new FormControl("",[Validators.required])
    })
  }
  openNew(){
    this.formTratamientoFrecuente.reset();
    this.dialogTratamientoFrecuente = true;
  }
  saveTratamientos(){

  }
  openDialogEditarTratamientosfrec(rowData: any, rowIndex: any) {

  }

  eliminarTratamientoFrecuente(rowIndex: any) {

  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogTratamientoFrecuente = false;
    }
}
