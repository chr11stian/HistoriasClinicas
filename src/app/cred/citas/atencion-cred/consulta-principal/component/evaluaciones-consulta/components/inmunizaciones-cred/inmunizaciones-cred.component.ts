import { Component, OnInit } from "@angular/core";
import { Inmunizaciones } from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import { InmunizacionesService } from "../../../../../plan/component/plan-atencion-integral/services/inmunizaciones/inmunizaciones.service";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { VacunaComponent } from "../vacuna/vacuna.component";

@Component({
  selector: "app-inmunizaciones-cred",
  templateUrl: "./inmunizaciones-cred.component.html",
  styleUrls: ["./inmunizaciones-cred.component.css"],
  providers: [DialogService],
})
export class InmunizacionesCredComponent implements OnInit {
  valor: string = "";
  tipoDNI: string;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: Inmunizaciones[] = [{
    nombreVacuna: 'BCG',
    nroDosis: 2,
    estado: true,
    fecha: '2017/12/17',
    fechaTentativa: '2017/12/17',
  },
    {
      nombreVacuna: 'HVB',
      nroDosis: 2,
      estado: true,
      fecha: '2017/12/17',
      fechaTentativa: '2017/12/17',
    },
    {
      nombreVacuna: 'HVB',
      nroDosis: 2,
      estado: true,
      fecha: '2017/12/17',
      fechaTentativa: '2017/12/17',
    }

  ];
  // lista1: Inmunizaciones[] = [];
  // lista2: Inmunizaciones[] = [];
  // lista3: Inmunizaciones[] = [];
  constructor(
    private servicio: InmunizacionesService,
    private messageService: MessageService,
    private rutaActiva: ActivatedRoute,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.tipoDNI = "47825757";
    // this.getLista();
  }

  // async getLista(){
  getLista() {
    this.servicio;
    // .getListaInmunizaciones(this.nroDNI)
    this.servicio
      .getListaInmunizaciones("98745896")
      .toPromise()
      .then((result) => {
        this.listaInmunizaciones = result.object;
        console.log("lista de inmunizaciones", this.listaInmunizaciones);
        this.transform();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("inmunizaciones");
  }
  transform() {
    //transformacion a un solo formato que se usará
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
    // this.lista1 = this.listaInmunizaciones.splice(0, 8);
    // this.lista2 = this.listaInmunizaciones.splice(0, 8);
    // this.lista3 = this.listaInmunizaciones.splice(
    //   0,
    //   this.listaInmunizaciones.length
    // );
  }

  agregarVacuna(vacuna) {
    const ref = this.dialogService.open(VacunaComponent, {
      data: {
        nombreVacuna: vacuna.nombreVacuna,
        fechaTentativa: vacuna.fechaTentativa,
      },
      header: `Agregar Vacuna ${vacuna.nombreVacuna}`,
      width: "50%",
    });
    console.log(vacuna);
  }
}
