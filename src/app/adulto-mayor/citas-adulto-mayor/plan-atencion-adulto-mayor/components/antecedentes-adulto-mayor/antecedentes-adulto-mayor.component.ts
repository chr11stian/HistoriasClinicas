import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-antecedentes-adulto-mayor',
  templateUrl: './antecedentes-adulto-mayor.component.html',
  styleUrls: ['./antecedentes-adulto-mayor.component.css']
})
export class AntecedentesAdultoMayorComponent implements OnInit {
  sino = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  familiares = [
    {nombrefamiliar: 'Padre'},
    {nombrefamiliar: 'Madre'},
    {nombrefamiliar: 'Hermano'},
    {nombrefamiliar: 'Hermana'},
    {nombrefamiliar: 'Abuelo'},
    {nombrefamiliar: 'Otros'},
  ];
  medicamentoFrecuentes: any;
  constructor() { }

  ngOnInit(): void {
  }



  openDialogEditarTratamientosfrec(rowData: any, rowIndex: any) {

  }

  eliminarTratamientoFrecuente(rowIndex: any) {

  }

}
