import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modal-sociofamiliar',
  templateUrl: './modal-socio.html',
  styleUrls: ['./modal-socio.css']
})
export class ModalSocio implements OnInit {
  ListaValoracionSocioFamiliar:any[]=[];

  constructor(private config:DynamicDialogConfig) {
    if(config.data){
      this.recuperarValoracionClinicaSocioFamiliar();
    }
  }
  recuperarValoracionClinicaSocioFamiliar(){
    let configuracion = this.config.data;
    console.log(configuracion);
    console.log(configuracion[0].valoracionesClinicas[0].fecha)
    for(let i = 0; i<configuracion[0].valoracionesClinicas.length;i++){
      let cadena = {};
      if(configuracion[0].valoracionesClinicas[i].valoracionSocioFamiliar!=null){
        cadena = {
          tipoDoc:configuracion[0].tipoDoc,
          nroDoc:configuracion[0].nroDoc,
          fecha:configuracion[0].valoracionesClinicas[i].fecha,
          diagnostico1:configuracion[0].valoracionesClinicas[i].valoracionSocioFamiliar.diagnostico,
          valoracion1:configuracion[0].valoracionesClinicas[i].valoracionSocioFamiliar.items,
        }
      }
      else{
        cadena  = {
          tipoDoc:configuracion[0].tipoDoc,
          nroDoc:configuracion[0].nroDoc,
          fecha:configuracion[0].valoracionesClinicas[i].fecha,
          diagnostico1:"",
          valoracion1:[],
        }
      }
      this.ListaValoracionSocioFamiliar.push(cadena);

    }
    console.log(this.ListaValoracionSocioFamiliar);
  }
  recuperarData(rowData,rowIndex){
    console.log("recuperando data");
    console.log(rowData);
    console.log(rowIndex);
  }
  ngOnInit(): void {
  }

}
