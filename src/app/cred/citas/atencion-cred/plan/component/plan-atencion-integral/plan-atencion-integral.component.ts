import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {DialogService} from 'primeng/dynamicdialog'

@Component({
    selector: 'app-plan-atencion-integral',
    templateUrl: './plan-atencion-integral.component.html',
    styleUrls: ['./plan-atencion-integral.component.css'],
    providers: [DialogService]
})
export class PlanAtencionIntegralComponent implements OnInit {
    @Input() isFirstConsulta=false
    @Output() onChangeIndice:EventEmitter<number>=new EventEmitter<number>();
    stateOptions: any[]
    date3: Date
    constructor() {
        this.stateOptions = [{label: 'SI', value: true},
            {label: 'NO', value: false}]

    }
    guardarDatosGenerales(){
        this.onChangeIndice.emit(2);
    }


    ngOnInit(): void {
    }

}
