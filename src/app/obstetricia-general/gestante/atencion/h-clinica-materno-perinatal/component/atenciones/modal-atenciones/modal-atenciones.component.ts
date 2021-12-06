import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DynamicDialogRef,DynamicDialogConfig} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-atenciones',
  templateUrl: './modal-atenciones.component.html',
  styleUrls: ['./modal-atenciones.component.css']
})
export class ModalAtencionesComponent implements OnInit {

  formAtenciones:FormGroup;
  dialogAtenciones = false;
  idObstetricia:string;
  datePippe = new DatePipe('en-US');
  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private obstetriciaGeneralService:ObstetriciaGeneralService,
              private config:DynamicDialogConfig)
  {
    this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
    console.log(config.data);
    this.buildForm();
    if(config.data){
      this.llenarCamposTratamientoInmunizaciones();
    }
  }

  ngOnInit(): void {
  }
  openNew(){
    this.formAtenciones.reset();
    this.dialogAtenciones = true;
  }
  buildForm() {
    this.formAtenciones = this.form.group({
      fechaAtencion:new FormControl("",[Validators.required]),
      edadGestacionalSemanas:new FormControl("",[Validators.required]),
      peso:new FormControl("",[Validators.required]),
      evaluacionNutricional:new FormControl("",[Validators.required]),
      temperatura:new FormControl("",[Validators.required]),
      presionArterial:new FormControl("",[Validators.required]),
      pulso:new FormControl("",[Validators.required]),
      alturaUterina:new FormControl("",[Validators.required]),
      proteinuria:new FormControl("",[Validators.required]),
      edema:new FormControl("",[Validators.required]),
      reflejoOsteotendinoso:new FormControl("",[Validators.required]),
      ecografia:new FormControl("",[Validators.required]),
      consejeriaIntegral:new FormControl("",[Validators.required]),
      acidoFolico:new FormControl("",[Validators.required]),
      hierroYAcidoFolico:new FormControl("",[Validators.required]),
      calcio:new FormControl("",[Validators.required]),
      planPartoReenfocada:new FormControl("",[Validators.required]),
      visitaDomiciliaria:new FormControl("",[Validators.required]),
      proxCita:new FormControl("",[Validators.required]),
      encargado:new FormControl("",[Validators.required]),
      establecimiento:new FormControl("",[Validators.required]),


    })
  }

  llenarCamposTratamientoInmunizaciones() {
    let configuracion = this.config.data.row;
    this.formAtenciones.get("fechaAtencion").setValue(configuracion.fechaAtencion);
    this.formAtenciones.get("edadGestacionalSemanas").setValue(configuracion.edadGestacionalSemanas);
    this.formAtenciones.get("peso").setValue(configuracion.peso);
    this.formAtenciones.get("evaluacionNutricional").setValue(configuracion.evaluacionNutricional);
    this.formAtenciones.get("temperatura").setValue(configuracion.temperatura);
    this.formAtenciones.get("presionArterial").setValue(configuracion.presionArterial);
    this.formAtenciones.get("pulso").setValue(configuracion.pulso);
    this.formAtenciones.get("alturaUterina").setValue(configuracion.alturaUterina);
    this.formAtenciones.get("proteinuria").setValue(configuracion.proteinuria);
    this.formAtenciones.get("edema").setValue(configuracion.edema);
    this.formAtenciones.get("reflejoOsteotendinoso").setValue(configuracion.reflejoOsteotendinoso);
    this.formAtenciones.get("ecografia").setValue(configuracion.ecografia);
    this.formAtenciones.get("consejeriaIntegral").setValue(configuracion.consejeriaIntegral);
    this.formAtenciones.get("acidoFolico").setValue(configuracion.acidoFolico);
    this.formAtenciones.get("hierroYAcidoFolico").setValue(configuracion.hierroYAcidoFolico);
    this.formAtenciones.get("calcio").setValue(configuracion.calcio);
    this.formAtenciones.get("planPartoReenfocada").setValue(configuracion.planPartoReenfocada);
    this.formAtenciones.get("visitaDomiciliaria").setValue(configuracion.visitaDomiciliaria);
    this.formAtenciones.get("proxCita").setValue(configuracion.proxCita);
    this.formAtenciones.get("encargado").setValue(configuracion.encargado);
    this.formAtenciones.get("establecimiento").setValue(configuracion.establecimiento);
  }

  closeDialogGuardar() {

  }

  closeDialog() {
    this.ref.close();
  }
}
