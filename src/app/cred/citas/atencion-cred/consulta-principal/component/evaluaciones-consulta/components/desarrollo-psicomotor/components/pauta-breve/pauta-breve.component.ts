import { Component, OnInit } from '@angular/core';
import { datosEEDPTabla } from '../models/eedp';

@Component({
  selector: 'app-pauta-breve',
  templateUrl: './pauta-breve.component.html',
  styleUrls: ['./pauta-breve.component.css']
})
export class PautaBreveComponent implements OnInit {
  items: {}[];
  indexSelected: number = 0;
  edadNroSelected: number = 1;
  datos: {}[];
  resultadoEvaluacion: '';
  examinador: string;
  arrayEdadEEDPSelected: datosEEDPTabla[];
  fechaEvaluacion: string;
  edadSelected: string = 'MES';
  disabled:boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.items = [
      { edadNro: 1, edad: 'MES' }, { edadNro: 2, edad: 'MESES' }, { edadNro: 3, edad: 'MESES' },
      { edadNro: 4, edad: 'MESES' }, { edadNro: 5, edad: 'MESES' }, { edadNro: 6, edad: 'MESES' },
      { edadNro: 7, edad: 'MESES' }, { edadNro: 8, edad: 'MESES' }, { edadNro: 9, edad: 'MESES' },
      { edadNro: 10, edad: 'MESES' }, { edadNro: 12, edad: 'MESES' }, { edadNro: 15, edad: 'MESES' },
      { edadNro: 18, edad: 'MESES' }, { edadNro: 21, edad: 'MESES' }, { edadNro: 24, edad: 'MESES' },
      { edadNro: 3, edad: 'AÑOS' }, { edadNro: 4, edad: 'AÑOS' }
    ]
  }

  confirmSaveTest() {

  }
}
