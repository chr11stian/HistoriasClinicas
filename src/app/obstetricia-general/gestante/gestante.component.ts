import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-gestante',
    templateUrl: './gestante.component.html',
    styleUrls: ['./gestante.component.css']
})
export class GestanteComponent implements OnInit {
    options: data[]
    selectedOption: data
    gestacion: any[]
    paciente: FormGroup;

    constructor(private form: FormBuilder) {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ]
        this.gestacion = [
            {
                tipoDoc: "DNI",
                dni: "10101010",
                apnombres:"XXXXX XXXX XXX",
                nroGestacion: 1,
                gestacion: "Normal",
                estado: "Activo",
            },
            // {
            //     tipoDoc: "DNI",
            //     dni: "10101010",
            //     nroGestacion: 2,
            //     gestacion: "Normal",
            //     estado: "Inactivo",
            // },
            // {
            //     tipoDoc: "DNI",
            //     dni: "10101010",
            //     nroGestacion: 3,
            //     gestacion: "Normal",
            //     estado: "Activo",
            // },

        ]

    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.paciente = this.form.group({
            tipoDocumento: new FormControl('dni'),
            nroDocumento: new FormControl('q'),
            apellidosNombres: new FormControl('q'),
        })
    }

}

interface data {
    name: string
    code: number
}
