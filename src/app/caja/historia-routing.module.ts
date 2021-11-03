import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagosComponent} from "./pagos/pagos.component";

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
