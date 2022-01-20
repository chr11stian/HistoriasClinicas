import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralConsultaAdolescenteComponent} from "./components/step-general-consulta-adolescente/step-general-consulta-adolescente.component";

const routes: Routes = [
  {
    path: "consulta",
    component: StepGeneralConsultaAdolescenteComponent
  },
  {
    path: "consulta",
    loadChildren: () => import('src/app/adolescente/citas-adolescente/consulta-adolescente/consulta-adolescente.module').then(n => n.ConsultaAdolescenteModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaAdolescenteRoutingModule { }
