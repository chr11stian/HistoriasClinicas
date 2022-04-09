import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-proced-imagenes',
  templateUrl: './proced-imagenes.component.html',
  styleUrls: ['./proced-imagenes.component.css'],
  providers: [DialogService]
})
export class ProcedImagenesComponent implements OnInit {

  ref: DynamicDialogRef;
  datePipe = new DatePipe('en-US');
  solicitudesEco: any[] = [];
  resultadosEco: any[] = [];

  historialEco: any[] = [];

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
  fechaConsulta: any = new Date();
  fechaInicio: any = new Date();

  constructor(
    private dialog: DialogService,
  ) { }

  ngOnInit(): void {
    
  }

}
