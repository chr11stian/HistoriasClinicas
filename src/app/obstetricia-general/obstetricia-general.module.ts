import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObstetriciaGeneralRoutingModule} from "./obstetricia-general-routing.module";
import {PaginatorModule} from "primeng/paginator";
import {AtencionModule} from "./gestante/atencion/atencion.module";
import {ConsultaComponent} from './gestante/consulta/consulta.component';
import {GestanteComponent} from "./gestante/gestante.component";
import {CitasComponent} from "./citas.component";
import {ImageModule} from "primeng/image";
import {HistoriaConsultasModule} from "./historia-consultas/historia-consultas.module";
import { DialogConsultaComponent } from './gestante/consulta/dialog-consulta/dialog-consulta.component';


@NgModule({
    declarations: [
        GestanteComponent,
        ConsultaComponent,
        CitasComponent,
        DialogConsultaComponent


    ],
    exports: [],
    imports: [
        CommonModule,
        ObstetriciaGeneralRoutingModule,
        PrimeModule,
        PaginatorModule,

        AtencionModule,
        HistoriaConsultasModule,
        ImageModule

    ]
})
export class ObstetriciaGeneralModule {
}
