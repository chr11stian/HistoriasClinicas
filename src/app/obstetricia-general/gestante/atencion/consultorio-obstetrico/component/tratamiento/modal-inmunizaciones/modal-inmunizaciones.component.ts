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
  selector: 'app-modal-inmunizaciones',
  templateUrl: './modal-inmunizaciones.component.html',
  styleUrls: ['./modal-inmunizaciones.component.css']
})
export class ModalInmunizacionesComponent implements OnInit {
  formInmunizaciones: FormGroup;
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

    this.viaadministracionList = [{ label: 'ENDOVENOSA', value: 'ENDOVENOSA' },
    { label: 'INHALADORA', value: 'INHALADORA' },
    { label: 'INTRADERMICO', value: 'INTRADERMICO' },
    { label: 'INTRAMUSCULAR', value: 'INTRAMUSCULAR' },
    { label: 'NASAL', value: 'NASAL' },
    { label: 'OFTALMICO', value: 'OFTALMICO' },
    { label: 'ORAL', value: 'ORAL' },
    { label: 'OPTICO', value: 'OPTICO' },
    { label: 'RECTAL', value: 'RECTAL' },
    { label: 'SUBCUTANEO', value: 'SUBCUTANEO' },
    { label: 'SUBLINGUAL', value: 'SUBLINGUAL' },
    { label: 'TOPICO', value: 'TOPICO' },
    { label: 'VAGINAL', value: 'VAGINAL' },
    ];

    this.tiposDosis = [{ label: 'DOSIS UNICA', value: 'DU' },
    { label: '1RA DOSIS', value: '1' },
    { label: '2DA DOSIS', value: '2' },
    { label: '1RA DOSIS REFUERZO', value: 'RF1' },
    { label: '2DA DOSIS REFUERZO', value: 'RF2' },
    { label: '3RA DOSIS REFUERZO', value: 'RF3' },
    { label: '4TA DOSIS REFUERZO', value: 'RF4' },
    { label: '5TA DOSIS REFUERZO', value: 'RF5' }
    ];
  }

  ngOnInit(): void {
    
  }

  buildForm() {
    this.formInmunizaciones = this.form.group({
      nombre: new FormControl("", [Validators.required]),
      nombreComercial: new FormControl("", [Validators.required]),
      dosis: new FormControl("", [Validators.required]),
      tipoDosis: new FormControl("", [Validators.required]),
      prestacion: new FormControl("", [Validators.required]),
      diagnostico: new FormControl("", [Validators.required]),
      autocompleteSIS: [''],
      diagnosticoSIS: new FormControl("", [Validators.required]),
      SISCIE: new FormControl("", [Validators.required]),
      autocompleteHIS: [''],
      diagnosticoHIS: new FormControl("", [Validators.required]),
      HISCIE: new FormControl("", [Validators.required]),

    })
  }
  openNew() {
    this.formInmunizaciones.reset();
    this.dialogInmunizaciones = true;
  }
  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).subscribe((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  enviarTratamientoInmunizaciones() {
    var data = {
      nombre: this.formInmunizaciones.value.nombre.nombre,
      nombreComercial: this.formInmunizaciones.value.nombreComercial,
      dosis: this.formInmunizaciones.value.dosis,
      tipoDosis: this.formInmunizaciones.value.tipoDosis,
      codPrestacion: this.formInmunizaciones.value.diagnostico.codPrestacion,
      codProcedimientoSIS: this.formInmunizaciones.value.SISCIE.cie10,
      cie10SIS: this.formInmunizaciones.value.diagnostico.cie10SIS,
      codProcedimientoHIS: this.formInmunizaciones.value.HISCIE.codigoItem,
      idIpressSolicitante: this.idIpress,
      pertenecePAICRED: false,
      datosPaciente: {
        tipoDoc: this.tipoDocRecuperado,
        nroDoc: this.nroDocRecuperado
      }
    }

    console.log(data);

    this.DxService.guardarInmunizacionGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).subscribe((res: any) => {
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
  enviarEdicionTratamientoInmunizacion() {
    var data = {
      id: this.idEdicion,
      nombre: this.formInmunizaciones.value.nombre.nombre,
      nombreComercial: this.formInmunizaciones.value.nombreComercial,
      dosis: this.formInmunizaciones.value.dosis,
      tipoDosis: this.formInmunizaciones.value.tipoDosis,
      codPrestacion: this.formInmunizaciones.value.diagnostico.codPrestacion,
      codProcedimientoSIS: this.formInmunizaciones.value.SISCIE.cie10,
      cie10SIS: this.formInmunizaciones.value.diagnostico.cie10SIS,
      codProcedimientoHIS: this.formInmunizaciones.value.HISCIE.codigoItem,
      idIpressSolicitante: this.idIpress,
      pertenecePAICRED: false,
      datosPaciente: {
        tipoDoc: this.tipoDocRecuperado,
        nroDoc: this.nroDocRecuperado
      }
    }

    console.log(data);

    this.DxService.editarInmunizacionGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).subscribe((res: any) => {
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
  async llenarCamposTratamientoInmunizaciones() {
    await this.traerDiagnosticosDeConsulta();
    let configuracion = this.config.data.row;
    this.idEdicion = configuracion.id;
    this.formInmunizaciones.patchValue({ nombre: configuracion.nombre }, { emitEvent: false });
    this.formInmunizaciones.get("nombreComercial").setValue(configuracion.nombreComercial);
    this.formInmunizaciones.get("dosis").setValue(configuracion.dosis);
    this.formInmunizaciones.get("tipoDosis").setValue(configuracion.tipoDosis);
    this.formInmunizaciones.get("prestacion").setValue(configuracion.codPrestacion);
    console.log(configuracion)
    this.formInmunizaciones.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
    this.onChangeDiagnostico();
    this.formInmunizaciones.get("HISCIEz").setValue(configuracion.codProcedimientoHIS);
    //this.formInmunizaciones.get("diagnosticoHIS").setValue(configuracion.dosis);
  }
  closeDialogGuardar() {
    this.config.data ?
      this.enviarEdicionTratamientoInmunizacion()
    :
    this.enviarTratamientoInmunizaciones()
    this.ref.close();
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
    this.PrestacionService.getDiagnosticoPorCodigo(this.formInmunizaciones.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.diagnostico;
      this.formInmunizaciones.patchValue({ prestacion: res.object.descripcion });
      this.formInmunizaciones.patchValue({ diagnosticoSIS: "" });
      this.formInmunizaciones.patchValue({ SISCIE: "" });
    })
  }

  filterCIE10(event) {
    this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }

  selectedOption(event, cieType) {
    if (cieType == 0) {
      this.formInmunizaciones.patchValue({ diagnosticoSIS: event.value.diagnostico });
    }
    if (cieType == 1) {
      this.formInmunizaciones.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }

  selectedOptionNameCIE(event, cieType) {
    console.log('lista de cie ', this.listaDeCIE);
    console.log('evento desde diagnos ', event);
    if (cieType == 0) {
      this.formInmunizaciones.patchValue({ diagnosticoSIS: event.value.diagnostico });
      this.formInmunizaciones.patchValue({ autocompleteSIS: "" });
      this.formInmunizaciones.patchValue({ SISCIE: event.value }, { emitEvent: false });
      console.log(event.value)
    }
    if (cieType == 1) {
      this.formInmunizaciones.patchValue({ diagnosticoHIS: event.descripcionItem });
      this.formInmunizaciones.patchValue({ autocompleteHIS: "" });
      this.formInmunizaciones.patchValue({ HISCIE: event }, { emitEvent: false });
    }
  }

  filterMedicamento(event) {
    this.MedicamentosService.searchMedicamento(event.query).subscribe((res: any) => {
      this.listaMedicamentos = res.object
    })
  }

  selectedOptionNameMedicamento(event) {
    console.log('lista de medicamentos ', this.listaMedicamentos);
    console.log('evento desde medicamentos ', event);
    this.formInmunizaciones.patchValue({ nombreComercial: event.nombreComercial }, { emitEvent: false });
  }
}
