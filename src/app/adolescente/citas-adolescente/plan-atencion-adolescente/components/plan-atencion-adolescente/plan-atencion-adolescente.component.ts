import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PlanAtencionAdolescenteTablasService } from '../../services/plan-atencion-adolescente-tablas/plan-atencion-adolescente-tablas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-plan-atencion-adolescente',
  templateUrl: './plan-atencion-adolescente.component.html',
  styleUrls: ['./plan-atencion-adolescente.component.css']
})
export class PlanAtencionAdolescenteComponent implements OnInit {

  evaluacionesCrecimientoFisico: any[] = [];
  evaluacionCrecimientoFisicoDialog: boolean = false;
  formEvaluacionCrecimientoFisico: FormGroup;
  isUpdateEvaluacionCrecimientoFisico: boolean = false;

  evaluacionesAgudezaVisualAuditiva: any[] = [];
  evaluacionesAgudezaVisualAuditivaDialog: boolean = false;
  formEvaluacionesAgudezaVisualAuditiva: FormGroup;
  isUpdateEvaluacionesAgudezaVisualAuditiva: boolean = false;

  evaluacionesFisicoPostural: any[] = [];
  evaluacionesFisicoPosturalDialog: boolean = false;
  formEvaluacionesFisicoPostural: FormGroup;
  isUpdateEvaluacionesFisicoPostural: boolean = false;

  evaluacionesDesarrolloSexual: any[] = [];
  evaluacionesDesarrolloSexualDialog: boolean = false;
  formEvaluacionesDesarrolloSexual: FormGroup;
  isUpdateEvaluacionesDesarrolloSexual: boolean = false;

  evaluacionesHabilidadesSociales: any[] = [];
  evaluacionesHabilidadesSocialesDialog: boolean = false;
  formEvaluacionesHabilidadesSociales: FormGroup;
  isUpdateEvaluacionesHabilidadesSociales: boolean = false;

  identificacionesColeraIrritabilidadAgresion: any[] = [];
  identificacionesColeraIrritabilidadAgresionDialog: boolean = false;
  formIdentificacionesColeraIrritabilidadAgresion: FormGroup;
  isUpdateIdentificacionesColeraIrritabilidadAgresion: boolean = false;

  tamizajesViolencia: any[] = [];
  tamizajesViolenciaDialog: boolean = false;
  formTamizajesViolencia: FormGroup;
  isUpdateTamizajesViolencia: boolean = false;


  identificacionesFactoresRiesgo: any[] = [];
  identificacionesFactoresRiesgoDialog: boolean = false;
  formIdentificacionesFactoresRiesgo: FormGroup;
  isUpdateIdentificacionesFactoresRiesgo: boolean = false;

  factoresRiesgo: any[] = [];
  factoresRiesgoDialog: boolean = false;
  formFactoresRiesgo: FormGroup;
  isUpdateFactoresRiesgo: boolean = false;

  descartesEnfermedadesNoTransmisibles: any[] = [];
  descartesEnfermedadesNoTransmisiblesDialog: boolean = false;
  formDescartesEnfermedadesNoTransmisibles: FormGroup;
  isUpdateDescartesEnfermedadesNoTransmisibles: boolean = false;

  escolaridades: any[] = [];
  escolaridadesDialog: boolean = false;
  formEscolaridades: FormGroup;
  isUpdateEscolaridades: boolean = false;

  habitos: any[] = [];
  habitosDialog: boolean = false;
  formHabitos: FormGroup;
  isUpdateHabitos: boolean = false;

  saludSexualReproductiva: any[] = [];
  saludSexualReproductivaDialog: boolean = false;
  formSaludSexualReproductiva: FormGroup;
  isUpdateSaludSexualReproductiva: boolean = false;

  nroDoc: string = "10101010";

  constructor(
    private fb: FormBuilder,
    private planAtencionIntegralTablasService: PlanAtencionAdolescenteTablasService
  ) {
    this.inicializarForm();
    this.getTodasLasEvaluaciones();
  }
  inicializarForm() {
    this.formEvaluacionCrecimientoFisico = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formEvaluacionesAgudezaVisualAuditiva = this.fb.group({
      fecha: new FormControl(""),
      visualOD: new FormControl(""),
      visualOI: new FormControl(""),
      auditivaOD: new FormControl(""),
      auditivaOI: new FormControl("")
    })
    this.formEvaluacionesFisicoPostural = this.fb.group({
      fecha: new FormControl(""),
      columna: new FormControl(""),
      rodilla: new FormControl(""),
      pie: new FormControl("")
    })
    this.formEvaluacionesDesarrolloSexual = this.fb.group({
      fecha: new FormControl(""),
      desarrolloMama: new FormControl(""),
      desarrolloPene: new FormControl(""),
      desarrolloVelloPubiano: new FormControl("")
    })
    this.formEvaluacionesHabilidadesSociales = this.fb.group({
      fecha: new FormControl(""),
      autoestima: new FormControl(""),
      comunicacion: new FormControl(""),
      asertividad: new FormControl(""),
      tomaDecisiones: new FormControl(""),
      calificacionTotal: new FormControl("")
    })
    this.formIdentificacionesColeraIrritabilidadAgresion = this.fb.group({
      fecha: new FormControl(""),
      colera: new FormControl(""),
      irritabilidad: new FormControl(""),
      agresion: new FormControl(""),
      calificacionTotal: new FormControl("")
    })
    this.formTamizajesViolencia = this.fb.group({
      fecha: new FormControl(""),
      familiar: new FormControl(""),
      sexual: new FormControl(""),
      politica: new FormControl("")
    })
    this.formIdentificacionesFactoresRiesgo = this.fb.group({
      fecha: new FormControl(""),
    })
    this.formFactoresRiesgo = this.fb.group({
      nombre: new FormControl(""),
      valor: new FormControl("")
    })
    this.formDescartesEnfermedadesNoTransmisibles = this.fb.group({
      fecha: new FormControl(""),
      hematocrito: new FormControl(""),
      colesterolemiaTotal: new FormControl(""),
      glicemia: new FormControl(""),
      examenOrina: new FormControl("")
    })
    this.formEscolaridades = this.fb.group({
      fecha: new FormControl(""),
      asistenciaEscuelaColegio: new FormControl(""),
      rendimientoEscolar: new FormControl(""),
      desercionEscolar: new FormControl("")
    })
    this.formHabitos = this.fb.group({
      fecha: new FormControl(""),
      usoTiempoLibre: new FormControl(""),
      sedentarismo: new FormControl(""),
      usoAlcohol: new FormControl(""),
      usoTabaco: new FormControl(""),
      usoDrogas: new FormControl(""),
      pertenenciaPandillas: new FormControl(""),
    })
    this.formSaludSexualReproductiva = this.fb.group({
      fecha: new FormControl(""),
      parejaEnamorado: new FormControl(""),
      relacionesSexuales: new FormControl(""),
      conductaSexualRiesgo: new FormControl(""),
      dosMasParejas: new FormControl(""),
      sexoSinProteccion: new FormControl(""),
      rsconPersonasDelMismoSexo: new FormControl(""),
      rsconPersonasDelOtroSexo: new FormControl(""),
      usoMetodoAnticonceptivo: new FormControl(""),
      conocimientoPrevenirEmbarazoNoDeseado: new FormControl(""),
      conocimientoPrevenirTransmisionITSVIH: new FormControl("")
    })
  }

