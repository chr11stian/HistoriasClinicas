import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eedp',
  templateUrl: './eedp.component.html',
  styleUrls: ['./eedp.component.css']
})
export class EEDPComponent implements OnInit {

  datosMeses: any[];
  constructor() { }

  ngOnInit(): void {
    this.datosMeses = [
      {
        area: 'Coordinacion', mes_1: 1, mes_2: 1, mes_3: 1, mes_4: 1, mes_5: 1, mes_6: 1,
        mes_7: 1, mes_8: 1, mes_9: 1, mes_10: 1, mes_12: 1, mes_15: 1, mes_18: 1, mes_21: 1, mes_24: 1,
      },
      {
        area: 'Social', mes_1: 1, mes_2: 1, mes_3: 1, mes_4: 1, mes_5: 1, mes_6: 1,
        mes_7: 1, mes_8: 1, mes_9: 1, mes_10: 1, mes_12: 1, mes_15: 1, mes_18: 1, mes_21: 1, mes_24: 1,
      }
    ]
  }

}
