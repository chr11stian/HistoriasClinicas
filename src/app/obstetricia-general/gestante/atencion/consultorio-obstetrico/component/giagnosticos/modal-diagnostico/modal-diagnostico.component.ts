import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal-diagnostico',
  templateUrl: './modal-diagnostico.component.html',
  styleUrls: ['./modal-diagnostico.component.css']
})
export class ModalDiagnosticoComponent implements OnInit {
  diagnosticoDialog: any;
  opcionBusqueda: any;
  formDx: FormGroup;
  Cie10: any;
  selectedDiagnostico:any;


  constructor() { }

  ngOnInit(): void {
  }


  filterDiagnostico($event: any) {

  }

  selectedOption($event: any) {

  }

  canceled() {

  }
}
