import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-dialog-consulta-universal',
    templateUrl: './dialog-consulta-universal.component.html',
    styleUrls: ['./dialog-consulta-universal.component.css']
})
export class DialogConsultaUniversalComponent implements OnInit {
    @Input() dataHijo: string;

    form: FormGroup;
    prueba: any;
    isUpdate: boolean = false;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef
        // private
    ) {
        this.inicializarForm();
    }

    ngOnInit(): void {
        
    }

    inicializarForm() {
        this.form = this.fb.group({
            fechaAtencion: new FormControl(""),
            edad: new FormControl(""),
            nroAtencion: new FormControl(""),
            nroControlSis: new FormControl(""),
            direccion: new FormControl(""),
            //funciones vitales
            temperatura: new FormControl(""),
            presionSis: new FormControl(""),//sistolica y diastoloica
            presionDias: new FormControl(""),
            fc: new FormControl(""),
            fr: new FormControl(""),
            peso: new FormControl(""),
            talla: new FormControl(""),
            imc: new FormControl(""),

            apetito: new FormControl(''),
            sed: new FormControl(''),
            sueno: new FormControl(''),
            estadoAnimo: new FormControl(''),
        })
    }

    closeDialog() {
        let a = {
            a: 2,
            b: 'hola mundo'
        }
        this.ref.close(a);
    }

}
