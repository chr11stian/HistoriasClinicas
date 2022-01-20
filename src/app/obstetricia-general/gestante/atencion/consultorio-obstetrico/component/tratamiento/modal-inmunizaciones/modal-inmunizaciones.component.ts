import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";

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
  datePipe = new DatePipe('en-US');
  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private obstetriciaGeneralService:ObstetriciaGeneralService,
              public config: DynamicDialogConfig)
  {

    this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
    console.log(config.data);
    this.buildForm();
    if(config.data){
      this.llenarCamposTratamientoInmunizaciones();
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

  ngOnInit(): void {
  }

  buildForm() {
    this.formInmunizaciones = this.form.group({
      codigo:new FormControl("",[Validators.required]),
      descripcion:new FormControl("",[Validators.required]),
      numero:new FormControl("",[Validators.required]),
      dosis:new FormControl("",[Validators.required]),
      viaAdministracion:new FormControl("",[Validators.required]),
      lote:new FormControl("",[Validators.required]),
      fechaVenc:new FormControl("",[Validators.required]),

    })
  }
  openNew(){
    this.formInmunizaciones.reset();
    this.dialogInmunizaciones = true;
  }
  enviarTratamientoInmunizaciones(){
    var tratamientoInmunizaciones ={
      codigo:this.formInmunizaciones.value.codigo,
      descripcion:this.formInmunizaciones.value.descripcion,
      numero:this.formInmunizaciones.value.numero,
      dosis:this.formInmunizaciones.value.dosis,
      viaAdministracion:this.formInmunizaciones.value.viaAdministracion,
      lote:this.formInmunizaciones.value.lote,
      fechaVenc: this.datePipe.transform(this.formInmunizaciones.value.fechaVenc, 'yyyy-MM-dd HH:mm:ss'),

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
    let configuracion = this.config.data.row;
    this.formInmunizaciones.get("codigo").setValue(configuracion.codigo);
    this.formInmunizaciones.get("descripcion").setValue(configuracion.descripcion);
    this.formInmunizaciones.get("numero").setValue(configuracion.numero);
    this.formInmunizaciones.get("dosis").setValue(configuracion.dosis);
    this.formInmunizaciones.get("viaAdministracion").setValue(configuracion.viaAdministracion);
    this.formInmunizaciones.get("lote").setValue(configuracion.lote);
    this.formInmunizaciones.get("fechaVenc").setValue(configuracion.fechaVenc);
    
  }
    closeDialogGuardar() {
        this.enviarTratamientoInmunizaciones();
        this.ref.close(
            this.config.data?{
                    index: this.config.data.index,
                    row: this.dataInmunizaciones[0]
                }:
                this.dataInmunizaciones[0]);
    }

    closeDialog() {
        this.ref.close();
    }
}
