import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionCredComponent } from './atencion-cred.component';
import { AtencionCredRoutingModule } from './atencion-cred-routing.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { PlanModule } from './plan/plan.module';

@NgModule({
  declarations: [
    AtencionCredComponent
  ],
  imports: [
    PlanModule,
    CommonModule,
    AtencionCredRoutingModule,
    PrimeModule
  ]
})
export class AtencionCredModule { }
