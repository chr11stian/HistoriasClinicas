import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneralComponent} from "./component/step-general/step-general.component";

const routes: Routes = [
    {
        path: "gestante",
        component: StepGeneralComponent
    },

    {
        path: "obstetricia",
        loadChildren: () => import('src/app/obstetricia/gestante/gestante.module').then(n => n.GestanteModule),
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GestanteRoutingModule {
}
