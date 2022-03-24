import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ModalTratamientoComponent } from "./modal-tratamiento/modal-tratamiento.component";
import { ModalInmunizacionesComponent } from "./modal-inmunizaciones/modal-inmunizaciones.component";
import { ConsultasService } from "../../services/consultas.service";
import Swal from "sweetalert2";
import { ModalRecomendacionesComponent } from "./modal-recomendaciones/modal-recomendaciones.component";
import { ModalExamenesAuxiliaresComponent } from "./modal-examenes-auxiliares/modal-examenes-auxiliares.component";
import { MessageService } from "primeng/api";
import { MedicamentosService } from 'src/app/mantenimientos/services/medicamentos/medicamentos.service';
import { IpressFarmaciaService } from 'src/app/modulos/ipress-farmacia/services/ipress-farmacia.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
  providers: [DialogService]
})
export class TratamientoComponent implements OnInit {
  idObstetricia: string;

  /***campos para el tratamiento comun****/
  ref: DynamicDialogRef;
  tratamientosComunes: any[] = [];
  dataTratamientoComun: any;
  /***campos para el tratamiento suplementario***/
  tratamientosSuplementarios: any[] = [];
  suplementarios: any;
  /*campos de Evaluacion Nutricional*/
  evaluacionNutricional: any;
  /*campos para el tratamiento inmunizaciones*/
  tratamientoInmunizaciones: any[] = [];
  dataTratamientoInmunizaciones: any;

  recomendaciones: any[] = [];
  examenesAuxiliares: any[] = [];
  /*LISTA DE LOS DROPDOWNS*/
  listaIntervalos: any[];
  listaSuplementoAcido: any[];
  listaViaAdministracion: any[];
  listaSuplementoCalcio: any[];
  /*Form de datos generales*/
  formRIEP: FormGroup;
  /*form de todos los arreglos dialogs*/
  formTratamientoInmunizacion: FormGroup;
  formTratamiento: FormGroup;

  formRecomendaciones: FormGroup;
  formExamenesAuxiliares: FormGroup;
  /*CAMPOS PARA RECUPERAR LA DATA PRINCIPAL*/
  dataConsulta: any;
  /****** Data recuperada********/
  private planPartoReenfocada: any;
  /*****datos recuperados para actualizar consultorio**/
  private nroFetos: number = 0;
  /********datos para poder calcular EVAL. nutricional valor e indicador*************/
  private talla: number;
  private imc: number;
  private pesoHabitual: number;
  private pesoActual: number;
  private indicador: '';
  /*****/
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
  codMedicamento1: any;
  codMedicamento2: any;
  aux: any;

