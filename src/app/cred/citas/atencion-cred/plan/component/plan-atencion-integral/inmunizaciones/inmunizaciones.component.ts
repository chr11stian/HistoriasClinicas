import { Component, OnInit } from "@angular/core";
import { InmunizacionesService } from "../services/inmunizaciones/inmunizaciones.service";
import { Inmunizaciones } from "../models/plan-atencion-integral.model";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-inmunizaciones",
  templateUrl: "./inmunizaciones.component.html",
  styleUrls: ["./inmunizaciones.component.css"],
})
export class InmunizacionesComponent implements OnInit {
  tipoDNI: string;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: Inmunizaciones[] = [
    {
      nombreVacuna: 'hvb1',
      nroDosis: 2,
      estado: true,
      fecha: '2022/12/17',
      fechaTentativa: '2022/12/17',},
    {
      nombreVacuna: 'hvb2',
      nroDosis: 2,
      estado: true,
      fecha: '2022/12/17',
      fechaTentativa: '2022/12/17',},
    {
      nombreVacuna: 'hvb3',
      nroDosis: 2,
      estado: true,
      fecha: '2022/12/17',
      fechaTentativa: '2022/12/17',},
  ];
  lista1: Inmunizaciones[] = [];
  lista2: Inmunizaciones[] = [];
  lista3: Inmunizaciones[] = [];
  constructor(
    private servicio: InmunizacionesService,
    private messageService: MessageService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tipoDNI = this.rutaActiva.snapshot.queryParams.tipoDoc;
    this.nroDNI = this.rutaActiva.snapshot.queryParams.nroDoc;
    this.getLista();
  }

  // async getLista(){
  getLista() {
    // this.servicio.getListaInmunizaciones(this.nroDNI)
    this.servicio
      .getListaInmunizaciones("47825757")
      .toPromise()
      .then((result) => {
        this.listaInmunizaciones = result.object;
        this.transform();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  transform() {
    // transformacion a un solo formato que se usará
    this.listaInmunizaciones.forEach((i) => {
      if (i.fecha === null) {
        i.fecha = "";
      }
      if (i.fechaTentativa === null) {
        i.fechaTentativa = "";
      } else {
        i.fecha = i.fecha.split(" ")[0];
        i.fechaTentativa = i.fechaTentativa.split(" ")[0];
      }
    });
    this.separacion();
  }
  separacion() {
    // aqui la lista de inmunicaiones queda vacia
    this.lista1 = this.listaInmunizaciones.splice(0, 8);
    this.lista2 = this.listaInmunizaciones.splice(0, 8);
    this.lista3 = this.listaInmunizaciones.splice(
      0,
      this.listaInmunizaciones.length
    );
  }
  // save() {
  //   //armamos la "
  //   let objeto: string = "";
  //   this.lista1.forEach((elemento) => {
  //     objeto += `{"descripcionEdad":"${
  //       elemento.descripcionEdad
  //     }","nombreVacuna":"${elemento.nombreVacuna}","nroDosis":${
  //       elemento.nroDosis
  //     }
  //           ,"estado":${elemento.estado},"fecha":"${
  //       elemento.fecha ? this.getFecha(new Date(elemento.fecha)) : ""
  //     }","fechaTentativa":"${elemento.fechaTentativa} 00:00:00"},`;
  //   });s
  //   this.lista2.forEach((elemento) => {
  //     objeto += `{"descripcionEdad":"${
  //       elemento.descripcionEdad
  //     }","nombreVacuna":"${elemento.nombreVacuna}","nroDosis":${
  //       elemento.nroDosis
  //     }
  //           ,"estado":${elemento.estado},"fecha":"${
  //       elemento.fecha ? this.getFecha(new Date(elemento.fecha)) : ""
  //     }","fechaTentativa":"${elemento.fechaTentativa} 00:00:00"},`;
  //   });
  //   this.lista3.forEach((elemento) => {
  //     objeto += `{"descripcionEdad":"${
  //       elemento.descripcionEdad
  //     }","nombreVacuna":"${elemento.nombreVacuna}","nroDosis":${
  //       elemento.nroDosis
  //     }
  //           ,"estado":${elemento.estado},"fecha":"${
  //       elemento.fecha ? this.getFecha(new Date(elemento.fecha)) : ""
  //     }","fechaTentativa":"${elemento.fechaTentativa} 00:00:00"},`;
  //   });
  //   const nueva = objeto.slice(0, objeto.length - 1);
  //   const nueva1: string = `[${nueva}]`;
  //   const json1 = JSON.parse(nueva1);
  //   this.servicio
  //     .updateListaInmunizaciones(this.nroDNI, json1)
  //     .toPromise()
  //     .then((result) => {
  //       this.messageService.add({
  //         severity: "success",
  //         summary: "Exito",
  //         detail: "registro actualizado",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("E", err);
  //     });
  // }
}
