import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabeceraComponent } from './component/cabecera/cabecera.component';

const routes: Routes = [
  {
    path: "plan-atencion-integral",
    component: CabeceraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
