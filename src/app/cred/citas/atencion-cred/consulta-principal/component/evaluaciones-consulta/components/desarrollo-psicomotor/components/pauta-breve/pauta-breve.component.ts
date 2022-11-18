import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() onSave:EventEmitter<number>=new EventEmitter<number>();
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
  arrayPautaBreveDataRec: AnswerPB[] = [];

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
    this.getPautaBreveData();
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
      this.arrayEdadPautaBreveSelected = this.dataPautaBreve[this.indexSelected]

    });
  }

  async changeStep(index: number, edadNro: number, edad: string) {
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    this.arrayEdadPautaBreveSelected = this.dataPautaBreve[this.indexSelected];
    console.log('valores nro selected', this.edadNroSelected, 'edad selected ', this.edadSelected);
  }

  saveTest() {
    this.analyzePautaBreve(this.arrayEdadPautaBreveSelected);
    this.pautaBreveService.postAgregarPB(this.idConsulta, this.dataPB).subscribe((res: any) => {
      if (res.cod == "2121") {
        this.onSave.emit(3);
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

  getPautaBreveData(): void {
    this.pautaBreveService.getPromisePBByIdConsulta(this.idConsulta).then((res: any) => {
      if (res.cod == "2121") {
        this.verifyIndexMonth(res.object.evaluacionPautaBreveMes.mesEdad);
        console.log('respuesta ', res);
        this.arrayEdadPautaBreveSelected = res.object.evaluacionPautaBreveMes.listaItemPB;
        this.observaciones = res.object.evaluacionPautaBreveMes.observacion
      }
    });
  }

  analyzePautaBreve(arrayPB: AnswerPB[]): void {
    let countDeficit: number = 0;
    let fullDiagnostic: string = "";
    let areaList: string[] = [];
    let diagnostic: string = "";
    let hash = {};
    arrayPB.forEach(item => {
      if (item.estadoD) {
        countDeficit++;
        if ((item.areaEvaluacion.length == 1))
          areaList.push(this.analyzeArea(item.areaEvaluacion));
        else {
          item.areaEvaluacion.split("_").forEach(area => areaList.push(this.analyzeArea(area)));
        }
      }
    });
    areaList = areaList.filter(item => hash[item] ? false : hash[item] = true);
    areaList.forEach(item => fullDiagnostic = `${fullDiagnostic} ${item}`);
    countDeficit == 0 ? diagnostic = "NORMAL" : countDeficit < 3 ? diagnostic = "DEFICIT DEL DESARROLLO SEGUN PB" : diagnostic = "TRANSTORNO DEL DESARROLLO";
    this.dataPB = {
      codigoCIE10: '',
      codigoHIS: '',
      codigoPrestacion: '',
      evaluacionPautaBreveMes: {
        fechaAtencion: this.datePipe.transform(this.fechaEvaluacion, 'yyyy-MM-dd HH:mm:ss'),
        mesEdad: this.mesesTotal,
        diagnostico: diagnostic,
        docExaminador: this.dataExaminador.nroDocumento,
        listaItemPB: arrayPB,
        observacion: fullDiagnostic
      }
    }
  }

  analyzeArea(areas: string): string {
    let fullArea: string;
    switch (areas) {
      case "C":
        fullArea = "COORDINACIÓN"
        break;
      case "S":
        fullArea = "SOCIAL"
        break;
      case "L":
        fullArea = "LENGUAJE"
        break;
      case "M":
        fullArea = "MOTORA"
        break;
      default:
        break;
    }
    return fullArea;
  }

  verifyIndexMonth(monthAge: number): void {
    if (monthAge == 4 * 12)
      this.indexSelected = 16;
    if (monthAge == 3 * 12)
      this.indexSelected = 15;
    if (monthAge == 24)
      this.indexSelected = 14
    if (monthAge == 21)
      this.indexSelected = 13
    if (monthAge == 18)
      this.indexSelected = 12
    if (monthAge == 15)
      this.indexSelected = 11
    if (monthAge == 12)
      this.indexSelected = 10
    else
      this.indexSelected = monthAge - 1;
  }
}