  getTodasLasEvaluaciones() {
    this.planAtencionIntegralTablasService.getTodasLasEvaluaciones(this.nroDoc)
      .subscribe((res: any) => {
        let data = res.object;
        this.evaluacionesCrecimientoFisico = data.evaluacionCrecimientoFisicoEstadoNutricional;
        this.evaluacionesAgudezaVisualAuditiva = data.evaluacioAgudezaVisualAgudezaAuditiva;
        this.evaluacionesFisicoPostural = data.evaluacionFisicoPostural;
        this.evaluacionesDesarrolloSexual = data.evaluacionDesarrolloSexual;
        this.evaluacionesHabilidadesSociales = data.evaluacionHabilidadesSociales;
        this.identificacionesColeraIrritabilidadAgresion = data.identificacionColeraIrritabilidadAgresion;
        this.tamizajesViolencia = data.tamizajeViolencia;
        this.identificacionesFactoresRiesgo = data.identificacionFactoresRiesgo;
        this.descartesEnfermedadesNoTransmisibles = data.descarteEnfermedadesNoTransmisibles;
        this.escolaridades = data.escolaridad;
        this.habitos = data.habitos;
        this.saludSexualReproductiva = data.saludSexualReproductiva;
      });
  }
  cancelButton(){
    this.evaluacionCrecimientoFisicoDialog = false;
    this.evaluacionCrecimientoFisicoDialog = false;
    this.evaluacionesAgudezaVisualAuditivaDialog = false;
    this.evaluacionesFisicoPosturalDialog = false;
    this.evaluacionesDesarrolloSexualDialog = false;
    this.evaluacionesHabilidadesSocialesDialog = false;
    this.identificacionesColeraIrritabilidadAgresionDialog = false;
    this.tamizajesViolenciaDialog = false;
    this.identificacionesFactoresRiesgoDialog = false;
    this.descartesEnfermedadesNoTransmisiblesDialog = false;
    this.escolaridadesDialog = false;
    this.habitosDialog = false;
    this.saludSexualReproductivaDialog = false;
  }
  getEvaluacionCrecimientoFisico() {
    this.planAtencionIntegralTablasService.getEvaluacionCrecimientoFisicoEstadoNutricional(this.nroDoc)
      .subscribe((res: any) => {
        let data = res.object;
        this.evaluacionesCrecimientoFisico = data;
      });
  }
  openNewEvaluacionCrecimientoFisico() {
    this.isUpdateEvaluacionCrecimientoFisico = false;
    this.formEvaluacionCrecimientoFisico.reset();
    this.formEvaluacionCrecimientoFisico.get('fecha').setValue("");
    this.formEvaluacionCrecimientoFisico.get('imc').setValue("");
    this.formEvaluacionCrecimientoFisico.get('talla').setValue("");
    this.formEvaluacionCrecimientoFisico.get('edad').setValue("");
    this.formEvaluacionCrecimientoFisico.get('alimentacion').setValue("");
    this.evaluacionCrecimientoFisicoDialog = true;
  }
  saveFormEvaluacionCrecimientoFisico() {
    this.isUpdateEvaluacionCrecimientoFisico = false;
    const req = {
      fecha: this.formEvaluacionCrecimientoFisico.value.fecha,
      imc: this.formEvaluacionCrecimientoFisico.value.imc,
      talla: this.formEvaluacionCrecimientoFisico.value.talla,
      edad: this.formEvaluacionCrecimientoFisico.value.edad,
      alimentacion: this.formEvaluacionCrecimientoFisico.value.alimentacion,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEvaluacionCrecimientoFisicoEstadoNutricional(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Evaluacion crecimiento fisico y estado nutricional',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionCrecimientoFisico();
          this.guardarNuevoEvaluacionCrecimientoFisico();
          this.evaluacionCrecimientoFisicoDialog = false;
        }
      )
    }
  }
  guardarNuevoEvaluacionCrecimientoFisico() {
    this.isUpdateEvaluacionCrecimientoFisico = false;
    this.formEvaluacionCrecimientoFisico.reset();
  }
  editarEvaluacionCrecimientoFisico(rowData) {
    this.isUpdateEvaluacionCrecimientoFisico = true;
    this.formEvaluacionCrecimientoFisico.get('fecha').setValue(rowData.fecha)
    this.formEvaluacionCrecimientoFisico.get('imc').setValue(rowData.imc)
    this.formEvaluacionCrecimientoFisico.get('talla').setValue(rowData.talla)
    this.formEvaluacionCrecimientoFisico.get('edad').setValue(rowData.edad)
    this.formEvaluacionCrecimientoFisico.get('alimentacion').setValue(rowData.alimentacion)
    this.evaluacionCrecimientoFisicoDialog = true;

  }
  editarDatosEvaluacionCrecimientoFisico() {
    const req = {
      fecha: this.formEvaluacionCrecimientoFisico.value.fecha,
      imc: this.formEvaluacionCrecimientoFisico.value.imc,
      talla: this.formEvaluacionCrecimientoFisico.value.talla,
      edad: this.formEvaluacionCrecimientoFisico.value.edad,
      alimentacion: this.formEvaluacionCrecimientoFisico.value.alimentacion,
    }
    this.planAtencionIntegralTablasService.editarEvaluacionCrecimientoFisicoEstadoNutricional(this.nroDoc, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: 'Evaluacion crecimiento fisico y estado nutricional',
          showConfirmButton: false,
          timer: 1000
        })
        this.getEvaluacionCrecimientoFisico();
        this.guardarNuevoEvaluacionCrecimientoFisico();
        this.evaluacionCrecimientoFisicoDialog = false;
      }
    )
  }

 // eval agudeza visual y auditiva
  getEvaluacionAgudezaVisualAuditiva(){
    this.planAtencionIntegralTablasService.getEvaluacionAgudezaVisualAuditiva(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.evaluacionesAgudezaVisualAuditiva=data;
    });
  }
  openNewEvaluacionAgudezaVisualAuditiva() {
    this.isUpdateEvaluacionesAgudezaVisualAuditiva = false;
    this.formEvaluacionesAgudezaVisualAuditiva.reset();
    this.formEvaluacionesAgudezaVisualAuditiva.get('fecha').setValue("");
    this.formEvaluacionesAgudezaVisualAuditiva.get('visualOD').setValue("");
    this.formEvaluacionesAgudezaVisualAuditiva.get('visualOI').setValue("");
    this.formEvaluacionesAgudezaVisualAuditiva.get('auditivaOD').setValue("");
    this.formEvaluacionesAgudezaVisualAuditiva.get('auditivaOI').setValue("");
    this.evaluacionesAgudezaVisualAuditivaDialog = true;
  }
  saveFormEvaluacionAgudezaVisualAuditiva() {
    this.isUpdateEvaluacionesAgudezaVisualAuditiva = false;
    const req = {
      fecha: this.formEvaluacionesAgudezaVisualAuditiva.value.fecha,
      visualOD: this.formEvaluacionesAgudezaVisualAuditiva.value.visualOD,
      visualOI: this.formEvaluacionesAgudezaVisualAuditiva.value.visualOI,
      auditivaOD: this.formEvaluacionesAgudezaVisualAuditiva.value.auditivaOD,
      auditivaOI: this.formEvaluacionesAgudezaVisualAuditiva.value.auditivaOI,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEvaluacionAgudezaVisualAuditiva(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Evaluacion agudeza visual y auditiva',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionAgudezaVisualAuditiva();
          this.guardarNuevoEvaluacionAgudezaVisualAuditiva();
          this.evaluacionesAgudezaVisualAuditivaDialog = false;
        }
      )
    }
  }
  guardarNuevoEvaluacionAgudezaVisualAuditiva() {
    this.isUpdateEvaluacionesAgudezaVisualAuditiva = false;
    this.formEvaluacionesAgudezaVisualAuditiva.reset();
  }
  editarEvaluacionAgudezaVisualAuditiva(rowData) {
    this.isUpdateEvaluacionesAgudezaVisualAuditiva = true;
    this.formEvaluacionesAgudezaVisualAuditiva.get('fecha').setValue(rowData.fecha)
    this.formEvaluacionesAgudezaVisualAuditiva.get('visualOD').setValue(rowData.visualOD)
    this.formEvaluacionesAgudezaVisualAuditiva.get('visualOI').setValue(rowData.visualOI)
    this.formEvaluacionesAgudezaVisualAuditiva.get('auditivaOD').setValue(rowData.auditivaOD)
    this.formEvaluacionesAgudezaVisualAuditiva.get('auditivaOI').setValue(rowData.auditivaOI)
    this.evaluacionesAgudezaVisualAuditivaDialog = true;

  }
  editarDatosEvaluacionAgudezaVisualAuditiva() {
    const req = {
      fecha: this.formEvaluacionesAgudezaVisualAuditiva.value.fecha,
      visualOD: this.formEvaluacionesAgudezaVisualAuditiva.value.visualOD,
      visualOI: this.formEvaluacionesAgudezaVisualAuditiva.value.visualOI,
      auditivaOD: this.formEvaluacionesAgudezaVisualAuditiva.value.auditivaOD,
      auditivaOI: this.formEvaluacionesAgudezaVisualAuditiva.value.auditivaOI,
    }
    this.planAtencionIntegralTablasService.editarEvaluacionAgudezaVisualAuditiva(this.nroDoc, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: 'Evaluacion crecimiento fisico y estado nutricional',
          showConfirmButton: false,
          timer: 1000
        })
        this.getEvaluacionAgudezaVisualAuditiva();
          this.guardarNuevoEvaluacionAgudezaVisualAuditiva();
          this.evaluacionesAgudezaVisualAuditivaDialog = false;
      }
    )
  }

  //eval fisico postural
  getEvaluacionFisicoPostural(){
    this.planAtencionIntegralTablasService.getEvaluacionFisicaPostural(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.evaluacionesFisicoPostural=data;
    });
  }
  openNewEvaluacionFisicoPostural() {
    this.isUpdateEvaluacionesFisicoPostural = false;
    this.formEvaluacionesFisicoPostural.reset();
    this.formEvaluacionesFisicoPostural.get('fecha').setValue("");
    this.formEvaluacionesFisicoPostural.get('columna').setValue("");
    this.formEvaluacionesFisicoPostural.get('rodilla').setValue("");
    this.formEvaluacionesFisicoPostural.get('pie').setValue("");
    this.evaluacionesFisicoPosturalDialog = true;
  }
  saveFormEvaluacionFisicoPostural() {
    this.isUpdateEvaluacionesFisicoPostural = false;
    const req = {
      fecha: this.formEvaluacionesFisicoPostural.value.fecha,
      columna: this.formEvaluacionesFisicoPostural.value.columna,
      rodilla: this.formEvaluacionesFisicoPostural.value.rodilla,
      pie: this.formEvaluacionesFisicoPostural.value.pie,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEvaluacionFisicaPostural(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Evaluacion fisica postural',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionFisicoPostural();
          this.guardarNuevoEvaluacionFisicoPostural();
          this.evaluacionesFisicoPosturalDialog = false;
        }
      )
    }
  }
  guardarNuevoEvaluacionFisicoPostural() {
    this.isUpdateEvaluacionesFisicoPostural = false;
    this.formEvaluacionesFisicoPostural.reset();
  }
  editarEvaluacionFisicoPostural(rowData) {
    this.isUpdateEvaluacionesFisicoPostural = true;
    this.formEvaluacionesFisicoPostural.get('fecha').setValue(rowData.fecha)
    this.formEvaluacionesFisicoPostural.get('columna').setValue(rowData.columna)
    this.formEvaluacionesFisicoPostural.get('rodilla').setValue(rowData.rodilla)
    this.formEvaluacionesFisicoPostural.get('pie').setValue(rowData.pie)
    this.evaluacionesFisicoPosturalDialog = true;

  }
  editarDatosEvaluacionFisicoPostural() {
    const req = {
      fecha: this.formEvaluacionesFisicoPostural.value.fecha,
      columna: this.formEvaluacionesFisicoPostural.value.columna,
      rodilla: this.formEvaluacionesFisicoPostural.value.rodilla,
      pie: this.formEvaluacionesFisicoPostural.value.pie,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarEvaluacionFisicaPostural(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Evaluacion fisica postural',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionFisicoPostural();
          this.guardarNuevoEvaluacionFisicoPostural();
          this.evaluacionesFisicoPosturalDialog = false;
        }
      )
    }
  }

  //eval desarrollo sexual
  getEvaluacionDesarrolloSexual(){
    this.planAtencionIntegralTablasService.getEvaluacionDesarrolloSexual(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.evaluacionesDesarrolloSexual=data;
    });
  }
  openNewEvaluacionDesarrolloSexual() {
    this.isUpdateEvaluacionesDesarrolloSexual = false;
    this.formEvaluacionesDesarrolloSexual.reset();
    this.formEvaluacionesDesarrolloSexual.get('fecha').setValue("");
    this.formEvaluacionesDesarrolloSexual.get('desarrolloMama').setValue("");
    this.formEvaluacionesDesarrolloSexual.get('desarrolloPene').setValue("");
    this.formEvaluacionesDesarrolloSexual.get('desarrolloVelloPubiano').setValue("");
    this.evaluacionesDesarrolloSexualDialog = true;
  }
  saveFormEvaluacionDesarrolloSexual() {
    this.isUpdateEvaluacionesDesarrolloSexual = false;
    const req = {
      fecha: this.formEvaluacionesDesarrolloSexual.value.fecha,
      desarrolloMama: this.formEvaluacionesDesarrolloSexual.value.desarrolloMama,
      desarrolloPene: this.formEvaluacionesDesarrolloSexual.value.desarrolloPene,
      desarrolloVelloPubiano: this.formEvaluacionesDesarrolloSexual.value.desarrolloVelloPubiano
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEvaluacionDesarrolloSexual(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Evaluacion desarrollo sexual',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionDesarrolloSexual();
          this.guardarNuevoEvaluacionDesarrolloSexual();
          this.evaluacionesDesarrolloSexualDialog = false;
        }
      )
    }
  }
  guardarNuevoEvaluacionDesarrolloSexual() {
    this.isUpdateEvaluacionesDesarrolloSexual = false;
    this.formEvaluacionesDesarrolloSexual.reset();
  }
  editarEvaluacionDesarrolloSexual(rowData) {
    this.isUpdateEvaluacionesDesarrolloSexual = true;
    this.formEvaluacionesDesarrolloSexual.get('fecha').setValue(rowData.fecha)
    this.formEvaluacionesDesarrolloSexual.get('desarrolloMama').setValue(rowData.desarrolloMama)
    this.formEvaluacionesDesarrolloSexual.get('desarrolloPene').setValue(rowData.desarrolloPene)
    this.formEvaluacionesDesarrolloSexual.get('desarrolloVelloPubiano').setValue(rowData.desarrolloVelloPubiano)
    this.evaluacionesDesarrolloSexualDialog = true;

  }
  editarDatosEvaluacionDesarrolloSexual() {
    const req = {
      fecha: this.formEvaluacionesDesarrolloSexual.value.fecha,
      desarrolloMama: this.formEvaluacionesDesarrolloSexual.value.desarrolloMama,
      desarrolloPene: this.formEvaluacionesDesarrolloSexual.value.desarrolloPene,
      desarrolloVelloPubiano: this.formEvaluacionesDesarrolloSexual.value.desarrolloVelloPubiano
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarEvaluacionDesarrolloSexual(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Evaluacion desarrollo sexual',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionDesarrolloSexual();
          this.guardarNuevoEvaluacionDesarrolloSexual();
          this.evaluacionesDesarrolloSexualDialog = false;
        }
      )
    }
  }
  //eval habilidades sociales
  getEvaluacionHabilidadesSociales(){
    this.planAtencionIntegralTablasService.getEvaluacionHabilidadesSociales(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.evaluacionesHabilidadesSociales=data;
    });
  }
  openNewEvaluacionHabilidadesSociales() {
    this.isUpdateEvaluacionesHabilidadesSociales = false;
    this.formEvaluacionesHabilidadesSociales.reset();
    this.formEvaluacionesHabilidadesSociales.get('fecha').setValue("");
    this.formEvaluacionesHabilidadesSociales.get('autoestima').setValue("");
    this.formEvaluacionesHabilidadesSociales.get('comunicacion').setValue("");
    this.formEvaluacionesHabilidadesSociales.get('asertividad').setValue("");
    this.formEvaluacionesHabilidadesSociales.get('tomaDecisiones').setValue("");
    this.formEvaluacionesHabilidadesSociales.get('calificacionTotal').setValue("");
    this.evaluacionesHabilidadesSocialesDialog = true;
  }
  saveFormEvaluacionHabilidadesSociales() {
    this.isUpdateEvaluacionesHabilidadesSociales = false;
    const req = {
      fecha: this.formEvaluacionesHabilidadesSociales.value.fecha,
      autoestima: this.formEvaluacionesHabilidadesSociales.value.autoestima,
      comunicacion: this.formEvaluacionesHabilidadesSociales.value.comunicacion,
      asertividad: this.formEvaluacionesHabilidadesSociales.value.asertividad,
      tomaDecisiones: this.formEvaluacionesHabilidadesSociales.value.tomaDecisiones,
      calificacionTotal: this.formEvaluacionesHabilidadesSociales.value.calificacionTotal,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEvaluacionHabilidadesSociales(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Evaluacion habilidades sociales',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionHabilidadesSociales();
          this.guardarNuevoEvaluacionHabilidadesSociales();
          this.evaluacionesHabilidadesSocialesDialog = false;
        }
      )
    }
  }
  guardarNuevoEvaluacionHabilidadesSociales() {
    this.isUpdateEvaluacionesHabilidadesSociales = false;
    this.formEvaluacionesHabilidadesSociales.reset();
  }
  editarEvaluacionHabilidadesSociales(rowData) {
    this.isUpdateEvaluacionesHabilidadesSociales = true;
    this.formEvaluacionesHabilidadesSociales.get('fecha').setValue(rowData.fecha)
    this.formEvaluacionesHabilidadesSociales.get('autoestima').setValue(rowData.autoestima)
    this.formEvaluacionesHabilidadesSociales.get('comunicacion').setValue(rowData.comunicacion)
    this.formEvaluacionesHabilidadesSociales.get('asertividad').setValue(rowData.asertividad)
    this.formEvaluacionesHabilidadesSociales.get('tomaDecisiones').setValue(rowData.tomaDecisiones)
    this.formEvaluacionesHabilidadesSociales.get('calificacionTotal').setValue(rowData.calificacionTotal)
    this.evaluacionesHabilidadesSocialesDialog = true;

  }
  editarDatosEvaluacionHabilidadesSociales() {
    const req = {
      fecha: this.formEvaluacionesHabilidadesSociales.value.fecha,
      autoestima: this.formEvaluacionesHabilidadesSociales.value.autoestima,
      comunicacion: this.formEvaluacionesHabilidadesSociales.value.comunicacion,
      asertividad: this.formEvaluacionesHabilidadesSociales.value.asertividad,
      tomaDecisiones: this.formEvaluacionesHabilidadesSociales.value.tomaDecisiones,
      calificacionTotal: this.formEvaluacionesHabilidadesSociales.value.calificacionTotal,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarEvaluacionHabilidadesSociales(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Evaluacion habilidades sociales',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionHabilidadesSociales();
          this.guardarNuevoEvaluacionHabilidadesSociales();
          this.evaluacionesHabilidadesSocialesDialog = false;
        }
      )
    }
  }
  //identificacion irritabilidad y agresion
  getIdentificacionColeraIrritabilidadAgresion(){
    this.planAtencionIntegralTablasService.getIdentificacionColeraIrritabilidadAgresion(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.identificacionesColeraIrritabilidadAgresion=data;
    });
  }
  openNewIdentificacionColeraIrritabilidadAgresion() {
    this.isUpdateIdentificacionesColeraIrritabilidadAgresion = false;
    this.formIdentificacionesColeraIrritabilidadAgresion.reset();
    this.formIdentificacionesColeraIrritabilidadAgresion.get('fecha').setValue("");
    this.formIdentificacionesColeraIrritabilidadAgresion.get('colera').setValue("");
    this.formIdentificacionesColeraIrritabilidadAgresion.get('irritabilidad').setValue("");
    this.formIdentificacionesColeraIrritabilidadAgresion.get('agresion').setValue("");
    this.formIdentificacionesColeraIrritabilidadAgresion.get('calificacionTotal').setValue("");
    this.identificacionesColeraIrritabilidadAgresionDialog = true;
  }
  saveFormIdentificacionColeraIrritabilidadAgresion() {
    this.isUpdateIdentificacionesColeraIrritabilidadAgresion = false;
    const req = {
      fecha: this.formIdentificacionesColeraIrritabilidadAgresion.value.fecha,
      colera: this.formIdentificacionesColeraIrritabilidadAgresion.value.colera,
      irritabilidad: this.formIdentificacionesColeraIrritabilidadAgresion.value.irritabilidad,
      agresion: this.formIdentificacionesColeraIrritabilidadAgresion.value.agresion,
      calificacionTotal: this.formIdentificacionesColeraIrritabilidadAgresion.value.calificacionTotal,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarIdentificacionColeraIrritabilidadAgresion(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Identificacion Irritabilidad, agresion y colera',
            showConfirmButton: false,
            timer: 1000
          })
          this.getIdentificacionColeraIrritabilidadAgresion();
          this.guardarNuevoIdentificacionColeraIrritabilidadAgresion();
          this.identificacionesColeraIrritabilidadAgresionDialog = false;
        }
      )
    }
  }
  guardarNuevoIdentificacionColeraIrritabilidadAgresion() {
    this.isUpdateIdentificacionesColeraIrritabilidadAgresion = false;
    this.formIdentificacionesColeraIrritabilidadAgresion.reset();
  }
  editarIdentificacionColeraIrritabilidadAgresion(rowData) {
    this.isUpdateIdentificacionesColeraIrritabilidadAgresion = true;
    this.formIdentificacionesColeraIrritabilidadAgresion.get('fecha').setValue(rowData.fecha)
    this.formIdentificacionesColeraIrritabilidadAgresion.get('colera').setValue(rowData.colera)
    this.formIdentificacionesColeraIrritabilidadAgresion.get('irritabilidad').setValue(rowData.irritabilidad)
    this.formIdentificacionesColeraIrritabilidadAgresion.get('agresion').setValue(rowData.agresion)
    this.formIdentificacionesColeraIrritabilidadAgresion.get('calificacionTotal').setValue(rowData.calificacionTotal)
    this.identificacionesColeraIrritabilidadAgresionDialog = true;

  }
  editarDatosIdentificacionColeraIrritabilidadAgresion() {
    const req = {
      fecha: this.formIdentificacionesColeraIrritabilidadAgresion.value.fecha,
      colera: this.formIdentificacionesColeraIrritabilidadAgresion.value.colera,
      irritabilidad: this.formIdentificacionesColeraIrritabilidadAgresion.value.irritabilidad,
      agresion: this.formIdentificacionesColeraIrritabilidadAgresion.value.agresion,
      calificacionTotal: this.formIdentificacionesColeraIrritabilidadAgresion.value.calificacionTotal,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarIdentificacionColeraIrritabilidadAgresion(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Identificacion Irritabilidad, agresion y colera',
            showConfirmButton: false,
            timer: 1000
          })
          this.getIdentificacionColeraIrritabilidadAgresion();
          this.guardarNuevoIdentificacionColeraIrritabilidadAgresion();
          this.identificacionesColeraIrritabilidadAgresionDialog = false;
        }
      )
    }
  }
  //tamizaje violencia
  getTamizajeViolencia(){
    this.planAtencionIntegralTablasService.getTamizajeViolencia(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.tamizajesViolencia=data;
    });
  }
  openNewTamizajeViolencia() {
    this.isUpdateTamizajesViolencia = false;
    this.formTamizajesViolencia.reset();
    this.formTamizajesViolencia.get('fecha').setValue("");
    this.formTamizajesViolencia.get('familiar').setValue("");
    this.formTamizajesViolencia.get('sexual').setValue("");
    this.formTamizajesViolencia.get('politica').setValue("");
    this.tamizajesViolenciaDialog = true;
  }
  saveFormTamizajeViolencia() {
    this.isUpdateTamizajesViolencia = false;
    const req = {
      fecha: this.formTamizajesViolencia.value.fecha,
      familiar: this.formTamizajesViolencia.value.familiar,
      sexual: this.formTamizajesViolencia.value.sexual,
      politica: this.formTamizajesViolencia.value.politica
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarTamizajeViolencia(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Tamizaje de violencia',
            showConfirmButton: false,
            timer: 1000
          })
          this.getTamizajeViolencia();
          this.guardarNuevoTamizajeViolencia();
          this.tamizajesViolenciaDialog = false;
        }
      )
    }
  }
  guardarNuevoTamizajeViolencia() {
    this.isUpdateTamizajesViolencia = false;
    this.formTamizajesViolencia.reset();
  }
  editarTamizajeViolencia(rowData) {
    this.isUpdateTamizajesViolencia = true;
    this.formTamizajesViolencia.get('fecha').setValue(rowData.fecha)
    this.formTamizajesViolencia.get('familiar').setValue(rowData.familiar)
    this.formTamizajesViolencia.get('sexual').setValue(rowData.sexual)
    this.formTamizajesViolencia.get('politica').setValue(rowData.politica)
    this.tamizajesViolenciaDialog = true;

  }
  editarDatosTamizajeViolencia() {
    const req = {
      fecha: this.formTamizajesViolencia.value.fecha,
      familiar: this.formTamizajesViolencia.value.familiar,
      sexual: this.formTamizajesViolencia.value.sexual,
      politica: this.formTamizajesViolencia.value.politica
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarTamizajeViolencia(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Tamizaje de violencia',
            showConfirmButton: false,
            timer: 1000
          })
          this.getTamizajeViolencia();
          this.guardarNuevoTamizajeViolencia();
          this.tamizajesViolenciaDialog = false;
        }
      )
    }
  }
  // identificacion factores riesgo
  getIdentificacionFactoresRiesgo(){
    this.planAtencionIntegralTablasService.getIdentificacionFactoresRiesgo(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.identificacionesFactoresRiesgo=data;
    });
  }
  openNewIdentificacionFactoresRiesgo() {
    this.isUpdateIdentificacionesFactoresRiesgo = false;
    this.formIdentificacionesFactoresRiesgo.reset();
    this.formIdentificacionesFactoresRiesgo.get('fecha').setValue("");
    this.identificacionesFactoresRiesgoDialog = true;
  }
  saveFormIdentificacionFactoresRiesgo() {
    this.isUpdateEvaluacionCrecimientoFisico = false;
    const req = {
      fecha: this.formEvaluacionCrecimientoFisico.value.fecha,
      imc: this.formEvaluacionCrecimientoFisico.value.imc,
      talla: this.formEvaluacionCrecimientoFisico.value.talla,
      edad: this.formEvaluacionCrecimientoFisico.value.edad,
      alimentacion: this.formEvaluacionCrecimientoFisico.value.alimentacion,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEvaluacionCrecimientoFisicoEstadoNutricional(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Evaluacion crecimiento fisico y estado nutricional',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEvaluacionCrecimientoFisico();
          this.guardarNuevoEvaluacionCrecimientoFisico();
          this.evaluacionCrecimientoFisicoDialog = false;
        }
      )
    }
  }
  guardarNuevoIdentificacionFactoresRiesgo() {
    this.isUpdateEvaluacionCrecimientoFisico = false;
    this.formEvaluacionCrecimientoFisico.reset();
  }
  editarIdentificacionFactoresRiesgo(rowData) {
    this.isUpdateEvaluacionCrecimientoFisico = true;
    this.formEvaluacionCrecimientoFisico.get('fecha').setValue(rowData.fecha)
    this.formEvaluacionCrecimientoFisico.get('imc').setValue(rowData.imc)
    this.formEvaluacionCrecimientoFisico.get('talla').setValue(rowData.talla)
    this.formEvaluacionCrecimientoFisico.get('edad').setValue(rowData.edad)
    this.formEvaluacionCrecimientoFisico.get('alimentacion').setValue(rowData.alimentacion)
    this.evaluacionCrecimientoFisicoDialog = true;

  }
  editarDatosIdentificacionFactoresRiesgo() {
    const req = {
      fecha: this.formEvaluacionCrecimientoFisico.value.fecha,
      imc: this.formEvaluacionCrecimientoFisico.value.imc,
      talla: this.formEvaluacionCrecimientoFisico.value.talla,
      edad: this.formEvaluacionCrecimientoFisico.value.edad,
      alimentacion: this.formEvaluacionCrecimientoFisico.value.alimentacion,
    }
    this.planAtencionIntegralTablasService.editarEvaluacionCrecimientoFisicoEstadoNutricional(this.nroDoc, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: 'Evaluacion crecimiento fisico y estado nutricional',
          showConfirmButton: false,
          timer: 1000
        })
        this.getEvaluacionCrecimientoFisico();
        this.guardarNuevoEvaluacionCrecimientoFisico();
        this.evaluacionCrecimientoFisicoDialog = false;
      }
    )
  }
  //mini tabla
  enviarEgresosRecienNacido() {
    var factoresRiesgoUnaFecha = {
        nombre: this.formFactoresRiesgo.value.nombre,
        riesgo: this.formFactoresRiesgo.value.valor,
    }
    console.log(factoresRiesgoUnaFecha);
    this.factoresRiesgo.push(factoresRiesgoUnaFecha);
    this.factoresRiesgoDialog = false;
}

