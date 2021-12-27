import { Component, OnInit } from '@angular/core';
import { Descartes, estructuraDescartes, estructuraDescartesItem  } from '../models/plan-atencion-integral.model' 
import { DescartesService } from '../services/descartes/descartes.service'

@Component({
  selector: 'app-descartes',
  templateUrl: './descartes.component.html',
  styleUrls: ['./descartes.component.css']
})
export class DescartesComponent implements OnInit {
  
  expandir: boolean=true; 
  listaDescartes: Descartes;
  lista_descarteAnemia: estructuraDescartes[]= [];
  lista_parasitSeriado: estructuraDescartes[]= [];
  lista_saludBucal: estructuraDescartes[]= [];
  lista_testGraham: estructuraDescartes[]= [];
  lista_tamizajeVIF: estructuraDescartes[]= [];
  lista_profAntiparasitaria: estructuraDescartes[]= [];
  lista_visitDomiciliaria: estructuraDescartes[]= [];
  lista_sesionDemostrativas: estructuraDescartes[]= [];

  constructor(private servicio: DescartesService) { }

  ngOnInit(): void{
    this.getLista()
  }
  getLista() {
    this.servicio.getListaDescartes('47825757')
        .toPromise().then((result) => {
        this.listaDescartes = result.object
        this.separacion()
    }).catch((err) => {
        console.log(err)
    })
  }
  separacion() {
    this.lista_descarteAnemia=this.listaDescartes.descarteAnemia;
    console.log("descarte anemia",this.lista_descarteAnemia);
    console.log("posicion 0",this.lista_descarteAnemia[0]);
    console.log("posicion 0A",this.lista_descarteAnemia[0]._0A)
    console.log("posicion control 0A",this.lista_descarteAnemia[0]._0A[0].nroControl)
    this.lista_parasitSeriado=this.listaDescartes.parasitSeriado;
    this.lista_saludBucal=this.listaDescartes.saludBucal;
    this.lista_testGraham=this.listaDescartes.testGraham;
    this.lista_tamizajeVIF=this.listaDescartes.tamizajeVIF;
    this.lista_profAntiparasitaria=this.listaDescartes.profAntiparasitaria;
    this.lista_visitDomiciliaria=this.listaDescartes.visitDomiciliaria;
    this.lista_sesionDemostrativas=this.listaDescartes.sesionDemostrativas;
  }

}
