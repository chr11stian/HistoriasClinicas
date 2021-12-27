import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdultoRoutingModule} from './adulto-routing.module';
import {CitasAdultoComponent} from './citas-adulto/citas-adulto.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeModule} from "../shared/prime/prime.module";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        CitasAdultoComponent
    ],
    imports: [
        CommonModule,
        AdultoRoutingModule,
        SharedModule,
        PrimeModule,
        DynamicDialogModule,
        ToggleButtonModule,
        RippleModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AdultoModule {
}
