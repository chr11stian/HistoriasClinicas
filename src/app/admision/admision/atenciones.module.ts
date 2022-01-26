import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuposComponent} from './cupos/cupos.component';
import {TransferirCuposComponent} from './transferir-cupos/transferir-cupos.component';
import {OfertasComponent} from './ofertas/ofertas.component';
import {CitasComponent} from './citas/citas.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import {PrimeModule} from "../../shared/prime/prime.module";


@NgModule({
    declarations: [
        CuposComponent,
        TransferirCuposComponent,
        OfertasComponent,
        CitasComponent,
        TabViewComponent,
    ],
    imports: [
        CommonModule,
        PrimeModule,
    ]
})
export class AtencionesModule {
}
