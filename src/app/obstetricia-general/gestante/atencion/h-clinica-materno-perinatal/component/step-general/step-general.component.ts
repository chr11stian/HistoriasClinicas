import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api"

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
    stepName = "datosgeneralesfiliacion"

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
            {label: "Filiación"},
            {label: "Antecedentes"},
            {label: "Datos Basales"},
            {label: "Atenciones"},
            {label: "Partos o Abortos"},
            {label: "Recien Nacidos"},
            {label: "Puerperio"},
        ]
    }

    name() {
        switch (this.indiceActivo) {
            case 6:
                this.stepName = "puerperio"
                break
            case 5:
                this.stepName = "nacidos"
                break
            case 4:
                this.stepName = "partos"
                break
            case 3:
                this.stepName = "atenciones"
                break
            case 2:
                this.stepName = "basales"
                break
            case 1:
                this.stepName = "antecedentes"
                break
            case 0:
                this.stepName = "datosgeneralesfiliacion"
                break
        }
        console.log(this.stepName);
    }

    ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name()
        console.log("aaa", event);
    }
}

interface data {
    name: string
    code: number
}
