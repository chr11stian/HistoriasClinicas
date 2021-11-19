import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inmunizaciones',
  templateUrl: './inmunizaciones.component.html',
  styleUrls: ['./inmunizaciones.component.css']
})
export class InmunizacionesComponent implements OnInit {
  stateOptions: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
