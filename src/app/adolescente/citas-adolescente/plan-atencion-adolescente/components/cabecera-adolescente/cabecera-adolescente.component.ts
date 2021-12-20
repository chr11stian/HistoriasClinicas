import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-cabecera-adolescente',
  templateUrl: './cabecera-adolescente.component.html',
  styleUrls: ['./cabecera-adolescente.component.css']
})
export class CabeceraAdolescenteComponent implements OnInit {

  items: MenuItem[]
  indiceActivo: number = 0
  stepName = "problemas"

  constructor() {
  }


  ngOnInit(): void {
    this.items = [
      { label: "Lista de Problemas", styleClass: 'icon'},
      { label: "Datos Generales", styleClass: 'icon1'},
      { label: "Plan de Atención Integral", styleClass: 'icon2'},
      { label: "Antecedentes", styleClass: 'icon3'},
      { label: "Salud", styleClass: 'icon3'},
    ]
  }
  //--cambia los nombres de los steps según el indice
  name() {
    switch (this.indiceActivo) {
      case 4:
        this.stepName = "salud"
        break
      case 3:
        this.stepName = "antecedentes"
        break
      case 2:
        this.stepName = "plan"
        break
      case 1:
        this.stepName = "datos"
        break
      case 0:
        this.stepName = "problemas"
        break
    }
  }
  //--cambia step
  ChangeStep(event: number){
    this.indiceActivo = event;
    this.name()
  }
}
