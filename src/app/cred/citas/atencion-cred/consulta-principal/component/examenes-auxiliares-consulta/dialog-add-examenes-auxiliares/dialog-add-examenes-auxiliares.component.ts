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
    { tipoExam: 1, nombreExam: "TEST DE GRAHAM" },
    { tipoExam: 2, nombreExam: "DOSAJE DE HEMOGLOBINA" },
    { tipoExam: 1, nombreExam: "PARASITO SERIADO" },
  ];
  listaLugares: Lugar[] = [
    { index: 1, lugarLab: "CONSULTORIO" },
    { index: 2, lugarLab: "LABORATORIO" },
  ];
  /**ngModels */
  observaciones: string;
  examLab: Examen = {};
  lugarLab: Lugar = {};
  /**Fin ngModels */
  dataDialog: any;
  constructor(
    private auxExamService: ExamenesAuxiliaresService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.idConsulta = JSON.parse(localStorage.getItem("documento")).idConsulta;
    this.recoverDataAuxialsExams();
    console.log("click en auxiliars exam");

    this.dataDialog = this.config.data.data;
    console.log("data del otro dialog ", this.dataDialog.hemoglobina);
    if (this.config.data.index == 2) {
      console.log('opcion de ver ');
      this.toShow = true;
      this.inicializarForm();
      if (this.dataDialog.datosLaboratorio.subTipo == "HEMATOLOGIA") {
        this.examLab.tipoExam = 2;
        this.lugarLab.index = 2;
        // this.setdataHematologia(this.dataDialog);
        this.formHematologia.patchValue({ hemoglobina: this.dataDialog.hemoglobina });
      }
      if (this.dataDialog.datosLaboratorio.subTipo == "PARASITOLOGIA") {
        this.examLab.tipoExam = 1;
        this.lugarLab.index = 2;
        this.setDataParasitologia(this.dataDialog);
      }
    }
  }

  ngOnInit(): void {}
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
  recoverDataHematologia() {
    this.dataHematologia = {
      hemoglobina: this.formHematologia.value.hemoglobina,

      hbConFactorCorrecion: 0,
    factorCorreccion:0,

      hematocrito: this.formHematologia.get("hematocrito").value,
      grupoSanguineo: this.formHematologia.value.grupoSanguineo,
      factorRH: this.formHematologia.value.factorRH,
      tiempoSangria: this.formHematologia.value.tiempoSangria,
      tiempoCoagulacion: this.formHematologia.value.tiempoCoagulacion,
      tiempoProtrombina: this.formHematologia.value.tiempoProtrombina,
      tiempoTromboplastina: this.formHematologia.value.tiempoTromboplastina,
      reticulocitos: this.formHematologia.value.reticulocitos,
      compatibilidadSanguinea:
        this.formHematologia.value.compatibilidadSanguinea,
      rctoGlobulosRojos: this.formHematologia.value.rctoGlobulosRojos,
      rctoPlaquetas: this.formHematologia.value.rctoPlaquetas,
      rctoGlobulosBlancos: this.formHematologia.value.rctoGlobulosBlancos,
      blastos: this.formHematologia.value.blastos,
      juveniles: this.formHematologia.value.juveniles,
      neutrofilos: this.formHematologia.value.neutrofilos,
      nabastonados: this.formHematologia.value.nAbastonados,
      nsegmentados: this.formHematologia.value.nSegmentados,
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
    };
  }
  recoverDataParasitologia() {
    this.dataParasitologia = {
      examenMacroscopico: {
        color: this.formParasitario.value.color,
        consistencia: this.formParasitario.value.consistencia,
        ph: this.formParasitario.value.pH,
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
        huevosDe: [
          this.formParasitario.value.huevosDeValor1,
          this.formParasitario.value.huevosDeValor2,
        ],
        quistesDe: [
          this.formParasitario.value.quistesDeValor1,
          this.formParasitario.value.quistesDeValor2,
        ],
        trofozoitosDe: [
          this.formParasitario.value.trofozoitosDeValor1,
          this.formParasitario.value.trofozoitosDeValor2,
        ],
        larvasDe: [
          this.formParasitario.value.larvasDeValor1,
          this.formParasitario.value.larvasDeValor2,
        ],
      },
      sangreOcultaHeces: this.formParasitario.value.sangreOcultaHeces,
      gotaGruesa: this.formParasitario.value.gotaGruesa,
      frotisLesion: this.formParasitario.value.frotisLesion,
    };
  }
  agreeAddExamDialog() {
    // let auxDataExam: ExamenAuxiliar;
    if (this.examLab.tipoExam == 2) {
      this.recoverDataHematologia();
      this.auxDataExam = {
        tipoLaboratorio: "EXAMEN_LABORATORIO",
        subTipo: "HEMATOLOGIA",
        nombreExamen: "HEMOGLOBINA",
        codigo: "",
        codPrestacion: "",
        cie10: "",
        codigoHIS: "",
        lugarExamen: this.lugarLab.lugarLab,
        resultado: {
          hematologia: this.dataHematologia,
        },
        labExterno: "false",
      };
    }
    if (this.examLab.tipoExam == 1) {
      this.recoverDataParasitologia();
      this.auxDataExam = {
        tipoLaboratorio: "EXAMEN_LABORATORIO",
        subTipo: "PARASITOLOGIA",
        nombreExamen: this.examLab.nombreExam,
        codigo: "",
        codPrestacion: "",
        cie10: "",
        codigoHIS: "",
        lugarExamen: this.lugarLab.lugarLab,
        resultado: {
          parasitologia: this.dataParasitologia,
        },
        labExterno: "false",
      };
    }
    console.log("data de examens auxiliares ", this.auxDataExam);
    this.ref.close(this.auxDataExam);
    // if (this.auxDataExam != undefined) {
    //   this.listaExamenesAux.push(this.auxDataExam);
    // }
    // // console.log('lista de examenes ', this.listaExamenesAux);
    // this.listaExamenesAux = [...this.listaExamenesAux];
  }
  setdataHematologia(data) {
    this.formHematologia.patchValue({ hemoglobina: data.hemoglobina });
    this.formHematologia.patchValue({ hematocrito: data.hematocrito });
    this.formHematologia.patchValue({ grupoSanguineo: data.grupoSanguineo });
    this.formHematologia.patchValue({ factorRH: data.factorRH });
    this.formHematologia.patchValue({ tiempoSangria: data.tiempoSangria });
    this.formHematologia.patchValue({
      tiempoCoagulacion: data.tiempoCoagulacion,
    });
    this.formHematologia.patchValue({
      tiempoProtrombina: data.tiempoProtrombina,
    });
    this.formHematologia.patchValue({
      tiempoTromboplastina: data.tiempoTromboplastina,
    });
    this.formHematologia.patchValue({ reticulocitos: data.reticulocitos });
    this.formHematologia.patchValue({
      compatibilidadSanguinea: data.compatibilidadSanguinea,
    });
    this.formHematologia.patchValue({
      rctoGlobulosRojos: data.rctoGlobulosRojos,
    });
    this.formHematologia.patchValue({ rctoPlaquetas: data.rctoPlaquetas });
    this.formHematologia.patchValue({
      rctoGlobulosBlancos: data.rctoGlobulosBlancos,
    });
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
  setDataParasitologia(data) {
    this.formParasitario.patchValue({ color: data.examenMacroscopico.color });
    this.formParasitario.patchValue({
      consistencia: data.examenMacroscopico.consistencia,
    });
    this.formParasitario.patchValue({ pH: data.examenMacroscopico.ph });
    this.formParasitario.patchValue({
      reaccion: data.examenMacroscopico.reaccion,
    });
    this.formParasitario.patchValue({ mucus: data.examenMacroscopico.mucus });
    this.formParasitario.patchValue({ sangre: data.examenMacroscopico.sangre });
    this.formParasitario.patchValue({
      restosAlimenticios: data.examenMacroscopico.restosAlimenticios,
    });
    this.formParasitario.patchValue({
      reaccionInflamatorio: data.examenMicroscopico.reaccionInflamatorio,
    });
    this.formParasitario.patchValue({
      filamentosMucoides: data.examenMicroscopico.filamentosMucoides,
    });
    this.formParasitario.patchValue({
      leucocitos: data.examenMicroscopico.leucocitos,
    });
    this.formParasitario.patchValue({
      hematies: data.examenMicroscopico.hematies,
    });
    this.formParasitario.patchValue({
      cuerposGrasos: data.examenMicroscopico.cuerposGrasos,
    });
    this.formParasitario.patchValue({
      levaduras: data.examenMicroscopico.levaduras,
    });
    this.formParasitario.patchValue({
      bacterias: data.examenMicroscopico.bacterias,
    });
    this.formParasitario.patchValue({
      cocosBacilos: data.examenMicroscopico.cocosBacilos,
    });
    this.formParasitario.patchValue({
      formasParasitarias: data.examenMicroscopico.formasParasitarias,
    });
    this.formParasitario.patchValue({
      huevosDeValor1: data.examenMicroscopico.huevosDe[0],
    });
    this.formParasitario.patchValue({
      huevosDeValor2: data.examenMicroscopico.huevosDe[1],
    });
    this.formParasitario.patchValue({
      quistesDeValor1: data.examenMicroscopico.quistesDe[0],
    });
    this.formParasitario.patchValue({
      quistesDeValor2: data.examenMicroscopico.quistesDe[1],
    });
    this.formParasitario.patchValue({
      trofozoitosDeValor1: data.examenMicroscopico.trofozoitosDe[0],
    });
    this.formParasitario.patchValue({
      trofozoitosDeValor2: data.examenMicroscopico.trofozoitosDe[1],
    });
    this.formParasitario.patchValue({
      larvasDeValor1: data.examenMicroscopico.larvasDe[0],
    });
    this.formParasitario.patchValue({
      larvasDeValor2: data.examenMicroscopico.larvasDe[1],
    });
    this.formParasitario.patchValue({
      sangreOcultaHeces: data.sangreOcultaHeces,
    });
    this.formParasitario.patchValue({ gotaGruesa: data.gotaGruesa });
    this.formParasitario.patchValue({ frotisLesion: data.frotisLesion });
  }
  closeExamDialog() {}
}
interface Examen {
  tipoExam?: number;
  nombreExam?: string;
}
interface Lugar {
  index?: number;
  lugarLab?: string;
}
