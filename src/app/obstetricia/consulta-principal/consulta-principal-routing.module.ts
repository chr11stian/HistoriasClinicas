import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneral_consultaComponent} from "./component/step-general-consulta/step-general-consulta.component";

const routes: Routes = [
    {
        path: "consulta-principal",
        component: StepGeneral_consultaComponent
    },

    {
        path: "obstetricia",
        loadChildren: () => import('src/app/obstetricia/consulta-principal/consulta-principal.module').then(n => n.ConsultaPrincipalModule),
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultaPrincipalRoutingModule {
}
