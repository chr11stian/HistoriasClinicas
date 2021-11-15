import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObstetriciaGeneralRoutingModule} from "./obstetricia-general-routing.module";
import {PaginatorModule} from "primeng/paginator";
import {CitasComponent} from './citas/citas.component';
import {AtencionModule} from "./citas/atencion/atencion.module";
import {AtencionRoutingModule} from "./citas/atencion/atencion-routing.module";
import { ConsultasGeneralComponent } from './consultas-general/consultas-general.component';
import { ConsultaComponent } from './citas/consulta/consulta.component';
import {ConsultasGeneralModule} from "./consultas-general/consultas-general.module";


@NgModule({
    declarations: [
        CitasComponent,
        ConsultasGeneralComponent,
        ConsultaComponent,

    ],
    exports: [],
    imports: [
        CommonModule,
        ObstetriciaGeneralRoutingModule,
        PrimeModule,
        PaginatorModule,

        AtencionModule,
        ConsultasGeneralModule

    ]
})
export class ObstetriciaGeneralModule {
}
