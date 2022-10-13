import { Component, OnInit } from "@angular/core";
import { dato } from "../../../../../../models/data";
import { inmunizaciones } from "../../../../../plan/component/plan-atencion-integral/models/plan-atencion-integral.model";
import { InmunizacionesService } from "../../../../../plan/component/plan-atencion-integral/services/inmunizaciones/inmunizaciones.service";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { TratamientoInmunizacionModalComponent } from "../inmunizacion-modal/tratamiento-inmunizacion-modal.component";
@Component({
  selector: "app-tratamiento-inmunizacion",
  templateUrl: "./tratamiento-inmunizacion.component.html",
  styleUrls: ["./tratamiento-inmunizacion.component.css"],
  providers: [DialogService],
})
export class TratamientoInmunizacionComponent implements OnInit {
  listaVacunasCodigos = [
    {
      codigo: "90716",
      nombre: "VARICELA",
      descripcion:
        "VARICELA-VACUNA DE VIRUS VIVO ATENUADO (CEPA OKA), PROTEGE CONTRA LA INFECCION POR EL VIRUS DE LA VARICELA",
    },
    {
      codigo: "90585",
      nombre: "BCG",
      descripcion:
        "BCG-VACUNA LIOFILIZADA DEL BACILO DE CALMETTE-GUERIN CONTRA LA TUBERCULOSIS-DOSIS UNICA",
    },
    {
      codigo: "90744",
      nombre: "HVB",
      descripcion:
        "HVB-VACUNA HEPATITIS VIRAL B CONTRA LA HEPATITIS B-DOSIS UNICA",
    },
    {
      codigo: "90713",
      // nombre: "IPV1",
      nombre: "IPV",
      descripcion: "IPV-VACUNA DE VIRUS POLIO INACTIVADO-1RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "IPV2",
    //   descripcion: "IPV-VACUNA DE VIRUS POLIO INACTIVADO-2DA DOSIS",
    // },
    {
      codigo: "90712",
      // nombre: "APO3",
      nombre: "APO",
      descripcion:
        "APO-VACUNA ANTIPOLIOMIELÍTICA ORAL CONTRA LA POLIOMELITIS-3RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "APO1R",
    //   descripcion: "APO-VACUNA CONTRA LA POLIO ORAL-1ER REFUERZO",
    // },
    // {
    //   codigo:'',
    //   nombre: "APO2R",
    //   descripcion: "APO-VACUNA CONTRA LA POLIO ORAL-2DO REFUERZO",
    // },
    {
      codigo: "90723",
      // nombre: "Pentavalente1",
      nombre: "PENTAVALENTE",
      descripcion:
        "PENTAVALENTE-VACUNA PREVENTIVA PARA LA DIFTERIA, TÉTANOS, TOS FERINA (DPT), HAEMOPHILUS INFLUENZA TIPO B E INFECCIÓN POR HEPATITIS B-1RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "Pentavalente2",
    //   descripcion:
    //     "PENTAVALENTE-VACUNA PREVENTIVA PARA LA DIFTERIA, TÉTANOS, TOS FERINA (DPT), HAEMOPHILUS INFLUENZA TIPO B E INFECCIÓN POR HEPATITIS B-2DA DOSIS",
    // },
    // {
    //   codigo:'',
    //   nombre: "Pentavalente3",
    //   descripcion:
    //     "PENTAVALENTE-VACUNA PREVENTIVA PARA LA DIFTERIA, TÉTANOS, TOS FERINA (DPT), HAEMOPHILUS INFLUENZA TIPO B E INFECCIÓN POR HEPATITIS B-3RA DOSIS",
    // },
    {
      codigo: "90681",
      // nombre: "Rotavirus1",
      nombre: "ROTAVIRUS",
      descripcion:
        "ROTAVIRUS-PREVIENE DIARREAS GRAVES EN LACTANTES Y NIÑOS PEQUEÑOS-1RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "Rotavirus2",
    //   descripcion:
    //     "ROTAVIRUS-PREVIENE DIARREAS GRAVES EN LACTANTES Y NIÑOS PEQUEÑOS-2RA DOSIS",
    // },
    {
      codigo: "90670",
      // nombre: "Neumococo1",
      nombre: "NEUMOCOCO",
      descripcion:
        "NEUMOCOCO-PREVIENE LA OTITIS, SEPSIS, MENINGITIS Y NEUMONÍAS GRAVES-1RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "Neumococo2",
    //   descripcion:
    //     "NEUMOCOCO-PREVIENE LA OTITIS, SEPSIS, MENINGITIS Y NEUMONÍAS GRAVES-2DA DOSIS",
    // },
    // {
    //   codigo:'',
    //   nombre: "Neumococo3",
    //   descripcion:
    //     "NEUMOCOCO-PREVIENE LA OTITIS, SEPSIS, MENINGITIS Y NEUMONÍAS GRAVES-3RA DOSIS",
    // },
    {
      codigo: "90657",
      // nombre: "Influenza1",
      nombre: "INFLUENZA",
      descripcion: "INFLUENZA-VACUNA CONTRA LA INFLUENZA-1RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "Influenza2",
    //   descripcion: "INFLUENZA-VACUNA CONTRA LA INFLUENZAL-2DA DOSIS",
    // },
    {
      codigo: "90707",
      // nombre: "SPR1",
      nombre: "SPR",
      descripcion:
        "SPR-VACUNA PREVIENE SARAMPIÓN, PAROTIDITIS O PAPERA Y RUBÉOLA-1RA DOSIS",
    },
    // {
    //   codigo:'',
    //   nombre: "SPR1R",
    //   descripcion:
    //     "SPR-VACUNA PREVIENE SARAMPIÓN, PAROTIDITIS O PAPERA Y RUBÉOLA-1ER REFUERZO",
    // },
    {
      codigo: "90717",
      nombre: "AMA",
      descripcion:
        "VACUNA ANTIAMARÍLICA-PREVIENE DEL VIRUS CAUSANTE DE LA FIEBRE AMARILLA",
    },
    {
      codigo: "90701",
      // nombre: "DPT1R",
      nombre: "DPT",
      descripcion:
        "DPT-VACUNA PREVENTIVA PARA LA DIFTERIA, TOS CONVULSIVA Y TÉTANOS-1ER REFUERZO",
    },
    // {
    //   codigo:'',
    //   nombre: "DPT2R",
    //   descripcion:
    //     "DPT-VACUNA PREVENTIVA PARA LA DIFTERIA, TOS CONVULSIVA Y TÉTANOS-2DO REFUERZO",
    // },
  ];
  valor: string = "";
  data: dato;
  nroDNI: string;
  stateOptions: any[];
  listaInmunizaciones: inmunizaciones[] = [];
  inmunizacionesAgrupadas = [[], [], [], [], [], [], [], [], [], []];
  collapse: boolean[] = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  mesActual: number;
  mes: number;
  dia: number;
  anio: number;

  constructor(
    private inmunizacionesService: InmunizacionesService,
    private messageService: MessageService,
    private rutaActiva: ActivatedRoute,
    public dialogService: DialogService
  ) {
    this.data = <dato>JSON.parse(localStorage.getItem("documento"));
    this.mesActual = this.data.anio * 12 + this.data.mes;
    this.mes = this.data.mes;
    this.dia = this.data.dia;
    this.anio = this.data.anio;
  }

  ngOnInit() {
    this.nroDNI = this.data.nroDocumento;
    this.getListaInmunizaciones();
  }
  toDate() {
    this.listaInmunizaciones.sort((a, b) => {
      if (a.fechaTentativa < b.fechaTentativa) return 1;
      if (a.fechaTentativa > b.fechaTentativa) return -1;
      return 0;
    });
    this.listaInmunizaciones.forEach((element) => {
      element.fechaTentativa = new Date(`${element.fechaTentativa} 00:00:00`);
      element.fechaAdministracion =
        element.fechaAdministracion != null
          ? new Date(`${element.fechaAdministracion} 00:00:00`)
          : null;
    });
  }
  nombreVacuna(nombre: string) {
    return nombre.split("-")[0];
  }
  edadMes: number[] = [];
  clasificamos() {
    console.log("toda la lista ordenada", this.listaInmunizaciones);
    //[0,1,2,4,6,7,12,15,18,96]
    this.listaInmunizaciones.forEach((element) => {
      let isInclude = this.edadMes.find((elemento) => {
        return elemento == element.edadMes;
      });
      if (isInclude == null) {
        this.edadMes.push(element.edadMes);
      }
    });
    // desglosamos/
    this.listaInmunizaciones.forEach((element, index) => {
      let mes = element.edadMes;
      let posicion = this.edadMes.indexOf(mes);
      this.inmunizacionesAgrupadas[posicion].push(element);
    });
  }
  determinamosCodigoSis() {
    this.listaInmunizaciones.forEach((items) => {
      const nombreVacuna = (items.nombre.split(/\d/)[0]).toLocaleUpperCase();
      const coincidenciaVacuna = this.listaVacunasCodigos.find(
        (items) => nombreVacuna == items.nombre
      );
      console.log('vacuna',nombreVacuna);
      
      items.codigoSis = coincidenciaVacuna.codigo;
      // items.nombre=coincidenciaVacuna.nombre
    });
    console.log("mape", this.listaInmunizaciones);
  }
  getListaInmunizaciones() {
    this.inmunizacionesService
      .getListaInmunizaciones(this.nroDNI)
      .subscribe((resp) => {
        this.inmunizacionesAgrupadas = [[], [], [], [], [], [], [], [], [], []];
        this.listaInmunizaciones = resp["object"];
        this.determinamosCodigoSis();
        this.toDate();
        this.clasificamos();
      });
  }

  agregarVacuna(vacuna: inmunizaciones, nombre) {
    console.log("vacuna", vacuna);

    const ref = this.dialogService.open(TratamientoInmunizacionModalComponent, {
      data: vacuna,
      header: `Agregar Vacuna ${nombre} Dosis numero (${vacuna.dosis})`,
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      // autoZIndex:false,
      // baseZIndex:1,
      // dismissableMask:true,
      // rtl:false,
      // closable:false
    });
    ref.onClose.subscribe((mensaje) => {
      if (mensaje == "agregado") {
        this.getListaInmunizaciones();
        this.messageService.add({
          severity: "success",
          summary: "Exito",
          detail: "inmunizacion Registrada satisfactoriamente",
        });
      } else {
        // this.messageService.add({severity:'error', summary: 'warn', detail:'NO SE registro ninguna inmunizacion'});
      }
    });
  }
}