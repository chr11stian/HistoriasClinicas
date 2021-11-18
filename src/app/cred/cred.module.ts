import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from "src/app/shared/prime/prime.module";
import { CredRoutingModule } from './cred-routing.module';
import { CitasComponent } from './citas/citas.component';
import { ConsultaCredComponent } from './citas/consulta-cred/consulta-cred.component';
import { ConsultaCredGeneralComponent } from './consulta-cred-general/consulta-cred-general.component';
import { AtencionCredModule } from './citas/atencion-cred/atencion-cred.module';
import { PaginatorModule } from 'primeng/paginator';
import { WeightChartComponent } from './modals/weight-chart/weight-chart.component';
import { HeightChartComponent } from './modals/height-chart/height-chart.component';
import { HeightWeightComponent } from './modals/height-weight/height-weight.component'
import {SharedModule} from '../shared/shared.module'
import {RippleModule} from 'primeng/ripple';

@NgModule({
    declarations: [
        CitasComponent,
        ConsultaCredComponent,
        ConsultaCredGeneralComponent,
        WeightChartComponent,
        HeightChartComponent,
        HeightWeightComponent
    ],
    imports: [
        PrimeModule,
        CommonModule,
        CredRoutingModule,
        AtencionCredModule,
        PaginatorModule,
        SharedModule,
        RippleModule
    ]
})
export class CredModule { }
