import { controlCrecimiento } from "./../../../../models/data";
import { Component, OnInit, DoCheck } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { CieService } from "../../../../../../obstetricia-general/services/cie.service";
import { FinalizarConsultaService } from "../../services/finalizar-consulta.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalReferenciaComponent } from "./modal-referencia/modal-referencia.component";
import { DatePipe } from "@angular/common";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { CalendarComponent } from "./calendar/calendar.component";
import { MenuItem, MessageService } from "primeng/api";
import {
  dato,
  listaAcuerdosConMadre,
  acuerdosInterface,
  proxCita,
  ReferenciaInterface,
} from "../../../../models/data";
import { RolGuardiaService } from "../../../../../../core/services/rol-guardia/rol-guardia.service";
import { ConsultaGeneralService } from "../../services/consulta-general.service";

@Component({
  selector: "app-finalizar-consulta",
  templateUrl: "./finalizar-consulta.component.html",
  styleUrls: ["./finalizar-consulta.component.css"],
  providers: [DialogService],
})
export class FinalizarConsultaComponent implements OnInit, DoCheck {
  attributeLocalS = "documento";
  data: dato;
  fecha: Date;
  acuerdosFG: FormGroup;
  acuerdos: listaAcuerdosConMadre[] = [];
  acuerdosAux: listaAcuerdosConMadre[] = [];
  referencia: ReferenciaInterface[] = [];
  interconsulta: proxCita[] = [];

  id: string;
  FrmAcuerdo: FormGroup;
  formExamen: FormGroup;
  formAcuerdos: FormGroup;
  formReferencia: FormGroup;
  form: FormGroup;
  formInterconsulta: FormGroup;

  dialogInterconsulta: boolean;
  dialogAcuerdos: boolean;
  dialogExamenes: boolean;
  dialogReferencia: boolean;

  isUpdate3: boolean = false;
  bool3: boolean = false;
  index3: number;

  isUpdate4: boolean = false;
  bool4: boolean = false;
  index4: number;
  nombreEspecialidad: any[];
  examen: any[];

  isUpdate5: boolean = false;
  bool5: boolean = false;
  index5: number;

  tipoDoc: string = "";
  nroDoc: string = "";
  mes: number;
  listAcuerdos: listaAcuerdosConMadre[] = [];
  datePipe = new DatePipe("en-US");
  ref: DynamicDialogRef;
  servicios: string[] = [];
  //--Interconsulta
  tooltipItems: MenuItem[];
  listInterconsulta: proxCita[] = []; 
  isUpdate: boolean = false; 
  loading: boolean = false;
  
  ngDoCheck() {
    if (this.acuerdosService.proxCita !== "") {
      this.fecha = new Date(this.acuerdosService.proxCita);
    }
  }

  constructor(
    private consultaGeneralService: ConsultaGeneralService,
    private acuerdosService: FinalizarConsultaService,
    private rolGuardiaService: RolGuardiaService,
    private cieService: CieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: DialogService
  ) {
    this.buildFG();

    this.nombreEspecialidad = [
      { label: "ENDOVENOSA", value: "ENDOVENOSA" },
      { label: "INHALADORA", value: "INHALADORA" },
      { label: "INTRADERMICO", value: "INTRADERMICO" },
      { label: "INTRAMUSCULAR", value: "INTRAMUSCULAR" },
      { label: "NASAL", value: "NASAL" },
      { label: "OFTALMICO", value: "OFTALMICO" },
      { label: "ORAL", value: "ORAL" },
      { label: "OPTICO", value: "OPTICO" },
      { label: "RECTAL", value: "RECTAL" },
      { label: "SUBCUTANEO", value: "SUBCUTANEO" },
      { label: "SUBLINGUAL", value: "SUBLINGUAL" },
      { label: "TOPICO", value: "TOPICO" },
      { label: "VAGINAL", value: "VAGINAL" },
    ];
    this.examen = [
      { label: "ENDOVENOSA", value: "ENDOVENOSA" },
      { label: "INHALADORA", value: "INHALADORA" },
      { label: "INTRADERMICO", value: "INTRADERMICO" },
      { label: "INTRAMUSCULAR", value: "INTRAMUSCULAR" },
      { label: "NASAL", value: "NASAL" },
      { label: "OFTALMICO", value: "OFTALMICO" },
      { label: "ORAL", value: "ORAL" },
      { label: "OPTICO", value: "OPTICO" },
      { label: "RECTAL", value: "RECTAL" },
      { label: "SUBCUTANEO", value: "SUBCUTANEO" },
      { label: "SUBLINGUAL", value: "SUBLINGUAL" },
      { label: "TOPICO", value: "TOPICO" },
      { label: "VAGINAL", value: "VAGINAL" },
    ];
  }

