import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { EvalAlimenService } from 'src/app/cred/citas/atencion-cred/plan/component/evaluacion-general/service/eval-alimen.service';
import Swal from 'sweetalert2';
import { EedpService } from '../../services/eedp.service';
import { AnswerEEDP, DatosConsulta, datosEEDPTabla, escalaEval_EEDP_0_4_anios, ItemEEDP, tablaComparativa, TestEEDP } from '../models/eedp';

@Component({
  selector: 'app-eedp',
  templateUrl: './eedp.component.html',
  styleUrls: ['./eedp.component.css']
})
export class EedpComponent implements OnInit {
  items: {}[];
  indexSelected: number;
  edadNroSelected: number = 1;
  edadSelected: string = 'MES';
  escalaEEDP: datosEEDPTabla;
  evaluacionEEDP: escalaEval_EEDP_0_4_anios[];
  datosEvaluacion: escalaEval_EEDP_0_4_anios;
  arrayEdadEEDPSelected: datosEEDPTabla[];
  puntaje: "";
  tablaComparativa: tablaComparativa[];
  examinador: string;
  dataExaminador: any;
  fechaEvaluacion: string;
  evalResult: string = "";
  datePipe = new DatePipe('en-US');
  nroDoc: any;
  totalPoints: number = 0;
  monthPoints: number = 0;
  itemEEDP: ItemEEDP;
  listaPreguntas: ItemEEDP[] = [];
  dataTestEEDP: TestEEDP;
  escaleEEDP: datosEEDPTabla;
  chronologicalAge: any;
  dataPatient: any;
  mentalAge: any;
  standardPoints: any;
  tablaPuntajeEstandar: any;
  coeficienteDesarrollo: any;
  mentalMonth: number = 1;
  diagnostico: any;
  idConsulta: any;
  dataTabla: any;
  arrayRptas: any[] = [];
  mesesTotal: number;
  areaEvalu: string;
  tableStatus: boolean = false;
  fechaAtencion: string;
  dataConsulta: DatosConsulta;

  constructor(
    private evalAlimenService: EvalAlimenService,
    private testService: EvalAlimenService,
    private eedpService: EedpService,
  ) {
    this.dataConsulta = JSON.parse(localStorage.getItem('documento'));
    this.dataExaminador = JSON.parse(localStorage.getItem('usuario'));
    this.idConsulta = this.dataConsulta.idConsulta;
    this.fechaEvaluacion = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dataTableEEDP();
    this.examinador = this.dataExaminador.apellidos + ', ' + this.dataExaminador.nombres;
    this.chronologicalAge = this.dataConsulta.anio * 360 + this.dataConsulta.mes * 30 + this.dataConsulta.dia;
    this.mesesTotal = this.dataConsulta.anio * 12 + this.dataConsulta.mes;
    this.arrayRptas = [
      { clave: "C", numeroPregunta: 0 },
      { clave: "S", numeroPregunta: 0 },
      { clave: "L", numeroPregunta: 0 },
      { clave: "M", numeroPregunta: 0 }
    ];
    this.edadNroSelected = this.dataConsulta.anio
  }

