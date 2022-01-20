import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanAtencionAdultoRoutingModule } from './plan-atencion-adulto-routing.module';
import { StepGeneralAdultoComponent } from './components/step-general-adulto/step-general-adulto.component';
import { ProblemasAdultoComponent } from './components/problemas-adulto/problemas-adulto.component';
import { DatosGeneralesAdultoComponent } from './components/datos-generales-adulto/datos-generales-adulto.component';
import { PlanAtencionAdultoComponent } from './components/plan-atencion-adulto/plan-atencion-adulto.component';
import { AntecedentesAdultoComponent } from './components/antecedentes-adulto/antecedentes-adulto.component';
import { CuidadoAdultoComponent } from './components/cuidado-adulto/cuidado-adulto.component';
import {SharedModule} from "../../../shared/shared.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StepGeneralAdultoComponent,
    ProblemasAdultoComponent,
    DatosGeneralesAdultoComponent,
    PlanAtencionAdultoComponent,
    AntecedentesAdultoComponent,
    CuidadoAdultoComponent
  ],
  imports: [
    CommonModule,
    PlanAtencionAdultoRoutingModule,
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PlanAtencionAdultoModule { }
