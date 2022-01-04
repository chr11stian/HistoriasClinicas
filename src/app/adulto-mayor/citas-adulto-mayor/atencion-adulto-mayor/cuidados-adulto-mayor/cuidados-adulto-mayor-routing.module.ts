import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralConsultaAdultoMayorComponent} from "../consulta-adulto-mayor/components/step-general-consulta-adulto-mayor/step-general-consulta-adulto-mayor.component";

const routes: Routes = [
    {
        path: "cuidados",
        component: StepGeneralConsultaAdultoMayorComponent
    },
    {
        path: "cuidados",
        loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/atencion-adulto-mayor/cuidados-adulto-mayor/cuidados-component/cuidados-component.component').then(n => n.CuidadosComponentComponent),

    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CuidadosAdultoMayorRoutingModule { }