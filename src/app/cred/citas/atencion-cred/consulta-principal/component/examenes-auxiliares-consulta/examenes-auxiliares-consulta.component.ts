import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamenAuxiliar, Hematologia, Laboratorio, Parasitologia, ResultadoLaboratorio } from '../../models/examenesAuxiliares';
import { ExamenesAuxiliaresService } from '../../services/examenes-auxiliares.service';

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
  dataHematologia: any;
  dataParasitologia: any;
  examFFF: string;
  /**ngModels */
  resultado: string;
  examLab: Examen = {};
  lugarLab: Lugar = {};
  idConsulta: string;

  constructor(
    private fb: FormBuilder,
    private auxExamService: ExamenesAuxiliaresService,
  ) {
    this.inicializarForm();
    this.idConsulta = JSON.parse(localStorage.getItem('documento')).idConsulta;
    this.auxExamService.getPromiseListarResultadosLaboratorioByIdConsulta(this.idConsulta).then(data => {
      console.log('data de examenes auxiliares de consulta ', data);
    })
  }

  ngOnInit(): void {

  }
  inicializarForm() {
    this.formHematologia = new FormGroup({
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
      /**EXAMEN MACROSCOPICO */
      color: new FormControl('', { validators: [Validators.required] }),
      consistencia: new FormControl('', { validators: [Validators.required] }),
      pH: new FormControl('', { validators: [Validators.required] }),
      reaccion: new FormControl(''),
      mucus: new FormControl(''),
      sangre: new FormControl(''),
      restosAlimenticios: new FormControl(''),
      /**EXAMEN MICROSCOPICO */
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
      /**CAMPOS EXTRA*/
      sangreOcultaHeces: new FormControl(''),
      gotaGruesa: new FormControl(''),
      frotisLesion: new FormControl(''),
    });
  }
  save() {

  }
  openAddExamDialog() {
    this.examLab = {};
    this.lugarLab = {};
    this.inicializarForm();
    this.addExamDialog = true;
  }

  agreeAddExamDialog() {
    let auxDataExam: any;
    if (this.formHematologia.valid) {
      this.recoverDataHematologia();
      auxDataExam = {
        tipoLaboratorio: 'EXAMEN_LABORATORIO',
        subTipo: 'HEMATOLOGIA',
        nombreExamen: 'HEMOGLOBINA',
        codigo: '',
        codPrestacion: '',
        cie10: '',
        codigoHIS: '',
        resultado: {
          hematologia: this.dataHematologia
        },
        labExterno: 'false'
      }
    }
    if (this.formParasitario.valid) {
      this.recoverDataParasitologia();
      auxDataExam = {
        tipoLaboratorio: 'EXAMEN_LABORATORIO',
        subTipo: 'PARASITOLOGIA',
        nombreExamen: this.examLab.nombreExam,
        codigo: '',
        codPrestacion: '',
        cie10: '',
        codigoHIS: '',
        resultado: {
          parasitologia: this.dataParasitologia
        },
        labExterno: 'false'
      }
    }
    if (auxDataExam != undefined) {
      this.listaExamenesAux.push(auxDataExam);
    }
    console.log('lista de examenes ', this.listaExamenesAux);
    this.listaExamenesAux = [...this.listaExamenesAux];
    this.addExamDialog = false;
  }

  deleteExamItem(index) {
    this.listaExamenesAux.splice(index, 1);
    this.listaExamenesAux = [...this.listaExamenesAux];
  }

  closeExamDialog() {
    this.addExamDialog = false;
  }

  recoverDataHematologia() {
    this.dataHematologia = {
      hemoglobina: this.formHematologia.value.hemoglobina,
      hematocrito: this.formHematologia.get('hematocrito').value,
      grupoSanguineo: this.formHematologia.value.grupoSanguineo,
      factorRH: this.formHematologia.value.factorRH,
      tiempoSangria: this.formHematologia.value.tiempoSangria,
      tiempoCoagulacion: this.formHematologia.value.tiempoCoagulacion,
      tiempoProtrombina: this.formHematologia.value.tiempoProtrombina,
      tiempoTromboplastina: this.formHematologia.value.tiempoTromboplastina,
      reticulocitos: this.formHematologia.value.reticulocitos,
      compatibilidadSanguinea: this.formHematologia.value.compatibilidadSanguinea,
      rctoGlobulosRojos: this.formHematologia.value.rctoGlobulosRojos,
      rctoPlaquetas: this.formHematologia.value.rctoPlaquetas,
      rctoGlobulosBlancos: this.formHematologia.value.rctoGlobulosBlancos,
      blastos: this.formHematologia.value.blastos,
      juveniles: this.formHematologia.value.juveniles,
      neutrofilos: this.formHematologia.value.neutrofilos,
      nAbastonados: this.formHematologia.value.nAbastonados,
      nSegmentados: this.formHematologia.value.nSegmentados,
      linfocitos: this.formHematologia.value.linfocitos,
      monocitos: this.formHematologia.value.monocitos,
      eosinofilos: this.formHematologia.value.eosinofilos,
      basofilos: this.formHematologia.value.basofilos,
      vcm: this.formHematologia.value.vcm,
      vrVcm: this.formHematologia.value.vrVcm,
      chcm: this.formHematologia.value.chcm,
      vrChcm: this.formHematologia.value.vrChcm,
      hcm: this.formHematologia.value.hcm,
      vrHcm: this.formHematologia.value.vrHcm,
      vsg1hora: this.formHematologia.value.vsg1hora,
      vsg2hora: this.formHematologia.value.vsg2hora,
    }
  }
  recoverDataParasitologia() {
    this.dataParasitologia = {
      examenMacroscopico: {
        color: this.formParasitario.value.color,
        consistencia: this.formParasitario.value.consistencia,
        pH: this.formParasitario.value.pH,
        reaccion: this.formParasitario.value.reaccion,
        mucus: this.formParasitario.value.mucus,
        sangre: this.formParasitario.value.sangre,
        restosAlimenticios: this.formParasitario.value.restosAlimenticios,
      },
      examenMicroscopico: {
        reaccionInflamatorio: this.formParasitario.value.reaccionInflamatorio,
        filamentosMucoides: this.formParasitario.value.filamentosMucoides,
        leucocitos: this.formParasitario.value.leucocitos,
        hematies: this.formParasitario.value.hematies,
        cuerposGrasos: this.formParasitario.value.cuerposGrasos,
        levaduras: this.formParasitario.value.levaduras,
        bacterias: this.formParasitario.value.bacterias,
        cocosBacilos: this.formParasitario.value.cocosBacilos,
        formasParasitarias: this.formParasitario.value.formasParasitarias,
        huevosDe: [this.formParasitario.value.huevosDeValor1, this.formParasitario.value.huevosDeValor2],
        quistesDe: [this.formParasitario.value.quistesDeValor1, this.formParasitario.value.quistesDeValor2],
        trofozoitosDe: [this.formParasitario.value.trofozoitosDeValor1, this.formParasitario.value.trofozoitosDeValor2],
        larvasDe: [this.formParasitario.value.larvasDeValor1, this.formParasitario.value.larvasDeValor2],
      },
      sangreOcultaHeces: this.formParasitario.value.sangreOcultaHeces,
      gotaGruesa: this.formParasitario.value.gotaGruesa,
      frotisLesion: this.formParasitario.value.frotisLesion,
    }

  }
  saveAuxiliarsExams() {
    this.dataExamenesAuxiliares = {
      servicio: 'SERVICIO',
      nroCama: '',
      dxPresuntivo: '',
      examenesAuxiliares: this.listaExamenesAux,
      observaciones: ''
    }
    console.log('data to send ', this.dataExamenesAuxiliares);
    this.auxExamService.postExamenesAuxiliares(this.idConsulta, this.dataExamenesAuxiliares).subscribe((res: any) => {
      console.log('se guardo la wea ', res)
    })
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