// canceledEgreso() {
//     Swal.fire({
//         icon: 'warning',
//         title: 'Cancelado...',
//         text: '',
//         showConfirmButton: false,
//         timer: 1000
//     })
//     this.egresoRNDialog = false;
//     this.estadoEditarRN = false;
// }


// openDialogEditarRN(rowData, rowIndex) {
//     this.estadoEditarRN = true;
//     this.indexRNEditado = rowIndex;
//     this.formEgresoRN.reset();
//     this.formEgresoRN.get('reingreso').setValue(rowData.reingreso);
//     this.formEgresoRN.get('fechaRN').setValue(this.datePipe.transform(new Date(rowData.fecha), 'yyyy-MM-ddTHH:mm'));
//     this.formEgresoRN.get('diagnostico').setValue(rowData.diagnostico);
//     this.formEgresoRN.get('fechaIngreso').setValue(this.datePipe.transform(new Date(rowData.fechaIngreso), 'yyyy-MM-ddTHH:mm'));
//     this.formEgresoRN.get('egresoRN').setValue(rowData.egreso);
//     this.formEgresoRN.get('dxfNoAplica').setValue(rowData.dxfNoAplica ? ["true"] : []);
//     this.formEgresoRN.get('dxFallecimiento').setValue(rowData.dxFallecimiento);
//     this.formEgresoRN.get('dxtNoAplica').setValue(rowData.dxtNoAplica ? ["true"] : []);
//     this.formEgresoRN.get('dxTraslado').setValue(rowData.dxTraslado);
//     this.formEgresoRN.get('estaNoAplica').setValue(rowData.estaNoAplica ? ["true"] : []);
//     this.formEgresoRN.get('establecimientoTras').setValue(rowData.establecimientoTraslado);
//     this.formEgresoRN.get('fechaContro').setValue(this.datePipe.transform(new Date(rowData.fechaContro), 'yyyy-MM-ddTHH:mm'));
//     this.formEgresoRN.get('controlRecienNacido').setValue(rowData.controlRecienNacido);
//     this.egresoRNDialog = true;
// }

