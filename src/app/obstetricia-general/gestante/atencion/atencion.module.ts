import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaginatorModule} from "primeng/paginator";

import {PlanDePartoModule} from "./plan-de-parto/plan-de-parto.module";
import {ExamenesModule} from "./examenes/examenes.module";
import {AtencionComponent} from "./atencion.component";
import {AtencionRoutingModule} from "./atencion-routing.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import {PesoEmbarazoUnicoMultipleComponent} from './modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component';
import {SharedModule} from '../../../shared/shared.module'
import {ConsultaObstetricoModule} from "./consultorio-obstetrico/consulta-obstetrico.module";
import {HClinicaMaternoPerinatalModule} from "./h-clinica-materno-perinatal/h-clinica-materno-perinatal.module";


@NgModule({
    declarations: [

        AtencionComponent,
        PesoEmbarazoUnicoMultipleComponent,

    ],
    exports: [AtencionComponent],
    imports: [
        CommonModule,
        AtencionRoutingModule,
        PrimeModule,
        PaginatorModule,

        ConsultaObstetricoModule,
        HClinicaMaternoPerinatalModule,
        PlanDePartoModule,
        ExamenesModule,
        SharedModule,

    ]
})
export class AtencionModule {
}
