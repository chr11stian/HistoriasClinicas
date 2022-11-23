import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { TipoTurnoService } from 'src/app/mantenimientos/services/tipo-turno.service';
import Swal from 'sweetalert2';
import {DatePipe} from "@angular/common";

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
  datePipe = new DatePipe('en-US');
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
      nombre: [{value:'',disabled:false}, [Validators.required]],
      nroHoras: [{value:'',disabled:true}, [Validators.required]],
      horaInicio: [{value:'',disabled:false}, [Validators.required]],
      horaFin: [{value:'',disabled:true}, [Validators.required]],
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
    let horaFin = new Date(this.formTurno.get("horaInicio").value);
    let nroHoras = this.formTurno.get("nroHoras").value;
    horaFin.setHours(horaFin.getHours() + nroHoras);
    this.formTurno.get('horaFin').setValue(new Date(`2021-01-01 ${horaFin.getHours()}: ${horaFin.getMinutes()}:00`));
  }
  saveTurno(rowData) {
    let horaInicio = this.datePipe.transform(this.formTurno.get("horaInicio").value, 'HH:mm:ss')
    let horaFin = this.datePipe.transform(this.formTurno.get("horaFin").value, 'HH:mm:ss')
    const req = {
      nombre: this.formTurno.get("nombre").value.nombre,
      abreviatura: this.formTurno.get("nombre").value.abreviatura,
      nroHoras: this.formTurno.get("nroHoras").value,
      horaInicio: horaInicio,
      horaFin: horaFin
    }
    this.ipressservice.createTurnoIpress(this.idIpress, req).subscribe(
      result => {
        if(result.cod=="2405"){
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
        else{
          Swal.fire({
            icon: 'info',
            title: 'Elemento repetido',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    )
  }

  tituloTurno() {
    if (this.isUpdateTurno) return "Edite Turno";
    else return "Ingrese Nuevo Turno";
  }
  saveEdicionTurno() {
    let horaInicio = this.datePipe.transform(this.formTurno.get("horaInicio").value, 'HH:mm:ss')
    let horaFin = this.datePipe.transform(this.formTurno.get("horaFin").value, 'HH:mm:ss')
    const req = {
      nombre: this.formTurno.get("nombre").value.nombre,
      abreviatura: this.formTurno.get("nombre").value.abreviatura,
      nroHoras: this.formTurno.get("nroHoras").value,
      horaInicio: horaInicio,
      horaFin: horaFin
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
        this.ipressservice.deleteTurnoIpress(this.idIpress, rowData.abreviatura).subscribe(result => {
          if(result.cod=="2405"){
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: '',
              showConfirmButton: false,
              timer: 1500
            })
            this.getIpressId();
          }
          else{
            Swal.fire({
              icon: 'info',
              title: 'Elemento no borrado',
              text: '',
              showConfirmButton: false,
              timer: 1500,
            })
          }
          });
      }
    })
  }
  ngOnInit(): void {
  }
}
