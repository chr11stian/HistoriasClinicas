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
import { RippleModule } from 'primeng/ripple'
import { SharedModule } from '../../../../shared/shared.module'
import { DividerModule } from 'primeng/divider';
import { PlanControlConsultaComponent } from './component/plan-control-consulta/plan-control-consulta.component';
import { PlanModule } from '../plan/plan.module';
import { EvaluacionGeneralModule } from "../plan/component/evaluacion-general/evaluacion-general.module";
import { PlanAtencionIntegralModule } from '../plan/component/plan-atencion-integral/plan-atencion-integral.module';
import { EvaluacionesConsultaComponent } from './component/evaluaciones-consulta/evaluaciones-consulta.component';
import { ExamenesAuxiliaresConsultaComponent } from './component/examenes-auxiliares-consulta/examenes-auxiliares-consulta.component';
import { CrecimientoEstadoNutricionalComponent } from './component/evaluaciones-consulta/components/crecimiento-estado-nutricional/crecimiento-estado-nutricional.component';
import { DesarrolloPsicomotorComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/desarrollo-psicomotor.component';
import { TamizajesComponent } from './component/evaluaciones-consulta/components/tamizajes/tamizajes.component';
import { InmunizacionesCredComponent } from './component/evaluaciones-consulta/components/inmunizaciones-cred/inmunizaciones-cred.component';
import { TestPeruanoComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/test-peruano/test-peruano.component';
import { EedpComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/eedp/eedp.component';
import { TepsiComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/tepsi/tepsi.component';
import { EvaluacionAlimentacionComponent } from './component/evaluaciones-consulta/components/evaluacion-alimentacion/evaluacion-alimentacion.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import { VacunaComponent } from './component/evaluaciones-consulta/components/vacuna/vacuna.component';
<<<<<<< HEAD
import { PautaBreveComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/pauta-breve/pauta-breve.component';
=======
import {TimelineModule} from "primeng/timeline";
>>>>>>> cb868cbc7ee030cd5c70e268db3d0bf1ef827262
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
        ExamenesAuxiliaresConsultaComponent,
        CrecimientoEstadoNutricionalComponent,
        DesarrolloPsicomotorComponent,
        TamizajesComponent,
        InmunizacionesCredComponent,
        TestPeruanoComponent,
        EedpComponent,
        TepsiComponent,
        EvaluacionAlimentacionComponent,
        VacunaComponent,
        PautaBreveComponent,
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
        PlanAtencionIntegralModule,
        ToggleButtonModule,
        TimelineModule
    ]
})
export class ConsultaPrincipalModule {
}
