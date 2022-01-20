import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RolGuardiaGeneralComponent} from "./rol-guardia-general/rol-guardia-general.component";

const routes: Routes = [
    {
        path: "",
        // component: InicioComponent
        // component: DashboardComponent
    },
    {
        path: "dashboard",
        // component: DashboardComponent
    },
    {
        path: "rol-guardia",
        component: RolGuardiaGeneralComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoriaRoutingModule {
}
