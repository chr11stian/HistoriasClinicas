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
  // new vars
  patientData: Patient;
  ListaPrestacion: Prestation[] = [];
  arrayFuaDiagnostic: Diagnostic[] = [];
  arrayDiagnosticType: Lista[] = []
  arrayDiagnosticFUA: DiagnosticFUA[] = [];
  arrayDiagnosticHIS: DiagnosticHIS[] = [];
  arrayUPS: UPS[] = [];
  arrayUPSAux: UPSaux[] = [];
  arrayDiagnosticSave: DiagnosticSave[] = [];
  isSaved: boolean = false;
  // arrayCIE10Fua: Diagnostic[] = [];
  fuaForm: FormGroup;
  hisForm: FormGroup;
  arrayPrestation: any;

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
    this.recoverConsultationDiagnostic();
    this.recuperarResumenDxBDTamizajes();
    this.recuperarResumenDxBDEvaluaciones();

  }

  buildForm() {
    this.formDiagnostico = this.formBuilder.group({
      nro: new FormControl(""),
      buscarDxSIS: new FormControl({ value: "", disabled: false }),
      buscarDxHIS: new FormControl({ value: "", disabled: false }),
      tipoDiagnostico: new FormControl({ value: "", disabled: false }),


      nombreUPSaux: ["", [Validators.required]],

      cie10SIS: new FormControl({ value: "", disabled: false }),
      diagnosticoHIS: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      cie10HIS: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      factorCondicional: new FormControl({ value: "", disabled: false }),

      prestacion: new FormControl("", Validators.required),
      tipoDiagnosticoFUA: new FormControl('', Validators.required),
      diagnosticoFUA: new FormControl(''),
      codCIE10SIS: new FormControl(''),
      diagnosticoSIS: new FormControl(''),

      nombreUPS: new FormControl(""),
      nombreUPSAux: new FormControl(''),
      tipoDiagnosticoHIS: new FormControl(""),
      lab: new FormControl(''),
      buscarPDxHIS: new FormControl(""),
      codProcedimientoHIS: new FormControl(""),
      procedimientoHIS: new FormControl(''),
    });
    this.fuaForm = new FormGroup({
      prestacion: new FormControl("", Validators.required),
      tipoDiagnosticoFUA: new FormControl('', Validators.required),
      diagnosticoFUA: new FormControl(''),
      codCIE10SIS: new FormControl('', Validators.required),
      diagnosticoSIS: new FormControl('', Validators.required),
    });
    this.hisForm = new FormGroup({
      nombreUPS: new FormControl("", Validators.required),
      nombreUPSAux: new FormControl("", Validators.required),
      tipoDiagnosticoHIS: new FormControl("", Validators.required),
      lab: new FormControl(""),
      buscarPDxHIS: new FormControl(""),
      codProcedimientoHIS: new FormControl("", Validators.required),
      procedimientoHIS: new FormControl("", Validators.required),
    })

    /* Interconsulta */
    this.formInterconsulta = new FormGroup({
      fecha: new FormControl({ value: null, disabled: false }, []),
      motivo: new FormControl({ value: "", disabled: false }, []),
      servicio: new FormControl({ value: "", disabled: false }, []),
      urgencia: new FormControl({ value: "", disabled: false }, []),
    });
  }

  selectDxSIS(event) {
    console.log(this.fuaForm.value.buscarDxSIS);
    console.log('select sis ', event);
    this.fuaForm.patchValue({
      diagnosticoSIS: event.value.diagnostico,
      diagnosticoFUA: "",
      codCIE10SIS: event.value
    });
  }
  /**SELECCION DE DIAGNOSTICO HIS O COD CIE HIS */
  selectedDxHIS(event: any, type: number) {
    this.hisForm.patchValue({
      codProcedimientoHIS: event,
      buscarPDxHIS: "",
      procedimientoHIS: event.descripcionItem
    });
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
    console.log('valor del auto com ',this.fuaForm.value.prestacion);
    const dataPrestacion: Prestation = this.fuaForm.value.prestacion;
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
    let isAdded: boolean = false;
    if (this.fuaForm.valid) {
      let FUAdiagnostic: DiagnosticFUA = {
        codPrestacion: this.fuaForm.value.prestacion.codigo,
        tipoDiagnostico: this.fuaForm.value.tipoDiagnosticoFUA,
        diagnostico: this.fuaForm.value.diagnosticoSIS,
        CIE10: this.fuaForm.value.codCIE10SIS.cie10
      }
      this.arrayDiagnosticFUA.forEach(item => {
        if (item.CIE10 === FUAdiagnostic.CIE10) {
          this.repeatDataMessage();
          isAdded = true;
        }
      })
      if (!isAdded) {
        this.arrayDiagnosticFUA.push(FUAdiagnostic);
        this.fuaForm.reset();
      }
    } else
      this.missDataMessage();
  }

  agregateDiagnosticHIS(): void {
    let isAdded: boolean = false;
    if (this.hisForm.valid) {
      let HISdiagnostic: DiagnosticHIS = {
        nombreUPS: this.hisForm.value.nombreUPS.nombreUPS,
        nombreUPSaux: this.hisForm.value.nombreUPSAux.nombre,
        tipoDiagnostico: this.hisForm.value.tipoDiagnosticoHIS,
        lab: this.hisForm.value.lab,
        diagnosticoHIS: this.hisForm.value.procedimientoHIS,
        CIE10: this.hisForm.value.codProcedimientoHIS.codigoItem,
      }
      this.arrayDiagnosticHIS.forEach(item => {
        if (item.CIE10 === HISdiagnostic.CIE10) {
          this.repeatDataMessage();
          isAdded = true;
        }
      });
      if (!isAdded) {
        this.arrayDiagnosticHIS.push(HISdiagnostic);
        this.hisForm.patchValue({
          tipoDiagnosticoHIS: '',
          lab: '',
          codProcedimientoHIS: '',
          procedimientoHIS: ''
        });
      }
    } else
      this.missDataMessage();
  }

  mergeArrayDiagnostic(diagnosticosSIS: DiagnosticFUA[], diagnosticosHIS: DiagnosticHIS[], diagnosticos: DiagnosticSave[]): void {
    diagnosticosSIS.forEach(item => {
      let auxDiagnostic: DiagnosticSave = {
        // nro: null,
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
        // nro: null,
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

  async saveDiagnostico(): Promise<void> {
    this.arrayDiagnosticSave = [];
    this.mergeArrayDiagnostic(this.arrayDiagnosticFUA, this.arrayDiagnosticHIS, this.arrayDiagnosticSave);
    if (this.arrayDiagnosticSave.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'No se agrego ningun procedimiento',
        text: '',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    await this.DiagnosticoService.postPromiseDiagnostico(this.patientData.idConsulta, this.arrayDiagnosticSave).then(res => {
      if (res.cod == '2121') {
        Swal.fire({
          icon: 'success',
          title: 'Se guardo exitosamente',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  recoverConsultationDiagnostic(): void {
    this.DiagnosticoService.getPromiseDiagnosticPerConsultation(this.dataConsulta.idConsulta).then(res => {

      let dataRes: DiagnosticSave[] = res.object;
      if (dataRes == null)
        return
      dataRes.forEach(item => {
        if (item.codPrestacion != null) {
          let diagnostic: DiagnosticFUA = {
            codPrestacion: item.codPrestacion,
            diagnostico: item.diagnosticoSIS,
            CIE10: item.cie10SIS,
            tipoDiagnostico: item.tipo
          }
          this.arrayDiagnosticFUA.push(diagnostic);
        } else {
          let diagnostic: DiagnosticHIS = {
            nombreUPS: item.nombreUPS,
            nombreUPSaux: item.nombreUPSaux,
            diagnosticoHIS: item.diagnosticoHIS,
            tipoDiagnostico: item.tipo,
            CIE10: item.cie10HIS,
            lab: item.lab
          }
          this.arrayDiagnosticHIS.push(diagnostic);
        }
      });
      this.isSaved = true;
    })
  }

  deleteItemOfArray(index: number, type: number): void {
    /**type:0=> lista de diagnosticos FUA; 1=> lista de diagnosticos HIS */
    type == 0 ? this.arrayDiagnosticFUA.splice(index, 1) : this.arrayDiagnosticHIS.splice(index, 1);
  }

  confirmToSave(): void {
    Swal.fire({
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      icon: 'question',
      title: 'Guardar',
      text: '¿Esta seguro que desea guardar los diagnosticos?',
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDiagnostico();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No se guardo',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  missDataMessage(): void {
    Swal.fire({
      icon: 'info',
      title: 'Falta llenar campos',
      text: '',
      showConfirmButton: false,
      timer: 2000
    });
  }

  repeatDataMessage(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Ya se agrego ese item',
      text: '',
      showConfirmButton: false,
      timer: 2000
    });
  }

  recuperarResumenDxBDTamizajes() {
    this.DiagnosticoService.getTamizajesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
      if (r.object != null || r.length > 0) {
        this.loading = false;
        for (let i = 0; i < r.object.length; i++) {
          let aux = {
            nombre: "TAMIZAJES",
            evaluacion: "TAMIZAJE AUDITIVO",
            resultado: r.object[i].resultadoAuditivo.valor,
          };
          this.tablaResumenDx.push(aux);
          let aux1 = {
            nombre: "TAMIZAJES",
            evaluacion: "TAMIZAJE VIF",
            resultado: r.object[i].resultadoVIF.valor,
          };
          this.tablaResumenDx.push(aux1);
          let aux2 = {
            nombre: "TAMIZAJES",
            evaluacion: "TAMIZAJE VISUAL",
            resultado: r.object[i].resultadoVisual.valor,
          };
          this.tablaResumenDx.push(aux2);
        }
      }
    });
  }

  recuperarResumenDxBDEvaluaciones() {
    this.DiagnosticoService.getEvaluacionesResumen(
      this.dataConsulta.idConsulta
    ).subscribe((r: any) => {
      //-- recupera laboratorios resumen
      if (r.object != null || r.length > 0) {
        this.loading = false;
        for (let i = 0; i < r.object.length; i++) {
          if (r.object[i].evaluacioAlimentacion) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "EVALUACION DE ALIMENTACION",
              resultado: r.object[i].evaluacioAlimentacion,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].testPeruano) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "TEST PERUANO",
              resultado: r.object[i].testPeruano,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].testEEDP) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "TEST EDDP",
              resultado: r.object[i].testEEDP,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].testTepsi) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "TEST TEPSI",
              resultado: r.object[i].testTepsi,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].testPautaBreve) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "TEST PAUTA BREVE",
              resultado: r.object[i].testPautaBreve,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].resultadoControlPE) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "CONTROL PESO - EDAD",
              resultado: r.object[i].resultadoControlPE,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].resultadoControlTE) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "CONTROL TALLA - EDAD",
              resultado: r.object[i].resultadoControlTE,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].resultadoControlPT) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "CONTROL PESO - TALLA",
              resultado: r.object[i].resultadoControlPT,
            };
            this.tablaResumenDx.push(aux);
          }
          if (r.object[i].resultadoControlPC) {
            let aux = {
              nombre: "EVALUACIONES O TEST",
              evaluacion: "CONTROL PERIMETRO CEFÁLICO",
              resultado: r.object[i].resultadoControlPC,
            };
            this.tablaResumenDx.push(aux);
          }
        }
      }
    });
  }

  filterPrestation(event): void {
    this.cieService.getAuctocompleteByCodAndDescripcion(event.query).then((res: any) => {
      this.arrayPrestation = res.object;
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
