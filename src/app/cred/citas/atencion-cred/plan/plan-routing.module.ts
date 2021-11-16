import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabeceraComponent } from './component/cabecera/cabecera.component';
import { DatosGeneralesComponent } from './component/datos-generales/datos-generales.component';

const routes: Routes = [
  {
    path: "datos",
    component: DatosGeneralesComponent
  },
  {
    path: "cabecera",
    component: CabeceraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
