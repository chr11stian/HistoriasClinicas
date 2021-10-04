import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { CondicionPacienteService } from '../../services/condicion-paciente/condicion-paciente.service';

@Component({
  selector: 'app-condicion-paciente',
  templateUrl: './condicion-paciente.component.html',
  styleUrls: ['./condicion-paciente.component.css']
})
export class CondicionPacienteComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";

  stateOptions: any[];
  sexoList: any[];
  condicionPacienteDialog: boolean;
  constructor(
    private condicionpacienteservice: CondicionPacienteService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getCondicionPaciente();
    this.sexoList = [{ label: 'Femenino', value: "1" }, 
                     { label: 'Masculino', value: "2" }, 
                     { label: 'Ambos', value: "3" },
                     { label: 'Otro', value: "4" }];
   }

   buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      edadMaxima: ['', [Validators.required]],
      edadMinima: ['', [Validators.required]],
      idSexo: ['', [Validators.required]],
    })
  }
  getCondicionPaciente() {
    this.condicionpacienteservice.getCondicionPaciente().subscribe((res: any) => {
      this.data = res.object;
    });
  }

  saveForm() {
    this.isUpdate = false;
    const req = {
      nombre: this.form.value.nombre,
      edadMaxima: this.form.value.edadMaxima,
      edadMinima: this.form.value.edadMinima,
      idSexo: this.form.value.idSexo
    }
    if (req.nombre.trim() !== "") {
      this.condicionpacienteservice.createCondicionPaciente(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getCondicionPaciente();
          this.condicionPacienteDialog = false;
        }
      )
    }
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('nombre').setValue("");
    this.form.get('edadMinima').setValue(0);
    this.form.get('edadMaxima').setValue(0);
    this.form.get('idSexo').setValue("1");
    this.condicionPacienteDialog = true;
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.get('nombre').setValue(rowData.nombre);
    this.form.get('edadMinima').setValue(rowData.edadMinima);
    this.form.get('edadMaxima').setValue(rowData.edadMaxima);
    this.form.get('idSexo').setValue(rowData.idSexo);
    this.idUpdate = rowData.id;
    this.condicionPacienteDialog = true;
  }
  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      nombre: this.form.value.nombre,
      edadMaxima: this.form.value.edadMaxima,
      edadMinima: this.form.value.edadMinima,
      idSexo: this.form.value.idSexo,
    }

    this.condicionpacienteservice.editCondicionPaciente(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getCondicionPaciente();
        this.condicionPacienteDialog = false;
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
        this.condicionpacienteservice.deleteCondicionPaciente(rowData.id).subscribe(
          result => {
            this.getCondicionPaciente()
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
    this.condicionPacienteDialog = false;
  }
  
  valorSexo(valor) {
    for (let i=0; i<this.sexoList.length; i++){
      if (valor===this.sexoList[i].value) return this.sexoList[i].label;
    }
  }
  titulo() {
    if (this.isUpdate) return "Edite Condicion Paciente";
    else return "Ingrese Nueva Condicion Paciente";
  }
  ngOnInit(): void {
  }

}
