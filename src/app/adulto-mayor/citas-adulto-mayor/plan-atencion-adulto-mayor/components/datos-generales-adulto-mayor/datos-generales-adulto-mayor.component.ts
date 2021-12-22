import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-datos-generales-adulto-mayor',
  templateUrl: './datos-generales-adulto-mayor.component.html',
  styleUrls: ['./datos-generales-adulto-mayor.component.css']
})
export class DatosGeneralesAdultoMayorComponent implements OnInit {
  formDatosGenerales: FormGroup;
  sino = [
    { label: 'F', value: 'F' },
    { label: 'M', value: 'M' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