  ngOnInit(): void {
    /**Arreglo con los valores para armar la cabecera */
    this.items = [
      { edadNro: 1, edad: 'MES' }, { edadNro: 2, edad: 'MESES' }, { edadNro: 3, edad: 'MESES' },
      { edadNro: 4, edad: 'MESES' }, { edadNro: 5, edad: 'MESES' }, { edadNro: 6, edad: 'MESES' },
      { edadNro: 7, edad: 'MESES' }, { edadNro: 8, edad: 'MESES' }, { edadNro: 9, edad: 'MESES' },
      { edadNro: 10, edad: 'MESES' }, { edadNro: 12, edad: 'MESES' }, { edadNro: 15, edad: 'MESES' },
      { edadNro: 18, edad: 'MESES' }, { edadNro: 21, edad: 'MESES' }, { edadNro: 24, edad: 'MESES' }
    ]
    this.getDatos();
    this.getEEDP();
  }
  /**Recuperar datos para armar la tabla de preguntas de EEDP, asi como calcular el mes de  evaluacion */
  async getDatos() {
    await this.evalAlimenService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
      this.indexSelected = this.estimateMonthEEDP(this.dataConsulta.anio, this.dataConsulta.mes);
      let mes = this.edadNroSelected;
      this.evalAlimenService.getTablaComparativaMes(mes).then(data => {
        this.tablaComparativa = data;
      });
      this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
      this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    });
  }
  /** tabla de resultados de la evaluacion EEDP */
  async getEEDP() {
    let dataEEDP;
    await this.eedpService.getPromiseEEDPxIdConsulta(this.idConsulta).then(data => {
      dataEEDP = data;
    });
    if (dataEEDP == null)
      return
    this.arrayRptas = dataEEDP.testEedp.listaUltimasPreguntas;
    this.evalResult = dataEEDP.testEedp.diagnostico;
    // this.chronologicalAge = dataEEDP.testEedp
    this.fechaAtencion = this.datePipe.transform(dataEEDP.testEedp.fechaAtencion, 'dd/MM/yyyy');
    this.tableStatus = true;
  }

  async saveTest() {
    this.monthPoints = 0;
    /** calcular el puntaje total */
    let ansMonth = this.arrayEdadEEDPSelected.map(item => {
      if (item.puntajeEEDP) {
        this.monthPoints += parseInt(this.puntaje);
      }
      let auxAns = {
        pregunta: parseInt(item.codigo),
        puntajeEEDP: item.puntajeEEDP,
        areaEvaluacion: item.areEvaluacion
      }
      return auxAns;
    });
    this.itemEEDP = {
      edad: this.edadNroSelected,
      puntajeTotalEedp: this.monthPoints,
      puntajeMaximoEedp: parseInt(this.puntaje),
      listItemEedp: ansMonth
    }
    let dup;
    this.listaPreguntas.forEach(item => {
      if (item.edad === this.itemEEDP.edad) {
        dup = true;
      }
    })
    if (dup || this.itemEEDP.puntajeTotalEedp == 0) {

    } else {
      this.listaPreguntas.push(this.itemEEDP);
    }
    this.listaPreguntas.sort((a, b) => a.edad - b.edad);
    this.listaPreguntas.forEach(item => {
      this.totalPoints += item.puntajeTotalEedp;
    })
    for (let i = this.listaPreguntas.length - 1; i >= 0; i--) {
      if ((this.listaPreguntas[i].puntajeMaximoEedp * 5) == this.listaPreguntas[i].puntajeTotalEedp) {
        this.mentalMonth = this.listaPreguntas[i].edad;
      }
    }
    this.totalPoints = this.totalPoints + (this.mentalMonth - 1) * 30;
    this.standardPoints = parseFloat((this.totalPoints / this.chronologicalAge).toFixed(2));
    console.log('puntos estandar ', this.standardPoints);
    await this.testService.getTablaComparativaMes(this.mesesTotal).then(data => {
      this.tablaPuntajeEstandar = data;
      console.log('datos de la tabla puntaje estandar ', data);
      this.tablaPuntajeEstandar.forEach(item => {
        if (String(this.standardPoints) == item.em_ec) {
          this.coeficienteDesarrollo = item.pe;
          // console.log('item de tabla ', item, 'coef des ', this.coeficienteDesarrollo, typeof (this.coeficienteDesarrollo));
        }
      })
    });
    /**CALCULAR RESULTADO */
    // console.log('coeficiente de desarrollo ', this.coeficienteDesarrollo);
    if (this.coeficienteDesarrollo == undefined) {
      console.log('coeficiente indefinido ', this.coeficienteDesarrollo);
    }
    if (this.coeficienteDesarrollo >= 0.85)
      this.diagnostico = 'NORMAL'
    if (this.coeficienteDesarrollo <= 0.84 && this.coeficienteDesarrollo >= 0.70)
      this.diagnostico = 'RIESGO'
    if (this.coeficienteDesarrollo <= 0.69)
      this.diagnostico = 'RETRASO'
    /**ARMANDO OBJETO PARA ENVIAR */
    this.dataTestEEDP = {
      codigoCIE10: "",
      codigoHIS: "",
      codigoPrestacion: "",
      testEedp: {
        fechaAtencion: this.datePipe.transform(this.fechaEvaluacion, 'yyyy-MM-dd HH:mm:ss'),
        edadCronologica: this.chronologicalAge,
        edadMental: this.totalPoints,
        edadMes: this.mesesTotal,
        diagnostico: this.diagnostico,
        coeficienteDesarrollo: parseFloat(this.coeficienteDesarrollo),
        docExaminador: this.dataExaminador.nroDocumento,
        listaUltimasPreguntas: [
          {
            clave: 'C',
            numeroPregunta: this.calculateArea(this.listaPreguntas, 'C')
          }, {
            clave: 'S',
            numeroPregunta: this.calculateArea(this.listaPreguntas, 'S')
          }, {
            clave: 'L',
            numeroPregunta: this.calculateArea(this.listaPreguntas, 'L')
          }, {
            clave: 'M',
            numeroPregunta: this.calculateArea(this.listaPreguntas, 'M')
          }
        ],
        listaEvaluacionMesEDDP: this.listaPreguntas
      }
    }
    console.log('data eedp to save ', this.dataTestEEDP);

    // this.eedpService.postPromiseAddEEDP(this.idConsulta, this.dataTestEEDP).then(data => {
    //   console.log('data before validation ', data);
    //   if (data.cod == "2005") {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'No es posible guardar otra vez para el mes ' + this.mesesTotal,
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //     return
    //   }
    //   this.arrayRptas = data.testEedp.listaUltimasPreguntas;
    //   this.evalResult = data.testEedp.diagnostico;
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Se Guardo el test EEDP Correctamente',
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //   this.tableStatus = true;
    // });
  }

  calculateArea(lista: ItemEEDP[], area: string): number {
    let codArea;
    lista.forEach(item => {
      item.listItemEedp.forEach(item2 => {
        let areas = item2.areaEvaluacion.split("_")
        for (let i = 0; i < areas.length; i++) {
          if (areas[i] == area && item2.puntajeEEDP) {
            codArea = item2.pregunta;
          }
        }
      })
    });
    return codArea;
  }

  async changeStep(index: number, edadNro: number, edad: string, prevArray: any) {
    this.monthPoints = 0;

    console.log('arreglo anterior de test ', edadNro, 'index', index);
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    this.totalPoints;
    if (prevArray != undefined) {
      if (prevArray.puntajeTotalEedp > 0) {
        if (this.listaPreguntas.includes(prevArray))
          return
        this.listaPreguntas.push(prevArray);
      }
      // if (prevArray.puntajeTotalEedp == parseInt(this.puntaje) * 5) {
      //   this.mentalMonth = prevArray.edad;
      // }
    } else
      console.log('indefinido');
  }
  calcularResultado() {
    this.monthPoints = 0;

    this.arrayEdadEEDPSelected.forEach(item => {
      if (item.puntajeEEDP) {
        this.monthPoints += parseInt(this.puntaje);
      }
    });
    let ansMonth = this.arrayEdadEEDPSelected.map(item => {
      let auxAns = {
        pregunta: parseInt(item.codigo),
        puntajeEEDP: item.puntajeEEDP,
        areaEvaluacion: item.areEvaluacion
      }
      return auxAns
    });
    this.itemEEDP = {
      edad: this.edadNroSelected,
      puntajeTotalEedp: this.monthPoints,
      puntajeMaximoEedp: parseInt(this.puntaje),
      listItemEedp: ansMonth
    }
  }

  confirmSaveTest() {
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
    })
  }
  dataTableEEDP() {
    this.eedpService.getDatosTablaEEDP().then(res => {
      this.dataTabla = res;
      console.log('data de tabla res eedp ', this.dataTabla);
    });
  }
  dataConsoleToPerderTiempo() {
    this.mesesTotal.toFixed(2)
  }

  estimateMonthEEDP(actualYear: number, actualMonth: number): number {
    let EEDPMonth: number = 0;
    let indexMonth: number = 0;
    actualYear == 0 ? EEDPMonth = actualMonth : EEDPMonth = 12 * actualYear
      + actualMonth;
    if (EEDPMonth == 11)
      EEDPMonth = 12
    if (EEDPMonth == 13 || EEDPMonth == 14)
      EEDPMonth = 15
    if (EEDPMonth == 16 || EEDPMonth == 17)
      EEDPMonth = 18
    if (EEDPMonth == 19 || EEDPMonth == 20)
      EEDPMonth = 21
    if (EEDPMonth == 22 || EEDPMonth == 23)
      EEDPMonth = 24
    console.log('mes actual para eedp ', EEDPMonth);
    // console.log('eedp month ', this.items.indexOf(item => item.edadNro == 10));

    // this.items.indexOf(item => {
    //   console.log('items de eedp ', item);
    //   item.edadNro == EEDPMonth
    // })
    indexMonth = this.items.map((item: any) => { return item.edadNro }).indexOf(EEDPMonth)
    indexMonth--
    return indexMonth;

  }
}
