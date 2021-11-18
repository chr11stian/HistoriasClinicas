import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaPrincipalRoutingModule } from './consulta-principal-routing.module';
import { DatosGeneralesConsultaComponent } from './component/datos-generales-consulta/datos-generales-consulta.component';
import { MotivoConsultaComponent } from './component/motivo-consulta/motivo-consulta.component';
import { DiagnosticoConsultaComponent } from './component/diagnostico-consulta/diagnostico-consulta.component';
import { TratamientoConsultaComponent } from './component/tratamiento-consulta/tratamiento-consulta.component';
import { FinalizarConsultaComponent } from './component/finalizar-consulta/finalizar-consulta.component';

import { PrimeModule } from 'src/app/shared/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepGeneralComponent } from './component/step-general/step-general.component';
import {RippleModule} from 'primeng/ripple'
import {SharedModule} from '../../../../shared/shared.module'
import {DividerModule} from 'primeng/divider'

@NgModule({
  declarations: [
    DatosGeneralesConsultaComponent,
    MotivoConsultaComponent,
    DiagnosticoConsultaComponent,
    TratamientoConsultaComponent,
    FinalizarConsultaComponent,
    StepGeneralComponent
  ],
    imports: [
        CommonModule,
        ConsultaPrincipalRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        DividerModule,
    ]
})
export class ConsultaPrincipalModule { }
