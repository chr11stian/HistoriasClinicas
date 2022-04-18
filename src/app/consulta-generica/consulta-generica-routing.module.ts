import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaCitasComponent} from "./components/lista-citas/lista-citas.component";
import {ListaConsultaComponent} from "./components/lista-consulta/lista-consulta.component";

let routes: Routes;
routes = [
  {
    path: "",
    // component: InicioComponent
    // component: DashboardComponent
  },
  {
    path: "lista-cita/lista-consulta",
    component: ListaConsultaComponent
  },

  {
    path: "lista-cita/:tipoConsulta",
    component: ListaCitasComponent,

  },
  {
    path: "consulta",
    loadChildren: () => import('src/app/consulta-generica/components/consulta/consulta.module').then(n => n.ConsultaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaGenericaRoutingModule { }
