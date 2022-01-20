import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { StepFuaComponent } from "src/app/fua/step-fua/step-fua.component";
import {AtencionComponent} from "./atencion.component";
import {TamizajeViolenciaComponent} from "./tamizaje-violencia/tamizaje-violencia.component";


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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AtencionRoutingModule {
}
