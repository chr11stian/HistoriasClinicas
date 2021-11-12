import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-datos-generales',
    templateUrl: './datos-generales.component.html',
    styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
    formDatos_Generales: FormGroup;

    constructor(private form: FormBuilder,) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formDatos_Generales = this.form.group({
            // apPaterno: new FormControl(''),
            // ApMaterno: new FormControl(''),
            // nombres: new FormControl(''),
            aplica: new FormControl(''),
            // referencia: new FormControl(''),
            // partoVaginal: new FormControl(''),
        })
    }
}