  save() {
    let aux: acuerdosInterface = {
      acuerdosCompromisosCRED: {
        edadMes: this.mes,
        listaAcuerdosConMadre: this.acuerdos,
      },
      referencia: this.acuerdosService.referencia,
      proxCita: {
        fecha: this.datePipe.transform(
          this.acuerdosFG.get("proximaCitaFC").value,
          "yyyy-MM-dd"
        ),
        motivo: this.acuerdosFG.get("motivo").value,
        servicio: this.acuerdosFG.get("servicioC").value,
        nivelUrgencia: this.acuerdosFG.get("urgenciaC").value,
      },
      observacionesConsulta: this.acuerdosFG.get("observacionFC").value,
      interconsultas: this.interconsulta,
    };
    console.log("aux", aux);
    this.acuerdosService
      .addAcuerdo(this.data.idConsulta, aux)
      .subscribe((r: any) => {
        Swal.fire({
          icon: "success",
          title: "Agregado correctamente",
          text: "",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  

  buildFG(): void {
    this.id = localStorage.getItem(this.attributeLocalS);
    this.acuerdosFG = new FormGroup({
      detailAcuerdoFC: new FormControl({ value: "", disabled: false }, []),
      proximaCitaFC: new FormControl({ value: null, disabled: false }, []),
      atendidoFC: new FormControl({ value: "", disabled: false }, []),
      dniFC: new FormControl({ value: "", disabled: false }, []),
      observacionFC: new FormControl({ value: "", disabled: false }, []),
      motivo: new FormControl({ value: "", disabled: false }, []),
      servicio: new FormControl({ value: "", disabled: false }, []),
      urgencia: new FormControl({ value: "", disabled: false }, []),
      servicioC: new FormControl({ value: "", disabled: false }, []),
      urgenciaC: new FormControl({ value: "", disabled: false }, []),
    });
    this.FrmAcuerdo = new FormGroup({
      acuerdo: new FormControl({ value: null, disabled: false }, []),
    });
    this.formInterconsulta = new FormGroup({
      fecha: new FormControl({ value: null, disabled: false }, []),
      motivo: new FormControl({ value: "", disabled: false }, []),
      servicio: new FormControl({ value: "", disabled: false }, []),
      urgencia: new FormControl({ value: "", disabled: false }, []),
    });
    this.formAcuerdos = this.formBuilder.group({
      descripcion: new FormControl("", []),
    });

    this.formExamen = this.formBuilder.group({
      nombreEspecialidad: new FormControl("", []),
      examen: new FormControl("", []),
      fecha: new FormControl("", []),
    });

    this.formReferencia = this.formBuilder.group({
      consultorio: new FormControl("", []),
      motivo: new FormControl("", []),
      codRENAES: new FormControl("", []),
    });

    this.formInterconsulta = new FormGroup({
      fecha: new FormControl({ value: null, disabled: false }, []),
      motivo: new FormControl({ value: "", disabled: false }, []),
      servicio: new FormControl({ value: "", disabled: false }, []),
      urgencia: new FormControl({ value: "", disabled: false }, []),
    });
  }

  listaAcuerdos() {
    this.acuerdosService.getListaAcuerdos().subscribe((r: any) => {
      this.listAcuerdos = r.object;
      // console.log("acuerdos", this.listAcuerdos);
    });
  }

  ngOnInit(): void {
    this.fecha = new Date();
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.mes = this.data.mes;
    this.agenda();
    this.listaAcuerdos();
  }

  /* mostrar el plan en el calendario */
  agenda() {
    let listaEventAux: event[] = [];
    let index;
    this.acuerdosService
      .listPlan(this.data.nroDocumento)
      .subscribe((r: any) => {
        let aux = r.object.planAtencion;
        //--- proxima cita ---
        // console.log("agenda");
        index = 0;
        aux.controlCrecimientoDesa.map((r_: any) => {
          /* aux */
          let fechaDate = new Date(r_.fechaTentativa);
          if (fechaDate > this.fecha && index < 1) {
            index++;
            listaEventAux.push({
              title:
                r_.nroControl +
                "° control de crecimiento de " +
                this.descripcion(r_.descripcionEdad),
              start: r_.fechaTentativa,
            });
          }
          this.acuerdosService.list.push({
            title:
              r_.nroControl +
              "° control de crecimiento de " +
              this.descripcion(r_.descripcionEdad),
            start: r_.fechaTentativa,
          });
        });
        index = 0;
        aux.suplementacionSFMicronutrientes.map((r_: any) => {
          /* aux */
          
          let fechaDate = new Date(r_.fechaTentativa);
          if (fechaDate > this.fecha && index < 1) {
            index++;
            listaEventAux.push({
              title:
                r_.dosis +
                "° dosis de " +
                r_.descripcion.toLowerCase() +
                " de " +
                this.descripcion(r_.descripcionEdad),
              start: r_.fechaTentativa,
            });
          }
          this.acuerdosService.list.push({
            title:
              r_.dosis +
              "° dosis de " +
              r_.descripcion.toLowerCase() +
              " de " +
              this.descripcion(r_.descripcionEdad),
            start: r_.fechaTentativa,
          });
        });
        index = 0;
        aux.suplementacionVitaminaA.map((r_: any) => {
          /* aux */
          
          let fechaDate = new Date(r_.fechaTentativa);
          if (fechaDate > this.fecha && index < 1) {
            index++;
            listaEventAux.push({
              title:
                r_.dosis +
                "° dosis de " +
                r_.descripcion.toLowerCase() +
                " de " +
                this.descripcion(r_.descripcionEdad),
              start: r_.fechaTentativa,
            });
          }
          this.acuerdosService.list.push({
            title:
              r_.dosis +
              "° dosis de " +
              r_.descripcion.toLowerCase() +
              " de " +
              this.descripcion(r_.descripcionEdad),
            start: r_.fechaTentativa,
          });
        });
        index = 0;
        aux.tratamientoDosajeHemoglobina.map((r_: any) => {
          /* aux */
          
          let fechaDate = new Date(r_.fechaTentativa);
          if (fechaDate > this.fecha && index < 1) {
            index++;
            listaEventAux.push({
              title:
                r_.nroControl +
                "° control de " +
                (r_.nombre === "Dosaje_Hb" ? "dosaje de hemoglobina" : "") +
                " de " +
                this.descripcion(r_.descripcionEdad),
              start: r_.fechaTentativa,
            });
          }
          this.acuerdosService.list.push({
            title:
              r_.nroControl +
              "° control de " +
              (r_.nombre === "Dosaje_Hb" ? "dosaje de hemoglobina" : "") +
              " de " +
              this.descripcion(r_.descripcionEdad),
            start: r_.fechaTentativa,
          });
        });
        index = 0;
        aux.inmunizacionesCred.map((r_: any) => {
          /* aux */
          
          let fechaDate = new Date(r_.fechaTentativa);
          if (fechaDate > this.fecha && index < 1) {
            index++;
            listaEventAux.push({
              title:
                r_.dosis +
                "° dosis de " +
                r_.descripcion.toLowerCase() +
                " de " +
                this.descripcion(r_.descripcionEdad),
              start: r_.fechaTentativa,
            });
          }
          this.acuerdosService.list.push({
            title:
              r_.dosis +
              "° dosis de " +
              r_.descripcion.toLowerCase() +
              " de " +
              this.descripcion(r_.descripcionEdad),
            start: r_.fechaTentativa,
          });
        });
      });
    // console.log("a", listaEventAux);
  }

  descripcion(s: string) {
    return s == "RN"
      ? "recien nacido"
      : s == "Menor_1A"
      ? "menor de un año"
      : s == "1A"
      ? "un año"
      : s == "2A"
      ? "dos años"
      : s == "3A"
      ? "tres años"
      : s == "4A"
      ? "cuatro años"
      : s == "5A"
      ? "cinco años"
      : s == "6A"
      ? "seis años"
      : s == "7A"
      ? "siete años"
      : s == "8A"
      ? "ocho años"
      : "nueve años";
  }

  openAcuerdo() {
    this.isUpdate3 = false;
    this.formAcuerdos.reset();
    this.formAcuerdos.get("descripcion").setValue("");
    this.dialogAcuerdos = true;
  }

  cancelAcuerdo() {
    Swal.fire({
      icon: "warning",
      title: "Cancelado...",
      text: "",
      showConfirmButton: false,
      timer: 1000,
    });
    this.dialogAcuerdos = false;
  }

  Agregar() {
    console.log(this.FrmAcuerdo.value.acuerdo);
    let a: listaAcuerdosConMadre = {
      nroAcuerdo: this.FrmAcuerdo.value.acuerdo,
    };
    let b: listaAcuerdosConMadre = {
      nroAcuerdo: this.FrmAcuerdo.value.acuerdo,
      descripcion:
        this.listAcuerdos[this.FrmAcuerdo.value.acuerdo - 1].descripcion,
    };

    //console.log(this.acuerdos)
    //console.log(this.acuerdosAux)
    if (
      this.acuerdos.find(
        (rol) => rol.nroAcuerdo === this.FrmAcuerdo.value.acuerdo
      ) === undefined
    )
      this.acuerdos.push(a);
    if (
      this.acuerdosAux.find(
        (rol) => rol.nroAcuerdo === this.FrmAcuerdo.value.acuerdo
      ) === undefined
    )
      this.acuerdosAux.push(b);
  }

  saveAcuerdo() {
    let aux = true;
    if (this.bool3 === false) {
      aux = false;
      this.isUpdate3 = false;
      let a: listaAcuerdosConMadre = {
        nroAcuerdo: "nro",
        descripcion: this.formAcuerdos.value.descripcion,
        edadMes: "edad",
      };
      this.acuerdos.push(a);
    } else {
      this.acuerdos[this.index3].descripcion =
        this.formAcuerdos.value.descripcion;
      this.bool3 = false;
    }
    Swal.fire({
      icon: "success",
      title:
        aux !== true ? "Agregado correctamente" : "Actualizado correctamente",
      text: "",
      showConfirmButton: false,
      timer: 1500,
    });
    this.dialogAcuerdos = false;
  }

  eliminarAcuerdo(index) {
    this.acuerdos.splice(index, 1);
    this.acuerdosAux.splice(index, 1);
  }
  /* funciones tabla referencia */
  openReferencia() {
    this.isUpdate5 = false;
    this.formReferencia.reset();
    this.formReferencia.get("consultorio").setValue("");
    this.formReferencia.get("motivo").setValue("");
    this.formReferencia.get("codRENAES").setValue("");
    this.dialogReferencia = true;
  }

  cancelReferencia() {
    Swal.fire({
      icon: "warning",
      title: "Cancelado...",
      text: "",
      showConfirmButton: false,
      timer: 1000,
    });
    this.dialogReferencia = false;
  }

  irEvaluaciones() {
    /** redirigir a atencion de usuario */
    this.router.navigate(
      ["/dashboard/cred/citas/atencion/evaluaciones-consulta"],
      {
        queryParams: {
          tipoDoc: this.tipoDoc,
          nroDoc: this.nroDoc,
        },
      }
    );
  }

  openCalendar() {
    this.ref = this.dialog.open(CalendarComponent, {
      header: "CALENDARIO DE ACTIVIDADES",
      height: "100%",
      width: "90%",
      style: {
        position: "absolute",
        top: "17px",
      },
    });
  }

  openRefe() {
    this.ref = this.dialog.open(ModalReferenciaComponent, {
      header: "HOJA DE REFERENCIA",
      height: "100%",
      width: "90%",
      style: {
        position: "absolute",
        top: "17px",
      },
    });
    this.referencia = [];
    this.ref.onClose.subscribe((data: ReferenciaInterface) => {
      if (data !== undefined) this.referencia.push(data);
    });
  }
}
interface event {
  title: string;
  start: string | Date;
}
