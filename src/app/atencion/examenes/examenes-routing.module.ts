import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ResultadosComponent} from "./component/resultados/resultados.component";


const routes: Routes = [
    {
        path: "examenes",
        component: ResultadosComponent
    },
    {
        path: "obstetricia",
        loadChildren: () => import('src/app/atencion/examenes/examenes.module').then(n => n.ExamenesModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObtetriciaRoutingModule {
}
