import { Component, OnInit } from '@angular/core';
import {Product, FechaEvaluacionAlimentacion, EvaluacionAlimenticia, Preguntas} from '../models/EvaluacionAlimentacion';
import { EvalAlimenService } from '../service/eval-alimen.service';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  tipoDocRecuperado:string="";
  nroDocRecuperado:string="";
  products1: Product[];
  evaluacionAlimenticia: FechaEvaluacionAlimentacion[]=[];
  Evaluaciones:EvaluacionAlimenticia[]=[];
  Preguntas:Preguntas;
  ArrayEvaluaciones:EvaluacionAlimenticia;
  datePipe=new DatePipe('en-US');
  edadEditable:number =0;
  sino = [
    { label: 'SI', value: true },
    { label: 'NO', value: false }
  ];
  constructor(private evalAlimenService: EvalAlimenService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService){ }

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
              "titulo": "Diagnóstico",
              "valorRN":"",  "valor1M": "",   "valor2M": "","valor3M": "", "valor4M": "","valor5M": "", "valor6M": "", "valor7M": "",
              "valor8M": "", "valor9M": "", "valor10M": "" , "valor11M": "", "valor12M": "", "valor14M": "", "valor16M": "", "valor18M": "", "valor20M": "", "valor22M": "",
              "valor24M": "", "valor30M": "", "valor33M":"", "valor36M": "", "valor39M": "", "valor42M": ""
          }
      ]
      this.ObtenerUltimaEvaluacion();
      this.recuperarDataEvaluacionAlimenticiaBD();
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
                this.evaluacionAlimenticia[18].valorRN = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valorRN = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 1) {
                console.log(this.evaluacionAlimenticia[0]);
                this.evaluacionAlimenticia[0].valor1M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor1M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor1M = aux[i].listaPreguntas[x].estado;
                    x++;
                }

            }
            if(aux[i].edad == 2) {
                this.evaluacionAlimenticia[0].valor2M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor2M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor2M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 3) {
                this.evaluacionAlimenticia[0].valor3M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor3M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor3M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 4) {
                this.evaluacionAlimenticia[0].valor4M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor4M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor4M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 5) {
                this.evaluacionAlimenticia[0].valor5M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor5M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor5M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 6) {
                this.evaluacionAlimenticia[0].valor6M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor6M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor6M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 7) {
                this.evaluacionAlimenticia[0].valor7M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor7M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor7M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            } if(aux[i].edad == 8) {
                this.evaluacionAlimenticia[0].valor8M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor8M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor8M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 9) {
                this.evaluacionAlimenticia[0].valor9M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor9M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor9M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 10) {
                this.evaluacionAlimenticia[0].valor10M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor10M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor10M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 11) {
                this.evaluacionAlimenticia[0].valor11M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor11M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor11M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 12) {
                this.evaluacionAlimenticia[0].valor12M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor12M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor12M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 14) {
                this.evaluacionAlimenticia[0].valor14M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor14M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor14M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 16) {
                this.evaluacionAlimenticia[0].valor16M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor16M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor16M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 18) {
                this.evaluacionAlimenticia[0].valor18M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor18M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor18M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            } if(aux[i].edad == 20) {
                this.evaluacionAlimenticia[0].valor20M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor20M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor20M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 22) {
                this.evaluacionAlimenticia[0].valor22M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor22M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor22M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 24) {
                this.evaluacionAlimenticia[0].valor24M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor24M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor24M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 30) {
                this.evaluacionAlimenticia[0].valor30M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor30M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor30M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 33) {
                this.evaluacionAlimenticia[0].valor33M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor33M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor33M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 36) {
                this.evaluacionAlimenticia[0].valor36M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor36M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor36M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            }
            if(aux[i].edad == 39) {
                this.evaluacionAlimenticia[0].valor39M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor39M = aux[i].diagnostico;
                let x  = 0;
                while(aux[i].listaPreguntas[x]!=undefined){
                    this.evaluacionAlimenticia[x+1].valor39M = aux[i].listaPreguntas[x].estado;
                    x++;
                }
            } if(aux[i].edad == 42) {
                this.evaluacionAlimenticia[0].valor42M = aux[i].fechaRegistro;
                this.evaluacionAlimenticia[18].valor42M = aux[i].diagnostico;
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
  convertirFecha(fecha){
      const fecha2 = fecha.replace("T"," ");
      return fecha2+":00";
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
                 this.messageService.add({
                     severity: "success",
                     summary: "Exito",
                     detail: "Se recupero la última atención"
                 });
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

}

