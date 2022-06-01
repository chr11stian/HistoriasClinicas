import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { UpsService } from 'src/app/mantenimientos/services/ups/ups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ipress-ambientes',
  templateUrl: './ipress-ambientes.component.html',
  styleUrls: ['./ipress-ambientes.component.css']
})
export class IpressAmbientesComponent implements OnInit {

  formAmbiente: FormGroup;
  isUpdateAmbiente: boolean = false;
  UPSList: any[];
  ambientes: any[];
  ambienteDialog: boolean;
  idIpress: string;

  constructor(
    private ipressservice: IpressService,
    private upsService: UpsService,
    private formBuilder: FormBuilder
  ) {
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.buildForm();
    this.getIpressId();
    this.getUPS();
  }

  getIpressId() {
    this.ipressservice.getIpressID(this.idIpress).subscribe((res: any) => {
      this.ambientes = res.object.ambientes;
    });
  }
  getUPS() {
    this.upsService.getUPS().subscribe((res: any) => {
      this.UPSList = res.object;
    })
  }
  buildForm() {
    this.formAmbiente = this.formBuilder.group({
      codAmbiente: ['', [Validators.required]],
      ambiente: ['', [Validators.required]],
      nombreUPS: ['', [Validators.required]],
    })
  }
  openNew() {
    this.isUpdateAmbiente = false;
    this.formAmbiente.reset();
    this.formAmbiente.get('codAmbiente').setValue("");
    this.formAmbiente.get('ambiente').setValue("");
    this.formAmbiente.get('nombreUPS').setValue("");
    this.ambienteDialog = true;
  }
  editarAmbiente(rowData) {
    this.isUpdateAmbiente = true;
    console.log(rowData);
    this.formAmbiente.get('codAmbiente').setValue(rowData.codAmbiente);
    this.formAmbiente.get('ambiente').setValue(rowData.ambiente);
    this.formAmbiente.get('nombreUPS').setValue(rowData.nombreUPS);
    this.ambienteDialog = true;
  }
  saveEdicionAmbiente() {
    const req = {
      codAmbiente: this.formAmbiente.value.codAmbiente,
      ambiente: this.formAmbiente.value.ambiente,
      nombreUPS: this.formAmbiente.value.nombreUPS
    }
    this.ipressservice.editAmbienteIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.formAmbiente.reset();
        this.ambienteDialog=false;
      }
    )
  }

  tituloAmbiente() {
    if (this.isUpdateAmbiente) return "Edite Ambiente";
    else return "Ingrese Nuevo Ambiente";
  }
  saveAmbiente(rowData) {
    const req = {
      codAmbiente: this.formAmbiente.value.codAmbiente,
      ambiente: this.formAmbiente.value.ambiente,
      nombreUPS: this.formAmbiente.value.nombreUPS
    }

    this.ipressservice.createAmbienteIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.formAmbiente.reset();
        this.ambienteDialog = false;
      }
    )
  }
  
  eliminarAmbiente(rowData) {
    this.isUpdateAmbiente = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ipressservice.deleteAmbienteIpress(this.idIpress, rowData.codAmbiente).subscribe(
          result => {
            this.getIpressId();
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
    this.ambienteDialog = false;
    this.formAmbiente.reset();
  }
  ngOnInit(): void {
  }

}
