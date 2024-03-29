import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
import { Value } from "../../../../../../../../../../pn-gestante/interfaces/padron_Nominal";
@Component({
  selector: "app-test-peruano",
  templateUrl: "./test-peruano.component.html",
  styleUrls: ["./test-peruano.component.css"],
  providers: [TestPeruano],
})
export class TestPeruanoComponent implements OnInit {
  @Output() onSave:EventEmitter<number>=new EventEmitter<number>();
  arregloForm: FormGroup;
  arregloFormRadio: FormArray;
  displayDialog: boolean = false;
  listaMeses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24, 30]; //17
  listaLetras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]; //12
  listaAreas = ["motor postural", "motor postural", "motor postural", "visor motor", "visor motor", "lenguaje", "lenguaje", "lenguaje", "personal-social", "personal-social", "personal-social", "inteligencia-aprendisaje"]; //12

  imagenes: any[];
  listaTestPeruano: any[];
  datePipe = new DatePipe("en-US");
  data = JSON.parse(localStorage.getItem("documento"));
  fechas = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  isTodo = true;
  constructor(private testPeruanoService: TestPeruano) {
    this.construirMatrisColores();
    this.buildFormArray();
    this.buildFormArrayRadio();
    this.testPeruanoService.getImagenes().then((data) => {
      this.imagenes = data;
    });
    this.calcularEdades();
    this.indexEdadMeses = this.listaMeses.indexOf(
      this.listaMeses.find((element) => element == this.edadMeses)
    );
  }
  ngOnInit(): void {
    this.getTestPeruanoPlan();
    this.getTestPeruanoConsulta();
  }
  buildFormArrayRadio() {
    this.arregloFormRadio = new FormArray([
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
      new FormControl({ value: null, disabled: false }, Validators.required),
    ]);
  }

  getTestPeruanoPlan() {
    this.testPeruanoService
      .getTestPeruanoPlan(this.data.nroDocumento)
      .subscribe((resp: any) => {
        if (resp.cod == "2121") {
          this.listaTestPeruano = resp.object;
          this.construirMatrisColores();
          // this.displayDialog=true
          // this.arregloForm.reset()
          // this.fechas=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
          this.listaTestPeruano.forEach((fila, index) => {
            const edad = this.listaTestPeruano[index].edad;
            const elementoMes = this.listaMeses.find(
              (element) => element == edad
            );
            const indice = this.listaMeses.indexOf(elementoMes);
            const fecha = this.listaTestPeruano[index].fecha;
            this.fechas[indice] = new Date(fecha);
            this.fechasEvaluadas.push({ indice });
            const test = this.listaTestPeruano[index].calificacion;
            test.forEach((element, index) => {
              /* x=6,x=11 */
              if (element.y == 0) return;
              const x = element.x - 1;
              const y = this.listaMeses.indexOf(element.y);
              this.getControl(x, y).setValue(true);
              this.matrisColores[x][y] = `mes${edad}`;
            });
          });
        }
        if (this.indexEdadMeses != -1 && !this.fechas[this.indexEdadMeses]) {
          /* hay evaluacion ese mes? */
          // console.log("---->entramos en el if");
          this.fechas[this.indexEdadMeses] = new Date(this.data.fechaConsulta);
          this.isAgregable = true;
        }
      });
  }
  isAgregable = false;
  hasTaken: boolean = false;
  arregloTestXConsulta: any[] = [];
  getTestPeruanoConsulta() {
    this.testPeruanoService
      .getTestPeruano(this.data.idConsulta)
      .subscribe((resp: any) => {
        if (resp.cod == "2121") {
          this.hasTaken = true;
          const ObjetoPeruano = {
            fecha: resp.object.evaluacionDesarrolloMes.fecha,
            edad: resp.object.evaluacionDesarrolloMes.edad,
            diagnostico: resp.object.evaluacionDesarrolloMes.diagnostico,
            observacion: resp.object.evaluacionDesarrolloMes.observacion,
          };
          this.arregloTestXConsulta.push(ObjetoPeruano);
          // const calificacionArreglo:any[]=resp.object.evaluacionDesarrolloMes.calificacion;
          // calificacionArreglo.forEach((elemnet,index)=>{
          //   this.getControl(index).setValue(elemnet.y)
          // })
          // // this.fecha=resp.object.evaluacionDesarrolloMes.fecha
          // this.fecha=  new Date(resp.object.evaluacionDesarrolloMes.fecha)
          // this.edadMeses=resp.object.evaluacionDesarrolloMes.edad
          // this.desabilitarRadios()
        }
      });
  }

  fechasEvaluadas = [];
  matrisColores = [];
  construirMatrisColores() {
    this.matrisColores = [];
    this.listaLetras.forEach((element, i) => {
      const fila = [];
      this.listaMeses.forEach((element, j) => {
        fila.push("");
      });
      this.matrisColores.push(fila);
    });
  }
  edad: number = 0;
  edadMeses: number = 0;
  indexEdadMeses: number = 0;
  calcularEdades() {
    this.edad = this.data.anio * 12 + this.data.mes;

    if (this.edad <= 11) {
      this.edadMeses = this.edad;
    } else if (this.edad <= 14) {
      this.edadMeses = 12;
    } else if (this.edad <= 17) {
      this.edadMeses = 15;
    } else if (this.edad <= 20) {
      this.edadMeses = 18;
    } else if (this.edad <= 23) {
      this.edadMeses = 21;
    } else if (this.edad <= 29) {
      this.edadMeses = 24;
    } else if (this.edad == 30) {
      this.edadMeses = 30;
    } else this.edadMeses = this.edad; /* no se habilita ningun mes */
  }
  ruta(sale: any, mes: number) {
    return sale[`img_${mes}`];
  }
  buildFormArray() {
    this.arregloForm = new FormGroup({});
    this.listaLetras.forEach((element, i) => {
      const aux = new FormArray([]);
      this.listaMeses.forEach((element2, j) => {
        aux.push(new FormControl({ value: null, disabled: true }));
      });
      this.arregloForm.addControl(`${i}`, aux);
    });
  }
  getControl(i: number, j: number): AbstractControl {
    const A: any = this.arregloForm.get(`${i}`);
    const B: any = A.controls[j];
    return B;
  }
  determinarColor(j) {
    switch (j) {
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
  determinarColorOtro(j) {
    if (j == 0) {
      return "mes1";
    } else if (j == 1) {
      return "mes2";
    } else if (j == 2) {
      return "mes3";
    } else if (j == 3) {
      return "mes4";
    } else if (j == 4) {
      return "mes5";
    } else if (j == 5) {
      return "mes6";
    } else if (j == 6) {
      return "mes7";
    } else if (j == 7) {
      return "mes8";
    } else if (j == 8) {
      return "mes9";
    } else if (j == 9) {
      return "mes10";
    } else if (j == 10) {
      return "mes11";
    } else if (j == 11) {
      return "mes12";
    } else if (j == 12) {
      return "mes15";
    } else if (j == 13) {
      return "mes18";
    } else if (j == 14) {
      return "mes21";
    } else if (j == 15) {
      return "mes24";
    } else {
      return "mes30";
    }
  }
  mostrarMensaje() {
    if (
      !this.isAgregable &&
      this.arregloTestXConsulta.length == 0 &&
      this.indexEdadMeses >= 0
    ) {
      Swal.fire({
        icon: "warning",
        title: `Ya existe evaluacion para el mes ${this.edadMeses}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
  // para el los radios
  getControlRadio(index: number): AbstractControl {
    return this.arregloFormRadio.controls[index];
  }
  arregloCalificacion() {
    let arreglo = [];
    this.imagenes.forEach((element, index) => {
      let objeto = {
        // codigo: "A_10",
        codigo: `${element.letter}_${
          this.getControlRadio(index).value
            ? this.getControlRadio(index).value
            : 0
        }`,
        descripcion: "",
        actividad: element.texto,
        x: index + 1,
        y: this.getControlRadio(index).value
          ? this.getControlRadio(index).value
          : 0,
      };
      arreglo.push(objeto);
    });
    return arreglo;
  }
  encontrarDiagnostico1() {
    let diagnostico = "Normal";
    const arreglo = this.arregloFormRadio.value;
    arreglo.forEach((element) => {
      if (element < this.edadMeses) diagnostico = "Retraso";
    });
    return diagnostico;
  }
  encontrarObservacion() {
    const areaDeficitList=[]
    const arreglo = this.arregloFormRadio.value;
    console.log("arrreglo", arreglo);

    arreglo.forEach((element,index) => {
      if (element == null || element < this.edadMeses) {
        const posicion=areaDeficitList.indexOf(this.listaAreas[index])
          if(posicion==-1){
            areaDeficitList.push(this.listaAreas[index]) 
           }
      }
      });
    console.log('arreglo',areaDeficitList);
    
    let observacionTexto=''
    areaDeficitList.forEach((element) => {
      observacionTexto=observacionTexto+`${element};`
    });
    // if(observacionTexto.length>=1)
      const real=observacionTexto.slice(0,-1)
    return real
  }
  encontrarDiagnostico() {
    let nroFallidos = 0;
    const arreglo = this.arregloFormRadio.value;
    // console.log("arrreglo", arreglo);

    arreglo.forEach((element) => {
      if (element == null || element < this.edadMeses) nroFallidos += 1;
    });
    return nroFallidos == 0
      ? "Normal"
      : nroFallidos == 1
      ? "Riesgo para el desarrollo"
      : "Transtorno del Desarrollo";
  }
  save() {
    if (this.edadMeses != 1 && !this.arregloFormRadio.valid) {
      Swal.fire({
        icon: "info",
        title: "Test Peruano",
        text: "Todas las lineas de desarrollo deben ser evaluadas",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (this.observacion == "") {
      Swal.fire({
        icon: "info",
        title: "Test Peruano",
        text: "Ingrese observacion",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    const inputRequest = {
      nombreEvaluacion: "TEST_PERUANO",
      codigoCIE10: "Z009",
      codigoHIS: "Z009",
      codigoPrestacion: "0001",
      evaluacionDesarrolloMes: {
        edad: this.edadMeses,
        fecha: this.datePipe.transform(
          this.fechas[this.indexEdadMeses],
          "yyyy-MM-dd HH:mm:ss"
        ),
        diagnostico: this.encontrarDiagnostico(),
        docExaminador: "24242424",
        calificacion: this.arregloCalificacion(),
        observacion: this.observacion,
      },
    };
  
    Swal.fire({
      title: "Esta seguro que desea guardar este registro?",
      html:`<div>Diagnostico:<span>${inputRequest.evaluacionDesarrolloMes.diagnostico}</span></div>
            <div>Observacion:<span>${inputRequest.evaluacionDesarrolloMes.observacion}</span></div>`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.testPeruanoService
          .addTestPeruano(this.data.idConsulta, inputRequest)
          .subscribe((res: any) => {
            if (res.cod == "2121") {
              this.onSave.emit(1);//emitimos el evento
              Swal.fire({
                icon: "success",
                title: "Test Peruano",
                text: `Se guardo existosamente la evaluacion para la edad ${this.edadMeses} meses`,
                showConfirmButton: false,
                timer: 2000,
              });
              this.displayDialog = false;
              this.isAgregable = false;
              this.getTestPeruanoPlan();
              this.getTestPeruanoConsulta();
            }
          });
      }
    });
  }
  observacion: string = "";
  async agregamosObservacion() {
    /* desestructutacion */
    const { value, isConfirmed } = await Swal.fire({
      input: "text",
      inputLabel: "Ingrese Observacion",
      width: "800px",
      inputValue: this.encontrarObservacion(),
      inputPlaceholder: "obs.",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (isConfirmed) {
      this.observacion = value;
    }
  }
}
