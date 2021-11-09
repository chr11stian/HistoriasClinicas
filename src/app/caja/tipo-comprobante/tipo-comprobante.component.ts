import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tipo-comprobante',
  templateUrl: './tipo-comprobante.component.html',
  styleUrls: ['./tipo-comprobante.component.css']
})
export class TipoComprobanteComponent implements OnInit {

  // Creacion del formulario
  form: FormGroup;
  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";


  constructor(
      private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getTipoComprobante();
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
    })
  }

  getTipoComprobante() {

  }
  saveForm(){

  }
  guardarNuevo(){

  }
  editar(rowData){

  }
  editarDatos(rowData){

  }
  eliminar(rowData){

  }

  ngOnInit(): void {
  }
}