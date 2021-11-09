import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { TipoSeguroService } from '../../services/tipo-seguro/tipo-seguro.service';

@Component({
  selector: 'app-tipo-seguro',
  templateUrl: './tipo-seguro.component.html',
  styleUrls: ['./tipo-seguro.component.css']
})
export class TipoSeguroComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";
  constructor(
    private tipoSeguroservice: TipoSeguroService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getTipoSeguro();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
    })
  }

  getTipoSeguro() {
    this.tipoSeguroservice.getTipoSeguro().subscribe((res: any) => {
      this.data = res.object;
    });
  }

  saveForm() {
    console.log("guardar");
    this.isUpdate = false;
    const req = {
      nombre: this.form.value.nombre,
    }
    if ( req.nombre.trim() !== "") {
      this.tipoSeguroservice.createTipoSeguro(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            showConfirmButton: false,
            timer: 1000
          })
          this.getTipoSeguro();
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
    this.form.get('nombre').setValue(rowData.nombre)
    this.idUpdate = rowData.id;
  }

  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      nombre: this.form.value.nombre,
    }
    this.tipoSeguroservice.editTipoSeguro(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: 'Tipo Seguro',
          showConfirmButton: false,
          timer: 1000
        })
        this.getTipoSeguro();
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
        this.tipoSeguroservice.deleteTipoSeguro(rowData.id).subscribe(
          result => {
            this.getTipoSeguro()
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
