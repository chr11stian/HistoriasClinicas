import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UnidadEjecutoraService } from '../../services/unidad-ejecutora/unidad-ejecutora.service';

@Component({
  selector: 'app-unidad-ejecutora',
  templateUrl: './unidad-ejecutora.component.html',
  styleUrls: ['./unidad-ejecutora.component.css']
})
export class UnidadEjecutoraComponent implements OnInit {
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";
  unidadDialog: boolean;

  constructor(
    private unidadEjecutoraService: UnidadEjecutoraService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getUnidadesEjecutoras();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  getUnidadesEjecutoras() {
    this.unidadEjecutoraService.getUnidadesEjecutoras().subscribe((res: any) => {
      this.data = res.object;
      console.log(this.data);
    });
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('codigo').setValue("");
    this.form.get('nombre').setValue("");
    this.unidadDialog = true;
  }
  saveForm() {
    console.log("guardar");
    this.isUpdate = false;
    const req = {
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
    }
    if (req.codigo.trim() !== "" || req.nombre.trim() !== "") {
      this.unidadEjecutoraService.createUnidadEjecutora(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: 'Colegio Profesional',
            showConfirmButton: false,
            timer: 1000
          })
          this.getUnidadesEjecutoras();
          this.guardarNuevo();
          this.unidadDialog = false;
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
    this.form.get('codigo').setValue(rowData.codigo)
    this.form.get('nombre').setValue(rowData.nombre)
    this.idUpdate = rowData.id;
    this.unidadDialog = true;

  }

  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
    }
    this.unidadEjecutoraService.editUnidadEjecutora(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          showConfirmButton: false,
          timer: 1000
        })
        this.getUnidadesEjecutoras();
        this.guardarNuevo();
        this.unidadDialog = false;
      }
    )
  }

  eliminar(rowData) {
    this.isUpdate = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.unidadEjecutoraService.deleteUnidadEjecutora(rowData.id).subscribe(
          result => {
            this.getUnidadesEjecutoras()
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
  titulo() {
    if (this.isUpdate) return "Edite unidad ejecutora";
    else return "Ingrese nueva unidad ejecutora";
  }

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.unidadDialog = false;
  }
  ngOnInit(): void {
  }

}
