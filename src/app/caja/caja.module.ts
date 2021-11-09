import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagosComponent} from './pagos/pagos.component';
import {MantenimentosRoutingModule} from "../mantenimientos/mantenimentos-routing.module";
import {CajaRoutingModule} from "./historia-routing.module";
import { TipoComprobanteComponent } from './tipo-comprobante/tipo-comprobante.component';
import {ToolbarModule} from "primeng/toolbar";
import {PrimeModule} from "../shared/prime/prime.module";


@NgModule({
    declarations: [
        PagosComponent,
        TipoComprobanteComponent
    ],
    exports: [PagosComponent],
    imports: [
        CommonModule,
        CajaRoutingModule,
        ToolbarModule,
        PrimeModule
    ]
})
export class CajaModule {
}
