import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { EvalAlimenService } from 'src/app/cred/citas/atencion-cred/plan/component/evaluacion-general/service/eval-alimen.service';
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
  disabled = false;
  disabledUpdate = true;
  resultadoEvaluacion = "Resultado de la evalaucion";
  datePipe = new DatePipe('en-US');
  nroDoc: any;
  totalPoints: number = 0;
  monthPoints: number;
  itemEEDP: ItemEEDP;
  listaPreguntas: ItemEEDP[] = [];
  dataTestEEDP: TestEEDP;
  escaleEEDP: datosEEDPTabla;
  inputDay: any = new Date();
  anioEdad;
  mesEdad;
  diaEdad;
  chronologicalAge: any;
  dataPatient: any;
  mentalAge: any;
  standardPoints: any;
  tablaPuntajeEstandar: any;
  coeficienteDesarrollo: any;
  mentalMonth: number = 1;
  diagnostico: any;
  areaEvaluacion: string[] = ['C', 'S', 'L', 'M']

  constructor(
    private evalAlimenService: EvalAlimenService,
    private pacienteService: PacienteService,
    private testService: EvalAlimenService,
  ) {
    let data = {
      tipoDoc: "DNI",
      nroDoc: '10101025'
    }
    this.pacienteService.getPacienteByNroDoc(data).subscribe((res: any) => {
      this.dataPatient = res.object;
      console.log('data de paciente ', this.dataPatient);
    });
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
    // this.datos = [
    //   { key: 'S6 (M)' },
    //   { key: 'S6 (M)' },
    //   { key: 'S6 (M)' }
    // ]
    this.getDatos();
    this.calcularEdad();
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
        codigo: parseInt(item.codigo),
        puntajeEEDP: item.puntajeEEDP,
        areaEvaluacion: item.areEvaluacion
      }
      return auxAns;
    });
    this.itemEEDP = {
      edad: this.edadNroSelected,
      puntajeTotalEedp: this.monthPoints,
      puntajeMaximoEedp: parseInt(this.puntaje),
      itemEedp: ansMonth
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
    await this.testService.getTablaComparativaMes(this.mesEdad).then(data => {
      this.tablaPuntajeEstandar = data;
      this.tablaPuntajeEstandar.forEach(item => {
        if (this.standardPoints == item.em_ec) {
          this.coeficienteDesarrollo = item.pe;
        }
      })
    });
    if (this.coeficienteDesarrollo >= 0.85)
      this.diagnostico = 'N'
    if (this.coeficienteDesarrollo <= 0.84 && this.coeficienteDesarrollo >= 0.70)
      this.diagnostico = 'RI'
    if (this.coeficienteDesarrollo <= 0.69)
      this.diagnostico = 'RE'

    { this.diagnostico = 'RE' }
    console.log('mes mental ', this.mentalMonth);
    console.log('total points ', this.totalPoints, 'list to save ', this.listaPreguntas);
    console.log('coeficiente de desarrollo ', this.coeficienteDesarrollo)
    this.dataTestEEDP = {
      codigoCIE10: "Z009",
      codigoHIS: "Z009",
      codigoPrestacion: "0001",
      testEedp: {
        fechaAtencion: this.fechaEvaluacion,
        edadCronologica: this.chronologicalAge,
        edadMental: this.totalPoints,
        diagnostico: this.diagnostico,
        coeficienteDesarrollo: this.coeficienteDesarrollo,
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
        listaItemEedp: this.listaPreguntas
      }
    }
    console.log('data to save ', this.dataTestEEDP);
  }

  calculateArea(lista: ItemEEDP[], area: string): number {
    let codArea;
    lista.forEach(item => {
      item.itemEedp.forEach(item2 => {
        let areas = item2.areaEvaluacion.split("_")
        // console.log('areas ', areas, 'length', areas.length);
        for (let i = 0; i < areas.length; i++) {
          if (areas[i] == area && item2.puntajeEEDP) {
            // console.log('se encontro ', area, item2.codigo);
            codArea = item2.codigo;
          }
        }
      })
    });
    return codArea;
  }

  async changeStep(index: number, edadNro: number, edad: string, prevArray: any) {
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

  calcularEdad() {
    let fechaNacimiento: Date = new Date("11/14/2021");
    let dia = fechaNacimiento.getDate()
    let mes = fechaNacimiento.getMonth() + 1
    let ano = fechaNacimiento.getFullYear()

    // cogemos los ingresados
    let fecha_hoy: Date = this.inputDay;
    let ahora_ano = fecha_hoy.getFullYear()
    let ahora_mes = fecha_hoy.getMonth() + 1;
    let ahora_dia = fecha_hoy.getDate();

    let edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
      edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
      edad--;
    }
    if (edad >= 1900) {
      edad -= 1900;
    }

    let meses = 0;
    if (ahora_mes > mes && dia > ahora_dia)
      meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
      meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
      meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
      meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
      meses = 11;

    // calculamos los dias
    let dias = 0;
    if (ahora_dia > dia)
      dias = ahora_dia - dia;
    if (ahora_dia < dia) {
      let ultimoDiaMes: Date = new Date(ahora_ano, ahora_mes - 1, 0);
      dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    this.anioEdad = edad;
    this.mesEdad = meses;
    this.diaEdad = dias;
    this.chronologicalAge = this.mesEdad * 30 + this.diaEdad;
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
        codigo: parseInt(item.codigo),
        puntajeEEDP: item.puntajeEEDP,
        areaEvaluacion: item.areEvaluacion
      }
      return auxAns
    });
    this.itemEEDP = {
      edad: this.edadNroSelected,
      puntajeTotalEedp: this.monthPoints,
      puntajeMaximoEedp: parseInt(this.puntaje),
      itemEedp: ansMonth
    }
  }

  updateEscalaEEDP() {

  }
}
