import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { TipoTurnoService } from 'src/app/mantenimientos/services/tipo-turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ipress-turnos',
  templateUrl: './ipress-turnos.component.html',
  styleUrls: ['./ipress-turnos.component.css']
})
export class IpressTurnosComponent implements OnInit {
  formTurno: FormGroup;
  isUpdateTurno: boolean = false;
  idIpress: string = "";
  tipoTurnosList: any[];
  turnos: any[];
  turnoDialog: boolean;

  constructor(
    private ipressservice: IpressService,
    private tipoturnoService: TipoTurnoService,
    private formBuilder: FormBuilder
  ) { 
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.buildForm();
    this.getIpressId();
    this.getTiposTurno();
  }
  getIpressId() {
    this.ipressservice.getIpressID(this.idIpress).subscribe((res: any) => {
      this.turnos = res.object.turnos;
    });
  }
  getTiposTurno() {
    this.tipoturnoService.getTipoTurnos().subscribe((res: any) => {
      this.tipoTurnosList = res.object;
    })
  }
  buildForm() {
    this.formTurno = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nroHoras: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
    })
  }
  openNew() {
    this.isUpdateTurno = false;
    this.formTurno.reset();
    this.formTurno.get('nombre').setValue("");
    this.formTurno.get('nroHoras').setValue("");
    this.formTurno.get('horaInicio').setValue("");
    this.formTurno.get('horaFin').setValue("");
    this.turnoDialog = true;
  }

  editarTurno(rowData) {
    this.isUpdateTurno = true;
    this.formTurno.get('nombre').setValue(this.tipoTurnosList.find(turno => turno.nombre === rowData.nombre));
    this.formTurno.get('nroHoras').setValue(rowData.nroHoras);
    this.formTurno.get('horaInicio').setValue(new Date(`2021-01-01 ${rowData.horaInicio}`));
    this.formTurno.get('horaFin').setValue(new Date(`2021-01-01 ${rowData.horaFin}`));
    this.turnoDialog = true;
  }
  selectedTipoTurno() {
    this.formTurno.get('nroHoras').setValue(this.formTurno.value.nombre.nroHoras);
  }
  selectedHoraInicio() {
    let horaFin = new Date(this.formTurno.value.horaInicio);
    let nroHoras = this.formTurno.value.nroHoras;
    horaFin.setHours(horaFin.getHours() + nroHoras);
    this.formTurno.get('horaFin').setValue(new Date(`2021-01-01 ${horaFin.getHours()}: ${horaFin.getMinutes()}:00`));
  }
  saveTurno(rowData) {
    let horaInicio = new Date(this.formTurno.value.horaInicio);
    let horaFin = new Date(this.formTurno.value.horaFin);
    const req = {
      nombre: this.formTurno.value.nombre.nombre,
      abreviatura: this.formTurno.value.nombre.abreviatura,
      nroHoras: this.formTurno.value.nroHoras,
      horaInicio: `${horaInicio.getHours()}:${horaInicio.getMinutes()}:00`,
      horaFin: `${horaFin.getHours()}:${horaFin.getMinutes()}:00`
    }

    this.ipressservice.createTurnoIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.formTurno.reset();
        this.formTurno.get('nombre').setValue("");
        this.turnoDialog = false;
      }
    )
  }

  tituloTurno() {
    if (this.isUpdateTurno) return "Edite Turno";
    else return "Ingrese Nuevo Turno";
  }
  saveEdicionTurno() {
    let horaInicio = new Date(this.formTurno.value.horaInicio);
    let horaFin = new Date(this.formTurno.value.horaFin);
    const req = {
      nombre: this.formTurno.value.nombre.nombre,
      abreviatura: this.formTurno.value.nombre.abreviatura,
      nroHoras: this.formTurno.value.nroHoras,
      horaInicio: `${horaInicio.getHours()}:${horaInicio.getMinutes()}:00`,
      horaFin: `${horaFin.getHours()}:${horaFin.getMinutes()}:00`
    }
    this.ipressservice.editTurnoIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.formTurno.reset();
        this.formTurno.get('nombre').setValue("");
        this.turnoDialog = false;
      }
    )
  }
  eliminarTurno(rowData) {
    this.isUpdateTurno = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ipressservice.deleteTurnoIpress(this.idIpress, rowData.abreviatura).subscribe(
          result => {
            this.getIpressId();
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.turnoDialog = false;
    this.formTurno.reset();
    this.formTurno.get('nombre').setValue("");
  }
  ngOnInit(): void {
  }

}
