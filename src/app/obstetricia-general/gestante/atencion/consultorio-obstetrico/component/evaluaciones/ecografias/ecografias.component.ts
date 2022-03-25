import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { ConsultasService } from '../../../services/consultas.service';
import { EcografiaResultadoComponent } from './ecografia-resultado/ecografia-resultado.component';
import { EcografiaSolicitudComponent } from './ecografia-solicitud/ecografia-solicitud.component';

@Component({
  selector: 'app-ecografias',
  templateUrl: './ecografias.component.html',
  styleUrls: ['./ecografias.component.css']
})
export class EcografiasComponent implements OnInit {

  ref: DynamicDialogRef;
  solicitudesEco: any[] = []
  resultadosEco: any[] = []

  idConsulta: string;
  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  nroEmbarazo: string;
  nroHcl: string;

  Gestacion: any;
  dataPaciente2: any;
  estadoEdicion: Boolean;

  nroAtencion: any;
  opciones: any;

  listaUpsHis: any;
  idIpress: any;
  edadPaciente: any;
  sexoPaciente: any;

  nroConsultaGuardada: any;
  constructor(private formBuilder: FormBuilder,
    private dialog: DialogService,
    private PrestacionService: PrestacionService,
    private CieService: CieService,
    private messageService: MessageService,
    private DxService: ConsultasService) {

    /*********RECUPERAR DATOS*********/
    this.idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    console.log("ipress", this.idIpress)

    /*usando local storage*/
    this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
    this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));
    this.edadPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.edadAnio;
    this.sexoPaciente = JSON.parse(localStorage.getItem('datacupos')).paciente.sexo;
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
  }
  async recuperarEcografias() {
    let aux = {
      id: this.idConsulta,
      nroHcl: this.nroHcl,
      nroEmbarazo: this.nroEmbarazo,
      nroAtencion: this.nroAtencion
    }
    this.DxService.getConsultaPrenatalByEmbarazo(aux).subscribe((res: any) => {
      this.nroConsultaGuardada = res.object.id;
      this.DxService.listarSolicitudesEco(this.nroConsultaGuardada).then((res: any) => {
        this.solicitudesEco = res.object;
      })
    })
  }
  openSolicitudEco() {
    //this.diagnosticoDialog = true;
    this.ref = this.dialog.open(EcografiaSolicitudComponent, {
      header: "SOLICITUD DE ECOGRAFIA",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal eco", data)
      this.recuperarEcografias();
    })
  }
  editarSolicitudEco(rowData) {
    let aux = {
      //index: index,
      row: rowData
    }
    this.ref = this.dialog.open(EcografiaSolicitudComponent, {
      header: "EDITAR SOLICITUD DE ECOGRAFIA",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal eco", data)
      this.recuperarEcografias();
    })
  }
  openResultadoEco() {
    //this.diagnosticoDialog = true;
    this.ref = this.dialog.open(EcografiaResultadoComponent, {
      header: "RESULTADO DE ECOGRAFAIA",
      contentStyle: {
        heigth: "700px",
        width: "980px",
        overflow: "auto",
      },
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log("data de modal eco", data)
      this.recuperarEcografias();
    })
  }

  ngOnInit(): void {
    this.recuperarEcografias();
  }

}
