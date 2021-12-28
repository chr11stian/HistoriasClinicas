import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from "../../../shared/shared.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoriasAdultoMayorComponent } from './components/categorias-adulto-mayor/categorias-adulto-mayor.component';
import { DiagnosticoAdultoMayorComponent } from './components/diagnostico-adulto-mayor/diagnostico-adulto-mayor.component';
import { EnfermedadActualAdultoMayorComponent } from './components/enfermedad-actual-adulto-mayor/enfermedad-actual-adulto-mayor.component';
import { StepGeneralConsultaAdultoMayorComponent } from './components/step-general-consulta-adulto-mayor/step-general-consulta-adulto-mayor.component';
import {ConsultaAdultoMayorRoutingModule} from "./consulta-adulto-mayor-routing.module";


@NgModule({
  declarations: [
    CategoriasAdultoMayorComponent,
    DiagnosticoAdultoMayorComponent,
    EnfermedadActualAdultoMayorComponent,
    StepGeneralConsultaAdultoMayorComponent
  ],
  imports: [
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConsultaAdultoMayorRoutingModule
  ]
})
export class ConsultaAdultoMayorModule { }
