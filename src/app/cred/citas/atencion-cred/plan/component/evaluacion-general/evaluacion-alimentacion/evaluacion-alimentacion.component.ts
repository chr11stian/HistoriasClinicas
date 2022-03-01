import {Component, OnInit} from '@angular/core';
import {Product, FechaEvaluacionAlimentacion, EvaluacionAlimenticia, Preguntas} from '../models/EvaluacionAlimentacion';
import {EvalAlimenService} from '../service/eval-alimen.service';
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {dato} from "../../../../../models/data";

@Component({
    selector: 'app-evaluacion-alimentacion',
    templateUrl: './evaluacion-alimentacion.component.html',
    styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
    tipoDocRecuperado: string = "";
    nroDocRecuperado: string = "";
    evaluacionAlimenticia: FechaEvaluacionAlimentacion[] = [];
    Evaluaciones: EvaluacionAlimenticia[] = [];
    Preguntas: Preguntas;
    ArrayEvaluaciones: EvaluacionAlimenticia;
    attributeLocalS = 'documento';
    datePipe = new DatePipe('en-US');
    data:dato;
    edadEditable: number = 0;
    sino = [
        {label: 'SI', value: true},
        {label: 'NO', value: false}
    ];
    listaTitulosPreguntas:TipoPregunta[]=[];

    constructor(private evalAlimenService: EvalAlimenService,
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
        console.log(this.evaluacionAlimenticia);
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.ObtenerUltimaEvaluacion();
        // this.recuperarDataEvaluacionAlimenticiaBD();
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
    recuperarDataEvaluacionAlimenticiaBD() {
        this.evalAlimenService.getEvaluacionAlimenticiaCred(this.data.nroDocumento).subscribe((res: any) => {
            this.Evaluaciones.push(res.object);

            let aux = this.Evaluaciones[0];
            let i = 0
            while (aux[i] != undefined) {
                console.log("entrando i", i);
                if (aux[i].edad == 0) {
                    this.evaluacionAlimenticia[0].valorRN = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valorRN = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valorRN = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 1) {
                    console.log(this.evaluacionAlimenticia[0]);
                    this.evaluacionAlimenticia[0].valor1M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor1M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor1M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }

                }
                if (aux[i].edad == 2) {
                    this.evaluacionAlimenticia[0].valor2M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor2M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor2M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 3) {
                    this.evaluacionAlimenticia[0].valor3M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor3M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor3M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 4) {
                    this.evaluacionAlimenticia[0].valor4M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor4M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor4M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 5) {
                    this.evaluacionAlimenticia[0].valor5M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor5M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor5M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 6) {
                    this.evaluacionAlimenticia[0].valor6M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor6M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor6M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 7) {
                    this.evaluacionAlimenticia[0].valor7M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor7M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor7M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 8) {
                    this.evaluacionAlimenticia[0].valor8M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor8M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor8M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 9) {
                    this.evaluacionAlimenticia[0].valor9M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor9M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor9M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 10) {
                    this.evaluacionAlimenticia[0].valor10M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor10M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor10M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 11) {
                    this.evaluacionAlimenticia[0].valor11M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor11M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor11M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 12) {
                    this.evaluacionAlimenticia[0].valor12M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor12M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor12M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 14) {
                    this.evaluacionAlimenticia[0].valor14M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor14M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor14M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 16) {
                    this.evaluacionAlimenticia[0].valor16M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor16M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor16M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 18) {
                    this.evaluacionAlimenticia[0].valor18M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor18M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor18M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 20) {
                    this.evaluacionAlimenticia[0].valor20M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor20M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor20M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 22) {
                    this.evaluacionAlimenticia[0].valor22M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor22M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor22M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 24) {
                    this.evaluacionAlimenticia[0].valor24M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor24M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor24M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 30) {
                    this.evaluacionAlimenticia[0].valor30M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor30M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor30M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 33) {
                    this.evaluacionAlimenticia[0].valor33M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor33M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor33M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 36) {
                    this.evaluacionAlimenticia[0].valor36M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor36M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor36M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 39) {
                    this.evaluacionAlimenticia[0].valor39M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor39M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor39M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                if (aux[i].edad == 42) {
                    this.evaluacionAlimenticia[0].valor42M = aux[i].fechaRegistro;
                    this.evaluacionAlimenticia[18].valor42M = aux[i].diagnostico;
                    let x = 0;
                    while (aux[i].listaPreguntas[x] != undefined) {
                        this.evaluacionAlimenticia[x + 1].valor42M = aux[i].listaPreguntas[x].estado;
                        x++;
                    }
                }
                i++;
            }

        });
    }
    obtenerTitulo(indice): string {
        if (indice == 0) {
            return "valorRN"
        } else {
            return "valor" + indice + "M"
        }
    }
    ObtenerUltimaEvaluacion() {
        console.log('entro editar', this.Evaluaciones);
        let prefijo = "";
        this.evalAlimenService.lastEvaluacionAlimenticiaCred(this.data.nroDocumento).subscribe((res: any) => {
            if (res.object != null || res.object != undefined) {
                this.recuperarDataEvaluacionAlimenticiaBD();
                console.log('recupero ultimo elemento ', res.object);
                this.edadEditable = res.object.edad;
                prefijo = this.obtenerTitulo(this.edadEditable);
                console.log(this.edadEditable);
                this.messageService.add({
                    severity: "success",
                    summary: "Exito",
                    detail: "Se recupero las evaluaciones regsitradas en todas las consultas"
                });
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: "No hay datos registrados en consultas"
                });
            }


        });

    }

}
export interface TipoPregunta{
    codigo?:string,
    titulo?:string
}
