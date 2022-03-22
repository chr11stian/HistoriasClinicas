import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete'
import {PaginatorModule} from "primeng/paginator";

import {PlanDePartoModule} from "./plan-de-parto/plan-de-parto.module";
import {ExamenesModule} from "./examenes/examenes.module";
import {AtencionComponent} from "./atencion.component";
import {AtencionRoutingModule} from "./atencion-routing.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import { PesoEmbarazoUnicoMultipleComponent } from './modals/peso-normal-embarazo-unico-multiple/peso-embarazo-unico-multiple.component';
import {SharedModule} from '../../../shared/shared.module';
import {ConsultaObstetricoModule} from "./consultorio-obstetrico/consulta-obstetrico.module";
import {HClinicaMaternoPerinatalModule} from "./h-clinica-materno-perinatal/h-clinica-materno-perinatal.module";
import { AlturaUterinaComponent } from './modals/altura-uterina/altura-uterina.component';
import { PlanPartoComponent } from './plan-parto/plan-parto.component';
import { IntervaloDialogoComponent } from './plan-parto/intervalo-dialogo/intervalo-dialogo.component';



@NgModule({
    declarations: [

        AtencionComponent,
        PesoEmbarazoUnicoMultipleComponent,
        AlturaUterinaComponent,
        PlanPartoComponent,
        IntervaloDialogoComponent,
    ],
    exports: [AtencionComponent],
    imports: [
        CommonModule,
        AtencionRoutingModule,
        PrimeModule,
        PaginatorModule,
        AutoCompleteModule,

        ConsultaObstetricoModule,

        ConsultaObstetricoModule,
        HClinicaMaternoPerinatalModule,
        PlanDePartoModule,
        ExamenesModule,
        SharedModule,

    ]
})
export class AtencionModule {

}
