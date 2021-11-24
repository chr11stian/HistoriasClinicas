import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tratamiento-consulta',
    templateUrl: './tratamiento-consulta.component.html',
    styleUrls: ['./tratamiento-consulta.component.css']
})
export class TratamientoConsultaComponent implements OnInit {
    data: any[] = [];
    tratamiento: any[];
    acuerdo: any[];
    constructor() {
        this.tratamiento = [
            {
                tratamiento: "consulta 1"
            },
            {
                tratamiento: "consulta 2"
            },
            {
                tratamiento: "consulta 3"
            },
            {
                tratamiento: "consulta 4"
            },
        ]
        this.acuerdo = [
            {
                acuerdo: "acuerdo 1"
            },
            {
                acuerdo: "acuerdo 2"
            },
            {
                acuerdo: "acuerdo 3"
            },
            {
                acuerdo: "acuerdo 4"
            },
        ]
    }

    ngOnInit(): void {
    }

    editar(rowData: any) {
    }

    eliminar(rowData: any) {
    }
}
