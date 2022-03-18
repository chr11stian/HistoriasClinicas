import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../../models/data";
import {
  SuplementacionesMicronutrientesService
} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {DialogService} from "primeng/dynamicdialog";
import {DosajeComponent} from "../dosaje/dosaje.component";
interface DosajeHemoglobina{
  descripcionEdad: string,
  edadMes: number,
  nombre: string,
  nroControl: number,
  estadoControlado: boolean,
  valorHb: number,
  fecha:Date,
  fechaTentativa: Date
}
@Component({
  selector: 'app-procedimiento-dosaje-hemoglobina',
  templateUrl: './procedimiento-dosaje-hemoglobina.component.html',
  styleUrls: ['./procedimiento-dosaje-hemoglobina.component.css'],
  providers: [DialogService]
})

export class ProcedimientoDosajeHemoglobinaComponent implements OnInit {
  data:DosajeHemoglobina[]=[]
  dataDocumento:dato=JSON.parse(localStorage.getItem('documento'))
  anio:number=this.dataDocumento.anio
  mes:number=this.dataDocumento.mes
  dia:number=this.dataDocumento.dia
  documento:dato=JSON.parse(localStorage.getItem('documento'))
  nroDni=this.documento.nroDocumento

  constructor(private suplementacionesMicronutrientesService:SuplementacionesMicronutrientesService,
              public dialogService: DialogService) {
    // this.nroMes=this.dataDocumento.anio*12+this.dataDocumento.mes
  }
  get edad(){
    // return this.dataDocumento.anio*12+this.dataDocumento.mes;
    return 12;
  }
  ngOnInit(): void {
    this.getDosaje()
  }
  getDosaje(){
    this.suplementacionesMicronutrientesService.getDosajeHemoglobina(this.nroDni).subscribe((resp)=>{
      this.data=resp.object
      this.transform();
    })
  }
  determinarMostrar(mesEvaluado){
    if(this.edad>=mesEvaluado && this.edad-mesEvaluado<6 ) {
      // if (true){
      return true;
    }
    else
      return false;
  }
  agregarSuplementacion(dosaje){
    console.log('heyy con el dosaje', dosaje)
    console.log('nro mes',this.edad)
  }
  transform() {
    this.data.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }
  agregarDosaje(dosaje){
    const ref = this.dialogService.open(DosajeComponent, {
      data:dosaje,
      header: 'Agregar Dosaje',
      width: '50%'
    });
    ref.onClose.subscribe((mensaje:string)=>{
      console.log('mensaje',mensaje)
      this.getDosaje();
    })
  }

}
