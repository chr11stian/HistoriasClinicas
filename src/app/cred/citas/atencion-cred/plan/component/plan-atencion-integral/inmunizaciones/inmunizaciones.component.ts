import {Component, OnInit} from '@angular/core'
import {InmunizacionesService} from '../services/inmunizaciones/inmunizaciones.service'
import {Inmunizaciones} from '../models/plan-atencion-integral.model'


@Component({
    selector: 'app-inmunizaciones',
    templateUrl: './inmunizaciones.component.html',
    styleUrls: ['./inmunizaciones.component.css']
})
export class InmunizacionesComponent implements OnInit {
    stateOptions: any[]
    listaInmunizaciones: Inmunizaciones[] = []
    lista1: Inmunizaciones[] = []
    lista2: Inmunizaciones[] = []
    lista3: Inmunizaciones[] = []
    constructor(private servicio: InmunizacionesService) {
    }

    ngOnInit() {
        this.getLista()
    }

    // async getLista(){
    getLista() {
        this.servicio.getListaInmunizaciones('47825757')
            .toPromise().then((result) => {
            this.listaInmunizaciones = result.object
            this.transform()
        }).catch((err) => {
            console.log(err)
        })
    }
    transform(){
        //transformacion a un solo formato que se usará
        this.listaInmunizaciones.forEach(i => {
            if(i.fecha===null){
                i.fecha='';
            }
            if(i.fechaTentativa===null){
                i.fechaTentativa='';
            }
            else {
                i.fecha=i.fecha.split(' ')[0];
                i.fechaTentativa=i.fechaTentativa.split(' ')[0];
            }
        }) 
        // console.log("entro1");
        this.separacion()
    }
    separacion() {
        // console.log("entro2");
        
        // aqui la lista de inmunicaiones queda vacia
        this.lista1 = this.listaInmunizaciones.splice(0, 8)
        this.lista2 = this.listaInmunizaciones.splice(0, 8)
        this.lista3 = this.listaInmunizaciones.splice(0, this.listaInmunizaciones.length)
        // console.log('lista', this.lista1)
    }

}
