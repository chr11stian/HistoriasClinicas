import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import {TratamientoConsultaService} from "../../services/tratamiento-consulta.service";

@Component({
    selector: 'app-tratamiento-consulta',
    templateUrl: './tratamiento-consulta.component.html',
    styleUrls: ['./tratamiento-consulta.component.css']
})
export class TratamientoConsultaComponent implements OnInit {
    ngOnInit() {
    }
    constructor() {
    }

}