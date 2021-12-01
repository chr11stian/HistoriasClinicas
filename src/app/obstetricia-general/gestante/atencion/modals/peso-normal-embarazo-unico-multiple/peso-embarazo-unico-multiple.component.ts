import {Component, OnInit} from '@angular/core'
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog'
import {PesoGestanteGraphService} from '../../../../services/peso-gestante-graph.service'
import {FillDataGraphService} from '../../../../../cred/services/fill-data-graph.service'
import {GraphInterface} from '../../../../../shared/models/graph.interface'

@Component({
    selector: 'app-peso-normal-embarazo-unico-multiple',
    templateUrl: './peso-embarazo-unico-multiple.component.html',
    styleUrls: ['./peso-embarazo-unico-multiple.component.css']
})
export class PesoEmbarazoUnicoMultipleComponent implements OnInit {
    data: GraphInterface

    colors = [
        'rgba(62,199,47,0.8)',
        'rgba(245,93,25,0.85)',
        'rgba(245,93,25,0.85)',
        'rgba(255,0,0,0.86)',
        '#170cee',
        '#0e0e0e'
    ]

    names = ['max', 'maxMult', 'med', 'medMult', 'min', 'minMult']

    constructor(public ref: DynamicDialogRef,
                private pesoGestanteGraphService: PesoGestanteGraphService,
                private fillDataGraphService: FillDataGraphService,
                public config: DynamicDialogConfig) {
    }

    ngOnInit(): void {
        this.classificationGraph()
    }

    classificationGraph() {
        const typeGraph: string = this.config.data.typeGraph
        switch (typeGraph) {
            case 'normal':
                this.weightNormal()
                break
            case 'sobrepeso':
                this.weightSobrepeso()
                break
            case 'bajo_peso':
                this.weightBajoPeso()
                break
            case 'obesidad':
                this.weightObesidad()
                break
        }
    }


    weightObesidad() {
        this.pesoGestanteGraphService.getDataObesidadGestanteGraph().subscribe(
            result => {
                this.fillData(result['data'])
            }
        )
    }

    weightBajoPeso(): void {
        this.colors = [
            'rgba(62,199,47,0.8)',
            'rgba(245,93,25,0.85)',
            'rgba(245,93,25,0.85)',
        ]
        this.names = ['max', 'med', 'min']
        this.pesoGestanteGraphService.getDataBajoPesoGestanteGraph().subscribe(
            result => {
                this.fillData(result['data'])
            }
        )
    }

    weightSobrepeso(): void {
        this.pesoGestanteGraphService.getDataSobrepesoGestanteGraph().subscribe(
            result => {
                this.fillData(result['data'])
            }
        )
    }


    weightNormal(): void {
        this.pesoGestanteGraphService.getDataPesoGestanteNormalGraph().subscribe(
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
            {xAxis: 'trimestre', yAxis: 'kg'}
        )
        this.data = {
            nameAxisY: 'GANANCIA DE PESO (kg)',
            nameAxisX: 'Trimestres',
            titleGraph: 'GRAFICA DE AUMENTO DE PESO ',
            subTitleGraph: '',
            measurementUnits: ['kg', 'semanas'],
            series: valueSerie,
            typeAxisX: 'trimestre'
        }
    }

}
