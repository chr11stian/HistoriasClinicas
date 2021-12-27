import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-step-valoracion-adulto-mayor',
  templateUrl: './step-valoracion-adulto-mayor.component.html',
  styleUrls: ['./step-valoracion-adulto-mayor.component.css']
})
export class StepValoracionAdultoMayorComponent implements OnInit {
  items: MenuItem[]
  constructor() { }
  indiceActivo: number = 0
  stepName = "funcional"
  ngOnInit(): void {
    this.items = [
      { label: "Valoración Funcional", styleClass: 'icon'},
      { label: "Valoración Mental", styleClass: 'icon1'},
      { label: "Valoración Socio-Familiar", styleClass: 'icon2'},
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 2:
        this.stepName = "sociofamiliar"
        break
      case 1:
        this.stepName = "mental"
        break
      case 0:
        this.stepName = "funcional"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }

}
