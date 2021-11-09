import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inmunizaciones',
  templateUrl: './inmunizaciones.component.html',
  styleUrls: ['./inmunizaciones.component.css']
})
export class InmunizacionesComponent implements OnInit {

  constructor() { }
  checked: boolean = true;

  ngOnInit(): void {
  }

}
