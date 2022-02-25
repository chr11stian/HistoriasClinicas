import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MantenimentosRoutingModule} from "../mantenimientos/mantenimentos-routing.module";
import {CajaRoutingModule} from "./historia-routing.module";
import { TipoComprobanteComponent } from './tipo-comprobante/tipo-comprobante.component';
import {ToolbarModule} from "primeng/toolbar";
import {PrimeModule} from "../shared/prime/prime.module";
import { PagoProcedimientosComponent } from './pago-procedimientos/pago-procedimientos.component';
import { PagosComponent } from './pagos/pagos.component';


@NgModule({
    declarations: [
        PagosComponent,
        TipoComprobanteComponent,
        PagoProcedimientosComponent
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
