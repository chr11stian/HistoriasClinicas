import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-examenes-fetales',
  templateUrl: './dialog-examenes-fetales.component.html',
  styleUrls: ['./dialog-examenes-fetales.component.css']
})
export class DialogExamenesFetalesComponent implements OnInit {

  form: FormGroup;
  listaSituacion = [
    { name: "Lontitudinal", code: "1" },
    { name: "Transversal", code: "2" },
    { name: "No Aplica", code: "3" },
  ];
  listaPresentacion = [
    { name: "Cefalica", code: "1" },
    { name: "Pelvica", code: "2" },
    { name: "No Aplica", code: "3" },
  ];
  listaPosicion = [
    { name: "Derecha", code: "1" },
    { name: "Izquierda", code: "2" },
    { name: "No Aplica", code: "3" },
  ];

  examenesFetales: any;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.fb.group({
      movimientoFetal: new FormControl(""),
      selectSituacion: new FormControl(""),
      selectPresentacion: new FormControl(""),
      selectPosicion: new FormControl(""),
      latidosCardiacos: new FormControl(""),
    });
  }

  recuperarDatos() {
    this.examenesFetales = {
      movimientosFetales: this.form.value.movimientoFetal,
      situacion: this.form.value.selectSituacion,
      presentacion: this.form.value.selectPresentacion,
      posicion: this.form.value.selectPosicion,
      fcf: this.form.value.latidosCardiacos
    }
  }

  btnGuardar() {
    this.recuperarDatos();
    this.ref.close(this.examenesFetales);
  }

  btnCancelar() {
    this.ref.close();
  }
}
