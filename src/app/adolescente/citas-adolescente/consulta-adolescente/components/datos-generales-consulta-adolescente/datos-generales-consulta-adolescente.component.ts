import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-generales-consulta-adolescente',
  templateUrl: './datos-generales-consulta-adolescente.component.html',
  styleUrls: ['./datos-generales-consulta-adolescente.component.css']
})
export class DatosGeneralesConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({
      fecha: new FormControl(""),
      edad: new FormControl(""),
      fumn: new FormControl(""),
      nombresCompletos: new FormControl(""),
      medicacion: new FormControl(""),
      motivoConsulta: new FormControl(""),
      formaInicio: new FormControl(""),
      tiempoEnfermedad: new FormControl(""),
      observacionesSignosAlarma: new FormControl("")
    });
  }

}
