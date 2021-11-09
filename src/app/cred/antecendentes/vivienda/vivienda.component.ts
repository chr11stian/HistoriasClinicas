import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent implements OnInit {
  stateOptions: any[];
  constructor() {
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
   }

  ngOnInit(): void {
  }

}
