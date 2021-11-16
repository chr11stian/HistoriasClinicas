import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
    selector: 'app-consultas-general',
    templateUrl: './consultas-general.component.html',
    styleUrls: ['./consultas-general.component.css']
})
export class ConsultasGeneralComponent implements OnInit {
    options: any;
    citas: any[];
    consultaDialog: boolean;
    form: FormGroup;
    prueba: any[];
    constructor(
        private formBuilder: FormBuilder
    ) {
        this.buildForm();
        this.options = [
            { name: "DNI", code: 1 },
            { name: "CARNET RN", code: 2 },
            { name: "C EXTRANJERIA", code: 3 },
            { name: "OTROS", code: 4 },
        ];
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
        ];
        this.prueba = [{
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas de alerta",
        },
        {
            tratamientos: "Mantener Reposo",
            diagnostico: "Presenta sintomas leves",
        },
        {
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas de peligro",
        },
        {
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas leves",
        }]

    }
    openNew() {
        this.consultaDialog = true;
    }
    buildForm() {
        this.form = this.formBuilder.group({
            sexo: [''],
            pesoRN: [''],
        })
    }
    ngOnInit(): void {
    }

}

interface data {
    name: string
    code: number
}
