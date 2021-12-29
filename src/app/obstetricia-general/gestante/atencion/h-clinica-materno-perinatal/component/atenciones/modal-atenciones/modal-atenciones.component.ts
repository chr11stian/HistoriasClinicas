import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DynamicDialogRef,DynamicDialogConfig} from "primeng/dynamicdialog";
import {ObstetriciaGeneralService} from "../../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";
import {THIS_EXPR} from "@angular/compiler/src/output/output_ast";

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
    if(configuracion.fechaAtencion!=null){ this.formAtenciones.get("fechaAtencion").setValue(configuracion.fechaAtencion);}
    if(configuracion.edadGestacionalSemanas != null || configuracion.edadGestacionalDias!=null){
      this.formAtenciones.get("edadGestacionalSemanas").setValue(configuracion.edadGestacionalSemanas + " " +  configuracion.edadGestacionalDias + "/7")
    }
    if(configuracion.peso !=null){this.formAtenciones.get("peso").setValue(configuracion.peso);}
    if(configuracion.evaluacionNutricional!=null) {
      this.formAtenciones.get("evaluacionNutricional").setValue(configuracion.evaluacionNutricional.valor + " " + configuracion.evaluacionNutricional.indicador);
    }
    if(configuracion.temperatura!=null){this.formAtenciones.get("temperatura").setValue(configuracion.t);}
    if(configuracion.presionDiastolica!=null || configuracion.presionSistolica!=null){
      this.formAtenciones.get("presionArterial").setValue(configuracion.presionSistolica + "/" + configuracion.presionDiastolica);
    }
    if(configuracion.pulso!=null){this.formAtenciones.get("pulso").setValue(configuracion.fc);}
    if(configuracion.alturaUterina!=null){this.formAtenciones.get("alturaUterina").setValue(configuracion.alturaUterina);}
    if(configuracion.proteinuria!=null){this.formAtenciones.get("proteinuria").setValue(configuracion.proteinuria);}
    if(configuracion.edema!=null){this.formAtenciones.get("edema").setValue(configuracion.edema);}
    if(configuracion.reflejoOsteotendinoso!=null){this.formAtenciones.get("reflejoOsteotendinoso").setValue(configuracion.reflejoOsteotendinoso);}
    if(configuracion.ecografia!=null){
      this.formAtenciones.get("ecografia").setValue(configuracion.ecografia.fecha + " (" + configuracion.ecografia.semanas + " "+ configuracion.ecografia.dias + "/7)");
    }
    // this.formAtenciones.get("consejeriaIntegral").setValue(configuracion.consejeriaIntegral);
    if(configuracion.acidoFolico!=null){
      this.formAtenciones.get("acidoFolico").setValue(configuracion.acidoFolico.numero + "(" + configuracion.acidoFolico.dosis + ")");
    }
    if(configuracion.hierroYAcidoFolico!=null){
      this.formAtenciones.get("hierroYAcidoFolico").setValue(configuracion.hierroYAcidoFolico.numero +"(" + configuracion.acidoFolico.dosis + ")");
    }
    if(configuracion.calcio!=null){
      this.formAtenciones.get("calcio").setValue(configuracion.calcio.numero + "(" + configuracion.calcio.dosis + ")");
    }
    if(configuracion.planPartoReenfocada!=null){
      this.formAtenciones.get("planPartoReenfocada").setValue(configuracion.planPartoReenfocada);
    }
    if(configuracion.visitaDomiciliaria.estado ==="NO" || configuracion.visitaDomiciliaria.estado === "NO APLICA"){ this.formAtenciones.get("visitaDomiciliaria").setValue(configuracion.visitaDomiciliaria.estado);}
    else{ this.formAtenciones.get("visitaDomiciliaria").setValue(configuracion.visitaDomiciliaria.estado +"-" + configuracion.visitaDomiciliaria.fecha);}
    if(configuracion.proxCita!=null)
    { this.formAtenciones.get("proxCita").setValue(configuracion.proxCita);}
    if(configuracion.encargado!=null)
    {this.formAtenciones.get("encargado").setValue(configuracion.encargado.tipoDoc + "-" + configuracion.encargado.nroDoc);}
    this.formAtenciones.get("establecimiento").setValue(configuracion.establecimiento);
    this.formAtenciones.get("nroAtencion").setValue(configuracion.nroAtencion);

    /**********Recorriendo todos los datos del array ORIENTACIONES************************************/
    if(configuracion.orientaciones!=null || configuracion.orientaciones!=undefined){
      let arrayOrientaciones:any[]=[];
      for(let i = 1;i<configuracion.orientaciones.length;i++){
        arrayOrientaciones.push(configuracion.orientaciones[i].consejeria);
      }
      console.log(arrayOrientaciones);
      let cadenaOrientaciones = arrayOrientaciones.join("/");
      this.formAtenciones.get("orientaciones").setValue(cadenaOrientaciones);

    }
   if(configuracion.interconsultas!=null || configuracion.interconsultas!= undefined){
     let arrayConsultorio:any[] = [];
     for(let i=0;i<configuracion.interconsultas.length;i++){
       arrayConsultorio.push(configuracion.interconsultas[i].consultorio);
     }
     console.log(arrayConsultorio);
     let cad = arrayConsultorio.join(" / ");
     this.formAtenciones.get("interconsultas").setValue(cad);
     /************Fin recorrido interconsultas************/
   }
   }
    /**********Recorriendo todos los datos del array INTERCONSULTAS**************************************/


  closeDialog() {
    this.ref.close();
  }
}
