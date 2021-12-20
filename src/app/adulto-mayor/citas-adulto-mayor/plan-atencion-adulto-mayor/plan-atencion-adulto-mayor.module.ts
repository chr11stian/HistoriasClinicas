import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanAtencionAdultoMayorRoutingModule} from './plan-atencion-adulto-mayor-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StepGeneralAdultoMayorComponent} from './components/step-general-adulto-mayor/step-general-adulto-mayor.component';
import {ProblemasAdultoMayorComponent} from './components/problemas-adulto-mayor/problemas-adulto-mayor.component';
import {PlanAtencionAdultoMayorComponent} from './components/plan-atencion-adulto-mayor/plan-atencion-adulto-mayor.component';
import {DatosGeneralesAdultoMayorComponent} from './components/datos-generales-adulto-mayor/datos-generales-adulto-mayor.component';
import {AntecedentesAdultoMayorComponent} from './components/antecedentes-adulto-mayor/antecedentes-adulto-mayor.component';
import {ValoracionAdultoMayorComponent} from './components/valoracion-adulto-mayor/valoracion-adulto-mayor.component';

@NgModule({
    declarations: [
        StepGeneralAdultoMayorComponent,
        ProblemasAdultoMayorComponent,
        PlanAtencionAdultoMayorComponent,
        DatosGeneralesAdultoMayorComponent,
        AntecedentesAdultoMayorComponent,
        ValoracionAdultoMayorComponent,
    ],
    imports: [
        CommonModule,
        PlanAtencionAdultoMayorRoutingModule,
        SharedModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class PlanAtencionAdultoMayorModule {
}