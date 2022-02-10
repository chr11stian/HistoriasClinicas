import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-transferir-cupos',
    templateUrl: './transferir-cupos.component.html',
    styleUrls: ['./transferir-cupos.component.css']
})
export class TransferirCuposComponent implements OnInit {
    formTransferirCupos: FormGroup;

    constructor(private fb: FormBuilder,) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formTransferirCupos = this.fb.group({
            nroDoc: new FormControl(''),
            apellidos: new FormControl(''),
            nombres: new FormControl(''),
            servicio: new FormControl(''),
            nroDoc2: new FormControl(''),
            apellidos2: new FormControl(''),
            nombres2: new FormControl(''),
            servicio2: new FormControl(''),
        })
    }
}
