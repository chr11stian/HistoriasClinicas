import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RolGuardiaComponent } from "./rol-guardia/rol-guardia.component";

const routes: Routes = [
  {
    path: "rolGuardia",
    component: RolGuardiaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
