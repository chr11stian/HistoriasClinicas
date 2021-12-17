import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tratamiento-consulta-adolescente',
  templateUrl: './tratamiento-consulta-adolescente.component.html',
  styleUrls: ['./tratamiento-consulta-adolescente.component.css']
})
export class TratamientoConsultaAdolescenteComponent implements OnInit {

  form: FormGroup;
  formTratamiento: FormGroup;
  datosDiagnosticos: any;
  updateTratamiento: boolean = false;
  dialogTratamiento: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.form = this.fb.group({
      solicitudExam: new FormControl(""),
      compromisosObs: new FormControl(""),
    });
    this.formTratamiento = this.fb.group({
      tratamiento: new FormControl(""),
    });
  }

  openDialogTratamiento() {
    this.dialogTratamiento = true;
  }

}
