import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CieService } from 'src/app/obstetricia-general/services/cie.service';

@Component({
  selector: 'app-diagnostico-consulta-adolescente',
  templateUrl: './diagnostico-consulta-adolescente.component.html',
  styleUrls: ['./diagnostico-consulta-adolescente.component.css']
})
export class DiagnosticoConsultaAdolescenteComponent implements OnInit {

  listaDiagnosticos: any[] = [];
  form: FormGroup;
  formDiagnostico: FormGroup;
  dialogDiagnostic: boolean = false;
  listaDeCIE: any;

  constructor(
    private fb: FormBuilder,
    private CieService: CieService,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
    this.form.patchValue({ diagnosticoText: 'gg' });
    this.formDiagnostico.get("diagnosticoText").setValue("otro valor nuevo");
  }

  inicializarForm() {
    this.form = this.fb.group({
      habilidadesSociales: new FormControl(""),
      nutricional: new FormControl(""),
      recomendaciones: new FormControl(""),

    });
    this.formDiagnostico = this.fb.group({
      autocompleDiag: new FormControl(""),
      diagnosticoText: new FormControl(""),
      diagnosticoCIE: new FormControl(""),
    })
  }

  openDialogDiagnostico() {
    this.formDiagnostico.reset();
    this.dialogDiagnostic = true;
  }

  filterCIE10(value) {
    this.CieService.getCIEByDescripcion(value.query).subscribe((res: any) => {
      this.listaDeCIE = res.object;
    })
  }

  selectedOptionNameCIE(value) {
    console.log('data selected ', value);
    this.formDiagnostico.patchValue({ diagnosticoText: value.descripcionItem });
    this.formDiagnostico.patchValue({ autocompleDiag: '' });
    this.formDiagnostico.patchValue({ diagnosticoCIE: value });
  }

  aceptarNuevoDiagnostico() {
    let diagnostico: diagnostico = {
      diagnostico: this.formDiagnostico.value.diagnosticoText,
      cie10: this.formDiagnostico.value.diagnosticoCIE
    }
    console.log('diagnostico ', diagnostico);
    this.listaDiagnosticos.push(diagnostico);
    this.dialogDiagnostic = false;
  }

  closeDialogDiagnostico() {
    this.dialogDiagnostic = false;
  }
  selectedOption(event) {
    this.formDiagnostico.patchValue({ diagnosticoText: event.descripcionItem });
  }

  recuperarDiagnosticos() {

  }
  guardarDiagnostico() {

  }
}

export interface cie10 {
  id: string,
  codigoItem: string,
  descripcionItem: string,
  descripcionTipoItem: string,
  tipoItem: string,
}

export interface diagnostico {
  diagnostico: string,
  cie10: cie10
}
