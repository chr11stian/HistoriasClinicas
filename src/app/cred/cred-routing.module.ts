import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InmunizacionesComponent} from './plan-atencion-integral/inmunizaciones/inmunizaciones.component'

const routes: Routes = [
  {
    path: "cabecera",
    component: CabeceraComponent
  },
  {
    path: 'plan-atencion-integral/inmunizaciones',
    component: InmunizacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredRoutingModule { }
