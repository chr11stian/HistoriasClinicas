import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CitasComponent} from "./citas/citas.component";
import {ConsultaComponent} from "./citas/consulta/consulta.component";

const routes: Routes = [
    {
        path: "citas",
        component: CitasComponent
    },

    {
        path: "consulta",
        component: ConsultaComponent
    },

    {
        path: "citas",
        loadChildren: () => import('src/app/obstetricia-general/obstetricia-general.module').then(n => n.ObstetriciaGeneralModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObstetriciaGeneralRoutingModule {
}
