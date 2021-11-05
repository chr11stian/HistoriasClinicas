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
      { label: "Datos Generales" },
      { label: "Antecedentes" },
      { label: "Plan Control Integral" },
      { label: "Evaluación General" },
      { label: "Test de Desarrollo" },
    ]
  }
  // pasamos al siguiente step
  nextPage() {
    switch (this.stepName) {
      case "datos":
        this.stepName = "antecedentes"
        this.indiceActivo = 1
        console.log("name ",this.stepName, "indice ",this.indiceActivo)
        break
      case "antecedentes":
        this.stepName = "plan"
        this.indiceActivo = 2
        break
      case "plan":
        this.stepName = "evaluacion"
        this.indiceActivo = 3
        break
      case "evaluacion":
        this.stepName = "test"
        this.indiceActivo = 4
        break
    }
  }

  // regresamos al anterior step
  prevPage() {
    switch (this.stepName) {
      case "test":
        this.stepName = "evaluacion"
        this.indiceActivo = 3
        break
      case "evaluacion":
        this.stepName = "plan"
        this.indiceActivo = 2
        break
      case "plan":
        this.stepName = "antecedentes"
        this.indiceActivo = 1
        break
      case "antecedentes":
        this.stepName = "datos"
        this.indiceActivo = 0
        break
    }
  }
}

interface data {
  name: string
  code: number
}
