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
  disabledSelectedTab: DisabledSelected[] = [{ disabled: true, selected: false }, { disabled: false, selected: true }, { disabled: true, selected: false }, { disabled: true, selected: false }];
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
      console.log('res de evaluation ', this.evaluations);
      // if (this.evaluations[]) {

      // }
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