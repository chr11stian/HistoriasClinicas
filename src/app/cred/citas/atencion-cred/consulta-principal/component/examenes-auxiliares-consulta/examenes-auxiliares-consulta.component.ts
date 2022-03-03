import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamenAuxiliar, Laboratorio, ResultadoLaboratorio } from '../../models/examenesAuxiliares';

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
  listaExamenes: string[] = [
    'TEST DE GRAHAM',
    'DOSAJE DE HEMOGLOBINA',
    'PARASITO SERIADO',
  ];
  listaLugares: string[] = [
    'CONSULTORIO',
    'LABORATORIO'
  ]
  dataExamenesAuxiliares: Laboratorio;
  isLabo: boolean = false;
  laboResults: ResultadoLaboratorio = {};
  examFFF: string;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
    // this.laboResults = {
    //   hemoglobina: ''
    // }
  }

  ngOnInit(): void {

  }
  inicializarForm() {
    this.formExamenAux = this.fb.group({
      nombreExamen: new FormControl('', { validators: [Validators.required] }),
      lugarExam: new FormControl('', { validators: [Validators.required] }),
      resultados: new FormControl('', { validators: [Validators.required] }),
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
      nombreExam: this.formExamenAux.value.nombreExamen,
      lugarExam: this.formExamenAux.value.lugarExam,
      resultado: this.formExamenAux.value.resultados
    }
    this.listaExamenesAux.push(dataExam);
    this.listaExamenesAux = [...this.listaExamenesAux];
    this.addExamDialog = false;
    console.log('objeto de resultados ', this.laboResults);
  }

  deleteExamItem(index) {
    this.listaExamenesAux.splice(index, 1);
    this.listaExamenesAux = [...this.listaExamenesAux];
  }

  closeExamDialog() {
    this.addExamDialog = false;
  }
  clasificarInf() {
    let newData = {
      tipoLaboratorio: "EXAMEN_LABORATORIO",
      subTipo: 'falta',
      nombreExamen: this.formExamenAux.value.examen,
      codigo: '',
      codPrestacion: '',
      cie10: '',
      codigoHIS: '',
      labExterno: ''
    }
  }
  recoverData() {
    this.dataExamenesAuxiliares = {
      servicio: 'CRED',
      nroCama: '',
      dxPresuntivo: '',
      observaciones: ''
    }
  }
  saveAuxiliars() {
    console.log('data to send ', this.listaExamenesAux)
  }
}
