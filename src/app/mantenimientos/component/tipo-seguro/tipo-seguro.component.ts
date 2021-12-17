import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl } from "@angular/forms";
import { MessageService } from 'primeng/api';
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
  formTipoSeguro: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";
  dialogTipoSeguro: boolean = false;
  constructor(
    private tipoSeguroservice: TipoSeguroService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.buildForm();
    this.getTipoSeguro();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
    });
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
    if (req.nombre.trim() !== "") {
      this.tipoSeguroservice.createTipoSeguro(req).subscribe(
        result => {
          this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: result.mensaje
          });
          this.getTipoSeguro();
          this.dialogTipoSeguro = false;
        }
      )
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Alerta!",
        detail: "Ingrese los datos completos"
      });
    }
  }
  editar(rowData) {
    this.isUpdate = true;
    this.dialogTipoSeguro = true;
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
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: result.mensaje
        });
        this.getTipoSeguro();
        this.dialogTipoSeguro = false;
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

  openDialogTipoSeguro() {
    this.form.reset();
    this.dialogTipoSeguro = true;
    this.isUpdate = false;
  }

  ngOnInit(): void {
  }

}
