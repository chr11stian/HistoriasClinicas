import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneralComponent} from "./component/step-general/step-general.component";

const routes: Routes = [
    {
        path: "plan-atencion",
        component: StepGeneralComponent
    },

    {
        path: "obstetricia",
        loadChildren: () => import('src/app/obstetricia-general/gestante/atencion/plan-atencion-integral/plan-atencion-integral.module').then(n => n.PlanAtencionIntegralModule),
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlanAtencionIntegralRoutingModule {
}
