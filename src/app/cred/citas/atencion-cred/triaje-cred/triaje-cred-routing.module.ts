import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TriajeCredComponent} from './component/triaje-cred/triaje-cred.component';

const routes: Routes = [
    {
        path: "triaje",
        component: TriajeCredComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TriajeCredRoutingModule {
}
