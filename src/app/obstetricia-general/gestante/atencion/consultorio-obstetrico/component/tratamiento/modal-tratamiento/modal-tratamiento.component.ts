import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../services/obstetricia-general.service";

@Component({
  selector: 'app-modal-tratamiento',
  templateUrl: './modal-tratamiento.component.html',
  styleUrls: ['./modal-tratamiento.component.css']
})
export class ModalTratamientoComponent implements OnInit {
  formTratamientoComun: FormGroup;
  dataTratamientosComunes:any[]=[];
  dialogTratamiento = false;
  formTratamientoSuplementos: FormGroup;
  dataTratamientosSuplementos:any[]=[];
  dialogTratamientoSuplementos = false;
  estadoEditar:boolean=false;
  idObstetricia:string;
  isUpdate:boolean=false;
  idUpdate:string="";
  /*LISTA CIE 10*/
  intervaloList: any[];
  viaadministracionList: any[];

  constructor(private form: FormBuilder,
              private ref: DynamicDialogRef,
              private obstetriciaGeneralService: ObstetriciaGeneralService,
              private config: DynamicDialogConfig)
  {
    this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
    console.log(config.data);
    this.buildForm();

    if(config.data){
      this.llenarCamposTratamientoComun();
    }
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
    this.intervaloList = [{label: 'CADA 1 HORA', value: '1'},
      {label: 'CADA 2 HORAS', value: 'CADA 2 HORAS'},
      {label: 'CADA 3 HORAS', value: 'CADA 3 HORAS'},
      {label: 'CADA 4 HORAS', value: 'CADA 4 HORAS'},
      {label: 'CADA 5 HORAS', value: 'CADA 5 HORAS'},
      {label: 'CADA 6 HORAS', value: 'CADA 6 HORAS'},
      {label: 'CADA 8 HORAS', value: 'CADA 8 HORAS'},
      {label: 'CADA 12 HORAS', value: 'CADA 12 HORAS'},
      {label: 'CADA 24 HORAS', value: 'CADA 24 HORAS'},
      {label: 'CONDICIONAL A FIEBRE', value: 'CONDICIONAL A FIEBRE'},
      {label: 'DOSIS UNICA', value: 'DOSIS UNICA'},
      {label: 'CADA 48 HORAS', value: 'CADA 48 HORAS'}
    ];

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
  buildForm(){
    this.formTratamientoComun = this.form.group({
      /*CAMPOS DE TRATAMIENTO*/
      descripcion : new FormControl("", [Validators.required]),
      numero:  new FormControl("", [Validators.required]),
      dosis: new FormControl("", [Validators.required]),
      intervalo: new FormControl("", [Validators.required]),
      viaAdministracion: new FormControl("", [Validators.required]),
      duracion:  new FormControl("", [Validators.required]),
      observaciones: new FormControl("", []),

    });

  }
  openNew(){
    this.formTratamientoComun.reset();
    this.dialogTratamiento = true;
    this.formTratamientoSuplementos.reset();
    this.dialogTratamientoSuplementos=true;
  }
  enviarTratamientosComunes(){
    var tratamientosComunes = {
      descripcion:this.formTratamientoComun.value.descripcion,
      numero:this.formTratamientoComun.value.numero,
      dosis:this.formTratamientoComun.value.dosis,
      intervalo:this.formTratamientoComun.value.intervalo,
      viaAdministracion:this.formTratamientoComun.value.viaAdministracion,
      duracion:this.formTratamientoComun.value.duracion,
      observaciones:this.formTratamientoComun.value.observaciones,
    }
    console.log(tratamientosComunes);
    this.dataTratamientosComunes.push(tratamientosComunes);
    this.dialogTratamiento = false;
  }
   canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogTratamiento = false;
  }
  llenarCamposTratamientoComun(){
    let configuracion=this.config.data.row;
    this.formTratamientoComun.get("descripcion").setValue(configuracion.descripcion);
    this.formTratamientoComun.get("numero").setValue(configuracion.numero);
    this.formTratamientoComun.get("dosis").setValue(configuracion.dosis);
    this.formTratamientoComun.get("intervalo").setValue(configuracion.intervalo);
    this.formTratamientoComun.get("viaAdministracion").setValue(configuracion.viaAdministracion);
    this.formTratamientoComun.get("duracion").setValue(configuracion.duracion);
    this.formTratamientoComun.get("observaciones").setValue(configuracion.observaciones);
  }
  closeDialogGuardar(){
    this.enviarTratamientosComunes();
    this.ref.close(
        this.config.data?{
              index: this.config.data.index,
              row: this.dataTratamientosComunes[0]
            }:
            this.dataTratamientosComunes[0]);
  }

  closeDialog(){
    this.ref.close();
  }

}

