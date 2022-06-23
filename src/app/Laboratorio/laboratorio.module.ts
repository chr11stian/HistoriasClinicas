import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaLaboratorioComponent} from './component/lista-laboratorio/lista-laboratorio.component';
import {laboratorioRoutingModule} from "./laboratorio-routing.module";
import {ToolbarModule} from "primeng/toolbar";
import {PrimeModule} from "../shared/prime/prime.module";
import { LabInmunologiaComponent } from './component/lab-inmunologia/lab-inmunologia.component';
import { LabHematologiaComponent } from './component/lab-hematologia/lab-hematologia.component';
import { LabParasitologiaComponent } from './component/lab-parasitologia/lab-parasitologia.component';
import { LabOrinaComponent } from './component/lab-orina/lab-orina.component';
import { LabBioquimicaComponent } from './component/lab-bioquimica/lab-bioquimica.component';
import { LabMicrobiologicoComponent } from './component/lab-microbiologico/lab-microbiologico.component';


@NgModule({
    declarations: [
        ListaLaboratorioComponent,
        LabInmunologiaComponent,
        LabHematologiaComponent,
        LabParasitologiaComponent,
        LabOrinaComponent,
        LabBioquimicaComponent,
        LabMicrobiologicoComponent
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
