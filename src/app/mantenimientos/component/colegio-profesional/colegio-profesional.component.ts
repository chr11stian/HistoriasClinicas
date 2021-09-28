import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ColegioProfesionalService } from '../../services/colegio-profesional/colegio-profesional.service';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-colegio-profesional',
  templateUrl: './colegio-profesional.component.html',
  styleUrls: ['./colegio-profesional.component.css'],
  providers: [DialogService]
})
export class ColegioProfesionalComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";

  constructor(
    private colegioProfesionalservice: ColegioProfesionalService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getColegioProfesional();
  }
  
  buildForm() {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  getColegioProfesional() {
    this.colegioProfesionalservice.getColegioProfesional().subscribe((res: any) => {
      this.data = res.object;
      console.log(this.data);
    });
  }

  saveForm() {
    console.log("guardar");
    this.isUpdate=false;
    const req = {
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
    }
    if (req.codigo.trim()!=="" || req.nombre.trim()!==""){
      this.colegioProfesionalservice.createColegioProfesional(req).subscribe(
        result => {
            Swal.fire({
              icon: 'success',
              title: 'Agregado correctamente',
              text: '',
              showConfirmButton: false,
            })
            this.getColegioProfesional() 
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
    this.form.get('codigo').setValue(rowData.codigo)
    this.form.get('nombre').setValue(rowData.nombre)
    this.idUpdate=rowData.id;
  }
  editarDatos(rowData){
    const req = {
      id: this.idUpdate,
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
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
        this.colegioProfesionalservice.editColegioProfesional(req).subscribe(
          result => {
              Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
              })
              this.getColegioProfesional();
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
        this.colegioProfesionalservice.deleteColegioProfesional(rowData.id).subscribe(
          result => {
              this.getColegioProfesional() 
          }
        );
        Swal.fire('Eliminado!', '', 'success');
      } 
    })
  }

  ngOnInit(): void {}
}
