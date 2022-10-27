import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColegioProfesionalComponent } from "./component/colegio-profesional/colegio-profesional.component";
import { EspecialidadComponent } from "./component/especialidad/especialidad.component";
import { GrupoEtarioComponent } from "./component/grupo-etario/grupo-etario.component";

import { TipoPersonalComponent } from "./component/tipo-personal/tipo-personal.component";
import { TipoTurnoComponent } from "./component/tipo-turno/tipo-turno.component";
import { UbicacionComponent } from "./component/ubicacion/ubicacion.component";

import { TipoUpsComponent } from "./component/tipo-ups/tipo-ups.component";
import { DocumentoIdentidadComponent } from "./component/documento-identidad/documento-identidad.component";

import { EtniaComponent } from "./component/etnia/etnia.component";
import { CategoriaEstablecimientoComponent } from "./component/categoria-establecimiento/categoria-establecimiento.component";
import { RedServiciosSaludComponent } from "./component/red-servicios-salud/red-servicios-salud.component";

import { NombreComercialUPSComponent } from "./component/nombre-comercial-ups/nombre-comercial-ups.component";

import { CondicionPacienteComponent } from "./component/condicion-paciente/condicion-paciente.component";
import {} from "./component/condicion-paciente/condicion-paciente.component";
import { CondicionPacienteRiesgoComponent } from "./component/condicion-paciente-riesgo/condicion-paciente-riesgo.component";
import { TipoSeguroComponent } from "./component/tipo-seguro/tipo-seguro.component";
import { UpsComponent } from "./component/ups/ups.component";
import { CondicionPacienteDiscapacidadComponent } from "./component/condicion-paciente-discapacidad/condicion-paciente-discapacidad.component";
import { TipoContratoComponent } from "./component/tipo-contrato/tipo-contrato.component";
import { UnidadEjecutoraComponent } from "./component/unidad-ejecutora/unidad-ejecutora.component";
import {PrestacionComponent} from "./component/prestacion/prestacion.component";
import {AntecedentesPacienteComponent} from "./component/antecedentes-paciente/antecedentes-paciente.component";
import {MedicamentosComponent} from "./component/medicamentos/medicamentos.component";
import {UpsAuxIpressComponent} from "./component/ups-aux-ipress/ups-aux-ipress.component";
import { LaboratorioComponent } from "./component/laboratorio/laboratorio.component";
import { HisCrudComponent } from "./component/his-crud/his-crud.component";

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
    path: "tipo-turno",
    component: TipoTurnoComponent,
  },

  {
    path: "grupo-etario",
    component: GrupoEtarioComponent,
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
    path: "nombre-comercial-ups",
    component: NombreComercialUPSComponent,
  },
  {
    path: "condicion-paciente",
    component: CondicionPacienteComponent,
  },
  {
    path: "condicion-paciente-riesgo",
    component: CondicionPacienteRiesgoComponent,
  },
  {
    path: "tipo-seguro",
    component: TipoSeguroComponent,
  },
  {
    path: "red-servicios-salud",
    component: RedServiciosSaludComponent,
  },
  {
    path: "tipo-ups",
    component: TipoUpsComponent,
  },
  {
    path: "ups",
    component: UpsComponent,
  },
  {
    path: "ups-aux",
    component: UpsAuxIpressComponent,
  },
  {
    path: "condicion-paciente-discapacidad",
    component: CondicionPacienteDiscapacidadComponent,
  },
  {
    path: "tipo-contrato",
    component: TipoContratoComponent,
  },
  {
    path: "unidad-ejecutora",
    component: UnidadEjecutoraComponent,
  },
  {
    path: "antecedentes-paciente",
    component: AntecedentesPacienteComponent,
  },
  {
    path: "medicamentos",
    component: MedicamentosComponent,
  },
  {
    path: "prestacion",
    component: PrestacionComponent,
  },
  {
    path: "laboratorio",
    component: LaboratorioComponent,
  },
  {
    path:"his-crud",
    component: HisCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimentosRoutingModule {}
