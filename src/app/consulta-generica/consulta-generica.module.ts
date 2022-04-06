import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaGenericaRoutingModule } from './consulta-generica-routing.module';
import {ListaCitasComponent} from "./components/lista-citas/lista-citas.component";
import {PrimeModule} from "../shared/prime/prime.module";


@NgModule({
  declarations: [
    ListaCitasComponent
  ],
  imports: [
    CommonModule,
    ConsultaGenericaRoutingModule,
    PrimeModule
  ]
})
export class ConsultaGenericaModule { }
