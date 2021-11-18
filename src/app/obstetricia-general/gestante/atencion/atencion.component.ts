import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {
  titleBienvenida: string = "¡Iniciemos!";
  contentBienvenida:string = "Puedes empezar seleccionando Plan de Atención Integral Cada una de las secciones contiene todo lo que necesitas para completar su primera consulta.";
  titlePrimeraFase:string="¡Continuamos!";
  contentPrimeraFase: string ="";
  titleSegundaFase: string="Por último";
  contentSegundaFase:string="";

  constructor() {}

  ngOnInit(): void {
  }

}
