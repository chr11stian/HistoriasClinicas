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
        { subTipo: 'HEMOGLOBINA', examName: "DOSAJE DE HEMOGLOBINA" }
      ]
    },
    {
      groupName: 'PARASITOLOGIA',
      listaExamName: [
        { subTipo: 'PARASITOLOGIA', examName: "TEST DE GRAHAM" },
        { subTipo: 'PARASITOLOGIA', examName: 'PARASITO SERIADO' }
      ]
    },
  ];
  listaLugares: Lugar[] = [
    { index: 1, lugarLab: "CONSULTORIO" },
    { index: 2, lugarLab: "LABORATORIO" },
  ];
  /**ngModels */
  observaciones: string;
  examLab: Examen;
  lugarLab: Lugar = {};
  /**Fin ngModels */
  dataDialog: any;
  reqLabo: examName[] = [];
  auxExamList: ExamenAuxiliar[] = [];
  solicitudLaboratorio: Laboratorio;
  constructor(
    private auxExamService: ExamenesAuxiliaresService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.idConsulta = JSON.parse(localStorage.getItem("documento")).idConsulta;
    this.recoverDataAuxialsExams();
    console.log("click en auxiliars exam");

    this.dataDialog = this.config.data.data;
    if (this.config.data.index == 2) {
      console.log('opcion de ver ');
      // this.toShow = true;
      this.inicializarForm();
    }
  }

  ngOnInit(): void { }
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
    this.listarExamenesDisponibles();
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
  listarExamenesDisponibles() {
    this.auxExamService.getExamListLaboratory().then(res => {
      console.log('data de examenes disponibles ', res);
    })
  }
  add() {
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
    this.auxExamService.postPromiseAddServiciosLaboratorio(this.idConsulta, this.solicitudLaboratorio).then(res=>{

    });
  }

}
interface Examen {
  groupName: string;
  listaExamName: examName[];
}
interface Lugar {
  index?: number;
  lugarLab?: string;
}
interface examName {
  subTipo: string,
  examName: string
}
interface ExamLab {
  subTipo: string,
  nombreExamen: string,
  codigoHIS?: string,
  codigoSIS?: string,
}
