import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeModule} from "src/app/shared/prime/prime.module";
import {FieldsetModule} from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { CredRoutingModule } from './cred-routing.module';
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AntecendentesComponent } from './antecendentes/antecendentes.component';
import { PlanAtencionIntegralComponent } from './plan-atencion-integral/plan-atencion-integral.component';
import { TestDesarrolloComponent } from './test-desarrollo/test-desarrollo.component';
import { PersonalComponent } from './antecendentes/personal/personal.component';
import { FamiliarComponent } from './antecendentes/familiar/familiar.component';
import { ViviendaComponent } from './antecendentes/vivienda/vivienda.component';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { EvaluacionGeneralModule } from './evaluacion-general/evaluacion-general.module';


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
    EvaluacionGeneralModule
  ]
})
export class CredModule { }
