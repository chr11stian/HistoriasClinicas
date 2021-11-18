import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultasGeneralRoutingModule} from "./consultas-general-routing.module";
import {PrimeModule} from "../../shared/prime/prime.module";
import {PaginatorModule} from "primeng/paginator";
import {ConsultasGeneralComponent} from "./consultas-general.component";
import { DialogConsultaComponent } from './dialog-consulta/dialog-consulta.component';


@NgModule({
    declarations: [
        ConsultasGeneralComponent,
        DialogConsultaComponent,
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
