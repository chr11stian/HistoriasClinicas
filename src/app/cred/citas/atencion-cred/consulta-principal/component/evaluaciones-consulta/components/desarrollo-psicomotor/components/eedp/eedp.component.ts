import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { datosEEDPTabla, escalaEval_EEDP_0_4_anios, tablaComparativa } from '../models/eedp';

@Component({
  selector: 'app-eedp',
  templateUrl: './eedp.component.html',
  styleUrls: ['./eedp.component.css']
})
export class EedpComponent implements OnInit {
  items: {}[];
  indexSelected: number = 0;
  edadNroSelected: number = 1;
  edadSelected: string = 'MES';
  datos: {}[];
  escalaEEDP: datosEEDPTabla;
  evaluacionEEDP: escalaEval_EEDP_0_4_anios[];
  datosEvaluacion: escalaEval_EEDP_0_4_anios;
  arrayEdadEEDPSelected: datosEEDPTabla[];
  puntaje: '';
  tablaComparativa: tablaComparativa[];
  examinador: string;
  fechaEvaluacion: string;
  disabled = false;
  disabledUpdate = true;
  resultadoEvaluacion = "Resultado de la evalaucion";
  datePipe = new DatePipe('en-US');
  nroDoc: any;

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
    this.datos = [
      { key: 'S6 (M)' },
      { key: 'S6 (M)' },
      { key: 'S6 (M)' }
    ]
  }
  saveTest() {

  }

  updateEscalaEEDP() {

  }

  ChangeStep() {
    
  }
}
