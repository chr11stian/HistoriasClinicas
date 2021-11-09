import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.css']
})
export class FamiliarComponent implements OnInit {
  familiares: any[];
  stateOptions: any[];

  constructor() {
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
    this.familiares = [
                            {name: 'Padre', code: 'P'},
                            {name: 'Madre', code: 'M'},
                            {name: 'Hermano', code: 'H'},
                            {name: 'Abuelo', code: 'A'},
                            {name: 'Otro', code: 'O'}
                        ];
   }

  ngOnInit(): void {
  }

}
