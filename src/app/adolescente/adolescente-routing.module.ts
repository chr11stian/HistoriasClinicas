import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasAdolescenteComponent } from './citas-adolescente/citas-adolescente.component';

const routes: Routes = [
  {
    path: "citas",
    component: CitasAdolescenteComponent
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adolescente/adolescente.module').then(n => n.AdolescenteModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adolescente/citas-adolescente/plan-atencion-adolescente/plan-atencion-adolescente.module').then(n => n.PlanAtencionAdolescenteModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adolescente/citas-adolescente/consulta-adolescente/consulta-adolescente.module').then(n => n.ConsultaAdolescenteModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdolescenteRoutingModule { }
