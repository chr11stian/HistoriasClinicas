import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConsultaAdolescenteService } from '../../services/consulta-adolescente.service';

@Component({
  selector: 'app-tratamiento-consulta-adolescente',
  templateUrl: './tratamiento-consulta-adolescente.component.html',
  styleUrls: ['./tratamiento-consulta-adolescente.component.css']
})
export class TratamientoConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;
  formTratamiento: FormGroup;
  formExamAux: FormGroup;
  formInterconsulta: FormGroup;
  dataTratamiento: Tratamiento;
  updateTratamiento: boolean = false;
  indexTratamiento: number;
  dialogTratamiento: boolean = false;
  dialogAuxExam: boolean = false;
  dialogInterconsulta: boolean = false;
  listaTratamientos: DescripcionTratamiento[] = [];
  listaSolicitudExamAux: string[] = [];
  listaInterconsultas: Interconsultas[] = [];
  datePipe = new DatePipe('en-US');
  updateAuxExam: boolean = false;
  indexAuxExam: number;
  updateInterconsultas: boolean = false;
  indexInterconsultas: number;

  listaIntervalos = [
    { name: 'CADA 1 HORA', code: '1' },
    { name: 'CADA 2 HORAS', code: '2' },
    { name: 'CADA 3 HORAS', code: '3' },
    { name: 'CADA 4 HORAS', code: '4' },
    { name: 'CADA 5 HORAS', code: '5' },
    { name: 'CADA 6 HORAS', code: '6' },
    { name: 'CADA 8 HORAS', code: '7' },
    { name: 'CADA 12 HORAS', code: '8' },
    { name: 'CADA 24 HORAS', code: '9' },
    { name: 'CONDICIONAL A FIEBRE', code: '10' },
    { name: 'DOSIS UNICA', code: '11' },
    { name: 'CADA 48 HORAS', code: '12' }
  ];
  listaViaAdministracion = [
    { name: 'ENDOVENOSA', code: "1" },
    { name: 'INHALADORA', code: "2" },
    { name: 'INTRADERMICO', code: "3" },
    { name: 'INTRAMUSCULAR', code: "4" },
    { name: 'NASAL', code: "5" },
    { name: 'OFTALMICO', code: "6" },
    { name: 'ORAL', code: "7" },
    { name: 'OPTICO', code: "8" },
    { name: 'RECTAL', code: "9" },
    { name: 'SUBCUTANEO', code: "10" },
    { name: 'SUBLINGUAL', code: "11" },
    { name: 'TOPICO', code: "12" },
    { name: 'VAGINAL', code: "13" },
  ];

  constructor(
    private fb: FormBuilder,
    private consultaAdolescenteService: ConsultaAdolescenteService,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.form = this.fb.group({
      solicitudExam: new FormControl(""),
      compromisosObs: new FormControl(""),
      consultorio: new FormControl(""),
      motivo: new FormControl(""),
      fechaInterconsulta: new FormControl(""),
      proximaCita: new FormControl(""),
      consultorioReferencia: new FormControl(""),
      motivoReferencia: new FormControl(""),
      codRENAESReferencia: new FormControl("")
    });
    this.formTratamiento = this.fb.group({
      descripcion: new FormControl(""),
      numero: new FormControl(""),
      dosis: new FormControl(""),
      viaAdministracion: new FormControl(""),
      intervalo: new FormControl(""),
      duracion: new FormControl(""),
      observaciones: new FormControl(""),
    });
    this.formExamAux = this.fb.group({
      examAux: new FormControl(""),
    })
    this.formInterconsulta = this.fb.group({
      consultorio: new FormControl(""),
      motivo: new FormControl(""),
      fechaInterconsulta: new FormControl("")
    })
  }

  openDialogTratamiento() {
    this.formTratamiento.reset();
    this.dialogTratamiento = true;
    this.updateTratamiento = false;
  }

  aceptarDialogTratamiento() {
    let tratamiento: DescripcionTratamiento = {
      descripcion: this.formTratamiento.value.descripcion,
      numero: this.formTratamiento.value.numero,
      dosis: this.formTratamiento.value.dosis,
      viaAdministracion: this.formTratamiento.value.viaAdministracion,
      intervalo: this.formTratamiento.value.intervalo,
      observaciones: this.formTratamiento.value.observaciones,
      duracion: this.formTratamiento.value.duracion
    }
    this.listaTratamientos.push(tratamiento);
    this.listaTratamientos = [...this.listaTratamientos]
    this.dialogTratamiento = false;
  }
  openDialogExamAux() {
    this.updateAuxExam = false;
    this.formExamAux.reset();
    this.dialogAuxExam = true;
  }
  aceptarSolicitudExamenAux() {
    this.listaSolicitudExamAux.push(this.formExamAux.value.examAux);
    this.listaSolicitudExamAux = [...this.listaSolicitudExamAux];
    this.dialogAuxExam = false;
  }
  openDialogInterconsulta() {
    this.updateInterconsultas = false;
    this.formInterconsulta.reset();
    this.dialogInterconsulta = true;
  }
  aceptarInterconsulta() {
    let auxInterconsulta: Interconsultas = {
      consultorio: this.formInterconsulta.value.consultorio,
      fecha: this.datePipe.transform(this.formInterconsulta.value.fechaInterconsulta, 'yyyy-MM-dd'),
      motivo: this.formInterconsulta.value.motivo
    }
    this.listaInterconsultas.push(auxInterconsulta);
    this.listaInterconsultas = [...this.listaInterconsultas]
    this.dialogInterconsulta = false;

    console.log('data interconsulta ', this.listaInterconsultas);
  }
  recuperarDatos() {
    this.dataTratamiento = {
      tratamientos: this.listaTratamientos,
      solicitudExamenesAuxiliares: this.listaSolicitudExamAux,
      compromisosObservaciones: this.form.value.compromisosObs,
      referencia: {
        consultorio: this.form.value.consultorioReferencia,
        motivo: this.form.value.motivoReferencia,
        codRENAES: this.form.value.codRENAESReferencia
      },
      interconsultas: this.listaInterconsultas,
      proxCita: {
        fecha: this.datePipe.transform(this.form.value.proximaCita, 'yyyy-MM-dd'),
        estado: 'TENTATIVO'
      }
    }
  }
  guardarTratamiento() {
    this.recuperarDatos();
    console.log('data to save ', this.dataTratamiento);
    this.consultaAdolescenteService.putActualizarTratamiento("61f1195d58886c4342580d64", this.dataTratamiento).subscribe((res: any) => {

    });
  }
  closeDialogTratamiento() {
    this.dialogTratamiento = false;
  }
  openDialogEditTratamiento(data, index) {
    this.updateTratamiento = true;
    this.dialogTratamiento = true;
    this.indexTratamiento = index;
    this.formTratamiento.patchValue({ descripcion: data.descripcion });
    this.formTratamiento.patchValue({ numero: data.numero });
    this.formTratamiento.patchValue({ dosis: data.dosis });
    this.formTratamiento.patchValue({ viaAdministracion: data.viaAdministracion });
    this.formTratamiento.patchValue({ intervalo: data.intervalo });
    this.formTratamiento.patchValue({ duracion: data.duracion });
    this.formTratamiento.patchValue({ observaciones: data.observaciones });
  }
  aceptarDialogEditTratamiento() {
    let tratamiento: DescripcionTratamiento = {
      descripcion: this.formTratamiento.value.descripcion,
      numero: this.formTratamiento.value.numero,
      dosis: this.formTratamiento.value.dosis,
      viaAdministracion: this.formTratamiento.value.viaAdministracion,
      intervalo: this.formTratamiento.value.intervalo,
      observaciones: this.formTratamiento.value.observaciones,
      duracion: this.formTratamiento.value.duracion
    }
    this.dialogTratamiento = false;
    this.listaTratamientos.splice(this.indexTratamiento, 1, tratamiento)
  }
  eliminarTratamiento(index) {
    this.listaTratamientos.splice(index, 1);
    this.listaTratamientos = [...this.listaTratamientos];
  }
  openDialogAuxExam(data, index) {
    console.log('data ', data);
    this.updateAuxExam = true;
    this.dialogAuxExam = true;
    this.indexAuxExam = index;
    this.formExamAux.patchValue({ examAux: data });
  }
  aceptarDialogEditarAuxExam() {
    this.listaSolicitudExamAux.splice(this.indexAuxExam, 1, this.formExamAux.value.examAux);
    this.dialogAuxExam = false;
  }
  eliminarAuxExam(index) {
    this.listaSolicitudExamAux.splice(index, 1);
    this.listaSolicitudExamAux = [...this.listaSolicitudExamAux];
  }
  openDialogEditInterconsulta(data, index) {
    this.dialogInterconsulta = true;
    this.updateInterconsultas = true;
    this.indexInterconsultas = index;
    this.formInterconsulta.patchValue({ consultorio: data.consultorio });
    this.formInterconsulta.patchValue({ fechaInterconsulta: data.fecha });
    this.formInterconsulta.patchValue({ motivo: data.motivo });
  }
  aceptarDialogEditInterConsul() {
    let auxInterconsulta: Interconsultas = {
      consultorio: this.formInterconsulta.value.consultorio,
      fecha: this.datePipe.transform(this.formInterconsulta.value.fechaInterconsulta, 'yyyy-MM-dd'),
      motivo: this.formInterconsulta.value.motivo
    }
    this.listaInterconsultas.splice(this.indexInterconsultas, 1, auxInterconsulta);
    this.dialogInterconsulta = false;
  }
  eliminarInterconsulta(index) {
    this.listaInterconsultas.splice(index, 1);
    this.listaInterconsultas = [...this.listaInterconsultas];
  }
}
export interface DescripcionTratamiento {
  descripcion?: string,
  numero?: number,
  dosis?: string,
  viaAdministracion?: string,
  intervalo?: string,
  duracion?: string,
  observaciones?: string
}
export interface Tratamiento {
  tratamientos: DescripcionTratamiento[],
  solicitudExamenesAuxiliares: string[],
  compromisosObservaciones: string,
  referencia?: Referencia,
  interconsultas?: Interconsultas[],
  proxCita: {
    fecha: string,
    estado: string
  }
}
export interface Referencia {
  consultorio: string,
  motivo: string,
  codRENAES: string
}
export interface Interconsultas {
  consultorio: string,
  motivo: string,
  fecha: string
}
