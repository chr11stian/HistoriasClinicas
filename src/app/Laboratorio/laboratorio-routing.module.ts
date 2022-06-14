import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListaLaboratorioComponent} from "./component/lista-laboratorio/lista-laboratorio.component";
import {LabInmunologiaComponent} from "./component/lab-inmunologia/lab-inmunologia.component";
import { LabParasitologiaComponent } from "./component/lab-parasitologia/lab-parasitologia.component";


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
    {
        path: "laboratorio-parasitologia",
        component: LabParasitologiaComponent
    },
    {
        path: "inmunologia",
        component: LabInmunologiaComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class laboratorioRoutingModule {
}
