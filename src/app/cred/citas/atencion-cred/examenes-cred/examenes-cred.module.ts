import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenesCredRoutingModule } from './examenes-cred-routing.module';
import { ExamenesCredComponent } from './component/examenes-cred/examenes-cred.component';


@NgModule({
  declarations: [
    ExamenesCredComponent
  ],
  imports: [
    CommonModule,
    ExamenesCredRoutingModule
  ]
})
export class ExamenesCredModule { }
