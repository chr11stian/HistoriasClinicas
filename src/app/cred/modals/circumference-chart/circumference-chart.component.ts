import {Component, OnInit} from '@angular/core';
import {GraphInterface} from "../../../shared/models/graph.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {HeightWeightChartService} from "../../services/height-weight-chart.service";
import {FillDataGraphService} from "../../services/fill-data-graph.service";

@Component({
    selector: 'app-circumference-chart',
    templateUrl: './circumference-chart.component.html',
    styleUrls: ['./circumference-chart.component.css']
})
export class CircumferenceChartComponent implements OnInit {
    data: GraphInterface
    colorNegro = 'rgba(33,32,32,0.91)'
    colorNaranja = 'rgba(220,90,34,0.93)'
    colorNaranjaClaro = 'rgba(236,134,90,0.93)'
    colorVerde = 'rgba(64,218,113,0.93)'
    colorAzul = 'rgba(64,67,218,0.93)'
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
        'P3',
        'P10',
        'P25',
        'P50',
        'P75',
        'P90',
        'P97',
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
        this.heightWeightChartService.getDataCircumferenceGirl().subscribe((res) => {
            this.fillData(res['data'])
        })
    }

    getDataBoy(): void {
        this.heightWeightChartService.getDataCircumferenceBoy().subscribe((res) => {
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
            {xAxis: 'meses', yAxis: 'cm'}
        )
        this.data = {
            nameAxisY: 'Longitud/Circunferencia (cm)',
            nameAxisX: 'EDAD (EN MESES Y AÑOS CUMPLIDOS)',
            titleGraph: 'Percentiles - DIAGNÓSTICO ' + (this.config.data.isBoy ? 'DEL NIÑO' : 'DE LA NIÑA') + ': ' + this.config.data.diagnostic.toUpperCase(),
            subTitleGraph: '(Nacimiento a 5 años)',
            measurementUnits: ['cm', 'meses'],
            series: valueSerie,
            typeAxisX: 'circunferencia'
        }
    }

}
