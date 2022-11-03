import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EvalAlimenService } from 'src/app/cred/citas/atencion-cred/plan/component/evaluacion-general/service/eval-alimen.service';
import Swal from 'sweetalert2';
import { PautaBreveService } from '../../services/pauta-breve.service';
import { datosEEDPTabla, tablaComparativa } from '../models/eedp';
import { AnswerPB, EvaluationPB } from '../models/pautaBreve';
import { DatosConsulta } from '../models/eedp';
import { DesarrolloPsicomotorService } from '../../services/desarrollo-psicomotor.service';

@Component({
  selector: 'app-pauta-breve',
  templateUrl: './pauta-breve.component.html',
  styleUrls: ['./pauta-breve.component.css']
})
export class PautaBreveComponent implements OnInit {
  items: {}[];
  indexSelected: number = 0;
  edadNroSelected: number = 1;
  datos: {}[];
  resultadoEvaluacion: '';
  examinador: string;
  arrayEdadPautaBreveSelected: AnswerPB[];
  fechaEvaluacion: string;
  edadSelected: string = 'MES';
  disabled: boolean = true;
  escalaEEDP: datosEEDPTabla;
  tablaComparativa: tablaComparativa[];
  puntaje: string = '';
  idConsulta: string;
  dataPB: EvaluationPB;
  dataPautaBreve: any;
  datePipe = new DatePipe('en-US');
  mesesTotal: number = 0;
  dataExaminador: any;
  dataConsulta: DatosConsulta;
  observaciones: string;

  constructor(
    private testService: EvalAlimenService,
    private pautaBreveService: PautaBreveService,
    private desarrolloPsicomotorService: DesarrolloPsicomotorService,
  ) {
    this.getDatos();
    this.dataConsulta = JSON.parse(localStorage.getItem('documento'));
    this.dataExaminador = JSON.parse(localStorage.getItem('usuario'));
    this.idConsulta = JSON.parse(localStorage.getItem('documento')).idConsulta;
    this.mesesTotal = this.dataConsulta.anio * 12 + this.dataConsulta.mes
    this.fechaEvaluacion = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.examinador = this.dataExaminador.apellidos + ', ' + this.dataExaminador.nombres;
    console.log('meses totales ', this.mesesTotal);
    // this.indexSelected = this.mesesTotal - 1;
    console.log('data de la consulta desde pauta breve ', this.dataConsulta);
  }

  ngOnInit(): void {
    this.items = [
      { edadNro: 1, edad: 'MES' }, { edadNro: 2, edad: 'MESES' }, { edadNro: 3, edad: 'MESES' },
      { edadNro: 4, edad: 'MESES' }, { edadNro: 5, edad: 'MESES' }, { edadNro: 6, edad: 'MESES' },
      { edadNro: 7, edad: 'MESES' }, { edadNro: 8, edad: 'MESES' }, { edadNro: 9, edad: 'MESES' },
      { edadNro: 10, edad: 'MESES' }, { edadNro: 12, edad: 'MESES' }, { edadNro: 15, edad: 'MESES' },
      { edadNro: 18, edad: 'MESES' }, { edadNro: 21, edad: 'MESES' }, { edadNro: 24, edad: 'MESES' },
      { edadNro: 3, edad: 'AÑOS' }, { edadNro: 4, edad: 'AÑOS' }
    ]
  }

  async getDatos() {
    await this.testService.getPautaBreveArray().then(data => {
      this.dataPautaBreve = data;
      console.log('array de pauta breve ', this.dataPautaBreve);
      this.arrayEdadPautaBreveSelected = this.dataPautaBreve[this.indexSelected]
    });
  }

  async changeStep(index: number, edadNro: number, edad: string) {
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    this.arrayEdadPautaBreveSelected = this.dataPautaBreve[this.indexSelected];
  }

  saveTest() {
    let rpta: string = 'DEFICIT';
    let ansMonth = this.arrayEdadPautaBreveSelected.map(item => {
      let auxAns = {
        pregunta: item.pregunta,
        areaEvaluacion: item.areaEvaluacion,
        estadoN: item.estadoN,
        estadoD: item.estadoD
      }
      if (item.estadoD) {
        rpta += ' Nro pregunta:' + item.pregunta + '- Area: ' + item.areaEvaluacion + ',';
      }

      return auxAns;
    });
    // console.log('deficit ', rpta);
    this.dataPB = {
      codigoCIE10: '',
      codigoHIS: '',
      codigoPrestacion: '',
      evaluacionPautaBreveMes: {
        fechaAtencion: this.datePipe.transform(this.fechaEvaluacion, 'yyyy-MM-dd HH:mm:ss'),
        mesEdad: this.edadNroSelected,
        diagnostico: rpta == 'DEFICIT' ? 'NORMAL' : rpta,
        docExaminador: "89685545",
        listaItemPB: ansMonth,
        observacion: this.observaciones
      }
    }
    console.log('data to save ', this.dataPB);
    this.pautaBreveService.postAgregarPB(this.idConsulta, this.dataPB).subscribe((res: any) => {
      if (res.cod == "2121") {
        Swal.fire({
          icon: 'success',
          title: 'Se Guardo la Pauta Breve Correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar pauta breve',
          showConfirmButton: false,
          timer: 2000
        });
      }
      
    });
  }

  async confirmSaveTest() {
    await this.desarrolloPsicomotorService.verifyEvaluatedMonth(this.mesesTotal, this.dataConsulta.nroDocumento).then(res => {
      if (res) {
        Swal.fire({
          icon: 'info',
          title: 'Ya se guardo una evaluación para este mes',
          showConfirmButton: false,
          timer: 2000
        });
        return;
      } else {
        Swal.fire({
          title: 'Esta Seguro que Desea Guardar los Cambios?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.saveTest();
          }
        });
      }
    });
  }
}
