import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-medicamentos',
  templateUrl: './modal-medicamentos.component.html',
  styleUrls: ['./modal-medicamentos.component.css']
})
export class ModalMedicamentosComponent implements OnInit {
  formMedicamento:FormGroup;
  dialogMedicamento = false;
  dataMedicamentos:medicamentos[]=[];
  dataPipe = new DatePipe('en-US');
  viaadministracionList:viaAdministracion[]=[];
  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private config:DynamicDialogConfig) {
    console.log(config.data);
    this.buildForm();
    if(config.data){
      this.llenarCamposMedicamentos();
    }
    this.viaadministracionList = [{label: 'ENDOVENOSA', value: 'ENDOVENOSA'},
      {label: 'INHALADORA', value: 'INHALADORA'},
      {label: 'INTRADERMICO', value: 'INTRADERMICO'},
      {label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR'},
      {label: 'NASAL', value: 'NASAL'},
      {label: 'OFTALMICO', value: 'OFTALMICO'},
      {label: 'ORAL', value: 'ORAL'},
      {label: 'OPTICO', value: 'OPTICO'},
      {label: 'RECTAL', value: 'RECTAL'},
      {label: 'SUBCUTANEO', value: 'SUBCUTANEO'},
      {label: 'SUBLINGUAL', value: 'SUBLINGUAL'},
      {label: 'TOPICO', value: 'TOPICO'},
      {label: 'VAGINAL', value: 'VAGINAL'},
    ];
  }
  buildForm() {
    this.formMedicamento = this.form.group({
      id: new FormControl("", [Validators.required]),
      nombre: new FormControl("", [Validators.required]),
      codigo: new FormControl("", [Validators.required]),
      viaAdministracion: new FormControl("", [Validators.required]),
      ff: new FormControl("", [Validators.required]),
      concentracion: new FormControl("", [Validators.required]),

    })
  }
  openNew(){
    this.formMedicamento.reset();
    this.dialogMedicamento = true;
  }
  canceled() {
    this.ref.close();
    this.dialogMedicamento = false;
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: 'No se guardo ningún registro',
      showConfirmButton: false,
      timer: 1000
    })
  }

  enviarMedicamentos(){
    var medicamentos = {
      id:this.formMedicamento.value.id,
      codigo:this.formMedicamento.value.codigo,
      nombre:this.formMedicamento.value.nombre,
      ff:this.formMedicamento.value.ff,
      concentracion:this.formMedicamento.value.concentracion,
      viaAdministracion:this.formMedicamento.value.viaAdministracion,
    }
    console.log(medicamentos);
    this.dataMedicamentos.push(medicamentos);
    this.dialogMedicamento = false;
  }
  llenarCamposMedicamentos(){
    let configuracion = this.config.data.row;
    this.formMedicamento.get("id").setValue(configuracion.id);
    this.formMedicamento.get("codigo").setValue(configuracion.codigo);
    this.formMedicamento.get("nombre").setValue(configuracion.nombre);
    this.formMedicamento.get("ff").setValue(configuracion.ff);
    this.formMedicamento.get("concentracion").setValue(configuracion.concentracion);
    this.formMedicamento.get("viaAdministracion").setValue(configuracion.viaAdministracion);
  }
  closeDialogGuardar() {
    this.enviarMedicamentos();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataMedicamentos[0]
            }:
            this.dataMedicamentos[0]);
  }

  closeDialog() {
    this.ref.close();
  }
  ngOnInit(): void {
  }

}
interface medicamentos{
  id?:string,
  codigo?:string,
  nombre?:string,
  ff?:string,
  concentracion?:string,
  viaAdministracion?:string
}
interface viaAdministracion{
  label?:string,
  value?:string,
}
