import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-plan-control-consulta',
  templateUrl: './plan-control-consulta.component.html',
  styleUrls: ['./plan-control-consulta.component.css'],
  providers: [DialogService]
})
export class PlanControlConsultaComponent implements OnInit {
  stateOptions: any[]
  date3: Date
  constructor() {
    this.stateOptions = [{label: 'SI', value: true},
      {label: 'NO', value: false}]

  }

  ngOnInit(): void {
  }

}

