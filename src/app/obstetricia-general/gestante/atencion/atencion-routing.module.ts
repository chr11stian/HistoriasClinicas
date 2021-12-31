import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AtencionRoutingModule {
}
