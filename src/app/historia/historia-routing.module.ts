import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ObstetriciaComponent } from "./obstetricia/obstetricia.component";
import { RolGuardiaGeneralComponent } from "./rol-guardia-general/rol-guardia-general.component";
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
    path: "obstetricia",
    component: ObstetriciaComponent,
    // loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
  },
  {
    path: "rol-guardia",
    component: RolGuardiaGeneralComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaRoutingModule {}
