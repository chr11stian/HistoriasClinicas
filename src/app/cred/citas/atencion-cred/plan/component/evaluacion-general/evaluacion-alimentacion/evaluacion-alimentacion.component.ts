import {Component, OnInit} from '@angular/core';
import {Product, FechaEvaluacionAlimentacion, EvaluacionAlimenticia, Preguntas} from '../models/EvaluacionAlimentacion';
import {EvalAlimenService} from '../service/eval-alimen.service';
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {dato} from "../../../../../models/data";
import Swal from 'sweetalert2';
import { EvaluacionAlimentacionService } from '../../../../consulta-principal/component/evaluaciones-consulta/services/evaluacion-alimentacion.service';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-evaluacion-alimentacion',
    templateUrl: './evaluacion-alimentacion.component.html',
    styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  fechas=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  
  datePipe = new DatePipe("en-US");
  data=JSON.parse(localStorage.getItem('documento'))
  arregloForm: FormGroup;
  evaluacionAlimenticia=[];
  isTodo:boolean=false;
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
  displayDialog:boolean=false
  constructor(private evaluacionAlimentacionService: EvaluacionAlimentacionService){
    this.buildFormArray()
  }
  ngOnInit(): void {
      this.getTestAlimentacionPlan()
  } 
  buildFormArray() {
    this.arregloForm = new FormGroup({});
    this.listaPreguntas.forEach((element,i)=>{
      const aux=new FormArray([]);
      this.listaMesesEvaluar.forEach((element2,j)=>{
        aux.push(new FormControl({value:false,disabled:true }))
      })
      this.arregloForm.addControl(`${i}`,aux)
    })
  }
  getControl(i:number,j:number):AbstractControl{  
    const A:any =this.arregloForm.get(`${i}`)
    const B:any=A.controls[j] 
    return B
  }
  listaTestAlimentacionPlan:any[]=[]
  getTestAlimentacionPlan(){
    this.evaluacionAlimentacionService.getEvaluacionAlimenticiaCredPlan(this.data.nroDocumento).subscribe((resp:any)=>{
        if(resp.cod=='2121'){
            this.listaTestAlimentacionPlan=resp.object
        }
    })
  }
  openDialog(indexFila?:number){
    this.displayDialog=true;
    this.arregloForm.reset()
    this.fechas=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
        this.listaTestAlimentacionPlan.forEach((fila,index)=>{
            if(this.isTodo ||  index==indexFila ){/* boton verTodo hace todas las itecionees,boton ver hace unicamente la iteraccion del  indexFila enviado*/    
                const edadMeses=this.listaTestAlimentacionPlan[index].edad
                const edadEvaluada=this.listaMesesEvaluar.find(element=>element.numero==edadMeses)
                const indice=this.listaMesesEvaluar.indexOf(edadEvaluada)
                this.fechas[indice]=new Date(this.listaTestAlimentacionPlan[index].fechaRegistro)
                const test=this.listaTestAlimentacionPlan[index].listaPreguntas
                test.forEach((element,index) => {
                    this.getControl(index,indice).setValue(element.estado)
                });
            }
        })    
  }x
  sombrear(i,j){
    if((i>=6 && i<14 && j<7)||(i==15 && j<7) ) {
      return '#b6b6b6'
    }
    else {
      return 'white'
    }
  }
}
