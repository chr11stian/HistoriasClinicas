import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoriaConsultasRoutingModule} from "./historia-consultas-routing.module";
import {PrimeModule} from "../../shared/prime/prime.module";
import {PaginatorModule} from "primeng/paginator";
import {DialogConsultaComponent} from './dialog-consulta/dialog-consulta.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {HistoriaConsultasComponent} from "./historia-consultas.component";
import {DialogConsultaUniversalComponent} from "./dialog-consulta-universal/dialog-consulta-universal.component";


@NgModule({
    declarations: [
        HistoriaConsultasComponent,
        DialogConsultaComponent,
        DialogConsultaUniversalComponent,
    ],
    imports: [
        CommonModule,
        PrimeModule,
        PaginatorModule,
        HistoriaConsultasRoutingModule,
        DynamicDialogModule,
    ]
})
export class HistoriaConsultasModule {
}
