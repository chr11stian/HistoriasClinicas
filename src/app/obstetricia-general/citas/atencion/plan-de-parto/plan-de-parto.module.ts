import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanDePartoRoutingModule} from "./plan-de-parto-routing.module";
import {DatosGeneralesPartoComponent} from "./component/datos-generales-parto/datos-generales-parto.component";
import {StepGeneralPartoComponent} from "./component/step-general/step-general-parto.component";
import {IntervaloPartoComponent} from "./component/intervalo-parto/intervalo-parto.component";
import {NecesidadesPartoComponent} from "./component/necesidades-parto/necesidades-parto.component";
import {SPeligroPartoComponent} from "./component/s-peligro-parto/s-peligro-parto.component";
import {PaginatorModule} from "primeng/paginator";
import {PrimeModule} from "../../../../shared/prime/prime.module";


@NgModule({
    declarations: [
        DatosGeneralesPartoComponent,
        StepGeneralPartoComponent,
        IntervaloPartoComponent,
        NecesidadesPartoComponent,
        SPeligroPartoComponent,
    ],
    imports: [
        CommonModule,
        PlanDePartoRoutingModule,
        PaginatorModule,
        PrimeModule
    ]
})
export class PlanDePartoModule {
}
