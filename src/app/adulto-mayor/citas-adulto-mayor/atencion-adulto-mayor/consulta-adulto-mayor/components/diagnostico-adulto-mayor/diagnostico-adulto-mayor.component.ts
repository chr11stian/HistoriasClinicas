import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdultoMayorService} from "../../../atencion-adulto-mayor/plan-atencion-adulto-mayor/services/adulto-mayor.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-diagnostico-adulto-mayor',
  templateUrl: './diagnostico-adulto-mayor.component.html',
  styleUrls: ['./diagnostico-adulto-mayor.component.css']
})
export class DiagnosticoAdultoMayorComponent implements OnInit {
  formDiagnostico: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private filiacionService: AdultoMayorService,
              private messageService: MessageService) {
    this.builForm();
  }

  ngOnInit(): void {
  }

  builForm() {
    this.formDiagnostico = this.formBuilder.group({
      diagnosticoFuncional: new FormControl(''),
      diagnosticoCognitivo:new FormControl(''),
      diagnosticoAfectivo:new FormControl(''),
      diagnosticoSocioFamiliar:new FormControl(''),
    })
  }

}
