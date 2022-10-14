import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExamenesAuxiliaresService } from "../../../services/examenes-auxiliares.service";
import {
  AddLaboratorio,
  ExamenAuxiliar,
  Hematologia,
  Laboratorio,
  Parasitologia,
  ResultadoLaboratorio,
} from "../../../models/examenesAuxiliares";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import Swal from "sweetalert2";

@Component({
  selector: "app-dialog-add-examenes-auxiliares",
  templateUrl: "./dialog-add-examenes-auxiliares.component.html",
  styleUrls: ["./dialog-add-examenes-auxiliares.component.css"],
})
export class DialogAddExamenesAuxiliaresComponent implements OnInit {
  formHematologia: FormGroup;
  formParasitario: FormGroup;
  toShow: boolean = false;
  toEdit: boolean = false;
  isUpdate: boolean = false;
  dataHematologia: Hematologia;
  dataParasitologia: Parasitologia;
  idConsulta: string;
  listaDataLaboRes: any;
  listaExamenesAux: ExamenAuxiliar[] = [];
  auxDataExam: ExamenAuxiliar;
  listaExamenes: Examen[] = [
    {
      groupName: 'HEMOGLOBINA',
      listaExamName: [
        { subTipo: 'HEMOGLOBINA', examName: "DOSAJE DE HEMOGLOBINA", saved: false }
      ]
    },
    {
      groupName: 'PARASITOLOGIA',
      listaExamName: [
        { subTipo: 'PARASITOLOGIA', examName: "TEST DE GRAHAM", saved: false },
        { subTipo: 'PARASITOLOGIA', examName: 'PARASITO SERIADO', saved: false }
      ]
    },
  ];
  /**ngModels */
  observaciones: string;
  examLab: Examen;
  lugarLab: Lugar = {};
  /**Fin ngModels */
  dataDialog: any;
  reqLabo: ExamName[] = [

  ];
  auxExamList: ExamenAuxiliar[] = [];
  solicitudLaboratorio: Laboratorio;
  listaSolicitudes: ExamLab[] = [];
  constructor(
    private auxExamService: ExamenesAuxiliaresService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.idConsulta = JSON.parse(localStorage.getItem("documento")).idConsulta;
    // this.recoverDataAuxialsExams();

    this.dataDialog = this.config.data.auxExams;
    console.log('data del dDIALOGGGGG ', this.dataDialog.length);
    this.dataDialog.length == 0 ? this.toEdit = false : this.toEdit = true;
    console.log('to edit ', this.toEdit);
    if (this.dataDialog != null) {
      this.modelarData(this.dataDialog)
      this.reworkDialog(this.listaExamenes, this.reqLabo);
    }
  }


  ngOnInit(): void {

  }
  createLabRequest() {
    this.reqLabo.forEach(item => {
      let auxExam: ExamenAuxiliar = {
        tipoLaboratorio: 'EXAMEN_LABORATORIO',
        subTipo: item.subTipo,
        nombreExamen: item.examName,
        codPrestacion: '',
        codigoSIS: '',
        codigoHIS: '',
        lugarExamen: 'LABORATORIO',
        labExterno: ''
      }
      this.auxExamList.push(auxExam);
    });
    this.solicitudLaboratorio = {
      servicio: '',
      nroCama: '',
      examenesAuxiliares: this.auxExamList
    }

    this.auxExamService.postPromiseAddServiciosLaboratorio(this.idConsulta, this.solicitudLaboratorio).then(res => {
      this.closeDialog();
    });
  }
  saveLabRequest() {

    Swal.fire({
      title: '¿Esta seguro que desea guardar?',
      html: 'No se podra eliminar las solicitudes despues',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toEdit ? this.addAuxExam() : this.createLabRequest();
      }
      else {
        Swal.fire({
          title: 'Cancelado.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  closeDialog() {
    this.ref.close();
  }

  modelarData(data: any[]): void {
    data.forEach(item => {
      let auxExam: ExamName = {
        examName: item.nombreExamen,
        subTipo: item.subTipo,
        saved: true
      }
      this.reqLabo.push(auxExam);
    })
  }

  reworkDialog(examList: Examen[], requiredExam: ExamName[]): void {
    for (let i = 0; i < examList.length; i++) {
      // examList[i].listaExamName.forEach(exam => {
      for (let j = 0; j < requiredExam.length; j++) {
        examList[i].listaExamName.map(item => {
          if (item.examName == requiredExam[j].examName) return item.saved = true;
          else return item
        })
      }
    }
  }

  async addAuxExam() {
    this.reqLabo.forEach(async item => {
      if (!item.saved) {
        let addExam: AddLaboratorio = {
          servicio: '',
          nroCama: '',
          examenAuxiliar: {
            tipoLaboratorio: 'EXAMEN_LABORATORIO',
            subTipo: item.subTipo,
            nombreExamen: item.examName,
            codPrestacion: '',
            codigoSIS: '',
            codigoHIS: '',
            lugarExamen: 'LABORATORIO',
            labExterno: ''
          }
        }
        await this.auxExamService.putAgregarExamenesConsulta(this.idConsulta, addExam).then(res => {
          this.closeDialog();
        })
      }

    })
  }
}
interface Examen {
  groupName: string;
  listaExamName: ExamName[];
}
interface Lugar {
  index?: number;
  lugarLab?: string;
}
interface ExamName {
  subTipo: string,
  examName: string
  saved: boolean
}
interface ExamLab {
  subTipo: string,
  nombreExamen: string,
}
