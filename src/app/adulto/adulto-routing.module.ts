import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CitasAdultoComponent} from "./citas-adulto/citas-adulto.component";

const routes: Routes = [
  {
    path: "citas",
    component: CitasAdultoComponent
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto/adulto.module').then(n => n.AdultoModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto/citas-adulto/plan-atencion-adulto/plan-atencion-adulto.module').then(n => n.PlanAtencionAdultoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdultoRoutingModule { }
