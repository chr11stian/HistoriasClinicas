import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from '../shared/prime/prime.module'

import {HistoriaRoutingModule} from './historia-routing.module';
import {PersonalSaludComponent} from './personal-salud/personal-salud.component';
import {CoreModule} from "../core/core.module";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {SplitterModule} from "primeng/splitter";
import {UsuariosComponent} from './usuarios/usuarios.component';
import { CuposComponent } from './cupos/cupos.component';

@NgModule({
    declarations: [
        PersonalSaludComponent,
        UsuariosComponent,
        CuposComponent,
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
    ]
})
export class HistoriaModule {
}
