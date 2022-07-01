import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionAdultoMayorComponent } from './atencion-adulto-mayor.component';
import {PrimeModule} from "../../../shared/prime/prime.module";
import {CuidadosAdultoMayorModule} from "./cuidados-adulto-mayor/cuidados-adulto-mayor.module";
import {PlanAtencionAdultoMayorModule} from "./plan-atencion-adulto-mayor/plan-atencion-adulto-mayor.module";
import {AtencionAdultoMayorRoutingModule} from "./atencion-adulto-mayor-routing.module";
import {ConsultaAdultoMayorRoutingModule} from "./consulta-adulto-mayor/consulta-adulto-mayor-routing.module";



@NgModule({
  declarations: [
    AtencionAdultoMayorComponent
  ],
  imports: [
    CuidadosAdultoMayorModule,
    ConsultaAdultoMayorRoutingModule,
    PlanAtencionAdultoMayorModule,
    AtencionAdultoMayorRoutingModule,
    CommonModule,
    PrimeModule
  ]
})
export class AtencionAdultoMayorModule { }
