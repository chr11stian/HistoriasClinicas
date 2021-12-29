import {NgModule} from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {TopMenuComponent} from "./core/top-menu/top-menu.component";
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './core/guards/authGuard';

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
        // canActivate: [AuthGuard],
        data: {roles: ["GERESA", "RED", "MICRORED", "IPRESS"]}
    },
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
