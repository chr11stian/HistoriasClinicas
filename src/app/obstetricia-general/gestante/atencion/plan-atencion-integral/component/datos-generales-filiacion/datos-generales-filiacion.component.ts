import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";

@Component({
    selector: 'app-datos-generales-filiacion',
    templateUrl: './datos-generales-filiacion.component.html',
    styleUrls: ['./datos-generales-filiacion.component.css']
})
export class DatosGeneralesFiliacionComponent implements OnInit {
    departamentos: any;
    options: any;
    estadoCivil: any;
    familiares: any
    studies: any;

    formDatos_Generales: FormGroup;

    constructor(private formDatosGenerales: FormBuilder) {
        this.options = [
            {name: 'SI', code: 'S'},
            {name: 'NO', code: 'N'},
        ];

        this.studies = [
            {name: 'Analfabeta'},
            {name: 'Primaria'},
            {name: 'Secundaria'},
            {name: 'Superior'},
            {name: 'Superior No Univ.'},
        ];

        this.estadoCivil = [
            {name: 'Soltero', code: 'S'},
            {name: 'Casado', code: 'N'},
            {name: 'Combiviente', code: 'N'},
        ];

        this.departamentos = [
            {name: 'Cusco'},
            {name: 'Lima'},
            {name: 'Arequipa'},
            {name: 'Puno'},
            {name: 'Madre de Dios'},
            {name: 'Loreto'},
            {name: 'Cajamarca'},
            {name: 'Ayacucho'},
        ];
    }


    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formDatos_Generales = this.formDatosGenerales.group({
            // apPaterno: new FormControl(''),
            // ApMaterno: new FormControl(''),
            // nombres: new FormControl(''),
            aplica: new FormControl(''),
            referencia: new FormControl(''),
        })
    }

}
