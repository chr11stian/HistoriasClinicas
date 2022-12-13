import { Component, OnInit } from "@angular/core";
import { InmunizacionesService } from "../services/inmunizaciones/inmunizaciones.service";
// import { Inmunizaciones } from "../models/plan-atencion-integral.model";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { inmunizaciones } from "../models/plan-atencion-integral.model";
import { dato } from "../../../../../models/data";
import Swal from "sweetalert2";

@Component({
  selector: "app-inmunizaciones",
  templateUrl: "./inmunizaciones.component.html",
  styleUrls: ["./inmunizaciones.component.css"],
})
export class InmunizacionesComponent implements OnInit {
  valor: string = "";
  tipoDNI: string;
  data: dato;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: inmunizaciones[] = [];
  // listaMeses: number[] = [0, 2, 4, 6, 7, 12, 15, 18, 96];
  inmunizacionesAgrupadas = [[], [], [], [], [], [], [], [], [], []];
  agrupaciones: any[] = [
    { abreviado: "RN", completo: "Recien Nacido" },
    { abreviado: "Menor_1A", completo: "Menor de un Año" },
    { abreviado: "1A", completo: "Un Año" },
    { abreviado: "4A", completo: "Cuatro Años" },
  ];
  mesActual: number;

  constructor(
    private inmunizacionesService: InmunizacionesService,
    private messageService: MessageService,
    private rutaActiva: ActivatedRoute
  ) {
    this.data = <dato>JSON.parse(localStorage.getItem("documento"));
    // this.mesActual=this.data.anio*12+this.data.mes;
    this.mesActual = 18;
  }
  ngOnInit() {
    this.nroDNI = this.data.nroDocumento;
    this.getListaInmunizaciones();
  }
  toDate() {
    this.listaInmunizaciones.sort((a, b) => {
      if (a.fechaTentativa > b.fechaTentativa) return 1;
      if (a.fechaTentativa < b.fechaTentativa) return -1;
      return 0;
    });
    this.listaInmunizaciones.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fechaAdministracion =
        element.fechaAdministracion != null
          ? new Date(`${element.fechaAdministracion} 00:00:00`)
          : null;
    });
  }
  nombreVacuna(nombre: string) {
    return nombre.split("-")[0];
  }
  edadMes: number[] = [];
  clasificamos() {
    //['RN', 'Menor_1A', '1A', '4A'][0,1,2,4,6,7,12,15,18,96]
    this.listaInmunizaciones.forEach((element) => {
      let isInclude = this.edadMes.find((elemento) => {
        return elemento == element.edadMes;
      });
      if (isInclude == null) {
        this.edadMes.push(element.edadMes);
      }
    });
    // desglosamos/
    this.listaInmunizaciones.forEach((element, index) => {
      let mes = element.edadMes;
      let posicion = this.edadMes.indexOf(mes);
      this.inmunizacionesAgrupadas[posicion].push(element);
    });
  }
  getListaInmunizaciones() {
    this.cargarDatosPruebaTomada();
    this.inmunizacionesService
      .getListaInmunizaciones(this.nroDNI)
      .subscribe((resp) => {
        setTimeout(() => {Swal.close();}, 500);
        this.inmunizacionesAgrupadas = [[], [], [], [], [], [], [], [], [], []];
        this.listaInmunizaciones = resp["object"];
        this.toDate();
        this.clasificamos();
      });
  }
  cargarDatosPruebaTomada() {
    Swal.fire({
      title: "<strong>Cargando Datos</strong>",
      html:
        "<div style=height:6rem> <div style=font-family:Spartan; >" +
        "Espere un momento" +
        "</div>" +
        "</br>" +
        '<i class="pi pi-spin pi-spinner" style="font-size:2rem;height:2rem;width:2rem "></i> </div>',
      showCancelButton: false,
      showConfirmButton: false,
      position: "top",
      backdrop: `rgba(0,0,0,0.85) left top no-repeat`,
      allowOutsideClick: false,
    });
  }
}
