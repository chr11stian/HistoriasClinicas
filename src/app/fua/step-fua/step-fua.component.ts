import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from "primeng/api"
import { IpressComponent } from '../ipress/ipress.component';

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
    stepName = "ipress"

    @ViewChild(IpressComponent) ipress:IpressComponent;

    constructor() {
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
            // {label: "Del Asegurado"},
            { label: "Datos especificos" },
            // {label: "Concepto prestacional"},
            // {label: "Refiere contra"},
            // {label: "Diagnostico"},
        ]
    }

    name() {
        switch (this.indiceActivo) {
            // case 5:
            //     this.stepName = "diagnostico"
            //     break
            // case 4:
            //     this.stepName = "refiere-contrarefiere"
            //     break
            // case 3:
            //     this.stepName = "concepto-prestacional"
            //     break
            // case 2:
            //     this.stepName = "atencion"
            //     break
            // case 1:
            //     this.stepName = "asegurado-usuario"
            //     break
            case 1:
                this.stepName = "atencion"
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
    nextPage(){
        console.log('siguiente ');
        switch (this.stepName) {
            case 'ipress':
                this.ipress.save();
                this.stepName = "atencion"
                this.indiceActivo = 1
                break;
        
            default:
                break;
        }
    }
}

interface data {
    name: string
    code: number
}
