import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CabeceraAdolescenteComponent} from "./components/cabecera-adolescente/cabecera-adolescente.component";

const routes: Routes = [
    {
        path: "plan",
        component: CabeceraAdolescenteComponent
    },
    {
        path: "plan",
        loadChildren: () => import('src/app/adolescente/citas-adolescente/plan-atencion-adolescente/plan-atencion-adolescente.module').then(n => n.PlanAtencionAdolescenteModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanAtencionAdolescenteRoutingModule {
}
