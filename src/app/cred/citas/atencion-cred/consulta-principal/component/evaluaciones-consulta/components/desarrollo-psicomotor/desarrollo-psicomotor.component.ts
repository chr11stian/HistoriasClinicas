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
    this.searchMonthlyEvaluation();
  }

  ngOnInit(): void {

  }

  async searchMonthlyEvaluation(nroDeEvaluacion?: number): Promise<void> {
    // this.evalPsicomotor.verifyConsultationsEvaluation(this.paciente.idConsulta).then((res: any) => {
    // })

    this.evalPsicomotor.verifyConsultationsEvaluation(this.paciente.idConsulta).then((res: any) => {
      this.evaluations = res.object;
      Object.keys(this.evaluations).forEach(key => {
        if (this.evaluations[key] === null) delete this.evaluations[key];
      });
      if (this.evaluations.hasOwnProperty('testPeruano')) {
        this.disabledSelectedTab = this.selectedTab(0, this.disabledSelectedTab);
        this.isEvaluated = true;
        this.evaluationName = 'TEST PERUANO DEL DESARROLLO DEL NIÑO';
      }
      if (this.evaluations.hasOwnProperty('evaluacionTestEEDP')) {
        this.disabledSelectedTab = this.selectedTab(1, this.disabledSelectedTab);
        this.isEvaluated = true;
        this.evaluationName = 'ESCALA DE EVALUACIÓN DEL DESARROLLO PSICOMOTOR (EEDP)';
      }
      if (this.evaluations.hasOwnProperty('testPautaBreve')) {
        this.disabledSelectedTab = this.selectedTab(2, this.disabledSelectedTab);
        this.isEvaluated = true;
        this.evaluationName = 'PAUTA BREVE';
      }
      if (this.evaluations.hasOwnProperty('evaluacionTepsi')) {
        this.disabledSelectedTab = this.selectedTab(3, this.disabledSelectedTab);
        this.isEvaluated = true;
        this.evaluationName = 'PROTOCOLO TEST DE DESARROLLO PSICOMOTOR TEPSI';
      }
      if (nroDeEvaluacion != undefined) {
        return
      }
      if (this.isEvaluated) {
        Swal.fire({
          icon: 'info',
          title: 'Ya hay una evaluacion para esta edad ',
          html: '<p><b>Evaluacion: </b>' + this.evaluationName + '</p>',
          width: 600,
        });
      }
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
        this.index = option;
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