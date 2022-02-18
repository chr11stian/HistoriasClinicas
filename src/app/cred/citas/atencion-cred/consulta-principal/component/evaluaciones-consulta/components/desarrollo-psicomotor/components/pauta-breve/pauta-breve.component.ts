import { Component, OnInit } from '@angular/core';
import { EvalAlimenService } from 'src/app/cred/citas/atencion-cred/plan/component/evaluacion-general/service/eval-alimen.service';
import Swal from 'sweetalert2';
import { datosEEDPTabla, tablaComparativa } from '../models/eedp';

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
  disabled: boolean = true;
  escalaEEDP: datosEEDPTabla;
  tablaComparativa: tablaComparativa[];
  puntaje: string = '';

  constructor(
    private testService: EvalAlimenService,
  ) {
    this.getDatos();
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
  }

  async getDatos() {
    await this.testService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
      let mes = this.edadNroSelected;
      this.testService.getTablaComparativaMes(mes).then(data => {
        console.log('pauta breve ', data);
        this.tablaComparativa = data;
      });
      this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
      this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    });
  }

  async changeStep(index: number, edadNro: number, edad: string) {
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
  }

  saveTest() {
    console.log('data selected ', this.arrayEdadEEDPSelected, 'mes seleccionado ', this.indexSelected);
    let ansMonth = this.arrayEdadEEDPSelected.map(item => {
      let auxAns = {
        pregunta: item.codigo,
        areaEvaluacion: item.areEvaluacion,
        estadoN: item.puntajeBreveN,
        estadoD: item.puntajeBreveR
      }
      return auxAns;
    });
    console.log('respuesta del mes ', ansMonth);
  }

  confirmSaveTest() {
    Swal.fire({
      title: 'Esta Seguro que Desea Guardar los Cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveTest();
      }
    })
  }
}
