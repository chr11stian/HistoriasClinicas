import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salud-adolescente',
  templateUrl: './salud-adolescente.component.html',
  styleUrls: ['./salud-adolescente.component.css']
})
export class SaludAdolescenteComponent implements OnInit {
  siNo=[{name:'Si',code:'si'},
    {name:'No',code:'no'}]
  constructor() { }

  ngOnInit(): void {
  }

}
