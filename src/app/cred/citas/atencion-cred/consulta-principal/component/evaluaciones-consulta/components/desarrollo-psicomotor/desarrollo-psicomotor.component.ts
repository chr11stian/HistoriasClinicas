import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DesarrolloPsicomotorService } from './services/desarrollo-psicomotor.service';

@Component({
  selector: 'app-desarrollo-psicomotor',
  templateUrl: './desarrollo-psicomotor.component.html',
  styleUrls: ['./desarrollo-psicomotor.component.css']
})
export class DesarrolloPsicomotorComponent implements OnInit {

  paciente: any;
  monthAge: number;
  index: number = 0;
  disabledSelectedTab: DisabledSelected[] = [{ disabled: false, selected: false }, { disabled: false, selected: false }, { disabled: false, selected: false }, { disabled: false, selected: false }];
  evaluations: any;
  isEvaluated: boolean = false;
  evaluationName: string;


  constructor(
    private evalPsicomotor: DesarrolloPsicomotorService,
  ) {
    this.paciente = JSON.parse(localStorage.getItem('documento'));
    this.monthAge = this.overallAge(this.paciente.anio, this.paciente.mes);
    // let arrayAux = this.selectedTab(1, this.disabledSelectedTab);
    // console.log('arreglo disabled ', arrayAux);
    this.searchMonthlyEvaluation();
  }

  ngOnInit(): void {

  }

  async searchMonthlyEvaluation(): Promise<void> {
    await this.evalPsicomotor.verifyMonthlyEvaluation(this.monthAge, this.paciente.nroDocumento).then(res => {
      this.evaluations = res[0];
      this.evaluations.evaluacionDesarrollo_0_30 == null ? this.evaluations.evaluacionDesarrollo_0_30 = [] : '';
      this.evaluations.evaluacionEEDP == null ? this.evaluations.evaluacionEEDP = [] : '';
      this.evaluations.evaluacionPautaBreve == null ? this.evaluations.evaluacionPautaBreve = [] : '';
      this.evaluations.evaluacionTepsi == null ? this.evaluations.evaluacionTepsi = [] : '';
      console.log('arreglo para evaluar ', this.evaluations);
      if (this.evaluations.evaluacionDesarrollo_0_30.length > 0) {
        this.disabledSelectedTab = this.selectedTab(0, this.disabledSelectedTab);
        this.isEvaluated = true;
        this.evaluationName = 'TEST PERUANO DEL DESARROLLO DEL NIÑO';
        console.log('entro en 0');
      }
      if (this.evaluations.evaluacionEEDP.length > 0) {
        this.disabledSelectedTab = this.selectedTab(1, this.disabledSelectedTab);
        console.log('entro en 1');
        this.isEvaluated = true;
        this.evaluationName = 'ESCALA DE EVALUACIÓN DEL DESARROLLO PSICOMOTOR (EEDP)';

      }
      if (this.evaluations.evaluacionPautaBreve.length > 0) {
        this.disabledSelectedTab = this.selectedTab(2, this.disabledSelectedTab);
        console.log('entro en 2');
        this.isEvaluated = true;
        this.evaluationName = 'PAUTA BREVE';
      }
      if (this.evaluations.evaluacionTepsi.length > 0) {
        this.disabledSelectedTab = this.selectedTab(3, this.disabledSelectedTab);
        console.log('entro en 3');
        this.isEvaluated = true;
        this.evaluationName = 'PROTOCOLO TEST DE DESARROLLO PSICOMOTOR TEPSI';
      }
      if (this.isEvaluated) {

        Swal.fire({
          icon: 'info',
          title: 'Ya hay una evaluacion para esta edad ',
          html: '<p><b>Evaluacion: </b>' + this.evaluationName + '</p>',
          width: 600,
        });
      }
      console.log('arreglo ', this.disabledSelectedTab)
    })
  }

  overallAge(year: number, month: number): number {
    return 12 * year + month;
  }

  selectedTab(option: number, tabArray: DisabledSelected[]): DisabledSelected[] {
    tabArray.map(item => {
      if (tabArray.indexOf(item) != option) {
        item.disabled = true;
        item.selected = false;
        return item;
      } else {
        item.disabled = false;
        item.selected = true;
        return item;
      }
    });
    return tabArray;
  }
}

interface DisabledSelected {
  disabled: boolean,
  selected: boolean
}