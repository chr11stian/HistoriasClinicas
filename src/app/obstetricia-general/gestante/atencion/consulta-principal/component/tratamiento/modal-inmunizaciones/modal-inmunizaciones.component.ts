import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-inmunizaciones',
  templateUrl: './modal-inmunizaciones.component.html',
  styleUrls: ['./modal-inmunizaciones.component.css']
})
export class ModalInmunizacionesComponent implements OnInit {
 formInmunizaciones:FormGroup;
  viaadministracionList: any[];
  dialogInmunizaciones = false;
  dataInmunizaciones:any[]=[];
  idObstetricia:string;

  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private obstetriciaGeneralService:ObstetriciaGeneralService,
              public config:DynamicDialogRef)
  {

    this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
    // console.log(config.data);
    // this.buildForm();
    // if(config.data){
    //   this.llenarCamposTratamientoInmunizaciones();
    // }


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

  ngOnInit(): void {
  }

  closeDialogGuardar() {

  }

  closeDialog() {

  }

  buildForm() {
    this.formInmunizaciones = this.form.group({
      codigo:new FormControl("",[Validators.required]),
      descripcionIn:new FormControl("",[Validators.required]),
      numeroIn:new FormControl("",[Validators.required]),
      dosisIn:new FormControl("",[Validators.required]),
      viaAdministracion:new FormControl("",[Validators.required]),
      lote:new FormControl("",[Validators.required]),
      fechaVenc:new FormControl("",[Validators.required]),


    })
  }
  openNew(){
    this.formInmunizaciones.reset();
    this.dialogInmunizaciones = true;
  }
  enviarTratamientiInmunizaciones(){
    var tratamientoInmunizaciones ={
      codigo:this.formInmunizaciones.value.codigo,
      descripcionIn:this.formInmunizaciones.value.descripcionIn,
      numeroIn:this.formInmunizaciones.value.numeroIn,
      dosisIn:this.formInmunizaciones.value.dosisIn,
      viaAdministracion:this.formInmunizaciones.value.viaAdministracion,
      lote:this.formInmunizaciones.value.lote,
      fechaVen:this.formInmunizaciones.value.fechaVen

    }
    console.log(tratamientoInmunizaciones);
    this.dataInmunizaciones.push(tratamientoInmunizaciones);
    this.dialogInmunizaciones = false;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogInmunizaciones = false;
  }
  llenarCamposTratamientoInmunizaciones() {
    // let configuracion = this.config.data.row;
    // this.formInmunizaciones.get("codigo").setValue(configuracion.codigo);
    
  }
}
