import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api"

@Component({
  selector: 'app-step-general-parto',
  templateUrl: './step-general-parto.component.html',
  styleUrls: ['./step-general-parto.component.css']
})
export class StepGeneralPartoComponent implements OnInit {
  options: data[]
  selectedOption: data
  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "datos"

  constructor() {
    this.options = [
      { name: "DNI", code: 1 },
      { name: "CARNET RN", code: 2 },
      { name: "C EXTRANJERIA", code: 3 },
      { name: "OTROS", code: 4 },
    ]
  }
 

  ngOnInit(): void {
    this.items = [
      { label: "Datos Generales" },
      { label: "Intervalo" },
      { label: "Necesidades" },
      { label: "Señales" },
    ]
  }
  name() {
    switch (this.indiceActivo){
      case 3:
        this.stepName = "señales"
        break
      case 2:
        this.stepName = "necesidades"
        break
      case 1:
        this.stepName = "intervalo"
        break
      case 0:
        this.stepName = "datos"
        break
    }
  }
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }
}

interface data {
  name: string
  code: number
}
