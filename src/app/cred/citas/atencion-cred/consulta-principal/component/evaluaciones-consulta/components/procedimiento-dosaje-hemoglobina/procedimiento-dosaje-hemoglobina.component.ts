import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../../models/data";
import {
  SuplementacionesMicronutrientesService
} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {DialogService} from "primeng/dynamicdialog";
import {DosajeComponent} from "../dosaje/dosaje.component";
import {DosajeHemoglobina} from "../../../../models/dosaje.interface";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-procedimiento-dosaje-hemoglobina',
  templateUrl: './procedimiento-dosaje-hemoglobina.component.html',
  styleUrls: ['./procedimiento-dosaje-hemoglobina.component.css'],
  providers: [DialogService]
})

export class ProcedimientoDosajeHemoglobinaComponent implements OnInit {
  dataPreventivo:DosajeHemoglobina[]=[]
  dataTerapeutico:DosajeHemoglobina[]=[]
  dataDocumento:dato=JSON.parse(localStorage.getItem('documento'))
  anio:number=this.dataDocumento.anio
  mes:number=this.dataDocumento.mes
  dia:number=this.dataDocumento.dia
  documento:dato=JSON.parse(localStorage.getItem('documento'))
  nroDni=this.documento.nroDocumento

  constructor(private suplementacionesMicronutrientesService:SuplementacionesMicronutrientesService,
              private messageService: MessageService,
              public dialogService: DialogService) {
    // this.nroMes=this.dataDocumento.anio*12+this.dataDocumento.mes
  }
  get edadMes(){
    // return this.dataDocumento.anio*12+this.dataDocumento.mes;
    return 12; //todo descomentar
  }
  ngOnInit(): void {

    this.getDosaje()

  }
  getDosaje(){
    this.suplementacionesMicronutrientesService.getDosajeHemoglobina(this.nroDni).subscribe((resp)=>{
      this.dataPreventivo=resp.object
      console.log('respuesta del servidor->>>>',this.dataPreventivo)
      this.transform();
    })
  }
  determinarMostrar(mesEvaluado){
    if(this.edadMes>=mesEvaluado && this.edadMes-mesEvaluado<6 ) {
      // if (this.edadMes==mesEvaluado){
      return true;
    }
    else
      return false;
  }
  agregarSuplementacion(dosaje){
    console.log('heyy con el dosaje', dosaje)
    console.log('nro mes',this.edadMes)
  }
  transform() {
    this.dataPreventivo.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }
  agregarDosaje(dosaje:DosajeHemoglobina){
    const ref = this.dialogService.open(DosajeComponent, {
      data:dosaje,
      header: 'Agregar Dosaje',
      width: '50%'
    });
    ref.onClose.subscribe((mensaje:string)=>{
      if (mensaje=='agregado'){
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: "Dosaje Registrado satisfactoriamente",
        });
      }
      console.log('mensaje',mensaje)
      this.getDosaje();
    })
  }
  abrirModalLaboratorio(dosaje){
    // const {edadMes,nroControl}=dosaje
    // const inputRequest={
    //   edadMes,
    //   nroControl
    // }
    // console.log(inputRequest)
    // const ref = this.dialogService.open(LaboratorioModalComponent, {
    //   data:inputRequest,
    //   header: 'Agregar prueba',
    //   width: '50%'
    // });
    // ref.onClose.subscribe((mensaje:string)=>{
    //   console.log('mensaje',mensaje)
    //   this.getDosaje();
    // })
  }

}
