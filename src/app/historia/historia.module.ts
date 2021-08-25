import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaRoutingModule } from './historia-routing.module';
import { PersonalSaludComponent } from './personal-salud/personal-salud.component';


@NgModule({
  declarations: [
    PersonalSaludComponent
  ],
  imports: [
    CommonModule,
    HistoriaRoutingModule
  ]
})
export class HistoriaModule { }
