import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-step-general-consulta-adolescente',
  templateUrl: './step-general-consulta-adolescente.component.html',
  styleUrls: ['./step-general-consulta-adolescente.component.css']
})
export class StepGeneralConsultaAdolescenteComponent implements OnInit {

  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "datos"

  constructor() {
  }


  ngOnInit(): void {
    this.items = [
      { label: "Datos Generales", styleClass: 'icon1'},
      { label: "Examenes", styleClass: 'icon2'},
      { label: "Diagnosticos", styleClass: 'icon3'},
      { label: "Tratamientos", styleClass: 'icon3'},
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 3:
        this.stepName = "tratamiento"
        break
      case 2:
        this.stepName = "diagnostico"
        break
      case 1:
        this.stepName = "examen"
        break
      case 0:
        this.stepName = "datos"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }
}
