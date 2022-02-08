import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tamizajes',
  templateUrl: './tamizajes.component.html',
  styleUrls: ['./tamizajes.component.css']
})
export class TamizajesComponent implements OnInit {
  formTamizajeCred:FormGroup;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
  }
  builForm(){
    this.formTamizajeCred = this.formBuilder.group({
      tamizajeAuditivo:new FormControl(''),
      prematuro:new FormControl(''),
      uci:new FormControl(''),
      billirubina:new FormControl(''),
      perdidaAudicion:new FormControl(''),
      infeccionOido:new FormControl(''),
      meningitis:new FormControl(''),
      expuestoSonido:new FormControl(''),
      ojoDerecho:new FormControl(''),
      ojoIzquierdo:new FormControl(''),
      descripcionTamizajeOcular:new FormControl(''),
      estomatologico:new FormControl(''),
      tamizajeMental:new FormControl(''),

    })
  }

}
