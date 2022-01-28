import {Component, OnInit} from '@angular/core';
import {TratamientoSeguimientoAnemiaService} from '../services/tratamiento-seguimiento-anemia/tratamiento-seguimiento-anemia.service'
import {TratamientoSeguimientoAnemia} from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import {DatePipe} from "@angular/common";
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tratamiento-seguimiento-anemia',
  templateUrl: './tratamiento-seguimiento-anemia.component.html',
  styleUrls: ['./tratamiento-seguimiento-anemia.component.css']
})
export class TratamientoSeguimientoAnemiaComponent implements OnInit {
  tipoDNI:string;
  nroDNI:string;

  expandir: boolean = true;
  listaTratamientos: TratamientoSeguimientoAnemia[] = []
  tratamiento_Anemia: TratamientoSeguimientoAnemia[] = []
  dosaje_Hb: TratamientoSeguimientoAnemia[] = []
  datePipe = new DatePipe('en-US');

  constructor(private servicio: TratamientoSeguimientoAnemiaService,
              private messageService: MessageService,
              private rutaActiva:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.tipoDNI=this.rutaActiva.snapshot.queryParams.tipoDoc;
    this.nroDNI=this.rutaActiva.snapshot.queryParams.nroDoc;
    this.getLista()
  }

  getLista() {
    this.servicio.getListaTratamientos(this.nroDNI)
      .toPromise().then((result) => {
      this.listaTratamientos = result.object
      this.transform()
    }).catch((err) => {
      console.log(err)
    })
  }

  transform() {
    //transformacion a un solo formato que se usará
    this.listaTratamientos.forEach(i => {
      if (i.fecha === null) {
        i.fecha = '';
      }
      if (i.fechaTentativa === null) {
        i.fechaTentativa = '';
      } else {
        i.fecha = i.fecha.split(' ')[0];
        // i.fechaTentativa = i.fechaTentativa.split(' ')[0];
      }
    })
    console.log("lista conversa", this.listaTratamientos);
    this.separacion()
  }

  separacion() {
    this.tratamiento_Anemia = this.listaTratamientos.filter(item => item.nombre === 'Tratamiento_Anemia');
    // console.log('lista tratamiento_Anemia', this.tratamiento_Anemia);
    this.dosaje_Hb = this.listaTratamientos.filter(item => item.nombre === 'Dosaje_Hb')
    // console.log('lista Dosaje_Hb', this.dosaje_Hb);
  }
  save() {
    console.log(this.tratamiento_Anemia);
    console.log(this.dosaje_Hb)
    this.tratamiento_Anemia.forEach(item => {
      item.fecha === null ? item.fecha = '' : item.fecha = this.datePipe.transform(item.fecha, 'yyyy-MM-dd HH:mm:ss');
    })
    this.dosaje_Hb.forEach(item => {
      item.fecha === null ? item.fecha = '' : item.fecha = this.datePipe.transform(item.fecha, 'yyyy-MM-dd HH:mm:ss');
    })
    let dataArray = this.tratamiento_Anemia.concat(this.dosaje_Hb);
    console.log('data to save ', dataArray);
    this.servicio.addListaTratamientos('47825757',dataArray)
      .toPromise().then((result) => {
      this.messageService.add({severity:'success', summary:'Exito', detail:'registro almacenado satisfactoriamente'});
    }).catch((err) => {
      console.log(err)
    })


  }

}
