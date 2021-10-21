import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from '../shared/prime/prime.module'

import {HistoriaRoutingModule} from './historia-routing.module';
import {PersonalSaludComponent} from './personal-salud/personal-salud.component';
import {CoreModule} from "../core/core.module";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SplitterModule} from "primeng/splitter";
import {UsuariosComponent} from './usuarios/usuarios.component';
import {CuposComponent} from './cupos/cupos.component';
import {TreeSelectModule} from 'primeng/treeselect';
import {DividerModule} from 'primeng/divider';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import { IpressComponent } from './ipress/ipress.component';

@NgModule({
    declarations: [
        PersonalSaludComponent,
        UsuariosComponent,
        CuposComponent,
        IpressComponent
    ],
    exports: [
        PersonalSaludComponent,
        UsuariosComponent,
    ],

    imports: [
        CommonModule,
        HistoriaRoutingModule,
        CoreModule,
        PrimeModule,
        ToolbarModule,
        FormsModule,
        SplitterModule,
        ReactiveFormsModule,
        TreeSelectModule,
        DividerModule,
        CalendarModule,
        InputMaskModule
    ]
})
export class HistoriaModule {
}
