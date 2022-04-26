import { Component, OnInit } from '@angular/core';
import { SuplementacionesMicronutrientesService } from '../services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service'
import { SuplementacionMicronutrientes } from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import {dato} from "../../../../../models/data";

@Component({
  selector: 'app-suplementaciones-micronutrientes',
  templateUrl: './suplementaciones-micronutrientes.component.html',
  styleUrls: ['./suplementaciones-micronutrientes.component.css']
})
export class SuplementacionesMicronutrientesComponent implements OnInit {
  dataDocumento:dato//recuperamos de local
  nroDni:string;

  listaPrincipal: SuplementacionMicronutrientes[] = []
  listaSF: SuplementacionMicronutrientes[] = []
  listaMNM: SuplementacionMicronutrientes[] = []
  listaVA: SuplementacionMicronutrientes[] = []
  listaTerapeutica: SuplementacionMicronutrientes[] = []

  constructor(private servicio: SuplementacionesMicronutrientesService,) {
    this.dataDocumento=JSON.parse(localStorage.getItem('documento'))
    this.nroDni=this.dataDocumento.nroDocumento;
  }
  ngOnInit(): void {
    this.getLista()
  }
  getLista() {
    // recupera sulfato ferroso y micronutrientes
    this.servicio.getListaMicronutrientes(this.nroDni)
      .toPromise().then((result) => {
        this.listaPrincipal = result.object
        this.arreglarFechas(this.listaPrincipal)
        this.separacion()
      }).catch((err) => {
        console.log(err)
      })
    // recupera vitamina A
    this.servicio.getVitaminaA(this.nroDni).toPromise().then((result)=>{
      this.listaVA=result.object;
      this.arreglarFechas(this.listaVA)
    })
    // recupera terapeuticos
    this.servicio.getListaSuplementacionAnemia(this.nroDni)
        .toPromise().then((result) => {
      this.listaTerapeutica = result.object
      this.arreglarFechas(this.listaTerapeutica)
    }).catch((err) => {
      console.log(err)
    })
  }
  arreglarFechas(lista:SuplementacionMicronutrientes[]) {
      lista.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fecha = element.fecha != null ? new Date(`${element.fecha} 00:00:00`) : null;
    });
  }
  separacion() {
    this.listaSF = this.listaPrincipal.filter(item => item.nombre === 'SF');
    this.listaMNM = this.listaPrincipal.filter(item => item.nombre === 'MNM')
  }

}
