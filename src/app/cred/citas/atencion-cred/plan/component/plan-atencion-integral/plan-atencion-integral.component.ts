import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {DialogService} from 'primeng/dynamicdialog'

@Component({
    selector: 'app-plan-atencion-integral',
    templateUrl: './plan-atencion-integral.component.html',
    styleUrls: ['./plan-atencion-integral.component.css'],
    providers: [DialogService]
})
export class PlanAtencionIntegralComponent implements OnInit {
    consulta: string= ""
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
        this.consulta = 'http://190.108.93.145:8200/jasperserver/rest_v2/reports/Reports/v1/credninio/reporte_carnet_atencion_integral_salud_ninio.pdf?authorization='+
            JSON.parse(localStorage.getItem("token")).token+'&nroHistoriaClinica='+JSON.parse(localStorage.getItem("documento")).nroDocumento
    }

}
