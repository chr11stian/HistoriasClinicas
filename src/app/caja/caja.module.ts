import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MantenimentosRoutingModule} from "../mantenimientos/mantenimentos-routing.module";
import {CajaRoutingModule} from "./historia-routing.module";
import { TipoComprobanteComponent } from './tipo-comprobante/tipo-comprobante.component';
import {ToolbarModule} from "primeng/toolbar";
import {PrimeModule} from "../shared/prime/prime.module";
import { PagoProcedimientosComponent } from './pago-procedimientos/pago-procedimientos.component';
import { PagosComponent } from './pagos/pagos.component';
import { ResumenPagosComponent } from './resumen-pagos/resumen-pagos.component';
import { AbrirCajaComponent } from './abrir-caja/abrir-caja.component';
import { TabsCajaComponent } from './tabs-caja/tabs-caja.component';
import { PagoLaboratorioComponent } from './pago-laboratorio/pago-laboratorio.component';


@NgModule({
    declarations: [
        PagosComponent,
        TipoComprobanteComponent,
        PagoProcedimientosComponent,
        ResumenPagosComponent,
        AbrirCajaComponent,
        TabsCajaComponent,
        PagoLaboratorioComponent
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
