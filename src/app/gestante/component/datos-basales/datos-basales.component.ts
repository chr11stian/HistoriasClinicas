import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-basales',
  templateUrl: './datos-basales.component.html',
  styleUrls: ['./datos-basales.component.css']
})
export class DatosBasalesComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicalizarForm();
  }

  ngOnInit(): void {
    
  }

  inicalizarForm() {
    this.form = this.fb.group({
      imc: new FormControl(''),
      pesoHabitual: new FormControl(''),
      talla: new FormControl(''),
      check: new FormControl(''),
      nroDosisPrevias: new FormControl(''),
      a: new FormControl('')
    })
  }

}
