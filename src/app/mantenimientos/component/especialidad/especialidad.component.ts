import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { EspecialidadService } from '../../services/especialidad/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";
  estado: boolean;

  constructor(
    private especialidadservice: EspecialidadService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getEspecialidad();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      idSIS: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  getEspecialidad() {
    this.especialidadservice.getEspecialidad().subscribe((res: any) => {
      this.data = res.object;
      console.log(this.data);
    });
  }

  saveForm() {
    this.isUpdate = false;
    const req = {
      idSIS: this.form.value.idSIS,
      nombre: this.form.value.nombre,
      estado: this.estado
    }
    if (req.idSIS.trim() !== "" || req.nombre.trim() !== "") {
      this.especialidadservice.createEspecialidad(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getEspecialidad();
          this.guardarNuevo();
        }
      )
    }
    else {
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
    this.estado = true;
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.get('idSIS').setValue(rowData.idSIS);
    this.form.get('nombre').setValue(rowData.nombre);
    console.log(rowData.estado, typeof (rowData.estado));
    this.estado = rowData.estado;
    this.idUpdate = rowData.id;
  }
  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      idSIS: this.form.value.idSIS,
      nombre: this.form.value.nombre,
      estado: this.estado
    }
    this.especialidadservice.editEspecialidad(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEspecialidad();
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
        this.especialidadservice.deleteEspecialidad(rowData.id).subscribe(
          result => {
            this.getEspecialidad()
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

  ngOnInit(): void {
    this.estado = true;
  }

}
