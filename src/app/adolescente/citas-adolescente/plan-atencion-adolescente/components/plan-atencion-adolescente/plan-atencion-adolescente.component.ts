import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-plan-atencion-adolescente',
  templateUrl: './plan-atencion-adolescente.component.html',
  styleUrls: ['./plan-atencion-adolescente.component.css']
})
export class PlanAtencionAdolescenteComponent implements OnInit {

  evaluacionesCrecimientoFisico: any[] = [];
  evaluacionCrecimientoFisicoDialog: boolean = false;
  formEvaluacionCrecimientoFisico: FormGroup;

  evaluacionesAgudezaVisualAuditiva: any[] = [];
  evaluacionesAgudezaVisualAuditivaDialog: boolean = false;
  formEvaluacionesAgudezaVisualAuditiva: FormGroup;

  evaluacionesFisicoPostural: any[] = [];
  evaluacionesFisicoPosturalDialog: boolean = false;
  formEvaluacionesFisicoPostural: FormGroup;

  evaluacionesDesarrolloSexual: any[] = [];
  evaluacionesDesarrolloSexualDialog: boolean = false;
  formEvaluacionesDesarrolloSexual: FormGroup;

  evaluacionesHabilidadesSociales: any[] = [];
  evaluacionesHabilidadesSocialesDialog: boolean = false;
  formEvaluacionesHabilidadesSociales: FormGroup;

  identificacionesColeraIrritabilidadAgresion: any[] = [];
  identificacionesColeraIrritabilidadAgresionDialog: boolean = false;
  formIdentificacionesColeraIrritabilidadAgresion: FormGroup;

  tamizajesViolencia: any[] = [];
  tamizajesViolenciaDialog: boolean = false;
  formTamizajesViolencia: FormGroup;

  identificacionesFactoresRiesgo: any[] = [];
  identificacionesFactoresRiesgoDialog: boolean = false;
  formIdentificacionesFactoresRiesgo: FormGroup;

  descartesEnfermedadesNoTransmisibles: any[] = [];
  descartesEnfermedadesNoTransmisiblesDialog: boolean = false;
  formDescartesEnfermedadesNoTransmisibles: FormGroup;

  escolaridades: any[] = [];
  escolaridadesDialog: boolean = false;
  formEscolaridades: FormGroup;

  habitos: any[] = [];
  habitosDialog: boolean = false;
  formHabitos: FormGroup;

  saludSexualReproductiva: any[] = [];
  saludSexualReproductivaDialog: boolean = false;
  formSaludSexualReproductiva: FormGroup;

  //soi un nuevo comentario xd
  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
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
      DesercionEscolar: new FormControl("")
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
      RSConPersonasDelMismoSexo: new FormControl(""),
      RSConPersonasDelOtroSexo: new FormControl(""),
      usoMetodoAnticonceptivo: new FormControl(""),
      conocimientoPrevenirEmbarazoNoDeseado: new FormControl(""),
      conocimientoPrevenirTransmisionITSVIH: new FormControl("")
    })

  }

  openNewEvaluacionCrecimientoFisico(){
    this.evaluacionCrecimientoFisicoDialog=true;
  }
  ngOnInit(): void {
  }

}
