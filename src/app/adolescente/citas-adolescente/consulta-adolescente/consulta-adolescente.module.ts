import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaAdolescenteRoutingModule } from './consulta-adolescente-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DatosGeneralesConsultaAdolescenteComponent } from './components/datos-generales-consulta-adolescente/datos-generales-consulta-adolescente.component';
import { ExamenesConsultaAdolescenteComponent } from './components/examenes-consulta-adolescente/examenes-consulta-adolescente.component';
import { DiagnosticoConsultaAdolescenteComponent } from './components/diagnostico-consulta-adolescente/diagnostico-consulta-adolescente.component';
import { TratamientoConsultaAdolescenteComponent } from './components/tratamiento-consulta-adolescente/tratamiento-consulta-adolescente.component';
import { StepGeneralConsultaAdolescenteComponent } from './components/step-general-consulta-adolescente/step-general-consulta-adolescente.component';


@NgModule({
  declarations: [
    DatosGeneralesConsultaAdolescenteComponent,
    ExamenesConsultaAdolescenteComponent,
    DiagnosticoConsultaAdolescenteComponent,
    TratamientoConsultaAdolescenteComponent,
    StepGeneralConsultaAdolescenteComponent
  ],
  imports: [
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConsultaAdolescenteRoutingModule
  ]
})
export class ConsultaAdolescenteModule { }
