import { ObjectEscalaEEDP } from "./../../../plan/component/evaluacion-general/models/EscalaEEDP";
import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { CieService } from "../../../../../../obstetricia-general/services/cie.service";
import { DiagnosticoConsultaService } from "../../services/diagnostico-consulta.service";
import { PrestacionService } from "src/app/mantenimientos/services/prestacion/prestacion.service";
import { UpsAuxIpressService } from "../../../../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import { MotivosConsultaService } from "../../services/motivos-consulta.service";
import {
  dato,
  motivoConsultaInterface,
  proxCita,
} from "../../../../models/data";
import { SpinnerHandlerService } from "src/app/core/services/spinner-handler.service";
import { DatePipe } from "@angular/common";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { MenuItem, MessageService } from "primeng/api";
import { Patient } from "../../models/consultaGeneral";
import { Diagnostic, DiagnosticFUA, DiagnosticHIS, DiagnosticSave, Prestation } from "../../models/FUAHIS";
@Component({
  selector: "app-diagnostico-consulta",
  templateUrl: "./diagnostico-consulta.component.html",
  styleUrls: ["./diagnostico-consulta.component.css"],
  providers: [DialogService],
})
export class DiagnosticoConsultaComponent implements OnInit {
  selectedProducts: resultados[];
  tablaResumenDx: resultados[] = [];
  dxs: any[] = [];

  loading: boolean = true;
  submitted: boolean = false;

  attributeLocalS = "documento";
  idIpress: string = "";
  dataConsulta: dato;
  id: string = "";
  itemEdit: number = -1;
  isUpdate: boolean = false;

  formDiagnostico: FormGroup;
  diagnosticoDialog: boolean;
  diagnosticos: diagnosticoInterface[] = [];


  listaDeCIEHIS: any[] = [];
  listaDeCIESIS: any[] = [];
  listaDeProcedimientos: any[] = [];
  listaUpsHis: any[] = [];
  upsHis: any[] = [];
  listaUpsAuxHis: any[] = [];
  data;
  checked: boolean = false;

  descripcionItem: string;
  private hayDatos: boolean = false;
  //--Interconsulta
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
  patientData: Patient;
  ListaPrestacion: Prestation[] = [];
  arrayFuaDiagnostic: Diagnostic[] = [];
  arrayDiagnosticType: Lista[] = []
  arrayDiagnosticFUA: DiagnosticFUA[] = [];
  arrayDiagnosticHIS: DiagnosticHIS[] = [];
  arrayUPS: UPS[] = [];
  arrayUPSAux: UPSaux[] = [];
  arrayDiagnosticSave: DiagnosticSave[] = [];
  // arrayCIE10Fua: Diagnostic[] = [];


  constructor(
    private rolGuardiaService: RolGuardiaService,
    private consultaGeneralService: ConsultaGeneralService,
    private DiagnosticoService: DiagnosticoConsultaService,
    private PrestacionService: PrestacionService,
    private cieService: CieService,
    private formBuilder: FormBuilder,
    private UpsAuxService: UpsAuxIpressService,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.idIpress = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
    this.dataConsulta = <dato>(
      JSON.parse(localStorage.getItem(this.attributeLocalS))
    );
    this.patientData = JSON.parse(localStorage.getItem("documento"));
    this.arrayDiagnosticType = [
      { label: "DEFINITIVO", value: "D" },
      { label: "PRESUNTIVO", value: "P" },
      { label: "REPETITIVO", value: "R" },
    ];

  }

  ngOnInit(): void {
    this.recuperarPrestaciones();
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
    this.getUpsPerIpress();
  }

