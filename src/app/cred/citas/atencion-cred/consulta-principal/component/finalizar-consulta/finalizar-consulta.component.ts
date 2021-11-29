import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-finalizar-consulta',
  templateUrl: './finalizar-consulta.component.html',
  styleUrls: ['./finalizar-consulta.component.css']
})
export class FinalizarConsultaComponent implements OnInit {
  acuerdosFG: FormGroup
  constructor() {
    this.buildFG();
  }
  buildFG(): void {
    this.acuerdosFG = new FormGroup({
      detailAcuerdoFC: new FormControl({value: '', disabled: false}, []),
      proximaCitaFC: new FormControl({value: null, disabled: false}, []),
      atendidoFC: new FormControl({value: '', disabled: false}, []),
      dniFC: new FormControl({value: '', disabled: false}, []),
      observacionFC: new FormControl({value: '', disabled: false}, []),
    })
  }
  ngOnInit(): void {
  }

}
