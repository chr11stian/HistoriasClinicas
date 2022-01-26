import { Component, OnInit } from '@angular/core';
import { SuplementacionesMicronutrientesService } from '../services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service'
import { SuplementacionMicronutrientes } from 'src/app/cred/citas/atencion-cred/plan/component/plan-atencion-integral/models/plan-atencion-integral.model'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-suplementaciones-micronutrientes',
  templateUrl: './suplementaciones-micronutrientes.component.html',
  styleUrls: ['./suplementaciones-micronutrientes.component.css']
})
export class SuplementacionesMicronutrientesComponent implements OnInit {
  stateOptions: any[];
  expandir: boolean = true;
  listaMicronutrientes: SuplementacionMicronutrientes[] = []
  SF: SuplementacionMicronutrientes[] = []
  MMN: SuplementacionMicronutrientes[] = []
  valueO: boolean = true;
  datePipe = new DatePipe('en-US');

  constructor(private servicio: SuplementacionesMicronutrientesService) {
    this.stateOptions = [
      { label: 'SI', optionValue: true },
      { label: 'NO', optionValue: false }
    ];
  }

  ngOnInit(): void {
    this.getLista()

    console.log('data SF ', this.SF);
  }
  getLista() {
    this.servicio.getListaMicronutrientes('47825757')
      .toPromise().then((result) => {

        this.listaMicronutrientes = result.object
        this.transform()
      }).catch((err) => {
        console.log(err)
      })
  }
  transform() {
    //transformacion a un solo formato que se usará
    console.log('data to transform ', this.listaMicronutrientes);
    this.listaMicronutrientes.forEach(i => {

      if (i.fecha === null) {
        i.fecha = '';
      }
      if (i.fechaTentativa === null) {
        i.fechaTentativa = '';
      }
      else {
        i.fecha = i.fecha.split(' ')[0];
        i.fechaTentativa = i.fechaTentativa.split(' ')[0];
      }
    })
    console.log("lista conversa", this.listaMicronutrientes);
    this.separacion()
  }
  separacion() {
    this.SF = this.listaMicronutrientes.filter(item => item.nombre === 'SF');
    console.log('lista SF', this.SF);
    this.MMN = this.listaMicronutrientes.filter(item => item.nombre === 'MMN')
    console.log('lista MMN', this.MMN);
  }

  saveData() {

    // this.getLista();
    console.log('info before ', this.SF, this.MMN)
    this.SF.forEach(i => {
      i.fecha === null ? i.fecha = '' : i.fecha = this.datePipe.transform(i.fecha, 'yyyy-MM-dd HH:mm:ss')

    })
    this.MMN.forEach(i => {
      i.fecha === null ? i.fecha = '' : i.fecha = this.datePipe.transform(i.fecha, 'yyyy-MM-dd HH:mm:ss')
    })
    let dataArray = this.SF.concat(this.MMN);
    console.log('data to save ', dataArray)
  }
}
