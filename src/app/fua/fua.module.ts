import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseguradoUsuarioComponent } from './asegurado-usuario/asegurado-usuario.component';
import {StepFuaComponent} from "./step-fua/step-fua.component";
import {PrimeModule} from "../shared/prime/prime.module";
import {FuaRoutingModule} from "./fua-routing.module";
import {IpressComponent} from "./ipress/ipress.component";
import { AtenionComponent } from './atenion/atenion.component';
import { ConceptoPrestacionalComponent } from './concepto-prestacional/concepto-prestacional.component';
import { SRefiereContrarefiereComponent } from './s-refiere-contrarefiere/s-refiere-contrarefiere.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';
import { ListarFuaComponent } from './listar-fua/listar-fua.component';



@NgModule({
  declarations: [
    IpressComponent,
    AseguradoUsuarioComponent,
    StepFuaComponent,
    AtenionComponent,
    ConceptoPrestacionalComponent,
    SRefiereContrarefiereComponent,
    DiagnosticoComponent,
    ListarFuaComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FuaRoutingModule,
  ]
})
export class FuaModule { }
