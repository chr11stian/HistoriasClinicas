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
import { IpressFarmaciaService } from 'src/app/modulos/ipress-farmacia/services/ipress-farmacia.service';

@Component({
  selector: 'app-modal-tratamiento',
  templateUrl: './modal-tratamiento.component.html',
  styleUrls: ['./modal-tratamiento.component.css']
})
export class ModalTratamientoComponent implements OnInit {
  formTratamientoComun: FormGroup;
  dataTratamientosComunes: any[] = [];
  viaadministracionList: any[];
  dialogInmunizaciones = false;
  dataInmunizaciones: any[] = [];
  idObstetricia: string;
  datePipe = new DatePipe('en-US');

  intervaloList: any[];

  listaDeCIE: any;
  listaDeCIESIS: any;
  prestacionList: any[];

  medicamentosConDatos: any[] = [];
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
  renIpress: any;

  idEdicion: any;
  aux: any;

  idMedicamento: any;
  constructor(private form: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private PrestacionService: PrestacionService,
    private CieService: CieService,
    private DxService: ConsultasService,
    private MedicamentosService: MedicamentosService,
    private farmaciaService: IpressFarmaciaService,
    private messageService: MessageService) {

    //this.idObstetricia = this.obstetriciaGeneralService.idGestacion;

    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log("ipress", this.idIpress)
    this.renIpress = JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    console.log("renipress", this.renIpress)

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
    this.listarMedicamentosFarmacia();

    if (config.data) {
      this.llenarCamposTratamiento();
    }

    this.intervaloList = [
      { label: 'CADA 4 HORAS', value: 'CADA 4 HORAS' },
      { label: 'CADA 5 HORAS', value: 'CADA 5 HORAS' },
      { label: 'CADA 6 HORAS', value: 'CADA 6 HORAS' },
      { label: 'CADA 8 HORAS', value: 'CADA 8 HORAS' },
      { label: 'CADA 12 HORAS', value: 'CADA 12 HORAS' },
      { label: 'CADA 24 HORAS', value: 'CADA 24 HORAS' },
      { label: 'CONDICIONAL A FIEBRE', value: 'CONDICIONAL A FIEBRE' },
      { label: 'DOSIS UNICA', value: 'DOSIS UNICA' },
      { label: 'CADA 48 HORAS', value: 'CADA 48 HORAS' }
    ];
  }

  ngOnInit(): void {
    
  }

  buildForm() {
    this.formTratamientoComun = this.form.group({
      diagnostico: new FormControl("", [Validators.required]),
      prestacion: new FormControl("", [Validators.required]),

      nombre: new FormControl("", [Validators.required]),
      nombreMed: new FormControl("", [Validators.required]),
      stock: new FormControl("", [Validators.required]),
      cantidad: new FormControl("", [Validators.required]),
      dosis: new FormControl("", [Validators.required]),
      intervalo: new FormControl("", [Validators.required]),
      duracion: new FormControl("", [Validators.required]),
      fechaVencimiento: new FormControl("", [Validators.required]),
      observaciones: new FormControl("", [Validators.required]),

      efectosMedicamento: new FormControl("", [Validators.required]),
      instrucciones: new FormControl("", [Validators.required]),
      advertencias: new FormControl("", [Validators.required]),
      otrasIndicaciones: new FormControl("", [Validators.required]),

      ff: new FormControl("", [Validators.required]),
    })
  }

  traerDiagnosticosDeConsulta() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      console.log("diagnosticos:", this.diagnosticosList);
    })
  }
  onChangeDiagnostico() {
    this.PrestacionService.getProcedimientoPorCodigo(this.formTratamientoComun.value.diagnostico.codPrestacion).subscribe((res: any) => {
      this.listaDeCIESIS = res.object.procedimientos;
      this.formTratamientoComun.patchValue({ prestacion: res.object.descripcion });
    })
  }
  async enviarTratamiento() {
    var data = {
      medicamento: {
        id: this.formTratamientoComun.value.nombre.medicamento.id,
      },
      codPrestacion: this.formTratamientoComun.value.diagnostico.codPrestacion,
      cantidad: this.formTratamientoComun.value.cantidad,
      dosis: this.formTratamientoComun.value.dosis,
      intervalo: this.formTratamientoComun.value.intervalo,
      duracion: this.formTratamientoComun.value.duracion,
      fechaVenc: this.formTratamientoComun.value.fechaVencimiento,
      observaciones: this.formTratamientoComun.value.observaciones,
      cie10SIS: this.formTratamientoComun.value.diagnostico.cie10SIS,
      indicaciones: {
        instrucciones: this.formTratamientoComun.value.instrucciones,
        advertencias: this.formTratamientoComun.value.advertencias,
        efectosMedicamento: this.formTratamientoComun.value.efectosMedicamento,
        otrasIndicaciones: this.formTratamientoComun.value.otrasIndicaciones,
      }
    }
    console.log(data);

    await this.DxService.guardarTratamientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Tratamiento guardado correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
    })

  }
  async enviarEdicionTratamiento() {
    var data = {
      medicamento: {
        id: this.idMedicamento,
      },
      codPrestacion: this.formTratamientoComun.value.diagnostico.codPrestacion,
      cantidad: this.formTratamientoComun.value.cantidad,
      dosis: this.formTratamientoComun.value.dosis,
      intervalo: this.formTratamientoComun.value.intervalo,
      duracion: this.formTratamientoComun.value.duracion,
      fechaVenc: this.formTratamientoComun.value.fechaVencimiento,
      observaciones: this.formTratamientoComun.value.observaciones,
      cie10SIS: this.formTratamientoComun.value.diagnostico.cie10SIS,
      indicaciones: {
        instrucciones: this.formTratamientoComun.value.instrucciones,
        advertencias: this.formTratamientoComun.value.advertencias,
        efectosMedicamento: this.formTratamientoComun.value.efectosMedicamento,
        otrasIndicaciones: this.formTratamientoComun.value.otrasIndicaciones,
      }
    }
    console.log(data);

    await this.DxService.editarTratamientoGestante(this.nroHcl, this.nroEmbarazo, this.nroAtencion, data).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text:  'Tratamiento guardado correctamente',
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
  llenarCamposTratamiento() {
    this.DxService.listarDiagnosticosDeUnaConsulta(this.nroHcl, this.nroEmbarazo, this.nroAtencion).then((res: any) => {
      this.diagnosticosList = res.object;
      let configuracion = this.config.data.row;
      this.idEdicion = configuracion.id;
      this.formTratamientoComun.patchValue({ cantidad: configuracion.cantidad });
      this.formTratamientoComun.patchValue({ dosis: configuracion.dosis });
      this.formTratamientoComun.patchValue({ duracion: configuracion.duracion });
      this.formTratamientoComun.patchValue({ fechaVencimiento: configuracion.fechaVenc });
      this.formTratamientoComun.patchValue({ intervalo: configuracion.intervalo });
      this.formTratamientoComun.patchValue({ observaciones: configuracion.observaciones });
      this.formTratamientoComun.patchValue({ efectosMedicamento: configuracion.indicaciones.efectosMedicamento });
      this.formTratamientoComun.patchValue({ advertencias: configuracion.indicaciones.advertencias });
      this.formTratamientoComun.patchValue({ instrucciones: configuracion.indicaciones.instrucciones });
      this.formTratamientoComun.patchValue({ otrasIndicaciones: configuracion.indicaciones.otrasIndicaciones });
      this.formTratamientoComun.get("diagnostico").setValue(this.diagnosticosList.find(elemento => elemento.cie10SIS == configuracion.cie10SIS));
      this.PrestacionService.getProcedimientoPorCodigo(this.formTratamientoComun.value.diagnostico.codPrestacion).subscribe((res: any) => {
        this.formTratamientoComun.patchValue({ prestacion: res.object.descripcion });
      })
      this.filterItemsMed(configuracion.medicamento.nombre);
      this.formTratamientoComun.patchValue({ nombre: this.aux.find(elemento => elemento.medicamento.id == configuracion.medicamento.id) });
      this.selectedOptionNameMedicamento(this.aux.find(elemento => elemento.medicamento.id == configuracion.medicamento.id));
    })

  }
  async closeDialogGuardar() {
    await this.config.data ?
      this.enviarEdicionTratamiento().then((res) => this.ref.close())
      :
      this.enviarTratamiento().then((res) => this.ref.close())

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

  filterMedicamento(event) {
    this.MedicamentosService.searchMedicamento(event.query).subscribe((res: any) => {
      this.listaMedicamentos = res.object
    })
  }

  selectedOptionNameMedicamento(event) {
    console.log('lista de medicamentos ', this.medicamentosConDatos);
    this.idMedicamento = event.medicamento.id;
    this.formTratamientoComun.patchValue({ nombreMed: event.medicamento.nombre });
    this.formTratamientoComun.patchValue({ fechaVencimiento: event.fechaVenc });
    this.formTratamientoComun.patchValue({ stock: event.stock });
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

