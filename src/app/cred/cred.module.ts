import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "src/app/shared/prime/prime.module";

import { CredRoutingModule } from './cred-routing.module';
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AntecendentesComponent } from './antecendentes/antecendentes.component';
import { PlanAtencionIntegralComponent } from './plan-atencion-integral/plan-atencion-integral.component';
import { EvaluacionGeneralComponent } from './evaluacion-general/evaluacion-general.component';
import { TestDesarrolloComponent } from './test-desarrollo/test-desarrollo.component';
import { EvaluacionAlimentacionComponent } from './evaluacion-general/evaluacion-alimentacion/evaluacion-alimentacion.component';
import { CabeceraEvaGnrlComponent } from './evaluacion-general/cabecera-eva-gnrl/cabecera-eva-gnrl.component';
import { EscalaEvaluacionEEDPComponent } from './evaluacion-general/escala-evaluacion-eedp/escala-evaluacion-eedp.component';
import { EEDPComponent } from './evaluacion-general/eedp/eedp.component';


@NgModule({
  declarations: [
    DatosGeneralesComponent,
    CabeceraComponent,
    AntecendentesComponent,
    PlanAtencionIntegralComponent,
    EvaluacionGeneralComponent,
    TestDesarrolloComponent,
    EvaluacionAlimentacionComponent,
    CabeceraEvaGnrlComponent,
    EscalaEvaluacionEEDPComponent,
    EEDPComponent
  ],
  imports: [
    PrimeModule,
    CommonModule,
    CredRoutingModule
  ]
})
export class CredModule { }
