import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneral_consultaComponent} from "./consulta-principal/component/step-general-consulta/step-general-consulta.component";
import {StepGeneralComponent} from "./gestante/component/step-general/step-general.component";
import {StepGeneralPartoComponent} from "./plan-de-parto/component/step-general/step-general-parto.component";
import {ObstetriciaComponent} from "./obstetricia.component";

const routes: Routes = [
    {
        path: "obstetricia",
        component: ObstetriciaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObtetriciaRoutingModule {
}
