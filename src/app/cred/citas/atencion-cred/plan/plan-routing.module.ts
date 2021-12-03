import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabeceraComponent } from './component/cabecera/cabecera.component';
import { InmunizacionesComponent} from './component/plan-atencion-integral/inmunizaciones/inmunizaciones.component'
import { SesionesAtencionTempranaComponent } from './component/plan-atencion-integral/sesiones-atencion-temprana/sesiones-atencion-temprana.component';

const routes: Routes = [
  {
    path: "plan-atencion-integral",
    component: CabeceraComponent
  },
  {
    path: "plan-atencion-integral/inmunizaciones",
    component: InmunizacionesComponent
  },
  {
    path: "plan-atencion-integral/sesiones-atencion-temprana",
    component: SesionesAtencionTempranaComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
