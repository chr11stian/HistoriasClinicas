import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api"

@Component({
    selector: 'app-step-general',
    templateUrl: './step-general-consulta.component.html',
    styleUrls: ['./step-general-consulta.component.css']
})
export class StepGeneral_consultaComponent implements OnInit {
    options: data[]
    selectedOption: data
    items: MenuItem[]
    indiceActivo: number = 0
    stepName = "datos"

    constructor() {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ]
    }


    ngOnInit(): void {
        this.items = [
            {label: "Datos Generales"},
            {label: "Interrogatorio"},
            {label: "Diagnosticos"},
            {label: "Tratamiendo"},
            {label: "Resultados"},
        ]
    }

    name() {
        switch (this.indiceActivo) {
            case 4:
                this.stepName = "resultados"
                break
            case 3:
                this.stepName = "tratamiento"
                break
            case 2:
                this.stepName = "diagnostico"
                break
            case 1:
                this.stepName = "interrogatorio"
                break
            case 0:
                this.stepName = "datos"
                break
        }
    }

    ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name()
    }
}

interface data {
    name: string
    code: number
}
