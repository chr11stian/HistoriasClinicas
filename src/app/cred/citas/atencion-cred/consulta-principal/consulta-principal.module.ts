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

import { TestPeruanoComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/test-peruano/test-peruano.component';
import { EedpComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/eedp/eedp.component';
import { TepsiComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/tepsi/tepsi.component';
import { EvaluacionAlimentacionComponent } from './component/evaluaciones-consulta/components/evaluacion-alimentacion/evaluacion-alimentacion.component';
import {ToggleButtonModule} from "primeng/togglebutton";

import { PautaBreveComponent } from './component/evaluaciones-consulta/components/desarrollo-psicomotor/components/pauta-breve/pauta-breve.component';
import {TimelineModule} from "primeng/timeline";
import { SuplementacionCredComponent } from './component/tratamiento-consulta/components/suplementacion-cred/suplementacion-cred.component';
import { TratamientoCredComponent } from './component/tratamiento-consulta/components/tratamiento-cred/tratamiento-cred.component';
import { SuplementoComponent } from './component/tratamiento-consulta/components/suplemento/suplemento.component';
import { DialogAddExamenesAuxiliaresComponent } from './component/examenes-auxiliares-consulta/dialog-add-examenes-auxiliares/dialog-add-examenes-auxiliares.component';
import { DosajeComponent } from './component/evaluaciones-consulta/components/dosaje/dosaje.component';
//mover al share
import {ListboxModule} from "primeng/listbox";
import {MultiSelectModule} from "primeng/multiselect";
import { ProcedimientoDosajeHemoglobinaComponent } from './component/evaluaciones-consulta/components/procedimiento-dosaje-hemoglobina/procedimiento-dosaje-hemoglobina.component';
import { TratamientoInmunizacionComponent } from './component/tratamiento-consulta/components/tratamiento-inmunizacion/tratamiento-inmunizacion.component';
import { TratamientoInmunizacionModalComponent } from './component/tratamiento-consulta/components/tratamiento-inmunizacion-modal/tratamiento-inmunizacion-modal.component';
import { ProcedimientosConsultaComponent } from './component/procedimientos-consulta/procedimientos-consulta.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalReferenciaComponent } from './component/finalizar-consulta/modal-referencia/modal-referencia.component';
import { CalendarComponent } from './component/finalizar-consulta/calendar/calendar.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
])

@NgModule({
    declarations: [
        ModalReferenciaComponent,
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

        TestPeruanoComponent,
        EedpComponent,
        TepsiComponent,
        EvaluacionAlimentacionComponent,

        PautaBreveComponent,
        SuplementacionCredComponent,
        TratamientoCredComponent,
        SuplementoComponent,
        CalendarComponent,
        DialogAddExamenesAuxiliaresComponent,
        DosajeComponent,
        ProcedimientoDosajeHemoglobinaComponent,
        TratamientoInmunizacionComponent,
        TratamientoInmunizacionModalComponent,
        ProcedimientosConsultaComponent,

    ],
    imports: [
        FullCalendarModule,
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
        TimelineModule,
        ListboxModule,
        MultiSelectModule
    ]
})
export class ConsultaPrincipalModule {
}