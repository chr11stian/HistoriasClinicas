  import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CitasService } from 'src/app/core/services/citas/citas.service';
import { RolGuardiaService } from 'src/app/core/services/rol-guardia/rol-guardia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  form: FormGroup;
  formConfirmar: FormGroup;
  formReprogramar: FormGroup;
  formVerCitas: FormGroup;

  data: any[];
  fecha: Date = new Date();
  datePipe = new DatePipe("en-US");
  idIpress: String = "";
  nombreIpress: String = "";
  servicios: any[];
  citas: any[]=[];
  confirmarDialog: boolean = false;
  reprogramarDialog: boolean = false;
  verCitasDialog: boolean = false;

  constructor(
    private rolGuardiaService: RolGuardiaService,
    private citasService: CitasService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.nombreIpress = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
    this.data = [];
    this.servicios = [];

    this.getListaServiciosXIpress();
    this.getListaCitasXServicio();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltroInicio: [new Date()],
      fechaFiltroFin: [new Date()],
      servicio: [""],
      nroDoc: [""],
    })
    this.formConfirmar = this.formBuilder.group({

    })
    this.formReprogramar = this.formBuilder.group({
      nroDoc: [""],
      nombre: [""],
      servicio: [""],
      fecha: [""],
      fechaReprogramacion: ['', [Validators.required]]
    })
    this.formVerCitas = this.formBuilder.group({
      nroDoc: [""],
      nombre: [""],
      sexo: [""],
      fechaNacimiento: [""],
      edad: [""],
    })
  }

  /**lista los Servicios por IPRESS**/
  getListaServiciosXIpress() {
    this.rolGuardiaService.getServiciosPorIpress(this.idIpress).subscribe((res: any) => {
      this.servicios = res.object;
      console.log('LISTA DE SERVICIOS DE IPRESSS', this.servicios);
    })
  }

  getListaCitasXServicio() {
    let data = {
      fechaInicio: this.datePipe.transform(this.form.value.fechaFiltroInicio, 'yyyy-MM-dd'),
      fechaFin: this.datePipe.transform(this.form.value.fechaFiltroFin, 'yyyy-MM-dd'),
      servicio: this.form.value.servicio,
    }

    console.log('DATA ', data);

    this.citasService.listarCitasXservicio(data).subscribe((res: any) => {
      this.data = res.object;
      console.log('LISTA DE CITAS X SERVICIO IPRESS', this.data);
    })
  }

  openConfirmar(data) {
    this.confirmarDialog = true;
  }
  openReprogramacion(data) {
    this.reprogramarDialog = true;
  }
  cancelarCita(datos) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      icon: 'warning',
      title: 'Estás seguro de cancelar esta cita?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let data={
          id: datos.id,
          fecha: datos.proxCita.fecha,
          servicio: datos.servicio,
          tipoCita: datos.tipoCita
        }
        this.citasService.cancelarCita(data).subscribe(
          result => {
            this.getListaCitasXServicio();
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Cita cancelada correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  openVerTodasCitas(data) {
    this.verCitasDialog = true;
  }


  guardarReprogramacion() {

  }
  ngOnInit(): void {
  }

}
