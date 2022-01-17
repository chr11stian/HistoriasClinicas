import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { ConsultaAdolescenteService } from '../../services/consulta-adolescente.service';

@Component({
  selector: 'app-datos-generales-consulta-adolescente',
  templateUrl: './datos-generales-consulta-adolescente.component.html',
  styleUrls: ['./datos-generales-consulta-adolescente.component.css']
})
export class DatosGeneralesConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;
  formSignosAlarma: FormGroup;
  formMedicacion: FormGroup;
  datosGrales: DatosGenerales
  dialogSignosAlarma: boolean = false;
  dialogMedicacion: boolean = false;
  listaSignosAlarma: string[] = [];
  listaMedicacionUsoFrecuente: string[] = [];
  data: any;
  datePipe = new DatePipe("en-US");

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consultaAdolescenteService: ConsultaAdolescenteService,
    private pacienteService: PacienteService,
  ) {
    let nroDoc = this.consultaAdolescenteService.nroDoc;
    let tipoDoc = this.consultaAdolescenteService.tipoDoc;
    console.log('tipoDoc ', tipoDoc, 'nroDoc ', nroDoc);
    let paciente = {
      tipoDoc: tipoDoc,
      nroDoc: nroDoc
    }
    this.pacienteService.getNroHclByDocYTipoDocumento(paciente).subscribe((res: any) => {
      console.log('datos de paciente nrohcl', res.object);
    });
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({
      fecha: new FormControl(""),
      edad: new FormControl(""),
      fumn: new FormControl(""),
      nombreAcompaniante: new FormControl(""),
      medicacion: new FormControl(""),
      motivoConsulta: new FormControl(""),
      formaInicio: new FormControl(""),
      tiempoEnfermedad: new FormControl(""),
      observacionesSignosAlarma: new FormControl("")
    });
    this.formSignosAlarma = this.fb.group({
      signoAlarma: new FormControl(""),
    });
    this.formMedicacion = this.fb.group({
      medicacionFrec: new FormControl(""),
    })
  }
  recuperarDatos() {
    this.datosGrales = {
      servicio: "MEDICINA GENERAL",
      nroHcl: "10101011",
      tipoDoc: "DNI",
      nroDoc: "10101011",
      fecha: this.datePipe.transform(this.form.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
      // fecha: this.form.value.fecha,
      edad: this.form.value.edad,
      fumn: this.form.value.fumn,
      acompañante: this.form.value.nombreAcompaniante,
      medicacion: this.listaMedicacionUsoFrecuente,
      signosAlarma: this.listaSignosAlarma,
      interrogatorio: [{
        pregunta: 'Motivo de la consulta',
        respuesta: this.form.value.motivoConsulta
      }, {
        pregunta: 'Tiempo de enfermedad',
        respuesta: this.form.value.tiempoEnfermedad
      }, {
        pregunta: 'Observaciones',
        respuesta: this.form.value.observacionesSignosAlarma
      }, {
        pregunta: 'Forma de inicio',
        respuesta: this.form.value.formaInicio
      }],
      encargado: {
        tipoDoc: 'DNI',
        nroDoc: '99999999'
      },
      codRENAES: '00002292',
      episodioClinico: ''
      //this.datePipe.transform(this.formInterconsulta.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
    }
  }
  guardarDatosGenerales() {
    this.recuperarDatos();
    this.consultaAdolescenteService.postAgregarConsultaAdolescente(this.datosGrales).subscribe((res: any) => {
      console.log('exito al guardar ', res);
    });
    // console.log('data to save ', this.datosGrales);
  }
  openDialogSignosAlarma() {
    this.formSignosAlarma.reset();
    this.dialogSignosAlarma = true;
  }
  aceptarSignosAlarma() {
    let sign = this.formSignosAlarma.value.signoAlarma
    this.listaSignosAlarma.push(sign);
    this.dialogSignosAlarma = false;
  }
  closeDialog() {
    this.dialogSignosAlarma = false;
    this.dialogMedicacion = false;
  }
  openDialogMedicacion() {
    this.formMedicacion.reset();
    this.dialogMedicacion = true;
  }
  aceptarDialogMedicacion() {
    let med = this.formMedicacion.value.medicacionFrec
    this.listaMedicacionUsoFrecuente.push(med);
    this.dialogMedicacion = false;
  }
}

export interface DatosGenerales {
  nroHcl?: string,
  fecha?: String,
  edad?: number,
  fumn?: string,
  servicio?: string,
  tipoDoc?: string,
  nroDoc?: string,
  acompañante?: string,
  medicacion?: string[],
  signosAlarma?: string[],
  interrogatorio?: interrogatorio[],
  encargado?: {
    tipoDoc?: string,
    nroDoc?: string
  }
  codRENAES?: String,
  episodioClinico?: string,
}
export interface interrogatorio {
  pregunta?: string,
  respuesta?: string
}