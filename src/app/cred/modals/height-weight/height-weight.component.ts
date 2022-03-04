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
    colorMarron = '#654b3d'
    colorNaranja = 'rgba(245,93,25,0.85)'
    colorVerde = 'rgba(62,199,47,0.8)'
    colorAzul = '#0c3866'
    colorRojo = 'rgba(255,0,0,0.86)'
    colorNaranjaClaro = 'rgba(236,134,90,0.93)'
    colors = [
        this.colorMarron,
        this.colorRojo,
        this.colorNaranja,
        this.colorVerde,
        this.colorNaranja,
        this.colorRojo,
        this.colorMarron,
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
            (this.config.data.dataChild as number[][]),
            {color: this.colorAzul, name: this.config.data.isBoy ? 'niño' : 'niña'},
            this.colors,
            {xAxis: 'cm', yAxis: 'kg'}
        )
        this.data = {
            nameAxisX: 'LONGITUD (cm)',
            nameAxisY: 'PESO(KG)',
            titleGraph: 'Puntuación Z - DIAGNÓSTICO ' + (this.config.data.isBoy ? 'DEL NIÑO' : 'DE LA NIÑA') + ': ' + this.config.data.diagnostic.toUpperCase(),
            subTitleGraph: '(Nacimiento a 2 años)',
            measurementUnits: ['kg', 'cm'],
            series: valueSerie,
            typeAxisX: 'longitud'
        }
    }

}
