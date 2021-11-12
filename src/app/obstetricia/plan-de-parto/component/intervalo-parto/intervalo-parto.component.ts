import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-intervalo-parto',
  templateUrl: './intervalo-parto.component.html',
  styleUrls: ['./intervalo-parto.component.css']
})
export class IntervaloPartoComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      dondeParto: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

}
