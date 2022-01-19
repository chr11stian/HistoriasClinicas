import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultasService } from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service';

@Component({
  selector: 'app-registrar-triaje',
  templateUrl: './registrar-triaje.component.html',
  styleUrls: ['./registrar-triaje.component.css']
})
export class RegistrarTriajeComponent implements OnInit {
  formTriaje: FormGroup;
  ref: DynamicDialogRef
  triaje: Triaje;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private consultaService: ConsultasService
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.formTriaje = this.fb.group({
      temperatura: new FormControl(""),
      presionSis: new FormControl(""),//sistolica 
      presionDias: new FormControl(""),//diastolica
      fc: new FormControl(""),
      fr: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
    });
  }

  recuperarDatos() {
    this.triaje = {
      tipoDoc: 'DNI',
      nroDoc: '72745818',
      fecha: '12/10/2021',
      funcionesVitales: {
        t: parseFloat(this.formTriaje.value.temperatura),
        presionSistolica: parseInt(this.formTriaje.value.presionSis),
        presionDiastolica: parseInt(this.formTriaje.value.presionDias),
        fc: parseInt(this.formTriaje.value.fc),
        fr: parseInt(this.formTriaje.value.fr),
        peso: parseFloat(this.formTriaje.value.peso),
        talla: parseFloat(this.formTriaje.value.talla),
      },
    }
  }

  guardarTriaje() {
    this.recuperarDatos();
  }
}
export interface Triaje {
  tipoDoc: string,
  nroDoc: string,
  fecha: string,
  funcionesVitales: {
    t: number,
    presionSistolica: number,
    presionDiastolica: number,
    fc: number,
    fr: number,
    peso: number,
    talla: number,
  }
}
