import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalSaludComponent} from "./personal-salud/personal-salud.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";

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
        // loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoriaRoutingModule {
}
