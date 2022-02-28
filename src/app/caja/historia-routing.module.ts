import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AbrirCajaComponent } from './abrir-caja/abrir-caja.component';
import { PagosComponent } from './pagos/pagos.component';
import { TabsCajaComponent } from './tabs-caja/tabs-caja.component';

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
        path: "abrir-caja",
        component: AbrirCajaComponent
    },
    {
        path: "menu-caja",
        component: TabsCajaComponent
    },
    {
        path: "pagos",
        component: PagosComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CajaRoutingModule {
}
