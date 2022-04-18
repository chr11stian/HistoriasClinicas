import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ServicesService } from '../services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-pagos',
  templateUrl: './resumen-pagos.component.html',
  styleUrls: ['./resumen-pagos.component.css']
})
export class ResumenPagosComponent implements OnInit {
  form: FormGroup;
  formCaja: FormGroup;
  formCajaProcedimiento: FormGroup;

  idIpress: String;
  nombreIpress: String;
  DataPagos: any[];
  datePipe = new DatePipe("en-US");

  procedimientosPagar: any[] = [];

  DialogPagosProcedimientos: Boolean = false;
  Dialogpagos: Boolean = false;

  ipressNombre = "";
  ipressRenaes = "";
  ipressDireccion = "";
  ipressRUC = "";
  nroCaja: String = "";
  constructor(
    private servicesService: ServicesService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.nroCaja = JSON.parse(localStorage.getItem('cajaActual'));

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.ipressNombre = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
    this.ipressRenaes = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    this.ipressDireccion = JSON.parse(localStorage.getItem('usuario')).ipress.ubicacion.direccion;
    this.ipressRUC = JSON.parse(localStorage.getItem('usuario')).ipress.ruc;
    this.DataPagos = [];
    this.getListaPagosRealizados();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltroInicio: [new Date()],
      fechaFiltroFin: [new Date()],
      nroDoc: [""],
    })
    this.formCaja = this.formBuilder.group({
      fechaRecibo: [""],
      nroCaja: [""],
      nroBoleta: [""],
      apePaterno: [""],
      nombres: [""],
      estado: [""],
      precioServicio: [""],
      servicio: [""],
      tipoPago: [""],
      descripcionPago: [""],
      codigoPago: [""],
    })
    this.formCajaProcedimiento = this.formBuilder.group({
      fechaRecibo: [""],
      nroCaja: [""],
      nroBoleta: [""],
      apePaterno: [""],
      nombres: [""],
      estado: [""],
      precioTotal: [""],
    })
  }
  getListaPagosRealizados() {
    let data = {
      fechaInicio: this.datePipe.transform(this.form.value.fechaFiltroInicio, 'yyyy-MM-dd'),
      fechaFin: this.datePipe.transform(this.form.value.fechaFiltroFin, 'yyyy-MM-dd'),
    }

    console.log('DATA ', data);

    this.servicesService.listarPagosRealizados(this.idIpress, this.nroCaja, data).subscribe((res: any) => {
      this.DataPagos = res.object;
      console.log('LISTA DE pagos de caja 01', this.DataPagos);
    })
  }
  visualizarPago(rowData) {
    if (rowData.recibos.detalle !== null && rowData.recibos.detalle[0].idCupo == null) {
      this.DialogPagosProcedimientos = true;
      this.formCajaProcedimiento.get("nroCaja").setValue(this.nroCaja);
      this.formCajaProcedimiento.get("fechaRecibo").setValue(rowData.recibos.fechaEmision);
      this.formCajaProcedimiento.get("nroBoleta").setValue(rowData.recibos.nro);
      this.formCajaProcedimiento.get("apePaterno").setValue(rowData.recibos.apellidos);
      this.formCajaProcedimiento.get("nombres").setValue(rowData.recibos.nombres);
      this.formCajaProcedimiento.get("estado").setValue(rowData.recibos.estado);
      this.formCajaProcedimiento.get("precioTotal").setValue(rowData.recibos.importeTotal);
      this.procedimientosPagar = rowData.recibos.detalle;
    }
    else {
      this.Dialogpagos = true;
      this.formCaja.get("nroCaja").setValue(this.nroCaja);
      this.formCaja.get("fechaRecibo").setValue(rowData.recibos.fechaEmision);
      this.formCaja.get("nroBoleta").setValue(rowData.recibos.nro);
      this.formCaja.get("apePaterno").setValue(rowData.recibos.apellidos);
      this.formCaja.get("nombres").setValue(rowData.recibos.nombres);
      this.formCaja.get("estado").setValue(rowData.recibos.estado);
      this.formCaja.get("precioServicio").setValue(rowData.recibos.importeTotal);
      this.formCaja.get("servicio").setValue(rowData.recibos.detalle !== null ? rowData.recibos.detalle[0].ups : "CONSULTA");
      this.formCaja.get("tipoPago").setValue(rowData.recibos.detalle !== null ? rowData.recibos.detalle[0].tipo : "CONSULTA");
      this.formCaja.get("descripcionPago").setValue(rowData.recibos.detalle !== null ? rowData.recibos.detalle[0].descripcion : "CONSULTA");
      this.formCaja.get("codigoPago").setValue(rowData.recibos.detalle !== null ? rowData.recibos.detalle[0].codigo : "CON-1");
    }
  }
  salir() {
    this.DialogPagosProcedimientos = false;
    this.Dialogpagos = false;
    this.formCaja.reset();
    this.formCajaProcedimiento.reset();
    this.procedimientosPagar = [];
  }
  anularRecibo(rowData) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Anular',
      icon: 'warning',
      title: 'Estas seguro de anular este recibo?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicesService.anularRecibo(this.idIpress, this.nroCaja, rowData.recibos.nro).subscribe(
          result => {
            this.getListaPagosRealizados()
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Anulado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }
  ngOnInit(): void {
  }

}
