import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObstetriciaComponent} from './obstetricia/obstetricia.component';
import {HistoriaRoutingModule} from "./historia-routing.module";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {StepsModule} from "primeng/steps";
import {PrimeModule} from "../shared/prime/prime.module";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        ObstetriciaComponent
    ],
    imports: [
        CommonModule,
        HistoriaRoutingModule,
        PanelModule,
        ToolbarModule,
        StepsModule,
        PrimeModule,
        FormsModule
    ]
})
export class HistoriaModule {
}
