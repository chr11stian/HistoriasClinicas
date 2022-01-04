import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../../atencion-adulto-mayor/plan-atencion-adulto-mayor/services/adulto-mayor.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-enfermedad-actual-adulto-mayor',
  templateUrl: './enfermedad-actual-adulto-mayor.component.html',
  styleUrls: ['./enfermedad-actual-adulto-mayor.component.css']
})
export class EnfermedadActualAdultoMayorComponent implements OnInit {
  formEnfermedadActualAdultoMayor:FormGroup;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private formBuilder: FormBuilder,
              private filiacionService: AdultoMayorService,
              private messageService: MessageService) {
    this.builForm();
  }

  ngOnInit(): void {

  }
  builForm(){
    this.formEnfermedadActualAdultoMayor = this.formBuilder.group({
      fecha:new FormControl(''),
      edad:new FormControl(''),
      motivoConsulta:new FormControl(''),
      apetito:new FormControl(''),
      sed:new FormControl(''),
      suenio:new FormControl(''),
      estadoAnimo:new FormControl(''),
      orina:new FormControl(''),
      deposiciones:new FormControl(''),
      pesoPerdido:new FormControl(''),
      temperatura:new FormControl(''),
      presionArterial:new FormControl(''),
      frecuenciaC:new FormControl(''),
      frecuenciaR:new FormControl(''),
      peso:new FormControl(''),
      talla:new FormControl(''),
      imc:new FormControl(''),
      piel:new FormControl(''),
      edemas:new FormControl(''),
      estadoPies:new FormControl(''),
      cabezaCuello:new FormControl(''),
      cavidadOral:new FormControl(''),
      toraxPulmones:new FormControl(''),
      cardiovascular:new FormControl(''),
      abdomen:new FormControl(''),
      genitoUrinario:new FormControl(''),
      tactoRectal:new FormControl(''),
      nervioso:new FormControl(''),
      locomotor:new FormControl(''),
      estadoNutricional:new FormControl('')
    })
  }

}
