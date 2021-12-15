import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralAdultoMayorComponent} from "./components/step-general-adulto-mayor/step-general-adulto-mayor.component";

const routes: Routes = [
  {
    path: "plan",
    component: StepGeneralAdultoMayorComponent
  },
  {
    path: "plan",
    loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/plan-atencion-adulto-mayor/plan-atencion-adulto-mayor.module').then(n => n.PlanAtencionAdultoMayorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAtencionAdultoMayorRoutingModule { }
