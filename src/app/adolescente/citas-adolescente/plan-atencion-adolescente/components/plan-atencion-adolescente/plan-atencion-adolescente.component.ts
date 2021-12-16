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
  evaluacionDesarrolloSexualDialog: boolean = false;
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
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formEvaluacionesFisicoPostural = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formEvaluacionesDesarrolloSexual = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formEvaluacionesHabilidadesSociales = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formIdentificacionesColeraIrritabilidadAgresion = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formTamizajesViolencia = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formIdentificacionesFactoresRiesgo = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formDescartesEnfermedadesNoTransmisibles = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formEscolaridades = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formHabitos = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })
    this.formSaludSexualReproductiva = this.fb.group({
      fecha: new FormControl(""),
      imc: new FormControl(""),
      talla: new FormControl(""),
      edad: new FormControl(""),
      alimentacion: new FormControl("")
    })

  }

  openNewEvaluacionCrecimientoFisico(){
    this.evaluacionCrecimientoFisicoDialog=true;
  }
  ngOnInit(): void {
  }

}
