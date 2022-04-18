import { Component, OnInit } from '@angular/core';
import {dato} from "../../../../../../models/data";
import {inmunizaciones} from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import {
  InmunizacionesService
} from "../../../../../plan/component/plan-atencion-integral/services/inmunizaciones/inmunizaciones.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {
  TratamientoInmunizacionModalComponent
} from "../inmunizacion-modal/tratamiento-inmunizacion-modal.component";
@Component({
  selector: 'app-tratamiento-inmunizacion',
  templateUrl: './tratamiento-inmunizacion.component.html',
  styleUrls: ['./tratamiento-inmunizacion.component.css'],
  providers: [DialogService],
})
export class TratamientoInmunizacionComponent implements OnInit {
  valor: string = "";
  data: dato;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: inmunizaciones[] = [];
  inmunizacionesAgrupadas = [[], [], [], [], [], [], [], [], [],[]];
  collapse: boolean[] = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  mesActual: number;
  mes:number;
  dia:number;
  anio:number;

  constructor(
      private inmunizacionesService: InmunizacionesService,
      private messageService: MessageService,
      private rutaActiva: ActivatedRoute,
      public dialogService: DialogService
  ) {
    this.data = <dato>JSON.parse(localStorage.getItem("documento"));
    this.mesActual = this.data.anio * 12 + this.data.mes;
    this.mes=this.data.mes;
    this.dia=this.data.dia;
    this.anio=this.data.anio;
  }

  ngOnInit() {
    this.nroDNI = this.data.nroDocumento;
    this.getListaInmunizaciones();
  }
  toDate() {
    this.listaInmunizaciones.sort((a, b) => {
      if (a.fechaTentativa < b.fechaTentativa) return 1;
      if (a.fechaTentativa > b.fechaTentativa) return -1;
      return 0;
    });
    this.listaInmunizaciones.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fechaAdministracion =
          element.fechaAdministracion != null ? new Date(`${element.fechaAdministracion} 00:00:00`) : null;
    });
  }
  nombreVacuna(nombre: string) {
    return nombre.split("-")[0];
  }
  edadMes: number[] = [];
  clasificamos() {
    console.log("toda la lista ordenada", this.listaInmunizaciones);
    //[0,1,2,4,6,7,12,15,18,96]
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
    this.inmunizacionesService
        .getListaInmunizaciones(this.nroDNI)
        .subscribe((resp) => {
          this.inmunizacionesAgrupadas = [[], [], [], [], [], [], [], [], [],[]];
          this.listaInmunizaciones = resp["object"];
          this.toDate();
          this.clasificamos();
        });
  }

  agregarVacuna(vacuna: inmunizaciones, nombre) {
    const ref = this.dialogService.open(TratamientoInmunizacionModalComponent, {
      data: vacuna,
      header: `Agregar Vacuna ${nombre} Dosis numero (${vacuna.dosis})`,
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
    });
    ref.onClose.subscribe((mensaje) => {
      if (mensaje == "agregado") {
        this.getListaInmunizaciones();
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: "inmunizacion Registrada satisfactoriamente",
        });
      } else {
        // this.messageService.add({severity:'error', summary: 'warn', detail:'NO SE registro ninguna inmunizacion'});
      }
    });
  }

}
