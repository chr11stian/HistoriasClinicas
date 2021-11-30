import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HistoriaConsultasComponent} from "./historia-consultas.component";


const routes: Routes = [

    {
        path: "historia-consultas",
        component: HistoriaConsultasComponent
    },

    // {
    //     path: "consultas-general",
    //     loadChildren: () => import('src/app/obstetricia-general/consultas-general/consultas-general.module').then(n => n.ConsultasGeneralModule),
    // },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoriaConsultasRoutingModule {
}
