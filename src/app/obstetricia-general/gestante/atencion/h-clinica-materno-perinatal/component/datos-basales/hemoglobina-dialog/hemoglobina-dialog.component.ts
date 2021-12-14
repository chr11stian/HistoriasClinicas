import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-hemoglobina-dialog',
  templateUrl: './hemoglobina-dialog.component.html',
  styleUrls: ['./hemoglobina-dialog.component.css']
})
export class HemoglobinaDialogComponent implements OnInit {

  formHemoglobina: FormGroup;
  listaHemoglobina: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.formHemoglobina = this.fb.group({
      hg: new FormControl('', Validators.required),
      factorCorrec: new FormControl('', Validators.required),
      fechaHemo: new FormControl('', Validators.required),
    });
  }

  agregarHemo() {
    if (this.formHemoglobina.valid) {
      let dataHemo = {
        descripcion: 'hemoglobina ' + this.listaHemoglobina.length + 1,
        hg: this.formHemoglobina.value.hg,
        factCorrecion: this.formHemoglobina.value.factorCorrec,
        fecha: this.formHemoglobina.value.fechaHemo
      }
      this.listaHemoglobina.push(dataHemo);
      this.formHemoglobina.reset();
    }
  }

  eliminarHemo(index) {
    this.listaHemoglobina.splice(index, 1);
  }

  closeDialog() {
    this.ref.close();
  }

  confirmarDialog() {
    this.ref.close(this.listaHemoglobina)
  }
}
