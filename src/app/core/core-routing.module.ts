import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrincipalComponent} from './layout-principal/layout-principal.component'
import { InicioComponent} from './inicio/inicio.component'
// Modulos

const routes: Routes = [
  {
    path: "",
    component: LayoutPrincipalComponent,
    children: [
      {
        path: "",
        redirectTo: "inicio",
        pathMatch: "full"
      },
      {
        path: "inicio",
        component: InicioComponent,
      },
      // {
      //   path: "perfil",
      //   component: PerfilComponent,
      // },
      // {
      //   path: "password",
      //   component: PerfilPassComponent
      // },
      {
        path: "rol",
        loadChildren: () => import('src/app/rol/rol.module').then(n => n.RolModule),
      },
      {
        path: "historia",
        loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
