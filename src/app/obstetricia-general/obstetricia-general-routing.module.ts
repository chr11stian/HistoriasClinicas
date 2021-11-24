import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CitasComponent} from "./citas.component";
import {ConsultaComponent} from "./gestante/consulta/consulta.component";
import {GestanteComponent} from "./gestante/gestante.component";
import {AtencionComponent} from "./gestante/atencion/atencion.component";

const routes: Routes = [

    {
        path: "gestante",
        component: GestanteComponent
    },
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

    {
        path: "citas",
        loadChildren: () => import('src/app/obstetricia-general/gestante/atencion/atencion.module').then(n => n.AtencionModule),
    },

    {
        path: "gestante",
        loadChildren: () => import('src/app/obstetricia-general/gestante/atencion/atencion.module').then(n => n.AtencionModule),
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObstetriciaGeneralRoutingModule {
}
