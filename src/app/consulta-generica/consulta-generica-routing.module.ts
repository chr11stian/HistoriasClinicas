import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaCitasComponent} from "./components/lista-citas/lista-citas.component";

const routes: Routes = [
  {
    path: "",
    // component: InicioComponent
    // component: DashboardComponent
  },

  {
    path: "lista-consultas/:tipoConsulta",
    component: ListaCitasComponent
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/consulta-generica/components/consulta/consulta.module').then(n => n.ConsultaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaGenericaRoutingModule { }
