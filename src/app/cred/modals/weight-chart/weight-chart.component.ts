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
    colorMorado = 'rgba(7,33,103,0.91)'
    colorNaranja = 'rgba(220,90,34,0.93)'
    colorVerde = 'rgba(62,199,47,0.8)'
    colors = [
        this.colorMorado,
        this.colorNaranja,
        this.colorVerde,
        this.colorNaranja,
        this.colorMorado,
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
        this.heightWeightChartService.getDataWeight().subscribe(res => {
            this.fillData(res['data'])
        })
        /*if (this.config.data.isBoy) {
            this.getDataBoy()
        } else {
            this.getDataGirl()
        }*/
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
            color: '#09fff9', name: this.config.data.isBoy ? 'niño' : 'niña'
        }
        const valueSerie = this.fillDataGraphService.fillDataGraphV2(
            data,
            this.names,
            (this.config.data.dataChild as number[][]),
            attribute,
            this.colors,
            {xAxis: 'meses', yAxis: 'kg'}
        )
        this.data = {
            nameAxisY: 'PESO(KG)',
            nameAxisX: 'EDAD (EN MESES Y AÑOS CUMPLIDOS)',
            titleGraph: 'Puntuación Z ',
            subTitleGraph: '(Nacimiento a 5 años)',
            measurementUnits: ['kg', 'meses'],
            // measurementUnits: ['meses', 'kg'],
            series: valueSerie,
            typeAxisX: 'year'
        }
    }
}
