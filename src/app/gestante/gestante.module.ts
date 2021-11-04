import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from "src/app/shared/prime/prime.module";

import { GestanteRoutingModule } from './gestante-routing.module';
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { StepGeneralComponent } from './step-general/step-general.component';
import { DatosBasalesComponent } from './datos-basales/datos-basales.component';
import { AtencionesComponent } from './atenciones/atenciones.component';
import { PartosComponent } from './partos/partos.component';
import { RecienNacidoComponent } from './recien-nacido/recien-nacido.component';
import { PuerperioComponent } from './puerperio/puerperio.component';
import { DatosGeneralesObtetriciaComponent } from './datos-generales-obtetricia/datos-generales-obtetricia.component';


@NgModule({
  declarations: [
    DatosGeneralesComponent,
    StepGeneralComponent,
    DatosBasalesComponent,
    AtencionesComponent,
    PartosComponent,
    RecienNacidoComponent,
    PuerperioComponent,
    DatosGeneralesObtetriciaComponent
  ],
  imports: [
    PrimeModule,
    CommonModule,
    GestanteRoutingModule
  ]
})
export class GestanteModule { }
