import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modal-mental',
  templateUrl: './modal-mental.component.html',
  styleUrls: ['./modal-mental.component.css']
})
export class ModalMentalComponent implements OnInit {
  ListaValoracionFuncional:any[]=[];
  constructor(private config:DynamicDialogConfig) {
    if(config.data){
      this.recuperarValoracionClinicaMental();
  }

}
  ngOnInit(): void {
  }
  recuperarValoracionClinicaMental(){
    let configuracion = this.config.data;
    console.log(configuracion);
    console.log(configuracion[0].valoracionesClinicas[0].fecha)
    for(let i = 0; i<configuracion[0].valoracionesClinicas.length;i++){
      let cadena = {};
      if(configuracion[0].valoracionesClinicas[i].valoracionMental!=null){
          cadena = {
              tipoDoc:configuracion[0].tipoDoc,
              nroDoc:configuracion[0].nroDoc,
              fecha:configuracion[0].valoracionesClinicas[i].fecha,
              diagnostico1:configuracion[0].valoracionesClinicas[i].valoracionMental.diagnosticoCognitivo,
              valoracion1:configuracion[0].valoracionesClinicas[i].valoracionMental.itemsEstadoCognitivo,
              diagnostico2:configuracion[0].valoracionesClinicas[i].valoracionMental.diagnosticoAfectivo,
              valoracion2:configuracion[0].valoracionesClinicas[i].valoracionMental.itemsEstadoAfectivo
          }
      }
      else{
          cadena  = {
              tipoDoc:configuracion[0].tipoDoc,
              nroDoc:configuracion[0].nroDoc,
              fecha:configuracion[0].valoracionesClinicas[i].fecha,
              diagnostico1:"",
              valoracion1:[],
              diagnostico2:"",
              valoracion2:[]
          }
      }
      this.ListaValoracionFuncional.push(cadena);

    }
    console.log(this.ListaValoracionFuncional);
  }
  recuperarData(rowData){
      console.log("recuperando data");
      console.log(rowData);
  }

}
