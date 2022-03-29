import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaLaboratorioComponent} from './component/lista-laboratorio/lista-laboratorio.component';
import {laboratorioRoutingModule} from "./laboratorio-routing.module";
import {ToolbarModule} from "primeng/toolbar";
import {PrimeModule} from "../shared/prime/prime.module";
import { LabInmunologiaComponent } from './component/lab-inmunologia/lab-inmunologia.component';
import { LabHematologiaComponent } from './component/lab-hematologia/lab-hematologia.component';


@NgModule({
    declarations: [
        ListaLaboratorioComponent,
        LabInmunologiaComponent,
        LabHematologiaComponent
    ],
    imports: [
        CommonModule,
        laboratorioRoutingModule,
        ToolbarModule,
        PrimeModule
    ]
})
export class LaboratorioModule {
}
