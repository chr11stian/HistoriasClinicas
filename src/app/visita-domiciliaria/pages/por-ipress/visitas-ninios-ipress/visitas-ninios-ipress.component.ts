import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { VisitaDomiciliariaService } from "../../../services/visita-domiciliaria.service";
import { VisitaIpressService } from "../../../services/visita-ipress.service";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: "app-visitas-ninios-ipress",
  templateUrl: "./visitas-ninios-ipress.component.html",
  styleUrls: ["./visitas-ninios-ipress.component.css"],
})
export class VisitasNiniosIpressComponent implements OnInit {
  formListaVisitas: FormGroup;
  dataVisitas: any[] = [];
  profesionalesIpress: any[] = [];
  selectedAnio: string;
  selectedMes: string;
  customers: any[] = [
    {
      id: 1003,
      name: "Lenna Paprocki",
      country: {
        name: "Slovenia",
        code: "si",
      },
      company: "Feltz Printing Service",
      date: "2020-09-15",
      status: "new",
      verified: false,
      activity: 37,
      representative: {
        name: "Xuxue Feng",
        image:
          "https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      },
      balance: 88521,
    },
    {
      id: 1004,
      name: "Donette Foller",
      country: {
        name: "South Africa",
        code: "za",
      },
      company: "Printing Dimensions",
      date: "2016-05-20",
      status: "proposal",
      verified: true,
      activity: 33,
      representative: {
        name: "Asiya Javayant",
        image:
          "https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      },
      balance: 93905,
    },
    {
      id: 1005,
      name: "Simona Morasca",
      country: {
        name: "Egypt",
        code: "eg",
      },
      company: "Chapman, Ross E Esq",
      date: "2018-02-16",
      status: "qualified",
      verified: false,
      activity: 68,
      representative: {
        name: "Ivan Magalhaes",
        image:
          "https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      },
      balance: 50041,
    },
    {
      id: 1006,
      name: "Mitsue Tollner",
      country: {
        name: "Paraguay",
        code: "py",
      },
      company: "Morlong Associates",
      date: "2018-02-19",
      status: "renewal",
      verified: true,
      activity: 54,
      representative: {
        name: "Ivan Magalhaes",
        image:
          "https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      },
      balance: 58706,
    },
  ];
  meses = [
    { label: "Enero", value: 1 },
    { label: "Febrero", value: 2 },
    { label: "Marzo", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Mayo", value: 5 },
    { label: "Junio", value: 6 },
    { label: "Julio", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Septiembre", value: 9 },
    { label: "Octubre", value: 10 },
    { label: "Noviembre", value: 11 },
    { label: "Diciembre", value: 12 },
  ];
  anios = [
    { anio: "2022" },
    { anio: "2021" },
    { anio: "2020" },
    { anio: "2019" },
  ];

  constructor(
    private servicioVisitas: VisitaDomiciliariaService,
    private servicioVisitaProfesionalIpressNinios: VisitaIpressService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listaVisitas();
  }

  calculateCustomerTotal(name) {
    let total = 0;

    if (this.customers) {
      for (let customer of this.customers) {
        if (customer.representative.name === name) {
          total++;
        }
      }
    }

    return total;
  }

  listaVisitas() {
    let ipress = "00002306";
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpressNinios
      .getVisitasNiniosXProfesionalIpress(ipress)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("data", data);
        console.log("Lista visitas", this.dataVisitas);
        this.dataVisitas.forEach((aux) => {
          if (this.profesionalesIpress.find(aux.value.responsable) == -1) {
            console.log("este profesional ya existe..");
          }
        });
        console.log("ids profesionales", this.profesionalesIpress);
      });
  }

  verVisitasPorAnio(event) {}

  verVisitasPorMes(event) {}
}
