import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { MotivoConsultaComponent } from './components/motivo-consulta/motivo-consulta.component';
import { DiagnosticoComponent } from './components/diagnostico/diagnostico.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';
import { AcuerdosComponent } from './components/acuerdos/acuerdos.component';
import { StepGeneralComponent } from './components/step-general/step-general.component';
import {PrimeModule} from "../../../shared/prime/prime.module";
import {SharedModule} from "primeng/api";
import { ProcedimientoComponent } from './components/procedimiento/procedimiento.component';



@NgModule({
  declarations: [
    DatosGeneralesComponent,
    MotivoConsultaComponent,
    DiagnosticoComponent,
    TratamientoComponent,
    AcuerdosComponent,
    StepGeneralComponent,
    ProcedimientoComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    PrimeModule,
    SharedModule,

  ]
})
export class ConsultaModule { }
