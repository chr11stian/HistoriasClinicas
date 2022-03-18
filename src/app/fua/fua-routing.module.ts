import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { ListarFuaComponent } from "./listar-fua/listar-fua.component";
import {StepFuaComponent} from "./step-fua/step-fua.component";


const routes: Routes = [
    {
        path: "fua",
        component: StepFuaComponent
    },
    {
        path: "listar-fua",
        component: ListarFuaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FuaRoutingModule {
}
