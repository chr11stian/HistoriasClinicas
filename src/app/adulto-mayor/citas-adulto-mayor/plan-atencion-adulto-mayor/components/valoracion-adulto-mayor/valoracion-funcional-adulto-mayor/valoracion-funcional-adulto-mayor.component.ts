import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valoracion-funcional-adulto-mayor',
  templateUrl: './valoracion-funcional-adulto-mayor.component.html',
  styleUrls: ['./valoracion-funcional-adulto-mayor.component.css']
})
export class ValoracionFuncionalAdultoMayorComponent implements OnInit {
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  city: any;

  constructor() { }

  ngOnInit(): void {
  }

}
