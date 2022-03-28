import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaLaboratorioComponent} from './component/lista-laboratorio/lista-laboratorio.component';
import {laboratorioRoutingModule} from "./laboratorio-routing.module";


@NgModule({
    declarations: [
        ListaLaboratorioComponent
    ],
    imports: [
        CommonModule,
        laboratorioRoutingModule
    ]
})
export class LaboratorioModule {
}
