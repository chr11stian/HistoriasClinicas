import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
} from "@angular/forms";
import { DialogRespuestasComponent } from "../../../components/dialog-respuestas/dialog-respuestas.component";
import { MessageService } from "primeng/api";
import { VisitaDomiciliariaService } from "../../../services/visita-domiciliaria.service";
import { VisitaNinioService } from "../../../services/visita-ninio.service";

@Component({
  selector: "app-visitas-domiciliarias-ninios",
  templateUrl: "./visitas-domiciliarias-ninios.component.html",
  styleUrls: ["./visitas-domiciliarias-ninios.component.css"],
  providers: [DialogService],
})
export class VisitasDomiciliariasNiniosComponent implements OnInit {
  ref: DynamicDialogRef;
  dataVisitas: any[] = [];
  dataVisitas_Menores_4_meses: any[] = [];
  dataVisitas_Mayores_4_meses: any[] = [];
  dataVisitas1: any[] = [];
  formListaVisitas: FormGroup;
  selectedAnio: string = "";
  selectedMes: string = "";

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
    { anio: "todo" },
    { anio: "2022" },
    { anio: "2021" },
    { anio: "2020" },
    { anio: "2019" },
  ];

  constructor(
    public dialog: DialogService,
    private servicioVisitas: VisitaDomiciliariaService,
    private servicioVisitasNinios: VisitaNinioService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.listaVisitas();
    setTimeout(() => {
      this.markersMapStreet();
    }, 500);
  }

  buildForm() {
    this.formListaVisitas = this.fb.group({
      busquedaAnio: new FormControl("", [Validators.required]),
      busquedaMes: new FormControl("", [Validators.required]),
    });
  }
  //carga todas las visitas correspondientes al año actual
  listaVisitas() {
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    let anio = this.servicioVisitas.getAnio();
    this.servicioVisitas.couch = true;
    this.servicioVisitasNinios
      .getVisitasNiniosXProfesionalMenores_4_Meses(idIpress, dni, anio)
      .subscribe((data) => {
        this.dataVisitas_Menores_4_meses = data["rows"];
        console.log("Lista visitas", this.dataVisitas_Menores_4_meses);
      });
    this.servicioVisitas.couch = true;
    this.servicioVisitasNinios
      .getVisitasNiniosXProfesionalMayores_4_Meses(idIpress, dni, anio)
      .subscribe((data) => {
        this.dataVisitas_Mayores_4_meses = data["rows"];
        console.log("Lista visitas", this.dataVisitas_Mayores_4_meses);
      });
    this.dataVisitas = this.dataVisitas_Mayores_4_meses.concat(
      this.dataVisitas_Menores_4_meses
    );
    console.log("el dni es", dni);
  }
  //abre nuestro compoente dialog en el cual se muestran nuestras preguntas y respuestas
  openDialogRespuestas(data: any[]) {
    this.ref = this.dialog.open(DialogRespuestasComponent, {
      header:
        "Preguntas>Respuestas de la visita domiciliaria del niño-niña ejecutada",
      width: "70%",
      height: "100%",
      contentStyle: {
        "max-height": "93%",
        overflow: "auto",
      },
      data: data,
    });
  }
  //metodo que fusiona los dos arrays de menores y mayores de cuatro años
  //los cuales sirven para graficar los markers que iran en el mapa
  markersMapStreet() {
    this.dataVisitas = this.dataVisitas_Mayores_4_meses.concat(
      this.dataVisitas_Menores_4_meses
    );
    console.log(this.dataVisitas);
  }
  //metodo que nos devuelve la lista de Visitas por Año seleccionado
  //se agrupa en dos listas:menores_4_meses y mayores_4_meses
  verVisitasPorAnio(event) {
    console.log("select por anio");
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    if (event.value == "todo") {
      this.servicioVisitas.couch = true;
      this.servicioVisitasNinios
        .getVisitasNiniosXProfesionalTodo(idIpress, dni)
        .subscribe((data) => {
          if (data["rows"].length > 0) {
            this.dataVisitas = data["rows"];
            console.log("Busqueda por fecha", this.dataVisitas);
            this.messageService.add({
              key: "myMessage1",
              severity: "success",
              summary: "Exitoso",
              detail: "Visitas Actualizada",
            });
          } else {
            this.dataVisitas = [];
            this.messageService.add({
              key: "myMessage2",
              severity: "error",
              summary: "Error",
              detail: "Usted no tiene visitas",
            });
          }
          this.dataVisitas = data["rows"];
          this.dataVisitas_Menores_4_meses = this.dataVisitas.filter((aux) => {
            if (aux.value.hasOwnProperty("menor_cuatro_meses")) return aux;
          });

          this.dataVisitas_Mayores_4_meses = this.dataVisitas.filter((aux) => {
            if (aux.value.hasOwnProperty("mayor_cuatro_meses")) return aux;
          });
        });
    } else {
      this.servicioVisitas.couch = true;
      this.selectedAnio = event.value;
      this.servicioVisitasNinios
        .getVisitasNiniosXProfesionalAnio(idIpress, dni, this.selectedAnio)
        .subscribe((data) => {
          if (data["rows"].length > 0) {
            this.dataVisitas = data["rows"];
            console.log("Busqueda por fecha", this.dataVisitas);
            this.messageService.add({
              key: "myMessage1",
              severity: "success",
              summary: "Exitoso",
              detail: "Visitas Actualizada",
            });
          } else {
            this.dataVisitas = [];
            this.messageService.add({
              key: "myMessage2",
              severity: "error",
              summary: "Error",
              detail: "Usted no tiene visitas",
            });
          }
          this.dataVisitas = data;
          this.dataVisitas = data["rows"];
          this.dataVisitas_Menores_4_meses = this.dataVisitas.filter((aux) => {
            if (aux.value.hasOwnProperty("menor_cuatro_meses")) return aux;
          });

          this.dataVisitas_Mayores_4_meses = this.dataVisitas.filter((aux) => {
            if (aux.value.hasOwnProperty("mayor_cuatro_meses")) return aux;
          });
        });
    }
    console.log("el dni es", dni);
  }
  //metodo que nos devuelve la lista de Visitas por Mes seleccionado
  //se agrupa en dos listas:menores_4_meses y mayores_4_meses
  verVisitasPorMes(event) {
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    if (this.selectedAnio != "") {
      this.servicioVisitas.couch = true;
      this.selectedMes = event.value;
      let fecha = `${this.selectedAnio} ${this.selectedMes}`;
      this.servicioVisitasNinios
        .getVisitasNiniosXProfesionalXAnioXMesFecha(idIpress, dni, fecha)
        .subscribe((data) => {
          if (data["rows"].length > 0) {
            this.dataVisitas = data["rows"];
            console.log("Busqueda por fecha", this.dataVisitas);
            this.messageService.add({
              key: "myMessage1",
              severity: "success",
              summary: "Exitoso",
              detail: "Visitas Actualizada",
            });
          } else {
            this.dataVisitas = [];
            this.messageService.add({
              key: "myMessage2",
              severity: "error",
              summary: "Error",
              detail: "Usted no tiene visitas",
            });
          }
          this.dataVisitas = data["rows"];
          this.dataVisitas_Menores_4_meses = this.dataVisitas.filter((aux) => {
            if (aux.value.hasOwnProperty("menor_cuatro_meses")) return aux;
          });

          this.dataVisitas_Mayores_4_meses = this.dataVisitas.filter((aux) => {
            if (aux.value.hasOwnProperty("mayor_cuatro_meses")) return aux;
          });
        });
    }
    console.log("el dni es", dni);
  }
}
