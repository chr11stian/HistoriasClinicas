import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import Swal from 'sweetalert2';
import { ConsultasService } from '../../../../services/consultas.service';

@Component({
  selector: 'app-ecografia-solicitud',
  templateUrl: './ecografia-solicitud.component.html',
  styleUrls: ['./ecografia-solicitud.component.css']
})
export class EcografiaSolicitudComponent implements OnInit {
  formEcografiaSolicitud: FormGroup;
  viaadministracionList: any[];
  dialogInmunizaciones = false;
  dataInmunizaciones: any[] = [];
  idObstetricia: string;
  datePipe = new DatePipe('en-US');

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
  listaUpsHis: any;
  listaUps: any;
  tipoList: any;
  edadPaciente: any;
  sexoPaciente: any;

  nroConsultaGuardada: any;
  constructor(private form: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private PrestacionService: PrestacionService,
    private CieService: CieService,
    private DxService: ConsultasService) {

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log("ipress", this.idIpress)

    /*********RECUPERAR DATOS*********/
    /*usando local storage*/
    this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
    this.edadPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.edadAnio;
    this.sexoPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.sexo;
    this.recuperarUpsHis();
    this.recuperarUPS();
    this.recuperarConsulta();

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
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR TIPO DX*/
    this.tipoList = [{ label: 'DEFINITIVO', value: 'D' },
    { label: 'PRESUNTIVO', value: 'P' },
    { label: 'REPETITIVO', value: 'R' },
    ];

    console.log(config.data);
    this.buildForm();

    this.recuperarPrestaciones();
    this.traerDiagnosticosDeConsulta();

    if (config.data) {
      this.llenarCamposTratamientoInmunizaciones();
    }
  }
  buildForm() {
    this.formEcografiaSolicitud = this.form.group({
      prestacion: new FormControl("", [Validators.required]),
      diagnostico: new FormControl("", [Validators.required]),
      subtipo: new FormControl("", [Validators.required]),
      lab: new FormControl("", [Validators.required]),
      autocompleteSIS: [''],
      diagnosticoSIS: new FormControl("", [Validators.required]),
      SISCIE: new FormControl("", [Validators.required]),
      autocompleteHIS: [''],
      diagnosticoHIS: new FormControl("", [Validators.required]),
      HISCIE: new FormControl("", [Validators.required]),
      ups: new FormControl("", [Validators.required]),
      subtitulo: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required]),
    })
  }
  recuperarConsulta() {
    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.nroConsultaGuardada = res.object.id;
    })
  }
  recuperarUpsHis() {
    let Data = {
      idIpress: this.idIpress,
      edad: this.edadPaciente,
      sexo: this.sexoPaciente
    }
    console.log("DATA PARA UPS HIS", Data)
    this.DxService.listaUpsHis(Data).then((res: any) => this.listaUpsHis = res.object);
  }
  recuperarUPS() {
    this.DxService.listaUps(this.idIpress).then((res: any) => this.listaUps = res.object);
    console.log("DATA PARA UPS", this.listaUps)
  }
  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  async enviarTratamientoInmunizaciones() {
    var data = {
      subTipo: "ECOGRAFIA",
      nombreExamen: "ECOGRAFIA OBSTETRICA ABDOMINAL Y EVALUACION FETA",
      codPrestacion: "009",
      codigoSIS: "76811",
      codigoHIS: "76811",
      nombreUPS: "MATERNO PERINATAL",
      nombreUPSAux: "MATERNO PERINATAL",
      tipoDX: "D",			//definitivo
      lab: "1",			//numero de ecografia, tipo string
      cie10SIS: "U4564"
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
      subTipo: "ECOGRAFIA",
      nombreExamen: "ECOGRAFIA OBSTETRICA ABDOMINAL Y EVALUACION FETA",
      codPrestacion: "009",
      codigoSIS: "76811",
      codigoHIS: "76811",
      nombreUPS: "MATERNO PERINATAL",
      nombreUPSAux: "MATERNO PERINATAL",
      tipoDX: "D",			//definitivo
      lab: "1",			//numero de ecografia, tipo string
      cie10SIS: "U4564"
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
      this.formEcografiaSolicitud.get("ups").setValue(configuracion.nombreUPS);
      this.formEcografiaSolicitud.get("subtitulo").setValue(configuracion.nombreUPSaux);
      this.formEcografiaSolicitud.get("tipo").setValue(configuracion.tipoDx);
      this.formEcografiaSolicitud.get("dosis").setValue(configuracion.dosis);
      this.formEcografiaSolicitud.get("tipoDosis").setValue(configuracion.tipoDosis);
      this.formEcografiaSolicitud.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formEcografiaSolicitud.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.listaDeCIESIS = res.object.procedimientos;
        this.formEcografiaSolicitud.patchValue({ prestacion: res.object.descripcion });
        this.formEcografiaSolicitud.patchValue({ diagnosticoSIS: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS).procedimiento });
        this.formEcografiaSolicitud.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS) });
        this.formEcografiaSolicitud.patchValue({ autocompleteSIS: "" });
      })
      this.CieService.getCIEByDescripcion(configuracion.codProcedimientoHIS).subscribe((res: any) => {
        this.listaDeCIE = res.object;
        this.formEcografiaSolicitud.patchValue({ HISCIE: this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codProcedimientoHIS) });
        this.formEcografiaSolicitud.get("diagnosticoHIS").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codProcedimientoHIS).descripcionItem);
      })

    })
  }
  recuperarPrestaciones() {
    this.DxService.getPrestaciones().subscribe((res: any) => {
      this.prestacionList = res.object;
      console.log("prestaciones:", this.prestacionList);
    })
  }
  async closeDialogGuardar() {
    await this.config.data ?
      this.enviarEdicionTratamientoInmunizacion().then((res) => this.ref.close())
      :
      this.enviarTratamientoInmunizaciones().then((res) => this.ref.close())

  }
  closeDialog() {
    this.ref.close();
  }
  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formEcografiaSolicitud.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
      this.formEcografiaSolicitud.patchValue({ prestacion: res.object.descripcion });
      this.formEcografiaSolicitud.patchValue({ diagnosticoSIS: "" });
      this.formEcografiaSolicitud.patchValue({ SISCIE: "" });
    })
  }
  filterCIE10(event) {
    this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }

  selectedOption(event, cieType) {
    if (cieType == 0) {
      this.formEcografiaSolicitud.patchValue({ diagnosticoSIS: event.value.procedimiento });
    }
    if (cieType == 1) {
      this.formEcografiaSolicitud.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }

  selectedOptionNameCIE(event, cieType) {
    console.log('lista de cie ', this.listaDeCIE);
    console.log('evento desde diagnos ', event);
    if (cieType == 0) {
      this.formEcografiaSolicitud.patchValue({ diagnosticoSIS: event.value.procedimiento });
      this.formEcografiaSolicitud.patchValue({ autocompleteSIS: "" });
      this.formEcografiaSolicitud.patchValue({ SISCIE: event.value }, { emitEvent: false });
      console.log(event.value)
    }
    if (cieType == 1) {
      this.formEcografiaSolicitud.patchValue({ diagnosticoHIS: event.descripcionItem });
      this.formEcografiaSolicitud.patchValue({ autocompleteHIS: "" });
      this.formEcografiaSolicitud.patchValue({ HISCIE: event }, { emitEvent: false });
    }
  }
  ngOnInit(): void {
  }


}

