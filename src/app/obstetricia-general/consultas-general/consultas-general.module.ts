import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NuevaConsultaComponent} from "./nueva-consulta/nueva-consulta.component";
import {ConsultasGeneralRoutingModule} from "./consultas-general-routing.module";
import {PrimeModule} from "../../shared/prime/prime.module";
import {PaginatorModule} from "primeng/paginator";
import {ConsultasGeneralComponent} from "./consultas-general.component";


@NgModule({
    declarations: [
        NuevaConsultaComponent,
        ConsultasGeneralComponent,
    ],
    imports: [
        CommonModule,
        PrimeModule,
        PaginatorModule,
        ConsultasGeneralRoutingModule
    ]
})
export class ConsultasGeneralModule {
}
