import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
} from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogRespuestasComponent } from "../../../components/dialog-respuestas/dialog-respuestas.component";
import { MessageService } from "primeng/api";
import { VisitaGestanteService } from "../../../services/visita-gestante.service";
import { VisitaDomiciliariaService } from "../../../services/visita-domiciliaria.service";

@Component({
  selector: "app-visitas-domiciliarias-gestantes",
  templateUrl: "./visitas-domiciliarias-gestantes.component.html",
  styleUrls: ["./visitas-domiciliarias-gestantes.component.css"],
  providers: [DialogService],
})
export class VisitasDomiciliariasGestantesComponent implements OnInit {
  ref: DynamicDialogRef;
  dataVisitas: any[] = [];
  options: any;
  overlays: any[];
  formListaVisitas: FormGroup;
  loading: boolean = true;
  selectedAnio: string = "";
  selectedMes: string = "";
  //parte de prueba
  listaVisitas1: any[] = [
    { latitud: -13.52507, longitud: -71.93089 },
    { latitud: -13.5307703, longitud: -71.9408312 },
    { latitud: -13.530774, longitud: -71.9408339 },
    { latitud: -13.58441, longitud: -71.91867 },
    { latitud: -13.5307587, longitud: -71.9408254 },
    { latitud: -13.53182, longitud: -71.93626 },
    { latitud: -13.5307528, longitud: -71.940821 },
    { latitud: -13.52591, longitud: -71.936 },
  ];
  formAntecedentes: FormGroup;
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
    public dialog: DialogService,
    private servicioVisitasGestante: VisitaGestanteService,
    private servicioVisitas: VisitaDomiciliariaService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.listaVisitas();
  }

  buildForm() {
    this.formListaVisitas = this.fb.group({
      busquedaAnio: new FormControl("", [Validators.required]),
      busquedaMes: new FormControl("", [Validators.required]),
    });
  }

  listaVisitas() {
    let dni = "vp72753957";
    this.servicioVisitas.couch = true;
    this.servicioVisitasGestante
      .getVisitasGestantesXProfesional(dni)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("Lista visitas gestante", this.dataVisitas);
      });
  }

  openDialogRespuestas(data: any[]) {
    this.ref = this.dialog.open(DialogRespuestasComponent, {
      header:
        "Preguntas > Respuestas de la visita domiciliaria de la gestante ejecutada",
      width: "70%",
      // height: "800px",
      contentStyle: {
        "max-height": "92%",
        overflow: "auto",
      },
      data: data,
    });
  }

  buscarVisitaAnioXMes() {
    let busquedaAnio: string = this.formListaVisitas.value.busquedaAnio;
    let busquedaMes: string = this.formListaVisitas.value.busquedaMes;
    let fecha = `${busquedaAnio} ${busquedaMes}`;
    //console.log(fecha);
    this.servicioVisitas.couch = true;
    this.servicioVisitasGestante
      .buscarVisitaGestantesXAnioMes(fecha)
      .subscribe((data) => {
        if (data["rows"].length > 0) {
          this.dataVisitas = data["rows"];
          // console.log('Busqueda por fecha gestante',this.dataVisitas);
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
      });
  }
}
