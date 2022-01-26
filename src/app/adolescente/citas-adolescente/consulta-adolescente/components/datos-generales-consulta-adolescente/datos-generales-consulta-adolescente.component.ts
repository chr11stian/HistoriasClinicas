import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  isUpdate: boolean = false;
  idConsulta: string;
  updateMedicacionFrec: boolean = false;
  indexMedicacion: number;
  updateAlarmSign: boolean = false;
  indexAlarmSign: number;
  dataPaciente: Paciente

  constructor(
    private fb: FormBuilder,
    private consultaAdolescenteService: ConsultaAdolescenteService,
    private pacienteService: PacienteService,
    private messageService: MessageService
  ) {
    let nroDoc = this.consultaAdolescenteService.nroDoc;
    let tipoDoc = this.consultaAdolescenteService.tipoDoc;
    console.log('tipoDoc ', tipoDoc, 'nroDoc ', nroDoc);
    let paciente = {
      tipoDoc: tipoDoc,
      nroDoc: nroDoc
    }
    this.pacienteService.getNroHclByDocYTipoDocumento(paciente).subscribe((res: any) => {
      this.dataPaciente = res.object;
      console.log('datos de paciente nrohcl', this.dataPaciente);
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
      nroHcl: this.dataPaciente.nroHcl,
      tipoDoc: "DNI",
      nroDoc: this.dataPaciente.nroDoc,
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
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
    });
    // console.log('data to save ', this.datosGrales);
  }

  editarDatosGrles() {
    this.recuperarDatos();
    this.consultaAdolescenteService.putActualizarDatosGrles(this.idConsulta, this.datosGrales).subscribe((res: any) => {

    })
  }

  btnSiguiente() {
    if (this.isUpdate)
      console.log('data to edit')
    else
      this.guardarDatosGenerales();
  }
  openDialogSignosAlarma() {
    this.formSignosAlarma.reset();
    this.dialogSignosAlarma = true;
  }
  aceptarSignosAlarma() {
    let sign = this.formSignosAlarma.value.signoAlarma
    this.listaSignosAlarma.push(sign);
    this.listaSignosAlarma = [...this.listaSignosAlarma];
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
    this.listaMedicacionUsoFrecuente = [...this.listaMedicacionUsoFrecuente];
    this.dialogMedicacion = false;
  }

  openDialogEditarMedicacionFrecuente(data, index) {
    this.updateMedicacionFrec = true;
    this.dialogMedicacion = true;
    this.indexMedicacion = index;
    this.formMedicacion.patchValue({ medicacionFrec: data });
  }
  aceptarDialogEditMedicacion() {
    console.log('index to edit ', this, this.indexMedicacion)
    this.listaMedicacionUsoFrecuente.splice(this.indexMedicacion, 1, this.formMedicacion.value.medicacionFrec);
    this.updateMedicacionFrec = false;
    this.dialogMedicacion = false;
  }
  eliminarMedicacionFrec(index) {
    this.listaMedicacionUsoFrecuente.splice(index, 1)
    this.listaMedicacionUsoFrecuente = [...this.listaMedicacionUsoFrecuente];
  }
  openDialogEditSignosAlarma(data, index) {
    this.updateAlarmSign = true;
    this.dialogSignosAlarma = true;
    this.indexAlarmSign = index;
    this.formSignosAlarma.patchValue({ signoAlarma: data });
  }
  aceptarDialogEditSignosAlarma() {
    this.listaSignosAlarma.splice(this.indexAlarmSign, 1, this.formSignosAlarma.value.signoAlarma);
    this.updateAlarmSign = false;
    this.dialogSignosAlarma = false;
  }
  eliminarSignoAlarma(index) {
    this.listaSignosAlarma.splice(index, 1)
    this.listaSignosAlarma = [...this.listaSignosAlarma];
  }
  loadData() {
    this.form.patchValue({ fecha: 'data' })
    this.form.patchValue({ edad: 'data' })
    this.form.patchValue({ fumn: 'data' })
    this.form.patchValue({ nombreAcompaniante: 'data' })
    this.form.patchValue({ medicacion: 'data' })
    this.form.patchValue({ motivoConsulta: 'data' })
    this.form.patchValue({ formaInicio: 'data' })
    this.form.patchValue({ tiempoEnfermedad: 'data' })
    this.form.patchValue({ observacionesSignosAlarma: 'data' })
    this.formSignosAlarma.patchValue({ signoAlarma: 'data' })
    this.formSignosAlarma.patchValue({ medicacionFrec: 'data' })
  }
}

interface DatosGenerales {
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
interface interrogatorio {
  pregunta?: string,
  respuesta?: string
}
interface Paciente {
  apeMaterno: string,
  apePaterno: string,
  nroDoc: string,
  nroHcl: string,
  otrosNombres: string,
  primerNombre: string,
}