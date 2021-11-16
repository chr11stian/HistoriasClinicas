import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AtencionComponent} from "./atencion.component";


const routes: Routes = [
    {
        path: "obstetricia",
        component: AtencionComponent
    },

    {
        path: "atencion",
        loadChildren: () => import('src/app/obstetricia-general/citas/atencion/atencion.module').then(n => n.AtencionModule),
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AtencionRoutingModule {
}
