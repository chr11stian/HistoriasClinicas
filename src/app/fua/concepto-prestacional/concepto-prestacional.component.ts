import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concepto-prestacional',
  templateUrl: './concepto-prestacional.component.html',
  styleUrls: ['./concepto-prestacional.component.css']
})
export class ConceptoPrestacionalComponent implements OnInit {
  twoOptions:any[];

  constructor() {
    this.twoOptions=[{code:"Si",name:"Si"},{
      code:"No",name:"No"
    }]
   }

  ngOnInit(): void {
  }

}
