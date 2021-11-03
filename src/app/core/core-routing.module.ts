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

            // {
            //     path: "rol",
            //     loadChildren: () => import('src/app/rol/rol.module').then(n => n.RolModule),
            // },
            {
                path: "historia",
                loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
            },
            {
                path: "mantenimientos",
                loadChildren: () => import('src/app/mantenimientos/mantenimientos.module').then(n => n.MantenimientosModule),
            },

            {
                path: "caja",
                loadChildren: () => import('src/app/caja/caja.module').then(n => n.CajaModule),
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
