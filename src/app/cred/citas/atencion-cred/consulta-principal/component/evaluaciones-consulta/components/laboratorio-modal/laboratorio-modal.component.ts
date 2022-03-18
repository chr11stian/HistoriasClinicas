import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AddLaboratorio,
  ExamenAuxiliar,
  Hematologia,
  Laboratorio,
  Parasitologia
} from "../../../../models/examenesAuxiliares";
import {ExamenesAuxiliaresService} from "../../../../services/examenes-auxiliares.service";
import Swal from "sweetalert2";
interface Examen {
  tipoExam?: number,
  nombreExam?: string
}
interface Lugar {
  index?: number,
  lugarLab?: string
}

@Component({
  selector: 'app-laboratorio-modal',
  templateUrl: './laboratorio-modal.component.html',
  styleUrls: ['./laboratorio-modal.component.css']
})
export class LaboratorioModalComponent implements OnInit {
  listaExamenesAux: ExamenAuxiliar[] = [];
  addExamDialog: boolean = false;
  formHematologia: FormGroup;
  listaExamenes: Examen[] = [
    { tipoExam: 2, nombreExam: 'DOSAJE DE HEMOGLOBINA' },
  ];
  listaLugares: Lugar[] = [
    { index: 1, lugarLab: 'CONSULTORIO' },
  ]
  dataExamenesAuxiliares: Laboratorio;
  isLabo: boolean = false;
  dataHematologia: Hematologia;
  dataParasitologia: Parasitologia;
  examFFF: string;
  /**ngModels */
  observaciones: string;
  examLab: Examen = {};
  lugarLab: Lugar = {};
  /**fin ngModels */
  idConsulta: string;
  listaDataLaboRes: any;
  toShow: boolean = false;
  indexEdit: number;
  toEdit: boolean = false;
  private auxExamService: any;

  constructor(private fb: FormBuilder,
              private auxExamService1: ExamenesAuxiliaresService,) { }

  ngOnInit(): void {
  }
  closeExamDialog() {
    console.log('data only to show');
    this.toShow = false;
    this.addExamDialog = false;
  }
  // openAddExamDialog() {
  //
  //   this.examLab = {};
  //   this.lugarLab = {};
  //   this.inicializarForm();
  //   this.addExamDialog = true;
  // }
  inicializarForm() {
    this.formHematologia = new FormGroup({
      hemoglobina: new FormControl({ value: '', disabled: this.toShow }, { validators: [Validators.required] }),
      hemoglobinaFactorCorrec: new FormControl({ value: '', disabled: this.toShow }, { validators: [Validators.required] }),
      hematocrito: new FormControl({ value: '', disabled: this.toShow }),
      grupoSanguineo: new FormControl({ value: '', disabled: this.toShow }),
      factorRH: new FormControl({ value: '', disabled: this.toShow }),
      tiempoSangria: new FormControl({ value: '', disabled: this.toShow }),
      tiempoCoagulacion: new FormControl({ value: '', disabled: this.toShow }),
      tiempoProtrombina: new FormControl({ value: '', disabled: this.toShow }),
      tiempoTromboplastina: new FormControl({ value: '', disabled: this.toShow }),
      reticulocitos: new FormControl({ value: '', disabled: this.toShow }),
      compatibilidadSanguinea: new FormControl({ value: '', disabled: this.toShow }),
      rctoGlobulosRojos: new FormControl({ value: '', disabled: this.toShow }),
      rctoPlaquetas: new FormControl({ value: '', disabled: this.toShow }),
      rctoGlobulosBlancos: new FormControl({ value: '', disabled: this.toShow }),
      blastos: new FormControl({ value: '', disabled: this.toShow }),
      juveniles: new FormControl({ value: '', disabled: this.toShow }),
      neutrofilos: new FormControl({ value: '', disabled: this.toShow }),
      nAbastonados: new FormControl({ value: '', disabled: this.toShow }),
      nSegmentados: new FormControl({ value: '', disabled: this.toShow }),
      linfocitos: new FormControl({ value: '', disabled: this.toShow }),
      monocitos: new FormControl({ value: '', disabled: this.toShow }),
      eosinofilos: new FormControl({ value: '', disabled: this.toShow }),
      basofilos: new FormControl({ value: '', disabled: this.toShow }),
      vcm: new FormControl({ value: '', disabled: this.toShow }),
      vrVcm: new FormControl({ value: '', disabled: this.toShow }),
      chcm: new FormControl({ value: '', disabled: this.toShow }),
      vrChcm: new FormControl({ value: '', disabled: this.toShow }),
      hcm: new FormControl({ value: '', disabled: this.toShow }),
      vrHcm: new FormControl({ value: '', disabled: this.toShow }),
      vsg1hora: new FormControl({ value: '', disabled: this.toShow }),
      vsg2hora: new FormControl({ value: '', disabled: this.toShow }),
    });

  }

