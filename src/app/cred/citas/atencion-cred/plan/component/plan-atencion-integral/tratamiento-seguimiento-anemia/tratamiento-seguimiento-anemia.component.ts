import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tratamiento-seguimiento-anemia',
  templateUrl: './tratamiento-seguimiento-anemia.component.html',
  styleUrls: ['./tratamiento-seguimiento-anemia.component.css']
})
export class TratamientoSeguimientoAnemiaComponent implements OnInit {
  stateOptions: any[];
  expandir: boolean=true; 

  constructor() {
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
   }

  ngOnInit(): void {
  }

}
