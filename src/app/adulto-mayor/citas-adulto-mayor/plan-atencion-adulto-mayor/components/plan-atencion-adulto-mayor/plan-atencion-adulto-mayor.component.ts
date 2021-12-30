import { Component, OnInit } from '@angular/core';
import {PlanEvaluacionAdulto} from "../models/plan-atencion-adulto-mayor.model";

@Component({
  selector: 'app-plan-atencion-adulto-mayor',
  templateUrl: './plan-atencion-adulto-mayor.component.html',
  styleUrls: ['./plan-atencion-adulto-mayor.component.css']
})
export class PlanAtencionAdultoMayorComponent implements OnInit {
    evaluacionGeneral: PlanEvaluacionAdulto[];              /****item 1*****/
    inmunizaciones: PlanEvaluacionAdulto[];                 /****item 2*****/
    evalucionBucal: PlanEvaluacionAdulto[];                 /****item 3*****/
    intervencionesPreventivas: PlanEvaluacionAdulto[];      /****item 4*****/
    administracionMicronutrientes: PlanEvaluacionAdulto[];  /****item 5*****/
    consejeriaIntegral: PlanEvaluacionAdulto[];             /****item 6*****/
    visitaDomiciliaria: PlanEvaluacionAdulto[];             /****item 7*****/
    temasEducativos: PlanEvaluacionAdulto[];                /****item 8*****/
    atencionPrioridades: PlanEvaluacionAdulto[];            /****item 9*****/


  constructor() { }

  ngOnInit(): void {
  }

  openDialogEditarPlan(rowData: any, rowIndex: any) {
    
  }
}
