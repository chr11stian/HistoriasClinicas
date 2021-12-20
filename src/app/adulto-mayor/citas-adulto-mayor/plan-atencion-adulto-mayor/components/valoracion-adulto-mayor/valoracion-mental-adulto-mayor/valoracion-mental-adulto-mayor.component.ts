import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valoracion-mental-adulto-mayor',
  templateUrl: './valoracion-mental-adulto-mayor.component.html',
  styleUrls: ['./valoracion-mental-adulto-mayor.component.css']
})
export class ValoracionMentalAdultoMayorComponent implements OnInit {
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  city: any;
  city2: any;
  constructor() { }

  ngOnInit(): void {
  }

}
