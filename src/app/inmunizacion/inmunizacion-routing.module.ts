import { InmunizacionComponent } from "./component/inmunizacion/inmunizacion.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "Inmunizacion",
        component: InmunizacionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InmunizacionRoutingModule {}
