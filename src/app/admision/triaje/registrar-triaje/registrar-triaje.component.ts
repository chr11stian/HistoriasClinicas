import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultasService } from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service';
import { ConsultaObstetriciaService } from 'src/app/obstetricia-general/gestante/consulta/services/consulta-obstetricia/consulta-obstetricia.service';
import { CuposTriajeService } from '../services/cupos-triaje/cupos-triaje.service';

@Component({
  selector: 'app-registrar-triaje',
  templateUrl: './registrar-triaje.component.html',
  styleUrls: ['./registrar-triaje.component.css']
})
export class RegistrarTriajeComponent implements OnInit {
  formTriaje: FormGroup;
  triaje: Triaje;
  datosPersonales: any;
  idCupo: string;
  dataTriaje: any;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private triajeService: CuposTriajeService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {
    this.inicializarForm();
    console.log('data of listar ', config.data.data);
    this.datosPersonales = config.data.data;
    this.idCupo = this.datosPersonales.id;
    if (config.data.option == 2) {
      this.triajeService.getVerTriajeByIdCupo(this.idCupo).subscribe((res: any) => {
        this.dataTriaje = res.object;
        this.formTriaje.patchValue({ temperatura: this.dataTriaje.funcionesVitales.t });
        this.formTriaje.patchValue({ presionSis: this.dataTriaje.funcionesVitales.presionSistolica });
        this.formTriaje.patchValue({ presionDias: this.dataTriaje.funcionesVitales.presionDiastolica });
        this.formTriaje.patchValue({ fc: this.dataTriaje.funcionesVitales.fc });
        this.formTriaje.patchValue({ fr: this.dataTriaje.funcionesVitales.fr });
        this.formTriaje.patchValue({ peso: this.dataTriaje.funcionesVitales.peso });
        this.formTriaje.patchValue({ talla: this.dataTriaje.funcionesVitales.talla });
      })
    }
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
      t: parseFloat(this.formTriaje.value.temperatura),
      presionSistolica: parseInt(this.formTriaje.value.presionSis),
      presionDiastolica: parseInt(this.formTriaje.value.presionDias),
      fc: parseInt(this.formTriaje.value.fc),
      fr: parseInt(this.formTriaje.value.fr),
      peso: parseFloat(this.formTriaje.value.peso),
      talla: parseFloat(this.formTriaje.value.talla),
    }
  }

  guardarTriaje() {
    this.recuperarDatos();
    console.log('data to show ', this.triaje);
    this.triajeService.postTriaje(this.idCupo, this.triaje).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se guardo correctamente' });
      this.ref.close(this.triaje);

    });

  }
  closeDialog() {
    this.ref.close();
  }

  loadData() {
    this.formTriaje.patchValue({ temperatura: '' });
    this.formTriaje.patchValue({ presionSis: '' });
    this.formTriaje.patchValue({ presionDias: '' });
    this.formTriaje.patchValue({ fc: '' });
    this.formTriaje.patchValue({ fr: '' });
    this.formTriaje.patchValue({ peso: '' });
    this.formTriaje.patchValue({ talla: '' });
  }

  calcularIMC() {
    let pesoAux = this.formTriaje.value.peso;
    let tallaAux = this.formTriaje.value.talla;
  }
}
interface Triaje {
  t: number,
  presionSistolica: number,
  presionDiastolica: number,
  fc: number,
  fr: number,
  peso: number,
  talla: number,

}
