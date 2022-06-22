import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { TarifarioService } from 'src/app/core/services/tarifario/tarifario.service';
import { UpsService } from 'src/app/mantenimientos/services/ups/ups.service';
import Swal from 'sweetalert2';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-pago-laboratorio',
  templateUrl: './pago-laboratorio.component.html',
  styleUrls: ['./pago-laboratorio.component.css']
})
export class PagoLaboratorioComponent implements OnInit {

  DataPendientesPago: any;
  idIpress = "";
  ipressNombre = "";
  ipressRenaes = "";
  ipressDireccion = "";
  ipressRUC = "";
  formCaja: FormGroup;
  formProcedimiento: FormGroup;
  datePipe = new DatePipe('en-US');
  datafecha: Date = new Date();
  Dialogpagos: boolean;
  Dialogprocedimientos: boolean;
  idPagoCaja: any;
  UPSList: any[];

  /**Edad nacimiento**/
  edad: any;
  meses: any;
  dias: any;

  procedimientos: any[] = [];
  procedimientosPagar: any[] = [];
  tiposPagosCaja: any[] = [
    "CONSULTA",
    "PROCEDIMIENTO"
  ];
  nroCaja: String = "";
  tipoDocReceptor: "";
  nroDocReceptor: "";
  constructor(
    private servicesService: ServicesService,
    private pacienteService: PacienteService,
    private tarifarioService: TarifarioService,
    private upsService: UpsService,
    private fb: FormBuilder
  ) {
    this.nroCaja = JSON.parse(localStorage.getItem('cajaActual'));
    this.tipoDocReceptor = JSON.parse(localStorage.getItem('usuario')).tipoDocumento;
    this.nroDocReceptor = JSON.parse(localStorage.getItem('usuario')).nroDocumento;

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.ipressNombre = JSON.parse(localStorage.getItem('usuario')).ipress.nombreEESS;
    this.ipressRenaes = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    this.ipressDireccion = JSON.parse(localStorage.getItem('usuario')).ipress.ubicacion.direccion;
    this.ipressRUC = JSON.parse(localStorage.getItem('usuario')).ipress.ruc;

    this.buildForm();
    this.formCaja.get('fechaBusqueda').setValue(this.datafecha);
    this.getListaOrdenesLaboratorio();
    this.getUPS();
  }

