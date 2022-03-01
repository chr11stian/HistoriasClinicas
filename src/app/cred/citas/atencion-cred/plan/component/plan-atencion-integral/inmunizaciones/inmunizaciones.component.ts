import { Component, OnInit } from "@angular/core";
import { InmunizacionesService } from "../services/inmunizaciones/inmunizaciones.service";
// import { Inmunizaciones } from "../models/plan-atencion-integral.model";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import {inmunizaciones} from "../models/plan-atencion-integral.model";

@Component({
  selector: "app-inmunizaciones",
  templateUrl: "./inmunizaciones.component.html",
  styleUrls: ["./inmunizaciones.component.css"],
})
export class InmunizacionesComponent implements OnInit {
  valor: string = "";
  tipoDNI: string;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: inmunizaciones[] = [ ];
  listaMeses:number[]=[1,2,3,4,5,6,12,18,24,48]
  inmunizacionesAgrupadas=[[],[],[],[]]
  edadMes:string[]=[]
  agrupaciones:any[]=[
    {abreviado:'RN',completo:'Recien Nacido'},
    {abreviado:'Menor_1A',completo:'Menor de un Año'},
    {abreviado:'1A',completo:'Un Año'},
    {abreviado:'4A',completo:'Cuatro Años'},
  ]
  constructor(private inmunizacionesService:InmunizacionesService) {}
  ngOnInit(){
    this.nroDNI = "12121212";
    this.getListaInmunizaciones();
  }
  getListaInmunizaciones() {
    this.inmunizacionesService.getListaInmunizaciones(this.nroDNI).subscribe((resp)=>{
      this.inmunizacionesAgrupadas=[[],[],[],[]]
      this.listaInmunizaciones=resp['object'];
      this.toDate();
      this.clasificamos();
    })
  }
  nombreAgrupacionExtendido(vacuna:string):string{
    const real=this.agrupaciones.find((element)=>{
      return element.abreviado==vacuna;
    })
    return real?.completo || 'Otros'
  }
  toDate(){
    this.listaInmunizaciones.forEach((element)=>{
      element.fechaTentativa=new Date(`${element.fechaTentativa} 00:00:00` )
      element.fecha=element.fecha!=null?new Date(`${element.fecha} 00:00:00`):null
    })
  }
  nombreVacuna(nombre:string){
    return nombre.split('-')[0]
  }
  clasificamos(){
    //['RN', 'Menor_1A', '1A', '4A']
    this.listaInmunizaciones.forEach((element)=>{
      let isInclude=this.edadMes.find((elemento)=>{
        return elemento==element.descripcionEdad
      })

      if(!isInclude){
        this.edadMes.push(element.descripcionEdad)
      }
    })
    // desglosamos/
    this.listaInmunizaciones.forEach((element,index)=>{
      let mes=element.descripcionEdad;
      let posicion=this.edadMes.indexOf(mes);
      this.inmunizacionesAgrupadas[posicion].push(element)
    });
  }



}
