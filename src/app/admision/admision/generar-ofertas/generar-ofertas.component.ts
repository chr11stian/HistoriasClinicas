import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private ofertasService: OfertasService,
    private formBuilder: FormBuilder
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
  openGenerarDialog(data){
    this.generarDialog=true;
    this.formGenerar.get('nroDoc').setValue(data.personal.nroDoc);
    this.formGenerar.get('nombre').setValue(data.personal.nombre);
    this.formGenerar.get('servicio').setValue(data.ipress.servicio);
    let aux= new Date();
    aux.setDate(data.turno.dia);
    aux.setMonth(data.mes-1);
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
  ngOnInit(): void {
  }

}
