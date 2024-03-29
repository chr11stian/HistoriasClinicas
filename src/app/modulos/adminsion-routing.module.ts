import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonalSaludComponent } from "./personal-salud/personal-salud.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { IpressComponent } from "./ipress/ipress.component";
import { PacienteComponent } from "./paciente/paciente.component";
import { IpressTurnosComponent } from "./ipress-turnos/ipress-turnos.component";
import { IpressAmbientesComponent } from "./ipress-ambientes/ipress-ambientes.component";
import { IpressRolesComponent } from "./ipress-roles/ipress-roles.component";
import { TabViewComponent } from "./admision/tab-view/tab-view.component";
import { IpressHorariosComponent } from "./ipress-horarios/ipress-horarios.component";
import { IpressTarifarioComponent } from "./ipress-tarifario/ipress-tarifario.component";
import { IpressFarmaciaComponent } from "./ipress-farmacia/component/ipress-farmacia.component";
import { HisComponent } from "./his/his.component";
import { IpressLaboratorioComponent } from "./ipress-laboratorio/ipress-laboratorio.component";
import { CentroPobladoComponent } from "./centro-poblado/centro-poblado.component";
import { ConsultaComponent } from "./../modulos/admision/consulta/consulta.component";
import { ConsultaLabComponent } from "./../modulos/admision/consulta-lab/consulta-lab.component";

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
        path: "personal-salud",
        component: PersonalSaludComponent,
        // loadChildren: () => import('src/app/historia/historia.module').then(n => n.HistoriaModule),
    },
    {
        path: "centro-poblado",
        component: CentroPobladoComponent,
    },
    {
        path: "usuarios",
        component: UsuariosComponent,
    },
    // {
    //     path: "cupos1",
    //     component: CuposComponent
    // },
    {
        path: "atenciones",
        component: TabViewComponent,
    },

    {
        path: "ipress",
        component: IpressComponent,
    },
    {
        path: "paciente",
        component: PacienteComponent,
    },
    {
        path: "ipress-turnos",
        component: IpressTurnosComponent,
    },
    {
        path: "ipress-roles",
        component: IpressRolesComponent,
    },
    {
        path: "ipress-ambientes",
        component: IpressAmbientesComponent,
    },
    {
        path: "ipress-horarios",
        component: IpressHorariosComponent,
    },
    {
        path: "ipress-tarifario",
        component: IpressTarifarioComponent,
    },
    {
        path: "ipress-farmacia",
        component: IpressFarmaciaComponent,
    },
    {
        path: "ipress-his",
        component: HisComponent,
    },
    {
        path: "ipress-laboratorio",
        component: IpressLaboratorioComponent,
    },
    {
        path: "consulta",
        component: ConsultaComponent,
    },
    {
        path: "consultalab",
        component: ConsultaLabComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminsionRoutingModule {}
