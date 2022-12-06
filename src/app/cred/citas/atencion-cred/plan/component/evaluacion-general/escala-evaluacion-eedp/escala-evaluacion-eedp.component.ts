import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { EedpService } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/services/eedp.service';
import { DataEEDP, ItemEEDP } from '../models/EscalaEEDP';
import { EvalAlimenService } from '../service/eval-alimen.service';


@Component({
  selector: 'app-escala-evaluacion-eedp',
  templateUrl: './escala-evaluacion-eedp.component.html',
  styleUrls: ['./escala-evaluacion-eedp.component.css'],

})
export class EscalaEvaluacionEEDPComponent implements OnInit {

  datePipe = new DatePipe('en-US');
  dataEEDP: DataEEDP;
  dataTabla: any;
  arrayRptas: any[] = [];
  //nuevos
  fechaAtencion: string;
  mesesTotal: number;
  chronologicalAge: number;
  evalResult: any;

  constructor(
    private dialogData: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private testService: EvalAlimenService,
    private eedpService: EedpService,
  ) {
    this.dataTableEEDP();
    this.dataEEDP = this.dialogData.data;
    this.arrayRptas = this.dataEEDP.listaUltimasPreguntas;
  }

  ngOnInit(): void {

  }
  dataTableEEDP() {
    this.eedpService.getDatosTablaEEDP().then(res => {
      this.dataTabla = res;
    });
  }
}
