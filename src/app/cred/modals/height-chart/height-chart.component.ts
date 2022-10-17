import {Component, OnInit} from '@angular/core'
import {GraphInterface} from '../../../shared/models/graph.interface'
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog'
import {FillDataGraphService} from '../../services/fill-data-graph.service'
import {HeightWeightChartService} from '../../services/height-weight-chart.service'

@Component({
    selector: 'app-height-chart',
    templateUrl: './height-chart.component.html',
    styleUrls: ['./height-chart.component.css']
})
export class HeightChartComponent implements OnInit {
    colorAzul = '#0c3866'
    colorVerde = 'rgba(62,199,47,0.8)'
    colorNaranja = 'rgba(245,93,25,0.85)'
    colorNegro = '#0e0e0e'
    colorRojo = 'rgba(255,0,0,0.86)'
    data: GraphInterface
    colors = [
        this.colorRojo,
        this.colorNaranja,
        this.colorVerde,
        this.colorNaranja,
        this.colorRojo,
    ]
    names = [
        '-3',
        '-2',
        '0',
        '2',
        '3',
    ]

    constructor(public ref: DynamicDialogRef,
                private heightWeightChartService: HeightWeightChartService,
                private fillDataGraphService: FillDataGraphService,
                public config: DynamicDialogConfig) {
    }

    ngOnInit(): void {
        this.getData()
    }

    getData(): void {
        if (this.config.data.isBoy) {
            this.getDataBoy()
        } else {
            this.getDataGirl()
        }
    }

    getDataGirl(): void {
        this.heightWeightChartService.getDataHeightGirl().subscribe((res) => {
            this.fillData(res['data'])
        })
    }

    getDataBoy(): void {
        this.heightWeightChartService.getDataHeightBoy().subscribe((res) => {
            this.fillData(res['data'])
        })
    }

    fillData(data): void {
        const valueSerie = this.fillDataGraphService.fillDataGraphV2(
            data,
            this.names,
            (this.config.data.dataChild as Array<number[]>),
            {color: this.colorAzul, name: this.config.data.isBoy ? 'niño' : 'niña'},
            this.colors,
            {xAxis: 'meses', yAxis: 'cm'}
        )
        let diagnostico =
            this.config.data.diagnostic === undefined
                ? ""
                : this.config.data.diagnostic;
        this.data = {
            nameAxisY: 'Longitud/Estatura (cm)',
            nameAxisX: 'EDAD (EN MESES Y AÑOS CUMPLIDOS)',
            titleGraph: 'Puntuación Z - DIAGNÓSTICO ' + (this.config.data.isBoy ? 'DEL NIÑO' : 'DE LA NIÑA') + ': ' + diagnostico.toUpperCase(),
            subTitleGraph: '(Nacimiento a 5 años)',
            measurementUnits: ['cm', 'meses'],
            series: valueSerie,
            typeAxisX: 'altura'
        }
    }

}
