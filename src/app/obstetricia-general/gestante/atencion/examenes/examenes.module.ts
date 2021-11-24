import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultadosComponent} from './component/resultados/resultados.component';
import {ObtetriciaRoutingModule} from "./examenes-routing.module";
import {PrimeModule} from "../../../../shared/prime/prime.module";


@NgModule({
    declarations: [
        ResultadosComponent
    ],
    imports: [
        CommonModule,
        ObtetriciaRoutingModule,
        PrimeModule
    ]
})
export class ExamenesModule {
}
