import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VisitaDomiciliariaService } from '../../services/visita-domiciliaria.service';
import { VisitaIpressService } from '../../services/visita-ipress.service';
import { Value } from '../../../pn-gestante/interfaces/padron_Nominal';
import { responsable } from '../../../cred/citas/atencion-cred/plan/component/datos-generales/datos-generales.component';
import { Profesional } from '../../interfaces/profesional';

@Component({
  selector: 'app-por-ipress',
  templateUrl: './por-ipress.component.html',
  styleUrls: ['./por-ipress.component.css']
})
export class PorIpressComponent implements OnInit {

  formListaVisitas: FormGroup;
  dataVisitas: any[] = [];
  profesionalesIpress: any[] = [];
  dniProfesionalIpress:any[]=[];
  selectedAnio: string;
  selectedMes: string;
  profesional:Profesional;
  visitas_menor_4_meses:any []=[];
  visitas_mayor_4_meses:any []=[];
  visitas_gestantes:any []=[];
  visitas_puerperas:any []=[];

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
      this.dataVisitas.map((aux,index)=>{
        console.log(aux);
        // console.log(this.profesionalesIpress.indexOf(aux.value.responsable));
          if(this.dniProfesionalIpress.indexOf(aux.value.responsable)===-1){
            this.recuperarInformacionProfesional(aux)
            this.dniProfesionalIpress.push(aux.value.responsable);
            // this.profesional.visitas_mayores_4_meses=this.visitas_mayor_4_meses;
            // this.profesionalesIpress.push(this.profesional);
            // console.log(this.profesional.visitas_mayores_4_meses);
            this.profesionalesIpress.push(this.profesional);
            console.log(this.profesional);
          }
        })
        console.log("Lista visitas", this.dataVisitas);
        console.log("Profesionales ipress",this.profesionalesIpress);
        // console.log("dni profesionales ipress",this.dniProfesionalIpress);
      })
  }

  recuperarInformacionProfesional(object){
    this.profesional={
    dni:object.value.responsable.slice(2,9),
    nombres:object.value.nombres_responsable,
    apellidos:object.value.apellidos_responsable,
    telefono:object.value.telefono,
    eess:object.value.eess_descripcion
    }
  }

  recuperarVisitasNiniosMayores4Meses(ipress,aux){
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpress.getVisitasNiniosXProfesionalTodo(ipress,aux.value.responsable).subscribe(
      (data_ninios)=>{
      this.visitas_mayor_4_meses=data_ninios;
      }
    )
  }
  recuperarVisitasNiniosMenores4Meses(ipress,aux){
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpress.getVisitasNiniosXProfesionalTodo(ipress,aux.value.responsable).subscribe(
      (data_ninios)=>{
      this.visitas_menor_4_meses=data_ninios;
      }
    )
  }
  recuperarGestantes(ipress,aux){
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpress.getVisitasNiniosXProfesionalTodo(ipress,aux.value.responsable).subscribe(
      (data_ninios)=>{
      this.visitas_gestantes=data_ninios;
      }
    )
  }
  recuperarPuerperas(ipress,aux){
    this.servicioVisitas.couch = true;
    this.servicioVisitaProfesionalIpress.getVisitasNiniosXProfesionalTodo(ipress,aux.value.responsable).subscribe(
      (data_ninios)=>{
      this.visitas_puerperas=data_ninios;
      }
    )
  }

}
