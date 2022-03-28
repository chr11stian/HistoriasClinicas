import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListaLaboratorioComponent} from "./component/lista-laboratorio/lista-laboratorio.component";


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
        path: "lista-laboratorio",
        component: ListaLaboratorioComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class laboratorioRoutingModule {
}
