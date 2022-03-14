import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";
import {dato} from "../../../../models/data";

@Component({
    selector: 'app-diagnostico-consulta',
    templateUrl: './diagnostico-consulta.component.html',
    styleUrls: ['./diagnostico-consulta.component.css'],
    providers: [DialogService]
})

export class DiagnosticoConsultaComponent implements OnInit {


    form: FormGroup
    diagnosticoDialog: boolean;
    opcionBusqueda: string;
    formDiag: FormGroup;
    data: any[] = [];
    diagnosticoNosologico: diagnosticoNosologicoInterface[] = [];
    Cie10: any;
    hayError: boolean = false;
    isUpdate: boolean = false;

    resultadosTestEvaluaciones:Resumen[]=[];
    // tablaResumenDx:resumenDiagnosticosPrevios[]=[];

    tablaResumenDx:resultados[]=[];

    attributeLocalS = 'documento'
    dataConsulta:dato;
    id: string = "";

    diagnostico: diagnosticoInterface
    formG: FormGroup;




    constructor(private DiagnosticoService: DiagnosticoConsultaService,
                private cieService: CieService,
                private formBuilder: FormBuilder) {
        this.buildForm();
        this.dataConsulta = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));

    }

    ngOnInit(): void {
        this.recuperarResumenDxBDLaboratorio();
        this.recuperarResumenDxBDInmunizaciones();
        this.recuperarResumenDxBDTamizajes();
        this.recuperarResumenDxBDEvaluaciones();

    }

    buildForm() {
        // this.id = localStorage.getItem(this.attributeLocalS);
        this.form = this.formBuilder.group({
            diagnostico: ['', [Validators.required]],
        });


    }

    /* funciones de tabla resultados evaluaciones - test - tamizajes*/
    // recuperarResumenDxBD(){
    //     this.DiagnosticoService.getResultadosResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
    //         //-- recupera informacion de diagnostico
    //        console.log(r.object);
    //        console.log(r.object[0].tamizajes.resultadoAuditivo.valor);
    //        console.log(r.object[0].tamizajes.resultadoVisual.valor);
    //        console.log(r.object[0].tamizajes.resultadoVIF.valor);
    //        this.tablaResumenDx = r.object;
    //        let aux1 = {
    //            evaluacion:'EVALUACION ALIMENTICIA',
    //            resultado:this.tablaResumenDx[0].evaluacioAlimentacion,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux1)
    //        let aux2 = {
    //            evaluacion:'TAMIZAJE AUDITIVO',
    //            resultado:this.tablaResumenDx[0].tamizajes.resultadoAuditivo.valor,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux2)
    //        let aux3 = {
    //            evaluacion:'TAMIZAJE VISUAL',
    //            resultado:this.tablaResumenDx[0].tamizajes.resultadoVisual.valor,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux3)
    //        let aux4 = {
    //            evaluacion:'TAMIZAJE VIF',
    //            resultado:this.tablaResumenDx[0].tamizajes.resultadoVIF.valor,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux4)
    //        let aux5 = {
    //             evaluacion:'TEST PERUANO',
    //             resultado:this.tablaResumenDx[0].testPeruano,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux5)
    //        let aux6 = {
    //            evaluacion:'TEST EEDP',
    //            resultado:this.tablaResumenDx[0].testEEDP,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux6)
    //        let aux7 = {
    //            evaluacion:'TEST PAUTA BREVE',
    //            resultado:this.tablaResumenDx[0].testPautaBreve,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux7)
    //        let aux8 = {
    //             evaluacion:'TEST TEPSI',
    //             resultado:this.tablaResumenDx[0].testTepsi,
    //        }
    //        this.resultadosTestEvaluaciones.push(aux8)
    //        console.log(this.resultadosTestEvaluaciones);
    //     })
    //
    // }

    recuperarResumenDxBDLaboratorio(){
        this.DiagnosticoService.getLaboratorioResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
            //-- recupera laboratorios resumen
           if(r.object!=null || r.object!=[]){
               for(let i =0 ;i<r.object.length;i++){
                  if(r.object[i].hemoglobina) {
                      let aux = {
                          nombre:'LABORATORIO',
                          evaluacion: 'HEMOGLOBINA',
                          resultado:r.object[i].hemoglobina
                      }
                      this.tablaResumenDx.push(aux);
                  }
               }
           }

        })
    }

    recuperarResumenDxBDInmunizaciones(){
        this.DiagnosticoService.getInmunizacionesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if(r.object!=null || r.object!=[]){
                for(let i =0 ;i<r.object.length;i++){
                    let aux = {
                        nombre:'INMUNIZACIONES',
                        evaluacion: r.object[i].nombre + "- Dosis:"+r.object[i].dosis + "- Tipo Dosis:"+ r.object[i].tipoDosis,
                        resultado:" "
                    }
                    this.tablaResumenDx.push(aux);

                }
            }
        })
    }

    recuperarResumenDxBDTamizajes(){
        this.DiagnosticoService.getTamizajesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if(r.object!=null || r.object!=[]){
                for(let i =0 ;i<r.object.length;i++){
                    let aux = {
                        nombre:'TAMIZAJES',
                        evaluacion:'TAMIZAJE AUDITIVO',
                        resultado:  r.object[i].resultadoAuditivo.valor
                    }
                    this.tablaResumenDx.push(aux);
                    let aux1 = {
                        nombre:'TAMIZAJES',
                        evaluacion:'TAMIZAJE VIF',
                        resultado:  r.object[i].resultadoVIF.valor
                    }
                    this.tablaResumenDx.push(aux1);
                    let aux2 = {
                        nombre:'TAMIZAJES',
                        evaluacion: 'TAMIZAJE VISUAL',
                        resultado:  r.object[i].resultadoVisual.valor
                    }
                    this.tablaResumenDx.push(aux2);
                }
            }
        })
    }

    recuperarResumenDxBDEvaluaciones(){
        this.DiagnosticoService.getEvaluacionesResumen(this.dataConsulta.idConsulta).subscribe((r: any) => {
            //-- recupera laboratorios resumen
            if(r.object!=null || r.object!=[]){
                for(let i =0 ;i<r.object.length;i++){
                    if(r.object[i].evaluacioAlimentacion){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'EVALUACION DE ALIMENTACION',
                            resultado: r.object[i].evaluacioAlimentacion
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].testPeruano){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'TEST PERUANO',
                            resultado: r.object[i].testPeruano
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].testEEDP){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'TEST EDDP',
                            resultado: r.object[i].testEEDP
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].testTepsi){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'TEST TEPSI',
                            resultado: r.object[i].testTepsi
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].testPautaBreve){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'TEST PAUTA BREVE',
                            resultado: r.object[i].testPautaBreve
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].resultadoControlPE){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'CONTROL PESO - EDAD',
                            resultado: r.object[i].resultadoControlPE
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].resultadoControlTE){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'CONTROL TALLA - EDAD',
                            resultado: r.object[i].resultadoControlTE
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].resultadoControlPT){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'CONTROL PESO - TALLA',
                            resultado: r.object[i].resultadoControlPT
                        }
                        this.tablaResumenDx.push(aux);
                    }
                    if(r.object[i].resultadoControlPC){
                        let aux = {
                            nombre:'EVALUACIONES O TEST',
                            evaluacion: 'CONTROL PERIMETRO CEFÁLICO',
                            resultado: r.object[i].resultadoControlPC
                        }
                        this.tablaResumenDx.push(aux);
                    }

                }
            }
        })
    }


    /* funciones tabla diagnostico */
    openDiagnostico() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('diagnostico').setValue("");
        this.diagnosticoDialog = true;
    }

    filterDiagnostico(event) {
        console.log('event ', event.query);
        this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.Cie10 = res.object;
        })
    }

    eliminarDiagnostico(index) {
        this.diagnosticoNosologico.splice(index, 1)
    }

    saveDiagnostico(form: any) {
        this.isUpdate = false;
        this.data.push(form.value);
        console.log(this.data);
        this.diagnosticoNosologico.push({
            descripcionItem: this.data[this.data.length - 1]['diagnostico']['descripcionItem'],
            codigoItem: this.data[this.data.length - 1]['diagnostico']['codigoItem']
        });

        Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.diagnosticoDialog = false;
    }

    titulo() {
        if (this.isUpdate) return "EDITE DIAGNOSTICO";
        else return "INGRESAR UN DIAGNOSTICO";
    }

    cancelDiagnostico() {
        this.diagnosticoDialog = false;
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })

    }


    save() {
        Swal.fire({
            icon: 'warning',
            title: 'DIAGNOSTICOS...',
            text: 'GUARDADO',
            showConfirmButton: false,
            timer: 1000
        })
    }
}

