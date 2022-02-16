import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TepsiService} from "../../services/tepsi.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {elementAt} from "rxjs/operators";

@Component({
  selector: 'app-tepsi',
  templateUrl: './tepsi.component.html',
  styleUrls: ['./tepsi.component.css']
})
export class TepsiComponent implements OnInit {
  display:boolean[]=[false,false,false]
  arregloSubtest=[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                  [false,false,false,false,false,false,false,false,false,false,false,false]];
  subPreguntas=[
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false],
   [false,false,false,false,false,false,false,false,false,false,false,false]]
  tablaPuntajeTotal:any[];
  tablaSubTest:any[]=[];
  datosGeneralesFG:FormGroup;
  anioEdad:number;
  mesEdad:number;
  diaEdad:number;
  rango:number=0
  fechaNacimiento=''
  idConsulta:string
  minimo:any[]=[5,5,3,4,2,2,2,2,2,2,2,3,2]
  indicePregunta:any[]=[3,4,6,7,12,13,14,15,16,17,18,23,24]
  constructor(private tepsiService:TepsiService,
              private messageService: MessageService,
              private rutaActiva:ActivatedRoute) {
    // this.idConsulta=this.rutaActiva.snapshot.queryParams.nroDoc
    this.idConsulta='620bb9b786bca43e001f570f'
    this.buildForm();
  }
  ngOnInit(): void {
    // this.recuperarFechaNacimiento()
    this.calcularEdadDinamico(this.getFC('fechaSelected').value)

    this.getTestTepsi();
  }
  buildForm(){
    this.datosGeneralesFG=new FormGroup({
      nombreExaminador:new FormControl('',Validators.required),
      fechaSelected:new FormControl(new Date(),Validators.required)
    })
  }
  recuperarFechaNacimiento(){
    // todo recuperar con servicio provisto
    this.fechaNacimiento='01/01/2022'
    console.log('id de la consulta',this.idConsulta);
  }
  reconstruirTest(arreglo:any[]){
    const aux=arreglo.map((element)=>{
      return element.valor==1?true:false;
    })
    return aux
  }
  isUpdate:boolean=false
  getTestTepsi(){
    this.tepsiService.getConsultaTepsi(this.idConsulta).subscribe((resp)=>{
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
        this.arregloSubtest[2]= this.reconstruirTest(resultado['subTestMotricidad']['listItemTest']);
        this.calcularResultadoSubTest1(3)
        console.log('resultado deeeeeeeeeeeeeeeeeeee',this.arregloSubtest[2])
      }
    })
  }
  determinarRango(){
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



    // if (valor.checked){
    //   this.acumulador[indexAcumulador]+=1
    //   if (this.acumulador[indexAcumulador]==minimo) {
    //     this.selectedValues2[indexTest]=true;
    //     this.resultado[1]+=1
    //   }
    // }
    // else{
    //   this.acumulador[indexAcumulador]-=1
    //   if (this.acumulador[indexAcumulador]==minimo-1){
    //     this.selectedValues2[indexTest]=false;
    //     this.resultado[1]-=1
    //   }
    // }
  }
  calcularEdadDinamico(fechaInput:Date){
    //fecha ingresada
    let fechaNacimiento: Date = new Date("01/01/2018"); //requeriremos la fecha de nacimiento//formato dia/mes/año
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
    await this.tepsiService.getTablaPuntaje1(this.rango).then((data)=>{
      this.tablaPuntajeTotal=data['object']['tablaPuntajeTotal'];
      this.tablaSubTest.push(data['object']['tablaSubTestCoordinacion'])
      this.tablaSubTest.push(data['object']['tablaSubTestLenguaje'])
      this.tablaSubTest.push(data['object']['tablaSubTestMotricidad'])
      this.calcularResultadoSubTest1(1);
      this.calcularResultadoSubTest1(2);
      this.calcularResultadoSubTest1(3);
      this.calcularTotal();

    });

  }
  calcularEdad(fecha:any) {
    let fechaNacimiento: Date = new Date(fecha);
    let dia = fechaNacimiento.getDate()
    let mes = fechaNacimiento.getMonth() + 1
    let ano = fechaNacimiento.getFullYear()
    console.log('fecha nacimiento',fechaNacimiento)
    console.log('dia,mes,años',dia,mes,ano)
    // cogemos los valores actuales
    let fecha_hoy: Date = new Date();
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
    this.diaEdad = dias
  }
  calcularSumaArreglos(arregloBoolean:any[]){
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
    puntajeBruto:0,
    puntajeT:0,
    categoria:''
  },{
    puntajeBruto:0,
    puntajeT:0,
    categoria:''
  },{
    puntajeBruto:0,
    puntajeT:0,
    categoria:''
  },
    {
      puntajeBruto:0,
      puntajeT:0,
      categoria:''
    }
  ]
  calcularTotal(){
    this.resultadoA[0]['puntajeBruto']=this.resultadoA[1].puntajeBruto+this.resultadoA[2].puntajeBruto+this.resultadoA[3].puntajeBruto
    // console.log('disk vacio',this.tablaPuntajeTotal)
    const element=this.tablaPuntajeTotal.find((item)=>{
      return this.resultadoA[0]["puntajeBruto"]==item.puntajeBruto
    })
    this.resultadoA[0]['puntajeT']=element.puntajeT
    this.resultadoA[0]['categoria']=this.determinarCategoria(element.puntajeT)
  }
  isResolve:boolean[]=[false,false,false] //todo

  calcularResultadoSubTest1(indexSubTest:number) {//1,2,3
    this.resultadoA[indexSubTest].puntajeBruto = this.calcularSumaArreglos(this.arregloSubtest[indexSubTest-1])
    const element = this.tablaSubTest[indexSubTest-1].find((item) => {
      return this.resultadoA[indexSubTest].puntajeBruto == item.puntajeBruto
    })
    console.log('elemento vacio diske',element)
    this.resultadoA[indexSubTest]['puntajeT']=element.puntajeT
    this.resultadoA[indexSubTest]['categoria'] = this.determinarCategoria(element.puntajeT)
    this.calcularTotal();
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
            anio:'3',
            mes:'5',
            dia:'1'
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
            listItemTest:this.determinarArreglo('L',this.arregloSubtest[1])
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
  determinarArreglo(letra:string,arreglo:any[]){
    const arregloAux=arreglo.map((element,index)=>{
      return {codigo:`${index+1}${letra}`,valor:element?1:0}
    })
    return arregloAux
  }
}
interface resultado {
  puntajeBruto: number,
  puntajeT: number,
  categoria: string,

}

