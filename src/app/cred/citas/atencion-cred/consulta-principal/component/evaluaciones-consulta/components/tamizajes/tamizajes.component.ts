import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tamizajes',
  templateUrl: './tamizajes.component.html',
  styleUrls: ['./tamizajes.component.css']
})
export class TamizajesComponent implements OnInit {
  formTamizajeCred:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
  }
  builForm(){
    this.formTamizajeCred = this.formBuilder.group({
      tamizajeAuditivo:new FormControl(''),
      ojoDerecho:new FormControl(''),
      ojoIzquierdo:new FormControl(''),
      descripcionTamizajeOcular:new FormControl(''),
      estomatologico:new FormControl(''),
      tamizajeMental:new FormControl(''),

    })
  }

}
