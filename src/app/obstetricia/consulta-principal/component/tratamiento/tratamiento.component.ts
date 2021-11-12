import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  form: FormGroup;
  data: any[] = [];
  tratamiento : string;
  isUpdate: boolean = false;
  datafecha: any;
  diagnosticoDialog: boolean;
  /*LISTA CIE 10*/
  intervaloList: any[];
  viaadministracionList: any[];
  formRIEP: FormGroup;

  recomendaciones: string;
  interconsulta: string;
  examenesAuxiliares: string;
  personalResponsable: string;


  constructor (private formBuilder: FormBuilder) {
    this.buildForm();
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
    this.intervaloList = [{label: 'CADA 1 HORA', value: '1'},
      {label: 'CADA 2 HORAS', value: '2'},
      {label: 'CADA 3 HORAS', value: '3'},
      {label: 'CADA 4 HORAS', value: '4'},
      {label: 'CADA 5 HORAS', value: '5'},
      {label: 'CADA 6 HORAS', value: '6'},
      {label: 'CADA 12 HORAS', value: '7'},
      {label: 'CADA 24 HORAS', value: '7'},
      {label: 'CONDICIONAL A FIEBRE', value: '7'},
      {label: 'DOSIS UNICA', value: '7'},
      {label: 'CADA 48 HORAS', value: '7'}
    ];

    this.viaadministracionList = [{label: 'ENDOVENOSA', value: '1'},
      {label: 'INHALADORA', value: '2'},
      {label: 'INTRADERMICO', value: '3'},
      {label: 'INTRAMUSCULAR', value: '4'},
      {label: 'NASAL', value: '5'},
      {label: 'OFTALMICO', value: '6'},
      {label: 'ORAL', value: '7'},
      {label: 'OPTICO', value: '8'},
      {label: 'RECTAL', value: '9'},
      {label: 'SUBCUTANEO', value: '10'},
      {label: 'SUBLINGUAL', value: '11'},
      {label: 'TOPICO', value: '12'},
      {label: 'VAGINAL', value: '13'},
    ];

  }
  private buildForm() {
    this.form = this.formBuilder.group({
      /*CAMPOS DE TRATAMIENTO*/
      medicamento : ['', [Validators.required]],
      cantidad:  ['', [Validators.required]],
      concentracion:  ['', [Validators.required]],
      dosis: ['', [Validators.required]],
      intervalo: ['', [Validators.required]],
      viaAdministracion: ['', [Validators.required]],
      duracion:  ['', [Validators.required]],

    })
    this.formRIEP=this.formBuilder.group({
      recomendaciones: ['', [Validators.required]],
      interconsulta:  ['', [Validators.required]],
      examenesAuxiliares:  ['', [Validators.required]],
      personalResponsable:  ['', [Validators.required]],
    })

  }
  save(form: any) {
    this.isUpdate = false;
    console.log("enviando datos...");
    console.log(form);
    console.log(form.value);
    this.tratamiento = form.value.toString();

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
    if (this.isUpdate) return "EDITE TRATAMIENTO";
    else return "INGRESAR TRATAMIENTO";
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
