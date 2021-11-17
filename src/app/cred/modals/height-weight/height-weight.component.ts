import {Component, OnInit} from '@angular/core'
import {GraphInterface} from '../../../shared/models/graph.interface'
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog'
import {HeightWeightChartService} from '../../services/height-weight-chart.service'
import {FillDataGraphService} from '../../services/fill-data-graph.service'

@Component({
    selector: 'height-weight-chart',
    templateUrl: './height-weight.component.html',
    styleUrls: ['./height-weight.component.css']
})
export class HeightWeightComponent implements OnInit {
    data: GraphInterface

    colorNegro = 'rgba(33,32,32,0.91)'
    colorNaranja = 'rgba(220,90,34,0.93)'
    colorNaranjaClaro = 'rgba(236,134,90,0.93)'
    colorVerde = 'rgba(64,218,113,0.93)'
    colors = [
        this.colorNegro,
        this.colorNaranja,
        this.colorNaranjaClaro,
        this.colorVerde,
        this.colorNaranjaClaro,
        this.colorNaranja,
        this.colorNegro,
    ]
    names = [
        '3',
        '2',
        '1',
        '0',
        '-1',
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
        this.heightWeightChartService.getDataHeightWeightGirl().subscribe((res) => {
            console.log(res)
            this.fillData(res['data'])
        })
    }

    getDataBoy(): void {
        this.heightWeightChartService.getDataHeightWeightBoy().subscribe((res) => {
            console.log(res)
            this.fillData(res['data'])
        })
    }

    fillData(data): void {
        const valueSerie = this.fillDataGraphService.fillDataGraphV2(
            data,
            this.names,
            (this.config.data.dataChild as Array<number[]>),
            {color: '#09fff9', name: this.config.data.isBoy ? 'niño' : 'niña'},
            this.colors,
            {xAxis: 'cm', yAxis: 'kg'}
        )
        this.data = {
            nameAxisX: 'LONGITUD (cm)',
            nameAxisY: 'PESO(KG)',
            titleGraph: 'Puntuación Z ',
            subTitleGraph: '(Nacimiento a 2 años)',
            measurementUnits: ['kg', 'meses'],
            series: valueSerie,
            hasYears: true
        }
    }

}
