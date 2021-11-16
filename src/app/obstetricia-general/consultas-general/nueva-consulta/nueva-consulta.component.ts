import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.css']
})
export class NuevaConsultaComponent implements OnInit {
  form: FormGroup;
  todosEgresosDelRN: any[];
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.todosEgresosDelRN = [{
      tratamientos: "Tomar paracetamol 500mg",
      diagnostico: "Presenta sintomas de alerta",
    },
    {
      tratamientos: "Mantener Reposo",
      diagnostico: "Presenta sintomas leves",
    },
    {
      tratamientos: "Tomar paracetamol 500mg",
      diagnostico: "Presenta sintomas de peligro",
    },
    {
      tratamientos: "Tomar paracetamol 500mg",
      diagnostico: "Presenta sintomas leves",
    }]
   }
   buildForm() {
    this.form = this.formBuilder.group({
      sexo: [''],
      pesoRN: [''],
    })
  }
  ngOnInit(): void {
  }

}
