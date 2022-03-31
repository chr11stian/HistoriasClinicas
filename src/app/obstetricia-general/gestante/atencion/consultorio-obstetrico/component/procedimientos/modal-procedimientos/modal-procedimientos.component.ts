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
  selector: 'app-modal-procedimientos',
  templateUrl: './modal-procedimientos.component.html',
  styleUrls: ['./modal-procedimientos.component.css']
})
export class ModalProcedimientosComponent implements OnInit {

  formProcedimientos: FormGroup;
  dialogProcedimientos = false;
  dataProcedimientos: any[] = [];
  idObstetricia: string;
  datePipe = new DatePipe('en-US');
  estadoEditar: boolean = false;

  listaDeCIE: any;
  listaDeCIESIS: any;
  prestacionList: any[];

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

  consejeria = false;
  valorConsejeria = " ";
  constructor(private form: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private PrestacionService: PrestacionService,
    private CieService: CieService,
    private DxService: ConsultasService,
    private messageService: MessageService) {

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
    console.log("esto es lo q mandas a modal", config);
    this.buildForm();

    this.recuperarPrestaciones();
    this.traerDiagnosticosDeConsulta();

    if (config.data && typeof (config.data) !== 'string') {
      this.consejeria = false;
      console.log("consejeria", this.consejeria)
      this.llenarCamposTratamientoProcedimientos();
    }
    if (config.data && typeof (config.data) === 'string') {
      this.consejeria = true;
      this.valorConsejeria = config.data;
      console.log("consejeria", this.consejeria);
      this.formProcedimientos.get('ups').setValue("OBSTETRICIA");
      this.formProcedimientos.get('subtitulo').setValue("MATERNO PERINATAL");
      this.formProcedimientos.get("tipo").setValue("D");
    }
    else {
      this.consejeria = false;
      console.log("consejeria", this.consejeria)
      this.formProcedimientos.get('ups').setValue("OBSTETRICIA");
      this.formProcedimientos.get('subtitulo').setValue("MATERNO PERINATAL");
      this.formProcedimientos.get("tipo").setValue("D");
    }

  }

  ngOnInit(): void { }

