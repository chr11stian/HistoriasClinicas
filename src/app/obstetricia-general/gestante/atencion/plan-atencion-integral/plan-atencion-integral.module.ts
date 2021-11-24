import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AtencionesComponent} from "./component/atenciones/atenciones.component";
import {DatosBasalesComponent} from "./component/datos-basales/datos-basales.component";
import {DatosGeneralesObtetriciaComponent} from "./component/filiacion-antecedentes/datos-generales-obtetricia.component";
import {PartosComponent} from "./component/partos/partos.component";
import {PuerperioComponent} from "./component/puerperio/puerperio.component";
import {RecienNacidoComponent} from "./component/recien-nacido/recien-nacido.component";
import {StepGeneralComponent} from "./component/step-general/step-general.component";
import {PaginatorModule} from "primeng/paginator";
import {PlanAtencionIntegralRoutingModule} from "./plan-atencion-integral-routing.module";
import {PrimeModule} from "../../../../shared/prime/prime.module";
import { DatosGeneralesFiliacionComponent } from './component/datos-generales-filiacion/datos-generales-filiacion.component';
import {MantenimientosModule} from "../../../../mantenimientos/mantenimientos.module";
import { RecienNacidoDialogoComponent } from './component/recien-nacido/recien-nacido-dialogo/recien-nacido-dialogo.component';



@NgModule({
  declarations: [
    AtencionesComponent,
    DatosBasalesComponent,
    DatosGeneralesObtetriciaComponent,
    PartosComponent,
    PuerperioComponent,
    RecienNacidoComponent,
    StepGeneralComponent,
    DatosGeneralesFiliacionComponent,
    RecienNacidoDialogoComponent,
  ],
    imports: [
        CommonModule,
        PaginatorModule,
        PrimeModule,
        PlanAtencionIntegralRoutingModule,
        MantenimientosModule
    ]
})
export class PlanAtencionIntegralModule { }
