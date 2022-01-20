import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';

@Component({
  selector: 'app-dialog-patologias-maternas',
  templateUrl: './dialog-patologias-maternas.component.html',
  styleUrls: ['./dialog-patologias-maternas.component.css']
})
export class DialogPatologiasMaternasComponent implements OnInit {

  formDiagnostico: FormGroup;
  update: boolean = false;
  listaDeCIE: any;

  constructor(
    private fb: FormBuilder,
    private cieService: CieService,
    private ref: DynamicDialogRef,

  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
  }

  inicializarForm() {
    this.formDiagnostico = this.fb.group({
      cie10: new FormControl(""),
      autocompleteDiagnostico: new FormControl(""),
      diagnostico: new FormControl(""),
      datePatologia: new FormControl(""),
    })
  }

  filterCIE10(value) {
    this.cieService.getCIEByDescripcion(value.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }

  selectedOptionNameCIE(event) {
    this.formDiagnostico.patchValue({ diagnostico: event.descripcionItem });
    this.formDiagnostico.patchValue({ autocompleteDiagnostico: "" });
    this.formDiagnostico.patchValue({ cie10: event }, { emitEvent: false });
  }

  selectedOption(event) {
    console.log('value ', event);
    this.formDiagnostico.patchValue({ diagnostico: event.descripcionItem });
  }

  aceptarPatologias() {
    let dataPatologias = {
      nombre: this.formDiagnostico.value.diagnostico,
      cie10: this.formDiagnostico.value.cie10.codigoItem,
      fecha: this.formDiagnostico.value.datePatologia
    }
    this.ref.close(dataPatologias);
  }

  closeDialog() {
    this.ref.close();
  }

}
