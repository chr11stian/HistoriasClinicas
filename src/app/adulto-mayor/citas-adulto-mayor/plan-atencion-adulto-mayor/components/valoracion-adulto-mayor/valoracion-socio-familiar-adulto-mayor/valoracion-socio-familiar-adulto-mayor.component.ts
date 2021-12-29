import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";
import {item, valoracionFuncional} from "../../models/plan-atencion-adulto-mayor.model";

@Component({
  selector: 'app-valoracion-socio-familiar-adulto-mayor',
  templateUrl: './valoracion-socio-familiar-adulto-mayor.component.html',
  styleUrls: ['./valoracion-socio-familiar-adulto-mayor.component.css']
})
export class ValoracionSocioFamiliarAdultoMayorComponent implements OnInit {
  formValoracionFamiliar:FormGroup;
  valoracionSocioFamiliar:valoracionFuncional;
  isUpdate:boolean=false;
  fechaActual:Date = new Date();
  idRecuperado = "61b23fa6308deb1ddd0b3704";
  constructor(private formBuilder: FormBuilder,
              private valoracionService: AdultoMayorService,
              private messageService: MessageService) {
    this.builForm();
  }

  ngOnInit(): void {

    this.recuperarDataBDSocioFamiliar();
  }
  builForm(){
    this.formValoracionFamiliar = this.formBuilder.group({
      situacionFamiliar: new FormControl(''),
      situacionEconomica:new FormControl(''),
      situacionVivienda:new FormControl(''),
      situacionSocial:new FormControl(''),
      situacionApoyo:new FormControl(''),
      situacionSocioFamiliar:new FormControl(''),
      diagnostico: new FormControl('')
    })
  }
  recuperarValoracionFamiliar(){
    let items: item[]=[];
    /********SITUACION FAMILIAR******/
    if (this.formValoracionFamiliar.value.situacionFamiliar=='Vive con familia, sin conflicto familiar'){
      let aux = {nombreItem:'SITUACION FAMILIAR', respuesta:'Vive con familia, sin conflicto familiar',puntaje:1}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionFamiliar=='Vive con familia , presenta algún grado de dependencia física/psiquica'){
      let aux = {nombreItem:'SITUACION FAMILIAR', respuesta:'Vive con familia , presenta algún grado de dependencia física/psiquica',puntaje:2}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionFamiliar=='Vive con cónyuge de similar edad'){
      let aux = {nombreItem:'SITUACION FAMILIAR', respuesta:'Vive con cónyuge de similar edad',puntaje:3}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionFamiliar=='Vive solo y tiene hijos con vivienda próxima'){
      let aux = {nombreItem:'SITUACION FAMILIAR', respuesta:'Vive solo y tiene hijos con vivienda próxima',puntaje:4}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionFamiliar=='Vive solo y carece de hijos o viven lejos (interior del país o extranjero)'){
      let aux = {nombreItem:'SITUACION FAMILIAR', respuesta:'Vive solo y carece de hijos o viven lejos (interior del país o extranjero)',puntaje:5}
      items.push(aux)
    }
    /***********SITUACION ECONOMICA***********/
    if (this.formValoracionFamiliar.value.situacionEconomica=='Dos veces el salario mínimo vital'){
      let aux = {nombreItem:'SITUACION ECONOMICA', respuesta:'Dos veces el salario mínimo vital',puntaje:1}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionEconomica=='Menos de 2, pero más de 1 salario mínimo vital'){
      let aux = {nombreItem:'SITUACION ECONOMICA', respuesta:'Menos de 2, pero más de 1 salario mínimo vital',puntaje:2}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionEconomica=='Un salario mínimo vital'){
      let aux = {nombreItem:'SITUACION ECONOMICA', respuesta:'Un salario mínimo vital',puntaje:3}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionEconomica=='Ingreso irregular (menos del mínimo vital)'){
      let aux = {nombreItem:'SITUACION ECONOMICA', respuesta:'Ingreso irregular (menos del mínimo vital)',puntaje:4}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionEconomica=='Sin pensión, sin otros ingresos'){
      let aux = {nombreItem:'SITUACION ECONOMICA', respuesta:'Sin pensión, sin otros ingresos',puntaje:5}
      items.push(aux)
    }
    /***********SITUACION VIVIENDA***********/
    if (this.formValoracionFamiliar.value.situacionVivienda=='Adecuada a las necesidades'){
      let aux = {nombreItem:'VIVIENDA', respuesta:'Adecuada a las necesidades',puntaje:1}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionVivienda=='Barreras arquitectónicas en la vivienda(pisos irregulares, gradas, puertas estrechas)'){
      let aux = {nombreItem:'VIVIENDA', respuesta:'Barreras arquitectónicas en la vivienda(pisos irregulares, gradas, puertas estrechas)',puntaje:2}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionVivienda=='Mala conservación, humedad, mala higiene, equipamiento inadecuado (baño incompleto)s'){
      let aux = {nombreItem:'VIVIENDA', respuesta:'Mala conservación, humedad, mala higiene, equipamiento inadecuado (baño incompleto)',puntaje:3}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionVivienda=='Vivienda semi construida o de material rústico'){
      let aux = {nombreItem:'VIVIENDA', respuesta:'Vivienda semi construida o de material rústico',puntaje:4}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionVivienda=='Asentamiento humano(invasión) o sin vivienda'){
      let aux = {nombreItem:'VIVIENDA', respuesta:'Asentamiento humano(invasión) o sin vivienda',puntaje:5}
      items.push(aux)
    }
    /***********SITUACION SOCIAL***********/
    if (this.formValoracionFamiliar.value.situacionSocial=='Mantiene relaciones sociales en la comunidad'){
      let aux = {nombreItem:'SITUACION SOCIAL', respuesta:'Mantiene relaciones sociales en la comunidad',puntaje:1}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionSocial=='Relación social sólo con la familia y vecinos'){
      let aux = {nombreItem:'SITUACION SOCIAL', respuesta:'Relación social sólo con la familia y vecinos',puntaje:2}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionSocial=='Relación socil sólo con la familia'){
      let aux = {nombreItem:'SITUACION SOCIAL', respuesta:'Relación socil sólo con la familia',puntaje:3}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionSocial=='No sale del domicilio pero recibe visitas de familia'){
      let aux = {nombreItem:'SITUACION SOCIAL', respuesta:'No sale del domicilio pero recibe visitas de familia',puntaje:4}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionSocial=='No sale del domicilio y no recibe visitas'){
      let aux = {nombreItem:'SITUACION SOCIAL', respuesta:'No sale del domicilio y no recibe visitas',puntaje:5}
      items.push(aux)
    }
    /**********SITUACION APOYO********/
    if (this.formValoracionFamiliar.value.situacionApoyo=='No necesita apoyo'){
      let aux = {nombreItem:'APOYO DE LA RED SOCIAL MUNICIPIO, CLUBES, ONG, SEGURO SOCIAL, VIVIENDA', respuesta:'No necesita apoyo',puntaje:1}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionApoyo=='Requiere apoyo familiar o vecinal'){
      let aux = {nombreItem:'APOYO DE LA RED SOCIAL MUNICIPIO, CLUBES, ONG, SEGURO SOCIAL, VIVIENDA', respuesta:'Requiere apoyo familiar o vecinal',puntaje:2}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionApoyo=='Tiene seguro pero necesita mayor apoyo de éste o voluntario social'){
      let aux = {nombreItem:'APOYO DE LA RED SOCIAL MUNICIPIO, CLUBES, ONG, SEGURO SOCIAL, VIVIENDA', respuesta:'Tiene seguro pero necesita mayor apoyo de éste o voluntario social',puntaje:3}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionApoyo=='No cuenta con seguro social'){
      let aux = {nombreItem:'APOYO DE LA RED SOCIAL MUNICIPIO, CLUBES, ONG, SEGURO SOCIAL, VIVIENDA', respuesta:'No cuenta con seguro social',puntaje:4}
      items.push(aux)
    }
    if (this.formValoracionFamiliar.value.situacionApoyo=='Situación de abandono familiar'){
      let aux = {nombreItem:'APOYO DE LA RED SOCIAL MUNICIPIO, CLUBES, ONG, SEGURO SOCIAL, VIVIENDA', respuesta:'Situación de abandono familiar',puntaje:5}
      items.push(aux)
    }
    /************VALORACION SOCIO FAMILIAR**********/
    let suma = 0;
    let diagnosticos:string="";
    for(let i = 0; i<items.length;i++){
      suma+=items[i].puntaje;
    }
    if(suma<=9){diagnosticos="BUENA/ACEPTABLE SITUACION SOCIAL"}
    else{
      if(suma<=14){
        diagnosticos="EXISTE RIESGO SOCIAL";}
        else {
        diagnosticos ="EXISTE PROBLEMA SOCIAL";
      }
    }
    console.log("items" ,items);
    console.log("items" ,diagnosticos);

    this.valoracionSocioFamiliar = {
      diagnostico:diagnosticos,
      items:items
    }
  }
  agregarValoracionFuncional(){
    console.log("entrando a guardar data");
      this.recuperarValoracionFamiliar();
      let cadena = {
        fecha: "2021-12-10 15:00:00",
        valoracionSocioFamiliar: this.valoracionSocioFamiliar
      }
      this.formValoracionFamiliar.patchValue({ 'diagnostico': this.valoracionSocioFamiliar.diagnostico });
      console.log('valoracion familiar a guardar:', cadena);
      this.valoracionService.postValoracionClinica(this.idRecuperado, cadena).subscribe((res: any) => {
        console.log('se guardo correctamente ', res.object);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
      });

  }
  agregarActualizar(){

    if(this.valoracionSocioFamiliar==null || this.valoracionSocioFamiliar== undefined){
      this.agregarValoracionFuncional();
    }
   else{
      this.actualizarValoracionFuncional();
    }
  }
  actualizarValoracionFuncional(){
    this.recuperarValoracionFamiliar();
    let cadena = {
      fecha: "2021-12-10 15:00:00",
      valoracionSocioFamiliar: this.valoracionSocioFamiliar
    }
    this.formValoracionFamiliar.patchValue({ 'diagnostico': this.valoracionSocioFamiliar.diagnostico });
    console.log('valoracion funcional a guardar:',cadena);
    this.valoracionService.updateValoracionClinica(this.idRecuperado,cadena).subscribe((res: any) => {
      console.log('se actualizo correctamente ', res.object);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: res.mensaje
      });
    });
  }
  recuperarDataBDSocioFamiliar(){
    this.valoracionService.getValoracionClinica(this.idRecuperado).subscribe((res: any) => {
      console.log('se recupero datos satisfactoriamente', res.object);
      this.valoracionSocioFamiliar=res.object.valoracionesClinicas[0].valoracionSocioFamiliar;
      console.log(this.valoracionSocioFamiliar);
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: res.mensaje
        });
        /***********Llenar campos recuperados de la BD************/
        let dx = this.valoracionSocioFamiliar.diagnostico;
        console.log("dx",dx);
        let aux1=this.valoracionSocioFamiliar.items[0].puntaje;
        console.log(aux1);
        let aux2=this.valoracionSocioFamiliar.items[1].puntaje;
        console.log(aux2);
        let aux3=this.valoracionSocioFamiliar.items[2].puntaje;
        console.log(aux3);
        let aux4=this.valoracionSocioFamiliar.items[3].puntaje;
        console.log(aux4);
        let aux5=this.valoracionSocioFamiliar.items[4].puntaje;
        console.log(aux5);
        let aux6=this.valoracionSocioFamiliar.diagnostico;
        console.log(aux6);
        /**************SITUACION FAMILIAR*****************/
        if(aux1==1)
            this.formValoracionFamiliar.get('situacionFamiliar').setValue('Vive con familia, sin conflicto familiar');
        if(aux1==2)
            this.formValoracionFamiliar.get('situacionFamiliar').setValue("Vive con familia , presenta algún grado de dependencia física/psiquica");
        if(aux1==3)
            this.formValoracionFamiliar.get('situacionFamiliar').setValue("Vive con cónyuge de similar edad");
        if(aux1==4)
            this.formValoracionFamiliar.get('situacionFamiliar').setValue("Vive solo y tiene hijos con vivienda próxima");
        if(aux1==5)
            this.formValoracionFamiliar.get('situacionFamiliar').setValue("Vive solo y carece de hijos o viven lejos (interior del país o extranjero)");
        /**************SITUACION ECONOMICA*****************/
        if(aux2==1)
            this.formValoracionFamiliar.get('situacionEconomica').setValue("Dos veces el salario mínimo vital");
        if(aux2==2)
            this.formValoracionFamiliar.get('situacionEconomica').setValue("Menos de 2, pero más de 1 salario mínimo vital");
        if(aux2==3)
            this.formValoracionFamiliar.get('situacionEconomica').setValue("Un salario mínimo vital");
        if(aux2==4)
            this.formValoracionFamiliar.get('situacionEconomica').setValue("Ingreso irregular (menos del mínimo vital)");
        if(aux2==5)
            this.formValoracionFamiliar.get('situacionEconomica').setValue("Sin pensión, sin otros ingresos");
        /**************SITUACION FAMILIAR*****************/
        if(aux3==1)
            this.formValoracionFamiliar.get('situacionVivienda').setValue("Adecuada a las necesidades");
        if(aux3==2)
            this.formValoracionFamiliar.get('situacionVivienda').setValue("Barreras arquitectónicas en la vivienda(pisos irregulares, gradas, puertas estrechas)");
        if(aux3==3)
            this.formValoracionFamiliar.get('situacionVivienda').setValue("Mala conservación, humedad, mala higiene, equipamiento inadecuado (baño incompleto)");
        if(aux3==4)
            this.formValoracionFamiliar.get('situacionVivienda').setValue("Vivienda semi construida o de material rústico");
        if(aux3==5)
            this.formValoracionFamiliar.get('situacionVivienda').setValue("Asentamiento humano(invasión) o sin vivienda");
        /**************SITUACION FAMILIAR*****************/
        if(aux4==1)
            this.formValoracionFamiliar.get('situacionSocial').setValue("Mantiene relaciones sociales en la comunidad");
        if(aux4==2)
            this.formValoracionFamiliar.get('situacionSocial').setValue("Relación social sólo con la familia y vecinos");
        if(aux4==3)
            this.formValoracionFamiliar.get('situacionSocial').setValue("Relación socil sólo con la familia");
        if(aux4==4)
            this.formValoracionFamiliar.get('situacionSocial').setValue("No sale del domicilio pero recibe visitas de familia");
        if(aux4==5)
            this.formValoracionFamiliar.get('situacionSocial').setValue("No sale del domicilio y no recibe visitas");
        /**************SITUACION FAMILIAR*****************/
        if(aux5==1)
            this.formValoracionFamiliar.get('situacionApoyo').setValue("No necesita apoyo");
        if(aux5==2)
            this.formValoracionFamiliar.get('situacionApoyo').setValue("Requiere apoyo familiar o vecinal");
        if(aux5==3)
            this.formValoracionFamiliar.get('situacionApoyo').setValue("Tiene seguro pero necesita mayor apoyo de éste o voluntario social");
        if(aux5==4)
            this.formValoracionFamiliar.get('situacionApoyo').setValue("No cuenta con seguro social");
        if(aux5==5)
            this.formValoracionFamiliar.get('situacionApoyo').setValue("Situación de abandono familiar");
        /**************DIAGNOSTICO*****************/
        if(aux6=="BUENA/ACEPTABLE SITUACION SOCIAL")
            this.formValoracionFamiliar.get('diagnostico').setValue("BUENA/ACEPTABLE SITUACION SOCIAL");
        if(aux6=="EXISTE RIESGO SOCIAL")
            this.formValoracionFamiliar.get('diagnostico').setValue("EXISTE RIESGO SOCIAL");
        if(aux6=="EXISTE PROBLEMA SOCIAL")
            this.formValoracionFamiliar.get('diagnostico').setValue("EXISTE PROBLEMA SOCIAL");

    });
  }

}
