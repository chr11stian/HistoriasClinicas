import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from "src/app/shared/prime/prime.module";

import {GestanteRoutingModule} from './gestante-routing.module';
import {StepGeneralComponent} from './component/step-general/step-general.component';
import {DatosBasalesComponent} from './component/datos-basales/datos-basales.component';
import {AtencionesComponent} from './component/atenciones/atenciones.component';
import {PartosComponent} from './component/partos/partos.component';
import {RecienNacidoComponent} from './component/recien-nacido/recien-nacido.component';
import {PuerperioComponent} from './component/puerperio/puerperio.component';
import {DatosGeneralesObtetriciaComponent} from "./component/filiacion-antecedentes/datos-generales-obtetricia.component";
import {ToolbarModule} from "primeng/toolbar";
import {PanelModule} from "primeng/panel";
import {FieldsetModule} from "primeng/fieldset";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";


@NgModule({
    declarations: [
        StepGeneralComponent,
        DatosBasalesComponent,
        AtencionesComponent,
        PartosComponent,
        RecienNacidoComponent,
        PuerperioComponent,
        DatosGeneralesObtetriciaComponent
    ],

    exports: [DatosGeneralesObtetriciaComponent],


    imports: [
        PrimeModule,
        CommonModule,
        GestanteRoutingModule,
        ToolbarModule,
        PanelModule,
        FieldsetModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        ReactiveFormsModule,
        PanelModule,
        FieldsetModule
    ]
})
export class GestanteModule {
}
