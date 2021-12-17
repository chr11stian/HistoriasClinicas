import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diagnostico-consulta-adolescente',
  templateUrl: './diagnostico-consulta-adolescente.component.html',
  styleUrls: ['./diagnostico-consulta-adolescente.component.css']
})
export class DiagnosticoConsultaAdolescenteComponent implements OnInit {

  datosDiagnosticos: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm(){
    this.form = this.fb.group({
      habilidadesSociales: new FormControl(""),
      nutricional: new FormControl(""),
      recomendaciones: new FormControl(""),
      
    });
  }

}
