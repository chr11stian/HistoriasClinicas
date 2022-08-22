import { Component, OnInit } from '@angular/core';
import { TestDesarrollo } from './test-desarrollo.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {dato} from "../../../../../models/data";
import {DatePipe} from "@angular/common";
import { TestPeruano } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/services/test-peruano/test-peruano.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-desarrollo',
  templateUrl: './test-desarrollo.component.html',
  styleUrls: ['./test-desarrollo.component.css'],
  providers: [TestDesarrollo]
})
export class TestDesarrolloComponent implements OnInit {
  arregloForm: FormGroup;
  displayDialog: boolean = false;
  listaMeses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24, 30]; //17
  listaLetras =["A","B","C","D","E","F","G","H","I","J","K","L"]//12
  imagenes: any[];
  listaTestPeruano: any[];
  datePipe = new DatePipe("en-US");
  data=JSON.parse(localStorage.getItem('documento'))
  fechas=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  isTodo=true;
  constructor(private testPeruanoService: TestPeruano,) {
    this.buildFormArray() 
    this.testPeruanoService.getImagenes().then((data) => {
      this.imagenes = data;
    });
  }
  ngOnInit(): void {
    this.getTestPeruanoPlan();
  }
  getTestPeruanoPlan(){  
  this.testPeruanoService.getTestPeruanoPlan(this.data.nroDocumento).subscribe((resp:any)=>{
      if(resp.cod=="2121"){
        this.listaTestPeruano=resp.object
      }
    })
  }
  fechasEvaluadas=[]
  openDialog(indexFila?:number){
    this.displayDialog=true
    this.arregloForm.reset()
    this.fechas=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    this.listaTestPeruano.forEach((fila,index)=>{
        if(this.isTodo || indexFila==index){ /* boton ver Todo hace todas las iteciones ,boton ver test solo la iteracion del indexFila enviado  */
          const edad=this.listaTestPeruano[index].edad
          const elementoMes=this.listaMeses.find(element=>element==edad)
          const indice=this.listaMeses.indexOf(elementoMes)
          const fecha=this.listaTestPeruano[index].fecha
          this.fechas[indice]=new Date(fecha)
          this.fechasEvaluadas.push({indice})
          const test=this.listaTestPeruano[index].calificacion
          test.forEach((element,index) => {
            this.getControl(element.x-1,element.y-1).setValue(true)
          });
        }
      })
      
    
  }
  ruta(sale: any, mes: number) {
    return sale[`img_${mes}`];
  }
  buildFormArray() {
    this.arregloForm = new FormGroup({});
    this.listaLetras.forEach((element,i)=>{
      const aux=new FormArray([]);
      this.listaMeses.forEach((element2,j)=>{
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
  Colores=[
    "#4C4C4C",
    "#F0047F",
    "#FF6601",
    "#F30E19",
    "#F93D5A",
    "#FEA61D",
    "#F5923B",
    "#DD360C",
    "#DD6910",
    "#5BBA7D",
    "#5AB543",
    "#9BC922",
    "#5EAA29",
    "#62C2BB",
    "#5C97C6",
    "#5E64AD",
    "#B573B6",
  ]
}