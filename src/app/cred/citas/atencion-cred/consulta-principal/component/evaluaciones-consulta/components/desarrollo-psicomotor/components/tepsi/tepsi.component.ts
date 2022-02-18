import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TepsiService} from "../../services/tepsi.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {puntaje, resultado, contenedorSubTest, itenTestResultado, listaPregunta} from "../models/tepsi";
import {dato} from "../../../../../../../../models/data";

@Component({
  selector: 'app-tepsi',
  templateUrl: './tepsi.component.html',
  styleUrls: ['./tepsi.component.css']
})
export class TepsiComponent implements OnInit {
  basicData: any;
  horizontalOptions:any
  displayGrafico:boolean=false;
  display:boolean[]=[false,false,false]
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

  minimo:number[]=[5,5,3,4,2,2,2,2,2,2,2,3,2]
  indicePregunta:number[]=[3,4,6,7,12,13,14,15,16,17,18,23,24]
  constructor(private tepsiService:TepsiService,
              private messageService: MessageService,
              private rutaActiva:ActivatedRoute) {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    // this.idConsulta='620bb9b786bca43e001f570f'
    this.idConsulta=this.data.idConsulta
    this.fechaNacimiento=this.data.fechaNacimiento;
    console.log(this.idConsulta);
    this.buildForm();
  }
  traerPuntaje(){
    const aux=this.resultadoA
    console.log('a imprimir',aux[0].puntajeT,aux[1].puntajeT,aux[2].puntajeT,aux[3].puntajeT)
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
    this.basicData = {
      labels: ['Test Total', 'subTest Coordinacion', 'Sub Test Lenguaje', 'Sub Test Motricidad'],
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
            color: 'black'
          },
          grid: {
            color: '#AF0017'
          }
        }
      }
    };

  }
  ngOnInit(): void {
    this.calcularEdadDinamico(this.getFC('fechaSelected').value)
    this.getTestTepsi();
    console.log('impresion desde el ng on init')
  }
  buildForm(){
    this.datosGeneralesFG=new FormGroup({
      nombreExaminador:new FormControl('',Validators.required),
      fechaSelected:new FormControl(new Date(),Validators.required)
    })
  }
  reconstruirTest(arreglo:any[]){
    const aux=arreglo.map((element)=>{
      return element.valor==1?true:false;
    })
    return aux
  }
  isUpdate:boolean=false
  async getTestTepsi(){
    console.log('desde get test tepsi2')
    await this.tepsiService.getConsultaTepsi(this.idConsulta).then((resp)=>{
      if (resp['cod']=='2121'){
        this.isUpdate=true;
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Registro recuperado', detail: 'Registro recuperado satisfactoriamente'});
        const resultado=resp['object']['testTepsi'];
        this.getFC('fechaSelected').setValue(new Date(resultado['fechaAtencion']))
        this.calcularEdadDinamico(new Date((resultado['fechaAtencion'])))
        this.getFC('nombreExaminador').setValue(resultado['docExaminador'])
        this.arregloSubtest[0]= this.reconstruirTest(resultado['subTestCoordinacion']['listItemTest']);
        this.calcularResultadoSubTest1(1)

        this.arregloSubtest[1]= this.reconstruirTest(resultado['subTestLenguaje']['listItemTest']);
        this.calcularResultadoSubTest1(2)
        this.resconstruirSubPreguntas((resultado['subTestLenguaje']['listItemTest']));

        this.arregloSubtest[2]= this.reconstruirTest(resultado['subTestMotricidad']['listItemTest']);
        this.calcularResultadoSubTest1(3)
        console.log('en pleno susbcribe ')
      }
    })
    console.log('despues del suscribe')


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
    console.log('determinar rango 2')
    if((this.anioEdad==2 && this.mesEdad<=5)||(this.anioEdad==2 && this.mesEdad==6 && this.diaEdad==0) ) {
      return 1;
    }
    else{
      if((this.anioEdad==2 && this.mesEdad>=6)||(this.anioEdad==3 && this.mesEdad==0 && this.diaEdad==0) ){
        return 2;
      }
      else{
        if((this.anioEdad==3 && this.mesEdad<=5)||(this.anioEdad==3 && this.mesEdad==6 &&this.diaEdad==0)){
          return 3;
        }
        else{
          if((this.anioEdad==3 && this.mesEdad>=6) || (this.anioEdad==4 && this.mesEdad==0 && this.diaEdad==0)){
            return 4;
          }
          else{
            if(( this.anioEdad==4 && this.mesEdad<=5) || (this.anioEdad==4 && this.mesEdad==6 && this.diaEdad==0 )){
              return 5
            }
            else{
              return 6
            }
          }
        }
      }
    }
  }
  getFC(control: string): AbstractControl {
    return this.datosGeneralesFG.get(control);
  }
  abrimosModal(index){
    console.log(index)
    this.display[index]=true
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
  calcularEdadDinamico(fechaInput:Date){
    console.log('fecha nacimiento',this.fechaNacimiento)

    let fechaNacimiento: Date = new Date(this.fechaNacimiento); //requeriremos la fecha de nacimiento//formato mes/dia/año
    let dia = fechaNacimiento.getDate()
    let mes = fechaNacimiento.getMonth() + 1
    let ano = fechaNacimiento.getFullYear()

    // cogemos los ingresados
    let fecha_hoy:Date= fechaInput;
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
    this.anioEdad = edad
    this.mesEdad = meses
    this.diaEdad= dias
    this.rango=this.determinarRango();
    this.getTablaPuntaje();
  }
  async getTablaPuntaje(){
    console.log('get tabla puntaje')
    await this.tepsiService.getTablaPuntaje1(this.rango).then((data)=>{
      this.tablaPuntajeTotal=data['object']['tablaPuntajeTotal'];
      this.tablaSubTestG.push({subTest:data['object']['tablaSubTestCoordinacion']})
      this.tablaSubTestG.push({subTest: data['object']['tablaSubTestLenguaje']})
      this.tablaSubTestG.push({subTest:data['object']['tablaSubTestMotricidad']})
      this.calcularResultadoSubTest1(1);
      this.calcularResultadoSubTest1(2);
      this.calcularResultadoSubTest1(3);
      this.calcularTotal();

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
        codigoCIE10:"Z009",
        codigoHIS:"Z009",
        codigoPrestacion:"0001",
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
          this.messageService.add({severity:'success', summary:'Test Guardado', detail:resp['mensaje']});
          },(error)=>{
          console.log('error!!!!!!!!!!')
          })

      }
      else{
        this.tepsiService.postConsultaTepsi(this.idConsulta,requestInput).subscribe((resp)=>{
          this.messageService.add({severity:'success', summary:'Test Guardado', detail:resp['mensaje']});
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
  abrirGrafica(){
    this.displayGrafico=true
  }
}
