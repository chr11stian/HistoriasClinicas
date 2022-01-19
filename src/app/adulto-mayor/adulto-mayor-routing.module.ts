import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasAdultoMayorComponent } from './citas-adulto-mayor/citas-adulto-mayor.component';
import {AtencionAdultoMayorModule} from "./citas-adulto-mayor/atencion-adulto-mayor/atencion-adulto-mayor.module";

const routes: Routes = [
  {
    path: "citas",
    component: CitasAdultoMayorComponent
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto-mayor/adulto-mayor.module').then(n => n.AdultoMayorModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/atencion-adulto-mayor/consulta-adulto-mayor/consulta-adulto-mayor.module').then(n => n.ConsultaAdultoMayorModule),
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/atencion-adulto-mayor/atencion-adulto-mayor.module').then(n => n.AtencionAdultoMayorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdultoMayorRoutingModule { }
