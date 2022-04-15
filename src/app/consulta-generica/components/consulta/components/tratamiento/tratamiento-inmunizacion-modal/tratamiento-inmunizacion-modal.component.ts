import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {
  ConsultasService
} from "../../../../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service";
import {MessageService} from "primeng/api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { MedicamentosService } from 'src/app/mantenimientos/services/medicamentos/medicamentos.service';


@Component({
  selector: 'app-tratamiento-inmunizacion-modal',
  templateUrl: './tratamiento-inmunizacion-modal.component.html',
  styleUrls: ['./tratamiento-inmunizacion-modal.component.css']
})
export class TratamientoInmunizacionModalComponent implements OnInit {
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
  listaUpsHis: any;
  listaUps: any;
  tipoList: any;
  edadPaciente: any;
  sexoPaciente: any;
  viaAdministracionList:any[]
  dosisList:any[]
  dataConsulta:any;

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
    // this.dataConsulta = <any>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.dataConsulta=<any>JSON.parse(localStorage.getItem('documento'))
    console.log("ipress", this.idIpress)

    /*********RECUPERAR DATOS*********/
    /*usando local storage*/
    // this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    // this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
    // this.edadPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.edadAnio;
    // this.sexoPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.sexo;
    this.recuperarUpsHis();
    this.recuperarUPS();
    //estado para saber que estado usar en consultas
    this.estadoEdicion = JSON.parse(localStorage.getItem('consultaEditarEstado'));

    console.log("DATA PACIENTE 2 desde datos generales", this.dataPaciente2);
    console.log("gestacion desde datos generales", this.Gestacion);

    if (this.Gestacion == null) {
      // // this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
      // // this.nroDocRecuperado = this.dataPaciente2.nroDoc;
      // this.idConsulta = JSON.parse(localStorage.getItem('idGestacionRegistro'));
      // this.nroEmbarazo = this.dataPaciente2.nroEmbarazo;
      // this.nroHcl = this.dataPaciente2.nroHcl;

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
    }else{
      this.formInmunizaciones.get('ups').setValue("OBSTETRICIA");
      this.formInmunizaciones.get('subtitulo').setValue("MATERNO PERINATAL");
      this.formInmunizaciones.get("tipo").setValue("D");
    }

    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR TIPO DX*/
    this.tipoList = [{ label: 'DEFINITIVO', value: 'D' },
      { label: 'PRESUNTIVO', value: 'P' },
      { label: 'REPETITIVO', value: 'R' },
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
    this.viaAdministracionList=[
      {name:'Intramuscular',code:'INTRAMUSCULAR' },
      {name:'Intradérmica',code:'INTRADERMICA' },
      {name:'Via Oral',code:'VIA ORAL' },
      {name:'Via Subcutánea',code:'VIA SUBCUTANEA' }
    ]
    this.dosisList=[
      {name:'0.1 CC',code:'0.1 CC'},
      {name:'0.25 CC',code:'0.25 CC'},
      {name:'0.5 CC',code:'0.5 CC'},
      {name:'1 CC',code:'1 CC'},
      {name:'2 gotas',code:'0.1 CC'},
    ]
  }



  ngOnInit(): void {
    this.recuperarPrestaciones()

  }
  onChangePrestacion(){
    let codigoPrestacion:any;
    codigoPrestacion=this.formInmunizaciones.value.prestacion.codigo;
    this.formInmunizaciones.patchValue({ procedimientoSIS: ""})
    this.formInmunizaciones.patchValue({ codigoSIS: ""})
    this.PrestacionService.getDiagnosticoPorCodigo(codigoPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;

      console.log(res.object);
      if(res.object.denominacion=='ANIOS')
      {
        if(this.dataConsulta.anio>=res.object.edadMin && this.dataConsulta.anio<=res.object.edadMax){
          this.listaDeCIESIS = res.object.procedimientos;
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }
      }
      if(res.object.denominacion=='MESES')
      {
        let meses = this.dataConsulta.anio*12 + this.dataConsulta.mes + this.dataConsulta.dia/30;
        if(meses>=res.object.edadMin && meses <=res.object.edadMax){
          this.listaDeCIESIS = res.object.procedimientos;
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }

      }
      if(res.object.denominacion=='DIAS')
      {
        if(this.dataConsulta.anio==0 && this.dataConsulta.mes==0){
          if(this.dataConsulta.dia>=res.object.edadMin && this.dataConsulta.dia<=res.object.edadMax){
            this.listaDeCIESIS = res.object.procedimientos;
          }
          else{
            this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
          }
        }
        else{
          this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
        }
      }

    })

  }


  buildForm() {
    this.formInmunizaciones = this.form.group({
      nombre: new FormControl("", [Validators.required]),
      nombreComercial: new FormControl("", [Validators.required]),
      dosis: new FormControl("", [Validators.required]),
      tipoDosis: new FormControl("", [Validators.required]),
      viaAdministracion: new FormControl("", [Validators.required]),
      cantidad: new FormControl("", [Validators.required]),
      lote: new FormControl("", [Validators.required]),
      fechaVencimiento: new FormControl("", [Validators.required]),
      fechaAdministracion: new FormControl("", [Validators.required]),

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
    this.DxService.listaUps(this.idIpress).then((res: any) => {
        this.listaUps = res.object;
        console.log("DATA PARA UPS", this.listaUps);
    });
  }
  openNew() {
    this.formInmunizaciones.reset();
    this.dialogInmunizaciones = true;
  }
  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  async enviarTratamientoInmunizaciones() {
    var data = {
      nombre: this.formInmunizaciones.value.nombre.nombre,
      nombreComercial: this.formInmunizaciones.value.nombreComercial,
      dosis: this.formInmunizaciones.value.dosis,
      tipoDosis: this.formInmunizaciones.value.tipoDosis,
      tipoDx: this.formInmunizaciones.value.tipo,
      nombreUPS: this.formInmunizaciones.value.ups,
      nombreUPSaux: this.formInmunizaciones.value.subtitulo,
      codPrestacion: this.formInmunizaciones.value.diagnostico.codPrestacion,
      codProcedimientoHIS: this.formInmunizaciones.value.HISCIE.codigoItem,
      codProcedimientoSIS: this.formInmunizaciones.value.SISCIE.codigo,
      idIpressSolicitante: this.idIpress,
      viaAdministracion: this.formInmunizaciones.value.viaAdministracion,
      cantidad: this.formInmunizaciones.value.cantidad,
      lote: this.formInmunizaciones.value.lote,
      fechaVencimiento: this.obtenerFecha(this.formInmunizaciones.value.fechaVencimiento),
      fechaAdministracion: this.obtenerFecha(this.formInmunizaciones.value.fechaAdministracion),
      fechaProxDosis:'',
      idConsulta:this.dataConsulta.idConsulta,
      pertenecePAICRED: false,
    }
    console.log(data);

    // await this.DxService.guardarInmunizacionGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
    //   this.dialogInmunizaciones = false;
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Guardado',
    //     text: 'Solicitud de inmunización guardada correctamente',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   })
    // })
  }
  obtenerFecha(fecha: Date) {
    const parte1 = fecha.toISOString().split('T')
    const parte2 = parte1[1].split('.')[0]
    return `${parte1[0]}`
  }

  async enviarEdicionTratamientoInmunizacion() {
    var data = {
      id: this.idEdicion,
      nombre: this.formInmunizaciones.value.nombre.nombre,
      nombreComercial: this.formInmunizaciones.value.nombreComercial,
      dosis: this.formInmunizaciones.value.dosis,
      tipoDosis: this.formInmunizaciones.value.tipoDosis,
      codPrestacion: this.formInmunizaciones.value.diagnostico.codPrestacion,
      codProcedimientoSIS: this.formInmunizaciones.value.SISCIE.codigo,
      cie10SIS: this.formInmunizaciones.value.diagnostico.cie10SIS,
      codProcedimientoHIS: this.formInmunizaciones.value.HISCIE.codigoItem,
      nombreUPS: this.formInmunizaciones.value.ups,
      nombreUPSaux: this.formInmunizaciones.value.subtitulo,
      tipoDx: this.formInmunizaciones.value.tipo,
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
        this.formInmunizaciones.patchValue({ "nombre": res.object[0] });
      })
      this.formInmunizaciones.get("ups").setValue(configuracion.nombreUPS);
      this.formInmunizaciones.get("subtitulo").setValue(configuracion.nombreUPSaux);
      this.formInmunizaciones.get("tipo").setValue(configuracion.tipoDx);
      this.formInmunizaciones.get("dosis").setValue(configuracion.dosis);
      this.formInmunizaciones.get("tipoDosis").setValue(configuracion.tipoDosis);
      this.formInmunizaciones.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formInmunizaciones.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.listaDeCIESIS = res.object.procedimientos;
        this.formInmunizaciones.patchValue({ prestacion: res.object.descripcion });
        this.formInmunizaciones.patchValue({ diagnosticoSIS: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS).procedimiento });
        this.formInmunizaciones.patchValue({ SISCIE: this.listaDeCIESIS.find(elemento => elemento.codigo == configuracion.codProcedimientoSIS) });
        this.formInmunizaciones.patchValue({ autocompleteSIS: "" });
      })
      this.CieService.getCIEByDescripcion(configuracion.codProcedimientoHIS).subscribe((res: any) => {
        this.listaDeCIE = res.object;
        this.formInmunizaciones.patchValue({ HISCIE: this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codProcedimientoHIS) });
        this.formInmunizaciones.get("diagnosticoHIS").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == configuracion.codProcedimientoHIS).descripcionItem);
      })

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
  recuperarPrestaciones() {
    this.DxService.getPrestaciones().subscribe((res: any) => {
      this.prestacionList = res.object;
      console.log("prestaciones:---->", this.prestacionList);
    })
  }
  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formInmunizaciones.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
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
      this.formInmunizaciones.patchValue({ diagnosticoSIS: event.value.procedimiento });
    }
    if (cieType == 1) {
      this.formInmunizaciones.patchValue({ diagnosticoHIS: event.descripcionItem });
    }
  }

  selectedOptionNameCIE(event, cieType) {
    console.log('lista de cie ', this.listaDeCIE);
    console.log('evento desde diagnos ', event);
    if (cieType == 0) {
      this.formInmunizaciones.patchValue({ diagnosticoSIS: event.value.procedimiento });
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
