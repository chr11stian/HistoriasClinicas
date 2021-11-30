import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-datos-generales',
    templateUrl: './datos-generales.component.html',
    styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
    formDatos_Generales: FormGroup;
    opciones: any;

    constructor(private form: FormBuilder,) {
        this.opciones = [
            {name: 'SI', code: 'S'},
            {name: 'NO', code: 'N'},
        ];
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formDatos_Generales = this.form.group({
            nroDoc: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            nombres: new FormControl(''),
            edad: new FormControl(''),
            telefono: new FormControl(''),
            gradoInstruccion: new FormControl(''),
            direccion: new FormControl(''),
            ocupacion: new FormControl(''),
            fecha: new FormControl(''),
            hora: new FormControl(''),


            aplica: new FormControl(''),
            gesAnterior: new FormControl(''),
            // referencia: new FormControl(''),
            // partoVaginal: new FormControl(''),
        })
    }
}
