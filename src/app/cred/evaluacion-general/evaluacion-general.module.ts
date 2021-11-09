import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "src/app/shared/prime/prime.module";
import {FieldsetModule} from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EvaluacionAlimentacionComponent } from './evaluacion-alimentacion/evaluacion-alimentacion.component';
import { EscalaEvaluacionEEDPComponent } from './escala-evaluacion-eedp/escala-evaluacion-eedp.component';
import { EEDPComponent } from './eedp/eedp.component';
import { EvaluacionGeneralComponent } from './evaluacion-general.component';
import { CabeceraEvaGnrlComponent } from './cabecera-eva-gnrl/cabecera-eva-gnrl.component';

@NgModule({
  declarations: [
    EvaluacionAlimentacionComponent,
    EscalaEvaluacionEEDPComponent,
    EEDPComponent,
    EvaluacionGeneralComponent,
    CabeceraEvaGnrlComponent
  ],
  imports: [
    PrimeModule,
    FieldsetModule,
    TabViewModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EvaluacionGeneralModule { }
