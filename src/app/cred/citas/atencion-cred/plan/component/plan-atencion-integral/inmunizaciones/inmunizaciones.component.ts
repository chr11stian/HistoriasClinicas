import { Component, OnInit } from '@angular/core';
import { InmunizacionesService } from 'src/app/cred/services/plan-atencion-integral/inmunizaciones/inmunizaciones.service';
import { Inmunizaciones} from "../../../../../../models/plan-atencion-integral/plan-atencion-integral.model"


@Component({
  selector: 'app-inmunizaciones',
  templateUrl: './inmunizaciones.component.html',
  styleUrls: ['./inmunizaciones.component.css']
})
export class InmunizacionesComponent implements OnInit {
  stateOptions: any[];
  listaInmunizaciones: Inmunizaciones[]=[];
  lista1: Inmunizaciones[]=[];
  lista2: Inmunizaciones[]=[];
  lista3: Inmunizaciones[]=[];
  dateValue: string = '08/04/2015';
  es: object;

  constructor( private servicio: InmunizacionesService ) { }

  ngOnInit(){
    this.getLista();
  }
  async getLista(){
    await this.servicio.getListaInmunizaciones('47825757')
    .toPromise().then(res => <Inmunizaciones[]>res.object)
    .then(data => {
      this.listaInmunizaciones= data;
      })
    .catch(error => { return error;});
    console.log("aqui",this.listaInmunizaciones);
    this.separacion()
  }
  separacion(){
    // aqui la lista de inmunicaiones queda vacia
    this.lista1=this.listaInmunizaciones.splice(0,8);
    this.lista2=this.listaInmunizaciones.splice(0,8);
    this.lista3=this.listaInmunizaciones.splice(0,this.listaInmunizaciones.length);
    console.log("lista", this.lista1);
    
  }

}
