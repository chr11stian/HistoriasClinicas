import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenesCredComponent } from './component/examenes-cred/examenes-cred.component';

const routes: Routes = [
  {
    path: "examenes",
    component: ExamenesCredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesCredRoutingModule { }
