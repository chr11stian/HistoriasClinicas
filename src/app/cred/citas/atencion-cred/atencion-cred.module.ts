import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionCredComponent } from './atencion-cred.component';
import { AtencionCredRoutingModule } from './atencion-cred-routing.module';
import { PrimeModule } from '../../../shared/prime/prime.module';
import { PlanModule } from './plan/plan.module';
import { ConsultaPrincipalModule } from './consulta-principal/consulta-principal.module';
import { ExamenesCredModule } from './examenes-cred/examenes-cred.module';
import { TriajeCredModule } from './triaje-cred/triaje-cred.module'
import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [
    AtencionCredComponent,
  ],
    imports: [
        TriajeCredModule,
        ExamenesCredModule,
        PlanModule,
        ConsultaPrincipalModule,
        CommonModule,
        AtencionCredRoutingModule,
        PrimeModule,
        RippleModule
    ]
})
export class AtencionCredModule { }
