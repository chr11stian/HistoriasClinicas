import {Component, OnInit} from '@angular/core'
import {WeightAgeService} from '../services/weight-age.service'

@Component({
    selector: 'app-plan-atencion-integral',
    templateUrl: './plan-atencion-integral.component.html',
    styleUrls: ['./plan-atencion-integral.component.css']
})
export class PlanAtencionIntegralComponent implements OnInit {
    valueAxisX: number[] = []
    valueAxisY: number[][] = []
    colors: string[] = ['#5F5F54', '#3b3838', '#EE7751', '#DC6943', '#55A34D']
    names: string[] = ['#5F5F54', '#3b3838', '#EE7751', '#DC6943', '#55A34D']
    show = false

    constructor(private weightAgeService: WeightAgeService) {
    }

    ngOnInit(): void {
        this.getData()
    }

    getData(): void {
        this.weightAgeService.getDataGraph().subscribe((res) => {
            console.log('daniel')
            console.log(res.data)
            this.valueAxisX = res.data.ejeX
            this.valueAxisY.push(res.data.morado)
            this.valueAxisY.push(res.data.morado_oscuro)
            this.valueAxisY.push(res.data.naranja_1)
            this.valueAxisY.push(res.data.naranja_oscuro)
            this.valueAxisY.push(res.data.verde)
            this.show = true
        })
    }

}
