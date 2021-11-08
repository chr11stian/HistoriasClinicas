import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-recien-nacido',
  templateUrl: './recien-nacido.component.html',
  styleUrls: ['./recien-nacido.component.css']
})
export class RecienNacidoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.stateOptions = [{label: 'Si', value: 'Si'}, {label: 'No', value: 'No'}];
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      selectedSexo: ['', [Validators.required]],
      selectedMedicacion: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

}
