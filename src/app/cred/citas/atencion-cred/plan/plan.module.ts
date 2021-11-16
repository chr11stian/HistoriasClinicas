import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PrimeModule } from 'src/app/shared/prime/prime.module';
import { CabeceraComponent } from './component/cabecera/cabecera.component';
import { DatosGeneralesComponent } from './component/datos-generales/datos-generales.component';
import { AntecendentesComponent } from './component/antecendentes/antecendentes.component';
import { PlanAtencionIntegralComponent } from './component/plan-atencion-integral/plan-atencion-integral.component';
import { TestDesarrolloComponent } from './component/test-desarrollo/test-desarrollo.component';
import { PersonalComponent } from './component/antecendentes/personal/personal.component';
import { FamiliarComponent } from './component/antecendentes/familiar/familiar.component';
import { ViviendaComponent } from './component/antecendentes/vivienda/vivienda.component';
import { EvaluacionGeneralModule } from './component/evaluacion-general/evaluacion-general.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatosGeneralesComponent,
    CabeceraComponent,
    AntecendentesComponent,
    PlanAtencionIntegralComponent,
    TestDesarrolloComponent,
    PersonalComponent,
    FamiliarComponent,
    ViviendaComponent,
  ],
  imports: [
    CommonModule,
    EvaluacionGeneralModule,
    PlanRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PlanModule { }
