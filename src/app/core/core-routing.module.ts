import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutPrincipalComponent} from './layout-principal/layout-principal.component'
import {InicioComponent} from './inicio/inicio.component'
import {CajaModule} from "../caja/caja.module";

// Modulos

const routes: Routes = [
    {
        path: "",
        component: LayoutPrincipalComponent,
        children: [
            {
                path: "",
                redirectTo: "inicio",
                pathMatch: "full"
            },
            {
                path: "inicio",
                component: InicioComponent,
            },
            {
                path: "admision",
                loadChildren: () => import('src/app/admision/admision.module').then(n => n.AdmisionModule),
            },
            {
                path: "mantenimientos",
                loadChildren: () => import('src/app/mantenimientos/mantenimientos.module').then(n => n.MantenimientosModule),
            },

            {
                path: "historia",
                loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
            },
            {
                path: "cred",
                loadChildren: () => import('src/app/cred/cred.module').then(n => n.CredModule),
            },

            {
                path: "caja",
                loadChildren: () => import('src/app/caja/caja.module').then(n => n.CajaModule),
            },
            {
                path: "obstetricia-general",
                loadChildren: () => import('src/app/obstetricia-general/obstetricia-general.module').then(n => n.ObstetriciaGeneralModule),
            },
            {
                path: "fua",
                loadChildren: () => import('src/app/fua/fua.module').then(n => n.FuaModule),
            },
            {
                path: "adolescente",
                loadChildren: () => import('src/app/adolescente/adolescente.module').then(n => n.AdolescenteModule),
            },
            {
                path: "adulto",
                loadChildren: () => import('src/app/adulto/adulto.module').then(n => n.AdultoModule),
            },
            {
                path: "adulto-mayor",
                loadChildren: () => import('src/app/adulto-mayor/adulto-mayor.module').then(n => n.AdultoMayorModule),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
