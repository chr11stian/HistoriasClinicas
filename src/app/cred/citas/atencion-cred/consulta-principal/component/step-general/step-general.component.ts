import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {ConsultaGeneralService} from '../../services/consulta-general.service'
import {ConsultaGeneralInterface} from '../../models/consultaGeneral'

@Component({
    selector: 'app-step-general',
    templateUrl: './step-general.component.html',
    styleUrls: ['./step-general.component.css']
})
export class StepGeneralComponent implements OnInit {

    options: data[]
    selectedOption: data
    items: MenuItem[]
    indiceActivo: number = 0
    stepName = 'datos'
    consulta: ConsultaGeneralInterface

    constructor(private consultaGeneralService: ConsultaGeneralService) {
        this.options = [
            {name: 'DNI', code: 1},
            {name: 'CARNET RN', code: 2},
            {name: 'C EXTRANJERIA', code: 3},
            {name: 'OTROS', code: 4},
        ]
    }


    ngOnInit(): void {
        this.items = [
            {label: 'Datos Generales', styleClass: 'icon'},
            {label: 'Motivo de Consulta', styleClass: 'icon1'},
            {label: 'Diagnostico', styleClass: 'icon2'},
            {label: 'Tratamiento', styleClass: 'icon3'},
            {label: 'Finalizar', styleClass: 'icon4'},
        ]
        this.getNewQuery()
    }

    getNewQuery(): void {
        this.consultaGeneralService.crearConsulta(
            {
                'tipoDoc': 'DNI',
                'nroDoc': '10102023',
                'tipoDocProfesional': 'DNI',
                'nroDocProfesional': '45678912'
            }
        ).toPromise().then((result) => {
            this.consulta = result.object
        }).catch((err) => {
            console.log(err)
        })
    }

    //--cambia los nombres de los steps según el indice
    name() {
        switch (this.indiceActivo) {
            case 4:
                this.stepName = 'finalizar'
                break
            case 3:
                this.stepName = 'tratamiento'
                break
            case 2:
                this.stepName = 'diagnostico'
                break
            case 1:
                this.stepName = 'motivo'
                break
            case 0:
                this.stepName = 'datos'
                break
        }
    }


    //--cambia step
    ChangeStep(event: number) {
        this.indiceActivo = event
        this.name()
    }
}

interface data {
    name: string
    code: number
}
