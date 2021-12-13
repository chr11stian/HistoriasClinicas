import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsultaPrincipalRoutingModule} from './consulta-principal-routing.module';
import {DatosGeneralesConsultaComponent} from './component/datos-generales-consulta/datos-generales-consulta.component';
import {MotivoConsultaComponent} from './component/motivo-consulta/motivo-consulta.component';
import {DiagnosticoConsultaComponent} from './component/diagnostico-consulta/diagnostico-consulta.component';
import {TratamientoConsultaComponent} from './component/tratamiento-consulta/tratamiento-consulta.component';
import {FinalizarConsultaComponent} from './component/finalizar-consulta/finalizar-consulta.component';

import {PrimeModule} from 'src/app/shared/prime/prime.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StepGeneralComponent} from './component/step-general/step-general.component';
import {RippleModule} from 'primeng/ripple'
import {SharedModule} from '../../../../shared/shared.module'
import {DividerModule} from 'primeng/divider';
import {PlanControlConsultaComponent} from './component/plan-control-consulta/plan-control-consulta.component';
import {EvaluacionesConsultaComponent} from './component/evaluaciones-consulta/evaluaciones-consulta.component';
import {PlanModule} from '../plan/plan.module';
import {EvaluacionGeneralModule} from "../plan/component/evaluacion-general/evaluacion-general.module";
import {PlanAtencionIntegralModule} from '../plan/component/plan-atencion-integral/plan-atencion-integral.module';
import { ModalNosologicoComponent } from './component/diagnostico-consulta/modal-nosologico/modal-nosologico.component';
import { ModalFactoresComponent } from './component/diagnostico-consulta/modal-factores/modal-factores.component';
import { ModalTratamientoComponent } from './component/tratamiento-consulta/modal-tratamiento/modal-tratamiento.component';
import { ModalAcuerdoComponent } from './component/tratamiento-consulta/modal-acuerdo/modal-acuerdo.component';
import { ModalExamenesReferenciaComponent } from './component/finalizar-consulta/modal-examenes-referencia/modal-examenes-referencia.component';
import { ModalReferenciaComponent } from './component/finalizar-consulta/modal-referencia/modal-referencia.component'
@NgModule({
    declarations: [
        DatosGeneralesConsultaComponent,
        MotivoConsultaComponent,
        DiagnosticoConsultaComponent,
        TratamientoConsultaComponent,
        FinalizarConsultaComponent,
        StepGeneralComponent,
        PlanControlConsultaComponent,
        EvaluacionesConsultaComponent,
        ModalNosologicoComponent,
        ModalFactoresComponent,
        ModalTratamientoComponent,
        ModalAcuerdoComponent,
        ModalExamenesReferenciaComponent,
        ModalReferenciaComponent
    ],
    imports: [
        EvaluacionGeneralModule,
        PlanModule,
        CommonModule,
        ConsultaPrincipalRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        DividerModule,
        PlanAtencionIntegralModule
    ]
})
export class ConsultaPrincipalModule {
}
