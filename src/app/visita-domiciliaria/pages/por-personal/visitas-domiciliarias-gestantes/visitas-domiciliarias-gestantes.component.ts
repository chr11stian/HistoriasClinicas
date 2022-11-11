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
import { environment } from "src/environments/environment";

@Component({
  selector: "app-visitas-domiciliarias-gestantes",
  templateUrl: "./visitas-domiciliarias-gestantes.component.html",
  styleUrls: ["./visitas-domiciliarias-gestantes.component.css"],
  providers: [DialogService],
})
export class VisitasDomiciliariasGestantesComponent implements OnInit {
  ref: DynamicDialogRef;
  dataVisitas: any[] = [];
  dataVisitaGestantes:any []=[];
  aux_dataVisitas: any[] = [];
  options: any;
  overlays: any[];
  formListaVisitas: FormGroup;
  loading: boolean = true;
  selectedAnio: string = "";
  selectedMes: string = "";
  visitaReporte: string = "";
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

  async listaVisitas() {
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    this.servicioVisitas.couch = true;
    await this.servicioVisitasGestante
      .getVisitasGestantesAnio(
        idIpress,
        dni,
        this.servicioVisitas.getAnio()
      )
      .then((data: any) => {
        this.dataVisitas = data["rows"];
        this.dataVisitas.map((aux) => {
          if (aux.value.hasOwnProperty("gestante")){
            this.dataVisitaGestantes.push(aux.value);
          };
        });
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

  async verVisitasPorAnio(event) {
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    this.servicioVisitas.couch = true;
    this.selectedAnio = event.value;
    await this.servicioVisitasGestante
      .getVisitasGestantesAnio(idIpress, dni, this.selectedAnio)
      .then((data: any) => {
        if (data["rows"].length > 0) {
          this.dataVisitas = data["rows"];
          this.dataVisitas.map((aux) => {
            if (aux.value.hasOwnProperty("gestante")){
              this.dataVisitaGestantes.push(aux.value)
            };
          });
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
            severity: "info",
            summary: "Consulta obtenida",
            detail: "Usted no tiene visitas",
          });
        }
      });
  }

  async verVisitasPorMes(event) {
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    if (this.selectedAnio != "") {
      this.servicioVisitas.couch = true;
      this.selectedMes = event.value;
      let fecha = `${this.selectedAnio} ${this.selectedMes}`;
    await this.servicioVisitasGestante
        .getVisitasGestantesFecha(idIpress, dni, fecha)
        .then((data: any) => {
          if (data["rows"].length > 0) {
            this.dataVisitas = data["rows"];
            this.dataVisitas.map((aux) => {
              if (aux.value.hasOwnProperty("gestante")){
                this.dataVisitaGestantes.push(aux.value);
              };
            });
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
              severity: "info",
              summary: "Consulta obtenida",
              detail: "Usted no tiene visitas",
            });
          }
        });
    }
  }

  visitas_gestantes_reporte(aux){
    this.visitaReporte =
      environment.base_urlTx +
      "/jasperserver/rest_v2/reports/Reports/VISITA/gestantepuerpera/visita_gestante_puerpera.pdf?"+
      "visitaid=" +
      aux.id;
  }
}
