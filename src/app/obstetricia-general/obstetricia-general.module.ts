import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObstetriciaGeneralRoutingModule} from "./obstetricia-general-routing.module";
import {PaginatorModule} from "primeng/paginator";
import {AtencionModule} from "./gestante/atencion/atencion.module";
import {ConsultasGeneralComponent} from './consultas-general/consultas-general.component';
import {ConsultaComponent} from './gestante/consulta/consulta.component';
import {ConsultasGeneralModule} from "./consultas-general/consultas-general.module";
import {GestanteComponent} from "./gestante/gestante.component";
import {CitasComponent} from "./citas.component";
import {ImageModule} from "primeng/image";


@NgModule({
    declarations: [
        GestanteComponent,
        ConsultaComponent,
        CitasComponent,

    ],
    exports: [],
    imports: [
        CommonModule,
        ObstetriciaGeneralRoutingModule,
        PrimeModule,
        PaginatorModule,

        AtencionModule,
        ConsultasGeneralModule,
        ImageModule

    ]
})
export class ObstetriciaGeneralModule {
}
