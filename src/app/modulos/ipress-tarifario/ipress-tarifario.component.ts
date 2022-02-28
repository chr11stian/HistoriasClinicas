import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarifarioService } from 'src/app/core/services/tarifario/tarifario.service';
import { UpsService } from 'src/app/mantenimientos/services/ups/ups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ipress-tarifario',
  templateUrl: './ipress-tarifario.component.html',
  styleUrls: ['./ipress-tarifario.component.css']
})
export class IpressTarifarioComponent implements OnInit {
  formTarifa: FormGroup;
  isUpdateTarifa: boolean = false;
  idIpress: string = "";
  UPSList: any[];
  tarifas: any[];
  tarifaDialog: boolean;

  tiposPagosCaja: any[] = [
    "CONSULTA",
    "PROCEDIMIENTO"
  ];

  datePipe = new DatePipe('en-US');
  constructor(
    private tarifarioService: TarifarioService,
    private upsService: UpsService,
    private formBuilder: FormBuilder
  ) { 
    this.idIpress = "616de45e0273042236434b51";
    this.buildForm();
    this.getTarifasId();
    this.getUPS();
  }

  getTarifasId() {
    this.tarifarioService.listarTarifasIpress(this.idIpress).subscribe((res: any) => {
      this.tarifas = res.object;
    });
  }
  getUPS() {
    this.upsService.getUPS().subscribe((res: any) => {
      this.UPSList = res.object;
    })
  }
  buildForm() {
    this.formTarifa = this.formBuilder.group({
      nombreUPS: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      costo: ['', [Validators.required]],
    })
  }
  openNew() {
    this.isUpdateTarifa = false;
    this.formTarifa.reset();
    this.formTarifa.get('nombreUPS').setValue("");
    this.formTarifa.get('codigo').setValue("");
    this.formTarifa.get('descripcion').setValue("");
    this.formTarifa.get('tipo').setValue("");
    this.formTarifa.get('costo').setValue("");
    this.tarifaDialog = true;
  }
  buscarNombreUPS(rowData) {
    return this.UPSList.find(ups => ups.codUPS === rowData).nombreUPS;
  }
  editarTarifa(rowData) {
    this.isUpdateTarifa = true;
    this.formTarifa.get('nombreUPS').setValue(rowData.ups);
    this.formTarifa.get('codigo').setValue(rowData.codigo);
    this.formTarifa.get('descripcion').setValue(rowData.descripcion);
    this.formTarifa.get('tipo').setValue(rowData.tipo);
    this.formTarifa.get('costo').setValue(rowData.costo);
    this.tarifaDialog = true;
  }
  tituloTarifa() {
    if (this.isUpdateTarifa) return "Edite Tarifa";
    else return "Ingrese Nueva Tarifa";
  }
  cambiarEstadoTarifa(rowData) {
    this.isUpdateTarifa = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      icon: 'warning',
      title: 'Estas seguro de cambiar de estado?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tarifarioService.cambiarEstadoTarifa(rowData.id).subscribe(
          result => {
            this.getTarifasId();
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Cambió de estado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  saveTarifa() {
    const req = {
      idIpress: this.idIpress,
      ups: this.formTarifa.value.nombreUPS,
      codigo: this.formTarifa.value.codigo,
      descripcion: this.formTarifa.value.descripcion,
      tipo: this.formTarifa.value.tipo,
      costo: this.formTarifa.value.costo,
    }

    this.tarifarioService.createTarifa(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getTarifasId();
        this.formTarifa.reset();
        this.tarifaDialog = false;
      }
    )
  }
  saveEdicionaTarifa() {
    const req = {
      idIpress: this.idIpress,
      ups: this.formTarifa.value.nombreUPS,
      codigo: this.formTarifa.value.codigo,
      descripcion: this.formTarifa.value.descripcion,
      tipo: this.formTarifa.value.tipo,
      costo: this.formTarifa.value.costo,
    }
    this.tarifarioService.updateTarifa(req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getTarifasId();
        this.formTarifa.reset();
        this.tarifaDialog = false;
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
    this.tarifaDialog = false;
    this.formTarifa.reset();
  }
  ngOnInit(): void {
  }

}
