import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { escalaEval_EEDP_0_4_anios } from '../models/EscalaEEDP';
import { EvalAlimenService } from '../service/eval-alimen.service';
import { EscalaEvaluacionEEDPComponent } from '../escala-evaluacion-eedp/escala-evaluacion-eedp.component'

@Component({
  selector: 'app-eedp',
  templateUrl: './eedp.component.html',
  styleUrls: ['./eedp.component.css'],
  providers: [DialogService],
})
export class EEDPComponent implements OnInit {

  datosMeses: any[];
  escalaEEDP: escalaEval_EEDP_0_4_anios[];
  datosNinio = [];
  constructor(
    private evalAlimenService: EvalAlimenService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.datosMeses = [
      {
        area: 'Coordinacion', mes_1: 1, mes_2: 1, mes_3: 1, mes_4: 1, mes_5: 1, mes_6: 1,
        mes_7: 1, mes_8: 1, mes_9: 1, mes_10: 1, mes_12: 1, mes_15: 1, mes_18: 1, mes_21: 1, mes_24: 1,
      },
      {
        area: 'Social', mes_1: 1, mes_2: 1, mes_3: 1, mes_4: 1, mes_5: 1, mes_6: 1,
        mes_7: 1, mes_8: 1, mes_9: 1, mes_10: 1, mes_12: 1, mes_15: 1, mes_18: 1, mes_21: 1, mes_24: 1,
      }
    ]
    this.getData();
    
  }

  async getData(){
    await this.evalAlimenService.getEEDPBack().then(data => {
      this.escalaEEDP = data;
      this.DoArrayEEDP();
      console.log('data traida', this.escalaEEDP)
    });
  }

  DoArrayEEDP(){
    let arrayEscala = this.escalaEEDP;
    let arrayValoresS = [];
    let arrayValoresC = [];
    let arrayValoresL = [];
    let arrayValoresM = [];
    
    arrayEscala.map(mesNinio => {
      let item = mesNinio.item;
      let preguntaAreaS = [];
      let preguntaAreaC = [];
      let preguntaAreaL = [];
      let preguntaAreaM = [];
      item.map((pregunta, index) => {
        let areEvaluacion = pregunta.areEvaluacion.split('_');
        areEvaluacion.map(areaEva => {
          if (areaEva === "S") {
            let nroPregunta = pregunta.codigo.split('pregunta_')
            preguntaAreaS.push(nroPregunta[1])
          } else if (areaEva === "C") {
            let nroPregunta = pregunta.codigo.split('pregunta_')
            preguntaAreaC.push(nroPregunta[1])
          } else if (areaEva === "L") {
            let nroPregunta = pregunta.codigo.split('pregunta_')
            preguntaAreaL.push(nroPregunta[1])
          } else if (areaEva === "M") {
            let nroPregunta = pregunta.codigo.split('pregunta_')
            preguntaAreaM.push(nroPregunta[1])
          }
        });
      });
      arrayValoresS.push(preguntaAreaS);
      arrayValoresC.push(preguntaAreaC);
      arrayValoresL.push(preguntaAreaL);
      arrayValoresM.push(preguntaAreaM);
    });
    let ObjDefinitivoS = {
      area_codigo: "S",
      area_nombre: "Social",
      mes_1: arrayValoresS[0],
      mes_2: arrayValoresS[1],
      mes_3: arrayValoresS[2],
      mes_4: arrayValoresS[3],
      mes_5: arrayValoresS[4],
      mes_6: arrayValoresS[5],
      mes_7: arrayValoresS[6],
      mes_8: arrayValoresS[7],
      mes_9: arrayValoresS[8],
      mes_10: arrayValoresS[9],
      mes_12: arrayValoresS[10],
      mes_15: arrayValoresS[11],
      mes_18: arrayValoresS[12],
      mes_21: arrayValoresS[13],
      mes_24: arrayValoresS[14]
    }
    this.datosNinio.push(ObjDefinitivoS);
    let ObjDefinitivoC = {
      area_codigo: "C",
      area_nombre: "Coordinación",
      mes_1: arrayValoresC[0],
      mes_2: arrayValoresC[1],
      mes_3: arrayValoresC[2],
      mes_4: arrayValoresC[3],
      mes_5: arrayValoresC[4],
      mes_6: arrayValoresC[5],
      mes_7: arrayValoresC[6],
      mes_8: arrayValoresC[7],
      mes_9: arrayValoresC[8],
      mes_10: arrayValoresC[9],
      mes_12: arrayValoresC[10],
      mes_15: arrayValoresC[11],
      mes_18: arrayValoresC[12],
      mes_21: arrayValoresC[13],
      mes_24: arrayValoresC[14]
    }
    this.datosNinio.push(ObjDefinitivoC);
    let ObjDefinitivoL = {
      area_codigo: "L",
      area_nombre: "Lenguaje",
      mes_1: arrayValoresL[0],
      mes_2: arrayValoresL[1],
      mes_3: arrayValoresL[2],
      mes_4: arrayValoresL[3],
      mes_5: arrayValoresL[4],
      mes_6: arrayValoresL[5],
      mes_7: arrayValoresL[6],
      mes_8: arrayValoresL[7],
      mes_9: arrayValoresL[8],
      mes_10: arrayValoresL[9],
      mes_12: arrayValoresL[10],
      mes_15: arrayValoresL[11],
      mes_18: arrayValoresL[12],
      mes_21: arrayValoresL[13],
      mes_24: arrayValoresL[14]
    }
    this.datosNinio.push(ObjDefinitivoL);
    let ObjDefinitivoM = {
      area_codigo: "M",
      area_nombre: "Motora",
      mes_1: arrayValoresM[0],
      mes_2: arrayValoresM[1],
      mes_3: arrayValoresM[2],
      mes_4: arrayValoresM[3],
      mes_5: arrayValoresM[4],
      mes_6: arrayValoresM[5],
      mes_7: arrayValoresM[6],
      mes_8: arrayValoresM[7],
      mes_9: arrayValoresM[8],
      mes_10: arrayValoresM[9],
      mes_12: arrayValoresM[10],
      mes_15: arrayValoresM[11],
      mes_18: arrayValoresM[12],
      mes_21: arrayValoresM[13],
      mes_24: arrayValoresM[14]
    }
    this.datosNinio.push(ObjDefinitivoM);
    console.log('datos para mostrar', this.datosNinio);
  }

  openEvaluacionEEDP(){
    console.log('clinck  en modal');
    const header = "Escala Evaluacion EEDP";
    const ref = this.dialogService.open(EscalaEvaluacionEEDPComponent, {
      header: header,
      height: "90%",
      width: "85%",
      baseZIndex: 10000
    });
  }
}