// guardarEdicionEgresoRN() {
//     var recienNacidoEgreso = {
//         reingreso: this.formEgresoRN.value.reingreso,
//         fecha: this.datePipe.transform(this.formEgresoRN.value.fechaRN, 'yyyy-MM-dd HH:mm:ss'),
//         diagnostico: this.formEgresoRN.value.diagnostico,
//         fechaIngreso: this.datePipe.transform(this.formEgresoRN.value.fechaIngreso, 'yyyy-MM-dd HH:mm:ss'),
//         egreso: this.formEgresoRN.value.egresoRN,
//         dxfNoAplica: this.formEgresoRN.value.dxfNoAplica ? true : false,
//         dxFallecimiento: this.formEgresoRN.value.dxFallecimiento,
//         dxtNoAplica: this.formEgresoRN.value.dxtNoAplica ? true : false,
//         dxTraslado: this.formEgresoRN.value.dxTraslado,
//         estaNoAplica: this.formEgresoRN.value.estaNoAplica ? true : false,
//         establecimientoTraslado: this.formEgresoRN.value.establecimientoTras,
//         fechaContro: this.datePipe.transform(this.formEgresoRN.value.fechaContro, 'yyyy-MM-dd HH:mm:ss'),
//         controlRecienNacido: this.formEgresoRN.value.controlRecienNacido
//     }
//     console.log(recienNacidoEgreso);
//     this.todosEgresosDelRN.splice(this.indexRNEditado, 1, recienNacidoEgreso);
//     this.egresoRNDialog = false;
//     this.estadoEditarRN = false;
// }

