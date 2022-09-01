import { Component, OnInit } from '@angular/core';
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


  constructor(
    private evalPsicomotor: DesarrolloPsicomotorService,
  ) {
    this.paciente = JSON.parse(localStorage.getItem('documento'));
    this.monthAge = this.overallAge(this.paciente.anio, this.paciente.mes);
  }

  ngOnInit(): void {
    this.searchMonthlyEvaluation();
  }

  searchMonthlyEvaluation(): void {
    this.evalPsicomotor.verifyMonthlyEvaluation(this.monthAge, this.paciente.nroDocumento).then(res => {
      this.evaluations = res[0];
      console.log('evaluations data ', this.evaluations);
      if (this.evaluations.evaluacionDesarrollo_0_30.length > 0) {
        this.disabledSelectedTab.map(item => {
          if (this.disabledSelectedTab.indexOf(item) != 0)
            item.disabled = true;
          this.disabledSelectedTab[0].selected = true;
        });
      }
      if (this.evaluations.evaluacionEEDP.length > 0) {
        this.disabledSelectedTab.map(item => {
          if (this.disabledSelectedTab.indexOf(item) != 1)
            item.disabled = true;
          this.disabledSelectedTab[1].selected = true;
        });
      }
      if (this.evaluations.evaluacionPautaBreve != null) {
        this.disabledSelectedTab.map(item => {
          if (this.disabledSelectedTab.indexOf(item) != 2)
            item.disabled = true;
          this.disabledSelectedTab[2].selected = true;
        });
      }
      if (this.evaluations.evaluacionTepsi != null) {
        this.disabledSelectedTab.map(item => {
          if (this.disabledSelectedTab.indexOf(item) != 3)
            item.disabled = true;
          this.disabledSelectedTab[3].selected = true;
        });
      }
    })
  }

  overallAge(year: number, month: number): number {
    return 12 * year + month;
  }

  selectedTab() {
    console.log('opcion ', this.index);
  }
}

interface DisabledSelected {
  disabled: boolean,
  selected: boolean
}