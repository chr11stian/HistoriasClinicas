import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneral_consultaComponent} from "./consulta-principal/component/step-general/step-general-consulta.component";
import {StepGeneralComponent} from "./gestante/component/step-general/step-general.component";
import {StepGeneralPartoComponent} from "./plan-de-parto/component/step-general/step-general-parto.component";

const routes: Routes = [
    {
        path: "cabecera-consulta",
        component: StepGeneral_consultaComponent
    },
    {
        path: "cabecera-atencion-integral",
        component: StepGeneralComponent
    },

    {
        path: "cabecera-plan-parto",
        component: StepGeneralPartoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObtetriciaRoutingModule {
}
