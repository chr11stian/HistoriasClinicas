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
<<<<<<< HEAD
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component';
import { LaboratorioComponent } from './components/evaluaciones/laboratorio/laboratorio.component';
import { DialogReqLaboratorioComponent } from './components/evaluaciones/laboratorio/dialog-req-laboratorio/dialog-req-laboratorio.component';
import { ProcedImagenesComponent } from './components/evaluaciones/proced-imagenes/proced-imagenes.component';
=======
import { ProcedimientoComponent } from './components/procedimiento/procedimiento.component';
>>>>>>> bf5384f007a6c3a2ce6c1e2b51c15c95a2ac1aa5



@NgModule({
  declarations: [
    DatosGeneralesComponent,
    MotivoConsultaComponent,
    DiagnosticoComponent,
    TratamientoComponent,
    AcuerdosComponent,
    StepGeneralComponent,
<<<<<<< HEAD
    EvaluacionesComponent,
    LaboratorioComponent,
    DialogReqLaboratorioComponent,
    ProcedImagenesComponent,
=======
    ProcedimientoComponent
>>>>>>> bf5384f007a6c3a2ce6c1e2b51c15c95a2ac1aa5
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    PrimeModule,
    SharedModule,

  ]
})
export class ConsultaModule { }
