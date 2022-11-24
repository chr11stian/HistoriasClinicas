import { Component, OnInit } from '@angular/core';
import { dato } from "../../../../../cred/citas/models/data";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CieService } from "../../../../../obstetricia-general/services/cie.service";
import { UpsAuxIpressService } from "../../../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import { MessageService } from "primeng/api";
import Swal from "sweetalert2";
import { DiagnosticosService } from "../../../../services/diagnosticos/diagnosticos.service";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { DatosGeneralesService } from "../../../../services/datos-generales/datos-generales.service";
import { Procedure, ProcedureFUA, ProcedureHIS, ProcedurePrestation, ProceduresSave } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/FUAHIS';

@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {
  selectedProducts: resultados[];
  tablaResumenDx: resultados[] = [];
  attributeLocalS = 'documento';
  dataConsulta: dato;
  id: string = "";
  itemEdit: number = -1;
  isUpdate: boolean = false;

  loading: boolean = true;
  idIpress: string = "";

  formProcedimiento: FormGroup;
  procedimientoDialog: boolean;
  procedimientos: procedimiento[] = [];

  contador: number = 0;
  hayDatos: boolean = false;
  checked: boolean = false;

  ListaPrestacion: any[] = [];
  listaDeCIEHIS: any[] = [];
  listaDeCIESIS: any[] = [];
  listaDeProcedimientos: any[] = [];
  listaUpsHis: any[] = [];
  listaUpsAuxHis: any[] = [];
  listaDiagnosticos: any[] = [];
  tipoList: any[] = [];


  fuaForm: FormGroup;
  hisForm: FormGroup;
  arrayDiagnosticType: any[] = [];
  arrayUPS: UPS[] = [];
  arrayUPSAux: UPSaux[] = [];
  arrayProcedureSIS: ProcedureFUA[] = [];
  arrayProcedureHIS: ProcedureHIS[] = [];
  arrayPrestationCode: ProcedurePrestation[] = [];
  listProcedures: Procedure[] = [];
  arrayProcedureSave: ProceduresSave[] = [];
  isSaved: boolean = false;

  constructor(private PrestacionService: PrestacionService,
    private ConsultaService: DatosGeneralesService,
    private formBuilder: FormBuilder,
    private cieService: CieService,
    private UpsAuxService: UpsAuxIpressService,
    private messageService: MessageService,
    private DiagnosticoService: DiagnosticosService) {
    this.buildForm();
    this.dataConsulta = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    this.arrayDiagnosticType = [
      { label: "DEFINITIVO", value: "D" },
      { label: "PRESUNTIVO", value: "P" },
      { label: "REPETITIVO", value: "R" },
  ];
  }

  ngOnInit(): void {
    this.recoverPrestationData();
    this.recoverSavedProcedureData();
  }
  buildForm() {
    this.fuaForm = new FormGroup({
      prestacion: new FormControl("", Validators.required),
      tipoDiagnosticoSIS: new FormControl("", Validators.required),
      buscarPDxSIS: new FormControl(""),
      codProcedimientoSIS: new FormControl("", Validators.required),
      procedimientoSIS: new FormControl("", Validators.required),
    });
    this.hisForm = new FormGroup({
      nombreUPS: new FormControl("", Validators.required),
      nombreUPSaux: new FormControl("", Validators.required),
      tipoDiagnosticoHIS: new FormControl("", Validators.required),
      lab: new FormControl(""),
      buscarPDxHIS: new FormControl(""),
      codProcedimientoHIS: new FormControl("", Validators.required),
      procedimientoHIS: new FormControl("", Validators.required),
    })
  }

  selectDxSIS(event) {
    // console.log(this.formProcedimiento.value.buscarPDxSIS);
    this.fuaForm.patchValue({
      procedimientoSIS: event.value.procedimiento,
      codProcedimientoSIS: event.value,
      buscarPDxSIS: ""
    });
  }
  filterCIE10(event: any) {
    this.cieService
      .getCIEByDescripcion(event.query)
      .subscribe((res: any) => {
        this.listaDeCIEHIS = res.object;
      });
  }

  selectedDxHIS(event: any) {
    this.hisForm.patchValue({
      procedimientoHIS: event.descripcionItem,
      buscarPDxHIS: "",
      codProcedimientoHIS: event
    });
  }

  selectedOption(event: any) {
    this.formProcedimiento.patchValue({
      procedimientoSIS: event.value.procedimiento,
    });
  }

  recoverPrestationData(): void {
    this.DiagnosticoService.getPrestationPerIdConsulta(this.dataConsulta.idConsulta).then(res => {
      let hash: any = {};
      this.arrayPrestationCode = res.object;
      this.arrayPrestationCode = this.arrayPrestationCode.filter(item => hash[item.codPrestacion] ? false : hash[item.codPrestacion] = true);
    });
  }

  onChangePrestacion() {
    let prestation = this.fuaForm.value.prestacion;
    this.listProcedures = prestation.procedimientos;
  }

  agregateProcedureSIS(): void {
    let isAdded: boolean = false;
    if (this.fuaForm.valid) {
      let procedureSIS: ProcedureFUA = {
        codPrestacion: this.fuaForm.value.prestacion.codPrestacion,
        tipoDiagnostico: this.fuaForm.value.tipoDiagnosticoSIS,
        procedimientoSIS: this.fuaForm.value.procedimientoSIS,
        cie10SIS: this.fuaForm.value.codProcedimientoSIS.codigo,
        codProcedimientoSIS: this.fuaForm.value.codProcedimientoSIS.codigo,
      }
      this.arrayProcedureSIS.forEach(item => {
        if (item.cie10SIS === procedureSIS.cie10SIS) {
          isAdded = true;
          this.repeatDataMessage();
        }
      })
      if (!isAdded) {
        this.arrayProcedureSIS.push(procedureSIS);
        this.fuaForm.reset();
      }
    } else
      this.missDataMessage();
  }

  agregateProcedureHIS(): void {
    let isAdded: boolean = false;
    if (this.hisForm.valid) {
      let HISprocedure: ProcedureHIS = {
        nombreUPS: this.hisForm.value.nombreUPS.nombreUPS,
        nombreUPSaux: this.hisForm.value.nombreUPSaux.nombre,
        tipoDiagnostico: this.hisForm.value.tipoDiagnosticoHIS,
        lab: this.hisForm.value.lab,
        codProcedimientoHIS: this.hisForm.value.codProcedimientoHIS.codigoItem,
        procedimientoHIS: this.hisForm.value.procedimientoHIS,
      }
      this.arrayProcedureHIS.forEach(item => {
        if (item.codProcedimientoHIS === HISprocedure.codProcedimientoHIS) {
          isAdded = true;
          this.repeatDataMessage();
        }
      });
      if (!isAdded) {
        this.arrayProcedureHIS.push(HISprocedure);
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
  mergeArrayProcedures(procedimientoSIS: ProcedureFUA[], procedimientoHIS: ProcedureHIS[], procedimientos: ProceduresSave[]) {
    procedimientoSIS.forEach(item => {
      let auxProcedure: ProceduresSave = {
        procedimientoSIS: item.procedimientoSIS,
        codProcedimientoSIS: item.codProcedimientoSIS,
        codPrestacion: item.codPrestacion,
        cie10SIS: item.cie10SIS,
        procedimientoHIS: null,
        codProcedimientoHIS: null,
        nombreUPS: null,
        nombreUPSaux: null,
        tipo: item.tipoDiagnostico,
        lab: null
      }
      procedimientos.push(auxProcedure)
    });

    procedimientoHIS.forEach(item => {
      let auxProcedure: ProceduresSave = {
        procedimientoSIS: null,
        codProcedimientoSIS: null,
        codPrestacion: null,
        cie10SIS: null,
        procedimientoHIS: item.procedimientoHIS,
        codProcedimientoHIS: item.codProcedimientoHIS,
        nombreUPS: item.nombreUPS,
        nombreUPSaux: item.nombreUPSaux,
        tipo: item.tipoDiagnostico,
        lab: item.lab
      }
      procedimientos.push(auxProcedure)
    });
  }

  saveProcedures(): void {
    this.arrayProcedureSave = []
    this.mergeArrayProcedures(this.arrayProcedureSIS, this.arrayProcedureHIS, this.arrayProcedureSave);
    if (this.arrayProcedureSave.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'No se agrego ningun procedimiento',
        text: '',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    let dataSave: DataSave = { procedimientos: [] };
    dataSave.procedimientos = this.arrayProcedureSave;
    this.DiagnosticoService.postSaveProcedure(this.dataConsulta.idConsulta, dataSave).then(res => {
      if (res.cod == '2001') {
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

  deleteItemOfArray(index: number, type: number): void {
    /**type:0=> lista de diagnosticos FUA; 1=> lista de diagnosticos HIS */
    type == 0 ? this.arrayProcedureSIS.splice(index, 1) : this.arrayProcedureHIS.splice(index, 1);
  }

  recoverSavedProcedureData(): void {
    this.DiagnosticoService.getPromiseProcedimiento(this.dataConsulta.idConsulta).then(res => {

      let dataRes: ProceduresSave[] = res.object;
      if (dataRes == null) {
        return
      }
      dataRes.forEach(item => {
        if (item.codPrestacion != null) {
          let procedure: ProcedureFUA = {
            codPrestacion: item.codPrestacion,
            cie10SIS: item.cie10SIS,
            codProcedimientoSIS: item.codProcedimientoSIS,
            procedimientoSIS: item.procedimientoSIS,
            tipoDiagnostico: item.tipo
          }
          this.arrayProcedureSIS.push(procedure);
        } else {
          let procedure: ProcedureHIS = {
            nombreUPS: item.nombreUPS,
            nombreUPSaux: item.nombreUPSaux,
            codProcedimientoHIS: item.codProcedimientoHIS,
            procedimientoHIS: item.procedimientoHIS,
            tipoDiagnostico: item.tipo,
            lab: item.lab
          }
          this.arrayProcedureHIS.push(procedure);
        }
        this.isSaved = true;
      });
    })
  }

  confirmSave() {
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
        this.saveProcedures();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No se guardo',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
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
      icon: 'info',
      title: 'Ya se agrego ese item',
      text: '',
      showConfirmButton: false,
      timer: 2000
    });
  }

}
interface resultados {
  nombre?: string,
  evaluacion?: string,
  resultado?: string
}
interface procedimiento {
  procedimientoHIS?: string,
  codProcedimientoHIS?: string,
  codProcedimientoSIS?: string,
  procedimientoSIS?: string,
  cie10SIS?: string,
  codPrestacion?: string
  resultadoFua?: string,
  lab?: string
}
interface UPS {
  codUPS: string;
  nombreUPS: string;
}
interface UPSaux {
  estado: boolean;
  nombre: string;
}
interface DataSave {
  procedimientos: ProceduresSave[];
}
