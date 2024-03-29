import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoPersonalComponent } from "./component/tipo-personal/tipo-personal.component";
import { CoreModule } from "../core/core.module";
import { MantenimentosRoutingModule } from "./mantenimentos-routing.module";
import { PrimeModule } from "../shared/prime/prime.module";
import { TipoPersonalModalComponent } from "./component/tipo-personal-modal/tipo-personal-modal.component";
import { UbicacionComponent } from "./component/ubicacion/ubicacion.component";
import { ToolbarModule } from "primeng/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ColegioProfesionalComponent } from "./component/colegio-profesional/colegio-profesional.component";
import { TreeSelectModule } from "primeng/treeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { EspecialidadComponent } from "./component/especialidad/especialidad.component";
import { TipoTurnoComponent } from "./component/tipo-turno/tipo-turno.component";
import { TipoTurnoModalComponent } from "./component/tipo-turno-modal/tipo-turno-modal.component";
import { GrupoEtarioComponent } from "./component/grupo-etario/grupo-etario.component";
import { DocumentoIdentidadComponent } from "./component/documento-identidad/documento-identidad.component";
import { EtniaComponent } from "./component/etnia/etnia.component";
import { CategoriaEstablecimientoComponent } from "./component/categoria-establecimiento/categoria-establecimiento.component";
import { RedServiciosSaludComponent } from "./component/red-servicios-salud/red-servicios-salud.component";
import { NombreComercialUPSComponent } from "./component/nombre-comercial-ups/nombre-comercial-ups.component";
import { CondicionPacienteComponent } from "./component/condicion-paciente/condicion-paciente.component";
import { CondicionPacienteRiesgoComponent } from "./component/condicion-paciente-riesgo/condicion-paciente-riesgo.component";
import { TipoUpsComponent } from "./component/tipo-ups/tipo-ups.component";
import { TipoUpsModalComponent } from "./component/tipo-ups-modal/tipo-ups-modal.component";
import { TipoSeguroComponent } from "./component/tipo-seguro/tipo-seguro.component";
import { CondicionPacienteDiscapacidadComponent } from "./component/condicion-paciente-discapacidad/condicion-paciente-discapacidad.component";
import { CondicionPacienteDiscapacidadModalComponent } from "./component/condicion-paciente-discapacidad-modal/condicion-paciente-discapacidad-modal.component";
import { TipoContratoComponent } from "./component/tipo-contrato/tipo-contrato.component";
import { UpsComponent } from "./component/ups/ups.component";
import { DividerModule } from "primeng/divider";
import { UnidadEjecutoraComponent } from './component/unidad-ejecutora/unidad-ejecutora.component';
import { PrestacionComponent } from './component/prestacion/prestacion.component';
import { DiagnosticoComponent } from './component/diagnostico/diagnostico.component';
import {AntecedentesPacienteComponent} from "./component/antecedentes-paciente/antecedentes-paciente.component";
import { MedicamentosComponent } from './component/medicamentos/medicamentos.component';
import {FileUploadModule} from "primeng/fileupload";
import { ModalMedicamentosComponent } from './component/medicamentos/modal-medicamentos/modal-medicamentos.component';
import { ModalAntecedentesComponent } from './component/antecedentes-paciente/modal-antecedentes/modal-antecedentes.component';
import { ProcedimientoComponent } from './component/procedimiento/procedimiento.component';
import { UpsAuxIpressComponent } from './component/ups-aux-ipress/ups-aux-ipress.component';
import { LaboratorioComponent } from './component/laboratorio/laboratorio.component';
import { HisCrudComponent } from './component/his-crud/his-crud.component';

@NgModule({
  declarations: [
    TipoPersonalComponent,
    TipoPersonalModalComponent,
    UbicacionComponent,
    ColegioProfesionalComponent,
    EspecialidadComponent,
    TipoTurnoComponent,
    TipoTurnoModalComponent,
    GrupoEtarioComponent,
    DocumentoIdentidadComponent,
    EtniaComponent,
    CategoriaEstablecimientoComponent,
    RedServiciosSaludComponent,
    NombreComercialUPSComponent,
    CondicionPacienteComponent,
    CondicionPacienteRiesgoComponent,
    TipoUpsComponent,
    TipoUpsModalComponent,
    TipoSeguroComponent,
    CondicionPacienteDiscapacidadComponent,
    CondicionPacienteDiscapacidadModalComponent,
    TipoContratoComponent,
    UpsComponent,
    UnidadEjecutoraComponent,
    PrestacionComponent,
    DiagnosticoComponent,
    AntecedentesPacienteComponent,
    MedicamentosComponent,
    ModalMedicamentosComponent,
    ModalAntecedentesComponent,
    ProcedimientoComponent,
    UpsAuxIpressComponent,
    LaboratorioComponent,
    HisCrudComponent
  ],

  exports: [TipoPersonalComponent, UbicacionComponent],

  imports: [
    CommonModule,
    CoreModule,
    MantenimentosRoutingModule,
    PrimeModule,
    ToolbarModule,
    FormsModule,
    TreeSelectModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DividerModule,
    FileUploadModule,
  ],
})
export class MantenimientosModule {}
