import { Component, OnInit } from '@angular/core';
import {TratamientoSeguimientoAnemiaService} from '../services/tratamiento-seguimiento-anemia/tratamiento-seguimiento-anemia.service'
import {TratamientoSeguimientoAnemia} from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'

@Component({
  selector: 'app-tratamiento-seguimiento-anemia',
  templateUrl: './tratamiento-seguimiento-anemia.component.html',
  styleUrls: ['./tratamiento-seguimiento-anemia.component.css']
})
export class TratamientoSeguimientoAnemiaComponent implements OnInit {
 
  expandir: boolean=true; 
  listaTratamientos: TratamientoSeguimientoAnemia[]=[]
  tratamiento_Anemia: TratamientoSeguimientoAnemia[] = []
  dosaje_Hb: TratamientoSeguimientoAnemia[] = []


  constructor(private servicio: TratamientoSeguimientoAnemiaService) {
   }

  ngOnInit(): void {
    this.getLista()
  }
  getLista() {
    this.servicio.getListaTratamientos('47825757')
        .toPromise().then((result) => {
        this.listaTratamientos = result.object
        this.transform()
    }).catch((err) => {
        console.log(err)
    })
}
transform(){
    //transformacion a un solo formato que se usará
    this.listaTratamientos.forEach(i => {
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
    console.log("lista conversa",this.listaTratamientos);
    this.separacion()
}
separacion() {
    this.tratamiento_Anemia=this.listaTratamientos.filter(item => item.nombre==='Tratamiento_Anemia');
    console.log('lista tratamiento_Anemia',this.tratamiento_Anemia);
    this.dosaje_Hb=this.listaTratamientos.filter(item=> item.nombre==='Dosaje_Hb')
    console.log('lista Dosaje_Hb',this.dosaje_Hb);
}

}
