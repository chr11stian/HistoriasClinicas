import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from "src/app/shared/prime/prime.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluacionAlimentacionComponent } from './evaluacion-alimentacion/evaluacion-alimentacion.component';
import { EscalaEvaluacionEEDPComponent } from './escala-evaluacion-eedp/escala-evaluacion-eedp.component';
import { EEDPComponent } from './eedp/eedp.component';
import { EvaluacionGeneralComponent } from './evaluacion-general.component';
import { CabeceraEvaGnrlComponent } from './cabecera-eva-gnrl/cabecera-eva-gnrl.component';
import { TestDesarrolloComponent } from './test-desarrollo/test-desarrollo.component';
import { TestTepsiComponent } from './test-tepsi/test-tepsi.component';

@NgModule({
    declarations: [
        EvaluacionAlimentacionComponent,
        EscalaEvaluacionEEDPComponent,
        EEDPComponent,
        EvaluacionGeneralComponent,
        TestDesarrolloComponent,
        CabeceraEvaGnrlComponent,
        TestTepsiComponent,
    ],
    exports: [
        EvaluacionGeneralComponent,
        TestTepsiComponent,
    ],
    imports: [
        PrimeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class EvaluacionGeneralModule { }