  buildForm() {
    this.formDiagnostico = this.formBuilder.group({
      nro: new FormControl(""),
      buscarDxSIS: new FormControl({ value: "", disabled: false }),
      buscarDxHIS: new FormControl({ value: "", disabled: false }),
      tipoDiagnostico: new FormControl({ value: "", disabled: false }),
      prestacion: new FormControl({ value: "", disabled: false }),

      nombreUPSaux: ["", [Validators.required]],

      cie10SIS: new FormControl({ value: "", disabled: false }),
      diagnosticoHIS: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      cie10HIS: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      factorCondicional: new FormControl({ value: "", disabled: false }),

      codCIE10SIS: new FormControl(''),
      buscarPDxSIS: new FormControl(''),
      procedimientoSIS: new FormControl(''),
      tipoDiagnosticoFUA: new FormControl(''),
      diagnosticoFUA: new FormControl(''),
      nombreUPS: new FormControl({ value: "" }),
      tipoDiagnosticoHIS: new FormControl({ value: "" }),
      lab: new FormControl(''),
      codProcedimientoHIS: new FormControl({ value: "" }),
      buscarPDxHIS: new FormControl({ value: "" }),
      procedimientoHIS: new FormControl(''),
      diagnosticoSIS: new FormControl(''),
      nombreUPSAux: new FormControl(''),
    });
    /* Interconsulta */
    this.formInterconsulta = new FormGroup({
      fecha: new FormControl({ value: null, disabled: false }, []),
      motivo: new FormControl({ value: "", disabled: false }, []),
      servicio: new FormControl({ value: "", disabled: false }, []),
      urgencia: new FormControl({ value: "", disabled: false }, []),
    });
  }

  selectDxSIS(event) {
    console.log(this.formDiagnostico.value.buscarDxSIS);
    console.log('select sis ', event);
    this.formDiagnostico.patchValue({ diagnosticoSIS: event.value.diagnostico });
    this.formDiagnostico.patchValue({ diagnosticoFUA: "" });
    this.formDiagnostico.patchValue({ codCIE10SIS: event.value }, { emitEvent: false }
    );
  }
  /**SELECCION DE DIAGNOSTICO HIS O COD CIE HIS */
  selectedDxHIS(event: any, type: number) {
    this.formDiagnostico.patchValue({ codProcedimientoHIS: event });
    this.formDiagnostico.patchValue({ buscarPDxHIS: "" });
    this.formDiagnostico.patchValue({ procedimientoHIS: event.descripcionItem });

  }

