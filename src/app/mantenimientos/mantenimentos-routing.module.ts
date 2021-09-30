import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColegioProfesionalComponent } from "./component/colegio-profesional/colegio-profesional.component";
import { EspecialidadComponent } from "./component/especialidad/especialidad.component";
import { GrupoEtarioComponent } from "./component/grupo-etario/grupo-etario.component";
import { TipoPersonalComponent } from "./component/tipo-personal/tipo-personal.component";
import { TipoTurnoComponent } from "./component/tipo-turno/tipo-turno.component";
import { UbicacionComponent } from "./component/ubicacion/ubicacion.component";

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
    path: "ubicacion",
    component: UbicacionComponent,
  },

  {
    path: "colegio-profesional",
    component: ColegioProfesionalComponent,
  },

  {
    path: "especialidad",
    component: EspecialidadComponent,
  },
  {
    path: "tipo-personal",
    component: TipoPersonalComponent,
  },
  {
    path: "tipo-turno",
    component: TipoTurnoComponent,
  },

  {
      path: "grupo-etario",
      component: GrupoEtarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimentosRoutingModule {}
