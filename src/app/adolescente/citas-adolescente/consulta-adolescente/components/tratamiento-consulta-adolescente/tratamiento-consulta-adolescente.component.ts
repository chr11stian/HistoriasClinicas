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
  dialogTratamiento: boolean = false;
  dialogAuxExam: boolean = false;
  dialogInterconsulta: boolean = false;
  listaTratamientos: DescripcionTratamiento[] = [];
  listaSolicitudExamAux: string[] = [];
  listaInterconsultas: Interconsultas[] = [];
  datePipe = new DatePipe('en-US');

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
    this.dialogTratamiento = false;
  }
  openDialogExamAux() {
    this.formExamAux.reset();
    this.dialogAuxExam = true;
  }
  aceptarSolicitudExamenAux() {
    this.listaSolicitudExamAux.push(this.formExamAux.value.examAux);
    this.dialogAuxExam = false;
  }
  openDialogInterconsulta() {
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
    this.consultaAdolescenteService.putActualizarTratamiento("61ce1cf02aed74731bb3fb3a", this.dataTratamiento).subscribe((res: any) => {

    });
  }
  guardarEdicionTratamiento() {
    
  }
  closeDialogTratamiento() {
    this.dialogTratamiento = false;
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
