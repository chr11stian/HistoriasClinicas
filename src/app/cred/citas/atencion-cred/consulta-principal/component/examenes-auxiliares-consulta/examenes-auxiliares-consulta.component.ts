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
    // console.log("data de usuario ", ipressAux);
    // this.ajusteHemoService.getFactorCorrepcionXipress(ipressAux.idIpress).subscribe((res: any) => {
    //   this.factorCorrection = res.object.factorAjuste;
    // });
    this.listarPeticionesExamenes();
  }
  ngOnInit(): void {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
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
}
interface Examen {
  tipoExam?: number;
  nombreExam?: string;
}
interface Lugar {
  index?: number;
  lugarLab?: string;
}
