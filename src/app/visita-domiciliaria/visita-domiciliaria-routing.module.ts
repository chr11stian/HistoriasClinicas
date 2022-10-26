import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VisitasDomiciliariasNiniosComponent } from "./pages/por-personal/visitas-domiciliarias-ninios/visitas-domiciliarias-ninios.component";
import { VisitasDomiciliariasGestantesComponent } from "./pages/por-personal/visitas-domiciliarias-gestantes/visitas-domiciliarias-gestantes.component";
import { PorIpressComponent } from './pages/por-ipress/por-ipress.component';
import { VisitasDomiciliariasPuerperaComponent } from './pages/por-personal/visitas-domiciliarias-puerpera/visitas-domiciliarias-puerpera.component';

const routes: Routes = [
  {
    path: "profesional-ninios",
    component: VisitasDomiciliariasNiniosComponent,
  },
  {
    path: "profesional-gestantes",
    component: VisitasDomiciliariasGestantesComponent,
  },
  {
    path: "profesional-puerperas",
    component: VisitasDomiciliariasPuerperaComponent,
  },
  {
    path:"ipress-ninios",
    component:PorIpressComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaDomiciliariaRoutingModule {}
