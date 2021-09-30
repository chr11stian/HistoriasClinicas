
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoPersonalComponent } from "./component/tipo-personal/tipo-personal.component";
import { CoreModule } from "../core/core.module";
import { MantenimentosRoutingModule } from "./mantenimentos-routing.module";
import { PrimeModule } from "../shared/prime/prime.module";
import { TipoPersonalModalComponent } from "./component/tipo-personal-modal/tipo-personal-modal.component";
import { UbicacionComponent } from "./component/ubicacion/ubicacion.component";
import { ToolbarModule } from "primeng/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ColegioProfesionalComponent } from "./component/colegio-profesional/colegio-profesional.component";
import { TreeSelectModule } from "primeng/treeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { EspecialidadComponent } from "./component/especialidad/especialidad.component";
import { TipoTurnoComponent } from "./component/tipo-turno/tipo-turno.component";
import { TipoTurnoModalComponent } from "./component/tipo-turno-modal/tipo-turno-modal.component";
import { GrupoEtarioComponent } from './component/grupo-etario/grupo-etario.component';

@NgModule({
  declarations: [
    TipoPersonalComponent,
    TipoPersonalModalComponent,
    UbicacionComponent,
    ColegioProfesionalComponent,
    EspecialidadComponent,
    TipoTurnoComponent,
    TipoTurnoModalComponent,
    GrupoEtarioComponent,
  ],

  exports: [TipoPersonalComponent, UbicacionComponent],

  imports: [
    CommonModule,
    CoreModule,
    MantenimentosRoutingModule,
    PrimeModule,
    ToolbarModule,
    FormsModule,
    TreeSelectModule,
    MultiSelectModule,
    ReactiveFormsModule,
  ],
})
export class MantenimientosModule {}
