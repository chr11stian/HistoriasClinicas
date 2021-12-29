import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StepFuaComponent} from "./step-fua/step-fua.component";


const routes: Routes = [
    {
        path: "fua",
        component: StepFuaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FuaRoutingModule {
}
