import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-recien-nacido',
  templateUrl: './recien-nacido.component.html',
  styleUrls: ['./recien-nacido.component.css']
})
export class RecienNacidoComponent implements OnInit {
  form: FormGroup;
  stateOptions: any[];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.stateOptions = [{label: 'Si', value: 'Si'}, {label: 'No', value: 'No'}];
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      sexo: ['', [Validators.required]],
      pesoRN: ['', [Validators.required]],
      semanasRN: ['', [Validators.required]],
      pesoEdadGes: ['', [Validators.required]],
      reanimacion: ['', [Validators.required]],
      exaFisico: ['', [Validators.required]],
      VIH: ['', [Validators.required]],
      hospitalizacion: ['', [Validators.required]],
      necropsia: ['', [Validators.required]],
      luetica: ['', [Validators.required]],
      alojamiento: ['', [Validators.required]],
      contactoPiel: ['', [Validators.required]],
      LME: ['', [Validators.required]],
      deposiciones: ['', [Validators.required]],
      egresoRN: ['', [Validators.required]],
      dx: ['', [Validators.required]],
      alimentoAlta: ['', [Validators.required]],
      egresoMaterno: ['', [Validators.required]],
      dxMaterno: ['', [Validators.required]],
      grupoSangre: ['', [Validators.required]],
      rhSangre: ['', [Validators.required]],
      anticonceptivoMaterno: ['', [Validators.required]],
      selectedSexo: ['', [Validators.required]],
      selectedMedicacion: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

}
