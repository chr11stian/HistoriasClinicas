import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdultoMayorRoutingModule} from './adulto-mayor-routing.module';
import {CitasAdultoMayorComponent} from './citas-adulto-mayor/citas-adulto-mayor.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeModule} from "../shared/prime/prime.module";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        CitasAdultoMayorComponent
    ],
    imports: [
        CommonModule,
        AdultoMayorRoutingModule,
        SharedModule,
        PrimeModule,
        DynamicDialogModule,
        ToggleButtonModule,
        RippleModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AdultoMayorModule {
}
