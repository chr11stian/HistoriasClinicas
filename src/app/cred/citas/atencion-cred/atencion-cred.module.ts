import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionCredComponent } from './atencion-cred.component';
import { AtencionCredRoutingModule } from './atencion-cred-routing.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { PlanModule } from './plan/plan.module';
import { ConsultaPrincipalModule } from './consulta-principal/consulta-principal.module';
import { ExamenesCredModule } from './examenes-cred/examenes-cred.module';

@NgModule({
  declarations: [
    AtencionCredComponent
  ],
  imports: [
    ExamenesCredModule,
    PlanModule,
    ConsultaPrincipalModule,
    CommonModule,
    AtencionCredRoutingModule,
    PrimeModule
  ]
})
export class AtencionCredModule { }
