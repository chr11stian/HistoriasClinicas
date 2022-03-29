import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { ConsultasService } from "../../services/consultas.service";
import Swal from "sweetalert2";
import { MessageService } from "primeng/api";
import { ModalProcedimientosComponent } from './modal-procedimientos/modal-procedimientos.component';
import { MedicamentosService } from 'src/app/mantenimientos/services/medicamentos/medicamentos.service';
import { IpressFarmaciaService } from 'src/app/modulos/ipress-farmacia/services/ipress-farmacia.service';
@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css'],
  providers: [DialogService]
})
export class ProcedimientosComponent implements OnInit {

  ref: DynamicDialogRef;

  /*campos para procedimientos*/
  procedimientos: any[] = [];
  dataProcedimientos: any;
  private nroFetos: number = 0;
  /********datos para poder calcular EVAL. nutricional valor e indicador*************/
  private talla: number;
  private imc: number;
  private pesoHabitual: number;
  private pesoActual: number;
  private indicador: '';
  /*****/
  dataConsulta: any;

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
  resumen: any[] = [];
  resumenPendientes: any[] = [];
  constructor(private formBuilder: FormBuilder,
    private dialog: DialogService,
    private messageService: MessageService,
    private tratamientoService: ConsultasService,
    private farmaciaService: IpressFarmaciaService) {
    //this.buildForm();

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
    //this.recuperarDatos();
    this.traerDiagnosticosDeConsulta();
    this.traerListaResumen();
    this.traerListaResumenPendientes();
    this.recuperarProcedimientos();
  }

  ngOnInit(): void {
  }

  traerListaResumen() {
    let data = {
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.tratamientoService.listarResumen(data).then((res: any) => {
      this.resumen = res.object;
      console.log("resumen:", this.resumen);
    })
  }
  traerListaResumenPendientes() {
    let data = {
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.tratamientoService.listaResumenPendientes(data).then((res: any) => {
      this.resumenPendientes = res.object;
      console.log("resumenPendientes:", this.resumenPendientes);
    })
  }
  traerDiagnosticosDeConsulta() {
    this.tratamientoService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }

  // recuperarDatos() {
  //   this.recuperarNroFetos();
  //   let aux = {
  //     id: this.idConsulta,
  //     nroHcl: this.nroHcl,
  //     nroEmbarazo: this.nroEmbarazo,
  //     nroAtencion: this.nroAtencion
  //   }
  //   this.tratamientoService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
  //     this.dataConsulta = res.object;
  //     console.log("data consulta:" + this.dataConsulta);

  //     if (res['cod'] = '2401') {
  //       if (this.dataConsulta != null) {
  //         this.messageService.add({
  //           severity: 'info',
  //           summary: 'Recuperado',
  //           detail: 'Registro recuperado satisfactoriamente'
  //         });
  //         if (this.dataConsulta.procedimientos != null) {
  //           /* recuperar procedimientos*/
  //           let p: number = 0;
  //           while (p < this.dataConsulta.procedimientos.length) {
  //             this.procedimientos.push(this.dataConsulta.procedimientos[p]);
  //             p++;
  //           }
  //         }
  //       }
  //     } else { this.messageService.add({ severity: 'success', summary: 'Registros', detail: 'No hay datos ingresados todavía' }); }
  //   }
  //   );
  // }
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
        this.recuperarProcedimientos();
        this.traerListaResumenPendientes();
    })
  }
  openDialogProcedimientoConsejeria(nombre) {
    this.ref = this.dialog.open(ModalProcedimientosComponent, {
      header: "PROCEDIMIENTOS",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
      data: nombre
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal PROCEDIMIENTOS", data)
      this.recuperarProcedimientos();
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
      this.recuperarProcedimientos();
    })
  }
  eliminarProcedimiento(codProcedimientoHIS) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar este registro?',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientoService.eliminarProcedimientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, codProcedimientoHIS).subscribe(
          (resp) => {
            this.recuperarProcedimientos();
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

  async recuperarProcedimientos() {
    await this.tratamientoService.listarProcedimientosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.procedimientos = res.object;
    })
  }

  // guardarTodosDatos() {
  //   const req = {
  //     id: this.idConsulta,
  //     nroHcl: this.nroHcl,
  //     nroEmbarazo: this.nroEmbarazo,
  //     nroAtencion: this.nroAtencion,
  //     tipoDoc: this.tipoDocRecuperado,
  //     nroDoc: this.nroDocRecuperado,
  //     procedimientos: this.procedimientos,
  //   }
  //   this.tratamientoService.updateConsultas(this.nroFetos, req).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //       console.log(req);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Actualizado correctamente',
  //         text: '',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       })
  //     }
  //   )
  // }
}
