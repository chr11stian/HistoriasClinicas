import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { EscalaEEDP, DatosEEDP, datosEEDPTabla, escalaEval_EEDP_0_4_anios, tablaComparativa } from '../models/EscalaEEDP';
import { EvalAlimenService } from '../service/eval-alimen.service';


@Component({
  selector: 'app-escala-evaluacion-eedp',
  templateUrl: './escala-evaluacion-eedp.component.html',
  styleUrls: ['./escala-evaluacion-eedp.component.css'],

})
export class EscalaEvaluacionEEDPComponent implements OnInit {
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

  constructor(
    private evalAlimenService: EvalAlimenService,
    private dialogData: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      { edadNro: 1, edad: 'MES' }, { edadNro: 2, edad: 'MESES' }, { edadNro: 3, edad: 'MESES' },
      { edadNro: 4, edad: 'MESES' }, { edadNro: 5, edad: 'MESES' }, { edadNro: 6, edad: 'MESES' },
      { edadNro: 7, edad: 'MESES' }, { edadNro: 8, edad: 'MESES' }, { edadNro: 9, edad: 'MESES' },
      { edadNro: 10, edad: 'MESES' }, { edadNro: 12, edad: 'MESES' }, { edadNro: 15, edad: 'MESES' },
      { edadNro: 18, edad: 'MESES' }, { edadNro: 21, edad: 'MESES' }, { edadNro: 24, edad: 'MESES' },
      { edadNro: 3, edad: 'AÑOS' }, { edadNro: 4, edad: 'AÑOS' }
    ]
    this.datos = [
      { key: 'S6 (M)' },
      { key: 'S6 (M)' },
      { key: 'S6 (M)' }
    ]
    console.log('data EEDP ', this.dialogData.data);
    if (!this.dialogData.data.dataEEDP) this.getDatosVacios();
    else {
      this.evaluacionEEDP = this.dialogData.data.dataEEDP;
      this.indexSelected = this.dialogData.data.currentIndex;
      this.edadNroSelected = this.dialogData.data.currentIndex + 1;
      this.getDatos();
    }
  }

  async getDatos() {
    await this.evalAlimenService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
      this.evaluacionEEDP.map((evaluacion, index) => {
        this.escalaEEDP[index] = evaluacion.item;
      });
      let mes = this.edadNroSelected;
      this.evalAlimenService.getTablaComparativaMes(mes).then(data => {
        this.tablaComparativa = data;
      });
    });

    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    // this.arrayEdadEEDPSelected = [...this.arrayEdadEEDPSelected];
    //this.resultadoEvaluacion = this.escalaEEDP[this.indexSelected].condicion;
  }

  async getDatosVacios() {
    await this.evalAlimenService.getEscalaEEDParray().then(data => {
      this.escalaEEDP = data;
      let mes = this.edadNroSelected;
      this.evalAlimenService.getTablaComparativaMes(mes).then(data => {
        this.tablaComparativa = data;
      });
    });
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
  }

  async ChangeStep(index: number, edadNro: number, edad: string) {
    this.indexSelected = index;
    this.edadNroSelected = edadNro;
    this.edadSelected = edad;
    if (!this.evaluacionEEDP[this.indexSelected]) {
      this.examinador = ''
      this.fechaEvaluacion = ''
      this.resultadoEvaluacion = "Resultado de la evalaucion";
      this.disabled = false
    }
    else {
      this.examinador = this.examinador = this.evaluacionEEDP[this.indexSelected].examinador
      this.fechaEvaluacion = await this.transformDate(this.evaluacionEEDP[this.indexSelected].fecha);
      this.resultadoEvaluacion = this.evaluacionEEDP[this.indexSelected].condicion;
      this.disabledUpdate = false
    }
    this.arrayEdadEEDPSelected = this.escalaEEDP[this.indexSelected];
    this.puntaje = this.escalaEEDP[this.indexSelected][0].puntajeMaximo;
    console.log('change points ', this.escalaEEDP[this.indexSelected][0]);
    let mes = this.edadNroSelected;
    await this.evalAlimenService.getTablaComparativaMes(mes).then(data => {
      this.tablaComparativa = data;
    });
  }

  transformDate(fecha) {
    if (fecha === null) {
      fecha = '';
    }
    else {
      fecha = fecha.split(' ')[0];
      this.disabled = true;
    }
    return fecha;
  }

  llenarDatosEdadSelected(datosEdad: DatosEEDP[]) {

  }

  async saveTest() {
    if (this.disabled === false) {
      let sumaPuntaje = 0;
      let arraySelected = [];
      let dni = '00000000';
      arraySelected = this.arrayEdadEEDPSelected;
      arraySelected.map((array) => {
        sumaPuntaje += parseInt(array.puntajeEEDP);
      })
      let fecha = this.datePipe.transform(this.fechaEvaluacion, 'yyyy-MM-dd HH:mm:ss');
      let evaluacion_ninio = {
        edad: (this.edadNroSelected),
        condicion: "",
        fecha: fecha.toString(),
        puntajeTotalEedp: '',
        examinador: this.examinador,
        item: this.arrayEdadEEDPSelected
      };
      if (this.edadNroSelected === 1) {
        let dias = 32;
        let resultadoConsulta = ((sumaPuntaje / dias).toFixed(2)).toString();
        evaluacion_ninio.puntajeTotalEedp = sumaPuntaje.toString();
        this.tablaComparativa.map(tabla => {
          if (tabla.em_ec === resultadoConsulta) {
            let resultadp_pe = parseFloat(tabla.pe) * 100;
            console.log('resultado_pe', resultadp_pe);
            if (resultadp_pe >= 85) {
              evaluacion_ninio.condicion = "N";
              this.resultadoEvaluacion = "N (NORMAL)";
            } else if (69 < resultadp_pe && resultadp_pe < 85) {
              evaluacion_ninio.condicion = "R1";
              this.resultadoEvaluacion = "R1 (RIESGO)";
            }
            else {
              evaluacion_ninio.condicion = "R2";
              this.resultadoEvaluacion = "R2 (RETRASO)";
            }
          }
        })
        this.evalAlimenService.postEvaluacionEEDP(dni, evaluacion_ninio).then(result => {
          Swal.fire({
            icon: 'success',
            title: 'Test guarado correctamente',
            text: 'Mes' + this.edadNroSelected,
            showConfirmButton: false,
            timer: 1500,
          })
        })
            .catch((error) => {
              console.log('Error al guardar', error)
            });
      } else {
        let dias = 61;
        let sumaAnterior = parseFloat(this.evaluacionEEDP[this.indexSelected - 1].puntajeTotalEedp);
        let resultadoConsulta = (((sumaPuntaje + sumaAnterior) / dias).toFixed(2)).toString();
        evaluacion_ninio.puntajeTotalEedp = (sumaPuntaje + sumaAnterior).toString();
        this.tablaComparativa.map(tabla => {
          if (tabla.em_ec === resultadoConsulta) {
            let resultadp_pe = parseFloat(tabla.pe) * 100;
            if (resultadp_pe >= 85) {
              evaluacion_ninio.condicion = "N"
            } else if (69 < resultadp_pe && resultadp_pe < 85) evaluacion_ninio.condicion = "R1"
            else evaluacion_ninio.condicion = "R2"
          }
        })
        this.evalAlimenService.postEvaluacionEEDP(dni, evaluacion_ninio)
            .then(result => {
              Swal.fire({
                icon: 'success',
                title: 'Test guarado correctamente',
                text: 'Mes' + this.edadNroSelected,
                showConfirmButton: false,
                timer: 1500,

              })
            })
            .catch((error) => {
              console.log('Error al guardar', error)

            });
      }
    }
    this.ref.close();
  }

  calcularResultado() {
    let sumaPuntaje = 0;
    let arraySelected = [];
    let dias = this.edadNroSelected * 30;
    arraySelected = this.arrayEdadEEDPSelected;
    arraySelected.map((array) => {
      sumaPuntaje += parseInt(array.puntajeEEDP);
    })
    let resultadoConsulta = ((sumaPuntaje / dias).toFixed(2)).toString();
    console.log('resultado ', resultadoConsulta);
    this.tablaComparativa.map(tabla => {
      if (tabla.em_ec === resultadoConsulta) {
        let resultadp_pe = parseFloat(tabla.pe) * 100;
        console.log('cumple con la tabla', resultadp_pe);
        if (resultadp_pe >= 85) {
          this.resultadoEvaluacion = "N"
        } else if (69 < resultadp_pe && resultadp_pe < 85) this.resultadoEvaluacion = "R1"
        else this.resultadoEvaluacion = "R2"
      }
    })
    console.log('sumaPuntaje', sumaPuntaje)
  }

  updateEscalaEEDP() {
    if (this.disabledUpdate === false) {
      let dni = '00000000';
      let dias = this.edadNroSelected * 30;
      let sumaPuntaje = 0;
      let arraySelected = [];
      arraySelected = this.arrayEdadEEDPSelected;
      arraySelected.map((array) => {
        sumaPuntaje += parseInt(array.puntajeEEDP);
      })
      let fecha = this.datePipe.transform(this.fechaEvaluacion, 'yyyy-MM-dd HH:mm:ss');
      let evaluacion_ninio = {
        edad: (this.edadNroSelected),
        condicion: this.evaluacionEEDP[this.indexSelected].condicion,
        fecha: fecha.toString(),
        puntajeTotalEedp: this.evaluacionEEDP[this.indexSelected].puntajeTotalEedp,
        examinador: this.examinador,
        item: this.arrayEdadEEDPSelected,
        deleted: false
      };
      let resultadoConsulta = ((sumaPuntaje / dias).toFixed(2)).toString();
      evaluacion_ninio.puntajeTotalEedp = sumaPuntaje.toString();
      this.tablaComparativa.map(tabla => {
        if (tabla.em_ec === resultadoConsulta) {
          let resultadp_pe = parseFloat(tabla.pe) * 100;
          if (resultadp_pe >= 85) {
            evaluacion_ninio.condicion = "N"
          } else if (69 < resultadp_pe && resultadp_pe < 85) evaluacion_ninio.condicion = "R1"
          else evaluacion_ninio.condicion = "R2"
        }
      })
      this.evaluacionEEDP[this.indexSelected] = evaluacion_ninio;
      this.evalAlimenService.putEvaluacionEEDP(dni, this.evaluacionEEDP).then(data => {
        console.log('uptdate exitoso', data)
      })
    }
    this.ref.close();
  }

  getQueryParams(): void {
    this.route.queryParams
      .subscribe(params => {
        this.nroDoc = params['nroDoc']
      })
  }

  onClose() {

  }
}
