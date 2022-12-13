import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VisitaDomiciliariaRoutingModule } from "./visita-domiciliaria-routing.module";
import { VisitasDomiciliariasNiniosComponent } from "./pages/por-personal/visitas-domiciliarias-ninios/visitas-domiciliarias-ninios.component";
import { VisitasDomiciliariasGestantesComponent } from "./pages/por-personal/visitas-domiciliarias-gestantes/visitas-domiciliarias-gestantes.component";
import { PrimeModule } from "../shared/prime/prime.module";
import { DialogRespuestasComponent } from "./components/dialog-respuestas/dialog-respuestas.component";
import { MapVisitasComponent } from "./components/map-visitas/map-visitas.component";
import { VisitasDomiciliariasPuerperaComponent } from './pages/por-personal/visitas-domiciliarias-puerpera/visitas-domiciliarias-puerpera.component';
import { PorIpressComponent } from './pages/por-ipress/por-ipress.component';
import { MapVisitasIpressComponent } from './components/map-visitas-ipress/map-visitas-ipress.component';
import { EchartsVisitaComponent } from './components/echarts-visita/echarts-visita.component';
import { AnemiaGestantes } from "./pipes/anemia-gestantes.pipe";
import { AnemiaNinios } from "./pipes/anemia-ninios.pipe";
import { AnemiaPuerperas } from "./pipes/anemia-puerperas.pipe";
import { EchartNiniosComponent } from './components/echart-ninios/echart-ninios.component';
import { EchartGestantesComponent } from './components/echart-gestantes/echart-gestantes.component';
import { EchartPuerperasComponent } from './components/echart-puerperas/echart-puerperas.component';
@NgModule({
  declarations: [
    VisitasDomiciliariasNiniosComponent,
    VisitasDomiciliariasGestantesComponent,
    DialogRespuestasComponent,
    MapVisitasComponent,
    PorIpressComponent,
    VisitasDomiciliariasPuerperaComponent,
    MapVisitasIpressComponent,
    EchartsVisitaComponent,
    AnemiaGestantes,
    AnemiaNinios,
    AnemiaPuerperas,
    EchartNiniosComponent,
    EchartGestantesComponent,
    EchartPuerperasComponent,
  ],
  imports: [CommonModule, VisitaDomiciliariaRoutingModule, PrimeModule],
  exports: [VisitaDomiciliariaRoutingModule],
})
export class VisitaDomiciliariaModule {}
