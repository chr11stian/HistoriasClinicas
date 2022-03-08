import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamenAuxiliar, Hematologia, Laboratorio, Parasitologia, ResultadoLaboratorio } from '../../models/examenesAuxiliares';

@Component({
  selector: 'app-examenes-auxiliares-consulta',
  templateUrl: './examenes-auxiliares-consulta.component.html',
  styleUrls: ['./examenes-auxiliares-consulta.component.css']
})
export class ExamenesAuxiliaresConsultaComponent implements OnInit {
  listaExamenesAux: any[] = [];
  addExamDialog: boolean = false;
  formHematologia: FormGroup;
  formParasitario: FormGroup;
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
    // examenMacroscopico: {},
    // examenMicroscopico: {
    //   huevosDe: {},
    //   quistesDe: {},
    //   trofozoitosDe: {},
    //   larvasDe: {}
    // },
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
  }

  ngOnInit(): void {

  }
  inicializarForm() {
    this.formHematologia = this.fb.group({
      hemoglobina: new FormControl('', { validators: [Validators.required] }),
      hematocrito: new FormControl(''),
      grupoSanguineo: new FormControl(''),
      factorRH: new FormControl(''),
      tiempoSangria: new FormControl(''),
      tiempoCoagulacion: new FormControl(''),
      tiempoProtrombina: new FormControl(''),
      tiempoTromboplastina: new FormControl(''),
      reticulocitos: new FormControl(''),
      compatibilidadSanguinea: new FormControl(''),
      rctoGlobulosRojos: new FormControl(''),
      rctoPlaquetas: new FormControl(''),
      rctoGlobulosBlancos: new FormControl(''),
      blastos: new FormControl(''),
      juveniles: new FormControl(''),
      neutrofilos: new FormControl(''),
      nAbastonados: new FormControl(''),
      nSegmentados: new FormControl(''),
      linfocitos: new FormControl(''),
      monocitos: new FormControl(''),
      eosinofilos: new FormControl(''),
      basofilos: new FormControl(''),
      vcm: new FormControl(''),
      vrVcm: new FormControl(''),
      chcm: new FormControl(''),
      vrChcm: new FormControl(''),
      hcm: new FormControl(''),
      vrHcm: new FormControl(''),
      vsg1hora: new FormControl(''),
      vsg2hora: new FormControl(''),
    });
    this.formParasitario = this.fb.group({
      color: new FormControl('', { validators: [Validators.required] }),
      consistencia: new FormControl('', { validators: [Validators.required] }),
      pH: new FormControl('', { validators: [Validators.required] }),
      reaccion: new FormControl(''),
      mucus: new FormControl(''),
      sangre: new FormControl(''),
      restosAlimenticios: new FormControl(''),
      reaccionInflamatorio: new FormControl(''),
      filamentosMucoides: new FormControl(''),
      leucocitos: new FormControl(''),
      hematies: new FormControl(''),
      cuerposGrasos: new FormControl(''),
      levaduras: new FormControl(''),
      bacterias: new FormControl(''),
      cocosBacilos: new FormControl(''),
      formasParasitarias: new FormControl(''),
      huevosDeValor1: new FormControl(''),
      huevosDeValor2: new FormControl(''),
      quistesDeValor1: new FormControl(''),
      quistesDeValor2: new FormControl(''),
      trofozoitosDeValor1: new FormControl(''),
      trofozoitosDeValor2: new FormControl(''),
      larvasDeValor1: new FormControl(''),
      larvasDeValor2: new FormControl(''),
    });
  }
  save() {

  }
  openAddExamDialog() {
    this.examLab = {};
    this.lugarLab = {};
    this.formHematologia.reset();
    this.addExamDialog = true;
    this.laboResults = {
      // examenMacroscopico: {},
      // examenMicroscopico: {
      //   huevosDe: {},
      //   quistesDe: {},
      //   trofozoitosDe: {},
      //   larvasDe: {}
      // },
    };
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
      nombreExamen: this.formHematologia.value.examen,
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