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
  arregloForm: FormArray;
  displayDialog: boolean = false;
  listaMeses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24, 30];
  imagenes: any[];
  listaTestPeruano: any[];
  edadMeses: number =0;
  edad:number=0;
  // edadMax: number = 5;
  fecha: Date = new Date();
  datePipe = new DatePipe("en-US");
  data=JSON.parse(localStorage.getItem('documento'))
  hasTaken=false
  arregloTest:any[]=[]
  constructor(
    private testPeruanoService: TestPeruano,
    private form: FormBuilder,
    private consultaGeneralService: ConsultaGeneralService,
    private messageService: MessageService) {
    // this.buildFormArray();
    this.buildFormArray()
    this.testPeruanoService.getImagenes().then((data) => {
      this.imagenes = data;
    });
    this.calcularEdades()
   
  }
  ngOnInit(): void {
    this.getTestPeruano();
  }
  getTestPeruano(){
    this.testPeruanoService.getTestPeruano(this.data.idConsulta).subscribe((resp:any)=>{
      if(resp.cod=="2121"){
        
        this.hasTaken=true;
        console.log('entro IF->>>>> :',this.hasTaken);
        const ObjetoPeruano={
          fecha:resp.object.evaluacionDesarrolloMes.fecha,
          edad:resp.object.evaluacionDesarrolloMes.edad,
          diagnostico:resp.object.evaluacionDesarrolloMes.diagnostico
        }
        this.arregloTest.push(ObjetoPeruano)
        const calificacionArreglo:any[]=resp.object.evaluacionDesarrolloMes.calificacion;
        calificacionArreglo.forEach((elemnet,index)=>{
          this.getControl(index).setValue(elemnet.y)
        })
        // this.fecha=resp.object.evaluacionDesarrolloMes.fecha
        this.fecha=  new Date(resp.object.evaluacionDesarrolloMes.fecha)
        this.edadMeses=resp.object.evaluacionDesarrolloMes.edad
        this.desabilitarRadios()
        
      }
      else{
        this.hasTaken=false
        //trajimos del constructor
      
      }
    })
   


  }
  calcularEdades(){
    this.edad=this.data.anio*12+this.data.mes
    this.edadMeses=this.edad;
    if(this.edad>12){
      if(this.edad<=15)
        this.edadMeses=15
      else{
        if(this.edad<=18)
        this.edadMeses=18
        else{
          if(this.edad<=21)
          this.edadMeses=21
          else{
            if(this.edad<=24)
            this.edadMeses=24
            else
            this.edadMeses=30
          }
          
        }
      }
    }
    
  }
 
  //rehaciendo
  ruta(sale: any, mes: number) {
    return sale[`img_${mes}`];
  }
  desabilitarRadios(){
    const arreglo=this.arregloForm.value;
    arreglo.forEach((element,index) => {
      this.getControl(index).disable()
    });
  }
  buildFormArray() {
    this.arregloForm = new FormArray([
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
      new FormControl({value: null, disabled:false}, Validators.required),
    ]);
  }
  getControl(index: number): AbstractControl {
    return this.arregloForm.controls[index];
  }
  arregloCalificacion() {
    let arreglo = [];
    this.imagenes.forEach((element, index) => {
      let objeto = {
        // codigo: "A_10",
        codigo: `${element.letter}_${this.getControl(index).value}`,
        descripcion: "",
        actividad: element.texto,
        x: index + 1,
        y: this.getControl(index).value,
      };
      arreglo.push(objeto);
    });
    return arreglo;
  }
  encontrarDiagnostico()
  { 
    let diagnostico='Normal'
    const arreglo=this.arregloForm.value;
    arreglo.forEach(element => {
      if(element<this.edadMeses)
      diagnostico='Retraso'
    });
    return diagnostico
  }
  save() {
    console.log("estado", this.arregloForm.valid);
    if (!this.arregloForm.valid) {
      Swal.fire({
        icon: "info",
        title: "Test Peruano",
        text: "Todas las filas deben estar marcadas",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    const data = {
      nombreEvaluacion: "TEST_PERUANO",
      codigoCIE10: "Z009",
      codigoHIS: "Z009",
      codigoPrestacion: "0001",
      evaluacionDesarrolloMes: {
        edad: this.edadMeses,
        fecha: this.datePipe.transform(this.fecha, "yyyy-MM-dd HH:mm:ss"),
        diagnostico: this.encontrarDiagnostico(),
        docExaminador: "24242424",
        calificacion: this.arregloCalificacion(),
      },
    };
    console.log("Data enviada:", data);
    Swal.fire({
      title: 'Esta seguro que desea guardar este registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
         this.testPeruanoService.addTestPeruano(this.data.idConsulta, data).subscribe((res: any) => {
           if(res.cod=='2121'){
          Swal.fire({
            icon: 'success',
            title: 'Test Peruano',
            text: `Se guardo existosamente la evaluacion para la edad ${ this.edadMeses} meses`,
            showConfirmButton: false,
            timer: 2000,
          })
            this.getTestPeruano()
           }
           else{
             Swal.fire({
               icon: 'error',
               title: 'Test Peruano',
               text: 'Error del servidor o ya existe un registro para el mes',
               showConfirmButton: false,
               timer: 2000,
             })
           }
         });
      }
    })
  }
  pruebas() {
    console.log("estado Arreglo", this.arregloForm);
    this.encontrarDiagnostico();
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
