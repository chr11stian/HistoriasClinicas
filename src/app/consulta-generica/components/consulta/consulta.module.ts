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
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component';
import { LaboratorioComponent } from './components/evaluaciones/laboratorio/laboratorio.component';
import { DialogReqLaboratorioComponent } from './components/evaluaciones/laboratorio/dialog-req-laboratorio/dialog-req-laboratorio.component';
import { ProcedImagenesComponent } from './components/evaluaciones/proced-imagenes/proced-imagenes.component';
import { ProcedimientoComponent } from './components/procedimiento/procedimiento.component';
import { TratamientoInmunizacionComponent } from './components/tratamiento/tratamiento-inmunizacion/tratamiento-inmunizacion.component';
import { TratamientoSuplementacionComponent } from './components/tratamiento/tratamiento-suplementacion/tratamiento-suplementacion.component';
import { TratamientoGeneralComponent } from './components/tratamiento/tratamiento-general/tratamiento-general.component';
import { TratamientoInmunizacionModalComponent } from './components/tratamiento/tratamiento-inmunizacion-modal/tratamiento-inmunizacion-modal.component';
import { TratamientoSuplementacionModalComponent } from './components/tratamiento/tratamiento-suplementacion-modal/tratamiento-suplementacion-modal.component';



@NgModule({
  declarations: [
    DatosGeneralesComponent,
    MotivoConsultaComponent,
    DiagnosticoComponent,
    TratamientoComponent,
    AcuerdosComponent,
    StepGeneralComponent,
    EvaluacionesComponent,
    LaboratorioComponent,
    DialogReqLaboratorioComponent,
    ProcedImagenesComponent,
    ProcedimientoComponent,
    TratamientoInmunizacionComponent,
    TratamientoSuplementacionComponent,
    TratamientoGeneralComponent,
    TratamientoInmunizacionModalComponent,
    TratamientoSuplementacionModalComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    PrimeModule,
    SharedModule,

  ]
})
export class ConsultaModule { }
