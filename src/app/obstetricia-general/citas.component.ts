import {Component, OnInit} from '@angular/core';
import {ObstetriciaGeneralService} from './services/obstetricia-general.service';
import {Router} from '@angular/router'
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogCitasComponent} from "./dialog-citas/dialog-citas.component";

@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css'],
    providers: [DialogService]

})
export class CitasComponent implements OnInit {

    options: data[]
    selectedOption: data
    citas: any[]


    ref: DynamicDialogRef

    constructor(public dialogService1: DialogService,
                private obstetriciaService: ObstetriciaGeneralService,
    ) {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ]
        this.citas = [
            {
                dni: "10101013",
                apellidos: "ABARCA MELGAREJO",
                nombres: "KATHERIN",
                consultorio: "OBS01",
                horario: "8:00AM",
                fecha: "20/11/2021"
            },
            {
                dni: "24015905",
                apellidos: "Vega Gutierrez",
                nombres: "Pedro",
                consultorio: "OBS01",
                horario: "9:00AM",
                fecha: "16/11/2021"
            },
            {
                dni: "87654321",
                apellidos: "MOROCO LAIME",
                nombres: "JONATHAN",
                consultorio: "OBS01",
                horario: "10:00AM",
                fecha: "16/11/2021"
            },
            // {
            //     dni: "DNI",
            //     apellidos: "OLAZABAL CALLER",
            //     nombres: "LETICIA GIULIANA",
            //     consultorio: "OBS01",
            //     horario: "8:00AM",
            //     fecha: "16/11/2021"
            // },
        ]

    }

    irConsultaNoControl(row) {
        console.log('pasando data ', row);
        this.obstetriciaService.data = row;
    }

    ngOnInit(): void {
    }

    openReprogramar() {
        let title = 'Reprogramar Cita'
        this.ref = this.dialogService1.open(DialogCitasComponent, {
            header: title,
            width: '75%',
        })
    }


}

interface data {
    name: string
    code: number
}
