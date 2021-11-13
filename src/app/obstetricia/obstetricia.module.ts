import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObtetriciaRoutingModule} from "./obstetricia-routing.module";

import {AtencionesComponent} from "./gestante/component/atenciones/atenciones.component";
import {DatosBasalesComponent} from "./gestante/component/datos-basales/datos-basales.component";
import {DatosGeneralesObtetriciaComponent} from "./gestante/component/filiacion-antecedentes/datos-generales-obtetricia.component";
import {PartosComponent} from "./gestante/component/partos/partos.component";
import {PuerperioComponent} from "./gestante/component/puerperio/puerperio.component";
import {RecienNacidoComponent} from "./gestante/component/recien-nacido/recien-nacido.component";
import {StepGeneralComponent} from "./gestante/component/step-general/step-general.component";

import {PaginatorModule} from "primeng/paginator";
import {DatosGeneralesPartoComponent} from './plan-de-parto/component/datos-generales-parto/datos-generales-parto.component';
import {StepGeneralPartoComponent} from "./plan-de-parto/component/step-general/step-general-parto.component";
import {IntervaloPartoComponent} from './plan-de-parto/component/intervalo-parto/intervalo-parto.component';
import {NecesidadesPartoComponent} from './plan-de-parto/component/necesidades-parto/necesidades-parto.component';
import {SPeligroPartoComponent} from './plan-de-parto/component/s-peligro-parto/s-peligro-parto.component';
import {DialogAtencionComponent} from './gestante/component/atenciones/dialog-atencion/dialog-atencion.component';
import {ObstetriciaComponent} from './obstetricia.component';
import {ConsultaPrincipalModule} from "./consulta-principal/consulta-principal.module";
import {GestanteModule} from "./gestante/gestante.module";
import {PlanDePartoModule} from "./plan-de-parto/plan-de-parto.module";


@NgModule({
    declarations: [
        ObstetriciaComponent,

    ],
    exports: [],
    imports: [
        CommonModule,
        ObtetriciaRoutingModule,
        PrimeModule,
        PaginatorModule,

        ConsultaPrincipalModule,
        GestanteModule,
        PlanDePartoModule
    ]
})
export class ObstetriciaModule {
}
