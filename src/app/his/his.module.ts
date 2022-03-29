import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "../shared/prime/prime.module";

import { ListarHisComponent } from './listar-his/listar-his.component';
import { HisComponent } from './his/his.component';
import {HisRoutingModule} from "./his-routing.module";

@NgModule({
  declarations: [
  
    ListarHisComponent,
    HisComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    HisRoutingModule
  ]
})
export class HisModule { }
