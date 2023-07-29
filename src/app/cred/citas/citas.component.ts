import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ObstetriciaGeneralService } from "../../obstetricia-general/services/obstetricia-general.service";
import { CitasService } from "../../obstetricia-general/services/citas.service";
import { PacienteService } from "../../core/services/paciente/paciente.service";
import { MessageService } from "primeng/api";
import { CuposService } from "../../core/services/cupos.service";
import { DocumentoIdentidadService } from "../../mantenimientos/services/documento-identidad/documento-identidad.service";
import { dato } from "src/app/cred/citas/models/data";
import Swal from "sweetalert2";
import { nino } from "src/app/login/model/login.interface";

export interface userCita {
  dni: string;
  tipoDoc: string;
  nroDoc: string;
  apellidos: string;
  nombres: string;
  consultorio: string;
  horario: string;
  fecha: string;
}

@Component({
  selector: "app-citas",
  templateUrl: "./citas.component.html",
  styleUrls: ["./citas.component.css"],
  providers: [DialogService],
})
export class CitasComponent implements OnInit {
  attributeLocalS = "documento";
  idIpress = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
  iprees: string = JSON.parse(localStorage.getItem("usuario")).ipress
    .nombreEESS;
  nroDocumento: string = JSON.parse(localStorage.getItem("usuario"))
    .nroDocumento;
  tipoDocumento: string = JSON.parse(localStorage.getItem("usuario"))
    .tipoDocumento;
  options: data[];
  selectedOption: data;
  citas: any[] = [];
  //-->
  citasFG: FormGroup;
  loading: boolean = true;
  //   cuposList: any[];
  cuposList: nino[]=[];
  nino: nino;

  dataCitas: any;
  datePipe = new DatePipe("en-US");
  fechaActual = new Date();
  tipoDocList: any;
  TipoDoc: string = "DNI";
  DataCuposPaciente: any;
  data = JSON.parse(localStorage.getItem("usuario")).nino;
  fecha = new Date();

  constructor(
    private obstetriciaGeneralService: ObstetriciaGeneralService,
    private obstetriciaService: ObstetriciaGeneralService,
    private citasService: CitasService,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private messageService: MessageService,
    private cuposService: CuposService,
    private documentoIdentidadService: DocumentoIdentidadService
  ) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.getDocumentosIdentidad();
    this.buscarCuposPorPersonal();
    this.cuposList.push(this.data);
  }
  buscarCuposPorPersonal() {
    const inputRequest = {
      tipoDoc: this.tipoDocumento,
      nroDoc: this.nroDocumento,
      fecha: this.datePipe.transform(
        this.citasFG.value.fechaBusqueda,
        "yyyy-MM-dd"
      ),
      servicio: "ATENCION INTEGRAL DEL NINO",
    };
    // this.cuposService
    //   .buscarListaCuposPersonal(this.idIpress, inputRequest)
    //   .then((resp: any) => {
    //         this.cuposList = resp.object;
    //         this.loading = false;
    //   }).catch((error)=>{
    //     this.cuposList=[]
    //   });
  }
  buildForm() {
    this.citasFG = this.fb.group({
      fechaBusqueda: new FormControl(
        { value: new Date(), disabled: false },
        Validators.required
      ),
      tipoDoc: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      nroDoc: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
    });
  }
  /**Lista los tipos de documentos de Identidad de un paciente**/
  getDocumentosIdentidad() {
    this.documentoIdentidadService
      .getDocumentosIdentidad()
      .subscribe((res: any) => {
        this.tipoDocList = res.object;
        this.citasFG.get("tipoDoc").setValue(this.tipoDocList[0].abreviatura);
      });
  }

  /**Busca un paciente por le numero de documento**/
  /*  getPacientesXnroDocumento() {
    let data = {
      tipoDoc: this.citasFG.value.tipoDoc,
      nroDoc: this.citasFG.value.nroDoc,
    };
    this.pacienteService.getPacienteByNroDoc(data).subscribe((res: any) => {
      this.dataPaciente = [res.object];
      if (this.dataPaciente == null) {
        this.showInfoPaciente();
      } else {
        this.showSuccess();
      }
    });
  } */

  /**Busca un cupo por el numero de dni de un paciente**/
  buscarCupoXdniFecha() {
    if (this.citasFG.get("nroDoc").value.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Ingrese nro Documento",
        text: "",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    const inputRequest = {
      tipoDoc: this.citasFG.value.tipoDoc,
      nroDoc: this.citasFG.value.nroDoc.trim(),
      fecha: this.datePipe.transform(
        this.citasFG.value.fechaBusqueda,
        "yyyy-MM-dd"
      ),
    };
    // this.cuposService
    //   .buscarCupoPorDniFechaIpress(this.idIpress, inputRequest)
    //   .then((resp: any) => {
    //     this.cuposList = [];
    //     this.cuposList.push(resp.object);
    //   })
    //   .catch((error) => {});
  }

  enviarData(event) {
    this.obstetriciaGeneralService.tipoDoc = null;
    this.obstetriciaGeneralService.nroDoc = null;
    // this.obstetriciaGeneralService.observable$.emit(event.id);
    this.obstetriciaGeneralService.tipoDoc = event.paciente.tipoDoc;
    this.obstetriciaGeneralService.nroDoc = event.paciente.nroDoc;

    let data: dato = {
      nroDocumento: event.paciente.nroDoc,
      tipoDoc: event.paciente.tipoDoc,
      idConsulta: "",
      sexo: "",
    };
    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
  }
}

interface data {
  name: string;
  code: number;
}
