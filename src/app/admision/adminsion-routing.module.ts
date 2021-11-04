import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CuposComponent} from './cupos/cupos.component';
import {PersonalSaludComponent} from "./personal-salud/personal-salud.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {UbicacionComponent} from "../mantenimientos/component/ubicacion/ubicacion.component";
import { IpressComponent } from './ipress/ipress.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
    {
        path: '',
        // component: InicioComponent
        // component: DashboardComponent
    },
    {
        path: 'dashboard',
        // component: DashboardComponent
    },
    {
        path: "personal-salud",
        component: PersonalSaludComponent
        // loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
    },
    {
        path: "usuarios",
        component: UsuariosComponent
    },
    {
        path: "cupos",
        component: CuposComponent
    },
    {
        path: "ipress",
        component: IpressComponent
    },
    {
        path: "paciente",
        component: PacienteComponent
    },


];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminsionRoutingModule {
}
