import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from "src/app/shared/prime/prime.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GestanteRoutingModule } from './gestante-routing.module';
import { FiliacionAntecedentesComponent } from './component/filiacion-antecedentes/filiacion-antecedentes.component';
import { StepGeneralComponent } from './component/step-general/step-general.component';
import { DatosBasalesComponent } from './component/datos-basales/datos-basales.component';
import { AtencionesComponent } from './component/atenciones/atenciones.component';
import { PartosComponent } from './component/partos/partos.component';
import { RecienNacidoComponent } from './component/recien-nacido/recien-nacido.component';
import { PuerperioComponent } from './component/puerperio/puerperio.component';
import { DatosGeneralesObtetriciaComponent } from './component/datos-generales-obtetricia/datos-generales-obtetricia.component';


@NgModule({
  declarations: [
    FiliacionAntecedentesComponent,
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
    GestanteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GestanteModule { }
