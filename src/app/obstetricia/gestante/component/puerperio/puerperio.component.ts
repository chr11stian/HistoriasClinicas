import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-puerperio',
    templateUrl: './puerperio.component.html',
    styleUrls: ['./puerperio.component.css']
})
export class PuerperioComponent implements OnInit {

    formPurperio: FormGroup

    constructor(private form: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formPurperio = this.form.group({
            // apPaterno: new FormControl(''),
            // // ApMaterno: new FormControl(''),
            // // nombres: new FormControl(''),
            // aplica: new FormControl(''),
            // referencia: new FormControl(''),
        })
    }
}
