import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RolRoutingModule } from "./rol-routing.module";
import { RolGuardiaComponent } from "./rol-guardia/rol-guardia.component";
import { PrimeModule } from "../shared/prime/prime.module";
@NgModule({
  declarations: [RolGuardiaComponent],
  imports: [CommonModule, RolRoutingModule, PrimeModule],
})
export class RolModule {}
