import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanAtencionAdolescenteRoutingModule} from './plan-atencion-adolescente-routing.module';
import {CabeceraAdolescenteComponent} from './components/cabecera-adolescente/cabecera-adolescente.component';
import {ListaProblemasAdolescenteComponent} from './components/lista-problemas-adolescente/lista-problemas-adolescente.component';
import {DatosGeneralesAdolescenteComponent} from './components/datos-generales-adolescente/datos-generales-adolescente.component';
import {PlanAtencionAdolescenteComponent} from './components/plan-atencion-adolescente/plan-atencion-adolescente.component';
import {AntecedentesAdolescenteComponent} from './components/antecedentes-adolescente/antecedentes-adolescente.component';
import {SaludAdolescenteComponent} from './components/salud-adolescente/salud-adolescente.component';
import {SharedModule} from "../../../shared/shared.module";
import {PrimeModule} from "../../../shared/prime/prime.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        CabeceraAdolescenteComponent,
        ListaProblemasAdolescenteComponent,
        DatosGeneralesAdolescenteComponent,
        PlanAtencionAdolescenteComponent,
        AntecedentesAdolescenteComponent,
        SaludAdolescenteComponent
    ],
    imports: [
        SharedModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PlanAtencionAdolescenteRoutingModule
    ]
})
export class PlanAtencionAdolescenteModule {
}
