import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanAtencionIntegralComponent } from './plan-atencion-integral.component'
import {InmunizacionesComponent} from './inmunizaciones/inmunizaciones.component';
import {ControlCrecimientoComponent} from './control-crecimiento/control-crecimiento.component';
import {DescartesComponent} from './descartes/descartes.component';
import {SuplementacionesMicronutrientesComponent} from './suplementaciones-micronutrientes/suplementaciones-micronutrientes.component';
import {TratamientoSeguimientoAnemiaComponent} from './tratamiento-seguimiento-anemia/tratamiento-seguimiento-anemia.component';
import {SesionesAtencionTempranaComponent} from './sesiones-atencion-temprana/sesiones-atencion-temprana.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "plan-atencion-integral",
        pathMatch: "full"
    },
    {
        path: "plan-atencion-integral",
        component: PlanAtencionIntegralComponent,
        children: [
            { 
                path: "inmunizaciones",
                component: InmunizacionesComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredRoutingModule { }