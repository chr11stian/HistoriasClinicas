import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneral_consultaComponent} from "./consulta-principal/component/step-general/step-general-consulta.component";
import {StepGeneralComponent} from "./gestante/component/step-general/step-general.component";

const routes: Routes = [
    {
        path: "cabecera-consulta",
        component: StepGeneral_consultaComponent
    },
    {
        path: "cabecera-atencion-integral",
        component: StepGeneralComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObtetriciaRoutingModule {
}
