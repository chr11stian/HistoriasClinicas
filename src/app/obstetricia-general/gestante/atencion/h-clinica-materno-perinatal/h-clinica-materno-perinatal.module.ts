import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AtencionesComponent} from "./component/atenciones/atenciones.component";
import {DatosBasalesComponent} from "./component/datos-basales/datos-basales.component";
import {DatosGeneralesObtetriciaComponent} from "./component/filiacion-antecedentes/datos-generales-obtetricia.component";
import {PartosComponent} from "./component/partos/partos.component";
import {PuerperioComponent} from "./component/puerperio/puerperio.component";
import {RecienNacidoComponent} from "./component/recien-nacido/recien-nacido.component";
import {StepGeneralComponent} from "./component/step-general/step-general.component";
import {PaginatorModule} from "primeng/paginator";
import {PrimeModule} from "../../../../shared/prime/prime.module";
import {DatosGeneralesFiliacionComponent} from './component/datos-generales-filiacion/datos-generales-filiacion.component';
import {PuerperioModalComponent} from './component/puerperio/puerperio-modal/puerperio-modal.component';
import {MantenimientosModule} from "../../../../mantenimientos/mantenimientos.module";
import {RecienNacidoDialogoComponent} from './component/recien-nacido/recien-nacido-dialogo/recien-nacido-dialogo.component';
import {PartosModalComponent} from './component/partos-modal/partos-modal.component';
import {HClinicaMaternoPerinatalRoutingModule} from "./h-clinica-materno-perinatal-routing.module";
import { ModalAtencionesComponent } from './component/atenciones/modal-atenciones/modal-atenciones.component';


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
        PuerperioModalComponent,
        RecienNacidoDialogoComponent,
        PartosModalComponent,
        ModalAtencionesComponent,

    ],
    imports: [
        CommonModule,
        PaginatorModule,
        PrimeModule,
        HClinicaMaternoPerinatalRoutingModule,

    ]
})
export class HClinicaMaternoPerinatalModule {
}
