import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneralPartoComponent} from "./component/step-general/step-general-parto.component";

const routes: Routes = [
    {
        path: "plan-de-parto",
        component: StepGeneralPartoComponent
    },

    {
        path: "obstetricia",
        loadChildren: () => import('src/app/obstetricia/plan-de-parto/plan-de-parto.module').then(n => n.PlanDePartoModule),
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlanDePartoRoutingModule {
}
