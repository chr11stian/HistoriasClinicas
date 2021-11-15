import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-datos-generales-parto',
  templateUrl: './datos-generales-parto.component.html',
  styleUrls: ['./datos-generales-parto.component.css']
})
export class DatosGeneralesPartoComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }
  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.buildForm();
  }
}
