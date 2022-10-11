import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosGeneralesComponent } from "./component/datos-generales/datos-generales.component";
import { StepGeneral_consultaComponent } from "./component/step-general-consulta/step-general-consulta.component";
import { InterrogatorioComponent } from "./component/interrogatorio/interrogatorio.component";
import { GiagnosticosComponent } from "./component/giagnosticos/giagnosticos.component";
import { TratamientoComponent } from "./component/tratamiento/tratamiento.component";
import { ResultadosComponent } from "./component/resultados/resultados.component";
import { PrimeModule } from "../../../../shared/prime/prime.module";
import { ConsultaObstetricoRoutingModule } from "./consulta-obstetrico-routing.module";

import { PaginatorModule } from "primeng/paginator";
import { ModalTratamientoComponent } from "./component/tratamiento/modal-tratamiento/modal-tratamiento.component";
import { ModalInmunizacionesComponent } from "./component/tratamiento/modal-inmunizaciones/modal-inmunizaciones.component";
import { ModalInterconsultaComponent } from './component/resultados/modal-interconsulta/modal-interconsulta.component';
import { ModalRecomendacionesComponent } from './component/tratamiento/modal-recomendaciones/modal-recomendaciones.component';
import { ModalExamenesAuxiliaresComponent } from './component/tratamiento/modal-examenes-auxiliares/modal-examenes-auxiliares.component';
import {TamizajeViolenciaComponent} from "./component/tamizaje-violencia/tamizaje-violencia.component";
import { ModalProcedimientosComponent } from './component/procedimientos/modal-procedimientos/modal-procedimientos.component';
import { ProcedimientosComponent } from './component/procedimientos/procedimientos.component';
import { EvaluacionesComponent } from './component/evaluaciones/evaluaciones.component';
import { EcografiaSolicitudComponent } from './component/evaluaciones/ecografias/ecografia-solicitud/ecografia-solicitud.component';
import { EcografiaResultadoComponent } from './component/evaluaciones/ecografias/ecografia-resultado/ecografia-resultado.component';
import { EcografiasComponent } from './component/evaluaciones/ecografias/ecografias.component';
import { LaboratorioComponent } from './component/evaluaciones/laboratorio/laboratorio.component';
import { LabSolicitudComponent } from './component/evaluaciones/laboratorio/lab-solicitud/lab-solicitud.component';
import { CronogramaComponent } from './component/resultados/cronograma/cronograma.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarModule} from "@fullcalendar/angular";
import { ModalPlanPartoComponent } from './component/modal-plan-parto/modal-plan-parto.component';
import { ExamsInOfficeDialogComponent } from './component/evaluaciones/laboratorio/exams-in-office-dialog/exams-in-office-dialog.component';
import { ModalShowHisComponent } from './component/tratamiento/modal-show-his/modal-show-his.component';
import { AtencionesPrenatalesModalComponent } from './component/atenciones-prenatales-modal/atenciones-prenatales-modal.component';
import { InteconsultaObstetriciaModalComponent } from './component/inteconsulta-obstetricia-modal/inteconsulta-obstetricia-modal.component';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
])
@NgModule({
    declarations: [
        ModalTratamientoComponent,
        ModalInmunizacionesComponent,
        TamizajeViolenciaComponent,
        DatosGeneralesComponent,
        StepGeneral_consultaComponent,
        InterrogatorioComponent,
        GiagnosticosComponent,
        TratamientoComponent,
        ResultadosComponent,
        ModalInterconsultaComponent,
        ModalRecomendacionesComponent,
        ModalExamenesAuxiliaresComponent,
        ProcedimientosComponent,
        EvaluacionesComponent,
        ModalProcedimientosComponent,
        EcografiaSolicitudComponent,
        EcografiaResultadoComponent,
        EcografiasComponent,
        LaboratorioComponent,
        LabSolicitudComponent,
        CronogramaComponent,
        ModalPlanPartoComponent,
        ExamsInOfficeDialogComponent,
        ModalShowHisComponent,
        AtencionesPrenatalesModalComponent,
        InteconsultaObstetriciaModalComponent
    ],
    imports: [
        FullCalendarModule,
        ConsultaObstetricoRoutingModule,
        CommonModule,
        PrimeModule,
        PaginatorModule
    ]
})
export class ConsultaObstetricoModule {
}
