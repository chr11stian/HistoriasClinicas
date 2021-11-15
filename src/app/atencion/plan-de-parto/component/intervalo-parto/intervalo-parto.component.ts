import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-intervalo-parto',
  templateUrl: './intervalo-parto.component.html',
  styleUrls: ['./intervalo-parto.component.css']
})
export class IntervaloPartoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];
  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      dondeParto: ['', [Validators.required]],
      selected: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

}
