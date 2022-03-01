import { Component, OnInit } from '@angular/core';
import {FechaEvaluacionAlimentacion, Product, Preguntas} from "../../../../../plan/component/evaluacion-general/models/EvaluacionAlimentacion";
import {DatePipe} from "@angular/common";
import {EvaluacionAlimentacionService} from "../../services/evaluacion-alimentacion.service";
import Swal from "sweetalert2";
import {dato} from "../../../../../../models/data";
import {MessageService} from "primeng/api";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  tipoDocRecuperado:string="";
  nroDocRecuperado:string="";
  evaluacionAlimenticia: FechaEvaluacionAlimentacion[]=[];
  Evaluaciones:EvaluacionAlimenticia[]=[];
  datePipe=new DatePipe('en-US');
  attributeLocalS = 'documento'
  edadMeses:number=0;
  displayPosition: boolean;
  position: string;
  diagnostico:string;
  data:dato;
  listaTitulosPreguntas:TipoPregunta[]=[];

  constructor(private evalAlimenService: EvaluacionAlimentacionService,
              private messageService: MessageService) {
    this.listaTitulosPreguntas=[{codigo:'FECHA',titulo:'FECHA'},
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
  }
  ngOnInit(): void {
    this.llenarTabla();
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.recuperarEdadNinio(); /*cuando recupere datos en consulta*/
    this.recuperarDataPlanAlimentaciaBD();
    // this.VerificarRegistroExistenteEnEsteMes(this.edadMeses);
    this.showDialogEdad('top');
  }
  llenarTabla(){
    for(let i = 0; i<this.listaTitulosPreguntas.length;i++){
      let cadena = {
        titulo:this.listaTitulosPreguntas[i].titulo,
        valorRN:"",
        valor1M:"",
        valor2M:"",
        valor3M:"",
        valor4M:"",
        valor5M:"",
        valor6M:"",
        valor7M:"",
        valor8M:"",
        valor9M:"",
        valor10M:"",
        valor11M:"",
        valor12M:"",
        valor14M:"",
        valor16M:"",
        valor18M:"",
        valor20M:"",
        valor22M:"",
        valor24M:"",
        valor27M:"",
        valor30M:"",
        valor33M:"",
        valor36M:"",
        valor39M:"",
        valor42M:"",
      }
      this.evaluacionAlimenticia.push(cadena);
    }
    console.log(this.evaluacionAlimenticia);
  }
  recuperarEdadNinio(){
    this.edadMeses=  this.data.anio*12+this.data.mes
    console.log(this.edadMeses);
  }
  /**Mostrar la edad del niño en alerta**/
  showDialogEdad(position:string){
    console.log("entrado a dialog", this.edadMeses);
    this.position = position;
    this.displayPosition = true;
  }
  /******RECUPERAR LISTA DE EVALUACION ALIMENTICIA*******/
  recuperarDataPlanAlimentaciaBD(){
    console.log('documentos',this.data.nroDocumento);
    this.evalAlimenService.getEvaluacionAlimenticiaCredPlan(this.data.nroDocumento).subscribe((res: any) => {
      this.Evaluaciones = (res.object);
      if(res.object!=null){
        let aux:any;
        let i = 0;
        while(this.Evaluaciones[i]!=undefined){
          console.log("entrando i", i);
          aux=this.Evaluaciones[i]
          if(aux.edad == 0){
            this.evaluacionAlimenticia[0].valorRN = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valorRN = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valorRN = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 1) {
            console.log(this.evaluacionAlimenticia[0]);
            this.evaluacionAlimenticia[0].valor1M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor1M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor1M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 2) {
            this.evaluacionAlimenticia[0].valor2M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor2M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor2M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 3) {
            this.evaluacionAlimenticia[0].valor3M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor3M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor3M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 4) {
            this.evaluacionAlimenticia[0].valor4M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor4M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor4M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 5) {
            this.evaluacionAlimenticia[0].valor5M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor5M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor5M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 6) {
            this.evaluacionAlimenticia[0].valor6M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor6M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor6M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 7) {
            this.evaluacionAlimenticia[0].valor7M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor7M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor7M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 8) {
            this.evaluacionAlimenticia[0].valor8M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor8M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor8M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 9) {
            this.evaluacionAlimenticia[0].valor9M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor9M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor9M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 10) {
            this.evaluacionAlimenticia[0].valor10M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor10M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor10M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 11) {
            this.evaluacionAlimenticia[0].valor11M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor11M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor11M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 12) {
            this.evaluacionAlimenticia[0].valor12M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor12M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor12M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 14) {
            this.evaluacionAlimenticia[0].valor14M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor14M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor14M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 16) {
            this.evaluacionAlimenticia[0].valor16M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor16M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor16M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 18) {
            this.evaluacionAlimenticia[0].valor18M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor18M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor18M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 20) {
            this.evaluacionAlimenticia[0].valor20M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor20M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor20M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 22) {
            this.evaluacionAlimenticia[0].valor22M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor22M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor22M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 24) {
            this.evaluacionAlimenticia[0].valor24M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor24M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor24M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 30) {
            this.evaluacionAlimenticia[0].valor30M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor30M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor30M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 33) {
            this.evaluacionAlimenticia[0].valor33M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor33M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor33M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 36) {
            this.evaluacionAlimenticia[0].valor36M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor36M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor36M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 39) {
            this.evaluacionAlimenticia[0].valor39M = aux.fechaRegistro;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor39M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          if(aux.edad == 42) {
            this.evaluacionAlimenticia[0].valor42M = aux.fechaRegistro;
            this.evaluacionAlimenticia[18].valor42M = aux.diagnostico;
            let x  = 0;
            while(aux.listaPreguntas[x]!=undefined){
              this.evaluacionAlimenticia[x+1].valor42M = aux.listaPreguntas[x].estado;
              x++;
            }
          }
          i++;
        }
      }
      else{
        this.messageService.add({severity:'info', summary: 'Evaluacion Alimenticia', detail: 'No hay registros anteriores'});
      }
    });
  }
  /*************RECUPERAR EL VALOR DE EDAD COMO STRING ************/
  obtenerTitulo(indice):string{
    if(indice==0){return "valorRN"}
    else{
      return "valor" + indice + "M"
    }
  }
  /**************GUARDAR UNA EVALUACION ALIMENTICIA***************/
  guardarEvaluacion(indice){
    console.log('entro guardar', this.evaluacionAlimenticia);
    let prefijo = this.obtenerTitulo(indice);
    let preguntas=[];
    console.log(prefijo);
    console.log(this.evaluacionAlimenticia[1][prefijo])
    for(let i = 1;i<this.evaluacionAlimenticia.length-1;i++)
    {
      preguntas.push(this.evaluacionAlimenticia[i][prefijo]);
      console.log(this.evaluacionAlimenticia[i][prefijo])
    }
    let listaAux:any[]=[];
    for(let i=0;i<17;i++){
      let aux={
        codigo:this.listaTitulosPreguntas[i+1].codigo,
        estado:preguntas[i],
        descripcion:this.listaTitulosPreguntas[i+1].titulo
      }
      console.log(aux);
      listaAux.push(aux);
    }
    console.log("preguntas", preguntas);
    let dx = this.calcularDiagnostico(preguntas);
    let cie10:string = this.calcularCie10(dx);
    this.diagnostico=dx;
    console.log('diagnostico:', dx);
    console.log('diagnostico:', cie10);

    let cadena:EvaluacionAlimenticia = {
      nombreEvaluacion:'EVALUACION_ALIMENTACION',
      codigoCIE10:cie10,
      codigoHIS:'Z0017.01',
      codigoPrestacion:'0001',
      evaluacionAlimentacionMes:
          {
            fechaRegistro: this.convertirFecha(this.evaluacionAlimenticia[0][prefijo]),
            edad:indice,
            listaPreguntas:listaAux,
            diagnostico:dx
          }
    }
    Swal.fire({
      title: 'Esta seguro que desea guardar este registro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          this.evalAlimenService.addEvaluacionAlimenticiaCred(this.data.idConsulta,cadena).subscribe((res: any) => {
            console.log('se guardo correctamente ', res.object);
            Swal.fire({
              icon: 'success',
              title: 'Evaluacion Alimenticia',
              text: 'Se guardo existosamente la evaluacion para la edad ' + this.edadMeses,
              showConfirmButton: false,
              timer: 2000,
            })
            this.mostrarMensajeDiagnostico(dx);
            Swal.fire('Guardado!', '', 'success')
          },error => {
            Swal.fire({
              icon: 'error',
              title: 'Evaluacion Alimenticia',
              text: '¡¡Error, ya existe un registro en esta edad en alguna consulta actual o previa. No puede ingresar otro!!',
              showConfirmButton: false,
              timer: 2000,
            })
          });

      } else if (result.isDenied) {
        Swal.fire('No se guardo este registro', '', 'info')
      }
    })
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
  calcularDiagnostico(preguntas:boolean[]){
    console.log(preguntas);
    if(this.edadMeses<=6)
    {
      console.log(preguntas[0]);
      if(preguntas[0]==true && preguntas[1]==true && preguntas[2]==true && preguntas[3]!=true && preguntas[4]!=true && preguntas[5]!=true){
          return 'NINO CON LACTANCIA MATERNA CONTINUADA'
      }
      else return 'PROBLEMA NO ESPECIFICADO DE LA ALIMENTACION DEL RECIEN NACIDO'
    }
    else
    {
      if(this.edadMeses>=7 && this.edadMeses <=22){
          if(preguntas[0]==true  && preguntas[3]==true && preguntas[4]==true && preguntas[5]==true && preguntas[6]==true && preguntas[7]==true && preguntas[8]==true && preguntas[9]==true && preguntas[10]==true && preguntas[11]==true && preguntas[12]==true && preguntas[13]==true){
            return 'NINO CON ALIMENTACION COMPLEMENTARIA ADECUADA'
          }
          else return 'NINO CON ALIMENTACION COMPLEMENTARIA INADECUADA'
      }
      else
      if(preguntas[6]==true && preguntas[7]==true && preguntas[8]==true && preguntas[9]==true && preguntas[10]==true && preguntas[11]==true && preguntas[12]==true && preguntas[13]==true){
        return 'NINO CON ALIMENTACION COMPLEMENTARIA ADECUADA'
      }
      else return 'NINO CON ALIMENTACION COMPLEMENTARIA INADECUADA'
    }

  }
  convertirFecha(fecha){
    const fecha2 = fecha.replace("T"," ");
    return fecha2+":00";
  }
  mostrarMensajeDiagnostico(Dx){
    let timerInterval
    Swal.fire({
      title: 'DIAGNOSTICO ',
      html: 'Espere unos segundos para calcular:',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('dx')
        Swal.fire(Dx)
      }
    })
  }
  // editarEvaluacion(){
  //   let prefijo = this.obtenerTitulo(this.edadMeses);
  //   console.log(prefijo);
  //   console.log(this.Evaluaciones);
  //   let preguntas=[];
  //   console.log(prefijo);
  //   console.log(this.evaluacionAlimenticia[1][prefijo])
  //   for(let i = 1;i<this.evaluacionAlimenticia.length-1;i++)
  //   {
  //     preguntas.push(this.evaluacionAlimenticia[i][prefijo]);
  //   }
