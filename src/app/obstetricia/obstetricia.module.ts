import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatosGeneralesComponent} from './consulta-principal/component/datos-generales/datos-generales.component';
import {PrimeModule} from "../shared/prime/prime.module";
import {ObtetriciaRoutingModule} from "./obstetricia-routing.module";
import {StepGeneral_consultaComponent} from "./consulta-principal/component/step-general/step-general-consulta.component";
import {InterrogatorioComponent} from './consulta-principal/component/interrogatorio/interrogatorio.component';
import {GiagnosticosComponent} from './consulta-principal/component/giagnosticos/giagnosticos.component';
import {TratamientoComponent} from './consulta-principal/component/tratamiento/tratamiento.component';
import {ResultadosComponent} from './consulta-principal/component/resultados/resultados.component';
import {AtencionesComponent} from "./gestante/component/atenciones/atenciones.component";
import {DatosBasalesComponent} from "./gestante/component/datos-basales/datos-basales.component";
import {DatosGeneralesObtetriciaComponent} from "./gestante/component/filiacion-antecedentes/datos-generales-obtetricia.component";
import {PartosComponent} from "./gestante/component/partos/partos.component";
import {PuerperioComponent} from "./gestante/component/puerperio/puerperio.component";
import {RecienNacidoComponent} from "./gestante/component/recien-nacido/recien-nacido.component";
import {StepGeneralComponent} from "./gestante/component/step-general/step-general.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import {FieldsetModule} from "primeng/fieldset";
import {PaginatorModule} from "primeng/paginator";
import {DatosGeneralesPartoComponent} from './plan-de-parto/component/datos-generales-parto/datos-generales-parto.component';
import {StepGeneralPartoComponent} from "./plan-de-parto/component/step-general/step-general-parto.component";
import {IntervaloPartoComponent} from './plan-de-parto/component/intervalo-parto/intervalo-parto.component';
import {NecesidadesPartoComponent} from './plan-de-parto/component/necesidades-parto/necesidades-parto.component';
import { SPeligroPartoComponent } from './plan-de-parto/component/s-peligro-parto/s-peligro-parto.component';


@NgModule({
    declarations: [
        DatosGeneralesComponent,
        StepGeneral_consultaComponent,
        InterrogatorioComponent,
        GiagnosticosComponent,
        TratamientoComponent,
        ResultadosComponent,

        AtencionesComponent,
        DatosBasalesComponent,
        DatosGeneralesObtetriciaComponent,
        PartosComponent,
        PuerperioComponent,
        RecienNacidoComponent,
        StepGeneralComponent,

        DatosGeneralesPartoComponent,
        StepGeneralPartoComponent,
        IntervaloPartoComponent,
        NecesidadesPartoComponent,
        SPeligroPartoComponent,

    ],
    exports: [],
    imports: [
        CommonModule,
        ObtetriciaRoutingModule,
        PrimeModule,
        PaginatorModule,

    ]
})
export class ObstetriciaModule {
}
