import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api"

@Component({
  selector: 'app-step-general',
  templateUrl: './step-general.component.html',
  styleUrls: ['./step-general.component.css']
})
export class StepGeneralComponent implements OnInit {
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
      { label: "Datos Basales" },
      { label: "Atenciones" },
      { label: "Partos o Abortos" },
      { label: "Recien Nacidos" },
      { label: "Puerperio" },
    ]
  }
  // pasamos al siguiente step
  nextPage() {
    switch (this.stepName) {
      case "datos":
        this.stepName = "basales"
        this.indiceActivo = 1
        break
      case "basales":
        this.stepName = "atenciones"
        this.indiceActivo = 2
        break
      case "atenciones":
        this.stepName = "partos"
        this.indiceActivo = 3
        break
      case "partos":
        this.stepName = "nacidos"
        this.indiceActivo = 4
        break
      case "nacidos":
        this.stepName = "puerperio"
        this.indiceActivo = 5
        break
    }
  }

  // regresamos al anterior step
  prevPage() {
    switch (this.stepName) {
      case "puerperio":
        this.stepName = "nacidos"
        this.indiceActivo = 4
        break
      case "nacidos":
        this.stepName = "partos"
        this.indiceActivo = 3
        break
      case "partos":
        this.stepName = "atenciones"
        this.indiceActivo = 2
        break
      case "atenciones":
        this.stepName = "basales"
        this.indiceActivo = 1
        break
      case "basales":
        this.stepName = "datos"
        this.indiceActivo = 0
        break
    }
  }
  ChangeStep(event: number){
    this.indiceActivo = event;
  }
}

interface data {
  name: string
  code: number
}
