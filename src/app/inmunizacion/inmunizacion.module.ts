import { InmunizacionComponent } from './component/inmunizacion/inmunizacion.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrimeModule } from "../shared/prime/prime.module";
import { InmunizacionRoutingModule } from "./inmunizacion-routing.module";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
    declarations: [
      InmunizacionComponent
    ],
    imports: [
        CommonModule,
        ToolbarModule,
        PrimeModule,
        InmunizacionRoutingModule,
    ],
})
export class InmunizacionModule {}
