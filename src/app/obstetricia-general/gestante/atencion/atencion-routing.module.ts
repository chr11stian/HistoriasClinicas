import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AtencionComponent} from "./atencion.component";


const routes: Routes = [
    {
        path: "obstetricia",
        component: AtencionComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AtencionRoutingModule {
}
