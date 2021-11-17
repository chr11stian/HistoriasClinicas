import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {DatosGeneralesComponent} from './datos-generales/datos-generales.component'
import {CabeceraComponent} from './cabecera/cabecera.component'
import {AntecendentesComponent} from './antecendentes/antecendentes.component'
import {PlanAtencionIntegralComponent} from './plan-atencion-integral/plan-atencion-integral.component'
import {TestDesarrolloComponent} from './test-desarrollo/test-desarrollo.component'
import {PersonalComponent} from './antecendentes/personal/personal.component'
import {FamiliarComponent} from './antecendentes/familiar/familiar.component'
import {ViviendaComponent} from './antecendentes/vivienda/vivienda.component'
import {PrimeModule} from '../shared/prime/prime.module'
import {CredRoutingModule} from './cred-routing.module'
import {TabViewModule} from 'primeng/tabview'
import {FieldsetModule} from 'primeng/fieldset'
import {InputTextModule} from 'primeng/inputtext'
import {SelectButtonModule} from 'primeng/selectbutton'
import {DropdownModule} from 'primeng/dropdown'
import {EvaluacionGeneralModule} from './evaluacion-general/evaluacion-general.module'
import {SharedModule} from '../shared/shared.module'
import {RippleModule} from 'primeng/ripple';
import { WeightChartComponent } from './modals/weight-chart/weight-chart.component';
import { HeightChartComponent } from './modals/height-chart/height-chart.component';
import { HeightWeightComponent } from './modals/height-weight/height-weight.component'


@NgModule({
    declarations: [
        DatosGeneralesComponent,
        CabeceraComponent,
        AntecendentesComponent,
        PlanAtencionIntegralComponent,
        TestDesarrolloComponent,
        PersonalComponent,
        FamiliarComponent,
        ViviendaComponent,
        WeightChartComponent,
        HeightChartComponent,
        HeightWeightComponent,

    ],
    imports: [
        PrimeModule,
        CommonModule,
        CredRoutingModule,
        TabViewModule,
        FieldsetModule,
        InputTextModule,
        SelectButtonModule,
        DropdownModule,
        EvaluacionGeneralModule,
        SharedModule,
        RippleModule
    ]
})
export class CredModule {
}
