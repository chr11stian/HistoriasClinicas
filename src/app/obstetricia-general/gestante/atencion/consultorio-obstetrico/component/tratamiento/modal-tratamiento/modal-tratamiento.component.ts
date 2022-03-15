import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ObstetriciaGeneralService } from "../../../../../../services/obstetricia-general.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { ConsultasService } from '../../../services/consultas.service';
import { MedicamentosService } from 'src/app/mantenimientos/services/medicamentos/medicamentos.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-modal-tratamiento',
  templateUrl: './modal-tratamiento.component.html',
  styleUrls: ['./modal-tratamiento.component.css']
})
export class ModalTratamientoComponent implements OnInit {
  formTratamientoComun: FormGroup;
  dataTratamientosComunes:any[]=[];
  viaadministracionList: any[];
  dialogInmunizaciones = false;
  dataInmunizaciones: any[] = [];
  idObstetricia: string;
  datePipe = new DatePipe('en-US');

  intervaloList: any[];

  listaDeCIE: any;
  listaDeCIESIS: any;
  prestacionList: any[];

  listaMedicamentos: any;
  tiposDosis: any[];

  diagnosticosList: any;

  idConsulta: string;
  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  nroEmbarazo: string;
  nroHcl: string;

  Gestacion: any;
  dataPaciente2: any;
  estadoEdicion: Boolean;

  nroAtencion: any;
  idIpress: any;

