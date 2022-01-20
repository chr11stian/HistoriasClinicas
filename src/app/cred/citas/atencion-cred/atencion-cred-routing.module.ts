import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AtencionCredComponent } from "./atencion-cred.component"
const routes: Routes = [
  {
    path: "atencion",
    component: AtencionCredComponent,
  },
  {
    path: "atencion",
    loadChildren: () => import('src/app/cred/citas/atencion-cred/atencion-cred.module').then(n => n.AtencionCredModule),
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtencionCredRoutingModule {}
