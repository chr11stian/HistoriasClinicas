import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-intervalo-dialogo',
  templateUrl: './intervalo-dialogo.component.html',
  styleUrls: ['./intervalo-dialogo.component.css']
})
export class IntervaloDialogoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.stateOptions = [{ label: 'Si', value: 'Si' }, { label: 'No', value: 'No' }];
    this.buildForm();
   }
  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      dondeParto: ['', [Validators.required]],
      posicionParto: ['', [Validators.required]],
      transporteParto: ['', [Validators.required]],
      selected: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
  }

}
