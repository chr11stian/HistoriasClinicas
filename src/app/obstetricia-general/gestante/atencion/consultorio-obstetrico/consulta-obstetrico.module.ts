import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatosGeneralesComponent} from "./component/datos-generales/datos-generales.component";
import {StepGeneral_consultaComponent} from "./component/step-general-consulta/step-general-consulta.component";
import {InterrogatorioComponent} from "./component/interrogatorio/interrogatorio.component";
import {GiagnosticosComponent} from "./component/giagnosticos/giagnosticos.component";
import {TratamientoComponent} from "./component/tratamiento/tratamiento.component";
import {ResultadosComponent} from "./component/resultados/resultados.component";
import {PrimeModule} from "../../../../shared/prime/prime.module";
import {DialogExamenesFetalesComponent} from "./component/interrogatorio/dialog-examenes-fetales/dialog-examenes-fetales.component";
import {ConsultaObstetricoRoutingModule} from "./consulta-obstetrico-routing.module";

import {PaginatorModule} from "primeng/paginator";
import {ModalTratamientoComponent} from "./component/tratamiento/modal-tratamiento/modal-tratamiento.component";
import {ModalInmunizacionesComponent} from "./component/tratamiento/modal-inmunizaciones/modal-inmunizaciones.component";
import { ModalInterconsultaComponent } from './component/tratamiento/modal-interconsulta/modal-interconsulta.component';
import { ModalRecomendacionesComponent } from './component/tratamiento/modal-recomendaciones/modal-recomendaciones.component';
import { ModalExamenesAuxiliaresComponent } from './component/tratamiento/modal-examenes-auxiliares/modal-examenes-auxiliares.component';



@NgModule({
    declarations: [
        ModalTratamientoComponent,
        ModalInmunizacionesComponent,

        DatosGeneralesComponent,
        StepGeneral_consultaComponent,
        InterrogatorioComponent,
        GiagnosticosComponent,
        TratamientoComponent,
        ResultadosComponent,
        DialogExamenesFetalesComponent,
        ModalInterconsultaComponent,
        ModalRecomendacionesComponent,
        ModalExamenesAuxiliaresComponent,
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
