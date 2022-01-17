import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-step-general-adulto-mayor',
  templateUrl: './step-general-adulto-mayor.component.html',
  styleUrls: ['./step-general-adulto-mayor.component.css']
})
export class StepGeneralAdultoMayorComponent implements OnInit {

  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "dato"

  constructor() {
  }


  ngOnInit(): void {
    this.items = [
      { label: "Datos Generales", styleClass: 'icon1'},
      { label: "Lista de Problemas", styleClass: 'icon'},
      { label: "Plan de Atención Integral", styleClass: 'icon2'},
      { label: "Antecedentes", styleClass: 'icon3'},
      { label: "Valoracion Clinica", styleClass: 'icon3'},
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 4:
        this.stepName = "valoracion"
        break
      case 3:
        this.stepName = "antecedente"
        break
      case 2:
        this.stepName = "plan"
        break
      case 1:
        this.stepName = "problema"
        break
      case 0:
        this.stepName = "dato"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }
}
