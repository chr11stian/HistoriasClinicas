import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-pago-procedimientos',
  templateUrl: './pago-procedimientos.component.html',
  styleUrls: ['./pago-procedimientos.component.css']
})
export class PagoProcedimientosComponent implements OnInit {

  DataPendientesPago: any;
  idIpressLapostaMedica = "616de45e0273042236434b51";
  ipressNombre = "Belempampa";
  ipressRenaes = "2306";
  ipressDireccion = "Urb. Tupac Amaru S/N";
  ipressTelefono = "084-457812";
  formCaja: FormGroup;
  datePipe = new DatePipe('en-US');
  datafecha: Date = new Date();
  Dialogpagos: boolean;
  idPagoCaja: any;

  tarifario = [
    {
      servicio: "OBSTETRICIA",
      costo: 20.00
    },
    {
      servicio: "MEDICINA GENERAL",
      costo: 30.00
    },
    {
      servicio: "ENFERMERIA",
      costo: 15.00
    },
  ]

  constructor(
    private servicesService: ServicesService,
    private fb: FormBuilder
  ) {
    console.log("traje usuario a caja", JSON.parse(localStorage.getItem('usuario')));
    this.buildForm();
    this.formCaja.get('fechaBusqueda').setValue(this.datafecha);
    this.getListaCuposConfirmados();
  }

  /** Selecciona  un servicio y fecha y lista las ofertas para reservar un cupo **/
  getListaCuposConfirmados() {
    let data = {
      fechaAtencion: this.datePipe.transform(this.formCaja.value.fechaBusqueda, 'yyyy-MM-dd')
      // fechaAtencion: "2022-01-20",
    }
    console.log('DATA', data);
    this.servicesService.getListaPendientesDePago(this.idIpressLapostaMedica, data).subscribe((res: any) => {
      this.DataPendientesPago = res.object;
      console.log('LISTA DE CUPOS PENDIENTES', this.DataPendientesPago);
    })
  }
  buildForm() {
    this.formCaja = this.fb.group({
      fechaBusqueda: new FormControl(''),
      nroCaja: new FormControl(''),
      nroBoleta: new FormControl('0013'),
      nroDoc: new FormControl(''),
      apePaterno: new FormControl(''),
      nombres: new FormControl(''),
      direccion: new FormControl(''),
      estado: new FormControl(''),
      servicio: new FormControl(''),
      nroCupo: new FormControl(''),
      fechaRecibo: new FormControl(''),
      fechaAtencion: new FormControl(''),
      horaAtencion: new FormControl(''),
      precioServicio: new FormControl(''),
      tipoSeguro: new FormControl(''),
      edad: new FormControl(''),
    })
  }
  ponerEdadEnLetras(anios, meses, dias) {
    let cadena = ""
    if (anios > 1) {
      cadena += anios + " años,";
    }
    else {
      if (anios != 0)
        cadena += anios + " año,"
    }
    if (meses > 1) {
      cadena += meses + " meses, ";
    }
    else {
      cadena += meses + " mes, "
    }
    if (dias > 1) {
      cadena += dias + " dias";
    }
    else {
      cadena += dias + " dia"
    }
    return cadena;
  }
  pagar() {
    let pago = {
      tipo: "C",
      tipoDocReceptor: "DNI",
      nroDocReceptor: "73145986",
      apellidos: this.formCaja.value.apePaterno,
      nombres: this.formCaja.value.nombres,
      servicio: this.formCaja.value.servicio,
      nroCupo: 0,
      fechaAtencion: this.formCaja.value.fechaAtencion,
      horaAtencion: this.formCaja.value.horaAtencion.split("-")[0],
      importeTotal: this.formCaja.value.precioServicio
    }

    this.servicesService.pagarCupo(this.idIpressLapostaMedica, "01", pago).subscribe((res: any) => {
      this.servicesService.UpdateCupoCAja(this.idPagoCaja).subscribe((res: any) => {
      });
      Swal.fire({
        icon: 'success',
        title: 'Registro',
        text: "exitosa",
        showConfirmButton: false,
        timer: 1500,
      })
      this.Dialogpagos = false;
      this.getListaCuposConfirmados();
    });
  }

  openModal(event) {
    this.Dialogpagos = true;
    this.idPagoCaja = event.id;
    console.log("ID PAGO", this.idPagoCaja);

    this.formCaja.get('nroDoc').setValue(event.paciente.nroDoc);
    this.formCaja.get('apePaterno').setValue(event.paciente.apellidos);
    this.formCaja.get('nombres').setValue(event.paciente.nombre);
    this.formCaja.get('edad').setValue(this.ponerEdadEnLetras(event.paciente.edadAnio, event.paciente.edadMes, event.paciente.edadDia));
    this.formCaja.get('estado').setValue(event.detallePago);
    this.formCaja.get('servicio').setValue(event.ipress.servicio);
    this.formCaja.get('nroCaja').setValue("01");
    this.formCaja.get('fechaRecibo').setValue(new Date().toLocaleString());
    this.formCaja.get('nroBoleta').setValue("00013");
    this.formCaja.get('fechaAtencion').setValue(event.fechaAtencion);
    this.formCaja.get('horaAtencion').setValue(event.horaAtencion + "-" + event.horaAtencionFin);
    this.formCaja.get('precioServicio').setValue((this.tarifario.find((serv) => serv.servicio == event.ipress.servicio)).costo);
    this.formCaja.get('tipoSeguro').setValue("NO SIS");
  }

  close() {
    this.Dialogpagos = false;
    this.getListaCuposConfirmados();
  }
  ngOnInit(): void {
  }

}
