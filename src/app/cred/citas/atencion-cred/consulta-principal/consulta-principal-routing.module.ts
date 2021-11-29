import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionesConsultaComponent } from './component/evaluaciones-consulta/evaluaciones-consulta.component';
import { PlanControlConsultaComponent } from './component/plan-control-consulta/plan-control-consulta.component';
import { StepGeneralComponent } from './component/step-general/step-general.component';

const routes: Routes = [
  {
    path: "consulta-principal",
    component: StepGeneralComponent
  },
  {
    path: "plan-control-consulta",
    component: PlanControlConsultaComponent
  },
  {
    path: "evaluaciones-consulta",
    component: EvaluacionesConsultaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaPrincipalRoutingModule { }
