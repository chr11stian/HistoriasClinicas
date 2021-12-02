import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanRoutingModule} from './plan-routing.module';
import {PrimeModule} from 'src/app/shared/prime/prime.module';
import {CabeceraComponent} from './component/cabecera/cabecera.component';
import {DatosGeneralesComponent} from './component/datos-generales/datos-generales.component';
import {AntecendentesComponent} from './component/antecendentes/antecendentes.component';
import {PlanAtencionIntegralComponent} from './component/plan-atencion-integral/plan-atencion-integral.component';
import {PersonalComponent} from './component/antecendentes/personal/personal.component';
import {FamiliarComponent} from './component/antecendentes/familiar/familiar.component';
import {ViviendaComponent} from './component/antecendentes/vivienda/vivienda.component';
import {EvaluacionGeneralModule} from './component/evaluacion-general/evaluacion-general.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InmunizacionesComponent} from './component/plan-atencion-integral/inmunizaciones/inmunizaciones.component';
import {ControlCrecimientoComponent} from './component/plan-atencion-integral/control-crecimiento/control-crecimiento.component';
import {DescartesComponent} from './component/plan-atencion-integral/descartes/descartes.component';
import {SuplementacionesMicronutrientesComponent} from './component/plan-atencion-integral/suplementaciones-micronutrientes/suplementaciones-micronutrientes.component';
import {TratamientoSeguimientoAnemiaComponent} from './component/plan-atencion-integral/tratamiento-seguimiento-anemia/tratamiento-seguimiento-anemia.component';
import {SesionesAtencionTempranaComponent} from './component/plan-atencion-integral/sesiones-atencion-temprana/sesiones-atencion-temprana.component';
import { NuevaSesionComponent } from './component/plan-atencion-integral/sesiones-atencion-temprana/nueva-sesion/nueva-sesion.component';
import { EditarSesionComponent } from './component/plan-atencion-integral/sesiones-atencion-temprana/editar-sesion/editar-sesion.component';

@NgModule({
    declarations: [
        DatosGeneralesComponent,
        CabeceraComponent,
        AntecendentesComponent,
        PlanAtencionIntegralComponent,
        PersonalComponent,
        FamiliarComponent,
        ViviendaComponent,
        InmunizacionesComponent,
        ControlCrecimientoComponent,
        DescartesComponent,
        SuplementacionesMicronutrientesComponent,
        TratamientoSeguimientoAnemiaComponent,
        SesionesAtencionTempranaComponent,
        NuevaSesionComponent,
        EditarSesionComponent,
    ],
    exports: [
        InmunizacionesComponent,
        ControlCrecimientoComponent,
        SuplementacionesMicronutrientesComponent,
        TratamientoSeguimientoAnemiaComponent,
        SesionesAtencionTempranaComponent,
        DescartesComponent
    ],
    imports: [
        CommonModule,
        EvaluacionGeneralModule,
        PlanRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class PlanModule {
}
