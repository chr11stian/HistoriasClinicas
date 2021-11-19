import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsultasGeneralComponent} from "./consultas-general.component";


const routes: Routes = [

    {
        path: "consultas-general",
        component: ConsultasGeneralComponent
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
export class ConsultasGeneralRoutingModule {
}
