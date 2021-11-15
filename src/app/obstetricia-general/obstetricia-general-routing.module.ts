import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CitasComponent} from "./citas/citas.component";

const routes: Routes = [
    {
        path: "citas",
        component: CitasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObstetriciaGeneralRoutingModule {
}
