import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import Swal from "sweetalert2";
import { SuplementacionesMicronutrientesService } from "../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {
  AddLaboratorio,
  ExamenAuxiliar,
  Hematologia,
  Laboratorio,
  Parasitologia,
  ResultadoLaboratorio,
} from "../../models/examenesAuxiliares";
import { dato, outputTriajeInterface, proxCita } from "../../../../models/data";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { ExamenesAuxiliaresService } from "../../services/examenes-auxiliares.service";
import { DialogAddExamenesAuxiliaresComponent } from "./dialog-add-examenes-auxiliares/dialog-add-examenes-auxiliares.component";
import { DatePipe } from "@angular/common";
import { MenuItem, MessageService } from "primeng/api";

@Component({
  selector: "app-examenes-auxiliares-consulta",
  templateUrl: "./examenes-auxiliares-consulta.component.html",
  styleUrls: ["./examenes-auxiliares-consulta.component.css"],
  providers: [DialogService],
})
export class ExamenesAuxiliaresConsultaComponent implements OnInit {
  listaExamenesAux: ExamenAuxiliar[] = [];
  addExamDialog: boolean = false;
  formHematologia: FormGroup;
  formParasitario: FormGroup;
  isUpdate: boolean = false;
  listaExamenes: Examen[] = [
    { tipoExam: 1, nombreExam: "TEST DE GRAHAM" },
    { tipoExam: 2, nombreExam: "DOSAJE DE HEMOGLOBINA" },
    { tipoExam: 1, nombreExam: "ESTUDIO PARASITOLOGICO DE HECES POR 3" },
  ];
  listaLugares: Lugar[] = [
    { index: 1, lugarLab: "CONSULTORIO" },
    { index: 2, lugarLab: "LABORATORIO" },
  ];
  listValueResult: any[] = [
    { name: "Leve", value: "LEVE" },
    { name: "Moderado", value: "MODERADO" },
    { name: "Severo", value: "SEVERO" },
  ];
  listResults: any[] = [
    { name: "Positivo", value: "POSITIVO" },
    { name: "Negativo", value: "NEGATIVO" },
  ];
  listDestinoAsegurado: any[] = [
    { name: "Alta", value: "ALTA" },
    { name: "Cita", value: "CITA" },
    { name: "Hospitalización", value: "HOSPITALIZACION" },
    { name: "Emergencia", value: "EMERGENCIA" },
    { name: "Consulta Externa", value: "CONSULTA EXTERNA" },
    { name: "Apoyo al Diagnostico", value: "APOYO AL DIAGNOSTICO" },
    { name: "Contrarreferido", value: "CONTRARREFERENCIA" },
    { name: "Fallecido", value: "FALLECIDO" },
    { name: "Corte Administ", value: "CORTE ADMINSTRADO" },
  ];
  dataExamenesAuxiliares: Laboratorio;
  isLabo: boolean = false;
  dataHematologia: Hematologia;
  dataParasitologia: Parasitologia;
  examFFF: string;
  /**ngModels */
  observaciones: string;
  examLab: Examen = {};
  lugarLab: Lugar = {};

  resultKey: boolean = false;
  resultValue: string;
  result: string;
  /**fin ngModels */
  idConsulta: string;
  listaDataLaboRes: any;
  ref: DynamicDialogRef;
  toShow: boolean = false;
  indexEdit: number;
  toEdit: boolean = false;
  factorCorrection: number;
  //--Interconsulta
  data;
  attributeLocalS = "documento";
  tooltipItems: MenuItem[];
  interconsulta: proxCita[] = [];
  listInterconsulta: proxCita[] = [];
  dialogInterconsulta: boolean;
  formInterconsulta: FormGroup;
  isUpdates: boolean = false;
  datePipe = new DatePipe("en-US");
  fecha: Date;
  servicios: string[] = [];
  loadings: boolean = false;
  urgencia = [
    { name: "Nivel 1", code: "Nivel 1" },
    { name: "Nivel 2", code: "Nivel 2" },
    { name: "Nivel 3", code: "Nivel 3" },
    { name: "Nivel 4", code: "Nivel 4" },
    { name: "Nivel 5", code: "Nivel 5" },
  ];

