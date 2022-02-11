import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EvalAlimenService } from 'src/app/cred/citas/atencion-cred/plan/component/evaluacion-general/service/eval-alimen.service';
import { AnswerEEDP, datosEEDPTabla, escalaEval_EEDP_0_4_anios, ItemEEDP, tablaComparativa } from '../models/eedp';

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
  totalPoints: number = 0;
  monthPoints: number;
  itemEEDP: ItemEEDP;
  listaPreguntas: ItemEEDP[] = [];

  constructor(
    private evalAlimenService: EvalAlimenService,
  ) {
    console.log('data de eedp');
  }

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
    this.getDatos();
  }

  async getDatos() {
    await this.evalAlimenService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
      console.log('data de res ', data);
      // this.evaluacionEEDP.map((evaluacion, index) => {
      //   this.escalaEEDP[index] = evaluacion.item;
      // });
      let mes = this.edadNroSelected;
      this.evalAlimenService.getTablaComparativaMes(mes).then(data => {
        this.tablaComparativa = data;
      });
      this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
      this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
      // console.log('2da array to list ', this.arrayEdadEEDPSelected[0].puntajeMaximo);
    });
  }

  saveTest() {
    // this.arrayEdadEEDPSelected.forEach(item => {
    //   this.totalPoints += parseInt(item.puntajeEEDP)
    // });
    // console.log('total points ', this.totalPoints);
    console.log('array to save ', this.escalaEEDP);
    // this.escalaEEDP
  }

  updateEscalaEEDP() {

  }

  async changeStep(index: number, edadNro: number, edad: string, prevArray: any) {
    console.log('arreglo anterior de test ', prevArray);
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    this.totalPoints
    // if (prevArray.) {
      
    // }
    // this.arrayEdadEEDPSelected.forEach(item => {
    //   this.totalPoints += parseInt(item.puntajeEEDP)
    // });
    // console.log('total points ', this.totalPoints);

    // this.totalPoints += this.monthPoints;
    // console.log('total points to save ', this.totalPoints);
  }

  calcularPuntaje() {

  }

  comoCalcularPtj() {

  }
  calcularResultado() {
    this.monthPoints = 0;

    this.arrayEdadEEDPSelected.forEach(item => {
      this.monthPoints += parseInt(item.puntajeEEDP)
    });
    let ansMonth = this.arrayEdadEEDPSelected.map(item => {
      let auxAns = {
        codigo: parseInt(item.codigo),
        puntajeEEDP: item.puntajeEEDP,
        areEvaluacion: item.areEvaluacion
      }
      return auxAns
    });
    console.log('nuevo arreglo to answer ', ansMonth);

    this.itemEEDP = {
      edad: this.edadNroSelected,
      puntajeTotalEedp: this.monthPoints,
      puntajeMaximoEedp: parseInt(this.puntaje),
      itemEedp: ansMonth
    }
  }
}
