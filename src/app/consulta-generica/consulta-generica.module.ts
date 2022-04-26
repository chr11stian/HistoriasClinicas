import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaGenericaRoutingModule } from './consulta-generica-routing.module';
import {ListaCitasComponent} from "./components/lista-citas/lista-citas.component";
import {PrimeModule} from "../shared/prime/prime.module";
import { ListaConsultaComponent } from './components/lista-consulta/lista-consulta.component';


@NgModule({
  declarations: [
    ListaCitasComponent,
    ListaConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultaGenericaRoutingModule,
    PrimeModule
  ]
})
export class ConsultaGenericaModule { }
