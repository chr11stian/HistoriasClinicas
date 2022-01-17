import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralAdultoMayorComponent} from "./components/step-general-adulto-mayor/step-general-adulto-mayor.component";

const routes: Routes = [
  {
    path: "plan",
    component: StepGeneralAdultoMayorComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAtencionAdultoMayorRoutingModule { }
