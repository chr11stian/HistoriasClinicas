import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css'],
  providers: [DialogService]
})
export class EvaluacionesComponent implements OnInit {

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
  ngOnInit(): void {
  }
}
