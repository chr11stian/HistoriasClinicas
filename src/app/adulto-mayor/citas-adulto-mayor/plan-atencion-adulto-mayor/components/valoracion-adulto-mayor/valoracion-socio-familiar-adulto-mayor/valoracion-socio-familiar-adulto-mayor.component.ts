import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valoracion-socio-familiar-adulto-mayor',
  templateUrl: './valoracion-socio-familiar-adulto-mayor.component.html',
  styleUrls: ['./valoracion-socio-familiar-adulto-mayor.component.css']
})
export class ValoracionSocioFamiliarAdultoMayorComponent implements OnInit {
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  city: any;
  city2: any;
  city3:any;
  city4:any;
  city5: any;
  city6: any;
  constructor() { }

  ngOnInit(): void {
  }

}
