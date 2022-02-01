import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OfertasService } from 'src/app/core/services/ofertas/ofertas.service';

@Component({
  selector: 'app-generar-ofertas',
  templateUrl: './generar-ofertas.component.html',
  styleUrls: ['./generar-ofertas.component.css']
})
export class GenerarOfertasComponent implements OnInit {

  form: FormGroup;
  formGenerar: FormGroup;

  data: any[];
  fecha: Date = new Date();
  datePipe = new DatePipe("en-US");
  generarDialog: boolean = false;
  rolSeleccionado: any;

  constructor(
    private ofertasService: OfertasService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.data = [];
    this.form.get('fechaFiltro').setValue(this.fecha);
    this.getRolGuardiasDisponibles();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltro: [new Date()],
    })
    this.formGenerar = this.formBuilder.group({
      nroDoc: [""],
      nombre: [""],
      servicio: [""],
      fecha: [""],
      turno: [""],
      ambiente: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      tiempoPreparacion: ['', [Validators.required]],
      tiempoAtencion: ['', [Validators.required]],
    })
  }
  openGenerarDialog(data) {
    this.generarDialog = true;
    this.rolSeleccionado = data;
    this.formGenerar.get('nroDoc').setValue(data.personal.nroDoc);
    this.formGenerar.get('nombre').setValue(data.personal.nombre);
    this.formGenerar.get('servicio').setValue(data.ipress.servicio);
    let aux = new Date();
    aux.setDate(data.turno.dia);
    aux.setMonth(data.mes - 1);
    aux.setFullYear(data.anio);
    console.log(aux);
    this.formGenerar.get('fecha').setValue(this.datePipe.transform(aux, 'dd/MM/yyyy'));
    this.formGenerar.get('turno').setValue(data.turno.nombre);
    this.formGenerar.get('ambiente').setValue(data.ambiente);
    this.formGenerar.get('horaInicio').setValue(data.turno.horaInicio);
    this.formGenerar.get('horaFin').setValue(data.turno.horaFin);
    this.formGenerar.get('tiempoPreparacion').setValue(data.ipress.tiempoPreparacion);
    this.formGenerar.get('tiempoAtencion').setValue(data.ipress.tiempoPromedioAtencion);
  }
  getRolGuardiasDisponibles() {
    let data = {
      fechaOferta: this.form.value.fechaFiltro,
      nombreIpress: "la posta medica",
    }
    console.log('DATA ', data);

    this.ofertasService.getOfertasDisponibles(data).subscribe((res: any) => {
      this.data = res.object;
      console.log('LISTA DE ROL DE GUARDIAS DISPONIBLES', this.data);
    })
  }
  guardarGeneracionOfertas() {
    let data = {
      fechaOferta: this.rolSeleccionado.fechaOferta,
      anio: this.rolSeleccionado.anio,
      mes: this.rolSeleccionado.mes,
      rolGuardias_id: this.rolSeleccionado.rolGuardias_id,
      personal: {
        tipoDoc: this.rolSeleccionado.personal.tipoDoc,
        nroDoc: this.rolSeleccionado.personal.nroDoc,
        nombre: this.rolSeleccionado.personal.nombre,
        tipoPersonal: this.rolSeleccionado.personal.tipoPersonal,
        tipoContrato: this.rolSeleccionado.personal.tipoContrato,
        sexo: this.rolSeleccionado.personal.sexo,
      },
      ipress: {
        idIpress: this.rolSeleccionado.ipress.idIpress,
        nombre: this.rolSeleccionado.ipress.nombre,
        servicio: this.rolSeleccionado.ipress.servicio,
        tiempoPreparacion: this.formGenerar.value.tiempoPreparacion,
        tiempoPromedioAtencion: this.formGenerar.value.tiempoAtencion,
      },
      turno: {
        dia: this.rolSeleccionado.turno.dia,
        nombre: this.rolSeleccionado.turno.nombre,
        abreviatura: this.rolSeleccionado.turno.abreviatura,
        nroHoras: this.rolSeleccionado.turno.nroHoras,
        horaInicio: this.formGenerar.value.horaInicio,
        horaFin: this.formGenerar.value.horaFin,
      },
      ambiente: this.formGenerar.value.ambiente,
    }
    console.log('DATA ', data);

    this.ofertasService.generarOferta(data).subscribe((res: any) => {
      this.showSuccess();
      this.generarDialog = false;
      this.rolSeleccionado = {};
      console.log('rpta', res.object);
    })
  }
  validarSiGeneraOferta(rowData){
    if (rowData.oferta==null)
      return false;
    else return true;
  }
  cancelar() {
    this.generarDialog = false;
    this.rolSeleccionado = {};
    this.showError();
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Generado', detail: 'Oferta generada correctamente' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Acción cancelada' });
  }
  ngOnInit(): void {
  }

}
