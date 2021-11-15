import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-datos-generales-parto',
  templateUrl: './datos-generales-parto.component.html',
  styleUrls: ['./datos-generales-parto.component.css']
})
export class DatosGeneralesPartoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];
  constructor(
    private formBuilder: FormBuilder
  ) { }
  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      pesoRN: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
  }


}
