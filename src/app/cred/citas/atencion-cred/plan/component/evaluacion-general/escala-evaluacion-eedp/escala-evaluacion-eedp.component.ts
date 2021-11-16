import { Component, OnInit } from '@angular/core';
import { EscalaEEDP, DatosEEDP } from '../models/EscalaEEDP';
import { EvalAlimenService } from '../service/eval-alimen.service';

@Component({
  selector: 'app-escala-evaluacion-eedp',
  templateUrl: './escala-evaluacion-eedp.component.html',
  styleUrls: ['./escala-evaluacion-eedp.component.css']
})
export class EscalaEvaluacionEEDPComponent implements OnInit {
  
  items: {}[];
  indexSelected: number = 0;
  edadNroSelected: number = 1;
  edadSelected: string = 'MES';
  datos: {}[];
  escalaEEDP: EscalaEEDP[];
  arrayEdadEEDPSelected: EscalaEEDP;
  puntaje: '';

  constructor( 
    private evalAlimenService: EvalAlimenService
  ) { }

  ngOnInit(): void {
    this.items = [
      { edadNro: 1, edad: 'MES'}, { edadNro: 2, edad: 'MESES'}, { edadNro: 3, edad: 'MESES'}, 
      { edadNro: 4, edad: 'MESES'}, { edadNro: 5, edad: 'MESES'}, { edadNro: 6, edad: 'MESES'},
      { edadNro: 7, edad: 'MESES'}, { edadNro: 8, edad: 'MESES'}, { edadNro: 9, edad: 'MESES'},
      { edadNro: 10, edad: 'MESES'}, { edadNro: 12, edad: 'MESES'}, { edadNro: 15, edad: 'MESES'},
      { edadNro: 18, edad: 'MESES'}, { edadNro: 21, edad: 'MESES'}, { edadNro: 24, edad: 'MESES'},
      { edadNro: 3, edad: 'AÑOS'}, { edadNro: 4, edad: 'AÑOS'}
    ]
    this.datos = [
      { key: 'S6 (M)'},
      { key: 'S6 (M)'},
      { key: 'S6 (M)'}
    ]

    this.getDatos();
  }

  async getDatos (){
    await this.evalAlimenService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
    });
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].eedpkey;
  }

  ChangeStep(index: number, edadNro: number, edad: string){
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].eedpkey;
  }

  llenarDatosEdadSelected(datosEdad:  DatosEEDP[]){

  }
}
