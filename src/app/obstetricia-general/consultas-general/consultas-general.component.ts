import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-consultas-general',
    templateUrl: './consultas-general.component.html',
    styleUrls: ['./consultas-general.component.css']
})
export class ConsultasGeneralComponent implements OnInit {
    options: any;
    citas: any[];

    constructor() {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ],
            this.citas = [
                {
                    dni: "DNI",
                    apellidos: "OLAZABAL CALLER",
                    nombres: "LETICIA GIULIANA",
                    consultorio: "OBS01",
                    horario: "8:00AM",
                    fecha: "16/11/2021"
                },
                {
                    dni: "DNI",
                    apellidos: "OLAZABAL CALLER",
                    nombres: "LETICIA GIULIANA",
                    consultorio: "OBS01",
                    horario: "8:00AM",
                    fecha: "16/11/2021"
                },
                {
                    dni: "DNI",
                    apellidos: "OLAZABAL CALLER",
                    nombres: "LETICIA GIULIANA",
                    consultorio: "OBS01",
                    horario: "8:00AM",
                    fecha: "16/11/2021"
                },
                {
                    dni: "DNI",
                    apellidos: "OLAZABAL CALLER",
                    nombres: "LETICIA GIULIANA",
                    consultorio: "OBS01",
                    horario: "8:00AM",
                    fecha: "16/11/2021"
                },
            ]

    }

    ngOnInit(): void {
    }

}

interface data {
    name: string
    code: number
}