// eliminarEgresoRN(rowIndex) {
//     this.estadoEditarRN = false;
//     Swal.fire({
//         showCancelButton: true,
//         confirmButtonText: 'Eliminar',
//         icon: 'warning',
//         title: 'Estas seguro de eliminar egreso del RN',
//         text: '',
//         showConfirmButton: true,
//     }).then((result) => {
//         if (result.isConfirmed) {
//             this.todosEgresosDelRN.splice(rowIndex, 1);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Eliminado correctamente',
//                 text: '',
//                 showConfirmButton: false,
//                 timer: 1500
//             })
//         }
//     })
// }
  //descarte enfermedades no transmisibles
  getDescarteEnfermedadesNoTransmisibles(){
    this.planAtencionIntegralTablasService.getDescarteEnfermedadesNoTransmisibles(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.descartesEnfermedadesNoTransmisibles=data;
    });
  }
  openNewDescarteEnfermedadesNoTransmisibles() {
    this.isUpdateDescartesEnfermedadesNoTransmisibles = false;
    this.formDescartesEnfermedadesNoTransmisibles.reset();
    this.formDescartesEnfermedadesNoTransmisibles.get('fecha').setValue("");
    this.formDescartesEnfermedadesNoTransmisibles.get('hematocrito').setValue("");
    this.formDescartesEnfermedadesNoTransmisibles.get('colesterolemiaTotal').setValue("");
    this.formDescartesEnfermedadesNoTransmisibles.get('glicemia').setValue("");
    this.formDescartesEnfermedadesNoTransmisibles.get('examenOrina').setValue("");
    this.descartesEnfermedadesNoTransmisiblesDialog = true;
  }
  saveFormDescarteEnfermedadesNoTransmisibles() {
    this.isUpdateDescartesEnfermedadesNoTransmisibles = false;
    const req = {
      fecha: this.formDescartesEnfermedadesNoTransmisibles.value.fecha,
      hematocrito: this.formDescartesEnfermedadesNoTransmisibles.value.hematocrito,
      colesterolemiaTotal: this.formDescartesEnfermedadesNoTransmisibles.value.colesterolemiaTotal,
      glicemia: this.formDescartesEnfermedadesNoTransmisibles.value.glicemia,
      examenOrina: this.formDescartesEnfermedadesNoTransmisibles.value.examenOrina,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarDescarteEnfermedadesNoTransmisibles(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Descarte de enfermedades no transmisibles',
            showConfirmButton: false,
            timer: 1000
          })
          this.getDescarteEnfermedadesNoTransmisibles();
          this.guardarNuevoDescarteEnfermedadesNoTransmisibles();
          this.descartesEnfermedadesNoTransmisiblesDialog = false;
        }
      )
    }
  }
  guardarNuevoDescarteEnfermedadesNoTransmisibles() {
    this.isUpdateDescartesEnfermedadesNoTransmisibles = false;
    this.formDescartesEnfermedadesNoTransmisibles.reset();
  }
  editarDescarteEnfermedadesNoTransmisibles(rowData) {
    this.isUpdateDescartesEnfermedadesNoTransmisibles = true;
    this.formDescartesEnfermedadesNoTransmisibles.get('fecha').setValue(rowData.fecha)
    this.formDescartesEnfermedadesNoTransmisibles.get('hematocrito').setValue(rowData.hematocrito)
    this.formDescartesEnfermedadesNoTransmisibles.get('colesterolemiaTotal').setValue(rowData.colesterolemiaTotal)
    this.formDescartesEnfermedadesNoTransmisibles.get('glicemia').setValue(rowData.glicemia)
    this.formDescartesEnfermedadesNoTransmisibles.get('examenOrina').setValue(rowData.examenOrina)
    this.descartesEnfermedadesNoTransmisiblesDialog = true;

  }
  editarDatosDescarteEnfermedadesNoTransmisibles() {
    const req = {
      fecha: this.formDescartesEnfermedadesNoTransmisibles.value.fecha,
      hematocrito: this.formDescartesEnfermedadesNoTransmisibles.value.hematocrito,
      colesterolemiaTotal: this.formDescartesEnfermedadesNoTransmisibles.value.colesterolemiaTotal,
      glicemia: this.formDescartesEnfermedadesNoTransmisibles.value.glicemia,
      examenOrina: this.formDescartesEnfermedadesNoTransmisibles.value.examenOrina,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarDescarteEnfermedadesNoTransmisibles(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Descarte de enfermedades no transmisibles',
            showConfirmButton: false,
            timer: 1000
          })
          this.getDescarteEnfermedadesNoTransmisibles();
          this.guardarNuevoDescarteEnfermedadesNoTransmisibles();
          this.descartesEnfermedadesNoTransmisiblesDialog = false;
        }
      )
    }
  }
  //escolaridad
  getEscolaridad(){
    this.planAtencionIntegralTablasService.getEscolaridad(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.escolaridades=data;
    });
  }
  openNewEscolaridad() {
    this.isUpdateEscolaridades = false;
    this.formEscolaridades.reset();
    this.formEscolaridades.get('fecha').setValue("");
    this.formEscolaridades.get('asistenciaEscuelaColegio').setValue("");
    this.formEscolaridades.get('rendimientoEscolar').setValue("");
    this.formEscolaridades.get('desercionEscolar').setValue("");
    this.escolaridadesDialog = true;
  }
  saveFormEscolaridad() {
    this.isUpdateEscolaridades = false;
    const req = {
      fecha: this.formEscolaridades.value.fecha,
      asistenciaEscuelaColegio: this.formEscolaridades.value.asistenciaEscuelaColegio,
      rendimientoEscolar: this.formEscolaridades.value.rendimientoEscolar,
      desercionEscolar: this.formEscolaridades.value.desercionEscolar
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarEscolaridad(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Escolaridad',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEscolaridad();
          this.guardarNuevoEscolaridad();
          this.escolaridadesDialog = false;
        }
      )
    }
  }
  guardarNuevoEscolaridad() {
    this.isUpdateEscolaridades = false;
    this.formEscolaridades.reset();
  }
  editarEscolaridad(rowData) {
    this.isUpdateEscolaridades = true;
    this.formEscolaridades.get('fecha').setValue(rowData.fecha)
    this.formEscolaridades.get('asistenciaEscuelaColegio').setValue(rowData.asistenciaEscuelaColegio)
    this.formEscolaridades.get('rendimientoEscolar').setValue(rowData.rendimientoEscolar)
    this.formEscolaridades.get('desercionEscolar').setValue(rowData.desercionEscolar)
    this.escolaridadesDialog = true;

  }
  editarDatosEscolaridad() {
    const req = {
      fecha: this.formEscolaridades.value.fecha,
      asistenciaEscuelaColegio: this.formEscolaridades.value.asistenciaEscuelaColegio,
      rendimientoEscolar: this.formEscolaridades.value.rendimientoEscolar,
      desercionEscolar: this.formEscolaridades.value.desercionEscolar
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarEscolaridad(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Escolaridad',
            showConfirmButton: false,
            timer: 1000
          })
          this.getEscolaridad();
          this.guardarNuevoEscolaridad();
          this.escolaridadesDialog = false;
        }
      )
    }
  }
  //habitos
  getHabito(){
    this.planAtencionIntegralTablasService.getHabitos(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.habitos=data;
    });
  }
  openNewHabito() {
    this.isUpdateHabitos = false;
    this.formHabitos.reset();
    this.formHabitos.get('fecha').setValue("");
    this.formHabitos.get('usoTiempoLibre').setValue("");
    this.formHabitos.get('sedentarismo').setValue("");
    this.formHabitos.get('usoAlcohol').setValue("");
    this.formHabitos.get('usoTabaco').setValue("");
    this.formHabitos.get('usoDrogas').setValue("");
    this.formHabitos.get('pertenenciaPandillas').setValue("");
    this.habitosDialog = true;
  }
  saveFormHabito() {
    this.isUpdateHabitos = false;
    const req = {
      fecha: this.formHabitos.value.fecha,
      usoTiempoLibre: this.formHabitos.value.usoTiempoLibre,
      sedentarismo: this.formHabitos.value.sedentarismo,
      usoAlcohol: this.formHabitos.value.usoAlcohol,
      usoTabaco: this.formHabitos.value.usoTabaco,
      usoDrogas: this.formHabitos.value.usoDrogas,
      pertenenciaPandillas: this.formHabitos.value.pertenenciaPandillas,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarHabitos(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Habitos',
            showConfirmButton: false,
            timer: 1000
          })
          this.getHabito();
          this.guardarNuevoHabito();
          this.habitosDialog = false;
        }
      )
    }
  }
  guardarNuevoHabito() {
    this.isUpdateHabitos = false;
    this.formHabitos.reset();
  }
  editarHabito(rowData) {
    this.isUpdateHabitos = true;
    this.formHabitos.get('fecha').setValue(rowData.fecha)
    this.formHabitos.get('usoTiempoLibre').setValue(rowData.usoTiempoLibre)
    this.formHabitos.get('sedentarismo').setValue(rowData.sedentarismo)
    this.formHabitos.get('usoAlcohol').setValue(rowData.usoAlcohol)
    this.formHabitos.get('usoTabaco').setValue(rowData.usoTabaco)
    this.formHabitos.get('usoDrogas').setValue(rowData.usoDrogas)
    this.formHabitos.get('pertenenciaPandillas').setValue(rowData.pertenenciaPandillas)
    this.habitosDialog = true;

  }
  editarDatosHabito() {
    const req = {
      fecha: this.formHabitos.value.fecha,
      usoTiempoLibre: this.formHabitos.value.usoTiempoLibre,
      sedentarismo: this.formHabitos.value.sedentarismo,
      usoAlcohol: this.formHabitos.value.usoAlcohol,
      usoTabaco: this.formHabitos.value.usoTabaco,
      usoDrogas: this.formHabitos.value.usoDrogas,
      pertenenciaPandillas: this.formHabitos.value.pertenenciaPandillas,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarHabitos(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Habitos',
            showConfirmButton: false,
            timer: 1000
          })
          this.getHabito();
          this.guardarNuevoHabito();
          this.habitosDialog = false;
        }
      )
    }
  }
  //salud sexual reproductiva
  getSaludSexualReproductiva(){
    this.planAtencionIntegralTablasService.getSaludSexualReproductiva(this.nroDoc)
    .subscribe((res: any) => {
        let data = res.object;
        this.saludSexualReproductiva=data;
    });
  }
  openNewSaludSexualReproductiva() {
    this.isUpdateSaludSexualReproductiva = false;
    this.formSaludSexualReproductiva.reset();
    this.formSaludSexualReproductiva.get('fecha').setValue("");
    this.formSaludSexualReproductiva.get('parejaEnamorado').setValue("");
    this.formSaludSexualReproductiva.get('relacionesSexuales').setValue("");
    this.formSaludSexualReproductiva.get('conductaSexualRiesgo').setValue("");
    this.formSaludSexualReproductiva.get('dosMasParejas').setValue("");
    this.formSaludSexualReproductiva.get('sexoSinProteccion').setValue("");
    this.formSaludSexualReproductiva.get('rsconPersonasDelMismoSexo').setValue("");
    this.formSaludSexualReproductiva.get('rsconPersonasDelOtroSexo').setValue("");
    this.formSaludSexualReproductiva.get('usoMetodoAnticonceptivo').setValue("");
    this.formSaludSexualReproductiva.get('conocimientoPrevenirEmbarazoNoDeseado').setValue("");
    this.formSaludSexualReproductiva.get('conocimientoPrevenirTransmisionITSVIH').setValue("");
    this.saludSexualReproductivaDialog = true;
  }
  saveFormSaludSexualReproductiva() {
    this.isUpdateSaludSexualReproductiva = false;
    const req = {
      fecha: this.formSaludSexualReproductiva.value.fecha,
      parejaEnamorado: this.formSaludSexualReproductiva.value.parejaEnamorado,
      relacionesSexuales: this.formSaludSexualReproductiva.value.relacionesSexuales,
      conductaSexualRiesgo: this.formSaludSexualReproductiva.value.conductaSexualRiesgo,
      dosMasParejas: this.formSaludSexualReproductiva.value.dosMasParejas,
      sexoSinProteccion: this.formSaludSexualReproductiva.value.sexoSinProteccion,
      rsconPersonasDelMismoSexo: this.formSaludSexualReproductiva.value.rsconPersonasDelMismoSexo,
      rsconPersonasDelOtroSexo: this.formSaludSexualReproductiva.value.rsconPersonasDelOtroSexo,
      usoMetodoAnticonceptivo: this.formSaludSexualReproductiva.value.usoMetodoAnticonceptivo,
      conocimientoPrevenirEmbarazoNoDeseado: this.formSaludSexualReproductiva.value.conocimientoPrevenirEmbarazoNoDeseado,
      conocimientoPrevenirTransmisionITSVIH: this.formSaludSexualReproductiva.value.conocimientoPrevenirTransmisionITSVIH,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.agregarSaludSexualReproductiva(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Salud sexual y reproductiva',
            showConfirmButton: false,
            timer: 1000
          })
          this.getSaludSexualReproductiva();
          this.guardarNuevoSaludSexualReproductiva();
          this.saludSexualReproductivaDialog = false;
        }
      )
    }
  }
  guardarNuevoSaludSexualReproductiva() {
    this.isUpdateSaludSexualReproductiva = false;
    this.formSaludSexualReproductiva.reset();
  }
  editarSaludSexualReproductiva(rowData) {
    this.isUpdateSaludSexualReproductiva = true;
    this.formSaludSexualReproductiva.get('fecha').setValue(rowData.fecha)
    this.formSaludSexualReproductiva.get('parejaEnamorado').setValue(rowData.parejaEnamorado)
    this.formSaludSexualReproductiva.get('relacionesSexuales').setValue(rowData.relacionesSexuales)
    this.formSaludSexualReproductiva.get('conductaSexualRiesgo').setValue(rowData.conductaSexualRiesgo)
    this.formSaludSexualReproductiva.get('dosMasParejas').setValue(rowData.dosMasParejas)
    this.formSaludSexualReproductiva.get('sexoSinProteccion').setValue(rowData.sexoSinProteccion)
    this.formSaludSexualReproductiva.get('rsconPersonasDelMismoSexo').setValue(rowData.rsconPersonasDelMismoSexo)
    this.formSaludSexualReproductiva.get('rsconPersonasDelOtroSexo').setValue(rowData.rsconPersonasDelOtroSexo)
    this.formSaludSexualReproductiva.get('usoMetodoAnticonceptivo').setValue(rowData.usoMetodoAnticonceptivo)
    this.formSaludSexualReproductiva.get('conocimientoPrevenirEmbarazoNoDeseado').setValue(rowData.conocimientoPrevenirEmbarazoNoDeseado)
    this.formSaludSexualReproductiva.get('conocimientoPrevenirTransmisionITSVIH').setValue(rowData.conocimientoPrevenirTransmisionITSVIH)
    this.saludSexualReproductivaDialog = true;

  }
  editarDatosSaludSexualReproductiva() {
    const req = {
      fecha: this.formSaludSexualReproductiva.value.fecha,
      parejaEnamorado: this.formSaludSexualReproductiva.value.parejaEnamorado,
      relacionesSexuales: this.formSaludSexualReproductiva.value.relacionesSexuales,
      conductaSexualRiesgo: this.formSaludSexualReproductiva.value.conductaSexualRiesgo,
      dosMasParejas: this.formSaludSexualReproductiva.value.dosMasParejas,
      sexoSinProteccion: this.formSaludSexualReproductiva.value.sexoSinProteccion,
      rsconPersonasDelMismoSexo: this.formSaludSexualReproductiva.value.rsconPersonasDelMismoSexo,
      rsconPersonasDelOtroSexo: this.formSaludSexualReproductiva.value.rsconPersonasDelOtroSexo,
      usoMetodoAnticonceptivo: this.formSaludSexualReproductiva.value.usoMetodoAnticonceptivo,
      conocimientoPrevenirEmbarazoNoDeseado: this.formSaludSexualReproductiva.value.conocimientoPrevenirEmbarazoNoDeseado,
      conocimientoPrevenirTransmisionITSVIH: this.formSaludSexualReproductiva.value.conocimientoPrevenirTransmisionITSVIH,
    }
    if (req.fecha.trim() !== "") {
      this.planAtencionIntegralTablasService.editarSaludSexualReproductiva(this.nroDoc, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            text: 'Salud sexual y reproductiva',
            showConfirmButton: false,
            timer: 1000
          })
          this.getSaludSexualReproductiva();
          this.guardarNuevoSaludSexualReproductiva();
          this.saludSexualReproductivaDialog = false;
        }
      )
    }
  }
  ngOnInit(): void {
    
  }

}
