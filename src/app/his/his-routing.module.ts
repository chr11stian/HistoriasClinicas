import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListarHisComponent} from "./listar-his/listar-his.component";
import {HisComponent} from "./his/his.component";


const routes: Routes = [
    {
        path: "his",
        component: HisComponent
    },
    {
        path: "listar-his",
        component: ListarHisComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HisRoutingModule {
}
