import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NuevaConsultaComponent} from "./nueva-consulta/nueva-consulta.component";
import {ConsultasGeneralComponent} from "./consultas-general.component";


const routes: Routes = [
    {
        path: "new-consulta",
        component: NuevaConsultaComponent
    },

    {
        path: "consultas-general",
        component: ConsultasGeneralComponent
    },

    {
        path: "consultas-general",
        loadChildren: () => import('src/app/obstetricia-general/consultas-general/consultas-general.module').then(n => n.ConsultasGeneralModule),
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultasGeneralRoutingModule {
}
