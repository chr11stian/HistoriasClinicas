import { Component, OnInit } from '@angular/core';
import { FechaEvaluacionAlimentacion, Product, Preguntas } from '../../../../../plan/component/evaluacion-general/models/EvaluacionAlimentacion';
import {DatePipe} from "@angular/common";
import {EvaluacionAlimentacionService} from "../../services/evaluacion-alimentacion.service";
import Swal from "sweetalert2";
import {dato} from "../../../../../../models/data";
import {MessageService} from "primeng/api";
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { listaPregunta } from '../desarrollo-psicomotor/components/models/tepsi';

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  fecha:Date=new Date();
  datePipe = new DatePipe("en-US");
  data=JSON.parse(localStorage.getItem('documento'))
  arregloForm: FormGroup;
  evaluacionAlimenticia=[];
  listaMesesEvaluar=[{texto:'RN',numero:0},{texto:'1m',numero:1}
  ,{texto:'2m',numero:2},{texto:'3m',numero:3}
  ,{texto:'4m',numero:4},{texto:'5m',numero:5}
  ,{texto:'6m',numero:6},{texto:'7m',numero:7}
  ,{texto:'8m',numero:8},{texto:'9m',numero:9}
  ,{texto:'10m',numero:10},{texto:'11m',numero:11}
  ,{texto:'12m',numero:12},{texto:'14m',numero:14}
  ,{texto:'16m',numero:16},{texto:'18m',numero:18}
  ,{texto:'20m',numero:20},{texto:'22m',numero:22}
  ,{texto:'24m',numero:24},{texto:'27m',numero:27}
  ,{texto:'30m',numero:30},{texto:'33m',numero:33}
  ,{texto:'36m',numero:36},{texto:'39m',numero:39}
  ,{texto:'42m',numero:42}
]
  listaPreguntas=[
  {codigo:'PREG_1',titulo:'1. ¿El niño(a) esta recibiendo lactancia materna? (explorar)'},
  {codigo:'PREG_2',titulo:'2. ¿La tecnica de LM es adecuada? (explorar y observar)'},
  {codigo:'PREG_3',titulo:'3. ¿La frecuencia de LM es adecuada? (explorar y observar)'},
  {codigo:'PREG_4',titulo:'4. ¿El niño(a) recibe leche no materna? (explorar)'},
  {codigo:'PREG_5',titulo:'5. ¿El niño(a) recibe agüitas? (explorar)'},
  {codigo:'PREG_6',titulo:'6. ¿La niña o niño recibe algún otro alimento? (explorar)'},
  {codigo:'PREG_7',titulo:'7. ¿La consistencia de la preparación es adecuada según la edad? (explorar)'},
  {codigo:'PREG_8',titulo:'8. ¿La cantidad de Alimentos es adecuada según la edad? (explorar)'},
  {codigo:'PREG_9',titulo:'9. ¿La frecuencia de la alimentación es adecuada según la edad? (explorar)'},
  {codigo:'PREG_10',titulo:'10. ¿La frecuencia de la alimentación es adecuada según la edad? (explorar)'},
  {codigo:'PREG_11',titulo:'11. ¿Consume frutas y verduras? (explorar)'},
  {codigo:'PREG_12',titulo:'12. ¿Añade aceite, mantequilla o margarina a la comida del niño?'},
  {codigo:'PREG_13',titulo:'13. ¿La niña o niño o recibe los alimentos en su propio plato?'},
  {codigo:'PREG_14',titulo:'14. ¿Añade sal yodada a la comida familiar?'},
  {codigo:'PREG_15',titulo:'15. ¿Es el niño(a) beneficiario de algún programa de apoyo social? (Especificar)'},
  {codigo:'PREG_16',titulo:'16. ¿Cuántos sobres de micronutrientes consumio en el mes?'},
  {codigo:'OBS',titulo:'Observaciones'},
  ]
  edadMeses:number=0;//edad real en meses
  edad:number=0;//edad evaluada en el rango de edades
  displayDialog:boolean=false;
  constructor(private evaluacionAlimentacionService: EvaluacionAlimentacionService){
    this.buildFormArray()
    this.edadMeses=this.data.anio*12+this.data.mes   
    // this.edadMeses=0; 
  }
  ngOnInit(): void {
      this.getTestAlimentacion()
  } 
  buildFormArray() {
    this.arregloForm = new FormGroup({});
    this.listaPreguntas.forEach((element,i)=>{
      const aux=new FormArray([]);
      this.listaMesesEvaluar.forEach((element2,j)=>{
        aux.push(new FormControl({value:false,disabled:false }))
      })
      this.arregloForm.addControl(`${i}`,aux)
    })
  }
  getControl(i:number,j:number):AbstractControl{  
    const A:any =this.arregloForm.get(`${i}`)
    const B:any=A.controls[j] 
    return B
  }
  hasTaken:boolean=false
  arregloTest=[]
  getTestAlimentacion(){
    this.evaluacionAlimentacionService.getEvaluacionAlimenticiaCred(this.data.idConsulta).subscribe((resp:any)=>{
      if(resp.cod=='2121' && resp.object!=null){
        this.hasTaken=true
        this.edadMeses=resp.object.evaluacionAlimentacionMes.edad//cambiamos al mes recuperado
        const ObjetoAlimentacion={
          fecha:resp.object.evaluacionAlimentacionMes.fechaRegistro,
          edad:resp.object.evaluacionAlimentacionMes.edad,
          diagnostico:resp.object.evaluacionAlimentacionMes.diagnostico
        }
        this.arregloTest.push(ObjetoAlimentacion)
        const preguntasArreglo:any[]=resp.object.evaluacionAlimentacionMes.listaPreguntas;
        preguntasArreglo.forEach((element,index)=>{
          this.getControl(index,this.edadMeses).setValue(element.estado)
        })
        this.fecha=new Date(resp.object.evaluacionAlimentacionMes.fechaRegistro)
        this.desabilitarCheckButton();
      }
    })
  }
  save(){
    const inputRequest={
      nombreEvaluacion:"EVALUACION ALIMENTACION",
      codigoCIE10:"Z0017",
      codigoHIS:"Z0017",
      codigoPrestacion:"0001",
      evaluacionAlimentacionMes:{
          "fechaRegistro": this.datePipe.transform(this.fecha,'yyyy-MM-dd HH:mm:ss'),
          "edad": this.edadMeses,
          "docExaminador":"24242424",
          "listaPreguntas":this.arregloCalificacion(),
          "diagnostico":this.calcularDiagnostico()
      }
    }
    // if(true){

    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Ingrese la Fecha',
    //       text: '¡Es necesaria la fecha!',
    //       showConfirmButton: false,
    //       timer: 1000,
    //     })
    //     return 
    //   }
    Swal.fire({
      title: 'Esta seguro que desea guardar este test?',
      icon: 'info',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
         this.evaluacionAlimentacionService.addEvaluacionAlimenticiaCred(this.data.idConsulta,inputRequest).subscribe((res: any) => {
         Swal.fire({
           icon: 'success',
           title: 'Registro Agregado',
           showConfirmButton: false,
           timer: 1500,
         })
         this.displayDialog=false
         this.getTestAlimentacion()
        })
      }
    })
  }
  arregloCalificacion() {
    const numeroColumna=this.edadMeses
    const arreglo = [];
    this.listaPreguntas.forEach((element,index)=>{
      const objeto={
        codigo:this.listaPreguntas[index].codigo,
        estado:this.getControl(index,numeroColumna).value,
        descripcion:this.listaPreguntas[index].titulo
      }
      arreglo.push(objeto)
    })
    return arreglo;
  }
  calcularCie10(dx){

    if(dx == 'NINO CON LACTANCIA MATERNA CONTINUADA'){
      return 'Z0016'
    }else{
      if(dx == 'PROBLEMA NO ESPECIFICADO DE LA ALIMENTACION DEL RECIEN NACIDO'){
        return 'P929'
      }
      else{
        if(dx == 'NINO CON ALIMENTACION COMPLEMENTARIA ADECUADA') {
          return 'Z0017'
        }
        else{
          return 'SINCIE'
        }
      }
    }
}
  calcularDiagnostico(){
    if(this.edadMeses<=6)
    {
      if(this.getControl(0,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(2,this.edadMeses).value==true && this.getControl(3,this.edadMeses).value!=true && this.getControl(4,this.edadMeses).value!=true && this.getControl(5,this.edadMeses).value!=true){
          return 'NINO CON LACTANCIA MATERNA CONTINUADA'
      }
      else 
      return 'PROBLEMA NO ESPECIFICADO DE LA ALIMENTACION DEL RECIEN NACIDO'
    }
    else
    {
      if(this.edadMeses>=7 && this.edadMeses <=22){
          if(this.getControl(0,this.edadMeses).value==true  && this.getControl(3,this.edadMeses).value==true && this.getControl(4,this.edadMeses).value==true && this.getControl(5,this.edadMeses).value==true && this.getControl(6,this.edadMeses).value==true && this.getControl(7,this.edadMeses).value==true && this.getControl(8,this.edadMeses).value==true && this.getControl(9,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true){
            return 'NINO CON ALIMENTACION COMPLEMENTARIA ADECUADA'
          }
          else return 'NINO CON ALIMENTACION COMPLEMENTARIA INADECUADA'
      }
      else
      if(this.getControl(6,this.edadMeses).value==true && this.getControl(7,this.edadMeses).value==true && this.getControl(8,this.edadMeses).value==true && this.getControl(9,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true && this.getControl(1,this.edadMeses).value==true){
        return 'NINO CON ALIMENTACION COMPLEMENTARIA ADECUADA'
      }
      else return 'NINO CON ALIMENTACION COMPLEMENTARIA INADECUADA'
    }

  }
  desabilitarCheckButton(){
    this.listaPreguntas.forEach((element,index)=>{
      this.getControl(index,this.edadMeses).disable()
    })
  }
  sombrear(i,j){
    if((i>=6 && i<14 && j<7)||(i==15 && j<7) ) {
      return '#b6b6b6'
    }
    else {
      return 'white'
    }
  }
}