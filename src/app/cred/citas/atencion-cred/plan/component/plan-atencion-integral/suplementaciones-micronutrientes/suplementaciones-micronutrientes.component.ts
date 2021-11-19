import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suplementaciones-micronutrientes',
  templateUrl: './suplementaciones-micronutrientes.component.html',
  styleUrls: ['./suplementaciones-micronutrientes.component.css']
})
export class SuplementacionesMicronutrientesComponent implements OnInit {
  stateOptions: any[];  
  expandir: boolean=true; 

  constructor() {
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
   }

  ngOnInit(): void {
  }

}