  agreeAddExamDialog() {
    // let auxDataExam: ExamenAuxiliar;
    // if (this.examLab.tipoExam == 2) {
    //   this.recoverDataHematologia();
    //   auxDataExam = {
    //     tipoLaboratorio: 'EXAMEN_LABORATORIO',
    //     subTipo: 'HEMATOLOGIA',
    //     nombreExamen: 'HEMOGLOBINA',
    //     codigo: '',
    //     codPrestacion: '',
    //     cie10: '',
    //     codigoHIS: '',
    //     lugarExamen: this.lugarLab.lugarLab,
    //     resultado: {
    //       hematologia: this.dataHematologia
    //     },
    //     labExterno: 'false'
    //   }
    // }
    // if (this.examLab.tipoExam == 1) {
    //   this.recoverDataParasitologia();
    //   auxDataExam = {
    //     tipoLaboratorio: 'EXAMEN_LABORATORIO',
    //     subTipo: 'PARASITOLOGIA',
    //     nombreExamen: this.examLab.nombreExam,
    //     codigo: '',
    //     codPrestacion: '',
    //     cie10: '',
    //     codigoHIS: '',
    //     lugarExamen: this.lugarLab.lugarLab,
    //     resultado: {
    //       parasitologia: this.dataParasitologia
    //     },
    //     labExterno: 'false'
    //   }
    // }
    // if (auxDataExam != undefined) {
    //   this.listaExamenesAux.push(auxDataExam);
    // }
    // // console.log('lista de examenes ', this.listaExamenesAux);
    // this.listaExamenesAux = [...this.listaExamenesAux];
    // this.addExamDialog = false;
  }

  deleteExamItem(index) {
    this.listaExamenesAux.splice(index, 1);
    this.listaExamenesAux = [...this.listaExamenesAux];
  }


