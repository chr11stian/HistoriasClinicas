import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete'
import {PaginatorModule} from "primeng/paginator";

import {ConsultaPrincipalModule} from "./consulta-principal/consulta-principal.module";
import {PlanDePartoModule} from "./plan-de-parto/plan-de-parto.module";
import {ExamenesModule} from "./examenes/examenes.module";
import {AtencionComponent} from "./atencion.component";
import {AtencionRoutingModule} from "./atencion-routing.module";
import {PlanAtencionIntegralModule} from "./plan-atencion-integral/plan-atencion-integral.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import { PesoEmbarazoUnicoMultipleComponent } from './modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
    declarations: [

        AtencionComponent,
        PesoEmbarazoUnicoMultipleComponent

    ],
    exports: [AtencionComponent],
    imports: [
        CommonModule,
        AtencionRoutingModule,
        PrimeModule,
        PaginatorModule,
        AutoCompleteModule,

        ConsultaPrincipalModule,
        PlanAtencionIntegralModule,
        PlanDePartoModule,
        ExamenesModule,
        SharedModule,

    ]
})
export class AtencionModule {
}
