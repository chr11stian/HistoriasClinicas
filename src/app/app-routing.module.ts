import {NgModule} from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {TopMenuComponent} from "./core/top-menu/top-menu.component";
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
// import { AuthGuard } from './login/guard/auth.guard';
const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "dashboard",
        loadChildren: () => import('src/app/core/core.module').then(n => n.CoreModule),

    },
    // {
    //     path: "historia",
    //     // loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
    //     // canActivate: [AuthGuard],
    //     // data: {roles:["Super Administrador","Administrador", "Publicador"]}
    //
    // },
    {
        path: "menu",
        component: TopMenuComponent

    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
