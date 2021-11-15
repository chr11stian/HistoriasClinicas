import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaginatorModule} from "primeng/paginator";

import {ConsultaPrincipalModule} from "./consulta-principal/consulta-principal.module";
import {PlanDePartoModule} from "./plan-de-parto/plan-de-parto.module";
import {ExamenesModule} from "./examenes/examenes.module";
import {AtencionComponent} from "./atencion.component";
import {AtencionRoutingModule} from "./atencion-routing.module";
import {PlanAtencionIntegralModule} from "./plan-atencion-integral/plan-atencion-integral.module";
import {PrimeModule} from "../../../shared/prime/prime.module";


@NgModule({
    declarations: [

        AtencionComponent,

    ],
    exports: [AtencionComponent],
    imports: [
        CommonModule,
        AtencionRoutingModule,
        PrimeModule,
        PaginatorModule,

        ConsultaPrincipalModule,
        PlanAtencionIntegralModule,
        PlanDePartoModule,
        ExamenesModule,

    ]
})
export class AtencionModule {
}
