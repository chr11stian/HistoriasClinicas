import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../../models/data";
import {
  SuplementacionesMicronutrientesService
} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {DialogService} from "primeng/dynamicdialog";
import {DosajeComponent} from "../dosaje-modal/dosaje.component";
import {DosajeHemoglobina} from "../../../../models/dosaje.interface";
import {MessageService} from "primeng/api";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procedimiento-dosaje-modal-hemoglobina',
  templateUrl: './procedimiento-dosaje-hemoglobina.component.html',
  styleUrls: ['./procedimiento-dosaje-hemoglobina.component.css'],
  providers: [DialogService]
})

export class ProcedimientoDosajeHemoglobinaComponent implements OnInit {
  dataPreventivo:DosajeHemoglobina[]=[]
  dataTerapeutico:DosajeHemoglobina[]=[]
  dataDocumento:dato=JSON.parse(localStorage.getItem('documento'))
  nroDni=this.dataDocumento.nroDocumento
  amd:any={
    anio:this.dataDocumento.anio,
    mes:this.dataDocumento.mes,
    dia:this.dataDocumento.dia
  }
  contador:number=0;
  constructor(private suplementacionesMicronutrientesService:SuplementacionesMicronutrientesService,
              private messageService: MessageService,
              public dialogService: DialogService) {
  }
  get edadMes(){
    return this.dataDocumento.anio*12+this.dataDocumento.mes;
    // return 12; //todo para manipula la edad del niño
  }
  ngOnInit(): void {
    this.getDosajePreventivo()
    this.getDosajeTerapeutico()
  }
  getDosajePreventivo(){
    this.suplementacionesMicronutrientesService.getDosajeHemoglobina(this.nroDni).subscribe((resp)=>{
      // const preventivo=resp.object
      // this.dataPreventivo=preventivo.filter(element=>element.edadMes==this.edadMes)
      // console.log('respuesta del servidor->>>>',this.dataPreventivo)
      this.dataPreventivo=resp.object
      this.transform();
    })
  }
  getDosajeTerapeutico(){
    this.suplementacionesMicronutrientesService.getDosajeHemoglobinaTerapeutico(this.nroDni).subscribe((resp)=>{
      const terapeutico=resp.object
      if(terapeutico==null){
        this.dataTerapeutico=[]
      }
      else{
        this.dataTerapeutico=terapeutico
      }
      // console.log('arreglo terapeutico',resp);
      
      // this.dataTerapeutico=terapeutico.filter(element=>element.edadMes==this.edadMes)
      this.transformTerapeutico();
    })
  }
  determinarMostrar(mesEvaluado){
   // w if(this.edadMes>=mesEvaluado && this.edadMes-mesEvaluado<6 ) {
      if (this.edadMes==mesEvaluado){
      return true;
    }
    else
      return false;
  }
  agregarSuplementacion(dosaje){
    console.log('heyy con el dosaje-modal', dosaje)
    console.log('nro mes',this.edadMes)
  }
  transform() {
    this.dataPreventivo.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }
  transformTerapeutico() {
    this.dataTerapeutico.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }
  agregarDosaje(dosaje:DosajeHemoglobina){
    const ref = this.dialogService.open(DosajeComponent, {
      data:dosaje,
      header: 'Agregar Dosaje',
      width: '50%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
    ref.onClose.subscribe((mensaje:string)=>{
      if (mensaje=='agregado'){
        Swal.fire({
            icon:'success',
            title:'Agregado',
            text:'Se agrego satisfactoriamente la suplementacion',
            showConfirmButton:false,
            timer:1500
        })
        this.getDosajePreventivo();
        this.getDosajeTerapeutico();
      }
    });
  }
  abrirModalLaboratorio(dosaje){
    // const {edadMes,nroControl}=dosaje-modal
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
