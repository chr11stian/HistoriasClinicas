import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {valoracionMental} from "../../models/plan-atencion-adulto-mayor.model";
import {AdultoMayorService} from "../../../services/adulto-mayor.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-valoracion-mental-adulto-mayor',
  templateUrl: './valoracion-mental-adulto-mayor.component.html',
  styleUrls: ['./valoracion-mental-adulto-mayor.component.css']
})
export class ValoracionMentalAdultoMayorComponent implements OnInit {
  idRecuperado = "61b23fa6308deb1ddd0b3704";
  formValoracionMental:FormGroup;
  valoracionMental:valoracionMental;
  diagnosticoCognitivo:string;
  diagnosticoAfectivo:string;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  city: any;
  city2: any;
  constructor(private formBuilder: FormBuilder,
              private valoracionService: AdultoMayorService,
              private messageService: MessageService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  buildForm(){
    this.formValoracionMental = this.formBuilder.group({
      sabeFecha:new FormControl(''),
      sabeSemana:new FormControl(''),
      sabeLugar:new FormControl(''),
      sabeTelefono:new FormControl(''),
      sabeDireccion:new FormControl(''),
      sabeEdad:new FormControl(''),
      sabeLugarNac:new FormControl(''),
      sabePresidente:new FormControl(''),
      sabeApeMadre:new FormControl(''),
      sabeResta:new FormControl(''),
      satisfecho:new FormControl(''),
      importante:new FormControl(''),
      probMemoria:new FormControl(''),
      desganado:new FormControl(''),

    })
  }
}
