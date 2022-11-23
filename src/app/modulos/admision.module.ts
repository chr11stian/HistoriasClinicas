import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeModule} from '../shared/prime/prime.module'
import {ChipsModule} from 'primeng/chips';

import {AdminsionRoutingModule} from './adminsion-routing.module';
import {PersonalSaludComponent} from './personal-salud/personal-salud.component';
import {CoreModule} from "../core/core.module";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SplitterModule} from "primeng/splitter";
import {UsuariosComponent} from './usuarios/usuarios.component';
import {TreeSelectModule} from 'primeng/treeselect';
import {DividerModule} from 'primeng/divider';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {CheckboxModule} from "primeng/checkbox";
import {PanelModule} from "primeng/panel";
import {IpressComponent} from './ipress/ipress.component';
import {PacienteComponent} from './paciente/paciente.component';
import {IpressHorariosComponent} from './ipress-horarios/ipress-horarios.component';
import {AtencionesModule} from "./admision/atenciones.module";
import { IpressRolesComponent } from './ipress-roles/ipress-roles.component';
import { IpressTurnosComponent } from './ipress-turnos/ipress-turnos.component';
import { IpressAmbientesComponent } from './ipress-ambientes/ipress-ambientes.component';
import { DialogPacienteComponent } from './paciente/dialog-paciente/dialog-paciente.component';
import { IpressTarifarioComponent } from './ipress-tarifario/ipress-tarifario.component';
import { IpressFarmaciaComponent } from './ipress-farmacia/component/ipress-farmacia.component';
import {HisComponent} from "./his/his.component";
import { IpressLaboratorioComponent } from './ipress-laboratorio/ipress-laboratorio.component';
import { CentroPobladoComponent } from './centro-poblado/centro-poblado.component';
@NgModule({
    declarations: [
        
        PersonalSaludComponent,
        UsuariosComponent,
        IpressComponent,
        PacienteComponent,
        IpressRolesComponent,
        IpressTurnosComponent,
        IpressAmbientesComponent,
        IpressHorariosComponent,
        DialogPacienteComponent,
        IpressTarifarioComponent,
        IpressFarmaciaComponent,
        HisComponent,
        IpressLaboratorioComponent,
        CentroPobladoComponent
    ],
    exports: [
        PersonalSaludComponent,
        UsuariosComponent,
        IpressComponent,
        PacienteComponent,
    ],

    imports: [
        CommonModule,
        AtencionesModule,
        AdminsionRoutingModule,
        CoreModule,
        PrimeModule,
        ToolbarModule,
        SplitterModule,
        FormsModule,
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
