import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-step-general-consulta-adulto-mayor',
  templateUrl: './step-general-consulta-adulto-mayor.component.html',
  styleUrls: ['./step-general-consulta-adulto-mayor.component.css']
})
export class StepGeneralConsultaAdultoMayorComponent implements OnInit {
  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "enfermedad"
  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: "Enfermedad Actual", styleClass: 'icon'},
      { label: "Diagnóstico", styleClass: 'icon1'},
      { label: "Categoria", styleClass: 'icon2'},
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 2:
        this.stepName = "categoria"
        break
      case 1:
        this.stepName = "diagnostico"
        break
      case 0:
        this.stepName = "enfermedad"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }

}
