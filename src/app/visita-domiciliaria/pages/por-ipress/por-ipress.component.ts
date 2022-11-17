import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";
import { VisitaIpressService } from "../../services/visita-ipress.service";
import { Profesional } from "../../interfaces/profesional";
import { trigger,state,style,transition,animate } from '@angular/animations';
import { VisitaNinioService } from '../../services/visita-ninio.service';
import { VisitaGestanteService } from '../../services/visita-gestante.service';
import { environment } from "src/environments/environment";
import { DialogRespuestasComponent } from "../../components/dialog-respuestas/dialog-respuestas.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { EchartsVisitaComponent } from '../../components/echarts-visita/echarts-visita.component';
@Component({
  selector: "app-por-ipress",
  templateUrl: "./por-ipress.component.html",
  styleUrls: ["./por-ipress.component.css"],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class PorIpressComponent implements OnInit {
  formListaVisitas: FormGroup;
  dataVisitas: any[] = [];
  profesionalesIpress: any[] = [];
  dniProfesionalIpress: any[] = [];
  selectedAnio: string;
  selectedMes: string;
  profesional: Profesional;
  visitas_menor_4_meses: any[] = [];
  visitas_mayor_4_meses: any[] = [];
  visitas_gestantes: any[] = [];
  visitas_puerperas: any[] = [];
  visitaReporte: string = "";
  ref: DynamicDialogRef;

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
    private servicioVisitaProfesionalIpress: VisitaIpressService,
    private servicioVisitaProfesionalNinios:VisitaNinioService,
    private servicioVisitaProfesionalGestantes:VisitaGestanteService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialog: DialogService,
  ) {}

  ngOnInit() {
    this.listaVisitas();
  }

  listaVisitas() {
   // let ipress =this.servicioVisitas.getEscalaCodIpress();
  let ipress="00002303";
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpress
      .getVisitasProfesionalesPorIpress(ipress)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("data", data);
        this.dataVisitas.map((aux, index) => {
          if (this.dniProfesionalIpress.indexOf(aux.value.responsable) === -1) {
            this.recuperarVisitasNiniosMayores4Meses(ipress,aux);
            this.recuperarVisitasNiniosMenores4Meses(ipress,aux);
            this.recuperarGestantes(ipress,aux);
            this.recuperarPuerperas(ipress,aux);
            this.recuperarInformacionProfesional(aux);
            this.dniProfesionalIpress.push(aux.value.responsable);
            this.profesionalesIpress.push(this.profesional);
          }
        });
        console.log("data profesional", this.profesionalesIpress);
      });
  }

  recuperarInformacionProfesional(object) {
    this.profesional = {
      dni: object.value.responsable.slice(2, 10),
      nombres: object.value.nombres_responsable,
      apellidos: object.value.apellidos_responsable,
      telefono: object.value.telefono,
      eess: object.value.eess_descripcion,
    };
  }

  async recuperarVisitasNiniosMayores4Meses(ipress,aux) {
    // console.log("arreglo ");
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMayores_4_Meses(ipress,aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =data_ninios["rows"];
        }
      });
  }
  async recuperarVisitasNiniosMenores4Meses(ipress,aux) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMenores_4_Meses(ipress,aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =data_ninios["rows"];
        }
      });
  }
  async recuperarGestantes(ipress,aux) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesXProfesionalAnio(ipress, aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_gestantes) => {
        // console.log("data gestantess",data_gestantes);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_gestantes=[];
        if (data_gestantes["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_gestantes=data_gestantes["rows"];
        }
      });
  }
  async recuperarPuerperas(ipress,aux) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesXProfesionalAnio(ipress, aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_puerperas) => {
        // console.log("data puerperasss",data_puerperas);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_puerperas=[];
        if (data_puerperas["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_puerperas =data_puerperas["rows"];
        }
      });
  }

  async verVisitasPorAnio(event){
    // let ipress =this.servicioVisitas.getEscalaCodIpress();
    let ipress="00002303";
    this.servicioVisitas.couch = true;
    this.selectedAnio = event.value;
    this.dniProfesionalIpress=[];
    this.profesionalesIpress=[];
    await this.servicioVisitaProfesionalIpress
      .getVisitasProfesionalesPorIpress(ipress)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("data", data);
        this.dataVisitas.map((aux, index) => {
          if (this.dniProfesionalIpress.indexOf(aux.value.responsable) === -1) {
            this.recuperarVisitasNiniosMayores4MesesAnio(ipress,aux,this.selectedAnio);
            this.recuperarVisitasNiniosMenores4MesesAnio(ipress,aux,this.selectedAnio);
            this.recuperarGestantesAnio(ipress,aux,this.selectedAnio);
            this.recuperarPuerperasAnio(ipress,aux,this.selectedAnio);
            this.recuperarInformacionProfesional(aux);
            this.dniProfesionalIpress.push(aux.value.responsable);
            this.profesionalesIpress.push(this.profesional);
          }
        });
      });
  }

  async recuperarVisitasNiniosMayores4MesesAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMayores_4_Meses(ipress,aux.value.responsable,anio)
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =data_ninios["rows"];
        }
      });
  }
  async recuperarVisitasNiniosMenores4MesesAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMenores_4_Meses(ipress,aux.value.responsable,anio)
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =data_ninios["rows"];
        }
      });
  }
  async recuperarGestantesAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesAnio(ipress, aux.value.responsable,anio)
      .then((data_gestantes) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_gestantes=[];
        if (data_gestantes["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_gestantes=data_gestantes["rows"];
        }
      });
  }
  async recuperarPuerperasAnio(ipress,aux,anio) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasPuerperasAnio(ipress, aux.value.responsable,anio)
      .then((data_puerperas) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_puerperas=[];
        if (data_puerperas["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_puerperas =data_puerperas["rows"];
        }
      });
  }

  async verVisitasPorMes(event){
    // let ipress =this.servicioVisitas.getEscalaCodIpress();
       let ipress="00002303";
    if (this.selectedAnio != "") {
      this.servicioVisitas.couch = true;
      this.selectedMes = event.value;
      let fecha = `${this.selectedAnio} ${this.selectedMes}`;
      this.dniProfesionalIpress=[];
      this.profesionalesIpress=[];
      await this.servicioVisitaProfesionalIpress
        .getVisitasProfesionalesPorIpress(ipress)
        .subscribe((data) => {
          this.dataVisitas = data["rows"];
          console.log("data", data);
          this.dataVisitas.map((aux, index) => {
            if (this.dniProfesionalIpress.indexOf(aux.value.responsable) === -1) {
              this.recuperarVisitasNiniosMayores4MesesAnioMes(ipress,aux,fecha);
              this.recuperarVisitasNiniosMenores4MesesAnioMes(ipress,aux,fecha);
              this.recuperarGestantesAnioMes(ipress,aux,fecha);
              this.recuperarPuerperasAnioMes(ipress,aux,fecha);
              this.recuperarInformacionProfesional(aux);
              this.dniProfesionalIpress.push(aux.value.responsable);
              this.profesionalesIpress.push(this.profesional);
            }
          });
        });
    }
  }

  async recuperarVisitasNiniosMayores4MesesAnioMes(ipress,aux,fecha) {
    this.servicioVisitas.couch = true;
    console.log("el aniooo",fecha);
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMayores_4_MesesFecha(ipress,aux.value.responsable,fecha)
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =data_ninios["rows"];
        }
      });
  }
  async recuperarVisitasNiniosMenores4MesesAnioMes(ipress,aux,fecha) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMenores_4_MesesFecha(ipress,aux.value.responsable,fecha)
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_menores_4_meses =data_ninios["rows"];
        }
      });
  }
  async recuperarGestantesAnioMes(ipress,aux,fecha) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesFecha(ipress, aux.value.responsable,fecha)
      .then((data_gestantes) => {
        console.log("data gestantess",data_gestantes);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_gestantes=[];
        if (data_gestantes["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_gestantes=data_gestantes["rows"];
        }
      });
  }
  async recuperarPuerperasAnioMes(ipress,aux,fecha) {
    this.servicioVisitas.couch = true;
    console.log("el aniooo",fecha);
    await this.servicioVisitaProfesionalGestantes.getVisitasPuerperasFecha(ipress, aux.value.responsable,fecha)
      .then((data_puerperas) => {
        console.log("data puerperasss",data_puerperas);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_puerperas=[];
        if (data_puerperas["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_puerperas =data_puerperas["rows"];
        }
      });
  }

  
  visita_menor_cuatro_meses_reporte(aux) {
    this.visitaReporte =
      environment.base_urlTx +
      "/jasperserver/rest_v2/reports/Reports/VISITA/menorcuatro/visita_nino_ninia_menor4meses.pdf?" +
      "&visitaid=" +
      aux.id;
  }

  visita_mayor_cuatro_meses_reporte(aux) {
    this.visitaReporte =
      environment.base_urlTx +
      "/jasperserver/rest_v2/reports/Reports/VISITA/mayorcuatrohorizontal/visita_nino_niniamayor4meses.pdf?"+
      "&visita=" +
      aux.id;
  }

  openDialogRespuestas(data: any[]) {
    this.ref = this.dialog.open(DialogRespuestasComponent, {
      header:
        "Preguntas>Respuestas de la visita domiciliaria del niño-niña ejecutada",
      width: "70%",
      contentStyle: {
        "max-height": "93%",
        overflow: "auto",
      },
      data: data,
    });
  }
  
  openDialogEcharts(dni:string) {
    this.ref = this.dialog.open(EchartsVisitaComponent, {
      header:
        "GRAFICO VISITA DOMICILIARIA PROFESIONAL",
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
