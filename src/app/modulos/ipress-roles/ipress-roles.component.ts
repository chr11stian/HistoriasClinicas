import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { UpsService } from 'src/app/mantenimientos/services/ups/ups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ipress-roles',
  templateUrl: './ipress-roles.component.html',
  styleUrls: ['./ipress-roles.component.css']
})
export class IpressRolesComponent implements OnInit {
  formRol: FormGroup;
  isUpdateRol: boolean = false;
  idIpress: string = "";
  UPSList: any[];
  roles: any[];
  rolDialog: boolean;

  datePipe = new DatePipe('en-US');
  constructor(
    private ipressservice: IpressService,
    private upsService: UpsService,
    private formBuilder: FormBuilder
  ) { 
    this.idIpress = "616de45e0273042236434b51";
    this.buildForm();
    this.getIpressId();
    this.getUPS();
  }

  getIpressId() {
    this.ipressservice.getIpressID(this.idIpress).subscribe((res: any) => {
      this.roles = res.object.roles;
    });
  }
  getUPS() {
    this.upsService.getUPS().subscribe((res: any) => {
      this.UPSList = res.object;
    })
  }
  buildForm() {
    this.formRol = this.formBuilder.group({
      nombreFuncion: ['', [Validators.required]],
      nombreUPS: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
      tiempoPromedioAtencion: ['', [Validators.required]],
      tiempoPreparacion: ['', [Validators.required]],
    })
  }
  openNew() {
    this.isUpdateRol = false;
    this.formRol.reset();
    this.formRol.get('nombreFuncion').setValue("");
    this.formRol.get('nombreUPS').setValue("");
    this.formRol.get('fechaRegistro').setValue("");
    this.formRol.get('tiempoPromedioAtencion').setValue("");
    this.formRol.get('tiempoPreparacion').setValue("");
    this.rolDialog = true;
  }
  onChangeUPS() {
    this.formRol.get('nombreFuncion').setValue(this.formRol.value.nombreUPS.tiposUPS);
  }
  buscarNombreUPS(rowData) {
    return this.UPSList.find(ups => ups.codUPS === rowData).nombreUPS;
  }
  editarRol(rowData) {
    this.isUpdateRol = true;
    this.formRol.get('nombreFuncion').setValue(rowData.nombreFuncion);
    this.formRol.get('nombreUPS').setValue(this.UPSList.find(ups => ups.codUPS === rowData.codUPS));
    this.formRol.get('tiempoPreparacion').setValue(rowData.tiempoPreparacion);
    this.formRol.get('tiempoPromedioAtencion').setValue(rowData.tiempoPromedioAtencion);
    this.formRol.get('fechaRegistro').setValue(this.datePipe.transform(rowData.fechaRegistro, 'yyyy-MM-dd'));
    this.rolDialog = true;
  }
  tituloRol() {
    if (this.isUpdateRol) return "Edite Rol";
    else return "Ingrese Nuevo Rol";
  }
  eliminarRol(rowData) {
    this.isUpdateRol = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ipressservice.deleteRolIpress(this.idIpress, rowData.codUPS).subscribe(
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
  saveRol() {
    const req = {
      nombreFuncion: this.formRol.value.nombreFuncion,
      codUPS: this.formRol.value.nombreUPS.codUPS,
      tiempoPromedioAtencion: this.formRol.value.tiempoPromedioAtencion,
      tiempoPreparacion: this.formRol.value.tiempoPreparacion,
      fechaRegistro: this.formRol.value.fechaRegistro + " " + "00:00:00"
    }

    this.ipressservice.createRolIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.formRol.reset();
        this.rolDialog = false;
      }
    )
  }
  saveEdicionRol() {
    const req = {
      nombreFuncion: this.formRol.value.nombreFuncion,
      codUPS: this.formRol.value.nombreUPS.codUPS,
      tiempoPromedioAtencion: this.formRol.value.tiempoPromedioAtencion,
      tiempoPreparacion: this.formRol.value.tiempoPreparacion,
      fechaRegistro: this.formRol.value.fechaRegistro + " " + "00:00:00"
    }
    this.ipressservice.editRolIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.formRol.reset();
        this.rolDialog = false;
      }
    )
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.rolDialog = false;
    this.formRol.reset();
  }
  ngOnInit(): void {
  }

}
