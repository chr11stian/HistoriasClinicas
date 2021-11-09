import { Component, OnInit } from "@angular/core"
import { MenuItem } from "primeng/api"

@Component({
  selector: "app-cabecera",
  templateUrl: "./cabecera.component.html",
  styleUrls: ["./cabecera.component.css"],
})
export class CabeceraComponent implements OnInit {
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
      { label: "Datos Generales"},
      { label: "Antecedentes" },
      { label: "Plan de Atención Integral" },
      { label: "Evaluación General" },
      { label: "Test de Desarrollo" },
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 4:
        this.stepName = "test"
        break
      case 3:
        this.stepName = "evaluacion"
        break
      case 2:
        this.stepName = "plan"
        break
      case 1:
        this.stepName = "antecedentes"
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

interface data {
  name: string
  code: number
}
