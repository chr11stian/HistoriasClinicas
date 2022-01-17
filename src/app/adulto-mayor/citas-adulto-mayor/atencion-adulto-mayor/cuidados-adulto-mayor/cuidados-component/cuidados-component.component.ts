import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../plan-atencion-adulto-mayor/services/adulto-mayor.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cuidados-component',
  templateUrl: './cuidados-component.component.html',
  styleUrls: ['./cuidados-component.component.css']
})
export class CuidadosComponentComponent implements OnInit {
  formCuidados:FormGroup;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private formBuilder: FormBuilder,
              private filiacionService: AdultoMayorService,
              private messageService: MessageService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  buildForm(){
    this.formCuidados = this.formBuilder.group({
      fecha: new FormControl(''),
      hcl: new FormControl(''),
      antitetanica: new FormControl(''),
      antiamarilica: new FormControl(''),
      antihepatitis: new FormControl(''),
      antinfluenza: new FormControl(''),
      antineumococo: new FormControl(''),
      consumoAlcohol: new FormControl(''),
      consumoTabaco: new FormControl(''),
      actividadFisica: new FormControl(''),
      controlBucal: new FormControl(''),
      mamas: new FormControl(''),
      pelvicoPAP: new FormControl(''),
      mamografia: new FormControl(''),
      evaluacionProstata: new FormControl(''),
      densitometria: new FormControl(''),
      hemograma: new FormControl(''),
      glucosa: new FormControl(''),
      urea: new FormControl(''),
      creatinina: new FormControl(''),
      colesterol: new FormControl(''),
      trigliceridos: new FormControl(''),
      examenOrina: new FormControl(''),
      comentarios: new FormControl(''),
      vertigo: new FormControl(''),
      delirio: new FormControl(''),
      sincope: new FormControl(''),
      dolorCronico: new FormControl(''),
      deprivacionAuditiva: new FormControl(''),
      deprivacionVisual: new FormControl(''),
      insomnio: new FormControl(''),
      incontinencia: new FormControl(''),
      prostatismo: new FormControl(''),
      estrenimiento: new FormControl(''),
      ulceras: new FormControl(''),
      inmovilizacion: new FormControl(''),
      caidas: new FormControl(''),
      caidasUltimo: new FormControl(''),
      nroCaidas: new FormControl(''),
      fracturas: new FormControl(''),
    })
  }

}
