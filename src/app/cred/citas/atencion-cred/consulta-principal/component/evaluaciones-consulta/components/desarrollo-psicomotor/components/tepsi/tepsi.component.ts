import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TepsiService} from "../../services/tepsi.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {dato} from "../../../../../../../../models/data";
import {puntaje, contenedorSubTest, resultado, itenTestResultado, listaPregunta} from '../models/tepsi';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tepsi',
  templateUrl: './tepsi.component.html',
  styleUrls: ['./tepsi.component.css']
})
export class TepsiComponent implements OnInit {

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
  chartData: any;
  horizontalOptions:any
  displayTest:boolean[]=[false,false,false]
  arregloSubtest=[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                  [false,false,false,false,false,false,false,false,false,false,false,false]];
  subPreguntas=[
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false],
  [false,false,false,false,false,false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false],
   [false,false,false]]
  tablaPuntajeTotal:puntaje[];
  tablaSubTestG:contenedorSubTest[]=[];
  datosGeneralesFG:FormGroup;
  anioEdad:number;
  mesEdad:number;
  diaEdad:number;
  rango:number=0
  fechaNacimiento=''
  attributeLocalS = 'documento'
  data:dato
  idConsulta:string
  usuario:any


  minimo:number[]=[5,5,3,4,2,2,2,2,2,2,2,3,2]
  indicePregunta:number[]=[3,4,6,7,12,13,14,15,16,17,18,23,24]
  constructor(private tepsiService:TepsiService,
              private messageService: MessageService) {

    this.buildForm();
    // iniciamos x defecto
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.usuario=JSON.parse(localStorage.getItem('usuario'))
    this.getFC('nombreExaminador').setValue(`${this.usuario.nombres} ${this.usuario.apellidos}`)
    this.idConsulta=this.data.idConsulta
    this.anioEdad=this.data.anio;
    this.mesEdad=this.data.mes;
    this.diaEdad=this.data.dia
    // this.fechaNacimiento=this.data.fechaNacimiento;
    // this.fechaNacimiento='2017/08/17 05:00:00';
  }
  ngOnInit(): void {
    // this.calcularEdadDinamico(this.getFC('fechaSelected').value)
    this.determinarRango();
    this.getTablaPuntaje();
    this.getTestTepsi();
  }
  buildForm(){
    this.datosGeneralesFG=new FormGroup({
      nombreExaminador:new FormControl('',Validators.required),
      fechaSelected:new FormControl(new Date(),Validators.required)
    })
  }
  traerPuntaje(){
    const aux=this.resultadoA
    // console.log('a imprimir',aux[0].puntajeT,aux[1].puntajeT,aux[2].puntajeT,aux[3].puntajeT)
    return [aux[0].puntajeT,aux[1].puntajeT,aux[2].puntajeT,aux[3].puntajeT]
  }
  determinaColor(){
    const aux=this.resultadoA
    let color:string;
    const arreglo=  aux.map((item)=>{
      if(item.categoria=='Normal'){
        color='green';
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

  reconstruirTest(arreglo:any[]){
    const aux=arreglo.map((element)=>{
      return element.valor==1?true:false;
    })
    return aux
  }
  isUpdate:boolean=false
  async getTestTepsi(){
    await this.tepsiService.getConsultaTepsi(this.idConsulta).then((resp)=>{
      if (resp['cod']=='2121'){
        this.isUpdate=true;
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Registro recuperado', detail: 'Registro recuperado satisfactoriamente'});
        const resultado=resp['object']['testTepsi'];
        this.getFC('fechaSelected').setValue(new Date(resultado['fechaAtencion']))
        this.anioEdad=resultado['edad']['anio']
        this.mesEdad=resultado['edad']['mes']
        this.diaEdad=resultado['edad']['dia']
        this.getFC('nombreExaminador').setValue(resultado['docExaminador'])
        this.arregloSubtest[0]= this.reconstruirTest(resultado['subTestCoordinacion']['listItemTest']);
        this.calcularResultadoSubTest1(1)

        this.arregloSubtest[1]= this.reconstruirTest(resultado['subTestLenguaje']['listItemTest']);
        this.calcularResultadoSubTest1(2)
        this.resconstruirSubPreguntas((resultado['subTestLenguaje']['listItemTest']));

        this.arregloSubtest[2]= this.reconstruirTest(resultado['subTestMotricidad']['listItemTest']);
        this.calcularResultadoSubTest1(3)

        // this.calcularTotal();
      }
    })



  }
  resconstruirSubPreguntas(arregloLenguaje){
    this.subPreguntas.forEach((element,index)=>{
        this.subPreguntas[index]=this.recuperarTrueFalse(arregloLenguaje[this.indicePregunta[index]-1].listaPreguntas)
      })
    console.log('respuesta',this.subPreguntas);
  }
  recuperarTrueFalse(arreglo){
    let arregloAux=arreglo.map((element)=>{
      return element.valor;
    })
    return arregloAux
  }
  determinarRango(){
    let auxRango;
    if((this.anioEdad==2 && this.mesEdad<=5)||(this.anioEdad==2 && this.mesEdad==6 && this.diaEdad==0) ) {
      auxRango=1;
    }
    else{
      if((this.anioEdad==2 && this.mesEdad>=6)||(this.anioEdad==3 && this.mesEdad==0 && this.diaEdad==0) ){
        auxRango=2;
      }
      else{
        if((this.anioEdad==3 && this.mesEdad<=5)||(this.anioEdad==3 && this.mesEdad==6 &&this.diaEdad==0)){
          auxRango=3;
        }
        else{
          if((this.anioEdad==3 && this.mesEdad>=6) || (this.anioEdad==4 && this.mesEdad==0 && this.diaEdad==0)){
            auxRango=4;
          }
          else{
            if(( this.anioEdad==4 && this.mesEdad<=5) || (this.anioEdad==4 && this.mesEdad==6 && this.diaEdad==0 )){
              auxRango=5;
            }
            else{
              auxRango=6;
            }
          }
        }
      }
    }
    this.rango=auxRango;
  }
  getFC(control: string): AbstractControl {
    return this.datosGeneralesFG.get(control);
  }
  abrimosModal(index){
    console.log(index)
    this.displayTest[index]=true
  }
  evaluandoItem(index){
    let acumulador=this.calcularSumaArreglos(this.subPreguntas[index]);
    console.log(acumulador);
    if(acumulador>=this.minimo[index]){
    this.arregloSubtest[1][this.indicePregunta[index]-1]=true
    }
    else{
      this.arregloSubtest[1][this.indicePregunta[index]-1]=false
    }
    this.calcularResultadoSubTest1(2)
  }
  async getTablaPuntaje(){
    Swal.fire({title: 'Cargando Datos' });
    Swal.showLoading();
    await this.tepsiService.getTablaPuntaje1(this.rango).then((data)=>{
      this.tablaPuntajeTotal=data['object']['tablaPuntajeTotal'];
      this.tablaSubTestG.push({subTest:data['object']['tablaSubTestCoordinacion']})
      this.tablaSubTestG.push({subTest: data['object']['tablaSubTestLenguaje']})
      this.tablaSubTestG.push({subTest:data['object']['tablaSubTestMotricidad']})
      this.calcularResultadoSubTest1(1);
      this.calcularResultadoSubTest1(2);
      this.calcularResultadoSubTest1(3);
      this.calcularTotal()
      this.chart();
      Swal.close();
    });
  }
  calcularSumaArreglos(arregloBoolean:boolean[]){
    let sumaAux=0
    arregloBoolean.forEach((element)=>{
      if(element==true){
        sumaAux+=1;
      }
    })
    return sumaAux;
  }
  determinarCategoria(puntajeT:number){
    if(puntajeT>=40)
      return 'Normal'
    else{
      if(puntajeT>=30)
        return 'Riesgo'
      else
        return 'Retraso'
    }
  }
  calcularTotal(){
    this.resultadoA[0].puntajeBruto=this.resultadoA[1].puntajeBruto+this.resultadoA[2].puntajeBruto+this.resultadoA[3].puntajeBruto
    const element=this.tablaPuntajeTotal.find((item:puntaje)=>{
      return this.resultadoA[0].puntajeBruto===parseInt(item.puntajeBruto)
    })
    this.resultadoA[0].puntajeT=parseInt(element.puntajeT)
    this.resultadoA[0].categoria=this.determinarCategoria(parseInt(element.puntajeT));
  }
  isResolve:boolean[]=[false,false,false] //todo

  calcularResultadoSubTest1(indexSubTest:number) {//1,2,3
    this.resultadoA[indexSubTest].puntajeBruto = this.calcularSumaArreglos(this.arregloSubtest[indexSubTest-1])
    const element = this.tablaSubTestG[indexSubTest-1].subTest.find((item:puntaje) => {
      return this.resultadoA[indexSubTest].puntajeBruto == parseInt(item.puntajeBruto)
    })
    this.resultadoA[indexSubTest].puntajeT=parseInt(element.puntajeT)
    this.resultadoA[indexSubTest].categoria = this.determinarCategoria(parseInt(element.puntajeT))
    this.calcularTotal();
    this.chart();

  }
  save() {
    console.log('entramos al save')
    const faltante=this.isResolve.filter((element)=>{
      return element==false;
    })
    if(faltante.length==0){
      const fecha:string[]=(this.getFC('fechaSelected').value).toISOString().split('T')
      const hora:string=fecha[1].split('.')[0];
      const requestInput={
        codigoCIE10:"",
        codigoHIS:"",
        codigoPrestacion:"",
        testTepsi:{
          edad:{
            anio:this.anioEdad,//todo debe ser la misma fecha recuperada
            mes:this.mesEdad,
            dia:this.diaEdad
          },
          fechaAtencion:`${fecha[0]} ${hora}`,
          docExaminador:this.getFC('nombreExaminador').value,
          resultadoTestTotal:{
            puntajeBruto:this.resultadoA[0].puntajeBruto,
            puntajeT:this.resultadoA[0].puntajeT,
            categoria:this.resultadoA[0].categoria
          },
          subTestCoordinacion:{
            tipoSubTest:"COORDINACION",
            puntajeBruto:this.resultadoA[1].puntajeBruto,
            puntajeT:this.resultadoA[1].puntajeT,
            categoria:this.resultadoA[1].categoria,
            listItemTest:this.determinarArreglo('C',this.arregloSubtest[0])
          },
          subTestLenguaje:{
            tipoSubTest:"LENGUAJE",
            puntajeBruto:this.resultadoA[2].puntajeBruto,
            puntajeT:this.resultadoA[2].puntajeT,
            categoria:this.resultadoA[2].categoria,
            listItemTest:this.determinarArreglo2('L',this.arregloSubtest[1])
          },
          subTestMotricidad:{
            tipoSubTest:"MOTRICIDAD",
            puntajeBruto:this.resultadoA[3].puntajeBruto,
            puntajeT:this.resultadoA[3].puntajeT,
            categoria:this.resultadoA[3].categoria,
            listItemTest:this.determinarArreglo('M',this.arregloSubtest[2])
          }
        }


        }

      console.log('request inpu',requestInput)
      if(this.isUpdate){
        this.tepsiService.putConsultaTepsi(this.idConsulta,requestInput).subscribe((resp)=>{
          console.log(resp)
          this.messageService.add({severity:'success', summary:'Test Guardado', detail:'Registro Actualizado'});
          },(error)=>{
          console.log('error!!!!!!!!!!')
          })

      }
      else{
        this.tepsiService.postConsultaTepsi(this.idConsulta,requestInput).subscribe((resp)=>{
          this.messageService.add({severity:'success', summary:'Test Guardado', detail:'Registro Agregado'});
        },(error)=>{
          console.log('error!!!!!!!!!!')
        })
      }
    }
    else {
      this.messageService.add({severity:'error', summary:'Test no Guardado', detail:'Debe llenar todos los Test '});
    }
  }
  determinarArreglo(letra:string,arreglo:boolean[]):itenTestResultado[]{
    const arregloAux=arreglo.map((element,index)=>{
      return {codigo:`${index+1}${letra}`,valor:element?1:0}
    })
    return arregloAux
  }
  determinarArreglo2(letra:string,arreglo:any[]):itenTestResultado[]{
    // let arregloAux:[]=[];
    // let auxPregunta;
    // arreglo.forEach((item,index)=>{
    //   auxPregunta={codigo:`${index+1}${letra}`,valor:item?1:0}
    //   arregloAux.push(auxPregunta)
    // })
    const arregloAux:itenTestResultado[]=arreglo.map((element,index)=>{
      return {codigo:`${index+1}${letra}`,valor:element?1:0}
    })
    this.indicePregunta.forEach((element,index)=>{
      arregloAux[element-1].listaPreguntas=this.construirEstructura(this.subPreguntas[index])
    })
    return arregloAux
  }
  construirEstructura(arreglo:boolean[]):listaPregunta[]{
    const arregloAux=arreglo.map((element,index)=>{
      return {nroPregunta:index+1,valor:element}
    })
    return arregloAux
  }

}
