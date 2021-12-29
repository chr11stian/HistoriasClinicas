import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-step-general-adulto',
  templateUrl: './step-general-adulto.component.html',
  styleUrls: ['./step-general-adulto.component.css']
})
export class StepGeneralAdultoComponent implements OnInit {

  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "problema"

  constructor() {
  }


  ngOnInit(): void {
    this.items = [
      { label: "Lista de Problemas", styleClass: 'icon'},
      { label: "Datos Generales", styleClass: 'icon1'},
      { label: "Plan de Atención Integral", styleClass: 'icon2'},
      { label: "Antecedentes", styleClass: 'icon3'},
      { label: "Cuidados Preventivos", styleClass: 'icon3'},
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 4:
        this.stepName = "cuidado"
        break
      case 3:
        this.stepName = "antecedente"
        break
      case 2:
        this.stepName = "plan"
        break
      case 1:
        this.stepName = "dato"
        break
      case 0:
        this.stepName = "problema"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }
}
