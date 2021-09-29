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
  estado: boolean=true;

  datosprueba: any[] = [{
    "idSis": "0001",
    "nombre": "especialidad1",
    "estado": true
  },
  {
    "idSis": "0002",
    "nombre": "especialidad2",
    "estado": true
  },
  {
    "idSis": "0003",
    "nombre": "especialidad3",
    "estado": false
  }
  ]
  constructor(
    private especialidadservice: EspecialidadService,
    private formBuilder: FormBuilder
  ) { 
    this.buildForm();
    this.getEspecialidad();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      idSis: ['', [Validators.required]],
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
    console.log("guardar");
    this.isUpdate=false;
    const req = {
      idSis: this.form.value.idSis,
      nombre: this.form.value.nombre,
      estado: this.estado
    }
    if (req.idSis.trim()!=="" || req.nombre.trim()!==""){
      this.especialidadservice.createEspecialidad(req).subscribe(
        result => {
            Swal.fire({
              icon: 'success',
              title: 'Agregado correctamente',
              text: '',
              showConfirmButton: false,
            })
            this.getEspecialidad();
            this.guardarNuevo(); 
        }
      )
    } 
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingresa datos correctos!'
      })
    } 
  }
  guardarNuevo(){
    this.isUpdate=false;
    this.form.reset();
  }
  editar(rowData) {
    this.isUpdate=true;
    this.form.get('idSis').setValue(rowData.idSis);
    this.form.get('nombre').setValue(rowData.nombre);
    this.estado = rowData.estado;
    this.idUpdate=rowData.id;
  }
  editarDatos(rowData){
    const req = {
      id: this.idUpdate,
      idSis: this.form.value.idSis,
      nombre: this.form.value.nombre,
      estado: this.estado
    }
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Editar',
      icon: 'warning',
      title: 'Estas seguro de editar estos datos',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadservice.editEspecialidad(req).subscribe(
          result => {
              Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
              })
              this.getEspecialidad();
              this.guardarNuevo();
          }
        )
      } 
    })
    
  }

  eliminar(rowData){
    this.isUpdate=false;
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
        Swal.fire('Eliminado!', '', 'success');
      } 
    })
  }

  ngOnInit(): void {
  }
  test(){
    console.log(this.estado)
  }

}
