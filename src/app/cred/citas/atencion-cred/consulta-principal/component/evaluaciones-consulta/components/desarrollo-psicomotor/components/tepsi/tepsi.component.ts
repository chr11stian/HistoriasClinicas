import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TepsiService } from "../../services/tepsi.service";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { dato } from "../../../../../../../../models/data";
import {
  puntaje,
  contenedorSubTest,
  resultado,
  itenTestResultado,
  listaPregunta,
} from "../models/tepsi";
import Swal from "sweetalert2";
import localeFr from "@angular/common/locales/fr";
import { UIChart } from "primeng/chart";
import { diagnostico } from '../../../tamizajes/tamizajes.component';

@Component({
  selector: "app-tepsi",
  templateUrl: "./tepsi.component.html",
  styleUrls: ["./tepsi.component.css"],
})
export class TepsiComponent implements OnInit {
  arregloTestTepsi:any[]=[]
  displayDialog:boolean=false
  @ViewChild("chartH") chartReferencia: UIChart;
  resultadoA: resultado[] = [
    {
      puntajeBruto: 0, //test total
      puntajeT: 0,
      categoria: "",
    },
    {
      puntajeBruto: 0, //subtest coordinacion
      puntajeT: 0,
      categoria: "",
    },  
    {
      puntajeBruto: 0, //subtest lenguaje
      puntajeT: 0,
      categoria: "",
    },
    {
      puntajeBruto: 0, //subtest motricidad
      puntajeT: 0,
      categoria: "",
    },
  ];
  chartData: any;
  horizontalOptions: any;
  displayTest: boolean[] = [false, false, false];
  arregloSubtest = [
    [
      false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
    [
      false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
    [
      false,false,false,false,false,false,false,false,false,false,false,false,],
  ];
  subPreguntas = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  tablaPuntajeTotal: puntaje[];
  tablaSubTestG: contenedorSubTest[] = [];
  datosGeneralesFG: FormGroup;
  anioEdad: number;
  mesEdad: number;
  diaEdad: number;
  rango: number = 0;
  fechaNacimiento = "";
  attributeLocalS = "documento";
  data: dato;
  idConsulta: string;
  usuario: any;
  minimo: number[] = [5, 5, 3, 4, 2, 2, 2, 2, 2, 2, 2, 3, 2];
  indicePregunta: number[] = [3, 4, 6, 7, 12, 13, 14, 15, 16, 17, 18, 23, 24];
  constructor(
    private tepsiService: TepsiService,
    private messageService: MessageService
  ) {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.idConsulta = this.data.idConsulta;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.buildForm();
    this.inicializarGrafico();
    this.getFC("nombreExaminador").setValue(
      `${this.usuario.nombres} ${this.usuario.apellidos}`
    );
    this.anioEdad = this.data.anio;
    this.mesEdad = this.data.mes;
    this.diaEdad = this.data.dia;
    this.rango = this.determinarRango(this.anioEdad,this.mesEdad,this.diaEdad);
    // this.rango = this.determinarRango(4,0,2);
    this.getTablaPuntaje();
  }

  ngOnInit(): void {
    this.getTestTepsi();
  }

  buildForm() {
    this.datosGeneralesFG = new FormGroup({
      nombreExaminador: new FormControl({value:'',disabled:true}, Validators.required),
      fechaSelected: new FormControl({value:new Date(this.data.fechaConsulta),disabled:true}, Validators.required),
      observacion: new FormControl('', Validators.required),
      
    });
    console.log('data-->',this.data);
    
  }

  traerPuntaje() {
    const aux = this.resultadoA;
    return [aux[0].puntajeT, aux[1].puntajeT, aux[2].puntajeT, aux[3].puntajeT];
  }

  determinaColor() {
    const aux = this.resultadoA;
    let color: string;
    const arreglo = aux.map((item) => { 
      if (item.categoria == "Normal") {
        color = "#0C3866";//blue
      } else {
        if (item.categoria == "Riesgo") {
          color = "#F3D9DC";
        } else {
          color = "#D77F8A";
        }
      }

      return color;
    });

    return arreglo;
  }

  inicializarGrafico() {
    this.chartData = {
      labels: [
        "Test Total",
        "Sub Test Coordinacion",
        "Sub Test Lenguaje",
        "Sub Test Motricidad",
      ],
      datasets: [
        {
          label: "Puntaje T Resultado Test Total",
          backgroundColor: this.determinaColor(),
          data: this.traerPuntaje(),
        //   data:[12,12,14,15],
        },
      ],
    };
    this.horizontalOptions = {
      indexAxis: "y",
      plugins: {
        legend: {
          labels: {
            color: "black",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "black",
          },
          grid: {
            color: "#AF0017",
          },
        },
        y: {
          ticks: {
            min: 0,
            max: 90,
            color: "black",
          },
          grid: {
            color: "#AF0017",
          },
        },
      },
    };
  }
  actualizarDataGraficar() {
    this.chartData.datasets[0].data = this.traerPuntaje();
    this.chartData.datasets[0].backgroundColor = this.determinaColor();
    this.chartReferencia.refresh()
    // setTimeout(()=>{
    // },200)
  }
  contador=0
  reconstruirTest(arreglo: any[]) {
    this.contador+=1
    console.log('erreglo',this.contador,arreglo);
    
    const aux = arreglo.map((element) => {
      return element.valor == 1 ? true : false;
    });
    return aux;
  }

  hasTaken: boolean = false;

  getTestTepsi() {
    this.tepsiService.getConsultaTepsi(this.idConsulta).then((resp:any) => {
      //resp.cod==2122 => no hay registro
      if (resp.cod == "2122") {
        return;
      }
      
      this.hasTaken = true;
      const objetoTepsi={
        fecha:resp.object.testTepsi.fechaAtencion,
        edad:`${resp.object.testTepsi.edad.anio}años,${resp.object.testTepsi.edad.mes}meses,${resp.object.testTepsi.edad.dia}dias`,
        diagnostico:resp.object.testTepsi.diagnostico,
        observacion:resp.object.testTepsi.observacion
        
      }
      this.arregloTestTepsi.push(objetoTepsi)
      // Swal.fire({
      //   icon: "success",
      //   title: "Registro Tepsi Recuperado",
      //   text: "Evaluacion Tepsi recuperado",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
      const resultado = resp["object"]["testTepsi"];
      this.anioEdad = resultado["edad"]["anio"];
      this.mesEdad = resultado["edad"]["mes"];
      this.diaEdad = resultado["edad"]["dia"];
      this.getFC("fechaSelected").setValue(
        new Date(resultado["fechaAtencion"])
      );
      this.getFC("nombreExaminador").setValue(resultado["docExaminador"]);
      this.getFC("observacion").setValue(resultado["observacion"]);

      this.arregloSubtest[0] = this.reconstruirTest(
        resultado["subTestCoordinacion"]["listItemTest"]
      );
      this.arregloSubtest[1] = this.reconstruirTest(
        resultado["subTestLenguaje"]["listItemTest"]
      );
      this.arregloSubtest[2] = this.reconstruirTest(
        resultado["subTestMotricidad"]["listItemTest"]
        );
      //reconstruye las subpregusntas del test de lenguaje
      this.resconstruirSubPreguntas(resultado["subTestLenguaje"]["listItemTest"])
      //Recuperamos los datos de las dos tablas total,subtests
      const tests = [
        "resultadoTestTotal","subTestCoordinacion","subTestLenguaje","subTestMotricidad"];
      this.resultadoA.forEach((elemento, index) => {
        const { puntajeBruto, puntajeT, categoria } = resultado[tests[index]];
        this.resultadoA[index] = { puntajeBruto, puntajeT, categoria };
      });
      this.actualizarDataGraficar();
    });
  }
  resconstruirSubPreguntas(arregloLenguaje) {
    this.subPreguntas.forEach((element, index) => {
      this.subPreguntas[index] = this.recuperarTrueFalse(
        arregloLenguaje[this.indicePregunta[index] - 1].listaPreguntas
      );
    });
    console.log("respuesta", this.subPreguntas);
  }

  recuperarTrueFalse(arreglo) {
    let arregloAux = arreglo.map((element) => {
      return element.valor;
    });
    return arregloAux;
  }
  fueraRango:boolean=false
  determinarRango(anio: number, mes: number, dia: number): number {
     /* fuera de rango  */
    let rango
    if ((anio==0 || anio ==1) ||(anio == 2 && mes <= 5) ||(anio == 2 && mes == 6 && dia == 0)){
      if(anio<=1){
        this.fueraRango=true
      }
      rango=1;
    } 
    else if ((anio == 2 && mes >= 6) || (anio == 3 && mes == 0 && dia == 0)) 
      rango=2;
    else if ((anio == 3 && mes <= 5) || (anio == 3 && mes == 6 && dia == 0))
      rango=3;
    else if ((anio == 3 && mes >= 6) || (anio == 4 && mes == 0 && dia == 0)) 
      rango=4;
    else if ((anio == 4 && mes <= 5) || (anio == 4 && mes == 6 && dia == 0)) 
      rango=5;
    else{
      if(anio>=5){
        this.fueraRango=true
      }
      rango=6;
    }
    return rango;
  }

  getFC(control: string): AbstractControl {
    return this.datosGeneralesFG.get(control);
  }

  abrimosModal(index) {
    console.log(index);
    this.displayTest[index] = true;
  }

  evaluandoItem(index) {
    let acumulador = this.calcularSumaArreglos(this.subPreguntas[index]);
    console.log(acumulador);
    if (acumulador >= this.minimo[index]) {
      this.arregloSubtest[1][this.indicePregunta[index] - 1] = true;
    } else {
      this.arregloSubtest[1][this.indicePregunta[index] - 1] = false;
    }
    this.calcularResultadoSubTest1(2);
  }

  getTablaPuntaje() {
    Swal.fire({
      title: "Cargando Datos",
      html: "Determinan Rango de evaluacion",
    });
    Swal.showLoading();
    this.tepsiService.getTablaPuntaje1(this.rango).then((data) => {
      this.tablaPuntajeTotal = data["object"]["tablaPuntajeTotal"];
      this.tablaSubTestG.push({
        subTest: data["object"]["tablaSubTestCoordinacion"],
      });
      this.tablaSubTestG.push({
        subTest: data["object"]["tablaSubTestLenguaje"],
      });
      this.tablaSubTestG.push({
        subTest: data["object"]["tablaSubTestMotricidad"],
      });
      this.calcularResultadoSubTest1(1);
      this.calcularResultadoSubTest1(2);
      this.calcularResultadoSubTest1(3);
      this.calcularTotal();
      this.actualizarDataGraficar();
      Swal.close();
    });
  }

  calcularSumaArreglos(arregloBoolean: boolean[]) {
    let sumaAux = 0;
    arregloBoolean.forEach((element) => {
      if (element == true) {
        sumaAux += 1;
      }
    });
    return sumaAux;
  }

  determinarCategoria(puntajeT: number) {
    return puntajeT < 30 ? "Retraso" : puntajeT < 40 ? "Riesgo" : "Normal";
  }

  calcularTotal() { 
    this.resultadoA[0].puntajeBruto =
      this.resultadoA[1].puntajeBruto +
      this.resultadoA[2].puntajeBruto +
      this.resultadoA[3].puntajeBruto;
    const element = this.tablaPuntajeTotal.find((item: puntaje) => {
      return this.resultadoA[0].puntajeBruto === parseInt(item.puntajeBruto);
    });
    this.resultadoA[0].puntajeT = parseInt(element.puntajeT);
    this.resultadoA[0].categoria = this.determinarCategoria(
      parseInt(element.puntajeT)
    );
  }

  isResolve: boolean[] = [false, false, false]; //todo

  calcularResultadoSubTest1(indexSubTest: number) {
    //1,2,3
    this.resultadoA[indexSubTest].puntajeBruto = this.calcularSumaArreglos(
      this.arregloSubtest[indexSubTest - 1]
    );
    const element = this.tablaSubTestG[indexSubTest - 1].subTest.find(
      (item: puntaje) => {
        return (
          this.resultadoA[indexSubTest].puntajeBruto ==
          parseInt(item.puntajeBruto)
        );
      }
    );
    this.resultadoA[indexSubTest].puntajeT = parseInt(element.puntajeT);
    this.resultadoA[indexSubTest].categoria = this.determinarCategoria(
      parseInt(element.puntajeT)
    );
    this.calcularTotal();
    this.actualizarDataGraficar();
    // this.chartData=this.chartData;
    
    // console.log(this.chartData);
    
  }
  
  save() {
    const faltante = this.isResolve.filter((element) => {
      return element == false;
    });
    if (faltante.length >1 ) {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'Debe evaluar todos los sub test' ,
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }
    if (this.getFC('observacion').invalid) {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'Ingrese observacion' ,
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }
    const fecha: string[] = this.getFC("fechaSelected").value.toISOString().split("T");
    const hora: string = fecha[1].split(".")[0];
    const requestInput = {
      codigoCIE10: "Z009",
      codigoHIS: "Z009",
      codigoPrestacion: "0001",
      testTepsi: {
        edad: {
          anio: this.anioEdad, //todo debe ser la misma fecha recuperada
          mes: this.mesEdad,
          dia: this.diaEdad,
        },
        fechaAtencion: `${fecha[0]} ${hora}`,
        diagnostico: this.resultadoA[0].categoria,
        docExaminador: this.getFC("nombreExaminador").value,
        resultadoTestTotal: {
          puntajeBruto: this.resultadoA[0].puntajeBruto,
          puntajeT: this.resultadoA[0].puntajeT,
          categoria: this.resultadoA[0].categoria,
        },
        subTestCoordinacion: {
          tipoSubTest: "COORDINACION",
          puntajeBruto: this.resultadoA[1].puntajeBruto,
          puntajeT: this.resultadoA[1].puntajeT,
          categoria: this.resultadoA[1].categoria,
          listItemTest: this.determinarArreglo("C", this.arregloSubtest[0]),
        },
        subTestLenguaje: {
          tipoSubTest: "LENGUAJE",
          puntajeBruto: this.resultadoA[2].puntajeBruto,
          puntajeT: this.resultadoA[2].puntajeT,
          categoria: this.resultadoA[2].categoria,
          listItemTest: this.determinarArreglo2("L", this.arregloSubtest[1]),
        },
        subTestMotricidad: {
          tipoSubTest: "MOTRICIDAD",
          puntajeBruto: this.resultadoA[3].puntajeBruto,
          puntajeT: this.resultadoA[3].puntajeT,
          categoria: this.resultadoA[3].categoria,
          listItemTest: this.determinarArreglo("M", this.arregloSubtest[2]),
        },
        observacion:this.getFC('observacion').value
      },
    };
      /* start */
      console.log('Input Request',requestInput);
      
      // return 
      Swal.fire({
        title: 'Esta seguro que desea guardar este registro?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
            this.tepsiService.postConsultaTepsi(this.idConsulta, requestInput)
              .subscribe(
                (resp:any) => {
                  if(resp.cod!='2005'){
                    Swal.fire({
                      icon: "success",
                      title: "Test Tepsi Guardado Satifactoriamente",
                      text: "",
                      showConfirmButton: false,
                      timer: 3000,
                    });
                    this.getTestTepsi()
                    this.displayDialog=false
                  }
                  else{
                    Swal.fire({
                      icon: "info",
                      title: "Ya existe un test tepsi ",
                      text: `Ya existe una evaluacion para el mes ${this.anioEdad*12+this.mesEdad}`,
                      showConfirmButton: false,
                      timer: 3000,
                    });
                  }
                },
                (error) => {
                  console.log('error del servidor');  
                }
              );
        }
      })
      /* end */
      
  
  }

  determinarArreglo(letra: string, arreglo: boolean[]): itenTestResultado[] {
    const arregloAux = arreglo.map((element, index) => {
      return { codigo: `${index + 1}${letra}`, valor: element ? 1 : 0 };
    });
    return arregloAux;
  }

  determinarArreglo2(letra: string, arreglo: any[]): itenTestResultado[] {
    // let arregloAux:[]=[];
    // let auxPregunta;
    // arreglo.forEach((item,index)=>{
    //   auxPregunta={codigo:`${index+1}${letra}`,valor:item?1:0}
    //   arregloAux.push(auxPregunta)
    // })
    const arregloAux: itenTestResultado[] = arreglo.map((element, index) => {
      return { codigo: `${index + 1}${letra}`, valor: element ? 1 : 0 };
    });
    this.indicePregunta.forEach((element, index) => {
      arregloAux[element - 1].listaPreguntas = this.construirEstructura(
        this.subPreguntas[index]
      );
    });
    return arregloAux;
  }

  construirEstructura(arreglo: boolean[]): listaPregunta[] {
    const arregloAux = arreglo.map((element, index) => {
      return { nroPregunta: index + 1, valor: element };
    });
    return arregloAux;
  }
  mostrarMensaje(){
    if(this.fueraRango){
      Swal.fire({
        icon: "info",
        title: "Fuera de rango ",
        text: `Esta evaluacion son para niños mayores de 2 años,0 meses,1 dia y menores a 5 años,0 meses,0 dias`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
    else{
      this.displayDialog=true
    }

  }

//   ngOnChanges(changes: any): void {
//     if (changes.inputData.currentValue) {
//       // update this.data here

//       // then chart is getting updated
//       setTimeout(() => {
        
//       }, 100);
//     }
//   }
}
