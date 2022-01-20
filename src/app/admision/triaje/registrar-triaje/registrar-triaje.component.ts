import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultasService } from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service';
import { ConsultaObstetriciaService } from 'src/app/obstetricia-general/gestante/consulta/services/consulta-obstetricia/consulta-obstetricia.service';

@Component({
  selector: 'app-registrar-triaje',
  templateUrl: './registrar-triaje.component.html',
  styleUrls: ['./registrar-triaje.component.css']
})
export class RegistrarTriajeComponent implements OnInit {
  formTriaje: FormGroup;
  triaje: Triaje;
  datosPersonales: any;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private triajeService: ConsultaObstetriciaService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {
    this.inicializarForm();
    console.log('data of listar ', config.data);
    this.datosPersonales = config.data;
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
      fecha: '2021-12-03 16:15:48',
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
    console.log('data to show ', this.triaje);
    // this.triajeService.postConsultaNoControl(this.triaje).subscribe((res: any) => {
    //   console.log('se guardo ', res);

    // });
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se guardo correctamente' });
    this.ref.close(this.triaje);
  }
  closeDialog() {

  }
}
interface Triaje {
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
