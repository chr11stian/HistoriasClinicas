import { Component, OnInit } from '@angular/core';
import {GraphInterface} from "../../../../../shared/models/graph.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PesoGestanteGraphService} from "../../../../services/peso-gestante-graph.service";
import {FillDataGraphService} from "../../../../../cred/services/fill-data-graph.service";

@Component({
  selector: 'app-altura-uterina',
  templateUrl: './altura-uterina.component.html',
  styleUrls: ['./altura-uterina.component.css']
})
export class AlturaUterinaComponent implements OnInit {

  data: GraphInterface

  colors = [
    'rgba(255,0,0,0.86)',
    'rgba(62,199,47,0.8)',
  ]

  names = ['p10','p90']

  constructor(public ref: DynamicDialogRef,
              private pesoGestanteGraphService: PesoGestanteGraphService,
              private fillDataGraphService: FillDataGraphService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.alturaUterina()
  }


  alturaUterina() {
    this.pesoGestanteGraphService.getDataAlturaUterinaGraph().subscribe(
        result => {
          this.fillData(result['data'])
        }
    )
  }
  fillData(data): void {
    const valueSerie = this.fillDataGraphService.fillDataGraphV2(
        data,
        this.names,
        (this.config.data.dataPregmant as Array<number[]>),
        {color: '#09fff9', name: 'gestante'},
        this.colors,
        {xAxis: 'trimestre', yAxis: 'cm'}
    )
    this.data = {
      nameAxisY: 'ALTURA UTERINA (kg)',
      nameAxisX: 'Trimestres',
      titleGraph: 'GRAFICA ALTURA UTERINA ',
      subTitleGraph: '',
      measurementUnits: ['cm', 'semanas'],
      series: valueSerie,
      typeAxisX: 'trimestre'
    }
  }

}
