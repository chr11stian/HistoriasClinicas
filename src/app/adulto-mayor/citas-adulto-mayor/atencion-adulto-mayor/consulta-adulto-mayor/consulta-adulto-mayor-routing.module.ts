import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepGeneralConsultaAdultoMayorComponent} from "./components/step-general-consulta-adulto-mayor/step-general-consulta-adulto-mayor.component";

const routes: Routes = [
    {
        path: "consulta",
        component: StepGeneralConsultaAdultoMayorComponent
    },
    // {
    //     path: "consulta",
    //     loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/atencion-adulto-mayor/consulta-adulto-mayor/consulta-adulto-mayor.module').then(n => n.ConsultaAdultoMayorModule),
    //
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultaAdultoMayorRoutingModule { }