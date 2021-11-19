import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repro-citas',
  templateUrl: './repro-citas.component.html',
  styleUrls: ['./repro-citas.component.css']
})
export class ReproCitasComponent implements OnInit {
  datos: any[] = [];

  checkedon: boolean = true;
  checkedoff: boolean = false;
  desabilitar: boolean;
  reproFG: FormGroup;
  constructor() {
    this.datos = [
      ["07:00am - 08:30am", true, false, false, true, false, false, false],
      ["08:30am - 10:00am", false, true, false, false, true, false, false],
      ["10:00am - 11:30am", true, false, false, false, true, false, false],
      ["11:30am - 01:00pm", false, false, true, false, false, false, true],
      ["01:00pm - 02:30pm", true, false, false, false, true, false, false],
    ]
    this.desabilitar = false;
  }

  ngOnInit(): void {
  }

  cambio(e) {
    console.log(e);

  }

  cambioClick(e, colIndex) {
    console.log(this.datos[e][colIndex]);

    this.datos[e][colIndex] = !this.datos[e][colIndex]
    // console.log('click');

    // console.log('row', e, 'colindex', colIndex);

  }
}
