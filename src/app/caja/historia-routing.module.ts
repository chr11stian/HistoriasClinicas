import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AbrirCajaComponent } from './abrir-caja/abrir-caja.component';

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
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CajaRoutingModule {
}
