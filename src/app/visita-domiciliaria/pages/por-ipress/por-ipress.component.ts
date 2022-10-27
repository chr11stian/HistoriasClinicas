import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { VisitaDomiciliariaService } from "../../services/visita-domiciliaria.service";
import { VisitaIpressService } from "../../services/visita-ipress.service";
import { Profesional } from "../../interfaces/profesional";
import { trigger,state,style,transition,animate } from '@angular/animations';
import { VisitaNinioService } from '../../services/visita-ninio.service';
import { VisitaGestanteService } from '../../services/visita-gestante.service';

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
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listaVisitas();
  }

  listaVisitas() {
    let ipress = "00002303";
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpress
      .getVisitasProfesionalesPorIpress(ipress)
      .subscribe((data) => {
        this.dataVisitas = data["rows"];
        console.log("data", data);
        this.dataVisitas.map((aux, index) => {
          //console.log(aux);
          // console.log(this.profesionalesIpress.indexOf(aux.value.responsable));
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
      dni: object.value.responsable.slice(2, 9),
      nombres: object.value.nombres_responsable,
      apellidos: object.value.apellidos_responsable,
      telefono: object.value.telefono,
      eess: object.value.eess_descripcion,
    };
  }

  async recuperarVisitasNiniosMayores4Meses(ipress,aux) {
    console.log("arreglo ");
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalNinios.getVisitasNiniosXProfesionalMayores_4_Meses(ipress,aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_ninios) => {
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =[];
        if (data_ninios["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_mayores_4_meses =data_ninios["rows"];
        }
        // console.log( this.profesionalesIpress[auxIndex].visitas_menores_4_meses);
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
        // console.log( this.profesionalesIpress[auxIndex].visitas_menores_4_meses);
      });
  }
  async recuperarGestantes(ipress,aux) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesXProfesionalAnio(ipress, aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_gestantes) => {
        console.log("data gestantess",data_gestantes);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_gestantes=[];
        if (data_gestantes["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_gestantes=data_gestantes["rows"];
        }
        // console.log( this.profesionalesIpress[auxIndex].visitas_menores_4_meses);
      });
  }
  async recuperarPuerperas(ipress,aux) {
    this.servicioVisitas.couch = true;
    await this.servicioVisitaProfesionalGestantes.getVisitasGestantesXProfesionalAnio(ipress, aux.value.responsable,this.servicioVisitas.getAnio())
      .then((data_puerperas) => {
        console.log("data puerperasss",data_puerperas);
        let auxIndex: number = this.dniProfesionalIpress.indexOf(aux.value.responsable);
        this.profesionalesIpress[auxIndex].visitas_puerperas=[];
        if (data_puerperas["rows"].length > 0){
        this.profesionalesIpress[auxIndex].visitas_puerperas =data_puerperas["rows"];
        }
        // console.log( this.profesionalesIpress[auxIndex].visitas_menores_4_meses);
      });
  }
}
