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
  dataExamenesConsulta: ExamenConsulta;
  listExamenAux: string[] = [];
  updateAuxExam: boolean = false;
  indexAuxExam: number;
  updatePhysicalExam: boolean = false;
  indexPhysicalExam: number;

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
    this.updateAuxExam = false;
  }
  aceptarAuxExam() {
    this.datosResultadosExamAux.push(this.formExamAux.value.resultado);
    this.datosResultadosExamAux = [...this.datosResultadosExamAux];
    this.dialogResultExamensAux = false;
  }
  openDialogPhysicExamn() {
    this.formExamFisico.reset();
    this.dialogExamFisico = true;
    this.updatePhysicalExam = false;
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
    this.consultaAdolescenteService.putActualizarExamenes("61f1195d58886c4342580d64", this.dataExamenesConsulta).subscribe((res: any) => {
      console.log('respuesta ', res);
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
    });
  }
  openDialogEditAuxExam(data, index) {
    this.updateAuxExam = true;
    this.dialogResultExamensAux = true;
    this.indexAuxExam = index;
    this.formExamAux.patchValue({ resultado: data });
  }
  aceptarDialogEditAuxExam() {
    this.listExamenAux.splice(this.indexAuxExam, 1, this.formExamAux.value.resultado);
    this.updateAuxExam = false;
    this.dialogResultExamensAux = false;
  }
  eliminarAuxExam(index) {
    this.listExamenAux.splice(index, 1);
    this.listExamenAux = [...this.listExamenAux];
  }
  openDialogEditPhysicalExam(data, index) {
    this.updatePhysicalExam = true;
    this.dialogExamFisico = true;
    this.indexPhysicalExam = index;
    this.formExamFisico.patchValue({ nombreExamen: data.funcion });
    this.formExamFisico.patchValue({ resultadoExam: data.valor });
  }
  aceptarDialogEditPhysicalExam() {
    let auxExam: KeyValue = {
      funcion: this.formExamFisico.value.nombreExamen,
      valor: this.formExamFisico.value.resultadoExam
    }
    this.datosExamenFisico.splice(this.indexPhysicalExam, 1, auxExam);
    this.updatePhysicalExam = false;
    this.dialogExamFisico = false;
  }
  eliminarPhysicalExam(index) {
    this.datosExamenFisico.splice(index, 1);
    this.datosExamenFisico = [...this.datosExamenFisico];
  }
  closeDialog(){
    this.dialogExamFisico = false;
    this.dialogResultExamensAux = false;
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