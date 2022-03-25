import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import Swal from 'sweetalert2';
import { ConsultasService } from '../../../../services/consultas.service';

@Component({
  selector: 'app-ecografia-resultado',
  templateUrl: './ecografia-resultado.component.html',
  styleUrls: ['./ecografia-resultado.component.css']
})
export class EcografiaResultadoComponent implements OnInit {
  formEcografiaResultado: FormGroup;
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
  opciones: any;
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
    this.opciones = [
      { name: 'SI', boleano: true },
      { name: 'NO', boleano: false }
    ];

    console.log(config.data);
    this.buildForm();

    this.recuperarPrestaciones();
    this.traerDiagnosticosDeConsulta();

    if (config.data) {
      this.llenarCamposSolicitudEcografia();
    }
    else {
      this.formEcografiaResultado.get('ups').setValue("OBSTETRICIA");
      this.formEcografiaResultado.get('subtitulo').setValue("MATERNO PERINATAL");
      this.formEcografiaResultado.get("tipo").setValue("D");
    }
  }
  buildForm() {
    this.formEcografiaResultado = this.form.group({
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
      agregarFiliacion: new FormControl("", [Validators.required]),

      fecha: new FormControl("", [Validators.required]),
      labExterno: new FormControl("", [Validators.required]),
      dias: new FormControl("", [Validators.required]),
      semanas: new FormControl("", [Validators.required]),
      fechaProbableParto: new FormControl("", [Validators.required]),
      lcr: new FormControl("", [Validators.required]),
      lcf: new FormControl("", [Validators.required]),
      placenta: new FormControl("", [Validators.required]),
      sacoGestacional: new FormControl("", [Validators.required]),
      morfologiaFetal: new FormControl("", [Validators.required]),
      resultados: new FormControl("", [Validators.required]),
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
  async enviarResultadoEcografia() {
    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.nroConsultaGuardada = res.object.id;
      var data = {
        idConsulta: this.nroConsultaGuardada,
        labExterno: true,
        agregarafiliacion: true,
        datosLaboratorio: {
          subTipo: this.formEcografiaResultado.value.subTipo,
          codPrestacion: this.formEcografiaResultado.value.diagnostico.codPrestacion,
          codigoSIS: this.formEcografiaResultado.value.SISCIE.codigo,
          nombreExamenSIS: this.formEcografiaResultado.value.diagnosticoSIS,
          codigoHIS: this.formEcografiaResultado.value.HISCIE.codigoItem,
          nombreExamen: this.formEcografiaResultado.value.diagnosticoHIS,
          nombreUPS: this.formEcografiaResultado.value.ups,
          nombreUPSaux: this.formEcografiaResultado.value.subtitulo,
          tipoDX: this.formEcografiaResultado.value.tipo,
          lab: this.formEcografiaResultado.value.lab,
          cie10SIS: this.formEcografiaResultado.value.diagnostico.cie10SIS,
          fecha: this.datePipe.transform(this.formEcografiaResultado.value.fecha, 'yyyy-MM-dd'),
        },
        edadGestacionalSemanas: this.formEcografiaResultado.value.semanas,
        edadGestacionalDias: this.formEcografiaResultado.value.dias,
        fechaProbableParto: this.datePipe.transform(this.formEcografiaResultado.value.fechaProbableParto, 'yyyy-MM-dd'),
        lcr: this.formEcografiaResultado.value.lcr,
        lcf: this.formEcografiaResultado.value.lcf,
        placenta: this.formEcografiaResultado.value.placenta,
        sacoGestacional: this.formEcografiaResultado.value.sacoGestacional,
        morfologiaFetal: this.formEcografiaResultado.value.morfologiaFetal,
        resultados: this.formEcografiaResultado.value.resultados,
      }
      console.log(data);
      this.DxService.guardarResultadoEcografiasGestante(data).then((res: any) => {
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
  async enviarEdicionResultadoEcografia() {
    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.nroConsultaGuardada = res.object.id;
      var data = {
        idConsulta: this.nroConsultaGuardada,
        labExterno: true,
        agregarafiliacion: true,
        datosLaboratorio: {
          subTipo: this.formEcografiaResultado.value.subTipo,
          codPrestacion: this.formEcografiaResultado.value.diagnostico.codPrestacion,
          codigoSIS: this.formEcografiaResultado.value.SISCIE.codigo,
          nombreExamenSIS: this.formEcografiaResultado.value.diagnosticoSIS,
          codigoHIS: this.formEcografiaResultado.value.HISCIE.codigoItem,
          nombreExamen: this.formEcografiaResultado.value.diagnosticoHIS,
          nombreUPS: this.formEcografiaResultado.value.ups,
          nombreUPSaux: this.formEcografiaResultado.value.subtitulo,
          tipoDX: this.formEcografiaResultado.value.tipo,
          lab: this.formEcografiaResultado.value.lab,
          cie10SIS: this.formEcografiaResultado.value.diagnostico.cie10SIS,
          fecha: this.datePipe.transform(this.formEcografiaResultado.value.fecha, 'yyyy-MM-dd'),
        },
        edadGestacionalSemanas: this.formEcografiaResultado.value.semanas,
        edadGestacionalDias: this.formEcografiaResultado.value.dias,
        fechaProbableParto: this.datePipe.transform(this.formEcografiaResultado.value.fechaProbableParto, 'yyyy-MM-dd'),
        lcr: this.formEcografiaResultado.value.lcr,
        lcf: this.formEcografiaResultado.value.lcf,
        placenta: this.formEcografiaResultado.value.placenta,
        sacoGestacional: this.formEcografiaResultado.value.sacoGestacional,
        morfologiaFetal: this.formEcografiaResultado.value.morfologiaFetal,
        resultados: this.formEcografiaResultado.value.resultados,
      }
      this.DxService.editarResultadoEcografiasGestante(data).then((res: any) => {
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
      this.idEdicion = configuracion.id;
      this.formEcografiaResultado.get("ups").setValue(configuracion.nombreUPS);
      this.formEcografiaResultado.get("subtitulo").setValue(configuracion.nombreUPSaux);
      this.formEcografiaResultado.get("tipo").setValue(configuracion.tipoDX);
      this.formEcografiaResultado.get("subTipo").setValue(configuracion.subTipo);
      this.formEcografiaResultado.get("lab").setValue(configuracion.lab);
      this.formEcografiaResultado.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formEcografiaResultado.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.listaDeCIESIS = res.object.procedimientos;
        this.formEcografiaResultado.patchValue({ prestacion: res.object.descripcion });
        this.formEcografiaResultado.patchValue({ diagnosticoSIS: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codigoSIS).procedimiento });
        this.formEcografiaResultado.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codigoSIS) });
        this.formEcografiaResultado.patchValue({ autocompleteSIS: "" });
      })
      this.CieService.getCIEByDescripcionTipo("EX", configuracion.codigoHIS).subscribe((res: any) => {
        this.listaDeCIE = res.object;
        this.formEcografiaResultado.patchValue({ HISCIE: this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codigoHIS) });
        this.formEcografiaResultado.get("diagnosticoHIS").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codigoHIS).descripcionItem);
      })
      this.formEcografiaResultado.get('autocompleteHIS').disable();
      this.formEcografiaResultado.get('HISCIE').disable();
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
      this.enviarEdicionResultadoEcografia().then((res) => this.ref.close())
      :
      this.enviarResultadoEcografia().then((res) => this.ref.close())

  }
  closeDialog() {
    this.ref.close();
  }
  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formEcografiaResultado.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
      this.formEcografiaResultado.patchValue({ prestacion: res.object.descripcion });
      this.formEcografiaResultado.patchValue({ diagnosticoSIS: "" });
      this.formEcografiaResultado.patchValue({ SISCIE: "" });
    })
  }
  filterCIE10(event) {
    this.CieService.getCIEByDescripcionTipo("EX", event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }
  selectedOption(event, cieType) {
    if (cieType == 0) {
      this.formEcografiaResultado.patchValue({ diagnosticoSIS: event.value.procedimiento });
    }
    if (cieType == 1) {
      this.formEcografiaResultado.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }
  selectedOptionNameCIE(event, cieType) {
    console.log('lista de cie ', this.listaDeCIE);
    console.log('evento desde diagnos ', event);
    if (cieType == 0) {
      this.formEcografiaResultado.patchValue({ diagnosticoSIS: event.value.procedimiento });
      this.formEcografiaResultado.patchValue({ autocompleteSIS: "" });
      this.formEcografiaResultado.patchValue({ SISCIE: event.value }, { emitEvent: false });
      console.log(event.value)
    }
    if (cieType == 1) {
      this.formEcografiaResultado.patchValue({ diagnosticoHIS: event.descripcionItem });
      this.formEcografiaResultado.patchValue({ autocompleteHIS: "" });
      this.formEcografiaResultado.patchValue({ HISCIE: event }, { emitEvent: false });
    }
  }
  ngOnInit(): void {
  }

}
