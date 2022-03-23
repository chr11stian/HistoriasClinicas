import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepFuaComponent} from "src/app/fua/step-fua/step-fua.component";
import {AtencionComponent} from "./atencion.component";
import {
    TamizajeViolenciaComponent
} from "./consultorio-obstetrico/component/tamizaje-violencia/tamizaje-violencia.component";
import {PlanPartoComponent} from "./plan-parto/plan-parto.component";


const routes: Routes = [
    {
        path: "obstetricia",
        component: AtencionComponent
    },
    {
        path: "tamizaje-violencia",
        component: TamizajeViolenciaComponent
    },
    {
        path: "fua",
        component: StepFuaComponent
    },
    {
        path: "planParto",
        component: PlanPartoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AtencionRoutingModule {
}
