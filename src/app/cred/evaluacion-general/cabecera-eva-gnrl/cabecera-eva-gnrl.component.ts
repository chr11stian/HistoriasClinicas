import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api"

@Component({
  selector: 'app-cabecera-eva-gnrl',
  templateUrl: './cabecera-eva-gnrl.component.html',
  styleUrls: ['./cabecera-eva-gnrl.component.css']
})
export class CabeceraEvaGnrlComponent implements OnInit {

  items: MenuItem[];
  stepIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: "Evaluacion de la Alimentacion del niño(a)"},
      { label: "Escala de Evaluacion del desaroolo Psicomotor (EEDP) 0-4 Años" },
      { label: "Evaluacion del desarollo Psicomotor (EEDP)" }
    ]
  }

  ChangeStep(event: number){
    this.stepIndex = event;
  }
}