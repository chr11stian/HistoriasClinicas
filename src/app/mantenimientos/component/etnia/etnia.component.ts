import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { EtniaService } from '../../services/etnia/etnia.service';

@Component({
  selector: 'app-etnia',
  templateUrl: './etnia.component.html',
  styleUrls: ['./etnia.component.css']
})
export class EtniaComponent implements OnInit {
  // Creacion del formulario
  form: FormGroup;

  data: any[] = [];
  isUpdate: boolean = false;
  idUpdate: string = "";

  etniaList: any[];
  etniaDialog: boolean;
  constructor(
    private etniaservice: EtniaService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getEtnia();
    this.etniaList = [{ label: 'Mestizo', value: '1' }, 
                      { label: 'Afro descendiente', value: '2' }, 
                      { label: 'Andino', value: '3' },
                      { label: 'Indígena amazónico', value: '4' },
                      { label: 'Asiático descendiente', value: '5' },
                      { label: 'Otro', value: '6' }];
   }

   buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      tipoEtnia: ['', [Validators.required]],
      codigoSIS: ['', [Validators.required]],
      codigoHIS: ['', [Validators.required]],
    })
  }
  getEtnia() {
    this.etniaservice.getEtnia().subscribe((res: any) => {
      this.data = res.object;
    });
  }
  saveForm() {
    this.isUpdate = false;
    const req = {
      descripcion: this.form.value.descripcion,
      tipoEtnia: this.form.value.tipoEtnia,
      codigoSIS: this.form.value.codigoSIS,
      codigoHIS: this.form.value.codigoHIS,
    }
    if (req.descripcion.trim() !== "") {
      this.etniaservice.createEtnia(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getEtnia();
          this.etniaDialog = false;
        }
      )
    }
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('descripcion').setValue("");
    this.form.get('tipoEtnia').setValue("1");
    this.form.get('codigoSIS').setValue("");
    this.form.get('codigoHIS').setValue("");
    this.etniaDialog = true;
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.get('descripcion').setValue(rowData.descripcion);
    this.form.get('tipoEtnia').setValue(rowData.tipoEtnia);
    this.form.get('codigoSIS').setValue(rowData.codigoSIS);
    this.form.get('codigoHIS').setValue(rowData.codigoHIS);
    this.idUpdate = rowData.id;
    this.etniaDialog = true;
  }
  editarDatos(rowData) {
    const req = {
      id: this.idUpdate,
      descripcion: this.form.value.descripcion,
      tipoEtnia: this.form.value.tipoEtnia,
      codigoSIS: this.form.value.codigoSIS,
      codigoHIS: this.form.value.codigoHIS,
    }

    this.etniaservice.editEtnia(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getEtnia();
        this.etniaDialog = false;
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
        this.etniaservice.deleteEtnia(rowData.id).subscribe(
          result => {
            this.getEtnia()
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
    this.etniaDialog = false;
  }

  titulo() {
    if (this.isUpdate) return "Edite Etnia";
    else return "Ingrese Nueva Etnia";
  }

  valorTipoEtnia(valor) {
    for (let i=0; i<this.etniaList.length; i++){
      if (valor===this.etniaList[i].value) return this.etniaList[i].label;
    }
  }

  ngOnInit(): void {
  }
}
