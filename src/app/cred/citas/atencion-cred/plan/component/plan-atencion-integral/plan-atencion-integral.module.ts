import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from "src/app/shared/prime/prime.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {InmunizacionesComponent} from './inmunizaciones/inmunizaciones.component';
import {ControlCrecimientoComponent} from './control-crecimiento/control-crecimiento.component';
import {DescartesComponent} from './descartes/descartes.component';
import {SuplementacionesMicronutrientesComponent} from './suplementaciones-micronutrientes/suplementaciones-micronutrientes.component';
import {TratamientoSeguimientoAnemiaComponent} from './tratamiento-seguimiento-anemia/tratamiento-seguimiento-anemia.component';
import {SesionesAtencionTempranaComponent} from './sesiones-atencion-temprana/sesiones-atencion-temprana.component';
//visualizaciones como dialog a export
import { NuevaSesionComponent} from './sesiones-atencion-temprana/nueva-sesion/nueva-sesion.component'



@NgModule({
  declarations: [
  NuevaSesionComponent,
  InmunizacionesComponent,
  ControlCrecimientoComponent,
  SuplementacionesMicronutrientesComponent,
  TratamientoSeguimientoAnemiaComponent,
  SesionesAtencionTempranaComponent,
  DescartesComponent 
],
exports: [
  NuevaSesionComponent,
  InmunizacionesComponent,
  ControlCrecimientoComponent,
  SuplementacionesMicronutrientesComponent,
  TratamientoSeguimientoAnemiaComponent,
  SesionesAtencionTempranaComponent,
  DescartesComponent
    
],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule
  ]
})
export class PlanAtencionIntegralModule { }