  constructor(
    private rolGuardiaService: RolGuardiaService,
    private consultaGeneralService: ConsultaGeneralService,
    private fb: FormBuilder,
    private auxExamService: ExamenesAuxiliaresService,
    private dialog: DialogService,
    private ajusteHemoService: SuplementacionesMicronutrientesService
  ) {
    this.idConsulta = JSON.parse(localStorage.getItem("documento")).idConsulta;
    // this.recoverDataAuxialsExams();
    let ipressAux = JSON.parse(localStorage.getItem("usuario")).ipress;
    console.log("data de usuario ", ipressAux);
    // this.ajusteHemoService.getFactorCorrepcionXipress(ipressAux.idIpress).subscribe((res: any) => {
    //   this.factorCorrection = res.object.factorAjuste;
    // });
    this.listarPeticionesExamenes();
  }
  build() {
    /* Interconsulta */
    this.formInterconsulta = new FormGroup({
      fecha: new FormControl({ value: null, disabled: false }, []),
      motivo: new FormControl({ value: "", disabled: false }, []),
      servicio: new FormControl({ value: "", disabled: false }, []),
      urgencia: new FormControl({ value: "", disabled: false }, []),
    });
  }
  ngOnInit(): void {
    this.build();
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    /* interconsulta */
    this.ListaServicios();
    this.tooltipItems = [
      {
        tooltipOptions: {
          tooltipLabel: "Reporte",
          tooltipPosition: "left",
        },
        icon: "pi pi-desktop",
        command: (event: Event) => {
          this.open();
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: "Reporte",
          tooltipPosition: "left",
        },
        icon: "pi pi-desktop",
        command: (event: Event) => {
          this.open();
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: "Reporte",
          tooltipPosition: "left",
        },
        icon: "pi pi-desktop",
        command: (event: Event) => {
          this.open();
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: "Reporte",
          tooltipPosition: "left",
        },
        icon: "pi pi-desktop",
        command: (event: Event) => {
          this.open();
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: "Interconsulta",
          tooltipPosition: "left",
        },
        icon: "pi pi-external-link",
        command: (event: Event) => {
          this.open();
        },
      },
    ];
    /* lista interconsulta */
    this.listaInterconsulta();
  }
  inicializarForm() {
    this.formHematologia = new FormGroup({
      hemoglobina: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      hbConFactorCorrecion: new FormControl(
        { value: "", disabled: this.toShow },
        { validators: [Validators.required] }
      ),
      factorCorreccion: new FormControl({
        value: this.factorCorrection,
        disabled: this.toShow,
      }),
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
    this.formParasitario = this.fb.group({
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
  // async recoverDataAuxialsExams() {
  //   await this.auxExamService
  //     .getPromiseListarResultadosLaboratorioByIdConsulta(this.idConsulta)
  //     .then((data) => {
  //       // console.log('data de examenes auxiliares de consulta ', data);
  //       this.listaDataLaboRes = data;
  //       if (data.length > 0) {
  //         this.toEdit = true;
  //       }
  //     });
  //   // console.log('to show ', this.toShow)
  //   this.inicializarForm();
  // }
  openAddExamDialog() {
    // this.isUpdate = false;
    // this.examLab = {};
    // this.lugarLab = {};
    // this.inicializarForm();
    // this.addExamDialog = true;
    // this.resultKey = false;
    // this.resultValue = "";
    // this.result = "";
    let dataDialog = {
      index: 1,
    };
    this.ref = this.dialog.open(DialogAddExamenesAuxiliaresComponent, {
      header: "NUEVO EXAMEN AUXILIAR",
      width: "50%",
      data: dataDialog,
    });
  }

  agreeAddExamDialog() {
    let auxDataExam: ExamenAuxiliar;
    if (this.examLab.tipoExam == 2) {
      this.recoverDataHematologia();
      auxDataExam = {
        tipoLaboratorio: "EXAMEN_LABORATORIO",
        subTipo: "HEMATOLOGIA",
        nombreExamen: this.examLab.nombreExam,
        codigoSIS: "",
        codPrestacion: "",
        cie10: "",
        codigoHIS: "85018",
        lugarExamen: this.lugarLab.lugarLab,
        resultado: {
          hematologia: this.dataHematologia,
        },
        labExterno: "false",
      };
    }
    if (this.examLab.tipoExam == 1) {
      this.recoverDataParasitologia();
      auxDataExam = {
        tipoLaboratorio: "EXAMEN_LABORATORIO",
        subTipo: "PARASITOLOGIA",
        nombreExamen: this.examLab.nombreExam,
        codigoSIS: "",
        codPrestacion: "",
        cie10: "",
        codigoHIS:
          this.examLab.nombreExam == "TEST DE GRAHAM" ? "87178" : "87177.01",
        lugarExamen: this.lugarLab.lugarLab,
        resultado: {
          parasitologia: this.dataParasitologia,
        },
        labExterno: "false",
      };
    }
    if (auxDataExam != undefined) {
      this.listaExamenesAux.push(auxDataExam);
    }
    // console.log('lista de examenes ', this.listaExamenesAux);
    this.listaExamenesAux = [...this.listaExamenesAux];
    this.addExamDialog = false;

    console.log("lista de examenes ", this.listaExamenesAux);
  }

  deleteExamItem(index) {
    this.listaExamenesAux.splice(index, 1);
    this.listaExamenesAux = [...this.listaExamenesAux];
  }

  closeExamDialog() {
    console.log("data only to show");
    this.toShow = false;
    this.addExamDialog = false;
  }

  recoverDataHematologia() {
    this.dataHematologia = {
      hemoglobina: this.formHematologia.value.hemoglobina,

      hbConFactorCorrecion: this.formHematologia.value.hbConFactorCorrecion,
      factorCorreccion: this.factorCorrection,

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

      resultado: {
        clave: this.resultKey == true ? "ANEMIA" : "",
        valor: this.resultValue,
        resultado: this.result,
      },
      observacionesLaboratorio: this.observaciones,
      resultadoExamen: this.formHematologia.value.hbConFactorCorrecion,
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

      resultado: {
        resultado: this.result,
      },
      observacionesLaboratorio: this.observaciones,
    };
  }
  saveAuxiliarsExams() {
    console.log("save data de examenes auxiliares ");
    if (this.listaExamenesAux.length == 0) {
      return;
    }
    if (this.toEdit) {
      for (let i = 0; i < this.listaExamenesAux.length; i++) {
        let dataAddExamenesAuxiliares: AddLaboratorio = {
          servicio: "SERVICIO",
          nroCama: "",
          dxPresuntivo: "",
          examenAuxiliar: this.listaExamenesAux[i],
          observaciones: "",
        };
        this.auxExamService
          .putAddExamenesAuxiliares(this.idConsulta, dataAddExamenesAuxiliares)
          .subscribe((res: any) => {
            if (res.cod == "5122") {
              Swal.fire({
                icon: "warning",
                title: "No se añadio el Examen ya que fue agregado previamente",
                showConfirmButton: false,
                timer: 2000,
              });
              return;
            }
            Swal.fire({
              icon: "success",
              title: "Se añadio correctamente el examen",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    } else {
      this.dataExamenesAuxiliares = {
        servicio: "SERVICIO",
        nroCama: "",
        dxPresuntivo: "",
        examenesAuxiliares: this.listaExamenesAux,
        observaciones: "",
      };
      console.log("data to dave de verdad ", this.dataExamenesAuxiliares);
      this.auxExamService
        .postExamenesAuxiliares(this.idConsulta, this.dataExamenesAuxiliares)
        .subscribe((res: any) => {
          Swal.fire({
            icon: "success",
            title: "Se guardo correctamente el examen",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }
  openShowDataAuxiliarsExams(data, index) {
    console.log("data to show ", data);
    this.toShow = true;
    this.inicializarForm();
    this.addExamDialog = true;
    if (data.datosLaboratorio.subTipo == "HEMATOLOGIA") {
      this.examLab.tipoExam = 2;
      this.lugarLab.index = 2;
      this.setdataHematologia(data);
    }
    if (data.datosLaboratorio.subTipo == "PARASITOLOGIA") {
      this.examLab.tipoExam = 1;
      this.lugarLab.index = 2;
      this.setDataParasitologia(data);
    }
  }

  openEditAuxiliarExam(data, index) {
    this.isUpdate = true;
    this.indexEdit = index;
    this.addExamDialog = true;
    if (data.subTipo == "HEMATOLOGIA") {
      this.examLab.tipoExam = 2;
      this.lugarLab.index = 2;
      this.setdataHematologia(data.resultado.hematologia);
    }
    if (data.subTipo == "PARASITOLOGIA") {
      this.examLab.tipoExam = 1;
      this.lugarLab.index = 2;
      this.setDataParasitologia(data.resultado.parasitologia);
    }
  }
  // agreeExamEdit() {
  //   if (this.examLab.tipoExam == 2) {
  //     this.recoverDataHematologia();
  //     this.listaExamenesAux[this.indexEdit].resultado.hematologia =
  //       this.dataHematologia;
  //   }
  //   if (this.examLab.tipoExam == 1) {
  //     this.recoverDataParasitologia();
  //     this.listaExamenesAux[this.indexEdit].resultado.parasitologia =
  //       this.dataParasitologia;
  //   }
  //   this.addExamDialog = false;
  // }
  setdataHematologia(data) {
    this.resultKey = data.resultado.clave == "ANEMIA" ? true : false;
    this.resultValue = data.resultado.valor;
    this.result = data.resultado.resultado;
    this.formHematologia.patchValue({ hemoglobina: data.hemoglobina });
    // this.formHematologia.patchValue({ factorCorreccion:  });
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
    this.result = data.resultado.resultado;
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
  // openDialogAddAuxiliarExam() {
  //   let dataDialog = {
  //     index: 1,
  //   };
  //   this.ref = this.dialog.open(DialogAddExamenesAuxiliaresComponent, {
  //     header: "NUEVO EXAMEN AUXILIAR",
  //     width: "65%",
  //     data: dataDialog,
  //   });
  //   this.ref.onClose.subscribe((data: any) => {
  //     console.log("data recibido desde el dialog ", data);
  //     if (data != undefined) {
  //       this.listaExamenesAux.push(data);
  //     }
  //     this.listaExamenesAux = [...this.listaExamenesAux];
  //   });
  // }
  openDialogShowAuxialExam(data) {
    let dataDialog = {
      index: 2,
      data: data,
    };
    this.ref = this.dialog.open(DialogAddExamenesAuxiliaresComponent, {
      header: "NUEVO EXAMEN AUXILIAR",
      width: "65%",
      data: dataDialog,
    });
  }
  calcularHemoFactor(value) {
    let aux = this.formHematologia.value.hemoglobina;
    console.log("hemo ", aux);
    this.formHematologia.patchValue({
      hbConFactorCorrecion:
        this.formHematologia.value.hemoglobina - this.factorCorrection,
    });
  }
  listarPeticionesExamenes() {
    this.auxExamService.getListarPeticiones(this.idConsulta).then((res) => {
      this.listaExamenesAux = res.object.examenesAuxiliares;
    });
  }
  /* interconsulta */
  open(): void {
    this.isUpdates = false;
    this.formInterconsulta.reset();
    this.formInterconsulta.get("fecha").setValue("");
    this.formInterconsulta.get("motivo").setValue("");
    this.formInterconsulta.get("servicio").setValue("");
    this.formInterconsulta.get("urgencia").setValue("");
    this.dialogInterconsulta = true;
  }
  ListaServicios() {
    let idIpress = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
    this.rolGuardiaService
      .getServiciosPorIpress(idIpress)
      .subscribe((res: any) => {
        this.servicios = res.object;
        console.log("LISTA DE SERVICIOS DE IPRESSS", this.servicios);
      });
  }

  eliminarInterconsulta(id, index) {
    this.listInterconsulta.splice(index, 1);
    console.log();
    this.consultaGeneralService
      .deleteInterconsulta(this.data.idConsulta, id)
      .subscribe((r: any) => {
        console.log(r.object);
      });
  }
  listaInterconsulta() {
    this.consultaGeneralService
      .listInterconsulta(this.data.idConsulta)
      .subscribe((r: any) => {
        this.listInterconsulta = r.object;
      });
  }
  agregarInterconsulta() {
    this.loadings = true;
    setTimeout(() => (this.loadings = false), 1000);
    /* agregar */
    if (
      this.formInterconsulta.value.fecha != null &&
      this.formInterconsulta.value.motivo != "" &&
      this.formInterconsulta.value.servicio != ""
    ) {
      let interconsulta: proxCita = {
        fecha: this.datePipe.transform(
          this.formInterconsulta.value.fecha,
          "yyyy-MM-dd"
        ),
        motivo: this.formInterconsulta.value.motivo.toUpperCase(),
        servicio: this.formInterconsulta.value.servicio,
        nivelUrgencia: this.formInterconsulta.value.urgencia,
      };
      this.consultaGeneralService
        .addInterconsulta(this.data.idConsulta, interconsulta)
        .subscribe((r: any) => {
          this.listInterconsulta = r.object;
        });
      Swal.fire({
        icon: "success",
        title: "Agregado correctamente",
        text: "",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
interface Examen {
  tipoExam?: number;
  nombreExam?: string;
}
interface Lugar {
  index?: number;
  lugarLab?: string;
}
