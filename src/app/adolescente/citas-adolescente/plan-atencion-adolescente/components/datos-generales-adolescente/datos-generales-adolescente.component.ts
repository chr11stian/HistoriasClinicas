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
  opciones=[{name:'name1',code:'code1'},
    {name:'name2',code:'code2'},
    {name:'name3',code:'code3'},
    {name:'name4',code:'code4'},
    {name:'name5',code:'code5'},
    {name:'name6',code:'code6'}]
  ngOnInit(): void {
  }

}
