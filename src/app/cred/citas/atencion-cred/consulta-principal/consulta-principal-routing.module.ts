import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TestDesarrolloComponent } from '../plan/component/evaluacion-general/test-desarrollo/test-desarrollo.component';
import { TestTepsiComponent } from '../plan/component/evaluacion-general/test-tepsi/test-tepsi.component';
import {EvaluacionesConsultaComponent} from './component/evaluaciones-consulta/evaluaciones-consulta.component';
import {PlanControlConsultaComponent} from './component/plan-control-consulta/plan-control-consulta.component';
import {StepGeneralComponent} from './component/step-general/step-general.component';
import {EEDPComponent} from "../plan/component/evaluacion-general/eedp/eedp.component";
import {EvaluacionAlimentacionComponent} from "../plan/component/evaluacion-general/evaluacion-alimentacion/evaluacion-alimentacion.component";

const routes: Routes = [
    {
        path: "consulta-principal",
        component: StepGeneralComponent
    },
    {
        path: "plan-control-consulta",
        component: PlanControlConsultaComponent
    },
    {
        path: "evaluaciones-consulta",
        component: EvaluacionesConsultaComponent
    },
    {
        path: "test-tepsi-consulta",
        component: TestTepsiComponent
    },
    {
        path: "test-desarrollo-consulta",
        component: TestDesarrolloComponent
    },
    {
        path: "test-eedp-consulta",
        component: EEDPComponent
    },
    {
        path: "test-evaluacion-alimenticia-consulta",
        component: EvaluacionAlimentacionComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultaPrincipalRoutingModule {
}
