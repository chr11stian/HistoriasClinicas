import { Component, OnInit } from '@angular/core';
import {TepsiService} from "../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/services/tepsi.service";
import {dato} from "../../../../../models/data";
import {resultado} from "../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/components/models/tepsi";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-test-tepsi',
  templateUrl: './test-tepsi.component.html',
  styleUrls: ['./test-tepsi.component.css']
})
export class TestTepsiComponent implements OnInit {
  attributeLocalS = 'documento'
  data:dato;
  nroDNI:string
  resultadoA:resultado[]=[{
    puntajeBruto:0,//test total
    puntajeT:0,
    categoria:''
  },{
    puntajeBruto:0,//subtest coordinacion
    puntajeT:0,
    categoria:''
  },{
    puntajeBruto:0,//subtest lenguaje
    puntajeT:0,
    categoria:''
  },
    {
      puntajeBruto:0,//subtest motricidad
      puntajeT:0,
      categoria:''
    }
  ]
  anioEdad:number
  mesEdad:number
  diaEdad:number
  fecha:Date;
  docExaminador:string
  chartData:any;
  horizontalOptions:any



  constructor(private tepsiService:TepsiService,
              private messageService: MessageService) {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.nroDNI=this.data.nroDocumento;
  }
  chart(){
    this.chartData = {
      labels: ['Test Total', 'Sub Test Coordinacion', 'Sub Test Lenguaje', 'Sub Test Motricidad'],
      datasets: [
        {
          label: 'Puntaje T Resultado Test Total',
          backgroundColor: this.determinaColor(),
          data: this.traerPuntaje(),
        }
      ]
    };
    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: 'black',
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'black'
          },
          grid: {
            color: '#AF0017'
          }
        },
        y: {
          ticks: {
            min: 0,
            max: 90,
            color: 'black'
          },
          grid: {
            color: '#AF0017'
          }
        }
      }
    };

  }
  determinaColor(){
    const aux=this.resultadoA
    let color:string;
    const arreglo=  aux.map((item)=>{
      if(item.categoria=='Normal'){
        color='#0C3866';
      }
      else{
        if(item.categoria=='Riesgo'){
          color='#F3D9DC'
        }
        else{
          color='#D77F8A'
        }
      }

      return color
    })

    return arreglo
  }
  traerPuntaje(){
    const aux=this.resultadoA
    // console.log('a imprimir',aux[0].puntajeT,aux[1].puntajeT,aux[2].puntajeT,aux[3].puntajeT)
    return [aux[0].puntajeT,aux[1].puntajeT,aux[2].puntajeT,aux[3].puntajeT]
  }
  ngOnInit(): void {
    this.getTestTepsi()
  }
   getTestTepsi(){
    this.tepsiService.getConsultaTepsiPorDNI(this.nroDNI).subscribe((resp)=>{
      if (resp['object']!=null){
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Registro Tepsi recuperado', detail: 'Registro recuperado satisfactoriamente'});
        const resultado=resp['object'];
        this.fecha=(new Date(resultado['fechaAtencion']))
        this.anioEdad=resultado['edad']['anio']
        this.mesEdad=resultado['edad']['mes']
        this.diaEdad=resultado['edad']['dia']
        this.docExaminador=resultado['docExaminador']
        const resultadoRecuperado=[{
          puntajeBruto:resultado.resultadoTestTotal.puntajeBruto,
          puntajeT:resultado.resultadoTestTotal.puntajeT,
          categoria:resultado.resultadoTestTotal.categoria
        },{
          puntajeBruto:resultado.subTestCoordinacion.puntajeBruto,
          puntajeT:resultado.subTestCoordinacion.puntajeT,
          categoria:resultado.subTestCoordinacion.categoria
        },{
          puntajeBruto:resultado.subTestLenguaje.puntajeBruto,
          puntajeT:resultado.subTestLenguaje.puntajeT,
          categoria:resultado.subTestLenguaje.categoria
        },
          {
            puntajeBruto:resultado.subTestMotricidad.puntajeBruto,
            puntajeT:resultado.subTestMotricidad.puntajeT,
            categoria:resultado.subTestMotricidad.categoria
          }
        ]
        this.resultadoA=resultadoRecuperado
        this.chart();
      }
      else{
        this.messageService.add({key: 'myKey1', severity:'error', summary: 'Resultado', detail: 'No existe aun Evaluacion Tepsi Registrada'});
      }
    })



  }

}