  buildForm() {
    this.formProcedimientos = this.form.group({
      prestacion: new FormControl("", [Validators.required]),
      diagnostico: new FormControl("", [Validators.required]),
      autocompleteSIS: [''],
      diagnosticoSIS: new FormControl("", [Validators.required]),
      SISCIE: new FormControl("", [Validators.required]),
      autocompleteHIS: [''],
      diagnosticoHIS: new FormControl("", [Validators.required]),
      HISCIE: new FormControl("", [Validators.required]),
      ups: new FormControl("", [Validators.required]),
      subtitulo: new FormControl("", [Validators.required]),
      lab: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required]),
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
  openNew() {
    this.formProcedimientos.reset();

    this.dialogProcedimientos = true;
  }
  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  async enviarProcedimientos() {
    var data = {
      codPrestacion: this.formProcedimientos.value.diagnostico.codPrestacion,
      procedimientoSIS: this.formProcedimientos.value.diagnosticoSIS,
      codProcedimientoSIS: this.formProcedimientos.value.SISCIE.codigo,
      cie10SIS: this.formProcedimientos.value.diagnostico.cie10SIS,
      procedimientoHIS: this.formProcedimientos.value.diagnosticoHIS,
      codProcedimientoHIS: this.formProcedimientos.value.HISCIE.codigoItem,
      nombreUPS: this.formProcedimientos.value.ups,
      nombreUPSaux: this.formProcedimientos.value.subtitulo,
      lab: this.formProcedimientos.value.lab,
      tipo: this.formProcedimientos.value.tipo,
    }

    console.log(data);

    await this.DxService.guardarProcedimientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Procedimiento guardado correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }
  async enviarProcedimientosConsejeria() {
    var data = {
      codPrestacion: this.formProcedimientos.value.diagnostico.codPrestacion,
      procedimientoSIS: this.formProcedimientos.value.diagnosticoSIS,
      codProcedimientoSIS: this.formProcedimientos.value.SISCIE.codigo,
      cie10SIS: this.formProcedimientos.value.diagnostico.cie10SIS,
      procedimientoHIS: this.formProcedimientos.value.diagnosticoHIS,
      codProcedimientoHIS: this.formProcedimientos.value.HISCIE.codigoItem,
      nombreUPS: this.formProcedimientos.value.ups,
      nombreUPSaux: this.formProcedimientos.value.subtitulo,
      lab: this.formProcedimientos.value.lab,
      tipo: this.formProcedimientos.value.tipo,
    }

    console.log(data);

    await this.DxService.guardarProcedimientoGestanteConsejeria(this.nroHcl, this.nroEmbarazo, this.nroAtencion, this.valorConsejeria, data).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Procedimiento guardado correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }
  async enviarEdicionProcedimiento() {
    var data = {
      codPrestacion: this.formProcedimientos.value.diagnostico.codPrestacion,
      procedimientoSIS: this.formProcedimientos.value.diagnosticoSIS,
      codProcedimientoSIS: this.formProcedimientos.value.SISCIE.codigo,
      cie10SIS: this.formProcedimientos.value.diagnostico.cie10SIS,
      procedimientoHIS: this.formProcedimientos.value.diagnosticoHIS,
      codProcedimientoHIS: this.formProcedimientos.value.HISCIE.codigoItem,
      nombreUPS: this.formProcedimientos.value.ups,
      nombreUPSaux: this.formProcedimientos.value.subtitulo,
      lab: this.formProcedimientos.value.lab,
      tipo: this.formProcedimientos.value.tipo,
    }
    console.log(data);

    await this.DxService.editarProcedimientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Procedimiento guardado correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }
  llenarCamposTratamientoProcedimientos() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      let configuracion = this.config.data.row;
      this.idEdicion = configuracion.id;
      this.formProcedimientos.get("ups").setValue(configuracion.nombreUPS);
      this.formProcedimientos.get("subtitulo").setValue(configuracion.nombreUPSaux);
      this.formProcedimientos.get("lab").setValue(configuracion.lab);
      this.formProcedimientos.get("tipo").setValue(configuracion.tipo);
      this.formProcedimientos.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formProcedimientos.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.listaDeCIESIS = res.object.procedimientos;
        this.formProcedimientos.patchValue({ prestacion: res.object.descripcion });
        this.formProcedimientos.patchValue({ diagnosticoSIS: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS).procedimiento });
        this.formProcedimientos.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS) });
        this.formProcedimientos.patchValue({ autocompleteSIS: "" });
      })
      this.CieService.getCIEByDescripcion(configuracion.codProcedimientoHIS).subscribe((res: any) => {
        this.listaDeCIE = res.object;
        this.formProcedimientos.patchValue({ HISCIE: this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codProcedimientoHIS) });
        this.formProcedimientos.get("diagnosticoHIS").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codProcedimientoHIS).descripcionItem);
      })

    })

  }
  async closeDialogGuardar() {
    this.ref.close(
      await (this.config.data && typeof (this.config.data) !== 'string') ?
        this.enviarEdicionProcedimiento().then((res) => this.ref.close())
        :
        (this.config.data && typeof (this.config.data) === 'string') ?
          this.enviarProcedimientosConsejeria().then((res) => this.ref.close()) :
          this.enviarProcedimientos().then((res) => this.ref.close()
          )
    )
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
  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formProcedimientos.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
      this.formProcedimientos.patchValue({ prestacion: res.object.descripcion });
      this.formProcedimientos.patchValue({ diagnosticoSIS: "" });
      this.formProcedimientos.patchValue({ SISCIE: "" });
    })
  }

  filterCIE10(event) {
    this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }

  selectedOption(event, cieType) {
    if (cieType == 0) {
      this.formProcedimientos.patchValue({ diagnosticoSIS: event.value.procedimiento });
    }
    if (cieType == 1) {
      this.formProcedimientos.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }

  selectedOptionNameCIE(event, cieType) {
    console.log('lista de cie ', this.listaDeCIE);
    console.log('evento desde diagnos ', event);
    if (cieType == 0) {
      this.formProcedimientos.patchValue({ diagnosticoSIS: event.value.procedimiento });
      this.formProcedimientos.patchValue({ autocompleteSIS: "" });
      this.formProcedimientos.patchValue({ SISCIE: event.value }, { emitEvent: false });
      console.log(event.value)
    }
    if (cieType == 1) {
      this.formProcedimientos.patchValue({ diagnosticoHIS: event.descripcionItem });
      this.formProcedimientos.patchValue({ autocompleteHIS: "" });
      this.formProcedimientos.patchValue({ HISCIE: event }, { emitEvent: false });
    }
  }

}