  filterCIE10(event: any) {
    this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIEHIS = res.object;
      console.log("CIEHIS", this.listaDeCIEHIS);
    });
  }

  getUpsPerIpress() {
    let data = {
      idIpress: this.idIpress,
      edad: this.patientData.anio,
      sexo: this.patientData.sexo
    }
    this.DiagnosticoService.listaUpsHis(data).then((res: any) => {
      this.arrayUPS = res.object;
    });
    this.DiagnosticoService.listaUpsAuxHisPerIpress(this.idIpress).then((res: any) => {
      this.arrayUPSAux = res.object
    })
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
    this.loading = true;
    setTimeout(() => (this.loading = false), 1000);
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

  async recuperarPrestaciones() {
    await this.PrestacionService.getPrestacion().subscribe((res: any) => {
      this.ListaPrestacion = res.object;
      this.verifyPrestationPerAge(this.ListaPrestacion, this.patientData);
    });
  }

  onChangePrestacion() {
    const dataPrestacion: Prestation = this.formDiagnostico.value.prestacion;
    this.arrayFuaDiagnostic = dataPrestacion.diagnostico;
  }

  verifyPrestationPerAge(arrayPrestaciones: Prestation[], paciente: Patient): void {
    let monthAge = 12 * paciente.anio + paciente.mes;
    let yearAge = paciente.anio;
    let auxPrestacion: Prestation[] = [];
    arrayPrestaciones.forEach(item => {
      switch (item.denominacion) {
        case 'ANIOS':
          if (item.edadMin <= yearAge && item.edadMax >= yearAge) {
            auxPrestacion.push(item);
          }
          break;
        case 'MESES':
          if (item.edadMin <= monthAge && item.edadMax >= monthAge) {
            auxPrestacion.push(item);
          }
          break
        default:
          console.log('caso no evaluado');
          break;
      }
    })
    this.ListaPrestacion = auxPrestacion.filter(item => item.diagnostico != null)
    this.ListaPrestacion.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    console.log('lista de prestaciones ', this.ListaPrestacion);
  }

  agregateDiagnosticFUA(): void {
    let FUAdiagnostic: DiagnosticFUA = {
      codPrestacion: this.formDiagnostico.value.prestacion.codigo,
      tipoDiagnostico: this.formDiagnostico.value.tipoDiagnosticoFUA,
      diagnostico: this.formDiagnostico.value.diagnosticoSIS,
      CIE10: this.formDiagnostico.value.codCIE10SIS.cie10
    }
    this.arrayDiagnosticFUA.push(FUAdiagnostic);
    this.formDiagnostico.reset();
  }

  agregateDiagnosticHIS(): void {
    let HISdiagnostic: DiagnosticHIS = {
      nombreUPS: this.formDiagnostico.value.nombreUPS.nombreUPS,
      nombreUPSaux: this.formDiagnostico.value.nombreUPSAux.nombre,
      tipoDiagnostico: this.formDiagnostico.value.tipoDiagnosticoHIS,
      lab: this.formDiagnostico.value.lab,
      diagnosticoHIS: this.formDiagnostico.value.procedimientoHIS,
      CIE10: this.formDiagnostico.value.codProcedimientoHIS.codigoItem,
    }
    this.arrayDiagnosticHIS.push(HISdiagnostic);
    this.formDiagnostico.reset();
  }
  mergeArrayDiagnostic(diagnosticosSIS: DiagnosticFUA[], diagnosticosHIS: DiagnosticHIS[], diagnosticos: DiagnosticSave[]): void {
    diagnosticosSIS.forEach(item => {
      let auxDiagnostic: DiagnosticSave = {
        nro: null,
        diagnosticoHIS: null,
        diagnosticoSIS: item.diagnostico,
        cie10SIS: item.CIE10,
        cie10HIS: null,
        tipo: item.tipoDiagnostico,
        codPrestacion: item.codPrestacion,
        nombreUPS: null,
        nombreUPSaux: null,
        lab: null,
      }
      diagnosticos.push(auxDiagnostic)
    });
    diagnosticosHIS.forEach(item => {
      let auxDiagnostic: DiagnosticSave = {
        nro: null,
        diagnosticoHIS: item.diagnosticoHIS,
        diagnosticoSIS: null,
        cie10SIS: null,
        cie10HIS: item.CIE10,
        tipo: item.tipoDiagnostico,
        codPrestacion: null,
        nombreUPS: item.nombreUPS,
        nombreUPSaux: item.nombreUPSaux,
        lab: item.lab,
      }
      diagnosticos.push(auxDiagnostic)
    });
  }

  SaveDiagnostico(): void {
    this.mergeArrayDiagnostic(this.arrayDiagnosticFUA, this.arrayDiagnosticHIS, this.arrayDiagnosticSave);
    this.DiagnosticoService.postPromiseDiagnostico(this.patientData.idConsulta, this.arrayDiagnosticSave).then(res => {
      console.log('data saved');
    })
  }
}
interface diagnosticoInterface {
  nro?: number;
  diagnosticoHIS?: string;
  cie10HIS?: string;
  diagnosticoSIS?: string;
  cie10SIS?: string;
  tipo?: string;
  codPrestacion?: string;
  nombreUPS?: string;
  factorCondicional?: string;
  nombreUPSaux?: string;
  lab?: string;
}
interface resultados {
  nombre?: string;
  evaluacion?: string;
  resultado?: string;
  estado?: boolean;
}
interface Lista {
  label: string;
  value: string;
}
interface UPS {
  codUPS: string;
  nombreUPS: string;
}
interface UPSaux {
  estado: boolean;
  nombre: string;
}
