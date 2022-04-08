import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralComponent} from "./components/step-general/step-general.component";

const routes: Routes = [
  {
    path: "",
    component: StepGeneralComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
