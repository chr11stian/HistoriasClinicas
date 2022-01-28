import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuposComponent} from './cupos/cupos.component';
import {TransferirCuposComponent} from './transferir-cupos/transferir-cupos.component';
import {OfertasComponent} from './ofertas/ofertas.component';
import {CitasComponent} from './citas/citas.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import {PrimeModule} from "../../shared/prime/prime.module";
import { ModalCuposComponent } from './cupos/modal-cupos/modal-cupos.component';
import {PaginatorModule} from "primeng/paginator";
import { ModalCupos2Component } from './cupos/modal-cupos2/modal-cupos2.component';


@NgModule({
    declarations: [
        CuposComponent,
        TransferirCuposComponent,
        OfertasComponent,
        CitasComponent,
        TabViewComponent,
        ModalCuposComponent,
        ModalCupos2Component,
    ],
    imports: [
        CommonModule,
        PrimeModule,
        PaginatorModule,
    ]
})
export class AtencionesModule {
}
