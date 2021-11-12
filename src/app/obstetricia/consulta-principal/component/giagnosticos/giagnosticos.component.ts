import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-giagnosticos',
  templateUrl: './giagnosticos.component.html',
  styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {

  form: FormGroup;
  data: any[] = [];
  isUpdate: boolean = false;
  datafecha: any;
  diagnosticoDialog: boolean;
  /*LISTA CIE 10*/
  DiagnosticoList: any[];
  Cie10: any;
  displayModal: boolean;


  constructor (private formBuilder: FormBuilder) {
    this.buildForm();
    /*LLENADO DE LISSTAS DE DX*/
    // this.DiagnosticoList = [{label: 'Longitudinal', value: '1'},
    //   {label: 'Transversa', value: '2'},
    //   {label: 'No Aplica', value: '3'}];
  }
  showModalDialog() {
    this.displayModal = true;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      /* idCIE: ['', [Validators.required]],*/
      diagnostico: ['', [Validators.required]],
      CIE10: ['', [Validators.required]],

    });
  }
  save(form: any) {
    this.isUpdate = false;
    console.log("enviando datos...");
    console.log(form);
    console.log(form.value);
    this.data.push(form.value);

    Swal.fire({
      icon: 'success',
      title: 'Agregado correctamente',
      text: '',
      showConfirmButton: false,
      timer: 1500,
    })
    this.diagnosticoDialog = false;
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('diagnostico').setValue("");
    this.form.get('CIE10').setValue("");
    this.diagnosticoDialog = true;
  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.diagnosticoDialog = false;
  }
  titulo() {
    if (this.isUpdate) return "EDITE DIAGNOSTICO";
    else return "INGRESAR UN DIAGNOSTICO";
  }
  ngOnInit(): void
  {
  }


  editar(rowData: any) {
    console.log("modificando" + rowData)
  }

  eliminar(rowData: any) {
    console.log("eliminando" + rowData)
  }
}
