import { RegistrarTriajeComponent } from './registrar-triaje/registrar-triaje.component';
import { ListarCuposComponent } from './listar-cupos/listar-cupos.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TriajesRoutingModule } from "./triajes-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeModule } from "../shared/prime/prime.module";

@NgModule({
    declarations: [
        ListarCuposComponent,
        RegistrarTriajeComponent
    ],
    imports: [
        CommonModule,
        TriajesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeModule
    ],
})
export class TriajesModule {}
