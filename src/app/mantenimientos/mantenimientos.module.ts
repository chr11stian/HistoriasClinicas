import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoPersonalComponent,} from "./component/tipo-personal/tipo-personal.component";
import {CoreModule} from "../core/core.module";
import {MantenimentosRoutingModule} from "./mantenimentos-routing.module";


@NgModule({
    declarations: [
        TipoPersonalComponent,
    ],
    exports: [
        TipoPersonalComponent
    ],

    imports: [
        CommonModule,
        CoreModule,
        MantenimentosRoutingModule
    ]
})
export class MantenimientosModule {
}
