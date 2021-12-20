import { Component, OnInit } from '@angular/core';
import {PlanEvaluacionAdulto} from "../models/PlanEvaluacionAdulto";

@Component({
  selector: 'app-plan-atencion-adulto-mayor',
  templateUrl: './plan-atencion-adulto-mayor.component.html',
  styleUrls: ['./plan-atencion-adulto-mayor.component.css']
})
export class PlanAtencionAdultoMayorComponent implements OnInit {
    planAtencion: PlanEvaluacionAdulto[];
  constructor() { }

  ngOnInit(): void {
  }

  openDialogEditarPlan(rowData: any, rowIndex: any) {
    
  }
}
