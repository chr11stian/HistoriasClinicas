import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DialogService } from 'primeng/dynamicdialog';
import { DialogConsultaComponent } from './dialog-consulta/dialog-consulta.component';
@Component({
    selector: 'app-consultas-general',
    templateUrl: './consultas-general.component.html',
    styleUrls: ['./consultas-general.component.css'],
    providers: [DialogService]
})
export class ConsultasGeneralComponent implements OnInit {
    options: any;
    citas: any[];
    consultaDialog: boolean;
    form: FormGroup;
    prueba: any[];
    // ref: DynamicDialogRef
    constructor(
        private formBuilder: FormBuilder,
        public dialog: DialogService
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

    openDialogConsulta() {
        let dialog = this.dialog.open(DialogConsultaComponent, {
            header: "CONSULTA",
            width: "95%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            // footer:`hola mundo`,
            data:{
                texto:'datossss'
            }
        })

    }

    ngOnInit(): void {
    }

}

interface data {
    name: string
    code: number
}

