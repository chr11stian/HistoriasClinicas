import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { GrupoEtarioService } from '../../services/grupo-etario/grupo-etario.service';

@Component({
  selector: 'app-grupo-etario',
  templateUrl: './grupo-etario.component.html',
  styleUrls: ['./grupo-etario.component.css']
})
export class GrupoEtarioComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";

  stateOptions: any[];
  sexoList: any[];
  grupoEtarioDialog: boolean;
  constructor(
    private grupoetarioservice: GrupoEtarioService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getGrupoEtario();
    this.stateOptions = [{ label: 'Si', value: 'S' }, { label: 'No', value: 'N' }];
    this.sexoList = [{ label: 'Femenino', value: 'Femenino' }, { label: 'Masculino', value: 'Masculino' }, { label: 'Ambos', value: 'Ambos' }];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      edadMaxima: ['', [Validators.required]],
      edadMinima: ['', [Validators.required]],
      esGestante: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    })
  }
  getGrupoEtario() {
    this.grupoetarioservice.getGrupoEtario().subscribe((res: any) => {
      this.data = res.object;
    });
  }

  saveForm() {
    this.isUpdate = false;
    const req = {
      descripcion: this.form.value.descripcion,
      edadMaxima: this.form.value.edadMaxima,
      edadMinima: this.form.value.edadMinima,
      esGestante: this.form.value.esGestante,
      sexo: this.form.value.sexo
    }
    if (req.descripcion.trim() !== "") {
      this.grupoetarioservice.createGrupoEtario(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
          })
          this.getGrupoEtario();
          this.grupoEtarioDialog = false;
        }
      )
    }
  }

  openNew() {
    this.isUpdate = false;
    this.form.get('descripcion').setValue("");
    this.form.get('edadMinima').setValue(0);
    this.form.get('edadMaxima').setValue(0);
    this.form.get('esGestante').setValue("S");
    this.form.get('sexo').setValue("Femenino");
    this.grupoEtarioDialog = true;
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.get('descripcion').setValue(rowData.descripcion);
    this.form.get('edadMinima').setValue(rowData.edadMinima);
    this.form.get('edadMaxima').setValue(rowData.edadMaxima);
    this.form.get('esGestante').setValue(rowData.esGestante);
    this.form.get('sexo').setValue(rowData.sexo);
    this.idUpdate = rowData.id;
    this.grupoEtarioDialog = true;
  }
  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      descripcion: this.form.value.descripcion,
      edadMaxima: this.form.value.edadMaxima,
      edadMinima: this.form.value.edadMinima,
      esGestante: this.form.value.esGestante,
      sexo: this.form.value.sexo,
    }

    this.grupoetarioservice.editGrupoEtario(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1000,
        })
        this.getGrupoEtario();
        this.grupoEtarioDialog = false;
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
        this.grupoetarioservice.deleteGrupoEtario(rowData.id).subscribe(
          result => {
            this.getGrupoEtario()
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

  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.grupoEtarioDialog = false;
  }
  verificarFemenino(sexo) {
    if (sexo == "Femenino") return true;
    else return false;
  }
  verificarMasculino(sexo) {
    if (sexo == "Masculino") return true;
    else return false;
  }
  verificarAmbos(sexo) {
    if (sexo == "Ambos") return true;
    else return false;
  }
  verificarGestante(gestante) {
    if (gestante == "S") return true;
    else return false;
  }
  valorSexo() {
    console.log(this.form.value.sexo)
  }
  titulo() {
    if (this.isUpdate) return "Edite Grupo Etario";
    else return "Ingrese Nuevo Grupo Etario";
  }

  ngOnInit(): void {
  }

}
