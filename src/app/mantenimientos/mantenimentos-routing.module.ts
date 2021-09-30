import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TipoPersonalComponent } from "./component/tipo-personal/tipo-personal.component";
import { TipoTurnoComponent } from "./component/tipo-turno/tipo-turno.component";

const routes: Routes = [
  {
    path: "",
    // component: InicioComponent
    // component: DashboardComponent
  },
  {
    path: "dashboard",
    // component: DashboardComponent
  },

  {
    path: "tipo-personal",
    component: TipoPersonalComponent,
  },
  {
    path: "tipo-turno",
    component: TipoTurnoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimentosRoutingModule {}
