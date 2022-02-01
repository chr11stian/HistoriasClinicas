import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {item,valoracionMental} from "../../models/plan-atencion-adulto-mayor.model";
import {AdultoMayorService} from "../../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ModalMentalComponent} from "./modal-mental/modal-mental.component";
@Component({
  selector: 'app-valoracion-mental-adulto-mayor',
  templateUrl: './Mental-adultoMayor.html',
  styleUrls: ['./Mental-adultoMayor.css'],
  providers: [DialogService]
})
export class MentalAdultoMayor implements OnInit {
  formValoracionMental:FormGroup;
  valoracionMental:valoracionMental;
  nivelEducativo:string="";
  valoracion:string="";
  ref: DynamicDialogRef;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  docRecuperado="";
  tipoDocRecuperado="";
  listaValoracionMental:any[]=[];
  lista:any[]=[];
  constructor(private formBuilder: FormBuilder,
              private valoracionService: AdultoMayorService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
          if (params['nroDoc']) {
            this.tipoDocRecuperado = params['tipoDoc']
            this.docRecuperado = params['nroDoc']
          } else {
            this.router.navigate(['/dashboard/adulto-mayor/citas'])
          }
        })
    this.valoracionService.getDatosGeneralesAdultoMayor(this.tipoDocRecuperado,this.docRecuperado).subscribe((res: any) => {
      console.log(res.object);
      console.log(res.object.gradoInstruccion);
      this.nivelEducativo=res.object.gradoInstruccion;
    });
    this.recuperarDataMentalBD();
  }
  buildForm(){
    this.formValoracionMental = this.formBuilder.group({
      sabeFecha:new FormControl(''),
      sabeSemana:new FormControl(''),
      sabeLugar:new FormControl(''),
      sabeTelefonoDireccion:new FormControl(''),
      sabeEdad:new FormControl(''),
      sabeLugarNac:new FormControl(''),
      sabePresidente:new FormControl(''),
      sabeAnteriorPresidente:new FormControl(''),
      sabeApeMadre:new FormControl(''),
      sabeResta:new FormControl(''),
      diagnosticoCognitivo:new FormControl(''),
      satisfecho:new FormControl(''),
      importante:new FormControl(''),
      probMemoria:new FormControl(''),
      desganado:new FormControl(''),
      diagnosticoAfectivo:new FormControl(''),
    })
  }
  recuperarValoracionMental(){
    let itemsCongnitivo: item[]=[];
    let itemsAfectivo: item[]=[];

    let sabeFecha:boolean = this.formValoracionMental.value.sabeFecha;
    let sabeSemana:boolean =this.formValoracionMental.value.sabeSemana;
    let sabeLugar:boolean =this.formValoracionMental.value.sabeLugar;
    let sabeTelefonoDireccion:boolean =this.formValoracionMental.value.sabeTelefonoDireccion;
    let sabeEdad:boolean =this.formValoracionMental.value.sabeEdad;
    let sabeLugarNac:boolean =this.formValoracionMental.value.sabeLugarNac;
    let sabePresidente:boolean =this.formValoracionMental.value.sabePresidente;
    let sabeAnteriorPresidente:boolean=this.formValoracionMental.value.sabeAnteriorPresidente;
    let sabeApeMadre:boolean =this.formValoracionMental.value.sabeApeMadre;
    let sabeResta:boolean =this.formValoracionMental.value.sabeResta;
    let satisfecho:boolean =this.formValoracionMental.value.satisfecho;
    let importante:boolean =this.formValoracionMental.value.importante;
    let probMemoria:boolean =this.formValoracionMental.value.probMemoria;
    let desganado:boolean =this.formValoracionMental.value.desganado;
    /******************ESTADO COGNITIVO***********************/
    /************1 PREGUNTA********************/
    if (sabeFecha) {
      let aux = {nombreItem: 'FECHA DE HOY', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem:'FECHA DE HOY', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************2 PREGUNTA********************/
    if (sabeSemana) {
      let aux = {nombreItem: 'DIA DE LA SEMANA', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'DIA DE LA SEMANA', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************ 3 PREGUNTA*********************/
    if (sabeLugar) {
      let aux = {nombreItem: 'EN QUE LUGAR ESTAMOS', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }
    else{
      let aux = {nombreItem: 'EN QUE LUGAR ESTAMOS', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************4 PREGUNTA*********************/
    if (sabeTelefonoDireccion) {
      let aux = {nombreItem: 'NUMERO DE TELEFONO/DIRECCION', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'NUMERO DE TELEFONO/DIRECCION', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************5 PREGUNTA********************/
    if (sabeEdad) {
      let aux = {nombreItem: 'CUANTOS AÑOS TIENE', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'CUANTOS AÑOS TIENE', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************6 PREGUNTA********************/
    if (sabeLugarNac) {
      let aux = {nombreItem: 'DONDE NACIO', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'DONDE NACIO', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************7 PREGUNTA*****7***************/
    if (sabeApeMadre) {
      let aux = {nombreItem: 'PRIMER APELLIDO DE SU MADRE', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'PRIMER APELLIDO DE SUS MADRE', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************8 PREGUNTA********************/
    if (sabeResta) {
      let aux = {nombreItem: 'RESTAR DE 3 EN 3 DESDE 30', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'RESTAR DE 3 EN 3 DESDE 30', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************9 PREGUNTA********************/
    if (sabePresidente) {
      let aux = {nombreItem: 'NOMBRE DEL PRESIDENTE DEL PERU', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'NOMBRE DEL PRESIDENTE DEL PERU', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /************9 PREGUNTA********************/
    if (sabeAnteriorPresidente) {
      let aux = {nombreItem: 'NOMBRE DEL ANTERIOR PRESIDENTE DEL PERU', respuesta: 'SI', puntaje: 0}
      itemsCongnitivo.push(aux);
    }else{
      let aux = {nombreItem: 'NOMBRE DEL ANTERIOR PRESIDENTE DEL PERU', respuesta: 'NO', puntaje: 1}
      itemsCongnitivo.push(aux);
    }
    /******************ESTADO AFECTIVO***********************/
    /************1 PREGUNTA********************/
    if (satisfecho) {
      let aux = {nombreItem: 'ESTA SATISFECHO CON SU VIDA', respuesta: 'SI', puntaje: 0}
      itemsAfectivo.push(aux);
    }else{
      let aux = {nombreItem: 'ESTA SATISFECHO CON SU VIDA', respuesta: 'NO', puntaje:1}
      itemsAfectivo.push(aux);
    }
    /************2 PREGUNTA********************/
    if (importante) {
      let aux = {nombreItem: 'SE SIENTE IMPOTENTE O INDEFENSO', respuesta: 'SI', puntaje: 1}
      itemsAfectivo.push(aux);
    }else{
      let aux = {nombreItem: 'SE SIENTE IMPOTENTE O INDEFENSO', respuesta: 'NO', puntaje: 0}
      itemsAfectivo.push(aux);
    }
    /************ 3 PREGUNTA*********************/
    if (probMemoria) {
      let aux = {nombreItem: 'TIENE PROBLEMAS DE MEMORIA', respuesta: 'SI', puntaje: 0}
      itemsAfectivo.push(aux);
    }
    else{
      let aux = {nombreItem: 'TIENE PROBLEMAS DE MEMORIA', respuesta: 'NO', puntaje: 1}
      itemsAfectivo.push(aux);
    }
    /************4 PREGUNTA*********************/
    if (desganado) {
      let aux = {nombreItem: 'SIENTE DESGANO O SE SIENTE IMPOSIBILITADO RESPECTO A ACTIVIDADES E INTERESES', respuesta: 'SI', puntaje: 1}
      itemsAfectivo.push(aux);
    }else{
      let aux = {nombreItem:'SIENTE DESGANO O SE SIENTE IMPOSIBILITADO RESPECTO A ACTIVIDADES E INTERESES', respuesta: 'NO', puntaje: 0}
      itemsAfectivo.push(aux);
    }
   /****************-----CALCULAR EL PUNTAJE PARA EL DX COGNITIVO----************************/
    console.log("grado instruccion:" ,this.nivelEducativo);
    let sumaCong = 0;

    let diagnosticos:string="";
    for(let i = 0;i<itemsCongnitivo.length;i++){
      sumaCong+=itemsCongnitivo[i].puntaje;
    }
    if(this.nivelEducativo=="ANALFABETO" || this.nivelEducativo == 'PRIMARIA INCOMPLETA'){sumaCong=sumaCong-1;}else{ console.log("suma congnitivo", sumaCong);}
    console.log(sumaCong);
    if(sumaCong<=10){diagnosticos="DETERIORO COGNITIVO SEVERO";}
    if(sumaCong<=7){diagnosticos="DETERIORO COGNITIVO MODERADO";}
    if(sumaCong<=4){diagnosticos="DETERIORO COGNITIVO LEVE";}
    if(sumaCong<=2){diagnosticos="NO DETERIORO COGNITIVO";}
    /****************-----CALCULAR EL PUNTAJE PARA EL DX AFECTIVO----************************/

    let sumaAfectivo = 0;
    let diagnosticos2:string="";
    for(let i = 0;i<itemsAfectivo.length;i++){
      sumaAfectivo+=itemsAfectivo[i].puntaje;
    }

    if(sumaAfectivo<=1){diagnosticos2="SIN MANIFESTACIONES DEPRESIVAS"}
    else{
      diagnosticos2 = "CON MANIFESTACIONES DEPRESIVAS"
    }
    this.valoracionMental = {
      diagnosticoCognitivo: diagnosticos,
      itemsEstadoCognitivo:itemsCongnitivo,
      diagnosticoAfectivo:diagnosticos2,
      itemsEstadoAfectivo:itemsAfectivo
    }
    // console.log(this.valoracionMental);
  }
  agregarValoracionMental(){
      this.recuperarValoracionMental();
      let cadena = {tipoDoc:this.tipoDocRecuperado,
        nroDoc:this.docRecuperado,
        valoracionClinica:{
          fecha: this.obtenerFecha(),
          valoracionMental:this.valoracionMental
        }
      }
      // console.log('valoracion funcional a guardar:', cadena);
      this.formValoracionMental.patchValue({ 'diagnosticoCognitivo': this.valoracionMental.diagnosticoCognitivo });
      this.formValoracionMental.patchValue({'diagnosticoAfectivo':this.valoracionMental.diagnosticoAfectivo});
      this.valoracionService.postValoracionClinicaAgregarPorDoc(cadena).subscribe((res: any) => {
        console.log('se guardo correctamente ', res.object);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });

  }
  obtenerFecha():string{
    const Dates = new Date();
    //Año
    const Year : number = Dates.getFullYear();
    // El subíndice del mes es 0-11
    const Months : any = ( Dates.getMonth() + 1 ) < 10  ?  '0' + (Dates.getMonth() + 1) : ( Dates.getMonth() + 1);
    // Número específico de días
    const Day : any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    //Hora
    const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
    //Minuto
    const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
    //segundo
    const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
    // Devolver formato de datos,
    console.log(Year + '-' + Months + '-' + Day + '-' + Hours + ':' + Minutes + ':' + Seconds);
    return Year + '-' + Months + '-' + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
  }
  agregarActualizar(){

    if(this.valoracionMental==null || this.valoracionMental== undefined){
      this.agregarValoracionMental();
    }
    else{
      this.actualizarValoracionMental();
    }
  }
  actualizarValoracionMental(){
    this.recuperarValoracionMental();
    let cadena = {
      tipoDoc:this.tipoDocRecuperado,
      nroDoc:this.docRecuperado,
      valoracionClinica: {
        fecha: this.obtenerFecha(),
        valoracionMental: this.valoracionMental
      }
    }
    this.formValoracionMental.patchValue({ 'diagnosticoCognitivo': this.valoracionMental.diagnosticoCognitivo });
    this.formValoracionMental.patchValue({'diagnosticoAfectivo':this.valoracionMental.diagnosticoAfectivo});
    // console.log('valoracion funcional a guardar:',cadena);
    this.valoracionService.updateValoracionClinicaEditarPorDoc(cadena).subscribe((res: any) => {
      // console.log('se actualizo correctamente ', res.object);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    });
  }
  recuperarDataMentalBD() {
    const data = {
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.docRecuperado
    }

    // this.valoracionService.postValoracionClinicaMentalPorDoc(data).subscribe((res: any) => {
    //   if (res.object != null) {
    //     this.valoracionMental = res.object;
    //     console.log(this.valoracionMental);
    //     let tamanio = res.object.length;
        // this.valoracionMental = res.object.valoracionesClinicas[0].valoracionMental;
        // this.messageService.add({
        //   severity: "success",
        //   summary: "Exito",
        //   detail: res.mensaje
        // });
        this.valoracionService.postValoracionClinicaPorDoc(data).subscribe((res: any) => {
          this.listaValoracionMental.push(res.object);
          if (res.object.valoracionesClinicas[0].valoracionMental != null) {
            console.log(this.listaValoracionMental);
            this.valoracionMental = res.object.valoracionesClinicas[0].valoracionMental;
            console.log(this.valoracionMental);
          this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
          });
        /*****LLENAR CAMPOS RECUPERADOS DE LA BD - COGNITIVO*****/
        let dxCognitivo = this.valoracionMental.diagnosticoCognitivo;
        console.log("dx",dxCognitivo);
          let aux1 = this.valoracionMental[0].itemsEstadoCognitivo[0].respuesta;
          // console.log(aux1);
          let aux2 = this.valoracionMental[0].itemsEstadoCognitivo[1].respuesta;
          // console.log(aux2);
          let aux3 = this.valoracionMental[0].itemsEstadoCognitivo[2].respuesta;
          // console.log(aux3);
          let aux4 = this.valoracionMental[0].itemsEstadoCognitivo[3].respuesta;
          // console.log(aux4);
          let aux5 = this.valoracionMental[0].itemsEstadoCognitivo[4].respuesta;
          // console.log(aux5);
          let aux6 = this.valoracionMental[0].itemsEstadoCognitivo[5].respuesta;
          // console.log(aux6);
          let aux7 = this.valoracionMental[0].itemsEstadoCognitivo[6].respuesta;
          // console.log(aux7);
          let aux8 = this.valoracionMental[0].itemsEstadoCognitivo[7].respuesta;
          // console.log(aux8);
          let aux9 = this.valoracionMental[0].itemsEstadoCognitivo[8].respuesta;
          // console.log(aux9);
          let aux10 = this.valoracionMental[0].itemsEstadoCognitivo[9].respuesta;
          // console.log(aux10);

          if (aux1 == 'NO')
            this.formValoracionMental.get("sabeFecha").setValue(false);
          else {
            this.formValoracionMental.get("sabeFecha").setValue(true);
          }
          if (aux2 == 'NO')
            this.formValoracionMental.get("sabeSemana").setValue(false);
          else {
            this.formValoracionMental.get("sabeSemana").setValue(true);
          }
          if (aux3 == 'NO')
            this.formValoracionMental.get("sabeLugar").setValue(false);
          else {
            this.formValoracionMental.get("sabeLugar").setValue(true);
          }
          if (aux4 == 'NO')
            this.formValoracionMental.get("sabeTelefonoDireccion").setValue(false);
          else {
            this.formValoracionMental.get("sabeTelefonoDireccion").setValue(true);
          }
          if (aux5 == 'NO')
            this.formValoracionMental.get("sabeEdad").setValue(false);
          else {
            this.formValoracionMental.get("sabeEdad").setValue(true);
          }
          if (aux6 == 'NO')
            this.formValoracionMental.get("sabeLugarNac").setValue(false);
          else {
            this.formValoracionMental.get("sabeLugarNac").setValue(true);
          }
          if (aux7 == 'NO')
            this.formValoracionMental.get("sabePresidente").setValue(false);
          else {
            this.formValoracionMental.get("sabePresidente").setValue(true);
          }
          if (aux8 == 'NO')
            this.formValoracionMental.get("sabeAnteriorPresidente").setValue(false);
          else {
            this.formValoracionMental.get("sabeAnteriorPresidente").setValue(true);
          }
          if (aux9 == 'NO')
            this.formValoracionMental.get("sabeApeMadre").setValue(false);
          else {
            this.formValoracionMental.get("sabeApeMadre").setValue(true);
          }
          if (aux10 == 'NO')
            this.formValoracionMental.get("sabeResta").setValue(false);
          else {
            this.formValoracionMental.get("sabeResta").setValue(true);
          }
          this.formValoracionMental.patchValue({'diagnosticoCognitivo': this.valoracionMental[0].diagnosticoCognitivo});
          this.formValoracionMental.patchValue({'diagnosticoAfectivo': this.valoracionMental[0].diagnosticoAfectivo});
          /*********************RECUPERAR ESTADO AFECTIVO*****************************/
          /*****LLENAR CAMPOS RECUPERADOS DE LA BD - COGNITIVO*****/
          let dxAfectivo = this.valoracionMental[0].diagnosticoAfectivo;
          console.log("dx", dxAfectivo);
          let aux11 = this.valoracionMental[0].itemsEstadoCognitivo[0].respuesta;
          // console.log(aux11);
          let aux12 = this.valoracionMental[0].itemsEstadoCognitivo[1].respuesta;
          // console.log(aux12);
          let aux13 = this.valoracionMental[0].itemsEstadoCognitivo[2].respuesta;
          // console.log(aux13);
          let aux14 = this.valoracionMental[0].itemsEstadoCognitivo[3].respuesta;
          // console.log(aux14);

          if (aux11 == 'NO')
            this.formValoracionMental.get("satisfecho").setValue(false);
          else {
            this.formValoracionMental.get("satisfecho").setValue(true);
          }
          if (aux12 == 'NO')
            this.formValoracionMental.get("importante").setValue(false);
          else {
            this.formValoracionMental.get("importante").setValue(true);
          }
          if (aux13 == 'NO')
            this.formValoracionMental.get("probMemoria").setValue(false);
          else {
            this.formValoracionMental.get("probMemoria").setValue(true);
          }
          if (aux14 == 'NO')
            this.formValoracionMental.get("desganado").setValue(false);
          else {
            this.formValoracionMental.get("desganado").setValue(true);
          }

        }

            else {
            this.messageService.add({
              severity: "warn",
              summary: "Error",
              detail: "No hay datos en Valoración"
            });
          }

         });

  }
  listarValoraciones(){
    this.valoracion = "valoracionMental";

    this.ref = this.dialogService.open(ModalMentalComponent, {
      width: '80%',
      data:this.listaValoracionMental
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('datos de modal valoracion mental ', this.listaValoracionMental)

    })
  }
  nuevaValoracion(){
    this.formValoracionMental.reset();
  }
}
