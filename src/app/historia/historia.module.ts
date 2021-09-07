import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from '../shared/prime/prime.module'

import {TableModule} from 'primeng/table';
import {HistoriaRoutingModule} from './historia-routing.module';
import {PersonalSaludComponent} from './personal-salud/personal-salud.component';
import {CoreModule} from "../core/core.module";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {SplitterModule} from "primeng/splitter";

@NgModule({
    declarations: [
        PersonalSaludComponent,

    ],
    exports: [
        PersonalSaludComponent,
        PrimeModule,
    ],

    imports: [
        CommonModule,
        HistoriaRoutingModule,
        CoreModule,
        ToolbarModule,
        FormsModule,
        PrimeModule,
        SplitterModule,
    ]
})
export class HistoriaModule {
}
