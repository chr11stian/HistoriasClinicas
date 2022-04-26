import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HisReportesComponent} from "./components/his-reportes/his-reportes.component";
const routes: Routes = [

    {
        path: "reportes-his",
        component: HisReportesComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class reportesRoutingModule {
}