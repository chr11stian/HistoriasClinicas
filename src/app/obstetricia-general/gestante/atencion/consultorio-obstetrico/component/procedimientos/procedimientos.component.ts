import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ConsultasService } from "../../services/consultas.service";
import Swal from "sweetalert2";
import { MessageService } from "primeng/api";
import { ModalProcedimientosComponent } from './modal-procedimientos/modal-procedimientos.component';
import { IpressFarmaciaService } from 'src/app/modulos/ipress-farmacia/services/ipress-farmacia.service';
import { Procedure, ProcedureFUA, ProcedureHIS, ProcedurePrestation, ProceduresSave } from 'src/app/cred/citas/atencion-cred/consulta-principal/models/FUAHIS';
import { DiagnosticoConsultaService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/diagnostico-consulta.service';
import { UpsAuxIpressService } from 'src/app/mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css'],
  providers: [DialogService]
})
export class ProcedimientosComponent implements OnInit {

  ref: DynamicDialogRef;

  /*campos para procedimientos*/
  procedimientos: any[] = [];
  dataProcedimientos: any;
  private nroFetos: number = 0;
  /********datos para poder calcular EVAL. nutricional valor e indicador*************/
  private talla: number;
  private imc: number;
  private pesoHabitual: number;
  private pesoActual: number;
  private indicador: '';
  /*****/
  dataConsulta: any;

  idConsulta: string;
  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  nroEmbarazo: string;
  nroHcl: string;

  Gestacion: any;
  dataPaciente2: any;
  estadoEdicion: Boolean;

  nroAtencion: any;
  renIpress: any;

  medicamentosConDatos: any[] = [];
  listaMedicamentos: any;
  codMedicamento: any;
  aux: any;

  diagnosticosList: any[] = [];
  resumen: any[] = [];
  resumenPendientes: any[] = [];

  /** New Vars */
  arrayDiagnosticType: any[] = [];
  arrayUPS: UPS[] = [];
  arrayUPSAux: UPSaux[] = [];
  arrayProcedureHIS: ProcedureHIS[] = [];
  arrayProcedureSIS: ProcedureFUA[] = [];
  arrayPrestationCode: ProcedurePrestation[] = [];
  listProcedures: Procedure[] = [];
  arrayProcedureSave: ProceduresSave[] = [];
  isSaved: boolean = false;
  idIpress: string;
  listaDeCIEHIS: any[] = [];
  patientData: Patient;

