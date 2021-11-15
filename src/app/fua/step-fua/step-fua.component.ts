import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api"

@Component({
    selector: 'app-step-fua',
    templateUrl: './step-fua.component.html',
    styleUrls: ['./step-fua.component.css']
})
export class StepFuaComponent implements OnInit {
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
            {label: "De la IPRESS"},
            {label: "Del Asegurado"},
            {label: "De la Atención"},
            {label: "Concepto prestacional"},
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
                this.stepName = "asegurado-usuario"
                break
            case 0:
                this.stepName = "ipress"
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