interface diagnosticoInterface {
    diagnosticoNosologico: diagnosticoNosologicoInterface[],
    condicionDesarrolloPsicomotor: condicionDesarrolloPsicomotorInterface[],
    crecimientoestadoNutricional: crecimientoestadoNutricionalInteface,
    factoresCondicionales: string[],
    observacion: string,

}

interface crecimientoestadoNutricionalInteface {
    condicionCrecimiento: boolean
    riesgoNutricional: {
        p_e: string,
        t_e: string,
        p_t: string
    }
}

interface condicionDesarrolloPsicomotorInterface {
    tipoCondicion: string,
    descripcionCondicion: string
}

interface diagnosticoNosologicoInterface {
    codigoItem: string,
    descripcionItem: string
}
interface resumenDiagnosticosPrevios {
    evaluacioAlimentacion?:string,
    inmunizaciones?: any[],
    tamizajes?: tamizajes,
    testEEDP?:string,
    testPautaBreve?:string,
    testPeruano?:string,
    testTepsi?:string,
}
interface resultados{
    nombre?:string,
    evaluacion?:string,
    resultado?:string
}
interface tamizajes {
    resultadoVIF?:resultado,
    resultadoAuditivo?:resultado,
    resultadoVisual?:resultado,
}
interface resultado{
    clave?:string,
    valor?:string,
    descripcion?:string
}
interface Resumen{
    evaluacion?:string,
    resultado?:string
}
