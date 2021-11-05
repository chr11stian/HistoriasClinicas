import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-basales',
  templateUrl: './datos-basales.component.html',
  styleUrls: ['./datos-basales.component.css']
})
export class DatosBasalesComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicalizarForm();
  }

  inicalizarForm(){
    this.form = this.fb.group({
      imc:'',
      pesoHabitual:'',
      talla:'',
      check:'',
      nroDosisPrevias:'',
      a:''
    })
  }

}
