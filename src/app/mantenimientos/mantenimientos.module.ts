import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TipoPersonalComponent} from "./component/tipo-personal/tipo-personal.component";
import {CoreModule} from "../core/core.module";
import {MantenimentosRoutingModule} from "./mantenimentos-routing.module";
import {PrimeModule} from "../shared/prime/prime.module";
import {TipoPersonalModalComponent} from './component/tipo-personal-modal/tipo-personal-modal.component';
import {UbicacionComponent} from "./component/ubicacion/ubicacion.component";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {ColegioProfesionalComponent} from "./component/colegio-profesional/colegio-profesional.component";
import {ColegioProfesionalModalComponent} from "./component/colegio-profesional-modal/colegio-profesional-modal.component";

@NgModule({
    declarations: [
        TipoPersonalComponent,
        TipoPersonalModalComponent,
        UbicacionComponent,
        ColegioProfesionalComponent,
        ColegioProfesionalModalComponent
    ],


    exports: [
        TipoPersonalComponent,
        UbicacionComponent],

    imports: [
        CommonModule,
        CoreModule,
        MantenimentosRoutingModule,
        PrimeModule,
        ToolbarModule,
        FormsModule
    ],
})
export class MantenimientosModule {
}
