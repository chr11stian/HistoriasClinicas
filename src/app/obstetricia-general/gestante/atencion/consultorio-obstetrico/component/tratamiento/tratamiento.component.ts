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
  codMedicamento: any;
  aux: any;

  diagnosticosList: any[] = [];
  constructor(private formBuilder: FormBuilder,
    private obstetriciaService: ObstetriciaGeneralService,
    private dialog: DialogService,
    private messageService: MessageService,
    private tratamientoService: ConsultasService,
    private farmaciaService: IpressFarmaciaService) {
    this.buildForm();

    /*********RECUPERAR DATOS*********/
    this.renIpress = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    console.log("renipress", this.renIpress)
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
    this.recuperarTratamientos();
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
  async recuperarTratamientos() {
    await this.tratamientoService.listarTratamientosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.tratamientosComunes = res.object;
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
      id: this.idConsulta,
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
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion,
      tipoDoc: this.tipoDocRecuperado,
      nroDoc: this.nroDocRecuperado,
      tratamientosSuplementos: {
        acidoFolico: {
          descripcion: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            this.formRIEP.value.acidoFolicoDescripcion : "",
          numero: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            parseInt(this.formRIEP.value.acidoFolicoNumero) : 0,
          dosis: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            this.formRIEP.value.acidoFolicoDosis : "",
          viaAdministracion: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            this.formRIEP.value.acidoFolicoViaAdministracion : "",
          intervalo: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            this.formRIEP.value.acidoFolicoIntervalo : "",
          duracion: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            this.formRIEP.value.acidoFolicoDuracion : "",
          observaciones: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO" ?
            this.formRIEP.value.acidoFolicoObservaciones : ""
        },
        hierroYAcidoFolico: {
          descripcion: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            this.formRIEP.value.acidoFolicoDescripcion : "",
          numero: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            parseInt(this.formRIEP.value.acidoFolicoNumero) : 0,
          dosis: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            this.formRIEP.value.acidoFolicoDosis : "",
          viaAdministracion: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            this.formRIEP.value.acidoFolicoViaAdministracion : "",
          intervalo: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            this.formRIEP.value.acidoFolicoIntervalo : "",
          duracion: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            this.formRIEP.value.acidoFolicoDuracion : "",
          observaciones: this.formRIEP.value.acidoFolicoSuplemento === "ACIDO FOLICO Y HIERRO" ?
            this.formRIEP.value.acidoFolicoObservaciones : "",
        },
        calcio: {
          descripcion: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            this.formRIEP.value.calcioDescripcion : "",
          numero: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            parseInt(this.formRIEP.value.calcioNumero) : 0,
          dosis: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            this.formRIEP.value.calcioDosis : "",
          viaAdministracion: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            this.formRIEP.value.calcioViaAdministracion : "",
          intervalo: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            this.formRIEP.value.calcioIntervalo : "",
          duracion: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            this.formRIEP.value.calcioDuracion : "",
          observaciones: this.formRIEP.value.calcioSuplemento === "CALCIO" ?
            this.formRIEP.value.calcioObservaciones : "",
        }
      },
      //inmunizaciones: this.tratamientoInmunizaciones,
      //tratamientos: this.tratamientosComunes,
      //tratamientosSuplementos: this.suplementarios,
      //examenesAuxiliares: this.examenesAuxiliares,
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
          /*recuperar peso actual*/
          if (this.dataConsulta.funcionesVitales != null) {
            this.pesoActual = parseFloat(this.dataConsulta.funcionesVitales.peso)
            this.guardarEvaluacionNutricional();
          }

          if (this.dataConsulta.tratamientosSuplementos != null) {
            this.formRIEP.get('acidoFolicoSuplemento').setValue(
              this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion !== "" ?
                "ACIDO FOLICO" :
                (this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion !== "" ?
                  "ACIDO FOLICO Y HIERRO" : ""));
            if (this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion !== "") {
              this.formRIEP.get('acidoFolicoDescripcion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.descripcion);
              this.formRIEP.get('acidoFolicoNumero').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.numero);
              this.formRIEP.get('acidoFolicoDosis').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.dosis);
              this.formRIEP.get('acidoFolicoViaAdministracion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.viaAdministracion);
              this.formRIEP.get('acidoFolicoIntervalo').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.intervalo);
              this.formRIEP.get('acidoFolicoDuracion').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.duracion);
              this.formRIEP.get('acidoFolicoObservaciones').setValue(this.dataConsulta.tratamientosSuplementos.acidoFolico.observaciones);
            }
            else {
              if (this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion !== "") {
                this.formRIEP.get('acidoFolicoDescripcion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.descripcion);
                this.formRIEP.get('acidoFolicoNumero').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.numero);
                this.formRIEP.get('acidoFolicoDosis').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.dosis);
                this.formRIEP.get('acidoFolicoViaAdministracion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.viaAdministracion);
                this.formRIEP.get('acidoFolicoIntervalo').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.intervalo);
                this.formRIEP.get('acidoFolicoDuracion').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.duracion);
                this.formRIEP.get('acidoFolicoObservaciones').setValue(this.dataConsulta.tratamientosSuplementos.hierroYAcidoFolico.observaciones);
              }
              else {
                this.formRIEP.get('acidoFolicoDescripcion').setValue("");
                this.formRIEP.get('acidoFolicoNumero').setValue("");
                this.formRIEP.get('acidoFolicoDosis').setValue("");
                this.formRIEP.get('acidoFolicoViaAdministracion').setValue("");
                this.formRIEP.get('acidoFolicoIntervalo').setValue("");
                this.formRIEP.get('acidoFolicoDuracion').setValue("");
                this.formRIEP.get('acidoFolicoObservaciones').setValue("");
              }
            }
            this.formRIEP.get('calcioSuplemento').setValue(this.dataConsulta.tratamientosSuplementos.calcio.descripcion !== "" ? "CALCIO" : "");
            this.formRIEP.get('calcioDescripcion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.descripcion);
            this.formRIEP.get('calcioNumero').setValue(this.dataConsulta.tratamientosSuplementos.calcio.numero);
            this.formRIEP.get('calcioDosis').setValue(this.dataConsulta.tratamientosSuplementos.calcio.dosis);
            this.formRIEP.get('calcioViaAdministracion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.viaAdministracion);
            this.formRIEP.get('calcioIntervalo').setValue(this.dataConsulta.tratamientosSuplementos.calcio.intervalo);
            this.formRIEP.get('calcioDuracion').setValue(this.dataConsulta.tratamientosSuplementos.calcio.duracion);
            this.formRIEP.get('calcioObservaciones').setValue(this.dataConsulta.tratamientosSuplementos.calcio.observaciones);
          }
          /*recuperar evaluacion Nutricional*/
          if (this.dataConsulta.encargado != null) {
            /**Recuperar responsable de la atencion**/
            this.formRIEP.patchValue({ 'encargado': this.dataConsulta.encargado.tipoDoc + " " + this.dataConsulta.encargado.nroDoc });
          }

          if (this.dataConsulta.recomendaciones != null) {
            /* recuperar recomendaciones*/
            let w: number = 0;
            while (w < this.dataConsulta.recomendaciones.length) {
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

  traerDiagnosticosDeConsulta() {
    this.tratamientoService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }

  selectedOptionNameMedicamento(event, n) {
    console.log('lista de medicamentos ', this.medicamentosConDatos);
    if (n == 1) {
      this.codMedicamento = event.medicamento.codigo;
      this.formRIEP.patchValue({ acidoFolicoDescripcion: event.medicamento.nombre });
      this.formRIEP.patchValue({ stock: event.stock });
    }
    if (n == 2) {
      this.codMedicamento = event.medicamento.codigo;
      this.formRIEP.patchValue({ calcioDescripcion: event.medicamento.nombre });
      this.formRIEP.patchValue({ stock2: event.stock });
    }

  }

  listarMedicamentosFarmacia() {
    console.log("entrando a recuperar medicamentos de la farmacia");
    this.farmaciaService.getListaMedicamentosFarmaciaXIpress(this.renIpress).subscribe((data: any) => {
      if (data != undefined) {
        console.log(data.object);
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
            },
            lote: this.listaMedicamentos[i].lote,
            fechaVenc: this.listaMedicamentos[i].fechaVenc,
            viaAdministracion: this.listaMedicamentos[i].viaAdministracion,
            stock: this.listaMedicamentos[i].stock,
            stringMedicamento: this.listaMedicamentos[i].medicamento.nombre + " " + this.listaMedicamentos[i].medicamento.ff + " " + this.listaMedicamentos[i].medicamento.concentracion + " " + this.listaMedicamentos[i].medicamento.viaAdministracion + " Fecha Venc. " + this.listaMedicamentos[i].fechaVenc + " stock: " + this.listaMedicamentos[i].stock
          }
          this.medicamentosConDatos.push(cadena);
          console.log(this.medicamentosConDatos);
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
}
