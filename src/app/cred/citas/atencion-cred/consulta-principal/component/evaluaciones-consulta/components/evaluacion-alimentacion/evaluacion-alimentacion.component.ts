import { Component, OnInit } from '@angular/core';
import {  EvaluacionAlimenticia,  FechaEvaluacionAlimentacion, Product, Preguntas} from "../../../../../plan/component/evaluacion-general/models/EvaluacionAlimentacion";
import {DatePipe} from "@angular/common";
import {EvalAlimenService} from "../../../../../plan/component/evaluacion-general/service/eval-alimen.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ConsultaGeneralService} from "../../../../services/consulta-general.service";

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  tipoDocRecuperado:string="";
  nroDocRecuperado:string="";
  // products1: Product[];
  evaluacionAlimenticia: FechaEvaluacionAlimentacion[]=[];
  Evaluaciones:EvaluacionAlimenticia[]=[];

  datePipe=new DatePipe('en-US');
  edadEditable:number =0;

  id:string="";
  attributeLocalS = 'idConsulta'
  edadMeses:number=0;
  displayPosition: boolean;
  position: string;
  constructor(private evalAlimenService: EvalAlimenService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private consultaGeneralService: ConsultaGeneralService) {
    this.id = localStorage.getItem(this.attributeLocalS);
  }
  ngOnInit(): void {
     this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
          if (params['nroDoc']) {
            this.tipoDocRecuperado = params['tipoDoc']
            this.nroDocRecuperado = params['nroDoc']
          } else {
            this.router.navigate(['/dashboard/cred/citas'])
          }
        })
    this.evaluacionAlimenticia = [
      {
        "titulo": "Fecha",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "1. ¿El niño(a) esta recibiendo lactancia materna? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "2. ¿La tecnica de LM es adecuada? (explorar y observar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "3. ¿La frecuencia de LM es adecuada? (explorar y observar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "4. ¿El niño(a) recibe leche no materna? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "5. ¿El niño(a) recibe agüitas? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "6. ¿La niña o niño recibe algún otro alimento? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "7. ¿La consistencia de la preparación es adecuada según la edad? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "8. ¿La cantidad de Alimentos es adecuada según la edad? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "9. ¿La frecuencia de la alimentación es adecuada según la edad? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "10. ¿La frecuencia de la alimentación es adecuada según la edad? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "11. ¿Consume frutas y verduras? (explorar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "12. ¿Añade aceite, mantequilla o margarina a la comida del niño?",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "13. ¿La niña o niño o recibe los alimentos en su propio plato?",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "14. ¿Añade sal yodada a la comida familiar?",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "15. ¿Es el niño(a) beneficiario de algún programa de apoyo social? (Especificar)",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "16. ¿Cuántos sobres de micronutrientes consumio en el mes?",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "Observaciones",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      },
      {
        "titulo": "Diagnostico",
        "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
        "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
        "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
      }
    ]
    this.ObtenerUltimaEvaluacion();
    this.recuperarEdadNinio();
    this.recuperarDataEvaluacionAlimenticiaBD();
    this.showDialogEdad('top');
  }
  recuperarEdadNinio(){
    this.consultaGeneralService.getGenerales(this.id).subscribe((r: any) => {
      console.log(r.object.datosGeneralesConsulta.edad);
      this.edadMeses=  r.object.datosGeneralesConsulta.edad.anio*12 + r.object.datosGeneralesConsulta.edad.mes;
      console.log(this.edadMeses);
    });

  }
  showDialogEdad(position:string){
    console.log("entrado a dialog", this.edadMeses);
    this.position = position;
    this.displayPosition = true;
  }
  recuperarDataEvaluacionAlimenticiaBD(){
    this.evalAlimenService.getEvaluacionAlimenticiaCred(this.nroDocRecuperado).subscribe((res: any) => {
      this.Evaluaciones.push(res.object);
      console.log('evaluacion', this.evaluacionAlimenticia);
      console.log('paciente por doc ', this.Evaluaciones)
      console.log(this.Evaluaciones[0]);
      console.log(this.Evaluaciones[0][0]);
      console.log(this.Evaluaciones[0][1]);
      let aux = this.Evaluaciones[0];
      let i = 0
      while(aux[i]!=undefined){
        console.log("entrando i", i);
        if(aux[i].edad == 0){
          this.evaluacionAlimenticia[0].valorRN = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valorRN = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 1) {
          console.log(this.evaluacionAlimenticia[0]);
          this.evaluacionAlimenticia[0].valor1M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor1M = aux[i].listaPreguntas[x].estado;
            x++;
          }

        }
        if(aux[i].edad == 2) {
          this.evaluacionAlimenticia[0].valor2M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor2M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 3) {
          this.evaluacionAlimenticia[0].valor3M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor3M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 4) {
          this.evaluacionAlimenticia[0].valor4M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor4M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 5) {
          this.evaluacionAlimenticia[0].valor5M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor5M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 6) {
          this.evaluacionAlimenticia[0].valor6M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor6M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 7) {
          this.evaluacionAlimenticia[0].valor7M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor7M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 8) {
          this.evaluacionAlimenticia[0].valor8M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor8M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 9) {
          this.evaluacionAlimenticia[0].valor9M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor9M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 10) {
          this.evaluacionAlimenticia[0].valor10M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor10M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 11) {
          this.evaluacionAlimenticia[0].valor11M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor11M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 12) {
          this.evaluacionAlimenticia[0].valor12M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor12M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 14) {
          this.evaluacionAlimenticia[0].valor14M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor14M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 16) {
          this.evaluacionAlimenticia[0].valor16M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor16M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 18) {
          this.evaluacionAlimenticia[0].valor18M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor18M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 20) {
          this.evaluacionAlimenticia[0].valor20M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor20M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 22) {
          this.evaluacionAlimenticia[0].valor22M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor22M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 24) {
          this.evaluacionAlimenticia[0].valor24M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor24M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 30) {
          this.evaluacionAlimenticia[0].valor30M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor30M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 33) {
          this.evaluacionAlimenticia[0].valor33M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor33M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 36) {
          this.evaluacionAlimenticia[0].valor36M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor36M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 39) {
          this.evaluacionAlimenticia[0].valor39M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor39M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        if(aux[i].edad == 42) {
          this.evaluacionAlimenticia[0].valor42M = aux[i].fechaRegistro;
          let x  = 0;
          while(aux[i].listaPreguntas[x]!=undefined){
            this.evaluacionAlimenticia[x+1].valor42M = aux[i].listaPreguntas[x].estado;
            x++;
          }
        }
        i++;
      }

    });
  }
  obtenerTitulo(indice):string{
    if(indice==0){return "valorRN"}
    else{
      return "valor" + indice + "M"
    }
  }
  guardarEvaluacion(indice){
    console.log('entro guardar', this.evaluacionAlimenticia);
    let prefijo = this.obtenerTitulo(indice);
    let preguntas=[];
    console.log(prefijo);
    console.log(this.evaluacionAlimenticia[1][prefijo])
    for(let i = 1;i<this.evaluacionAlimenticia.length;i++)
    {
      preguntas.push(this.evaluacionAlimenticia[i][prefijo]);
    }
    let lista = [
      {
        "codigo": "PREG_1",
        "estado": preguntas[0],
        "descripcion": "¿La Niña Esta Recibiendo Lactancia Materna? (explorar) "
      },
      {
        "codigo": "PREG_2",
        "estado": preguntas[1],
        "descripcion": "¿La tecnica de LM es adecuada? (explorar y observar)"
      },
      {
        "codigo": "PREG_3",
        "estado": preguntas[2],
        "descripcion": "¿La frecuencia de LM es adecuada? (explorar y observar)"
      },
      {
        "codigo": "PREG_4",
        "estado": preguntas[3],
        "descripcion": "¿La niña o niño recibe leche no materna? (explorar)"
      },
      {
        "codigo": "PREG_5",
        "estado": preguntas[4],
        "descripcion": "¿La niña o niño recibe aguitas? (explorar)"
      },
      {
        "codigo": "PREG_6",
        "estado":preguntas[5],
        "descripcion": "La niña o niño recibe algun otro alimento? (explorar)"
      },
      {
        "codigo": "PREG_7",
        "estado": preguntas[6],
        "descripcion": "¿La consistencia de la preparacion es adecuada segun la edad?(explorar)"
      },
      {
        "codigo": "PREG_8",
        "estado": preguntas[7],
        "descripcion": "¿La cantidad de alimentos es adecuada segun edad? (explorar)"
      },
      {
        "codigo": "PREG_9",
        "estado": preguntas[8],
        "descripcion": "¿La frecuencia de la alimentacion es adecuada segun la edad? (explorar)"
      },
      {
        "codigo": "PREG_10",
        "estado": preguntas[9],
        "descripcion": "¿Consume alimentos de origen animal? (explorar)"
      },
      {
        "codigo": "PREG_11",
        "estado": preguntas[10],
        "descripcion": "¿Consume frutas y verduras? (explorar)"
      },
      {
        "codigo": "PREG_12",
        "estado": preguntas[11],
        "descripcion": "¿Añade aceite, mantequilla o margarina a la comida del niño?"
      },
      {
        "codigo": "PREG_13",
        "estado": preguntas[12],
        "descripcion": "¿La niña o niño recibe los alimentos en su propio plato?"
      },
      {
        "codigo": "PREG_14",
        "estado": preguntas[13],
        "descripcion": "¿Añade sal yodada a la comida familiar?"
      },
      {
        "codigo": "PREG_15",
        "estado": preguntas[14],
        "descripcion": "¿Es niño beneficiario de algun Programa de Apoyo Social? Si() No() Especificar"
      },
      {
        "codigo": "PREG_16",
        "estado": preguntas[15],
        "descripcion": "¿Cuantos sobres de micronutrientes consumio en el mes? Si() No() Especificar"
      },
      {
        "codigo": "OBS",
        "estado": preguntas[16],
        "descripcion": ""
      }
    ];
    console.log("preguntas", preguntas);
    let cadena = {
      // fechaRegistro: new Date(this.datePipe.transform(this.evaluacionAlimenticia[0][prefijo],'yyyy-MM-dd HH:mm:ss')),
      fechaRegistro: this.convertirFecha(this.evaluacionAlimenticia[0][prefijo]),
      edad:indice,
      listaPreguntas:lista,
    }
    this.evalAlimenService.addEvaluacionAlimenticiaCred(this.nroDocRecuperado,cadena).subscribe((res: any) => {
      console.log('se guardo correctamente ', res.object);
      console.log('se guardo correctamente cade ', cadena);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: "Se guardo correctamente el registro de Evaluacion de la edad: " + indice + "meses"
      });
    });

  }
  convertirFecha(fecha){
    const fecha2 = fecha.replace("T"," ");
    return fecha2+":00";
  }
  editarEvaluacion(){
    let prefijo = this.obtenerTitulo(this.edadEditable);
    console.log(prefijo);
    console.log(this.Evaluaciones);

    let preguntas=[];
    console.log(prefijo);
    console.log(this.evaluacionAlimenticia[1][prefijo])
    for(let i = 1;i<this.evaluacionAlimenticia.length;i++)
    {
      preguntas.push(this.evaluacionAlimenticia[i][prefijo]);
    }
    let lista:Preguntas[] = [
      {
        "codigo": "PREG_1",
        "estado": preguntas[0],
        "descripcion": "¿La Niña Esta Recibiendo Lactancia Materna? (explorar) "
      },
      {
        "codigo": "PREG_2",
        "estado": preguntas[1],
        "descripcion": "¿La tecnica de LM es adecuada? (explorar y observar)"
      },
      {
        "codigo": "PREG_3",
        "estado": preguntas[2],
        "descripcion": "¿La frecuencia de LM es adecuada? (explorar y observar)"
      },
      {
        "codigo": "PREG_4",
        "estado": preguntas[3],
        "descripcion": "¿La niña o niño recibe leche no materna? (explorar)"
      },
      {
        "codigo": "PREG_5",
        "estado": preguntas[4],
        "descripcion": "¿La niña o niño recibe aguitas? (explorar)"
      },
      {
        "codigo": "PREG_6",
        "estado":preguntas[5],
        "descripcion": "La niña o niño recibe algun otro alimento? (explorar)"
      },
      {
        "codigo": "PREG_7",
        "estado": preguntas[6],
        "descripcion": "¿La consistencia de la preparacion es adecuada segun la edad?(explorar)"
      },
      {
        "codigo": "PREG_8",
        "estado": preguntas[7],
        "descripcion": "¿La cantidad de alimentos es adecuada segun edad? (explorar)"
      },
      {
        "codigo": "PREG_9",
        "estado": preguntas[8],
        "descripcion": "¿La frecuencia de la alimentacion es adecuada segun la edad? (explorar)"
      },
      {
        "codigo": "PREG_10",
        "estado": preguntas[9],
        "descripcion": "¿Consume alimentos de origen animal? (explorar)"
      },
      {
        "codigo": "PREG_11",
        "estado": preguntas[10],
        "descripcion": "¿Consume frutas y verduras? (explorar)"
      },
      {
        "codigo": "PREG_12",
        "estado": preguntas[11],
        "descripcion": "¿Añade aceite, mantequilla o margarina a la comida del niño?"
      },
      {
        "codigo": "PREG_13",
        "estado": preguntas[12],
        "descripcion": "¿La niña o niño recibe los alimentos en su propio plato?"
      },
      {
        "codigo": "PREG_14",
        "estado": preguntas[13],
        "descripcion": "¿Añade sal yodada a la comida familiar?"
      },
      {
        "codigo": "PREG_15",
        "estado": preguntas[14],
        "descripcion": "¿Es niño beneficiario de algun Programa de Apoyo Social? Si() No() Especificar"
      },
      {
        "codigo": "PREG_16",
        "estado": preguntas[15],
        "descripcion": "¿Cuantos sobres de micronutrientes consumio en el mes? Si() No() Especificar"
      },
      {
        "codigo": "OBS",
        "estado": preguntas[16],
        "descripcion": "Pregunta Adicional"
      }
    ];
    console.log("preguntas", preguntas);
    let cadena:EvaluacionAlimenticia= {
      fechaRegistro:this.convertirFecha(this.evaluacionAlimenticia[0][prefijo]),
      edad:this.edadEditable,
      listaPreguntas:lista,
    }
    console.log(cadena);
    let Aux:any[]=[];
    // console.log(this.Evaluaciones.length);
    for(let i=0;i<this.edadEditable;i++){
      Aux[i]=this.Evaluaciones[0][i];
      console.log(this.Evaluaciones[0][i]);
    }
    console.log(Aux);
    console.log("eliminando",Aux);
    Aux.push(cadena);
    console.log(Aux);
    this.evalAlimenService.updateEvaluacionAlimenticiaCred(this.nroDocRecuperado,Aux).subscribe((res: any) => {
      console.log('se edito correctamente ', res.object);
      console.log('se edito correctamente cade ', cadena);
      this.messageService.add({
        severity: "success",
        summary: "Exito",
        detail: "Se edito correctamente el registro de Evaluacion del mes: " + this.edadEditable
      });
    });

  }
  ObtenerUltimaEvaluacion(){
    console.log('entro editar', this.Evaluaciones);
    let prefijo = "";
    this.evalAlimenService.lastEvaluacionAlimenticiaCred(this.nroDocRecuperado).subscribe((res: any) => {
      if(res.object!=null || res.object!=undefined){
        console.log('recupero ultimo elemento ', res.object);
        this.edadEditable = res.object.edad;
        prefijo = this.obtenerTitulo(this.edadEditable);
        console.log(this.edadEditable);
      }
      else{
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "No hay datos registrados"
        });
      }
    });
  }
  eliminarEvaluacion(indice){
    console.log('entro eliminar', this.evaluacionAlimenticia);

    let prefijo = this.obtenerTitulo(indice);
    console.log(prefijo);
    console.log(this.evaluacionAlimenticia[1][prefijo])
    this.evaluacionAlimenticia[0][prefijo]="";
    for(let i = 1;i<this.evaluacionAlimenticia.length;i++)
    {
      this.evaluacionAlimenticia[i][prefijo]="";
    }
  }
}
