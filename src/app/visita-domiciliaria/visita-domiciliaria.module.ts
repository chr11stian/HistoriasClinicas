import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VisitaDomiciliariaRoutingModule } from "./visita-domiciliaria-routing.module";
import { VisitasDomiciliariasNiniosComponent } from "./pages/por-personal/visitas-domiciliarias-ninios/visitas-domiciliarias-ninios.component";
import { VisitasDomiciliariasGestantesComponent } from "./pages/por-personal/visitas-domiciliarias-gestantes/visitas-domiciliarias-gestantes.component";
import { PrimeModule } from "../shared/prime/prime.module";
import { DialogRespuestasComponent } from "./components/dialog-respuestas/dialog-respuestas.component";
import { MapVisitasComponent } from "./components/map-visitas/map-visitas.component";
import { VisitasNiniosIpressComponent } from "./pages/por-ipress/visitas-ninios-ipress/visitas-ninios-ipress.component";
import { VisitasGestantesIpressComponent } from "./pages/por-ipress/visitas-gestantes-ipress/visitas-gestantes-ipress.component";

@NgModule({
  declarations: [
    VisitasDomiciliariasNiniosComponent,
    VisitasDomiciliariasGestantesComponent,
    DialogRespuestasComponent,
    MapVisitasComponent,
    VisitasNiniosIpressComponent,
    VisitasGestantesIpressComponent,
  ],
  imports: [CommonModule, VisitaDomiciliariaRoutingModule, PrimeModule],
  exports: [VisitaDomiciliariaRoutingModule],
})
export class VisitaDomiciliariaModule {}
