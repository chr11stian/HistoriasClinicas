import {Component, OnInit} from '@angular/core'
/** Primeng import for modal */
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog'
import {GraphInterface} from '../../../shared/models/graph.interface'
import {FillDataGraphService} from '../../services/fill-data-graph.service'
import {HeightWeightChartService} from '../../services/height-weight-chart.service'

@Component({
    selector: 'app-weight-chart',
    templateUrl: './weight-chart.component.html',
    styleUrls: ['./weight-chart.component.css']
})


export class WeightChartComponent implements OnInit {

    data: GraphInterface
    colorAzul = '#0c3866'
    colorVerde = 'rgba(62,199,47,0.8)'
    colorNaranja = 'rgba(245,93,25,0.85)'
    colorNegro = '#0e0e0e'
    colorRojo = 'rgba(255,0,0,0.86)'
    colors = [
        this.colorRojo,
        this.colorNaranja,
        this.colorVerde,
        this.colorNaranja,
        this.colorRojo,
    ]
    names = [
        '3',
        '2',
        '0',
        '-2',
        '-3',
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
        this.heightWeightChartService.getDataWeightGirl().subscribe((res) => {
            this.fillData(res['data'])
        })
    }

    getDataBoy(): void {
        this.heightWeightChartService.getDataWeightBoy().subscribe((res) => {
            this.fillData(res['data'])
        })
    }

    fillData(data): void {
        const attribute = {
            color: this.colorAzul, name: this.config.data.isBoy ? 'niño' : 'niña'
        }
        const valueSerie = this.fillDataGraphService.fillDataGraphV2(
            data,
            this.names,
            (this.config.data.dataChild as number[][]),
            attribute,
            this.colors,
            {xAxis: 'meses', yAxis: 'kg'}
        )
        let diagnostico =
            this.config.data.diagnostic === undefined
                ? ""
                : this.config.data.diagnostic;
        this.data = {
            nameAxisY: 'PESO(KG)',
            nameAxisX: 'EDAD (EN MESES Y AÑOS CUMPLIDOS)',
            titleGraph: 'Puntuación Z - DIAGNÓSTICO ' + (this.config.data.isBoy ? 'DEL NIÑO' : 'DE LA NIÑA') + ': ' + diagnostico.toUpperCase(),
            subTitleGraph: '(Nacimiento a 5 años)',
            measurementUnits: ['kg', 'meses'],
            // measurementUnits: ['meses', 'kg'],
            series: valueSerie,
            typeAxisX: 'year'
        }
    }
}
