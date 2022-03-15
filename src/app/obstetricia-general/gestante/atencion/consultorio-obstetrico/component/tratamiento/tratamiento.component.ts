import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ModalTratamientoComponent } from "./modal-tratamiento/modal-tratamiento.component";
import { ModalInmunizacionesComponent } from "./modal-inmunizaciones/modal-inmunizaciones.component";
import { ConsultasService } from "../../services/consultas.service";
import Swal from "sweetalert2";
import { ModalInterconsultaComponent } from "./modal-interconsulta/modal-interconsulta.component";
import { ModalRecomendacionesComponent } from "./modal-recomendaciones/modal-recomendaciones.component";
import { ModalExamenesAuxiliaresComponent } from "./modal-examenes-auxiliares/modal-examenes-auxiliares.component";
import { MessageService } from "primeng/api";
import { ModalProcedimientosComponent } from './modal-procedimientos/modal-procedimientos.component';

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
  /*campos para procedimientos*/
  procedimientos: any[] = [];
  dataProcedimientos: any;
  /*INTERCONSULTAS*/
  interconsultas: any[] = [];
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
  formInterconsultas: FormGroup;
  formRecomendaciones: FormGroup;
  formExamenesAuxiliares: FormGroup;
  /*CAMPOS PARA RECUPERAR LA DATA PRINCIPAL*/
  dataConsulta: any;
  /**Recupera el Id del Consultorio Obstetrico**/
  idConsultoriObstetrico: string;
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
  constructor(private formBuilder: FormBuilder,
    private obstetriciaService: ObstetriciaGeneralService,
    private dialog: DialogService,
    private messageService: MessageService,
    private tratamientoService: ConsultasService) {
    this.buildForm();

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

    this.listaViaAdministracion = [
      { name: 'ENDOVENOSA', code: "1" },
      { name: 'INHALADORA', code: "2" },
      { name: 'INTRADERMICO', code: "3" },
      { name: 'INTRAMUSCULAR', code: "4" },
      { name: 'NASAL', code: "5" },
      { name: 'OFTALMICO', code: "6" },
      { name: 'ORAL', code: "7" },
      { name: 'OPTICO', code: "8" },
      { name: 'RECTAL', code: "9" },
      { name: 'SUBCUTANEO', code: "10" },
      { name: 'SUBLINGUAL', code: "11" },
      { name: 'TOPICO', code: "12" },
      { name: 'VAGINAL', code: "13" },
    ];
    this.listaSuplementoAcido = [
      { name: "ACIDO FOLICO", code: "1" },
      { name: "ACIDO FOLICO Y HIERRO", code: "2" },
    ];
    this.listaSuplementoCalcio = [
      { name: "CALCIO", code: "1" },
    ];
    this.recuperarDatos();
  }
  private buildForm() {
    this.formRIEP = this.formBuilder.group({
      valor: new FormControl({ value: '', disabled: true }, [Validators.required]),
      indicador: new FormControl({ value: '', disabled: true }, [Validators.required]),
      descripcionc: ['', [Validators.required]],
      dosisc: ['', [Validators.required]],
      numeroc: ['', [Validators.required]],
      intervaloc: ['', [Validators.required]],
      viaAdministracionc: ['', [Validators.required]],
      duracionc: ['', [Validators.required]],
      observacionesc: ['', [Validators.required]],
      descripciona: ['', [Validators.required]],
      dosisa: ['', [Validators.required]],
      numeroa: ['', [Validators.required]],
      intervaloa: ['', [Validators.required]],
      viaAdministraciona: ['', [Validators.required]],
      duraciona: ['', [Validators.required]],
      observacionesa: ['', [Validators.required]],
      descripcionf: ['', [Validators.required]],
      dosisf: ['', [Validators.required]],
      numerof: ['', [Validators.required]],
      intervalof: ['', [Validators.required]],
      viaAdministracionf: ['', [Validators.required]],
      duracionf: ['', [Validators.required]],
      observacionesf: ['', [Validators.required]],
      encargado: ['', [Validators.required]],

      //suplementos
      acidoFolicoSuplemento: new FormControl(""),
      acidoFolicoDescripcion: new FormControl(""),
      acidoFolicoNumero: new FormControl(""),
      acidoFolicoDosis: new FormControl(""),
      acidoFolicoViaAdministracion: new FormControl(""),
      acidoFolicoIntervalo: new FormControl(""),
      acidoFolicoDuracion: new FormControl(""),
      acidoFolicoObservaciones: new FormControl(""),
      calcioSuplemento: new FormControl(""),
      calcioDescripcion: new FormControl(""),
      calcioNumero: new FormControl(""),
      calcioDosis: new FormControl(""),
      calcioViaAdministracion: new FormControl(""),
      calcioIntervalo: new FormControl(""),
      calcioDuracion: new FormControl(""),
      calcioObservaciones: new FormControl(""),
    })

  }
  ngOnInit(): void {
    this.recuperarInmunizaciones();
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
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal PROCEDIMIENTOS", data)
      if (data !== undefined)
        this.procedimientos.push(data);
      console.log(this.formTratamiento);
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
      if (data !== undefined) {
        this.procedimientos.splice(data.index, 1, data.row);
      };
    })
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
      if (data !== undefined)
        this.tratamientosComunes.push(data);
      console.log(this.formTratamiento);
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
      console.log('data de modal tratamiento ', data)
      if (data !== undefined) {
        this.tratamientosComunes.splice(data.index, 1, data.row);
      };
    })
  }
  openDialogInterconsultas() {
    this.ref = this.dialog.open(ModalInterconsultaComponent, {
      header: "INTERCONSULTA",
      contentStyle: {
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal interconsultas", data)
      if (data !== undefined)
        this.interconsultas.push(data);
      console.log(this.formInterconsultas);
    })
  }
  openDialogEditarinterconsultas(row, index) {
    let aux = {
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalInterconsultaComponent, {
      header: "INTERCONSULTA",
      contentStyle: {
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal interconsulta ', data)
      if (data !== undefined) {
        this.interconsultas.splice(data.index, 1, data.row);
      };
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
  openDialogExamenesAuxiliares() {
    this.ref = this.dialog.open(ModalExamenesAuxiliaresComponent, {
      header: "EXAMENES AUXILIARES",
      contentStyle: {
        width: "500px",
        heigth: "500px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal examenes Aux", data)
      if (data !== undefined)
        this.examenesAuxiliares.push(data);
      console.log(this.formExamenesAuxiliares);
    })
  }
  openDialogEditarAuxiliares(row, index) {
    let aux = {
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalExamenesAuxiliaresComponent, {
      header: "EXAMENES AUXILIARES",
      contentStyle: {
        width: "500px",
        heigth: "500px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal Exa. Aux. ', data)
      if (data !== undefined) {
        this.examenesAuxiliares.splice(data.index, 1, data.row);
      };
    })
  }
  recuperarDatoSuplementarios() {
    this.suplementarios = {
      acidoFolico: {
        descripcion: this.formRIEP.value.descripciona,
        dosis: this.formRIEP.value.dosisa,
        numero: this.formRIEP.value.numeroa,
        intervalo: this.formRIEP.value.intervaloa,
        viaAdministracion: this.formRIEP.value.viaAdministraciona,
        duracion: this.formRIEP.value.duraciona,
        observaciones: this.formRIEP.value.observacionesa
      },
      hierroYAcidoFolico: {
        descripcion: this.formRIEP.value.descripcionf,
        dosis: this.formRIEP.value.dosisf,
        numero: this.formRIEP.value.numerof,
        intervalo: this.formRIEP.value.intervalof,
        viaAdministracion: this.formRIEP.value.viaAdministracionf,
        duracion: this.formRIEP.value.duracionf,
        observaciones: this.formRIEP.value.observacionesf
      },
      calcio: {
        descripcion: this.formRIEP.value.descripcionc,
        dosis: this.formRIEP.value.dosisc,
        numero: this.formRIEP.value.numeroc,
        intervalo: this.formRIEP.value.intervaloc,
        viaAdministracion: this.formRIEP.value.viaAdministracionc,
        duracion: this.formRIEP.value.duracionc,
        observaciones: this.formRIEP.value.observacionesc
      }
    }
  }

  recuperarDatosEvaluacion() {
    this.evaluacionNutricional = {
      valor: this.pesoActual - this.pesoHabitual,
      indicador: this.indicador
    }
  }
  async recuperarInmunizaciones() {
    await this.tratamientoService.listarInmunizacionesDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.tratamientoInmunizaciones = res.object;
    })
  }
  guardarEvaluacionNutricional() {
    this.recuperarDatosEvaluacion();
    console.log("peso hab:" + this.pesoHabitual);
    console.log("peso actual" + this.pesoActual);
    let aux = 0;
    if (this.pesoActual != null && this.pesoHabitual != null) {
      aux = this.pesoActual - this.pesoHabitual;
      console.log(this.evaluacionNutricional.valor);
    }

    const req = {
      id: this.idConsultoriObstetrico,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion,
      // nroControlSis: 1,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
      evaluacionNutricional: { valor: aux, indicador: "GAP" }
    }
    this.tratamientoService.updateConsultas(this.nroFetos, req).subscribe(
      (resp) => {
        console.log(resp);
        console.log(req);
      }
    )
  }

  guardarTodosDatos() {
    this.recuperarDatoSuplementarios();
    const req = {
      id: this.idConsultoriObstetrico,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion,
      // nroControlSis: 1,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
      inmunizaciones: this.tratamientoInmunizaciones,
      tratamientos: this.tratamientosComunes,
      tratamientosSuplementos: this.suplementarios,
      interconsultas: this.interconsultas,
      examenesAuxiliares: this.examenesAuxiliares,
      recomendaciones: this.recomendaciones,
    }
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
  /* ELIMINAR ITEMS DE CADA TABLA */
  eliminarProcedimiento(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.procedimientos.splice(index, 1)
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
        this.tratamientosComunes.splice(index, 1)
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
  eliminarInterconsulta(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.interconsultas.splice(index, 1)
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
  eliminarExamenesAuxiliares(index) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenesAuxiliares.splice(index, 1);
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
  recuperarDatos() {
    this.recuperarNroFetos();
    let aux = {
      id: this.idConsultoriObstetrico,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }

    this.tratamientoService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.dataConsulta = res;
      console.log("data consulta:" + this.dataConsulta);


      if (res['cod'] = '2401') {
        // console.log(this.dataConsulta.tratamientos);
        if (this.dataConsulta != null) {
          this.messageService.add({
            severity: 'info',
            summary: 'Recuperado',
            detail: 'Registro recuperado satisfactoriamente'
          });
          /*recuperar peso actual*/
          if (this.dataConsulta.funcionesVitales != null) {
            this.pesoActual = parseFloat(this.dataConsulta.funcionesVitales.peso)
            this.guardarEvaluacionNutricional();
          }
          if (this.dataConsulta.evaluacionNutricional != null) {
            //    this.formRIEP.patchValue({'valor': parseFloat(this.dataConsulta.funcionesVitales.peso) - this.pesoHabitual});
            this.formRIEP.patchValue({ 'valor': this.dataConsulta.evaluacionNutricional.valor });
            this.formRIEP.patchValue({ 'indicador': this.dataConsulta.evaluacionNutricional.indicador });
          }

          /*recuperar tratamientos comunes*/
          if (this.dataConsulta.tratamientos != null) {
            let i: number = 0;
            while (i < this.dataConsulta.tratamientos.length) {
              this.tratamientosComunes.push(this.dataConsulta.tratamientos[i]);
              i++;
            }
          }
          if (this.dataConsulta.inmunizaciones != null) {
            let a: number = 0;
            while (a < this.dataConsulta.inmunizaciones.length) {
              this.tratamientoInmunizaciones.push(this.dataConsulta.inmunizaciones[a]);
              a++;
            }
          }
          if (this.dataConsulta.tratamientosSuplementos != null) {
            /*reuperar datos: tratamientos suplementarios - evaluacion suplmentaria - exam auxiliares*/
            /* recuperar suplementario acido folico*/
            this.formRIEP.patchValue({ 'descripciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion });
            this.formRIEP.patchValue({ 'numeroa': this.dataConsulta.tratamientosSuplementos.acidoFolico.numero });
            this.formRIEP.patchValue({ 'dosisa': this.dataConsulta.tratamientosSuplementos.acidoFolico.dosis });
            this.formRIEP.patchValue({ 'viaAdministraciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.viaAdministracion });
            this.formRIEP.patchValue({ 'intervaloa': this.dataConsulta.tratamientosSuplementos.acidoFolico.intervalo });
            this.formRIEP.patchValue({ 'duraciona': this.dataConsulta.tratamientosSuplementos.acidoFolico.duracion });
            this.formRIEP.patchValue({ 'observacionesa': this.dataConsulta.tratamientosSuplementos.acidoFolico.observaciones });
            /* recuperar suplementario hierroYAcidoFolico*/
            /*descripcion*/
            this.formRIEP.patchValue({ 'descripcionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion });
            this.formRIEP.patchValue({ 'numerof': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.numero });
            this.formRIEP.patchValue({ 'dosisf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.dosis });
            this.formRIEP.patchValue({ 'viaAdministracionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.viaAdministracion });
            this.formRIEP.patchValue({ 'intervalof': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.intervalo });
            this.formRIEP.patchValue({ 'duracionf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.duracion });
            this.formRIEP.patchValue({ 'observacionesf': this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.observaciones });
            /* recuperar suplementario calcio*/
            /*descripcion*/
            this.formRIEP.patchValue({ 'descripcionc': this.dataConsulta.tratamientosSuplementos.calcio.descripcion });
            this.formRIEP.patchValue({ 'numeroc': this.dataConsulta.tratamientosSuplementos.calcio.numero });
            this.formRIEP.patchValue({ 'dosisc': this.dataConsulta.tratamientosSuplementos.calcio.dosis });
            this.formRIEP.patchValue({ 'viaAdministracionc': this.dataConsulta.tratamientosSuplementos.calcio.viaAdministracion });
            this.formRIEP.patchValue({ 'intervaloc': this.dataConsulta.tratamientosSuplementos.calcio.intervalo });
            this.formRIEP.patchValue({ 'duracionc': this.dataConsulta.tratamientosSuplementos.calcio.duracion });
            this.formRIEP.patchValue({ 'observacionesc': this.dataConsulta.tratamientosSuplementos.calcio.observaciones });
          }
          if (this.dataConsulta.examenesAuxiliares != null) {
            /*recuperar examenes auxiliares*/
            this.formRIEP.patchValue({ 'examenesAuxiliares': this.dataConsulta.examenesAuxiliares });

          }
          /*recuperar evaluacion Nutricional*/
          // this.formRIEP.patchValue({ 'valor': this.dataConsulta.funcionesVitales.peso - this.pesoHabitual });
          if (this.dataConsulta.encargado != null) {
            /**Recuperar responsable de la atencion**/
            this.formRIEP.patchValue({ 'encargado': this.dataConsulta.encargado.tipoDoc + " " + this.dataConsulta.encargado.nroDoc });
          }

          /* recuperar interconsultas*/

          if (this.dataConsulta.interconsultas != null) {
            let y: number = 0;
            while (y < this.dataConsulta.interconsultas.length) {
              // console.log("interconsultas nro: " ,i);
              // console.log("interconsultas consta de: ", this.dataConsulta.interconsultas[i]);
              this.interconsultas.push(this.dataConsulta.interconsultas[y]);
              y++;
            }
          }
          if (this.dataConsulta.recomendaciones != null) {
            /* recuperar recomendaciones*/
            let w: number = 0;
            while (w < this.dataConsulta.recomendaciones.length) {
              // console.log("interconsultas nro: " ,i);
              // console.log("interconsultas consta de: ", this.dataConsulta.recomendaciones[i]);
              this.recomendaciones.push(this.dataConsulta.recomendaciones[w]);
              w++;
            }
          }
          if (this.dataConsulta.examenesAuxiliares != null) {
            /* recuperar EXAMENES AUXILIARES*/
            let z: number = 0;
            while (z < this.dataConsulta.examenesAuxiliares.length) {
              // console.log("interconsultas nro: " ,i);
              // console.log("interconsultas consta de: ", this.dataConsulta.examenesAuxiliares[i]);
              this.examenesAuxiliares.push(this.dataConsulta.examenesAuxiliares[z]);
              z++;
            }
          }
        } else { this.messageService.add({ severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía' }); }
      }
    });
  }
}
