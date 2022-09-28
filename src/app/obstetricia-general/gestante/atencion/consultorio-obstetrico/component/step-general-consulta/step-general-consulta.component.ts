import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from "primeng/api"
import Swal from "sweetalert2";

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
    IDConsulta: string = null;

    constructor() {
        this.options = [
            { name: "DNI", code: 1 },
            { name: "CARNET RN", code: 2 },
            { name: "C EXTRANJERIA", code: 3 },
            { name: "OTROS", code: 4 },
        ]
        this.IDConsulta = JSON.parse(localStorage.getItem('IDConsulta'));
    }


    ngOnInit(): void {
        this.items = [
            { label: "Datos Generales" },
            { label: "Interrogatorio" },
            { label: "Tamizaje"},
            { label: "Exámenes Auxiliares" },
            { label: "Diagnosticos" },
            { label: "Procedimientos" },
            { label: "Tratamientos" },
            { label: "Finalizar" },
        ]
    }

    name() {
        switch (this.indiceActivo) {
            case 7:
                this.stepName = "finalizar"
                break
            case 6:
                this.stepName = "tratamiento"
                break
            case 5:
                this.stepName = "procedimientos"
                // this.stepName = "tratamiento"
                break
            case 4:
                this.stepName = "diagnostico"
                break
            case 3:
                this.stepName = "evaluaciones"
                break
            case 2: {
                console.log('data id consulta ', this.IDConsulta);
                if (this.IDConsulta == null) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Consulta',
                        text: 'No resgistrada',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    return
                } else {
                    this.stepName = "tamizaje"
                }

            }
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
        console.log("INDEX", this.indiceActivo)
        this.name()
    }
    
}

interface data {
    name: string
    code: number
}
