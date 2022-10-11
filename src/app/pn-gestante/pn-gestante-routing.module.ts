import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PnGestanteComponent } from './components/pn-gestante/pn-gestante.component';

const routes: Routes = [
  {
    path:'mantenimiento',
    component:PnGestanteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PnGestanteRoutingModule { }
