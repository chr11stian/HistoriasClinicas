import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostico-consulta',
  templateUrl: './diagnostico-consulta.component.html',
  styleUrls: ['./diagnostico-consulta.component.css']
})
export class DiagnosticoConsultaComponent implements OnInit {
  customers: string[]=[];
  selectedValue: string;
  val1: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
