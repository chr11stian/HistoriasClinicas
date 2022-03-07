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
  listaExamenes: Examen[] = [
    { tipoExam: 1, nombreExam: 'TEST DE GRAHAM' },
    { tipoExam: 2, nombreExam: 'DOSAJE DE HEMOGLOBINA' },
    { tipoExam: 1, nombreExam: 'PARASITO SERIADO' },
  ];
  listaLugares: Lugar[] = [
    { index: 1, lugarLab: 'CONSULTORIO' },
    { index: 2, lugarLab: 'LABORATORIO' }
  ]
  dataExamenesAuxiliares: Laboratorio;
  isLabo: boolean = false;
  laboResults: ResultadoLaboratorio = {
    examenMacroscopico: {},
    examenMicroscopico: {
      huevosDe: {},
      quistesDe: {},
      trofozoitosDe: {},
      larvasDe: {}
    },
  };
  examFFF: string;
  /**ngModels */
  resultado: string;
  examLab: Examen = {};
  lugarLab: Lugar = {};

  constructor(
    private fb: FormBuilder,
  ) {
    this.inicializarForm();
    console.log('lista de examenes ', this.listaExamenes);
    console.log('lista de lugares ', this.listaLugares);
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
    this.listaExamenes = [];
    this.listaLugares = [];
    this.formExamenAux.reset();
    this.addExamDialog = true;
    this.laboResults = {
      examenMacroscopico: {},
      examenMicroscopico: {
        huevosDe: {},
        quistesDe: {},
        trofozoitosDe: {},
        larvasDe: {}
      },
    };;
  }

  agreeAddExamDialog() {
    console.log('data de models ', this.examLab.nombreExam, 'lugar lab ', this.lugarLab);
    this.listaExamenesAux.push(this.laboResults);
    this.listaExamenesAux = [...this.listaExamenesAux];
    this.addExamDialog = false;
    let auxExamAux = {
      tipoLaboratorio: "EXAMEN_LABORATORIO",
      subTipo: '',
      nombreExamen: '',
      codigo: '',
      codPrestacion: '',
      cie10: '',
      codigoHIS: '',
      resultado: []
    }
    console.log('objeto de resultados ', this.laboResults, 'lista de examenes aux ', this.listaExamenesAux);
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
      examenesAuxiliares: this.listaExamenesAux,
      observaciones: '',
      // CIE10:
    }
  }
  saveAuxiliars() {
    console.log('data to send ', this.listaExamenesAux);
  }
}

interface Examen {
  tipoExam?: number,
  nombreExam?: string
}
interface Lugar {
  index?: number,
  lugarLab?: string
}