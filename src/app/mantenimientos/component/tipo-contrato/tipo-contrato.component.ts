import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { TipoContratoService } from '../../services/tipo-contrato/tipo-contrato.service';

@Component({
  selector: 'app-tipo-contrato',
  templateUrl: './tipo-contrato.component.html',
  styleUrls: ['./tipo-contrato.component.css']
})
export class TipoContratoComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";
  tipoContratoDialog: boolean;
  estado: boolean;

  constructor(
    private tipocontratoservice: TipoContratoService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getTipoContrato();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      abreviatura: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  getTipoContrato() {
    this.tipocontratoservice.getTipoContrato().subscribe((res: any) => {
      this.data = res.object;
    });
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('nombre').setValue("");
    this.form.get('abreviatura').setValue("");
    this.form.get('descripcion').setValue("");
    this.tipoContratoDialog = true;
  }
  saveForm() {
    this.isUpdate = false;
    const req = {
      nombre: this.form.value.nombre,
      abreviatura: this.form.value.abreviatura,
      descripcion: this.form.value.descripcion,
    }
    if (req.nombre.trim() !== "" || req.abreviatura.trim() !== "" || req.descripcion.trim() !== "") {
      this.tipocontratoservice.createTipoContrato(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getTipoContrato();
          this.guardarNuevo();
          this.tipoContratoDialog = false;
        }
      )
    }
  }
  guardarNuevo() {
    this.isUpdate = false;
    this.form.reset();
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.get('nombre').setValue(rowData.nombre);
    this.form.get('abreviatura').setValue(rowData.abreviatura);
    this.form.get('descripcion').setValue(rowData.descripcion);
    this.idUpdate = rowData.id;
    this.tipoContratoDialog = true;
  }
  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      nombre: this.form.value.nombre,
      abreviatura: this.form.value.abreviatura,
      descripcion: this.form.value.descripcion,
    }
    this.tipocontratoservice.editTipoContrato(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTipoContrato();
        this.guardarNuevo();
        this.tipoContratoDialog = false;
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
        this.tipocontratoservice.deleteTipoContrato(rowData.id).subscribe(
          result => {
            this.getTipoContrato()
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

  titulo() {
    if (this.isUpdate) return "Edite Tipo de Contrato";
    else return "Ingrese Nuevo Tipo de Contrato";
  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.tipoContratoDialog = false;
  }
  ngOnInit(): void {
  }

}
