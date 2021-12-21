import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-valoracion-funcional-adulto-mayor',
  templateUrl: './valoracion-funcional-adulto-mayor.component.html',
  styleUrls: ['./valoracion-funcional-adulto-mayor.component.css']
})
export class ValoracionFuncionalAdultoMayorComponent implements OnInit {
  idRecuperado = "61b23fa6308deb1ddd0b3704";
  formValoracionClinica:FormGroup;
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  city: any;

  constructor() { }

  ngOnInit(): void {
  }
  recuperarValoracionFuncional(){

  }
}
