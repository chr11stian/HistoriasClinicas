import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from "src/app/shared/prime/prime.module";
import { CredRoutingModule } from './cred-routing.module';
import { CitasComponent } from './citas/citas.component';
import { ConsultaCredComponent } from './citas/consulta-cred/consulta-cred.component';
import { ConsultaCredGeneralComponent } from './consulta-cred-general/consulta-cred-general.component';
import { AtencionCredModule } from './citas/atencion-cred/atencion-cred.module';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    CitasComponent,
    ConsultaCredComponent,
    ConsultaCredGeneralComponent,
  ],
  imports: [
    PrimeModule,
    CommonModule,
    CredRoutingModule,
    AtencionCredModule,
    PaginatorModule,
  ]
})
export class CredModule { }
