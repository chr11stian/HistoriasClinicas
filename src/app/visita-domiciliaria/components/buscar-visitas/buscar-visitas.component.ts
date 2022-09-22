import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-visitas',
  templateUrl: './buscar-visitas.component.html',
  styleUrls: ['./buscar-visitas.component.css']
})
export class BuscarVisitasComponent implements OnInit {
  selectedMonth: number;
  selectedYear: number;
  value1: string = "enero";
  stateOptions: any[];
  dataAnios: string[] = ["todo"];
  meses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value:2},
    { label: 'Marzo', value: 3},
    { label: 'Abril', value:4},
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value:6},
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value:8},
    { label: 'Septiembre', value: 9},
    { label: 'Octubre', value:10},
    { label: 'Noviembre', value:11},
    { label: 'Diciembre', value:12},
  ];
  anios = [
    {anio: '2022'},
    {anio: '2021'},
    {anio: '2020'},
    {anio: '2019'},
  ];
  constructor() { }
 
  ngOnInit(): void {
    this.stateOptions = [
      { label: "Enero", value: 0 },
      { label: "Febrero", value: 1 },
      { label: "Marzo", value: 2 },
      { label: "Abril", value: 3 },
      { label: "Mayo", value: 4 },
      { label: "Junio", value: 5 },
      { label: "Julio", value: 6 },
      { label: "Agosto", value: 7 },
      { label: "Setiembre", value: 8 },
      { label: "Octubre", value: 9 },
      { label: "Noviembre", value: 10 },
      { label: "Diciembre", value: 11 },
    ];
  }
//methods
verVisitasDomiciliariasPorAnio(event){

}

verVisitasDomiciliariasPorMes(event){

}
}
