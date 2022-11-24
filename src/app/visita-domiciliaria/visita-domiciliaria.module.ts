import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VisitaDomiciliariaRoutingModule } from "./visita-domiciliaria-routing.module";
import { VisitasDomiciliariasNiniosComponent } from "./pages/por-personal/visitas-domiciliarias-ninios/visitas-domiciliarias-ninios.component";
import { VisitasDomiciliariasGestantesComponent } from "./pages/por-personal/visitas-domiciliarias-gestantes/visitas-domiciliarias-gestantes.component";
import { BuscarVisitasComponent } from "./components/buscar-visitas/buscar-visitas.component";
import { PrimeModule } from "../shared/prime/prime.module";
import { DialogRespuestasComponent } from "./components/dialog-respuestas/dialog-respuestas.component";
import { MapVisitasComponent } from "./components/map-visitas/map-visitas.component";
import { EsFecha } from "./pipes/respuestas.pipe";
import { VisitasDomiciliariasPuerperaComponent } from './pages/por-personal/visitas-domiciliarias-puerpera/visitas-domiciliarias-puerpera.component';
import { PorIpressComponent } from './pages/por-ipress/por-ipress.component';
import { MapVisitasIpressComponent } from './components/map-visitas-ipress/map-visitas-ipress.component';
import { EchartsVisitaComponent } from './components/echarts-visita/echarts-visita.component';
import { AnemiaGestantes } from "./pipes/anemia-gestantes.pipe";
import { AnemiaNinios } from "./pipes/anemia-ninios.pipe";
import { AnemiaPuerperas } from "./pipes/anemia-puerperas.pipe";
@NgModule({
  declarations: [
    VisitasDomiciliariasNiniosComponent,
    VisitasDomiciliariasGestantesComponent,
    BuscarVisitasComponent,
    DialogRespuestasComponent,
    MapVisitasComponent,
    EsFecha,
    PorIpressComponent,
    VisitasDomiciliariasPuerperaComponent,
    MapVisitasIpressComponent,
    EchartsVisitaComponent,
    AnemiaGestantes,
    AnemiaNinios,
    AnemiaPuerperas,
  ],
  imports: [CommonModule, VisitaDomiciliariaRoutingModule, PrimeModule],
  exports: [VisitaDomiciliariaRoutingModule],
})
export class VisitaDomiciliariaModule {}
