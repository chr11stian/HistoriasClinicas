import {Component, OnInit} from '@angular/core';
import {TratamientoSeguimientoAnemiaService} from '../services/tratamiento-seguimiento-anemia/tratamiento-seguimiento-anemia.service'
import {TratamientoSeguimientoAnemia} from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import {DatePipe} from "@angular/common";
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from "@angular/router";
import { SuplementacionesMicronutrientesService } from '../services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service';
import {DosajeHemoglobina} from "../../../../consulta-principal/models/dosaje.interface";
import {dato} from "../../../../../models/data";

@Component({
  selector: 'app-tratamiento-seguimiento-anemia',
  templateUrl: './tratamiento-seguimiento-anemia.component.html',
  styleUrls: ['./tratamiento-seguimiento-anemia.component.css']
})
export class TratamientoSeguimientoAnemiaComponent implements OnInit {
  dataDosajePreventivo:DosajeHemoglobina[]=[]
  dataDosajeTerapeutico:DosajeHemoglobina[]=[]
  documento:dato=JSON.parse(localStorage.getItem('documento'))
  nroDni=this.documento.nroDocumento

  constructor(private suplementacionesMicronutrientesService:SuplementacionesMicronutrientesService,
  ) {
  }

  ngOnInit(): void {
    // this.tipoDNI=this.rutaActiva.snapshot.queryParams.tipoDoc;
    // this.nroDNI=this.rutaActiva.snapshot.queryParams.nroDoc;
    this.getDosaje()
    this.getDosajeTerapeutico()
  }

  getDosaje(){
    this.suplementacionesMicronutrientesService.getDosajeHemoglobina(this.nroDni).subscribe((resp)=>{
      this.dataDosajePreventivo=resp.object
      this.transform();
    })
  }
  getDosajeTerapeutico(){
    this.suplementacionesMicronutrientesService.getDosajeHemoglobinaTerapeutico(this.nroDni).subscribe((resp)=>{
      const auxTerapeutico=resp.object
      if(auxTerapeutico==null){
        this.dataDosajeTerapeutico=[]
      }
      else{
        this.dataDosajeTerapeutico=resp.object
      }
      this.transformTerapeutico();
    })
  }


  transform() {
    this.dataDosajePreventivo.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }
  transformTerapeutico() {
    this.dataDosajeTerapeutico.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }

  separacion() {
    // this.tratamiento_Anemia = this.listaTratamientos.filter(item => item.nombre === 'Tratamiento_Anemia');
    // // console.log('lista tratamiento_Anemia', this.tratamiento_Anemia);
    // this.dosaje_Hb = this.listaTratamientos.filter(item => item.nombre === 'Dosaje_Hb')
    // // console.log('lista Dosaje_Hb', this.dosaje_Hb);
  }
  save() {
    // console.log(this.tratamiento_Anemia);
    // console.log(this.dosaje_Hb)
    // this.tratamiento_Anemia.forEach(item => {
    //   item.fecha === null ? item.fecha = '' : item.fecha = this.datePipe.transform(item.fecha, 'yyyy-MM-dd HH:mm:ss');
    // })
    // this.dosaje_Hb.forEach(item => {
    //   item.fecha === null ? item.fecha = '' : item.fecha = this.datePipe.transform(item.fecha, 'yyyy-MM-dd HH:mm:ss');
    // })
    // let dataArray = this.tratamiento_Anemia.concat(this.dosaje_Hb);
    // console.log('data to save ', dataArray);
    // this.servicio.addListaTratamientos('47825757',dataArray)
    //   .toPromise().then((result) => {
    //   this.messageService.add({severity:'success', summary:'Exito', detail:'registro almacenado satisfactoriamente'});
    // }).catch((err) => {
    //   console.log(err)
    // })


  }

}
