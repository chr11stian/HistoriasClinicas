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
  updateDiagnostico: boolean = false;
  indexDiagnostico: number;
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
    this.updateDiagnostico = false;
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
    this.listaDiagnosticos.push(diagnostico);
    this.listaDiagnosticos = [...this.listaDiagnosticos];
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
    this.consultaAdolescenteService.putActualizarDiagnostico("61f1195d58886c4342580d64", this.dataDiagnostico).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
    });
    console.log('data diagnostico to save ', this.dataDiagnostico);
  }
  openDialogEditDiagnostico(data, index) {
    console.log('index ', index)
    this.dialogDiagnostic = true;
    this.updateDiagnostico = true;
    this.indexDiagnostico = index;
    this.CieService.getCIEByCod(data.cie10).subscribe((res: any) => {
      this.formDiagnostico.patchValue({ tipoCie: data.tipo });
      this.formDiagnostico.patchValue({ diagnosticoCIE: res.object });
      this.formDiagnostico.patchValue({ diagnosticoText: data.diagnostico });
    });
  }
  aceptarDialogEditDiagnostico() {
    let diagnosticoAux: DiagCIE = {
      diagnostico: this.formDiagnostico.value.diagnosticoText,
      cie10: this.formDiagnostico.value.diagnosticoCIE.codigoItem,
      tipo: this.formDiagnostico.value.tipoCie
    }
    this.listaDiagnosticos.splice(this.indexDiagnostico, 1, diagnosticoAux);
    this.dialogDiagnostic = false;
  }
  eliminarDiagnostico(index) {
    this.listaDiagnosticos.splice(index, 1);
    this.listaDiagnosticos = [...this.listaDiagnosticos];
  }
  loadData(){
    this.form.patchValue({habilidadesSociales:'data'})
    this.form.patchValue({nutricional:'data'})
    this.form.patchValue({recomendaciones:'data'})
    this.formDiagnostico.patchValue({tipoCie:'data'})
    this.formDiagnostico.patchValue({autocompleDiag:'data'})
    this.formDiagnostico.patchValue({diagnosticoText:'data'})
    this.formDiagnostico.patchValue({diagnosticoCIE:'data'})
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