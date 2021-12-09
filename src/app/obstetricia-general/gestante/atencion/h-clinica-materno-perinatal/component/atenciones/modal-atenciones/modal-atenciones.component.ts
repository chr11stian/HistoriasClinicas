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
  // datePippe = new DatePipe('en-US');
  examenesFetos: any[]=[];
  nroAtencion: any;

  constructor(private form:FormBuilder,
              private ref:DynamicDialogRef,
              private obstetriciaGeneralService:ObstetriciaGeneralService,
              private config:DynamicDialogConfig)
  {
   // this.idObstetricia=this.obstetriciaGeneralService.idGestacion;
   //  console.log(config.data);
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
      fechaAtencion:new FormControl({value: '', disabled: true},[Validators.required]),
      edadGestacionalSemanas:new FormControl({value: '', disabled: true},[Validators.required]),
      peso:new FormControl({value: '', disabled: true},[Validators.required]),
      evaluacionNutricional:new FormControl({value: '', disabled: true},[Validators.required]),
      temperatura:new FormControl({value: '', disabled: true},[Validators.required]),
      presionArterial:new FormControl({value: '', disabled: true},[Validators.required]),
      pulso:new FormControl({value: '', disabled: true},[Validators.required]),
      alturaUterina:new FormControl({value: '', disabled: true},[Validators.required]),
      proteinuria:new FormControl({value: '', disabled: true},[Validators.required]),
      edema:new FormControl({value: '', disabled: true},[Validators.required]),
      reflejoOsteotendinoso:new FormControl({value: '', disabled: true},[Validators.required]),
      ecografia:new FormControl({value: '', disabled: true},[Validators.required]),
      consejeriaIntegral:new FormControl({value: '', disabled: true},[Validators.required]),
      acidoFolico:new FormControl({value: '', disabled: true},[Validators.required]),
      hierroYAcidoFolico:new FormControl({value: '', disabled: true},[Validators.required]),
      calcio:new FormControl({value: '', disabled: true},[Validators.required]),
      planPartoReenfocada:new FormControl({value: '', disabled: true},[Validators.required]),
      visitaDomiciliaria:new FormControl({value: '', disabled: true},[Validators.required]),
      proxCita:new FormControl({value: '', disabled: true},[Validators.required]),
      encargado:new FormControl({value: '', disabled: true},[Validators.required]),
      establecimiento:new FormControl({value: '', disabled: true},[Validators.required]),
      orientaciones:new FormControl({value: '', disabled: true},[Validators.required]),
      interconsultas:new FormControl({value: '', disabled: true},[Validators.required]),
      nroAtencion:new FormControl({value: '', disabled: true},[Validators.required]),

    })
  }

  llenarCamposTratamientoInmunizaciones() {
    let configuracion = this.config.data.row;
    this.examenesFetos = configuracion.examenesFetos;
    this.formAtenciones.get("fechaAtencion").setValue(configuracion.fechaAtencion);
    this.formAtenciones.get("edadGestacionalSemanas").setValue(configuracion.edadGestacionalSemanas + " " +  configuracion.edadGestacionalDias + "/7");
    this.formAtenciones.get("peso").setValue(configuracion.peso);
    this.formAtenciones.get("evaluacionNutricional").setValue(configuracion.evaluacionNutricional.valor +" "+ configuracion.evaluacionNutricional.indicador);
    this.formAtenciones.get("temperatura").setValue(configuracion.t);
    this.formAtenciones.get("presionArterial").setValue(configuracion.presionSistolica + "/" + configuracion.presionDiastolica);
    this.formAtenciones.get("pulso").setValue(configuracion.fc);
    this.formAtenciones.get("alturaUterina").setValue(configuracion.alturaUterina);
    this.formAtenciones.get("proteinuria").setValue(configuracion.proteinuria);
    this.formAtenciones.get("edema").setValue(configuracion.edema);
    this.formAtenciones.get("reflejoOsteotendinoso").setValue(configuracion.reflejoOsteotendinoso);
    this.formAtenciones.get("ecografia").setValue(configuracion.ecografia);
    this.formAtenciones.get("consejeriaIntegral").setValue(configuracion.consejeriaIntegral);
    this.formAtenciones.get("acidoFolico").setValue(configuracion.acidoFolico.numero + "(" + configuracion.acidoFolico.dosis + ")");
    this.formAtenciones.get("hierroYAcidoFolico").setValue(configuracion.hierroYAcidoFolico.numero +"(" + configuracion.acidoFolico.dosis + ")");
    this.formAtenciones.get("calcio").setValue(configuracion.calcio.numero + "(" + configuracion.calcio.dosis + ")");
    this.formAtenciones.get("planPartoReenfocada").setValue(configuracion.planPartoReenfocada);
    this.formAtenciones.get("visitaDomiciliaria").setValue(configuracion.visitaDomiciliaria.estado +"-" + configuracion.visitaDomiciliaria.fecha);
    this.formAtenciones.get("proxCita").setValue(configuracion.proxCita);
    this.formAtenciones.get("encargado").setValue(configuracion.encargado.tipoDoc + "-" + configuracion.encargado.nroDoc);
    this.formAtenciones.get("establecimiento").setValue(configuracion.establecimiento);
    this.formAtenciones.get("nroAtencion").setValue(configuracion.nroAtencion);

    /**********Recorriendo todos los datos del array ORIENTACIONES************************************/

    for(let i = 1;i<configuracion.orientaciones.length;i++){
      this.formAtenciones.get("orientaciones").setValue(configuracion.orientaciones[i].consejeria +"/"+ configuracion.orientaciones[i-1].consejeria)
    }
    /**********Recorriendo todos los datos del array INTERCONSULTAS**************************************/
    for(let i = 1;i<configuracion.interconsultas.length;i++){
      this.formAtenciones.get("interconsultas").setValue(configuracion.interconsultas[i].consultorio+"/"+configuracion.interconsultas[i-1].consultorio);/*ojo*/
    }

  }

  closeDialog() {
    this.ref.close();
  }
}
