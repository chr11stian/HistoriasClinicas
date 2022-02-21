import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modal-valoracion',
  templateUrl: './modal-valoracion.component.html',
  styleUrls: ['./modal-valoracion.component.css']
})
export class ModalValoracionComponent implements OnInit {
  ListaValoracionFuncional:any[]=[];
  valoracion:string="";

  constructor(private config:DynamicDialogConfig,
              private ref: DynamicDialogRef) {

    if(config.data){
      this.recuperarValoracionClinicaFuncional();
    }

  }

  ngOnInit(): void {
  }

  recuperarValoracionClinicaFuncional(){
    this.valoracion = "valoracionFuncional";
    let configuracion = this.config.data;
    console.log(configuracion);
    console.log(configuracion[0].valoracionesClinicas[0].fecha)
    for(let i = 0; i<configuracion[0].valoracionesClinicas.length;i++){
      let cadena ={};
      if(configuracion[0].valoracionesClinicas[i].valoracionFuncional!=null) {
         cadena = {
          tipoDoc: configuracion[0].tipoDoc,
          nroDoc: configuracion[0].nroDoc,
          fecha: configuracion[0].valoracionesClinicas[i].fecha,
          diagnostico1: configuracion[0].valoracionesClinicas[i].valoracionFuncional.diagnostico,
          valoracion1: configuracion[0].valoracionesClinicas[i].valoracionFuncional
        }
      }
      else{
        cadena = {
          tipoDoc: configuracion[0].tipoDoc,
          nroDoc: configuracion[0].nroDoc,
          fecha: configuracion[0].valoracionesClinicas[i].fecha,
          diagnostico1:"",
          valoracion1:[]
        }
      }
      this.ListaValoracionFuncional.push(cadena);
    }
    console.log(this.ListaValoracionFuncional);
  }

  recuperarData(rowData){
    localStorage.setItem('dataValoracion',rowData);
    console.log("recuperando data",rowData)
    this.ref.close(
        this.config.data?{
          data:rowData}:rowData);
        }
}
