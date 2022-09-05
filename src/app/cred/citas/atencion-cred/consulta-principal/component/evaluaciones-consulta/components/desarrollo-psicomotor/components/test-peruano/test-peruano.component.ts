import { Component, OnInit } from "@angular/core";
import { TestPeruano } from "../../services/test-peruano/test-peruano.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { dato } from "../../../../../../../../models/data";
import { ConsultaGeneralService } from "../../../../../../services/consulta-general.service";
import { MessageService } from "primeng/api";
import { LoginComponent } from "../../../../../../../../../../login/login.component";
import { AbstractControl } from "@angular/forms";
@Component({
  selector: "app-test-peruano",
  templateUrl: "./test-peruano.component.html",
  styleUrls: ["./test-peruano.component.css"],
  providers: [TestPeruano],
})
export class TestPeruanoComponent implements OnInit {
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
    this.construirMatrisColores()
    this.buildFormArray() 
    this.testPeruanoService.getImagenes().then((data) => {
      this.imagenes = data;
    });
    // this.determinarEdadEvaluada();
    // this.indexEdadMeses=this.listaMesesEvaluar.indexOf(this.listaMesesEvaluar.find((element)=>element.numero==this.edadMeses))
  }
  ngOnInit(): void {
    this.getTestPeruanoPlan();
    this.getTestPeruano();
  }
  getTestPeruanoPlan(){  
  this.testPeruanoService.getTestPeruanoPlan(this.data.nroDocumento).subscribe((resp:any)=>{
      if(resp.cod=="2121"){
        this.listaTestPeruano=resp.object
        this.construirMatrisColores()
        this.displayDialog=true
        this.arregloForm.reset()
        this.fechas=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
        this.listaTestPeruano.forEach((fila,index)=>{
        if(this.isTodo ){ /* boton ver Todo hace todas las iteciones ,boton ver test solo la iteracion del indexFila enviado  */
          const edad=this.listaTestPeruano[index].edad
          const elementoMes=this.listaMeses.find(element=>element==edad)
          const indice=this.listaMeses.indexOf(elementoMes)
          const fecha=this.listaTestPeruano[index].fecha
          this.fechas[indice]=new Date(fecha)
          this.fechasEvaluadas.push({indice})
          const test=this.listaTestPeruano[index].calificacion
          test.forEach((element,index) => {/* x=6,x=11 */
            const x=element.x-1
            const y=this.listaMeses.indexOf(element.y)
            this.getControl(x,y).setValue(true)
            this.matrisColores[x][y]=`mes${edad}`
          });
        }
      })
      }
      // if(!this.fechas[this.indexEdadMeses] ){/* hay evaluacion ese mes? */
      //        console.log('---->entramos en el if');
      //        this.fechas[this.indexEdadMeses]=new Date(this.data.fechaConsulta)
      //        this.isAgregable=true
      // }
    })
  }
  hasTaken:boolean=false;
  arregloTestXConsulta:any[]=[]
  getTestPeruano(){
    this.testPeruanoService.getTestPeruano(this.data.idConsulta).subscribe((resp:any)=>{
      if(resp.cod=="2121"){
        this.hasTaken=true;  
        const ObjetoPeruano={
          fecha:resp.object.evaluacionDesarrolloMes.fecha,
          edad:resp.object.evaluacionDesarrolloMes.edad,
          diagnostico:resp.object.evaluacionDesarrolloMes.diagnostico
        }
        this.arregloTestXConsulta.push(ObjetoPeruano)
        // const calificacionArreglo:any[]=resp.object.evaluacionDesarrolloMes.calificacion;
        // calificacionArreglo.forEach((elemnet,index)=>{
        //   this.getControl(index).setValue(elemnet.y)
        // })
        // // this.fecha=resp.object.evaluacionDesarrolloMes.fecha
        // this.fecha=  new Date(resp.object.evaluacionDesarrolloMes.fecha)
        // this.edadMeses=resp.object.evaluacionDesarrolloMes.edad
        // this.desabilitarRadios()
        
      }
      else{
        this.hasTaken=false
        //trajimos del constructor
      }
    })
  }
  
  fechasEvaluadas=[]
  matrisColores=[]
  construirMatrisColores(){
    this.matrisColores=[]
    this.listaLetras.forEach((element,i)=>{
      const fila=[]
      this.listaMeses.forEach((element,j)=>{
        fila.push('')
      })
      this.matrisColores.push(fila)
    })
    
  }
  // openDialog(indexFila?:number){
    
  // }
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
  determinarColor(j){
    switch(j){
      case 0:
        return "calendarioMes1";
        break;
      case 1:
        return "calendarioMes2";
        break;
      case 2:
        return "calendarioMes3";
        break;
      case 3:
        return "calendarioMes4";
        break;
      case 4:
        return "calendarioMes5";
        break;
      case 5:
        return "calendarioMes6";
        break;
      case 6:
        return "calendarioMes7";
        break;
      case 7:
        return "calendarioMes8";
        break;
      case 8:
        return "calendarioMes9";
        break;
      case 9:
        return "calendarioMes10";
        break;
      case 10:
        return "calendarioMes11";
        break;
      case 11:
        return "calendarioMes12";
        break;
      case 12:
        return "calendarioMes15";
        break;
      case 13:
        return "calendarioMes18";
        break;
      case 14:
        return "calendarioMes21";
        break;
      case 15:
        return "calendarioMes24";
        break;
      case 16:
        default:
        return "calendarioMes30";
    }
  }
  determinarColorOtro(j){    
    if(j==0){
      return 'mes1'
    }else if(j==1){
      return 'mes2'
    }else if(j==2){
      return 'mes3'
    }else if(j==3){
      return 'mes4'
    }else if(j==4){
      return 'mes5'
    }else if(j==5){
      return 'mes6'
    }else if(j==6){
      return 'mes7'
    }else if(j==7){
      return 'mes8'
    }else if(j==8){
      return 'mes9'
    }else if(j==9){
      return 'mes10'
    }else if(j==10){
      return 'mes11'
    }else if(j==11){
      return 'mes12'
    }else if(j==12){
      return 'mes15'
    }else if(j==13){
      return 'mes18'
    }else if(j==14){
      return 'mes21'
    }else if(j==15){
      return 'mes24'
    }else {
      return 'mes30'
    }
  }
}
