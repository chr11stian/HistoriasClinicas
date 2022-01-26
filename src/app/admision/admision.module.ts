import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../shared/prime/prime.module'
import { ChipsModule } from 'primeng/chips';

import { AdminsionRoutingModule } from './adminsion-routing.module';
import { PersonalSaludComponent } from './personal-salud/personal-salud.component';
import { CoreModule } from "../core/core.module";
import { ToolbarModule } from "primeng/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SplitterModule } from "primeng/splitter";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CuposComponent } from './cupos/cupos.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

import { CheckboxModule } from "primeng/checkbox";
import { PanelModule } from "primeng/panel";
import { IpressComponent } from './ipress/ipress.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ListarCuposComponent } from './triaje/listar-cupos/listar-cupos.component';
import { RegistrarTriajeComponent } from './triaje/registrar-triaje/registrar-triaje.component';
import { IpressRolesComponent } from './ipress-roles/ipress-roles.component';
import { IpressTurnosComponent } from './ipress-turnos/ipress-turnos.component';
import { IpressAmbientesComponent } from './ipress-ambientes/ipress-ambientes.component';
import { AtencionesModule } from "./admision/atenciones.module";

@NgModule({
    declarations: [
        PersonalSaludComponent,
        UsuariosComponent,
        CuposComponent,
        IpressComponent,
        PacienteComponent,
        ListarCuposComponent,
        RegistrarTriajeComponent,
        IpressRolesComponent,
        IpressTurnosComponent,
        IpressAmbientesComponent,
    ],
    exports: [
        PersonalSaludComponent,
        UsuariosComponent,
        IpressComponent,

    ],

    imports: [
        CommonModule,
        AtencionesModule,
        AdminsionRoutingModule,
        CoreModule,
        PrimeModule,
        ToolbarModule,
        FormsModule,
        SplitterModule,
        ReactiveFormsModule,
        TreeSelectModule,
        DividerModule,
        CalendarModule,
        InputMaskModule,
        CheckboxModule,
        PanelModule,
        ChipsModule
    ]
})
export class AdmisionModule {
}
