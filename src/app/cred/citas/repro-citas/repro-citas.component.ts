import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repro-citas',
  templateUrl: './repro-citas.component.html',
  styleUrls: ['./repro-citas.component.css']
})
export class ReproCitasComponent implements OnInit {
  data: any[] = [];

  checkedon: boolean = true;
  checkedoff: boolean = false;
  desabilitar: boolean;
  reproFG: FormGroup;
  constructor() {

    this.data = [
      ["07:00am - 08:30am", 1, 0, 0, 1, 0, 0, 0],
      ["08:30am - 10:00am", 0, 1, 0, 0, 0, 0, 0],
      ["10:00am - 11:30am", 1, 0, 0, 0, 1, 0, 0],
      ["11:30am - 01:00pm", 0, 0, 1, 0, 0, 0, 1],
      ["01:00pm - 02:30pm", 1, 0, 0, 0, 1, 0, 0],
    ]
    this.desabilitar=false;
  }

  ngOnInit(): void {
  }

  cambio(e) {
    console.log(e);

  }

  cambioClick(e, colIndex) {
    console.log('click');
    
    console.log('row', e, 'colindex', colIndex);

  }
}