  diagnosticosList: any[] = [];
  listaDeCIE: any[] = [];
  listaUpsHis: any;
  listaUps: any;
  idIpress: any;
  edadPaciente: any;
  sexoPaciente: any;
  constructor(private formBuilder: FormBuilder,
    private obstetriciaService: ObstetriciaGeneralService,
    private dialog: DialogService,
    private messageService: MessageService,
    private tratamientoService: ConsultasService,
    private farmaciaService: IpressFarmaciaService,
    private CieService: CieService,) {
    this.buildForm();

    /*********RECUPERAR DATOS*********/
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log("ipress", this.idIpress)
    this.renIpress = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    console.log("renipress", this.renIpress)

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


    /***************DATOS DE LOS DROPDOWNS*******************/
    /*LLENADO DE LISTAS - VALORES QUE PUEDEN TOMAR EL TRATAMIENTO*/
    this.listaIntervalos = [
      { name: 'CADA 4 HORAS', code: '4' },
      { name: 'CADA 5 HORAS', code: '5' },
      { name: 'CADA 6 HORAS', code: '6' },
      { name: 'CADA 8 HORAS', code: '7' },
      { name: 'CADA 12 HORAS', code: '8' },
      { name: 'CADA 24 HORAS', code: '9' },
      { name: 'CONDICIONAL A FIEBRE', code: '10' },
      { name: 'DOSIS UNICA', code: '11' },
      { name: 'CADA 48 HORAS', code: '12' }
    ];
    this.listaSuplementoAcido = [
      { name: "ACIDO FOLICO", code: "1" },
      { name: "ACIDO FOLICO Y HIERRO", code: "2" },
    ];
    this.listaSuplementoCalcio = [
      { name: "CALCIO", code: "1" },
    ];
    this.recuperarDatos();
    this.traerDiagnosticosDeConsulta();
    this.listarMedicamentosFarmacia();
  }
  private buildForm() {
    this.formRIEP = this.formBuilder.group({
      valor: new FormControl({ value: '', disabled: true }, [Validators.required]),
      indicador: new FormControl({ value: '', disabled: true }, [Validators.required]),
      encargado: ['', [Validators.required]],

      diagnostico: new FormControl(""),
      nombre: new FormControl(""),
      stock: new FormControl(""),
      diagnostico2: new FormControl(""),
      nombre2: new FormControl(""),
      stock2: new FormControl(""),
      //suplementos
      acidoFolicoNombre: new FormControl(""),
      acidoFolicoDescripcion: new FormControl(""),
      acidoFolicoViaAdministracion: new FormControl(""),
      acidoFolicoFechaVenc: new FormControl(""),
      acidoFolicoCantidad: new FormControl(""),
      acidoFolicoDosisIndicaciones: new FormControl(""),
      acidoFolicoDosisNro: new FormControl(""),
      acidoFolicoFrecuencia: new FormControl(""),
      acidoFolicoDuracion: new FormControl(""),
      acidoFolicoLab: new FormControl(""),
      acidoFolicoIndicacion: new FormControl(""),


      calcioNombre: new FormControl(""),
      calcioDescripcion: new FormControl(""),
      calcioViaAdministracion: new FormControl(""),
      calcioFechaVenc: new FormControl(""),
      calcioCantidad: new FormControl(""),
      calcioDosisIndicaciones: new FormControl(""),
      calcioDosisNro: new FormControl(""),
      calcioFrecuencia: new FormControl(""),
      calcioDuracion: new FormControl(""),
      calcioLab: new FormControl(""),
      calcioIndicacion: new FormControl(""),

      autocompleteHIS1: new FormControl(""),
      diagnosticoHIS1: new FormControl(""),
      HISCIE1: new FormControl(""),
      nombreUPS1: new FormControl(""),
      nombreUPSAux1: new FormControl(""),

      autocompleteHIS2: new FormControl(""),
      diagnosticoHIS2: new FormControl(""),
      HISCIE2: new FormControl(""),
      nombreUPS2: new FormControl(""),
      nombreUPSAux2: new FormControl(""),
    })
  }

