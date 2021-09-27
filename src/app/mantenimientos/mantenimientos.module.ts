import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoPersonalComponent } from "./component/tipo-personal/tipo-personal.component";
import { CoreModule } from "../core/core.module";
import { MantenimentosRoutingModule } from "./mantenimentos-routing.module";
import { PrimeModule } from "../shared/prime/prime.module";
import { TipoPersonalModalComponent } from './component/tipo-personal-modal/tipo-personal-modal.component';
import { ColegioProfesionalComponent } from './component/colegio-profesional/colegio-profesional.component';
import { ColegioProfesionalModalComponent } from './component/colegio-profesional-modal/colegio-profesional-modal.component';

@NgModule({
  declarations: [TipoPersonalComponent, TipoPersonalModalComponent, ColegioProfesionalComponent, ColegioProfesionalModalComponent],
  exports: [TipoPersonalComponent],

  imports: [CommonModule, CoreModule, MantenimentosRoutingModule, PrimeModule],
})
export class MantenimientosModule {}
