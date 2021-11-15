import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseguradoUsuarioComponent } from './asegurado-usuario/asegurado-usuario.component';
import {StepFuaComponent} from "./step-fua/step-fua.component";
import {PrimeModule} from "../shared/prime/prime.module";
import {FuaRoutingModule} from "./fua-routing.module";
import {IpressComponent} from "./ipress/ipress.component";



@NgModule({
  declarations: [
    IpressComponent,
    AseguradoUsuarioComponent,
    StepFuaComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FuaRoutingModule,
  ]
})
export class FuaModule { }
