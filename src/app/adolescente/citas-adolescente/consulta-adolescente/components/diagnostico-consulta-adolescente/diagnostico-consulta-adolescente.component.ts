import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { ConsultaAdolescenteService } from '../../services/consulta-adolescente.service';

@Component({
  selector: 'app-diagnostico-consulta-adolescente',
  templateUrl: './diagnostico-consulta-adolescente.component.html',
  styleUrls: ['./diagnostico-consulta-adolescente.component.css']
})
export class DiagnosticoConsultaAdolescenteComponent implements OnInit {

  listaDiagnosticos: DiagCIE[] = [];
  form: FormGroup;
  formDiagnostico: FormGroup;
  dialogDiagnostic: boolean = false;
  listaDeCIE: cie10[] = [];
  dataDiagnostico: Diagnostico;
  listaTiposCie: KeyValue[] = [
    { name: "DEFINITIVO", value: "D" },
    { name: "PRESUNTIVO", value: "P" },
    { name: "REPETITIVO", value: "R" }
  ];

  constructor(
    private fb: FormBuilder,
    private CieService: CieService,
    private consultaAdolescenteService: ConsultaAdolescenteService,
    private messageService: MessageService,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
    // this.formDiagnostico.get("diagnosticoText").setValue("otro valor nuevo");

  }

  inicializarForm() {
    this.form = this.fb.group({
      habilidadesSociales: new FormControl(""),
      nutricional: new FormControl(""),
      recomendaciones: new FormControl(""),

    });
    this.formDiagnostico = this.fb.group({
      tipoCie: new FormControl(""),
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
    let diagnostico: DiagCIE = {
      diagnostico: this.formDiagnostico.value.diagnosticoText,
      cie10: this.formDiagnostico.value.diagnosticoCIE.codigoItem,
      tipo: this.formDiagnostico.value.tipoCie
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
    this.dataDiagnostico = {
      diagnosticos: this.listaDiagnosticos,
      diagHabilidadesSociales: this.form.value.habilidadesSociales,
      diagNutricional: this.form.value.nutricional,
      recomendaciones: [this.form.value.recomendaciones]
    }
  }
  guardarDiagnostico() {
    this.recuperarDiagnosticos();
    this.consultaAdolescenteService.putActualizarDiagnostico("61ce1cf02aed74731bb3fb3a", this.dataDiagnostico).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
    });
    console.log('data diagnostico to save ', this.dataDiagnostico);
  }
}

export interface cie10 {
  id: string,
  codigoItem: string,
  descripcionItem: string,
  descripcionTipoItem: string,
  tipoItem: string,
}
export interface DiagCIE {
  diagnostico: string,
  cie10: cie10,
  tipo: string
}
export interface Diagnostico {
  diagnosticos: DiagCIE[],
  diagHabilidadesSociales: string,
  diagNutricional: string,
  recomendaciones: string[]
}
export interface KeyValue {
  name: string,
  value: string
}