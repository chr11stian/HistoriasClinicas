import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DialogConsultaUniversalComponent} from './dialog-consulta-universal/dialog-consulta-universal.component';
import {DialogConsultaComponent} from './dialog-consulta/dialog-consulta.component';

@Component({
    selector: 'app-historias-consultas',
    templateUrl: './historia-consultas.component.html',
    styleUrls: ['./historia-consultas.component.css'],
    providers: [DialogService]
})
export class HistoriaConsultasComponent implements OnInit {
    options: any;
    citas: any[];
    consultaDialog: boolean;
    form: FormGroup;
    prueba: any[];

    ref: DynamicDialogRef

    constructor(
        private formBuilder: FormBuilder,
        public dialog: DialogService,
    ) {
        this.buildForm();
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
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
                "max-height": "700px",
                overflow: "auto",
            },
            // footer:`hola mundo`,
            data: {
                texto: 'datossss'
            }
        })

    }

    openDialogConsultaUniversal() {
        this.ref = this.dialog.open(DialogConsultaUniversalComponent, {
            header: "CONSULTA UNIVERSAL",
            width: "95%",
            contentStyle: {
                "max-height": "500px",
                overflow: "auto",
            },
            data: {
                texto: 'datossss'
            }
        })

        this.ref.onClose.subscribe((data: any) => {
            //console.log('data de otro dialog ', data)
        })
    }

    ngOnInit(): void {
    }

}

interface data {
    name: string
    code: number
}

