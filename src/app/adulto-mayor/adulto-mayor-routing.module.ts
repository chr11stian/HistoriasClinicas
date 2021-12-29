import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasAdultoMayorComponent } from './citas-adulto-mayor/citas-adulto-mayor.component';

const routes: Routes = [
  {
    path: "citas",
    component: CitasAdultoMayorComponent
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto-mayor/adulto-mayor.module').then(n => n.AdultoMayorModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/plan-atencion-adulto-mayor/plan-atencion-adulto-mayor.module').then(n => n.PlanAtencionAdultoMayorModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/consulta-adulto-mayor/consulta-adulto-mayor.module').then(n => n.ConsultaAdultoMayorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdultoMayorRoutingModule { }
