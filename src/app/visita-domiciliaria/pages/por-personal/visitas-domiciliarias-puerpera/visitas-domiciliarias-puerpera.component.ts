import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
} from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogRespuestasComponent } from "../../../components/dialog-respuestas/dialog-respuestas.component";
import { MessageService, SortEvent } from "primeng/api";
import { VisitaGestanteService } from "../../../services/visita-gestante.service";
import { VisitaDomiciliariaService } from "../../../services/visita-domiciliaria.service";
import { environment } from 'src/environments/environment';
import { EchartPuerperasComponent } from '../../../components/echart-puerperas/echart-puerperas.component';
@Component({
  selector: 'app-visitas-domiciliarias-puerpera',
  templateUrl: './visitas-domiciliarias-puerpera.component.html',
  styleUrls: ['./visitas-domiciliarias-puerpera.component.css'],
  providers: [DialogService],
})
export class VisitasDomiciliariasPuerperaComponent implements OnInit {

  ref: DynamicDialogRef;
  dataVisitas: any[] = [];
  dataVisitaPuerpera:any []=[];
  aux_dataVisitas: any[] = [];
  options: any;
  overlays: any[];
  formListaVisitas: FormGroup;
  loading: boolean = true;
  selectedAnio: string = "";
  selectedMes: string = "";
  visitaReporte: string = "";
  selectedPuerpera:any;

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
    // this.buildForm();
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
      .getVisitasPuerperasAnio(
        idIpress,
        dni,
        this.servicioVisitas.getAnio()
      )
      .then((data: any) => {
        this.dataVisitas = data["rows"];
        this.dataVisitas.map((aux) => {
          this.dataVisitaPuerpera.push(aux.value);
        });
      });
  }

  openDialogRespuestas(data: any[]) {
    this.ref = this.dialog.open(DialogRespuestasComponent, {
      header:
        "PREGUNTAS>RESPUESTAS DE LA VISITAS DOMICILIARIA EJECUTADA",
      width: "70%",
      contentStyle: {
        "max-height": "92%",
        overflow: "auto",
      },
      data: data,
    });
  }

  async verVisitasPorAnio(event) {
    this.dataVisitaPuerpera=[];
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    this.servicioVisitas.couch = true;
    this.selectedAnio = event.value;
    await this.servicioVisitasGestante
      .getVisitasPuerperasAnio(idIpress, dni, this.selectedAnio)
      .then((data: any) => {
        if (data["rows"].length > 0) {
          this.dataVisitas = data["rows"];
          this.dataVisitas.map((aux) => {
            this.dataVisitaPuerpera.push(aux.value);
          });
          console.log("gestantes", this.dataVisitas);
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
            severity: "info",
            summary: "Consulta obtenida",
            detail: "Usted no tiene visitas",
          });
        }
      });
  }

  async verVisitasPorMes(event) {
    this.dataVisitaPuerpera=[];
    let idIpress = this.servicioVisitas.getIdIpress();
    let dni = `vp${this.servicioVisitas.getIdPersonal()}`;
    if (this.selectedAnio != "") {
      this.servicioVisitas.couch = true;
      this.selectedMes = event.value;
      let fecha = `${this.selectedAnio} ${this.selectedMes}`;
      await this.servicioVisitasGestante
        .getVisitasPuerperasFecha(idIpress, dni, fecha)
        .then((data: any) => {
          if (data["rows"].length > 0) {
            this.dataVisitas = data["rows"];
            this.dataVisitas.map((aux) => {
            this.dataVisitaPuerpera.push(aux.value);
            });
            console.log("busqueda por mes", this.dataVisitas);
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

  visitas_puerperas_reporte(aux){
    this.visitaReporte =
      environment.base_urlTx +
      "/jasperserver/rest_v2/reports/Reports/VISITA/gestantepuerpera/visita_gestante_puerpera.pdf?"+
      "visitaid=" +
      aux.id;
  }

  openDialogEcharts() {
    let dni=this.servicioVisitas.getIdPersonal();
    this.ref = this.dialog.open(EchartPuerperasComponent, {
      header:
        ">>>GRAFICO VISITAS DOMICILIARIAS > PUERPERAS ",
      width: "70%",
      height:"80%",
      contentStyle: {
        //"max-height": "93%",
        overflow: "auto",
      },
      data:dni,
    });
  }
}
