import { Component, OnInit } from '@angular/core';
import { DatosConsulta } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/components/models/eedp';
import { PautaBreveMes } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/components/models/pautaBreve';
import { PautaBreveService } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/services/pauta-breve.service';

@Component({
  selector: 'app-plan-pauta-breve',
  templateUrl: './plan-pauta-breve.component.html',
  styleUrls: ['./plan-pauta-breve.component.css']
})
export class PlanPautaBreveComponent implements OnInit {

  resultListEEDP: any;
  dataPaciente: DatosConsulta;
  dataResPautaBreve: PautaBreveMes;
  pautaBreveDialog: boolean = false;
  varMes: string = 'Mes';
  edadNroSelected: number = 0;
  arrayPautaBreve: any;

  constructor(
    private pautaBreveService: PautaBreveService,
  ) {
    this.dataPaciente = JSON.parse(localStorage.getItem('documento'));
    this.getDataPautaBreve();
  }

  ngOnInit(): void {
  }

  async getDataPautaBreve() {
    await this.pautaBreveService.getPromisePautaBreveByNroHcl(this.dataPaciente.nroDocumento).then(data => {
      this.dataResPautaBreve = data;
    });
    if (this.dataResPautaBreve == null)
      return
    this.resultListEEDP = this.dataResPautaBreve;
  }
  openShowPautaBreveDialog(index) {
    this.edadNroSelected = this.dataResPautaBreve[0].mesEdad;
    this.edadNroSelected == 1 ? this.varMes = 'MES' : this.varMes = 'MESES';
    this.arrayPautaBreve = this.dataResPautaBreve[index].listaItemPB;
    this.pautaBreveDialog = true;
  }
}