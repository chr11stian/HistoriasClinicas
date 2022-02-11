import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TepsiService} from "../../services/tepsi.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-tepsi',
  templateUrl: './tepsi.component.html',
  styleUrls: ['./tepsi.component.css']
})
export class TepsiComponent implements OnInit {
  display:boolean[]=[false,false,false]
  selectedValues1: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues2: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues3: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];

  acumulador:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  selectedValues23: boolean[] = [false,false,false,false,false,false,false,false];
  selectedValues24: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues26: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues27: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues212: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues213: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues214: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues215: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues216: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues217: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues218: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues223: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues224: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  resultado:number[]=[0,0,0]
  puntajeT:number[]=[0,0,0]

  tablaPuntajeTotal:any[];
  tablaSubTestCoordinacion:any[];
  tablaSubTestLenguaje:any[];
  tablaSubTestMotricidad:any[];
  anioEdad:number;
  mesEdad:number;
  diaEdad:number;
  rango:number=0
  fechaNacimiento='01/01/2022'
  constructor(private tepsiService:TepsiService,
              private messageService: MessageService) { }
  ngOnInit(): void {
    this.buildForm();
    this.calcularEdadDinamico(this.getFC('fechaSelected').value)
  }
  buildForm(){
    this.datosGeneralesFG=new FormGroup({
      // anio:new FormControl('0',Validators.required),
      // mes:new FormControl('0',Validators.required),
      // dia:new FormControl('0',Validators.required),
      nombreExaminador:new FormControl('',Validators.required),
      fechaSelected:new FormControl(new Date(),Validators.required)
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
  evaluandoItem(valor,indexAcumulador,indexTest,minimo){
    if (valor.checked){
      this.acumulador[indexAcumulador]+=1
      if (this.acumulador[indexAcumulador]==minimo) {
        this.selectedValues2[indexTest]=true;
        this.resultado[1]+=1
      }
    }
    else{
      this.acumulador[indexAcumulador]-=1
      if (this.acumulador[indexAcumulador]==minimo-1){
        this.selectedValues2[indexTest]=false;
        this.resultado[1]-=1
      }
    }
  }
  datosGeneralesFG:FormGroup;
  calcularEdadDinamico(fechaInput:Date){
    //fecha ingresada
    let fechaNacimiento: Date = new Date("01/01/2022");
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
    this.tepsiService.getTablaPuntaje(this.rango).subscribe((result)=>{
      this.tablaPuntajeTotal=result['object']['tablaPuntajeTotal'];
      this.tablaSubTestCoordinacion=result['object']['tablaSubTestCoordinacion'];
      this.tablaSubTestLenguaje=result['object']['tablaSubTestLenguaje'];
      this.tablaSubTestMotricidad=result['object']['tablaSubTestMotricidad'];
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
  categoria:string[]=['','','']
  calcularSuma(valor,nroTest){
    if (valor.checked){
      this.resultado[nroTest-1]+=1
    }
    if (!valor.checked){
      this.resultado[nroTest-1]-=1
    }

  }
  determinarCategoria(puntajeBruto:number){
    if(puntajeBruto>=40)
      return 'Normal'
    else{
      if(puntajeBruto>=30)
        return 'Riesgo'
      else
        return 'Retraso'
    }
  }
  puntajeTotal:number=0;


  saveTestCoordinacion(){

    this.display[0]=false;
    this.examenesResueltos[0]=true;
    const element=this.tablaSubTestCoordinacion.find((item)=>{
      return this.resultado[0]==item.puntajeBruto
    })
    this.puntajeT[0]=element.puntajeT;
    this.categoria[0]=this.determinarCategoria(element.puntajeT)
    // aculamos los resultados
    this.puntajeTotal+=this.resultado[0]
  }
  saveTestLenguaje(){
    this.display[1]=false;
    this.examenesResueltos[1]=true;
    const element=this.tablaSubTestLenguaje.find((item)=>{
      return this.resultado[1]==item.puntajeBruto
    })
    this.puntajeT[1]=element.puntajeT;
    this.categoria[1]=this.determinarCategoria(element.puntajeT)
    // aculamos los resultados
    this.puntajeTotal+=this.resultado[1]

  }
  saveTestMotrocidad(){
    this.display[2]=false;
    this.examenesResueltos[2]=true;
    const element=this.tablaSubTestMotricidad.find((item)=>{
      return this.resultado[2]==item.puntajeBruto
    })
    this.puntajeT[2]=element.puntajeT;
    this.categoria[2]=this.determinarCategoria(element.puntajeT)
    // aculamos los resultados
    this.puntajeTotal+=this.resultado[2]
    this.calcularResultadoTotal();
  }
  resultadoA:resultado[]=[{
    puntajeBruto:0,
    puntajeT:0,
    categoria:''
  }]
  calcularResultadoTotal(){
    const element=this.tablaPuntajeTotal.find((item)=>{
      return this.puntajeTotal==item.puntajeBruto
    })
    // this.resultadoA.push({
    //   puntajeBruto:this.puntajeTotal,
    //   puntajeT:element.puntajeT,
    //   categoria:this.determinarCategoria(element.puntaje)
    // })
    this.resultadoA[0]['puntajeBruto']=this.puntajeTotal
    this.resultadoA[0]['puntajeT']=element.puntajeT
    this.resultadoA[0]['categoria']=this.determinarCategoria(element.puntajeT)
    console.log(this.resultado)
  }
  examenesResueltos:boolean[]=[false,false,false]
  save() {
    const faltante=this.examenesResueltos.filter((element)=>{
      return element==false;
    })
    if(faltante.length==0){
      const requestInput = {
        edad: {
          anio: this.getFC('anio').value,
          mes: this.getFC('mes').value,
          dia: this.getFC('dia').value,
        },
        fechaTest:new Date(),
        nombreExaminador: this.getFC('nombreExaminador').value,
        resultadoTestTotal: {
          puntajeBruto: this.resultado[0],
          puntajeT: this.puntajeT[0],
          categoria: this.categoria[0]
        },
        subTestCoordinacion: {
          tipoSubTest:"COORDINACION",
          puntajeBruto: this.resultado[0],
          puntajeT: this.puntajeT[0],
          categoria: this.categoria[0],
          listItemTest:this.determinarArreglo('C',this.selectedValues1),
        },
        subTestLenguaje: {
          tipoSubTest:"LENGUAJE",
          puntajeBruto: this.resultado[1],
          puntajeT: this.puntajeT[1],
          categoria: this.categoria[1],
          listItemTest:this.determinarArreglo('L',this.selectedValues2),
        },
        subTestMotricidad: {
          tipoSubTest:"MOTRICIDAD",
          puntajeBruto: this.resultado[2],
          puntajeT: this.puntajeT[2],
          categoria: this.categoria[2],
          listItemTest:this.determinarArreglo('M',this.selectedValues3),
        }
      }
      console.log(requestInput)
      this.tepsiService.addRegistroTepsi('98745896',requestInput).subscribe((resp)=>{
        this.messageService.add({severity:'success', summary:'Test Guardado', detail:resp['mensaje']});
      },(error)=>{
        console.log('error!!!!!!!!!!')
      })
    }
    else {
      this.messageService.add({severity:'error', summary:'Test no Guardado', detail:'Debe llenar todos los Test '});
    }
  }
  determinarArreglo(letra:string,arreglo:any[]){
    const arregloAux=arreglo.map((element,index)=>{
      return {codigo:`${index+1}L`,valor:element?1:0}
    })
    return arregloAux
  }
}
interface resultado {
  puntajeBruto: number,
  puntajeT: number,
  categoria: string,

}

