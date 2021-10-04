import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ColegioProfesionalComponent} from "./component/colegio-profesional/colegio-profesional.component";
import {EspecialidadComponent} from "./component/especialidad/especialidad.component";
import {GrupoEtarioComponent} from "./component/grupo-etario/grupo-etario.component";
import {RolGuardiaComponent} from "./component/rol-guardia/rol-guardia.component";
import {TipoPersonalComponent} from "./component/tipo-personal/tipo-personal.component";
import {TipoTurnoComponent} from "./component/tipo-turno/tipo-turno.component";
import {UbicacionComponent} from "./component/ubicacion/ubicacion.component";


import {DocumentoIdentidadComponent} from "./component/documento-identidad/documento-identidad.component";

import {EtniaComponent} from "./component/etnia/etnia.component";
import {CategoriaEstablecimientoComponent} from "./component/categoria-establecimiento/categoria-establecimiento.component";
import { RedServiciosSaludComponent } from "./component/red-servicios-salud/red-servicios-salud.component";


const routes: Routes = [
    {
        path: "",
        // component: InicioComponent
        // component: DashboardComponent
    },
    {
        path: "dashboard",
        // component: DashboardComponent
    },

    {
        path: "tipo-personal",
        component: TipoPersonalComponent,
    },

    {
        path: "ubicacion",
        component: UbicacionComponent,
    },

    {
        path: "colegio-profesional",
        component: ColegioProfesionalComponent,
    },

    {
        path: "especialidad",
        component: EspecialidadComponent,
    },
    {
        path: "tipo-personal",
        component: TipoPersonalComponent,
    },
    {
        path: "tipo-turno",
        component: TipoTurnoComponent,
    },

    {
        path: "grupo-etario",
        component: GrupoEtarioComponent,
    },

    {
        path: "rol-guardia",
        component: RolGuardiaComponent,
    },
    {
        path: "documento-identidad",
        component: DocumentoIdentidadComponent,
    },
    {
        path: "etnia",
        component: EtniaComponent,
    },
    {
        path: "categoria-establecimiento",
        component: CategoriaEstablecimientoComponent,
    },
    {
        path: "red-servicios-salud",
        component: RedServiciosSaludComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MantenimentosRoutingModule {
}
