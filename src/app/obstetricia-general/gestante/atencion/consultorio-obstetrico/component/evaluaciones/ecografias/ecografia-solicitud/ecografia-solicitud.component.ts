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
  listaSubTipos: any;

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
    this.recuperarListaSubTipos();
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
      this.llenarCamposSolicitudEcografia();
    }
    else {
      this.formEcografiaSolicitud.get('ups').setValue("OBSTETRICIA");
      this.formEcografiaSolicitud.get('subtitulo').setValue("MATERNO PERINATAL");
      this.formEcografiaSolicitud.get("tipo").setValue("D");
      this.formEcografiaSolicitud.get('autocompleteHIS').enable();
      this.formEcografiaSolicitud.get('HISCIE').enable();
    }
  }
  buildForm() {
    this.formEcografiaSolicitud = this.form.group({
      prestacion: new FormControl("", [Validators.required]),
      diagnostico: new FormControl("", [Validators.required]),
      subTipo: new FormControl("", [Validators.required]),
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
  recuperarListaSubTipos() {
    this.DxService.listarSubTipoImagenes().then((res: any) => this.listaSubTipos = res.procImgSubtipos);
    console.log("DATA SUBTIPOS", this.listaSubTipos)
  }
  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  async enviarSolicitudEcografia() {
    var data = {
      subTipo: this.formEcografiaSolicitud.value.subTipo,
      codPrestacion: this.formEcografiaSolicitud.value.diagnostico.codPrestacion,
      codigoSIS: this.formEcografiaSolicitud.value.SISCIE.codigo,
      nombreExamenSIS: this.formEcografiaSolicitud.value.diagnosticoSIS,
      codigoHIS: this.formEcografiaSolicitud.value.HISCIE.codigoItem,
      nombreExamen: this.formEcografiaSolicitud.value.diagnosticoHIS,
      nombreUPS: this.formEcografiaSolicitud.value.ups,
      nombreUPSaux: this.formEcografiaSolicitud.value.subtitulo,
      tipoDX: this.formEcografiaSolicitud.value.tipo,
      lab: this.formEcografiaSolicitud.value.lab,
      agregarafiliacion: true,
      cie10SIS: this.formEcografiaSolicitud.value.diagnostico.cie10SIS,
      estadoPago:"PAGADO"
    }

    console.log(data);

    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.nroConsultaGuardada = res.object.id;
      this.DxService.guardarSolicitudEcografiasGestante(this.nroConsultaGuardada, data).then((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Solicitud de ecografia guardada correctamente',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    })


  }
  async enviarEdicionSolicitudEcografia() {
    var data = {
      idExamAux: this.idEdicion,
      subTipo: this.formEcografiaSolicitud.value.subTipo,
      codPrestacion: this.formEcografiaSolicitud.value.diagnostico.codPrestacion,
      codigoSIS: this.formEcografiaSolicitud.value.SISCIE.codigo,
      nombreExamenSIS: this.formEcografiaSolicitud.value.diagnosticoSIS,
      codigoHIS: this.formEcografiaSolicitud.getRawValue().HISCIE.codigoItem,
      nombreExamen: this.formEcografiaSolicitud.getRawValue().diagnosticoHIS,
      nombreUPS: this.formEcografiaSolicitud.value.ups,
      nombreUPSaux: this.formEcografiaSolicitud.value.subtitulo,
      tipoDX: this.formEcografiaSolicitud.value.tipo,
      lab: this.formEcografiaSolicitud.value.lab,
      agregarafiliacion: true,
      cie10SIS: this.formEcografiaSolicitud.value.diagnostico.cie10SIS,
    }
    console.log(data);
    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.nroConsultaGuardada = res.object.id;
      this.DxService.editarSolicitudEcografiasGestante(this.nroConsultaGuardada, data).then((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Solicitud de ecografia guardada correctamente',
          showConfirmButton: false,
          timer: 1500,
        })
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
  llenarCamposSolicitudEcografia() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      let configuracion = this.config.data.row;
      this.idEdicion = configuracion.idExamAux;
      this.formEcografiaSolicitud.get("ups").setValue(configuracion.nombreUPS);
      this.formEcografiaSolicitud.get("subtitulo").setValue(configuracion.nombreUPSaux);
      this.formEcografiaSolicitud.get("tipo").setValue(configuracion.tipoDX);
      this.formEcografiaSolicitud.get("subTipo").setValue(configuracion.subTipo);
      this.formEcografiaSolicitud.get("lab").setValue(configuracion.lab);
      this.formEcografiaSolicitud.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formEcografiaSolicitud.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.listaDeCIESIS = res.object.procedimientos;
        this.formEcografiaSolicitud.patchValue({ prestacion: res.object.descripcion });
        this.formEcografiaSolicitud.patchValue({ diagnosticoSIS: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codigoSIS).procedimiento });
        this.formEcografiaSolicitud.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codigoSIS) });
        this.formEcografiaSolicitud.patchValue({ autocompleteSIS: "" });
      })
      this.CieService.getCIEByDescripcionTipo("EX", configuracion.codigoHIS).subscribe((res: any) => {
        this.listaDeCIE = res.object;
        this.formEcografiaSolicitud.patchValue({ HISCIE: this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codigoHIS) });
        this.formEcografiaSolicitud.get("diagnosticoHIS").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codigoHIS).descripcionItem);
      })
      this.formEcografiaSolicitud.get('autocompleteHIS').disable();
      this.formEcografiaSolicitud.get('HISCIE').disable();
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
      this.enviarEdicionSolicitudEcografia().then((res) => this.ref.close())
      :
      this.enviarSolicitudEcografia().then((res) => this.ref.close())

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
    this.CieService.getCIEByDescripcionTipo("EX", event.query).subscribe((res: any) => {
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

