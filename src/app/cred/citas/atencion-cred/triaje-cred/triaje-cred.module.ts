import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TriajeCredRoutingModule} from './triaje-cred-routing.module';
import {TriajeCredComponent} from './component/triaje-cred/triaje-cred.component';
import {PrimeModule} from "../../../../shared/prime/prime.module";
import {RippleModule} from "primeng/ripple";

@NgModule({
    declarations: [
        TriajeCredComponent
    ],
    imports: [
        CommonModule,
        TriajeCredRoutingModule,
        PrimeModule,
        RippleModule
    ]
})
export class TriajeCredModule {
}
