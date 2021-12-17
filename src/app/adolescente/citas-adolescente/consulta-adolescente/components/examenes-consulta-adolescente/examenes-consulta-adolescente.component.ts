import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-examenes-consulta-adolescente',
  templateUrl: './examenes-consulta-adolescente.component.html',
  styleUrls: ['./examenes-consulta-adolescente.component.css']
})
export class ExamenesConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;
  formExamAux: FormGroup;
  formExamFisico: FormGroup;
  datosResultadosExamAux: any;
  datosExamenFisico: any;
  dialogResultExamensAux: boolean = false;
  dialogExamFisico: boolean = false;
  updateExamResultAux: boolean = false;
  updateExamFisico: boolean = false;


  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {

  }

  inicializarForm() {
    this.form = this.fb.group({
      apetito: new FormControl(""),
      sed: new FormControl(""),
      sueño: new FormControl(""),
      estadoAnimo: new FormControl(""),
      orina: new FormControl(""),
      deposiciones: new FormControl(""),
      temperatura: new FormControl(""),
      presionSis: new FormControl(""),
      presionDias: new FormControl(""),
      fc: new FormControl(""),
      fr: new FormControl(""),
      peso: new FormControl(""),
      talla: new FormControl(""),
      imc: new FormControl(""),
    });
    this.formExamAux = this.fb.group({
      resultado: new FormControl(""),
    });
    this.formExamFisico = this.fb.group({
      observacionesExamFisico: new FormControl(""),

    })
  }

  openDialogExamAux() {
    this.dialogResultExamensAux = true;
  }

  openDialogPhysicExamn() {
    this.dialogExamFisico = true;
  }

}
