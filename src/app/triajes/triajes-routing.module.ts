import { ListarCuposComponent } from "./listar-cupos/listar-cupos.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "registrar",
        component: ListarCuposComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TriajesRoutingModule {}