  fuaForm: FormGroup;
  hisForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private messageService: MessageService,
    private tratamientoService: ConsultasService,
    private farmaciaService: IpressFarmaciaService,
    private DiagnosticoService: DiagnosticoConsultaService,
    private UpsAuxService: UpsAuxIpressService,
    private cieService: CieService,
  ) {
    //this.buildForm();

    /*********RECUPERAR DATOS*********/
    this.renIpress = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    // console.log("renipress", this.renIpress)
    console.log('dataa de la ipressssssssssssssssss ', this.renIpress);
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    /*usando local storage*/
    this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
    this.patientData = JSON.parse(localStorage.getItem('datacupos')).paciente;

    //estado para saber que estado usar en consultas
    this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

    console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
    console.log("gestacion desde datos generales", this.Gestacion);

    if (this.Gestacion == null) {
      this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
      this.nroDocRecuperado = this.dataPaciente2.nroDoc;
      this.idConsulta = JSON.parse(localStorage.getItem('idGestacionRegistro'));
      this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
      this.nroHcl = this.dataPaciente2.nroHcl;

    } else {
      this.tipoDocRecuperado = this.Gestacion.tipoDoc;
      this.nroDocRecuperado = this.Gestacion.nroDoc;
      this.idConsulta = this.Gestacion.id;
      this.nroEmbarazo = this.Gestacion.nroEmbarazo;
      this.nroHcl = this.Gestacion.nroHcl;
    }
    if (!this.estadoEdicion) {
      //guardar en el ls el nroAtencion
      let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaNueva'));
      this.nroAtencion = nroAtencion;
      console.log("entre a nueva consulta", this.nroAtencion)
    }
    else {
      let nroAtencion = JSON.parse(localStorage.getItem('nroConsultaEditar'));
      this.nroAtencion = nroAtencion;
      console.log("entre a edicion consulta", this.nroAtencion)
    }
    this.arrayDiagnosticType = [
      { label: "DEFINITIVO", value: "D" },
      { label: "PRESUNTIVO", value: "P" },
      { label: "REPETITIVO", value: "R" },
    ];
    this.idConsulta = JSON.parse(localStorage.getItem('IDConsulta'));
    //this.recuperarDatos();
    this.buildForm();
    this.traerDiagnosticosDeConsulta();
    this.traerListaResumen();
    this.traerListaResumenPendientes();
    // this.recuperarProcedimientos();
    // this.recuperarProcedimientos();
    this.recuperarUpsHis();
    this.recuperarUpsAuxHis();
    this.recoverPrestationData();
    this.recoverSavedProcedureData();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.fuaForm = new FormGroup({
      prestacion: new FormControl("", Validators.required),
      tipoDiagnosticoSIS: new FormControl("", Validators.required),
      buscarPDxSIS: new FormControl(""),
      codProcedimientoSIS: new FormControl("", Validators.required),
      procedimientoSIS: new FormControl("", Validators.required),
    })
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

  traerListaResumen() {
    let data = {
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.tratamientoService.listarResumen(data).then((res: any) => {
      this.resumen = res.object;
      console.log("resumen:", this.resumen);
    })
  }
  traerListaResumenPendientes() {
    let data = {
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.tratamientoService.listaResumenPendientes(data).then((res: any) => {
      this.resumenPendientes = res.object;
      console.log("resumenPendientes:", this.resumenPendientes);
    })
  }
  traerDiagnosticosDeConsulta() {
    this.tratamientoService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }

  recuperarNroFetos() {
    let idData = {
      id: this.idConsulta
    }
    this.tratamientoService.getUltimaConsultaById(idData).subscribe((res: any) => {
      this.nroFetos = res.object.nroFetos;
      this.pesoHabitual = parseFloat(res.object.pesoHabitual);
      this.talla = parseFloat(res.object.talla);
      this.imc = parseFloat(res.object.imc);
    })
  }
  /*DATOS RECIBIDOS DE PROCEDIMIENTOS*/
  openDialogProcedimiento() {
    this.ref = this.dialog.open(ModalProcedimientosComponent, {
      header: "PROCEDIMIENTOS",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
    });
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal PROCEDIMIENTOS", data)
      this.recuperarProcedimientos();
      this.traerListaResumenPendientes();
    });
  }
  openDialogProcedimientoConsejeria(nombre) {
    this.ref = this.dialog.open(ModalProcedimientosComponent, {
      header: "PROCEDIMIENTOS",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
      data: nombre
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal PROCEDIMIENTOS", data)
      this.recuperarProcedimientos();
      this.traerListaResumenPendientes();
    })
  }
  openDialogEditarProcedimiento(row, index) {
    let aux = {
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalProcedimientosComponent, {
      header: "PROCEDIMIENTOS",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal PROCEDIMIENTOS ', data)
      this.recuperarProcedimientos();
    })
  }
  eliminarProcedimiento(codProcedimientoHIS) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientoService.eliminarProcedimientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, codProcedimientoHIS).subscribe(
          (resp) => {
            this.recuperarProcedimientos();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: '',
              showConfirmButton: false,
              timer: 1500
            })
          }
        );
      }
    })
  }

  async recuperarProcedimientos() {
    await this.tratamientoService.listarProcedimientosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.procedimientos = res.object;
    })
  }
  /** NEW  */
  recoverPrestationData(): void {
    this.DiagnosticoService.getPrestationPerIdConsulta(this.idConsulta).then(res => {
      let hash: any = {}
      this.arrayPrestationCode = res.object;
      this.arrayPrestationCode = this.arrayPrestationCode.filter(item => hash[item.codPrestacion] ? false : hash[item.codPrestacion] = true);
    });
  }
  onChangePrestacion() {
    let prestation = this.fuaForm.value.prestacion;
    this.listProcedures = prestation.procedimientos;
    console.log('lista de proced ', this.listProcedures);
  }

  selectDxSIS(event) {
    this.fuaForm.patchValue({
      procedimientoSIS: event.value.procedimiento,
      codProcedimientoSIS: event.value,
      buscarPDxSIS: ""
    });
  }

  selectedOption(event: any) {
    this.fuaForm.patchValue({
      procedimientoSIS: event.value.procedimiento,
    });
  }

  recuperarUpsHis() {
    let data = {
      idIpress: this.idIpress,
      edad: this.patientData.edadAnio,
      sexo: this.patientData.sexo,
    };
    this.DiagnosticoService.listaUpsHis(data).then(
      (res: any) => (this.arrayUPS = res.object)
    );
  }
  /** Servicios para recuperar lista de ups Aux por ipress***/
  recuperarUpsAuxHis() {
    this.UpsAuxService.getUpsAuxPorIpress(this.idIpress).subscribe(
      (r: any) => {
        if (r.object != null) {
          this.arrayUPSAux = r.object.filter(
            (element) => element.estado == true
          );
        }
      }
    );
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
        this.hisForm.reset();
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
    this.tratamientoService.postAddProcedures(this.idConsulta, this.arrayProcedureSave).then((res: any) => {
      if (res.cod == '2001') {
        Swal.fire({
          icon: 'success',
          title: 'Se guardo exitosamente',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      }
      if (res.cod == '2126') {
        Swal.fire({
          icon: 'success',
          title: 'Se actualizó exitosamente',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudoo guardar.',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  confirmSave() {
    Swal.fire({
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      icon: this.isSaved ? 'info' : 'question',
      title: this.isSaved ? 'Actualizar' : 'Guardar',
      text: this.isSaved ? '¿Esta seguro que desea actualizar procedimientos?' : '¿Esta seguro que desea guardar los diagnosticos?',
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

  recoverSavedProcedureData(): void {
    // this.tratamientoService.listarProcedimientosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion)
    this.tratamientoService.getListProceduresSaved(this.idConsulta).then((res: any) => {
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

  deleteItemOfArray(index: number, type: number): void {
    /**type:0=> lista de diagnosticos FUA; 1=> lista de diagnosticos HIS */
    type == 0 ? this.arrayProcedureSIS.splice(index, 1) : this.arrayProcedureHIS.splice(index, 1);
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

interface UPS {
  codUPS: string;
  nombreUPS: string;
}
interface UPSaux {
  estado: boolean;
  nombre: string;
}
interface Lista {
  label: string;
  value: string;
}
interface DataSave {
  procedimientos: ProceduresSave[];
}
interface Patient {
  apellidos: string,
  edadAnio: number,
  edadDia: number,
  edadMes: number,
  nombre: string,
  nroDoc: string,
  nroHcl: string,
  nroTelefono: string,
  sexo: string,
  tipoDoc: string,
}