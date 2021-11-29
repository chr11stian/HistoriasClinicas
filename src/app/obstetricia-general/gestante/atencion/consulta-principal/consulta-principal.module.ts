import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatosGeneralesComponent} from "./component/datos-generales/datos-generales.component";
import {StepGeneral_consultaComponent} from "./component/step-general-consulta/step-general-consulta.component";
import {InterrogatorioComponent} from "./component/interrogatorio/interrogatorio.component";
import {GiagnosticosComponent} from "./component/giagnosticos/giagnosticos.component";
import {TratamientoComponent} from "./component/tratamiento/tratamiento.component";
import {ResultadosComponent} from "./component/resultados/resultados.component";
import {ConsultaPrincipalRoutingModule} from "./consulta-principal-routing.module";
import {PrimeModule} from "../../../../shared/prime/prime.module";

import {FormsModule} from "@angular/forms";
import {ModalInmunizacionesComponent } from './component/tratamiento/modal-inmunizaciones/modal-inmunizaciones.component';
import {ModalTratamientoComponent} from "./component/tratamiento/modal-tratamiento/modal-tratamiento.component";

import { DialogExamenesFetalesComponent } from './component/interrogatorio/dialog-examenes-fetales/dialog-examenes-fetales.component';


@NgModule({
    declarations: [
        DatosGeneralesComponent,
        StepGeneral_consultaComponent,
        InterrogatorioComponent,
        GiagnosticosComponent,
        TratamientoComponent,
        ResultadosComponent,

        ModalTratamientoComponent,
        ModalInmunizacionesComponent,
        DialogExamenesFetalesComponent,
    ],
    imports: [
        ConsultaPrincipalRoutingModule,
        CommonModule,
        PrimeModule,
        FormsModule
    ]
})
export class ConsultaPrincipalModule {
}