  /** Selecciona  un servicio y fecha y lista las ofertas para reservar un cupo **/
  getListaOrdenesLaboratorio() {
    this.servicesService.getListaOrdenesLaboratorioPendientes().subscribe((res: any) => {
      this.DataPendientesPago = res.object;
      console.log('LISTA DE LABOS PENDIENTES', this.DataPendientesPago);
    })
  }
  buildForm() {
    this.formCaja = this.fb.group({
      fechaBusqueda: new FormControl(''),
      nroCaja: new FormControl(''),
      nroBoleta: new FormControl(''),
      nroDoc: new FormControl(''),
      apePaterno: new FormControl(''),
      nombres: new FormControl(''),
      fechaRecibo: new FormControl(''),
      precioServicio: new FormControl(''),
      tipoSeguro: new FormControl(''),
      edad: new FormControl(''),
      precioTotal: new FormControl(''),

    })
    this.formProcedimiento = this.fb.group({
      cantidad: new FormControl('1'),
      ups: new FormControl(''),
      tipo: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      codigo: new FormControl(''),
    })
  }
  hallarEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
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
    let examenesLabo = [];
    this.procedimientosPagar.forEach((elto) => {
      examenesLabo.push({
        ups: "LABORATORIO",
        codigo: elto.nombreExamen,
        descripcion: elto.nombreExamen,
        tipo: "PROCEDIMIENTO",
        idCupo: null,
        cantidad: 1,
        precioUnitario: parseFloat(elto.precio),
        importe: parseFloat(elto.precio),
      })
      this.servicesService.guardarPagoExamenLabo(elto.idExamen).subscribe((res: any) => {});
    }
    )
    console.log("esto pasa por caja", examenesLabo);
    let datos = {
      tipo: "R",
      tipoDocReceptor: this.tipoDocReceptor,
      nroDocReceptor: this.nroDocReceptor,
      apellidos: this.formCaja.getRawValue().apePaterno,
      nombres: this.formCaja.getRawValue().nombres,
      detalle: examenesLabo,
      importeTotal: this.formCaja.getRawValue().precioTotal
    }
    this.servicesService.pagarRecibo(this.idIpress, this.nroCaja, datos).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Registro',
        text: "Pago exitoso",
        showConfirmButton: false,
        timer: 1500,
      })
      this.Dialogpagos = false;
      this.getListaOrdenesLaboratorio();
    });
  }

  buscarPacienteDatos() {
    let data = {
      tipoDoc: "DNI",
      nroDoc: this.formCaja.value.nroDoc
    }
    this.pacienteService.getPacienteByNroDoc(data).subscribe((res: any) => {
      console.log("paciente", res);
      let paciente = res.object;
      this.formCaja.get('apePaterno').setValue(paciente.apePaterno + " " + paciente.apeMaterno);
      this.formCaja.get('nombres').setValue(paciente.primerNombre + " " + paciente.otrosNombres);
      this.calcularEdad(this.obtenerFecha(paciente.nacimiento.fechaNacimiento));
      this.formCaja.get('edad').setValue(this.ponerEdadEnLetras(this.edad, this.meses, this.dias));
    });
  }
  obtenerFecha(fecha: Date): string {
    let arr = fecha.toString().split('-');
    const Year: string = arr[0];
    const Months: string = arr[1];
    const Day: string = arr[1];
    console.log(Year + '-' + Months + '-' + Day);
    return Year + '-' + Months + '-' + Day;
  }
  /**Calcula la edad del paciente**/
  calcularEdad(fecha) {
    /** Si la fecha es correcta, calculamos la edad*/
    if (typeof fecha != "string" && fecha && this.esNumero(fecha.getTime())) {
      fecha = fecha.formatDate(fecha, "yyyy-MM-dd");
    }
    let values = fecha.split("-");
    let dia = values[2];
    let mes = values[1];
    let ano = values[0];

    // cogemos los valores actuales
    let fecha_hoy = new Date();
    let ahora_ano = fecha_hoy.getFullYear();
    let ahora_mes = fecha_hoy.getMonth() + 1;
    let ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    this.edad = (ahora_ano + 0) - ano;
    if (ahora_mes < mes) {
      this.edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
      this.edad--;
    }
    if (this.edad > 0) {
      this.edad -= 0;
    }

    // calculamos los meses
    this.meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
      this.meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
      this.meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
      this.meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
      this.meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
      this.meses = 11;

    // calculamos los dias
    this.dias = 0;
    if (ahora_dia > dia)
      this.dias = ahora_dia - dia;
    if (ahora_dia < dia) {
      let ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
      this.dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    return this.edad + " años, " + this.meses + "meses y " + this.dias + " días";
  }
  esNumero(strNumber) {
    if (strNumber == null) return false;
    if (strNumber == undefined) return false;
    if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
    if (strNumber == "") return false;
    if (strNumber === "") return false;
    let psInt, psFloat;
    psInt = parseInt(strNumber);
    psFloat = parseFloat(strNumber);
    return !isNaN(strNumber) && !isNaN(psFloat);
  }
  openModal(event) {
    this.idPagoCaja = event.id;
    console.log("ID PAGO", this.idPagoCaja);

    this.formCaja.get('nroDoc').setValue(event.datosPaciente.nroDoc);
    this.formCaja.get('apePaterno').setValue(event.datosPaciente.apePaterno + " " + event.datosPaciente.apeMaterno);
    this.formCaja.get('nombres').setValue(event.datosPaciente.primerNombre + " " + event.datosPaciente.otrosNombres);
    this.formCaja.get('edad').setValue(event.datosPaciente.edad + " años");
    //this.formCaja.get('servicio').setValue("LABORATORIO");
    this.formCaja.get('nroCaja').setValue(this.nroCaja);
    this.formCaja.get('fechaRecibo').setValue(new Date().toLocaleString());

    this.servicesService.obtenerNumeracionCaja(this.idIpress, this.nroCaja).subscribe((res: any) => {
      this.formCaja.get('nroBoleta').setValue(res.object.contadorRecibos + 1);
    })
    this.procedimientosPagar = event.examenes;
    this.calcularTotalRecibo(this.procedimientosPagar);

    this.formCaja.get('nroDoc').disable();
    this.formCaja.get('apePaterno').disable();
    this.formCaja.get('nombres').disable();
    this.formCaja.get('edad').disable();
    this.formCaja.get('nroCaja').disable();
    this.formCaja.get('fechaRecibo').disable();
    this.formCaja.get('precioTotal').disable();
    this.formCaja.get('nroBoleta').disable();
    this.Dialogpagos = true;
  }

  close() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.Dialogpagos = false;
    //this.getListaEcografiasPendientes();
    this.formCaja.reset();
    this.procedimientosPagar = [];
  }

  getUPS() {
    this.upsService.getUPS().subscribe((res: any) => {
      this.UPSList = res.object;
    })
  }
  openModalProcedimiento() {
    this.Dialogprocedimientos = true;
  }
  
  calcularTotalRecibo(lista) {
    if (lista.length == 0) {
      this.formCaja.get("precioTotal").setValue("0");
    }
    else {
      let cont = 0;
      for (let i = 0; i < lista.length; i++) {
        cont += parseFloat(lista[i].precio);
      }
      this.formCaja.get("precioTotal").setValue(cont);
    }
  }

  ngOnInit(): void {
  }

}
