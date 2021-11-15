import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObtetriciaRoutingModule} from "./obstetricia-routing.module";

import {PaginatorModule} from "primeng/paginator";

import {ObstetriciaComponent} from './obstetricia.component';
import {ConsultaPrincipalModule} from "./consulta-principal/consulta-principal.module";
import {GestanteModule} from "./gestante/gestante.module";
import {PlanDePartoModule} from "./plan-de-parto/plan-de-parto.module";
import {ExamenesModule} from "./examenes/examenes.module";


@NgModule({
    declarations: [

        ObstetriciaComponent,

    ],
    exports: [],
    imports: [
        CommonModule,
        ObtetriciaRoutingModule,
        PrimeModule,
        PaginatorModule,

        ConsultaPrincipalModule,
        GestanteModule,
        PlanDePartoModule,
        ExamenesModule,

    ]
})
export class ObstetriciaModule {
}
