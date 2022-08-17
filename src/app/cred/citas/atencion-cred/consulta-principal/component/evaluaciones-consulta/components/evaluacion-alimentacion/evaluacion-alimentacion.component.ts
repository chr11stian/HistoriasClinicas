import { Component, OnInit } from '@angular/core';
import { FechaEvaluacionAlimentacion, Product, Preguntas } from '../../../../../plan/component/evaluacion-general/models/EvaluacionAlimentacion';
import {DatePipe} from "@angular/common";
import {EvaluacionAlimentacionService} from "../../services/evaluacion-alimentacion.service";
import Swal from "sweetalert2";
import {dato} from "../../../../../../models/data";
import {MessageService} from "primeng/api";
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  arregloForm: FormGroup;
  evaluacionAlimenticia=[];
  listaMesesEvaluar=['RN','1m','2m','3m','4m','5m','6m','7m','8m','9m','10m','11m','12m','14m','16m','18m','20m','22m','24m','27m','30m','33m','36m','39m','42m']
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
  {codigo:'DIAGNOSTICO',titulo:'Diagnostico'},
  ]
  constructor(){
    this.buildFormArray()
  }
  ngOnInit(): void {
  } 
  buildFormArray() {
    this.arregloForm = new FormGroup({});
    this.listaPreguntas.forEach((element,i)=>{
      const aux=new FormArray([]);
      this.listaMesesEvaluar.forEach((element2,j)=>{
        aux.push(new FormControl({value:null,disabled:true}))
      })
      this.arregloForm.addControl(`${i}`,aux)
    })
  }
  getControl(i:number,j:number):AbstractControl{  
    const A:any =this.arregloForm.get(`${i}`)
    const B:any=A.controls[j] 
    return B
  }
}