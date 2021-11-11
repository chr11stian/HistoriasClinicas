import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-atencion-integral',
  templateUrl: './plan-atencion-integral.component.html',
  styleUrls: ['./plan-atencion-integral.component.css']
})
export class PlanAtencionIntegralComponent implements OnInit {
  stateOptions: any[];
  date3: Date;

  constructor() {
    this.stateOptions = [{label: 'SI', value: true},
                          {label: 'NO', value: false}];
    
   }

  ngOnInit(): void {
  }

}
