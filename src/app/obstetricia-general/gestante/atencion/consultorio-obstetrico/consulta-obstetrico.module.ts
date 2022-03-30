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
        CronogramaComponent
    ],
    imports: [
        ConsultaObstetricoRoutingModule,
        CommonModule,
        PrimeModule,
        PaginatorModule
    ]
})
export class ConsultaObstetricoModule {
}
