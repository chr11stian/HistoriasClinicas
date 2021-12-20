import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-generales-adolescente',
  templateUrl: './datos-generales-adolescente.component.html',
  styleUrls: ['./datos-generales-adolescente.component.css']
})
export class DatosGeneralesAdolescenteComponent implements OnInit {

  constructor() { }
  sexo = [
    {name: 'M', code: 'M'},
    {name: 'F', code: 'F'},
  ];
  ngOnInit(): void {
  }

}
