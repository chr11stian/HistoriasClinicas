import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralAdultoComponent} from "./components/step-general-adulto/step-general-adulto.component";

const routes: Routes = [
  {
    path: "plan",
    component: StepGeneralAdultoComponent
  },
  {
    path: "plan",
    loadChildren: () => import('src/app/adulto/citas-adulto/plan-atencion-adulto/plan-atencion-adulto.module').then(n => n.PlanAtencionAdultoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAtencionAdultoRoutingModule { }
