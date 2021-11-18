import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { ConsultaCredComponent } from './citas/consulta-cred/consulta-cred.component'
import { ConsultaCredGeneralComponent } from './consulta-cred-general/consulta-cred-general.component';

const routes: Routes = [
  {
    path: "citas",
    component: CitasComponent
  },
  {
    path: "consulta",
    component: ConsultaCredComponent
  },
  {
    path: "consulta-cred-general",
    component: ConsultaCredGeneralComponent
  },
  {
    path: "citas",
    loadChildren: () => import('src/app/cred/cred.module').then(n => n.CredModule),

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredRoutingModule { }
