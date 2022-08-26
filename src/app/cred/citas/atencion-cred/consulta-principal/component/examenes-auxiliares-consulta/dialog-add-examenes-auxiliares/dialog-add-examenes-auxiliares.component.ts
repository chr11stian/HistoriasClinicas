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
    this.recoverDataAuxialsExams();

    this.dataDialog = this.config.data.auxExams;
    console.log('data del dDIALOGGGGG ', this.dataDialog);
    if (this.dataDialog != null) {
      this.modelarData(this.dataDialog)
      this.reworkDialog(this.listaExamenes, this.reqLabo);
    }
  }


  ngOnInit(): void {
    this.inicializarForm();
  }
  async recoverDataAuxialsExams() {
    await this.auxExamService
      .getPromiseListarResultadosLaboratorioByIdConsulta(this.idConsulta)
      .then((data) => {
        // console.log('data de examenes auxiliares de consulta ', data);
        this.listaDataLaboRes = data;
        if (data.length > 0) {
          this.toEdit = true;
        }
      });
    // console.log('to show ', this.toShow)
    this.inicializarForm();
    // this.listarExamenesDisponibles();
  }

  inicializarForm() {
    this.formHematologia = new FormGroup({
      hemoglobina: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      hemoglobinaFactorCorrec: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      hematocrito: new FormControl({ value: "", disabled: this.toShow }),
      grupoSanguineo: new FormControl({ value: "", disabled: this.toShow }),
      factorRH: new FormControl({ value: "", disabled: this.toShow }),
      tiempoSangria: new FormControl({ value: "", disabled: this.toShow }),
      tiempoCoagulacion: new FormControl({ value: "", disabled: this.toShow }),
      tiempoProtrombina: new FormControl({ value: "", disabled: this.toShow }),
      tiempoTromboplastina: new FormControl({
        value: "",
        disabled: this.toShow,
      }),
      reticulocitos: new FormControl({ value: "", disabled: this.toShow }),
      compatibilidadSanguinea: new FormControl({
        value: "",
        disabled: this.toShow,
      }),
      rctoGlobulosRojos: new FormControl({ value: "", disabled: this.toShow }),
      rctoPlaquetas: new FormControl({ value: "", disabled: this.toShow }),
      rctoGlobulosBlancos: new FormControl({
        value: "",
        disabled: this.toShow,
      }),
      blastos: new FormControl({ value: "", disabled: this.toShow }),
      juveniles: new FormControl({ value: "", disabled: this.toShow }),
      neutrofilos: new FormControl({ value: "", disabled: this.toShow }),
      nAbastonados: new FormControl({ value: "", disabled: this.toShow }),
      nSegmentados: new FormControl({ value: "", disabled: this.toShow }),
      linfocitos: new FormControl({ value: "", disabled: this.toShow }),
      monocitos: new FormControl({ value: "", disabled: this.toShow }),
      eosinofilos: new FormControl({ value: "", disabled: this.toShow }),
      basofilos: new FormControl({ value: "", disabled: this.toShow }),
      vcm: new FormControl({ value: "", disabled: this.toShow }),
      vrVcm: new FormControl({ value: "", disabled: this.toShow }),
      chcm: new FormControl({ value: "", disabled: this.toShow }),
      vrChcm: new FormControl({ value: "", disabled: this.toShow }),
      hcm: new FormControl({ value: "", disabled: this.toShow }),
      vrHcm: new FormControl({ value: "", disabled: this.toShow }),
      vsg1hora: new FormControl({ value: "", disabled: this.toShow }),
      vsg2hora: new FormControl({ value: "", disabled: this.toShow }),
    });
    this.formParasitario = new FormGroup({
      /**EXAMEN MACROSCOPICO */
      color: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      consistencia: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      pH: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      reaccion: new FormControl({ value: "", disabled: this.toShow }),
      mucus: new FormControl({ value: "", disabled: this.toShow }),
      sangre: new FormControl({ value: "", disabled: this.toShow }),
      restosAlimenticios: new FormControl({ value: "", disabled: this.toShow }),
      /**EXAMEN MICROSCOPICO */
      reaccionInflamatorio: new FormControl({
        value: "",
        disabled: this.toShow,
      }),
      filamentosMucoides: new FormControl({ value: "", disabled: this.toShow }),
      leucocitos: new FormControl({ value: "", disabled: this.toShow }),
      hematies: new FormControl({ value: "", disabled: this.toShow }),
      cuerposGrasos: new FormControl({ value: "", disabled: this.toShow }),
      levaduras: new FormControl({ value: "", disabled: this.toShow }),
      bacterias: new FormControl({ value: "", disabled: this.toShow }),
      cocosBacilos: new FormControl({ value: "", disabled: this.toShow }),
      formasParasitarias: new FormControl({ value: "", disabled: this.toShow }),
      huevosDeValor1: new FormControl({ value: "", disabled: this.toShow }),
      huevosDeValor2: new FormControl({ value: "", disabled: this.toShow }),
      quistesDeValor1: new FormControl({ value: "", disabled: this.toShow }),
      quistesDeValor2: new FormControl({ value: "", disabled: this.toShow }),
      trofozoitosDeValor1: new FormControl({
        value: "",
        disabled: this.toShow,
      }),
      trofozoitosDeValor2: new FormControl({
        value: "",
        disabled: this.toShow,
      }),
      larvasDeValor1: new FormControl({ value: "", disabled: this.toShow }),
      larvasDeValor2: new FormControl({ value: "", disabled: this.toShow }),
      /**CAMPOS EXTRA*/
      sangreOcultaHeces: new FormControl({ value: "", disabled: this.toShow }),
      gotaGruesa: new FormControl({ value: "", disabled: this.toShow }),
      frotisLesion: new FormControl({ value: "", disabled: this.toShow }),
    });
  }

  /**NUEVA VISTA DE LOS EXAMENES */
  // listarExamenesDisponibles() {
  //   this.auxExamService.getExamListLaboratory().then(res => {
  //     console.log('data de examenes disponibles ', res);
  //   })
  // }
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
        if (this.dataDialog == null) {
          this.createLabRequest();
        } else {
          this.addAuxExam();
        }
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
