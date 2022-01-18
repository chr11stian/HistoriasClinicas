import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaAdolescenteService } from '../../services/consulta-adolescente.service';

@Component({
  selector: 'app-examenes-consulta-adolescente',
  templateUrl: './examenes-consulta-adolescente.component.html',
  styleUrls: ['./examenes-consulta-adolescente.component.css']
})
export class ExamenesConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;
  formExamAux: FormGroup;
  formExamFisico: FormGroup;
  datosResultadosExamAux: string[] = [];
  datosExamenFisico: KeyValue[] = [];
  dialogResultExamensAux: boolean = false;
  dialogExamFisico: boolean = false;
  updateExamResultAux: boolean = false;
  updateExamFisico: boolean = false;
  dataExamenesConsulta: ExamenConsulta;
  listExamenAux: string[] = [];

  constructor(
    private fb: FormBuilder,
    private consultaAdolescenteService: ConsultaAdolescenteService,
    private messageService: MessageService,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {

  }

  inicializarForm() {
    this.form = this.fb.group({
      apetito: new FormControl(""),
      sed: new FormControl(""),
      sueno: new FormControl(""),
      estadoAnimo: new FormControl(""),
      orina: new FormControl(""),
      deposiciones: new FormControl(""),
      temperatura: new FormControl(""),
      presionSis: new FormControl(""),
      presionDias: new FormControl(""),
      fc: new FormControl(""),
      fr: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
      imc: new FormControl(""),
    });
    this.formExamAux = this.fb.group({
      resultado: new FormControl(""),
    });
    this.formExamFisico = this.fb.group({
      // observacionesExamFisico: new FormControl(""),
      nombreExamen: new FormControl(""),
      resultadoExam: new FormControl("")
    })
  }

  openDialogExamAux() {
    this.formExamAux.reset();
    this.dialogResultExamensAux = true;
  }
  aceptarAuxExam() {
    this.datosResultadosExamAux.push(this.formExamAux.value.resultado);
    this.datosResultadosExamAux = [...this.datosResultadosExamAux];
    this.dialogResultExamensAux = false;
  }
  openDialogPhysicExamn() {
    this.formExamFisico.reset();
    this.dialogExamFisico = true;
  }

  aceptarOtrosExamenes() {
    let otroExamen: KeyValue = {
      funcion: this.formExamFisico.value.nombreExamen,
      valor: this.formExamFisico.value.resultadoExam
    }
    this.datosExamenFisico.push(otroExamen);
    this.datosExamenFisico = [...this.datosExamenFisico];
    this.dialogExamFisico = false;
  }

  recuperarDatos() {
    this.dataExamenesConsulta = {
      funcionesBiologicas: [
        {
          funcion: 'apetito',
          valor: this.form.value.apetito
        }, {
          funcion: 'sed',
          valor: this.form.value.sed
        }, {
          funcion: 'sueño',
          valor: this.form.value.sueno
        }, {
          funcion: "orina",
          valor: this.form.value.orina
        }, {
          funcion: "deposiciones",
          valor: this.form.value.deposiciones
        }, {
          funcion: "estadoAnimo",
          valor: this.form.value.estadoAnimo
        }
      ],
      funcionesVitales: {
        t: this.form.value.temperatura,
        presionDiastolica: this.form.value.presionDias,
        presionSistolica: this.form.value.presionSis,
        fc: this.form.value.fc,
        fr: this.form.value.fr,
        peso: this.form.value.peso,
        talla: this.form.value.talla,
        imc: this.form.value.imc
      },
      examenesAuxiliares: this.datosResultadosExamAux,
      examenesFisicos: this.datosExamenFisico
    }
  }
  guardarExamenes() {
    this.recuperarDatos();
    this.consultaAdolescenteService.putActualizarExamenes("61ce1cf02aed74731bb3fb3a", this.dataExamenesConsulta).subscribe((res: any) => {
      console.log('respuesta ', res);
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
    });
  }
}

export interface ExamenConsulta {
  funcionesBiologicas?: KeyValue[],
  funcionesVitales?: FuncionesVitales,
  examenesAuxiliares?: string[],
  examenesFisicos?: KeyValue[],
  examenFisicoObservaciones?: string
}
export interface KeyValue {
  funcion?: string,
  valor?: string
}
export interface FuncionesVitales {
  t?: number,
  presionSistolica?: number,
  presionDiastolica?: number,
  fc?: number,
  fr?: number,
  peso?: number,
  talla?: number,
  imc?: number
}