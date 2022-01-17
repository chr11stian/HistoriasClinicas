import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {PrimeModule} from "../../../../shared/prime/prime.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CuidadosAdultoMayorRoutingModule} from "./cuidados-adulto-mayor-routing.module";
import { CuidadosComponentComponent } from './cuidados-component/cuidados-component.component';
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    CuidadosComponentComponent
  ],
  imports: [
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CuidadosAdultoMayorRoutingModule,
    RippleModule
  ]
})
export class CuidadosAdultoMayorModule { }
