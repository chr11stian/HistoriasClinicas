import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultadosComponent} from './component/resultados/resultados.component';
import {ObtetriciaRoutingModule} from "./examenes-routing.module";


@NgModule({
    declarations: [
        ResultadosComponent
    ],
    imports: [
        CommonModule,
        ObtetriciaRoutingModule
    ]
})
export class ExamenesModule {
}