  idEdicion: any;
  constructor(private form: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private PrestacionService: PrestacionService,
    private CieService: CieService,
    private DxService: ConsultasService,
    private MedicamentosService: MedicamentosService,
    private messageService: MessageService) {

    //this.idObstetricia = this.obstetriciaGeneralService.idGestacion;

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log("ipress", this.idIpress)

    /*********RECUPERAR DATOS*********/
    /*usando local storage*/
    this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));

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

    console.log(config.data);
    this.buildForm();

    this.recuperarPrestaciones();
    this.traerDiagnosticosDeConsulta();

    if (config.data) {
      this.llenarCamposTratamientoInmunizaciones();
    }

    this.intervaloList = [
      {label: 'CADA 4 HORAS', value: 'CADA 4 HORAS'},
      {label: 'CADA 5 HORAS', value: 'CADA 5 HORAS'},
      {label: 'CADA 6 HORAS', value: 'CADA 6 HORAS'},
      {label: 'CADA 8 HORAS', value: 'CADA 8 HORAS'},
      {label: 'CADA 12 HORAS', value: 'CADA 12 HORAS'},
      {label: 'CADA 24 HORAS', value: 'CADA 24 HORAS'},
      {label: 'CONDICIONAL A FIEBRE', value: 'CONDICIONAL A FIEBRE'},
      {label: 'DOSIS UNICA', value: 'DOSIS UNICA'},
      {label: 'CADA 48 HORAS', value: 'CADA 48 HORAS'}
    ];
  }

  ngOnInit(): void {

  }

  buildForm() {
    this.formTratamientoComun = this.form.group({
      diagnostico: new FormControl("", [Validators.required]),
      prestacion: new FormControl("", [Validators.required]),

      nombre: new FormControl("", [Validators.required]),
      stock: new FormControl("", [Validators.required]),
      cantidad: new FormControl("", [Validators.required]),
      dosis: new FormControl("", [Validators.required]),
      intervalo: new FormControl("", [Validators.required]),
      duracion: new FormControl("", [Validators.required]),
      fechaVencimiento: new FormControl("", [Validators.required]),
      observaciones: new FormControl("", [Validators.required]),

      efectosMedicamento: new FormControl("", [Validators.required]),
      instrucciones: new FormControl("", [Validators.required]),
      advertencias: new FormControl("", [Validators.required]),
      otrasIndicaciones: new FormControl("", [Validators.required]),
    })
  }
  openNew() {
    this.formTratamientoComun.reset();
    this.dialogInmunizaciones = true;
  }
  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formTratamientoComun.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
      this.formTratamientoComun.patchValue({ prestacion: res.object.descripcion });
    })
  }
  async enviarTratamientoInmunizaciones() {
    var data = {
      nombre: this.formTratamientoComun.value.nombre.nombre,
      nombreComercial: this.formTratamientoComun.value.nombreComercial,
      dosis: this.formTratamientoComun.value.dosis,
      tipoDosis: this.formTratamientoComun.value.tipoDosis,
      codPrestacion: this.formTratamientoComun.value.diagnostico.codPrestacion,
      codProcedimientoSIS: this.formTratamientoComun.value.SISCIE.codigo,
      cie10SIS: this.formTratamientoComun.value.diagnostico.cie10SIS,
      codProcedimientoHIS: this.formTratamientoComun.value.HISCIE.codigoItem,
      idIpressSolicitante: this.idIpress,
      pertenecePAICRED: false,
      datosPaciente: {
        tipoDoc: this.tipoDocRecuperado,
        nroDoc: this.nroDocRecuperado
      }
    }

    console.log(data);

    await this.DxService.guardarInmunizacionGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
      this.dialogInmunizaciones = false;
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Solicitud de inmunización guardada correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
    })

  }
  async enviarEdicionTratamientoInmunizacion() {
    var data = {
      id: this.idEdicion,
      nombre: this.formTratamientoComun.value.nombre.nombre,
      nombreComercial: this.formTratamientoComun.value.nombreComercial,
      dosis: this.formTratamientoComun.value.dosis,
      tipoDosis: this.formTratamientoComun.value.tipoDosis,
      codPrestacion: this.formTratamientoComun.value.diagnostico.codPrestacion,
      codProcedimientoSIS: this.formTratamientoComun.value.SISCIE.codigo,
      cie10SIS: this.formTratamientoComun.value.diagnostico.cie10SIS,
      codProcedimientoHIS: this.formTratamientoComun.value.HISCIE.codigoItem,
      idIpressSolicitante: this.idIpress,
      pertenecePAICRED: false,
      datosPaciente: {
        tipoDoc: this.tipoDocRecuperado,
        nroDoc: this.nroDocRecuperado
      }
    }

    console.log(data);

    await this.DxService.editarInmunizacionGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
      this.dialogInmunizaciones = false;
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Solicitud de inmunización guardada correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.dialogInmunizaciones = false;
  }
  llenarCamposTratamientoInmunizaciones() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      let configuracion = this.config.data.row;
      this.idEdicion = configuracion.id;
      this.filterMedicamento(configuracion)
      this.MedicamentosService.searchMedicamento(configuracion.nombre.slice(0, 6)).subscribe((res: any) => {
        this.formTratamientoComun.patchValue({ "nombre": res.object[0] });
      })
      this.formTratamientoComun.get("nombreComercial").setValue(configuracion.nombreComercial);
      this.formTratamientoComun.get("dosis").setValue(configuracion.dosis);
      this.formTratamientoComun.get("tipoDosis").setValue(configuracion.tipoDosis);
      this.formTratamientoComun.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formTratamientoComun.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.listaDeCIESIS = res.object.procedimientos;
        this.formTratamientoComun.patchValue({ prestacion: res.object.descripcion });
        this.formTratamientoComun.patchValue({ diagnosticoSIS: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS).procedimiento });
        this.formTratamientoComun.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS) });
        this.formTratamientoComun.patchValue({ autocompleteSIS: "" });
      })
      this.CieService.getCIEByDescripcion(configuracion.codProcedimientoHIS).subscribe((res: any) => {
        this.listaDeCIE = res.object;
        this.formTratamientoComun.patchValue({ HISCIE: this.listaDeCIE.find(elemento=> elemento.codigoItem == configuracion.codProcedimientoHIS) });
        this.formTratamientoComun.get("diagnosticoHIS").setValue(this.listaDeCIE.find(elemento=> elemento.codigoItem == configuracion.codProcedimientoHIS).descripcionItem);
      })
      
    })

  }
  async closeDialogGuardar() {
    await this.config.data ?
      this.enviarEdicionTratamientoInmunizacion().then((res)=>this.ref.close())
      :
      this.enviarTratamientoInmunizaciones().then((res)=>this.ref.close())
    
  }

  closeDialog() {
    this.ref.close();
  }
  recuperarPrestaciones() {
    this.DxService.getPrestaciones().subscribe((res: any) => {
      this.prestacionList = res.object;
      console.log("prestaciones:", this.prestacionList);
    })
  }

  filterMedicamento(event) {
    this.MedicamentosService.searchMedicamento(event.query).subscribe((res: any) => {
      this.listaMedicamentos = res.object
    })
  }

  selectedOptionNameMedicamento(event) {
    console.log('lista de medicamentos ', this.listaMedicamentos);
    console.log('evento desde medicamentos ', event);
    this.formTratamientoComun.patchValue({ nombreComercial: event.nombreComercial }, { emitEvent: false });
  }

}

