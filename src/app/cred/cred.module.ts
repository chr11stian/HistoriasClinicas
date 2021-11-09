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
import {SharedModule} from '../shared/shared.module'


@NgModule({
  declarations: [
    DatosGeneralesComponent,
    CabeceraComponent,
    AntecendentesComponent,
    PlanAtencionIntegralComponent,
    EvaluacionGeneralComponent,
    TestDesarrolloComponent
  ],
    imports: [
        PrimeModule,
        CommonModule,
        CredRoutingModule,
        SharedModule,
    ]
})
export class CredModule { }
