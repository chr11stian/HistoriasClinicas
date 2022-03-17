import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from "primeng/api"

@Component({
    selector: 'app-step-general-consulta',
    templateUrl: './step-general-consulta.component.html',
    styleUrls: ['./step-general-consulta.component.css']
})
export class StepGeneral_consultaComponent implements OnInit {
    options: data[]
    selectedOption: data
    items: MenuItem[]
    indiceActivo: number = 0
    stepName = "datos"

    data: any
    constructor(
    ) {
        this.options = [
            { name: "DNI", code: 1 },
            { name: "CARNET RN", code: 2 },
            { name: "C EXTRANJERIA", code: 3 },
            { name: "OTROS", code: 4 },
        ]
    }


    ngOnInit(): void {
        this.items = [
            { label: "Datos Generales" },
            { label: "Interrogatorio" },
            { label: "Diagnosticos" },
            { label: "Evaluaciones" },
            { label: "Tratamientos" },
            { label: "Procedimientos" },
            { label: "Finalizar" },
        ]
    }

    name() {
        switch (this.indiceActivo) {
            case 6:
                this.stepName = "finalizar"
                break
            case 5:
                this.stepName = "procedimientos"
                break
            case 4:
                this.stepName = "tratamiento"
                break
            case 3:
                this.stepName = "evaluaciones"
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