  ngOnInit(): void {
    this.recuperarInmunizaciones();
    this.recuperarTratamientos();
  }
  recuperarNroFetos() {
    let idData = {
      id: this.idConsulta
    }
    this.tratamientoService.getUltimaConsultaById(idData).subscribe((res: any) => {
      this.nroFetos = res.object.nroFetos;
    })
  }
  recuperarUpsHis() {
    let Data = {
      idIpress: this.idIpress,
      edad: this.edadPaciente,
      sexo: this.sexoPaciente
    }
    this.tratamientoService.listaUpsHis(Data).then((res: any) => this.listaUpsHis = res.object);
    console.log("DATA PARA UPS HIS", this.listaUpsHis)
  }
  recuperarUPS() {
    this.tratamientoService.listaUps(this.idIpress).then((res: any) => this.listaUps = res.object);
    console.log("DATA PARA UPS", this.listaUps)
  }
  /*DATOS RECIBIDOS DE LOS MODALES*/
  openDialogTratamientoComun() {
    this.ref = this.dialog.open(ModalTratamientoComponent, {
      header: "TRATAMIENTOS",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal tratamiento", data)
      this.recuperarTratamientos();
    })
  }
  openDialogEditarTratamientoComun(row, index) {
    let aux = {
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalTratamientoComponent, {
      header: "TRATAMIENTO",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal tratamiento", data)
      this.recuperarTratamientos();
    })
  }
  openDialogTratamientoInmunizaciones() {
    this.ref = this.dialog.open(ModalInmunizacionesComponent, {
      header: "INMUNIZACIONES",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal tratamiento", data)
      this.recuperarInmunizaciones();
    })
  }
  openDialogEditarTratamientoInmunizaciones(row) {
    let aux = {
      row: row
    }
    this.ref = this.dialog.open(ModalInmunizacionesComponent, {
      header: "INMUNIZACIONES",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal inmunizaciones ', data)
      this.recuperarInmunizaciones();
    })
  }
  openDialogRecomendaciones() {
    this.ref = this.dialog.open(ModalRecomendacionesComponent, {
      header: "RECOMENDACIONES",
      contentStyle: {
        width: "500px",
        heigth: "500px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal recomendaciones", data)
      if (data !== undefined)
        this.recomendaciones.push(data);
      console.log(this.formRecomendaciones);
    })
  }
  openDialogEditarRecomendaciones(row, index) {
    let aux = {
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalRecomendacionesComponent, {
      header: "RECOMENDACIONES",
      contentStyle: {
        width: "500px",
        heigth: "500px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal Recomendaciones ', data)
      if (data !== undefined) {
        this.recomendaciones.splice(data.index, 1, data.row);
      };
    })
  }
  async recuperarInmunizaciones() {
    await this.tratamientoService.listarInmunizacionesDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.tratamientoInmunizaciones = res.object;
    })
  }
  async recuperarTratamientos() {
    await this.tratamientoService.listarTratamientosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.tratamientosComunes = res.object;
    })
  }

  guardarTodosDatos() {
    console.log(this.formRIEP.value);
    const req = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
      tratamientosSuplementos: {
        acidoFolico: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? {
          codPrestacion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.diagnostico.codPrestacion : null,
          codSISMED: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.nombre.medicamento.codigo : null,
          cie10SIS: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.nombre.diagnostico.cie10SIS : null,
          codProcedimientoHIS: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.HISCIE1.codigoItem : null,
          nombreUPS: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.nombreUPS1 : null,
          nombreUPSaux: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.nombreUPSAux1 : null,
          nombre: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoNombre : null,
          descripcion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoDescripcion : null,
          cantidad: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoCantidad : null,
          dosisIndicacion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoDosisIndicaciones : null,
          viaAdministracion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoViaAdministracion : null,
          frecuencia: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoFrecuencia : null,
          duracion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoDuracion : null,
          indicacion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoIndicacion : null,
          dosis: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoDosisNro : null,
          estadoAdministrado: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? true : null,
          fechaVenc: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoFechaVenc : null,
          lab: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? this.formRIEP.value.acidoFolicoLab : null,
          tipo: this.formRIEP.value.acidoFolicoNombre == "ACIDO FÓLICO" ? "D" : null,
        } : null,
        hierroYAcidoFolico: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? {
          codPrestacion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.diagnostico.codPrestacion : null,
          codSISMED: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.nombre.medicamento.codigo : null,
          cie10SIS: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.diagnostico.cie10SIS : null,
          codProcedimientoHIS: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.HISCIE1.codigoItem : null,
          nombreUPS: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.nombreUPS1 : null,
          nombreUPSaux: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.nombreUPSAux1 : null,
          nombre: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoNombre : null,
          descripcion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoDescripcion : null,
          cantidad: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoCantidad : null,
          dosisIndicacion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoDosisIndicaciones : null,
          viaAdministracion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoViaAdministracion : null,
          frecuencia: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoFrecuencia : null,
          duracion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoDuracion : null,
          indicacion: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoIndicacion : null,
          dosis: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoDosisNro : null,
          estadoAdministrado: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? true : null,
          fechaVenc: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoFechaVenc : null,
          lab: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? this.formRIEP.value.acidoFolicoLab : null,
          tipo: this.formRIEP.value.acidoFolicoNombre == "ACIDO FOLICO + FERROSO SULFATO" ? "D" : null,
        } : null,
        calcio: this.formRIEP.value.calcioNombre == "" ? null : {
          codPrestacion: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.diagnostico2.codPrestacion,
          codSISMED: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.nombre2.medicamento.codigo,
          cie10SIS: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.diagnostico2.cie10SIS,
          codProcedimientoHIS: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.HISCIE2.codigoItem,
          nombreUPS: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.nombreUPS2,
          nombreUPSaux: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.nombreUPSAux2,
          nombre: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioNombre,
          descripcion: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioDescripcion,
          cantidad: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioCantidad,
          dosisIndicacion: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioDosisIndicaciones,
          viaAdministracion: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioViaAdministracion,
          frecuencia: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioFrecuencia,
          duracion: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioDuracion,
          indicacion: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioIndicacion,
          dosis: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioDosis,
          estadoAdministrado: this.formRIEP.value.calcioNombre == "" ? null : true,
          fechaVenc: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioFechaVenc,
          lab: this.formRIEP.value.calcioNombre == "" ? null : this.formRIEP.value.calcioLab,
          tipo: this.formRIEP.value.calcioNombre == "" ? null : "D",
        }
      },
      recomendaciones: this.recomendaciones,
    }
    console.log("enviar req", req);
    this.tratamientoService.updateConsultas(this.nroFetos, req).subscribe(
      (resp) => {
        console.log(resp);
        console.log(req);
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    )
  }
  async recuperarDatos() {
    this.recuperarNroFetos();
    await this.tratamientoService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
    })
    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }

    this.tratamientoService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.dataConsulta = res.object;
      console.log("data consulta:" + this.dataConsulta);


      if (res['cod'] = '2401') {
        if (this.dataConsulta != null) {
          this.messageService.add({
            severity: 'info',
            summary: 'Recuperado',
            detail: 'Registro recuperado satisfactoriamente'
          });

          if (this.dataConsulta.tratamientosSuplementos != null) {
            if (this.dataConsulta.tratamientosSuplementos.acidoFolico !== null) {
              this.formRIEP.get('acidoFolicoCantidad').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.cantidad);
              this.formRIEP.get('acidoFolicoDescripcion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion);
              this.formRIEP.get('acidoFolicoDosisIndicaciones').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.dosisIndicacion);
              this.formRIEP.get('acidoFolicoDosisNro').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.dosis);
              this.formRIEP.get('acidoFolicoDuracion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.duracion);
              this.formRIEP.get('acidoFolicoFechaVenc').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.fechaVenc);
              this.formRIEP.get('acidoFolicoFrecuencia').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.frecuencia);
              this.formRIEP.get('acidoFolicoIndicacion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.indicacion);
              this.formRIEP.get('acidoFolicoLab').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.lab);
              this.formRIEP.get('acidoFolicoNombre').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.nombre);
              this.formRIEP.get('acidoFolicoViaAdministracion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.viaAdministracion);
              this.formRIEP.get('diagnostico').setValue(this.diagnosticosList.find((elto) => elto.cie10SIS == this.dataConsulta.tratamientosSuplementos.acidoFolico.cie10SIS));
              this.CieService.getCIEByDescripcion(this.dataConsulta.tratamientosSuplementos.acidoFolico.codProcedimientoHIS).subscribe((res: any) => {
                this.listaDeCIE = res.object;
                this.formRIEP.patchValue({ HISCIE1: this.listaDeCIE.find(elemento => elemento.codigoItem == this.dataConsulta.tratamientosSuplementos.acidoFolico.codProcedimientoHIS) });
                this.formRIEP.get("diagnosticoHIS1").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == this.dataConsulta.tratamientosSuplementos.acidoFolico.codProcedimientoHIS).descripcionItem);
              })
              this.filterItemsMed(this.dataConsulta.tratamientosSuplementos.acidoFolico.nombre);
              this.formRIEP.patchValue({ nombre: this.aux.find(elemento => elemento.medicamento.codigo == this.dataConsulta.tratamientosSuplementos.acidoFolico.codSISMED) });
              this.selectedOptionNameMedicamento(this.aux.find(elemento => elemento.medicamento.codigo == this.dataConsulta.tratamientosSuplementos.acidoFolico.codSISMED), 1);
              this.formRIEP.get('nombreUPS1').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.nombreUPS);
              this.formRIEP.get('nombreUPSAux1').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.nombreUPSaux);
            }
            else {
              if (this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico !== null) {
                this.formRIEP.get('acidoFolicoCantidad').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.cantidad);
                this.formRIEP.get('acidoFolicoDescripcion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion);
                this.formRIEP.get('acidoFolicoDosisIndicaciones').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.dosisIndicacion);
                this.formRIEP.get('acidoFolicoDosisNro').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.dosis);
                this.formRIEP.get('acidoFolicoDuracion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.duracion);
                this.formRIEP.get('acidoFolicoFechaVenc').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.fechaVenc);
                this.formRIEP.get('acidoFolicoFrecuencia').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.frecuencia);
                this.formRIEP.get('acidoFolicoIndicacion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.indicacion);
                this.formRIEP.get('acidoFolicoLab').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.lab);
                this.formRIEP.get('acidoFolicoNombre').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.nombre);
                this.formRIEP.get('acidoFolicoViaAdministracion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.viaAdministracion);
                this.formRIEP.get('diagnostico').setValue(this.diagnosticosList.find((elto) => elto.cie10SIS == this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.cie10SIS));
                this.CieService.getCIEByDescripcion(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.codProcedimientoHIS).subscribe((res: any) => {
                  this.listaDeCIE = res.object;
                  this.formRIEP.patchValue({ HISCIE1: this.listaDeCIE.find(elemento => elemento.codigoItem == this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.codProcedimientoHIS) });
                  this.formRIEP.get("diagnosticoHIS1").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.codProcedimientoHIS).descripcionItem);
                })
                this.filterItemsMed(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.nombre);
                console.log("aux", this.aux);
                this.formRIEP.patchValue({ nombre: this.aux.find(elemento => elemento.medicamento.codigo == this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.codSISMED) });
                this.selectedOptionNameMedicamento(this.aux.find(elemento => elemento.medicamento.codigo == this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.codSISMED), 1);
                this.formRIEP.get('nombreUPS1').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.nombreUPS);
                this.formRIEP.get('nombreUPSAux1').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.nombreUPSaux);
              }
            }
            if (this.dataConsulta.tratamientosSuplementos.calcio !== null) {

              this.formRIEP.get('calcioCantidad').setValue(this.dataConsulta.tratamientosSuplementos.calcio.cantidad);
              this.formRIEP.get('calcioDescripcion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.descripcion);
              this.formRIEP.get('calcioDosisIndicaciones').setValue(this.dataConsulta.tratamientosSuplementos.calcio.dosisIndicacion);
              this.formRIEP.get('calcioDosisNro').setValue(this.dataConsulta.tratamientosSuplementos.calcio.dosis);
              this.formRIEP.get('calcioDuracion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.duracion);
              this.formRIEP.get('calcioFechaVenc').setValue(this.dataConsulta.tratamientosSuplementos.calcio.fechaVenc);
              this.formRIEP.get('calcioFrecuencia').setValue(this.dataConsulta.tratamientosSuplementos.calcio.frecuencia);
              this.formRIEP.get('calcioIndicacion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.indicacion);
              this.formRIEP.get('calcioLab').setValue(this.dataConsulta.tratamientosSuplementos.calcio.lab);
              this.formRIEP.get('calcioNombre').setValue(this.dataConsulta.tratamientosSuplementos.calcio.nombre);
              this.formRIEP.get('calcioViaAdministracion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.viaAdministracion);
              this.formRIEP.get('diagnostico2').setValue(this.diagnosticosList.find((elto) => elto.cie10SIS == this.dataConsulta.tratamientosSuplementos.calcio.cie10SIS));
              this.CieService.getCIEByDescripcion(this.dataConsulta.tratamientosSuplementos.calcio.codProcedimientoHIS).subscribe((res: any) => {
                this.listaDeCIE = res.object;
                this.formRIEP.patchValue({ HISCIE2: this.listaDeCIE.find(elemento => elemento.codigoItem == this.dataConsulta.tratamientosSuplementos.calcio.codProcedimientoHIS) });
                this.formRIEP.get("diagnosticoHIS2").setValue(this.listaDeCIE.find(elemento => elemento.codigoItem == this.dataConsulta.tratamientosSuplementos.calcio.codProcedimientoHIS).descripcionItem);
              })
              this.filterItemsMed(this.dataConsulta.tratamientosSuplementos.calcio.nombre);
              console.log("aux", this.aux);
              this.formRIEP.patchValue({ nombre2: this.aux.find(elemento => elemento.medicamento.codigo == this.dataConsulta.tratamientosSuplementos.calcio.codSISMED) });
              this.selectedOptionNameMedicamento(this.aux.find(elemento => elemento.medicamento.codigo == this.dataConsulta.tratamientosSuplementos.calcio.codSISMED), 2);
              this.formRIEP.get('nombreUPS2').setValue(this.dataConsulta.tratamientosSuplementos.calcio.nombreUPS);
              this.formRIEP.get('nombreUPSAux2').setValue(this.dataConsulta.tratamientosSuplementos.calcio.nombreUPSaux);

            }
          }

          if (this.dataConsulta.recomendaciones != null) {
            /* recuperar recomendaciones*/
            let w: number = 0;
            while (w < this.dataConsulta.recomendaciones.length) {
              this.recomendaciones.push(this.dataConsulta.recomendaciones[w]);
              w++;
            }
          }

        } else { this.messageService.add({ severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía' }); }
      }
    });
  }
  /* ELIMINAR ITEMS DE CADA TABLA */
  eliminarTratamientoComun(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientoService.eliminarTratamientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, index).subscribe(
          (resp) => {
            this.recuperarTratamientos();
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
  eliminarInmunizaciones(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientoService.eliminarInmunizacionGestante(index).subscribe(
          (resp) => {
            this.recuperarInmunizaciones();
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
  eliminarRecomendaciones(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.recomendaciones.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
  async traerDiagnosticosDeConsulta() {
    await this.tratamientoService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  //FARMACIA MEDICAMENTOS
  selectedOptionNameMedicamento(event, n) {
    console.log('lista de medicamentos ', this.medicamentosConDatos);
    if (n == 1) {
      this.codMedicamento1 = event.medicamento.codigo;
      this.formRIEP.patchValue({ acidoFolicoDescripcion: event.medicamento.nombreComercial });
      this.formRIEP.patchValue({ acidoFolicoNombre: event.medicamento.nombre });
      this.formRIEP.patchValue({ acidoFolicoFechaVenc: event.fechaVenc });
      this.formRIEP.patchValue({ acidoFolicoViaAdministracion: event.medicamento.viaAdministracion });
      this.formRIEP.patchValue({ stock: event.stock });
    }
    if (n == 2) {
      console.log(event);
      this.codMedicamento2 = event.medicamento.codigo;
      this.formRIEP.patchValue({ calcioDescripcion: event.medicamento.nombreComercial });
      this.formRIEP.patchValue({ calcioNombre: event.medicamento.nombre });
      this.formRIEP.patchValue({ calcioFechaVenc: event.fechaVenc });
      this.formRIEP.patchValue({ calcioViaAdministracion: event.medicamento.viaAdministracion });
      this.formRIEP.patchValue({ stock2: event.stock });
    }

  }
  listarMedicamentosFarmacia() {
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renIpress).subscribe((data: any) => {
      if (data != undefined) {
        this.listaMedicamentos = (data.object);
        let cadena
        for (let i = 0; i < this.listaMedicamentos.length; i++) {
          cadena = {
            medicamento: {
              id: this.listaMedicamentos[i].medicamento.id,
              codigo: this.listaMedicamentos[i].medicamento.codigo,
              nombre: this.listaMedicamentos[i].medicamento.nombre,
              ff: this.listaMedicamentos[i].medicamento.ff,
              concentracion: this.listaMedicamentos[i].medicamento.concentracion,
              viaAdministracion: this.listaMedicamentos[i].medicamento.viaAdministracion,
              nombreComercial: this.listaMedicamentos[i].medicamento.nombreComercial,
            },
            lote: this.listaMedicamentos[i].lote,
            fechaVenc: this.listaMedicamentos[i].fechaVenc,
            stock: this.listaMedicamentos[i].stock,
            stringMedicamento: this.listaMedicamentos[i].medicamento.nombre + " " + this.listaMedicamentos[i].medicamento.ff + " " + this.listaMedicamentos[i].medicamento.concentracion + " " + this.listaMedicamentos[i].medicamento.viaAdministracion + " Fecha Venc. " + this.listaMedicamentos[i].fechaVenc + " stock: " + this.listaMedicamentos[i].stock
          }
          this.medicamentosConDatos.push(cadena);
        }
      }
    })
  }
  filterItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    console.log(this.medicamentosConDatos);
    this.aux = this.medicamentosConDatos;
    for (let i = 0; i < this.aux.length; i++) {
      let item = this.aux[i];
      if (item.stringMedicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.aux = filtered;
    if (this.aux === []) {
      console.log('no encontrado');
      this.aux = this.medicamentosConDatos;

    }
  }
  filterItemsMed(str) {
    let filtered: any[] = [];
    let query = str;
    console.log(this.medicamentosConDatos);
    this.aux = this.medicamentosConDatos;
    for (let i = 0; i < this.aux.length; i++) {
      let item = this.aux[i];
      if (item.stringMedicamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.aux = filtered;
    if (this.aux === []) {
      console.log('no encontrado');
      this.aux = this.medicamentosConDatos;

    }
  }
  //CIE10HIS
  filterCIE10(event) {
    this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
      this.listaDeCIE = res.object
    })
  }
  selectedOption(event, cieType) {
    if (cieType == 2) {
      this.formRIEP.patchValue({ diagnosticoHIS2: event.descripcionItem });
    }
    if (cieType == 1) {
      this.formRIEP.patchValue({ diagnosticoHIS1: event.descripcionItem });
    }
  }
  selectedOptionNameCIE(event, cieType) {
    console.log('lista de cie ', this.listaDeCIE);
    console.log('evento desde diagnos ', event);
    if (cieType == 2) {
      this.formRIEP.patchValue({ diagnosticoHIS2: event.descripcionItem });
      this.formRIEP.patchValue({ autocompleteHIS2: "" });
      this.formRIEP.patchValue({ HISCIE2: event }, { emitEvent: false });
    }
    if (cieType == 1) {
      this.formRIEP.patchValue({ diagnosticoHIS1: event.descripcionItem });
      this.formRIEP.patchValue({ autocompleteHIS1: "" });
      this.formRIEP.patchValue({ HISCIE1: event }, { emitEvent: false });
    }
  }
}
