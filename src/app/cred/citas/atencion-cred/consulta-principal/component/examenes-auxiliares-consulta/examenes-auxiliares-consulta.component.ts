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

  openAddExamDialog() {
    let dataDialog = {
      auxExams: this.listaExamenesAux
    };
    this.ref = this.dialog.open(DialogAddExamenesAuxiliaresComponent, {
      header: "NUEVO EXAMEN AUXILIAR",
      width: "50%",
      data: dataDialog,
    })
    this.ref.onClose.subscribe((data: any) => {
      this.listarPeticionesExamenes();
    })

  }

  listarPeticionesExamenes() {
    this.auxExamService.getListarPeticiones(this.idConsulta).then((res) => {
      if (res.object != null) {
        this.listaExamenesAux = res.object.examenesAuxiliares;
        this.listaExamenesAux = this.listaExamenesAux.filter(item => item.lugarExamen == 'LABORATORIO');
      }
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
