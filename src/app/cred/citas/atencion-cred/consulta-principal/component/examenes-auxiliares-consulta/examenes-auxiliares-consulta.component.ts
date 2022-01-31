import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-examenes-auxiliares-consulta',
  templateUrl: './examenes-auxiliares-consulta.component.html',
  styleUrls: ['./examenes-auxiliares-consulta.component.css']
})
export class ExamenesAuxiliaresConsultaComponent implements OnInit {
  listaExamenesAux: any[] = [];
  addExamDialog: boolean = false;
  formExamenAux: FormGroup;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {

  }
  inicializarForm() {
    this.formExamenAux = this.fb.group({
      examen: new FormControl(''),
      descripcion: new FormControl(''),
    });
  }
  save() {

  }
  openAddExamDialog() {
    this.formExamenAux.reset();
    this.addExamDialog = true;
  }

  agreeAddExamDialog() {
    let dataExam = {
      nombre: this.formExamenAux.value.examen,
      valor: this.formExamenAux.value.descripcion
    }
    this.listaExamenesAux.push(dataExam);
    this.listaExamenesAux = [...this.listaExamenesAux];
    this.addExamDialog = false;
  }

  deleteExamItem(index) {
    this.listaExamenesAux.splice(index, 1);
    this.listaExamenesAux = [...this.listaExamenesAux];
  }
}
