import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AtencionAdultoMayorComponent} from "./atencion-adulto-mayor.component";
const routes: Routes = [
    {
        path: "atencion",
        component:AtencionAdultoMayorComponent,
    },
    {
      path: "atencion",
      loadChildren: () => import('src/app/adulto-mayor/citas-adulto-mayor/atencion-adulto-mayor/atencion-adulto-mayor.module').then(n => n.AtencionAdultoMayorModule),
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtencionAdultoMayorRoutingModule { }
