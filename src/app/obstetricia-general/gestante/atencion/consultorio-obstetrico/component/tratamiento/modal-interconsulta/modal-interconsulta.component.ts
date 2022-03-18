import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import { RolGuardiaService } from 'src/app/core/services/rol-guardia/rol-guardia.service';

@Component({
  selector: 'app-modal-interconsulta',
  templateUrl: './modal-interconsulta.component.html',
  styleUrls: ['./modal-interconsulta.component.css']
})
export class ModalInterconsultaComponent implements OnInit {

  formInterconsultas: FormGroup;
  dialogInterconsulta = false;
  dataInterconsultas: any[] = [];
  dataPipe = new DatePipe('en-US');

  listaDeServicios: any[] = [];
  listaDeNiveles: any[] = [
    "NORMAL",
    "EMERGENCIA"
  ]

  idIpress: any;
  constructor(
    private form: FormBuilder,
    private rolGuardiaService: RolGuardiaService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig) {
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log("ipress", this.idIpress)
    this.getUPSdeIpress();
    this.buildForm();
    if (config.data) {
      this.llenarCamposInterconsulta();
    }
  }

  ngOnInit(): void {
  }
  buildForm() {
    this.formInterconsultas = this.form.group({
      servicio: new FormControl("", [Validators.required]),
      motivo: new FormControl("", [Validators.required]),
      fecha: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      nivelUrgencia: new FormControl("", [Validators.required]),
    })
  }
  getUPSdeIpress() {
    this.rolGuardiaService.getServiciosPorIpress(this.idIpress).subscribe((res: any) => {
      this.listaDeServicios = res.object;
      console.log('LISTA DE SERVICIOS DE  IPRESS', this.listaDeServicios);
    })
  }
  openNew() {
    this.formInterconsultas.reset();
    this.dialogInterconsulta = true;
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogInterconsulta = false;
  }
  enviarInterconsultas() {
    var interconsultas = {
      servicio: this.formInterconsultas.value.servicio,
      motivo: this.formInterconsultas.value.motivo,
      fecha: this.dataPipe.transform(this.formInterconsultas.value.fecha, 'yyyy-MM-dd'),
      estado: this.formInterconsultas.value.estado,
      nivelUrgencia: this.formInterconsultas.value.nivelUrgencia,
    }
    console.log(interconsultas);
    this.dataInterconsultas.push(interconsultas);
    this.dialogInterconsulta = false;
  }
  llenarCamposInterconsulta() {
    let configuracion = this.config.data.row;
    this.formInterconsultas.get("servicio").setValue(configuracion.servicio);
    this.formInterconsultas.get("motivo").setValue(configuracion.motivo);
    this.formInterconsultas.get("fecha").setValue(configuracion.fecha);
    this.formInterconsultas.get("estado").setValue(configuracion.estado);
    this.formInterconsultas.get("nivelUrgencia").setValue(configuracion.nivelUrgencia);
  }
  closeDialogGuardar() {
    this.enviarInterconsultas();
    this.ref.close(
      this.config.data ? {
        index: this.config.data.index,
        row: this.dataInterconsultas[0]
      } :
        this.dataInterconsultas[0]);
  }

  closeDialog() {
    this.ref.close();
  }


}