  saveAuxiliarsExams() {
    console.log('save data de examenes auxiliares ');
    if (this.listaExamenesAux.length == 0) {
      return
    }
    if (this.toEdit) {
      for (let i = 0; i < this.listaExamenesAux.length; i++) {
        let dataAddExamenesAuxiliares: AddLaboratorio = {
          servicio: 'SERVICIO',
          nroCama: '',
          dxPresuntivo: '',
          examenAuxiliar: this.listaExamenesAux[i],
          observaciones: ''
        }
        this.auxExamService.putAddExamenesAuxiliares(this.idConsulta, dataAddExamenesAuxiliares).subscribe((res: any) => {
          if (res.cod == "5122") {
            Swal.fire({
              icon: 'warning',
              title: 'No se añadio el Examen ya que fue agregado previamente',
              showConfirmButton: false,
              timer: 2000
            });
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Se añadio correctamente el examen',
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    } else {
      this.dataExamenesAuxiliares = {
        servicio: 'SERVICIO',
        nroCama: '',
        dxPresuntivo: '',
        examenesAuxiliares: this.listaExamenesAux,
        observaciones: ''
      }
      console.log('data to dave de verdad ', this.dataExamenesAuxiliares)
      this.auxExamService.postExamenesAuxiliares(this.idConsulta, this.dataExamenesAuxiliares).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Se guardo correctamente el examen',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }
  openShowDataAuxiliarsExams(data, index) {
    console.log('data to show ', data);
    this.toShow = true;
    this.inicializarForm();
    this.addExamDialog = true;
    if (data.datosLaboratorio.subTipo == 'HEMATOLOGIA') {
      this.examLab.tipoExam = 2;
      this.lugarLab.index = 2;
      this.setdataHematologia(data);
    }
    if (data.datosLaboratorio.subTipo == 'PARASITOLOGIA') {
      this.examLab.tipoExam = 1;
      this.lugarLab.index = 2;
      // this.setDataParasitologia(data);
    }
  }

  openEditAuxiliarExam(data, index) {
    // this.isUpdate = true;
    // this.indexEdit = index;
    // this.addExamDialog = true;
    // if (data.subTipo == 'HEMATOLOGIA') {
    //   this.examLab.tipoExam = 2;
    //   this.lugarLab.index = 2;
    //   this.setdataHematologia(data.resultado.hematologia);
    // }
    // if (data.subTipo == 'PARASITOLOGIA') {
    //   this.examLab.tipoExam = 1;
    //   this.lugarLab.index = 2;
    //   // this.setDataParasitologia(data.resultado.parasitologia);
    // }
  }
  agreeExamEdit() {
    // if (this.examLab.tipoExam == 2) {
    //   this.recoverDataHematologia();
    //   this.listaExamenesAux[this.indexEdit].resultado.hematologia = this.dataHematologia;
    // }
    // if (this.examLab.tipoExam == 1) {
    //   this.recoverDataParasitologia();
    //   this.listaExamenesAux[this.indexEdit].resultado.parasitologia = this.dataParasitologia;
    // }
    // this.addExamDialog = false;
  }
  setdataHematologia(data) {
    this.formHematologia.patchValue({ hemoglobina: data.hemoglobina });
    this.formHematologia.patchValue({ hematocrito: data.hematocrito });
    this.formHematologia.patchValue({ grupoSanguineo: data.grupoSanguineo });
    this.formHematologia.patchValue({ factorRH: data.factorRH });
    this.formHematologia.patchValue({ tiempoSangria: data.tiempoSangria });
    this.formHematologia.patchValue({ tiempoCoagulacion: data.tiempoCoagulacion });
    this.formHematologia.patchValue({ tiempoProtrombina: data.tiempoProtrombina });
    this.formHematologia.patchValue({ tiempoTromboplastina: data.tiempoTromboplastina });
    this.formHematologia.patchValue({ reticulocitos: data.reticulocitos });
    this.formHematologia.patchValue({ compatibilidadSanguinea: data.compatibilidadSanguinea });
    this.formHematologia.patchValue({ rctoGlobulosRojos: data.rctoGlobulosRojos });
    this.formHematologia.patchValue({ rctoPlaquetas: data.rctoPlaquetas });
    this.formHematologia.patchValue({ rctoGlobulosBlancos: data.rctoGlobulosBlancos });
    this.formHematologia.patchValue({ blastos: data.blastos });
    this.formHematologia.patchValue({ juveniles: data.juveniles });
    this.formHematologia.patchValue({ neutrofilos: data.neutrofilos });
    this.formHematologia.patchValue({ nAbastonados: data.nabastonados });
    this.formHematologia.patchValue({ nSegmentados: data.nsegmentados });
    this.formHematologia.patchValue({ linfocitos: data.linfocitos });
    this.formHematologia.patchValue({ monocitos: data.monocitos });
    this.formHematologia.patchValue({ eosinofilos: data.eosinofilos });
    this.formHematologia.patchValue({ basofilos: data.basofilos });
    this.formHematologia.patchValue({ vsg1hora: data.vsg1hora });
    this.formHematologia.patchValue({ vsg2hora: data.vsg2hora });
    this.formHematologia.patchValue({ vcm: data.vcm });
    this.formHematologia.patchValue({ vrVcm: data.vrVcm });
    this.formHematologia.patchValue({ chcm: data.chcm });
    this.formHematologia.patchValue({ vrChcm: data.vrChcm });
    this.formHematologia.patchValue({ hcm: data.hcm });
    this.formHematologia.patchValue({ vrHcm: data.vrHcm });
  }


}