//   let listaAux:any[]=[];
//   for(let i=0;i<17;i++){
//   let aux={
//     codigo:this.listaTitulosPreguntas[i+1].codigo,
//     estado:preguntas[i],
//     descripcion:this.listaTitulosPreguntas[i+1].titulo
//   }
//   console.log(aux);
//   listaAux.push(aux);
// }
  //   console.log("preguntas", preguntas);
  //   let dx = this.calcularDiagnostico(preguntas);
  //   let cie10:string = this.calcularCie10(dx);
  //   console.log('diagnostico:', dx);
  //   console.log('diagnostico:', cie10);
  //   this.diagnostico=dx;
  //   let fecha=this.verificarFechaApta(this.evaluacionAlimenticia[0][prefijo]);
  //   let cadena:any= {
  //     nombreEvaluacion:'EVALUACION_ALIMENTACION',
  //     codigoCIE10:cie10,
  //     codigoHIS:'Z0017.01',
  //     codigoPrestacion:"0001",
  //     evaluacionAlimentacionMes:{
  //       fechaRegistro:this.convertirFecha(fecha),
  //       edad:this.edadMeses,
  //       listaPreguntas:listaAux,
  //       diagnostico:dx
  //     }
  //   }
  //   console.log(cadena);
  //   this.evalAlimenService.updateEvaluacionAlimenticiaCred(this.data.idConsulta,cadena).subscribe((res: any) => {
  //     console.log('se edito correctamente ', res.object);
  //     console.log('se edito correctamente cade ', cadena);
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Evaluacion Alimenticia',
  //       text: 'Se actualizo existosamente la evaluacion para la edad ' + this.edadMeses,
  //       showConfirmButton: false,
  //       timer: 2000,
  //     })
  //   });
  // }
  async VerificarRegistroExistenteEnEsteMes(indice){
    this.evalAlimenService.getEvaluacionAlimenticiaCred(this.data.idConsulta).subscribe((res: any) => {
      console.log('se edito correctamente ', res.object);
      Swal.fire({
        icon: 'success',
        title: 'Evaluacion Alimenticia',
        text: 'Ya existe un registro guardado para esta edad: ' + this.edadMeses + 'meses',
        showConfirmButton: false,
        timer: 2000,
      })
    });

  }
}
export interface Evaluacion{
  fechaRegistro?: string;
  edad?:number;
  listaPreguntas?:Preguntas[];
  diagnostico?:string
}
export interface EvaluacionAlimenticia{
  nombreEvaluacion?:string,
  codigoCIE10?:string,
  codigoHIS?:string,
  codigoPrestacion?:string,
  evaluacionAlimentacionMes?:Evaluacion
}
export interface TipoPregunta{
  codigo?:string,
  titulo?:string
}
