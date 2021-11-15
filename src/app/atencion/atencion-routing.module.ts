import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepGeneral_consultaComponent} from "./consulta-principal/component/step-general-consulta/step-general-consulta.component";
import {StepGeneralComponent} from "./plan-atencion-integral/component/step-general/step-general.component";
import {StepGeneralPartoComponent} from "./plan-de-parto/component/step-general/step-general-parto.component";
import {AtencionComponent} from "./atencion.component";

const routes: Routes = [
    {
        path: "obstetricia",
        component: AtencionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AtencionRoutingModule {
}
