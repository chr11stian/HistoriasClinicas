import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { CondicionPacienteRiesgoService } from '../../services/condicion-paciente-riesgo/condicion-paciente-riesgo.service';

@Component({
  selector: 'app-condicion-paciente-riesgo',
  templateUrl: './condicion-paciente-riesgo.component.html',
  styleUrls: ['./condicion-paciente-riesgo.component.css']
})
export class CondicionPacienteRiesgoComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";
  constructor(
    private condicionPacienteRiesgoservice: CondicionPacienteRiesgoService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getCondicionPacienteRiesgo();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      idcpr: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  getCondicionPacienteRiesgo() {
    this.condicionPacienteRiesgoservice.getCondicionPacienteRiesgo().subscribe((res: any) => {
      this.data = res.object;
    });
  }

  saveForm() {
    console.log("guardar");
    this.isUpdate = false;
    const req = {
      idcpr: this.form.value.idcpr,
      nombre: this.form.value.nombre,
    }
    if (req.idcpr.trim() !== "" || req.nombre.trim() !== "") {
      this.condicionPacienteRiesgoservice.createCondicionPacienteRiesgo(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Condicion Paciente Riesgo',
            showConfirmButton: false,
            timer: 1000
          })
          this.getCondicionPacienteRiesgo();
          this.guardarNuevo();
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingresa datos correctos!'
      })
    }
  }

  guardarNuevo() {
    this.isUpdate = false;
    this.form.reset();
  }

  editar(rowData) {
    this.isUpdate = true;
    this.form.get('idcpr').setValue(rowData.idcpr)
    this.form.get('nombre').setValue(rowData.nombre)
    this.idUpdate = rowData.id;
  }

  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      idcpr: this.form.value.idcpr,
      nombre: this.form.value.nombre,
    }
    this.condicionPacienteRiesgoservice.editCondicionPacienteRiesgo(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: 'Condicion Paciente Riesgo',
          showConfirmButton: false,
          timer: 1000
        })
        this.getCondicionPacienteRiesgo();
        this.guardarNuevo();
      }
    )
  }

  eliminar(rowData) {
    this.isUpdate = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.condicionPacienteRiesgoservice.deleteCondicionPacienteRiesgo(rowData.id).subscribe(
          result => {
            this.getCondicionPacienteRiesgo()
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
