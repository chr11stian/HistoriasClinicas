import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { EvalAlimenService } from 'src/app/cred/citas/atencion-cred/plan/component/evaluacion-general/service/eval-alimen.service';
import Swal from 'sweetalert2';
import { EedpService } from '../../services/eedp.service';
import { AnswerEEDP, datosEEDPTabla, escalaEval_EEDP_0_4_anios, ItemEEDP, tablaComparativa, TestEEDP } from '../models/eedp';

@Component({
  selector: 'app-eedp',
  templateUrl: './eedp.component.html',
  styleUrls: ['./eedp.component.css']
})
export class EedpComponent implements OnInit {
  items: {}[];
  indexSelected: number = 0;
  edadNroSelected: number = 1;
  edadSelected: string = 'MES';
  datos: {}[];
  escalaEEDP: datosEEDPTabla;
  evaluacionEEDP: escalaEval_EEDP_0_4_anios[];
  datosEvaluacion: escalaEval_EEDP_0_4_anios;
  arrayEdadEEDPSelected: datosEEDPTabla[];
  puntaje: '';
  tablaComparativa: tablaComparativa[];
  examinador: string;
  fechaEvaluacion: string;
  resultadoEvaluacion = "Resultado de la evalaucion";
  datePipe = new DatePipe('en-US');
  nroDoc: any;
  totalPoints: number = 0;
  monthPoints: number = 0;
  itemEEDP: ItemEEDP;
  listaPreguntas: ItemEEDP[] = [];
  dataTestEEDP: TestEEDP;
  escaleEEDP: datosEEDPTabla;
  inputDay: any = new Date();
  anioEdad: number = 0;
  mesEdad: number = 0;
  diaEdad: number = 0;
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
  arrayRptas: any;
  mesesTotal: number;
  areaEvalu: string;

  constructor(
    private evalAlimenService: EvalAlimenService,
    private testService: EvalAlimenService,
    private eedpService: EedpService,
  ) {
    let dataDocument = JSON.parse(localStorage.getItem('documento'))
    this.idConsulta = dataDocument.idConsulta;
    console.log('id de consulta ', this.idConsulta);
    this.fechaEvaluacion = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dataTableEEDP();
    this.anioEdad = dataDocument.anio;
    this.mesEdad = dataDocument.mes;
    this.diaEdad = dataDocument.dia;
    this.chronologicalAge = this.anioEdad * 360 + this.mesEdad * 30 + this.diaEdad;
    this.mesesTotal = this.anioEdad * 12 + this.mesEdad;
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
    this.getDatos();
  }

  async getDatos() {
    await this.evalAlimenService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
      let mes = this.edadNroSelected;
      this.evalAlimenService.getTablaComparativaMes(mes).then(data => {
        this.tablaComparativa = data;
      });
      this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
      this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    });
  }

  async saveTest() {
    this.monthPoints = 0;
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
      this.tablaPuntajeEstandar.forEach(item => {
        if (String(this.standardPoints) == item.em_ec) {
          this.coeficienteDesarrollo = item.pe;
          console.log('item de tabla ', item, 'coef des ', this.coeficienteDesarrollo, typeof (this.coeficienteDesarrollo));
        }
      })
    });
    console.log('coeficiente 2 ', this.coeficienteDesarrollo);
    if (this.coeficienteDesarrollo >= 0.85)
      this.diagnostico = 'NORMAL'
    if (this.coeficienteDesarrollo <= 0.84 && this.coeficienteDesarrollo >= 0.70)
      this.diagnostico = 'RIESGO'
    if (this.coeficienteDesarrollo <= 0.69)
      this.diagnostico = 'RETRASO'
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
        docExaminador: "89685545",
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
    // console.log('data to save ', this.dataTestEEDP);
    // this.eedpService.postAgregarEEDP(this.idConsulta, this.dataTestEEDP).subscribe((res: any) => {
    //   this.arrayRptas = res.object.testEedp.listaUltimasPreguntas;
    //   console.log('datos recien recogidos ', this.arrayRptas);
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Se Guardo el test EEDP Correctamente',
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    // })

    this.eedpService.postPromiseAddEEDP(this.idConsulta, this.dataTestEEDP).then(data => {
      console.log('data before validation ', data);
      if (data == undefined) {
        Swal.fire({
          icon: 'error',
          title: 'No es posible guardar otra vez para el mes ' + this.mesesTotal,
          showConfirmButton: false,
          timer: 1500
        });
        return
      }
      console.log('data to response save eedp ', data);
      Swal.fire({
        icon: 'success',
        title: 'Se Guardo el test EEDP Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  calculateArea(lista: ItemEEDP[], area: string): number {
    let codArea;
    lista.forEach(item => {
      item.listItemEedp.forEach(item2 => {
        let areas = item2.areaEvaluacion.split("_")
        // console.log('areas ', areas, 'length', areas.length);
        for (let i = 0; i < areas.length; i++) {
          if (areas[i] == area && item2.puntajeEEDP) {
            // console.log('se encontro ', area, item2.codigo);
            codArea = item2.pregunta;
          }
        }
      })
    });
    return codArea;
  }

  async changeStep(index: number, edadNro: number, edad: string, prevArray: any) {
    this.monthPoints = 0;
    console.log('arreglo anterior de test ', prevArray);
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
    }
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
}
