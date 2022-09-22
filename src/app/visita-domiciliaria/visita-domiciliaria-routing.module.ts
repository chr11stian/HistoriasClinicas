import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VisitasDomiciliariasNiniosComponent } from "./pages/por-personal/visitas-domiciliarias-ninios/visitas-domiciliarias-ninios.component";
import { VisitasDomiciliariasGestantesComponent } from "./pages/por-personal/visitas-domiciliarias-gestantes/visitas-domiciliarias-gestantes.component";

const routes: Routes = [
  {
    path: "profesional-ninios",
    component: VisitasDomiciliariasNiniosComponent,
  },
  {
    path: "profesional-gestantes",
    component: VisitasDomiciliariasGestantesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaDomiciliariaRoutingModule {}
