import {Component, OnInit} from '@angular/core'
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog'
import {WeightChartComponent} from '../modals/weight-chart/weight-chart.component'
import {HeightChartComponent} from '../modals/height-chart/height-chart.component'
import {HeightWeightComponent} from '../modals/height-weight/height-weight.component'

@Component({
    selector: 'app-plan-atencion-integral',
    templateUrl: './plan-atencion-integral.component.html',
    styleUrls: ['./plan-atencion-integral.component.css'],
    providers: [DialogService]
})
export class PlanAtencionIntegralComponent implements OnInit {
    stateOptions: any[]
    date3: Date
    ref: DynamicDialogRef

    constructor(public dialogService: DialogService) {
        this.stateOptions = [{label: 'SI', value: true},
            {label: 'NO', value: false}]

    }

    ngOnInit(): void {
    }

    onWeightChart(): void {
        const isBoy = true
        this.ref = this.dialogService.open(WeightChartComponent, {
            data: {
                dataChild: [
                    [1, 4.25]
                ], /* debe ser dataChild:[[mes,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy
            },
            header: isBoy ? 'GRÁFICA DE PESO DE UN NIÑO' : 'GRÁFICA DE PESO DE UN NIÑA',
            // width: '90%',
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

    onHeightChart(): void {
        const isBoy = true
        this.ref = this.dialogService.open(HeightChartComponent, {
            data: {
                dataChild: [], /* debe ser dataChild:[[mes,altura],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy
            },
            header: isBoy ? 'LONGITUD/ESTATURA PARA LOS NIÑOS' : 'LONGITUD/ESTATURA PARA LOS NIÑAS',
            // width: '90%',
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

    onHeightWeightChart(): void {
        const isBoy = true
        this.ref = this.dialogService.open(HeightWeightComponent, {
            data: {
                dataChild: [], /* debe ser dataChild:[[altura,peso],..] ejem: dataChild:[[1,4.5],..]  */
                isBoy: isBoy
            },
            header: isBoy ? 'PESO PARA LA LONGITUD NIÑOS' : 'PESO PARA LA LONGITUD NIÑAS',
            // width: '90%',
            height: '90%',
            width: '70%',
            style: {
                position: 'absolute',
                top: '17px',
            },
        })
    }

}
