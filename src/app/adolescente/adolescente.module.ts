import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdolescenteRoutingModule} from './adolescente-routing.module';
import {CitasAdolescenteComponent} from './citas-adolescente/citas-adolescente.component';

import {PrimeModule} from "src/app/shared/prime/prime.module";
import {SharedModule} from '../shared/shared.module';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@NgModule({
    declarations: [
        CitasAdolescenteComponent
    ],
    imports: [
        SharedModule,
        PrimeModule,
        CommonModule,
        AdolescenteRoutingModule,
        DynamicDialogModule,
        ToggleButtonModule,
        RippleModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AdolescenteModule {
}
