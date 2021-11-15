import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObstetriciaGeneralRoutingModule} from "./obstetricia-general-routing.module";
import {PaginatorModule} from "primeng/paginator";
import {CitasComponent} from './citas/citas.component';
import {AtencionModule} from "./citas/atencion/atencion.module";
import {AtencionRoutingModule} from "./citas/atencion/atencion-routing.module";


@NgModule({
    declarations: [
        CitasComponent,

    ],
    exports: [],
    imports: [
        CommonModule,
        ObstetriciaGeneralRoutingModule,
        PrimeModule,
        PaginatorModule,

        AtencionModule

    ]
})
export class ObstetriciaGeneralModule {
}
