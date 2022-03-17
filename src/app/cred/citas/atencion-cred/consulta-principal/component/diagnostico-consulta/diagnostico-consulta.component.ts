import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CieService} from "../../../../../../obstetricia-general/services/cie.service";
import {DiagnosticoConsultaService} from "../../services/diagnostico-consulta.service";
import { PrestacionService } from 'src/app/mantenimientos/services/prestacion/prestacion.service';
import {dato} from "../../../../models/data";
import { MessageService} from "primeng/api";

@Component({
    selector: 'app-diagnostico-consulta',
    templateUrl: './diagnostico-consulta.component.html',
    styleUrls: ['./diagnostico-consulta.component.css'],
    providers: [DialogService]
})

export class DiagnosticoConsultaComponent implements OnInit {

    tablaResumenDx:resultados[]=[];
    attributeLocalS = 'documento';
    dataConsulta:dato;
    id: string = "";

    formDiagnostico: FormGroup;
    diagnosticoDialog: boolean;
    diagnosticos: diagnosticoInterface[]=[];

    formProcedimiento:FormGroup;
    // procedimientoDialog:boolean;
    procedimientos: procedimiento[]=[];


    ListaPrestacion:any[]=[];
    listaDeCIEHIS: any[]=[];
    listaDeCIESIS: any[]=[];
    listaDeProcedimientos:any[]=[];
    tipoList:lista[]=[];
    descripcionItem: string;
    private hayDatos:boolean=false;

    constructor(private DiagnosticoService: DiagnosticoConsultaService,
                private PrestacionService: PrestacionService,
                private cieService: CieService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
        this.buildForm();
        this.dataConsulta = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.tipoList = [{ label: 'DEFINITIVO', value: 'D' },
            { label: 'PRESUNTIVO', value: 'P' },
            { label: 'REPETITIVO', value: 'R' },
        ];
    }

    ngOnInit(): void {
        this.recuperarResumenDxBDLaboratorio();
        this.recuperarResumenDxBDInmunizaciones();
        this.recuperarResumenDxBDTamizajes();
        this.recuperarResumenDxBDEvaluaciones();
        this.recuperarPrestaciones();
        this.recuperarDxBD();

    }

    buildForm() {
       this.formDiagnostico = this.formBuilder.group({
           buscarDxSIS:  new FormControl({value:'',disabled:false}),
           buscarDxHIS:  new FormControl({value:'',disabled:false}),
           tipoDiagnostico:  new FormControl({value:'',disabled:false}),
           prestacion: new FormControl({value:'',disabled:false}),
           nombreUPS: ['', [Validators.required]],
           diagnosticoSIS: new FormControl({value:'',disabled:false}),
           cie10SIS: new FormControl({value:'',disabled:false}),
           diagnosticoHIS: new FormControl({value:'',disabled:false},[Validators.required]),
           cie10HIS:  new FormControl({value:'',disabled:false},[Validators.required]),
           factorCondicional:  new FormControl({value:'',disabled:false}),
        });


    }
    /** Servicios para recuperar Resumen DX ***/
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


    /*** Servicio para recuperar Prestaciones ***/
    recuperarPrestaciones() {
        this.PrestacionService.getPrestacion().subscribe((res: any) => {
            this.ListaPrestacion = res.object;
            console.log("prestaciones:", this.ListaPrestacion);
        })
    }

    /****funciones para recuperar Dx y Procedimientos**/
    recuperarDxBD(){
        this.DiagnosticoService.getDiagnostico(this.dataConsulta.idConsulta).subscribe((res: any) => {
             console.log(res.cod);
                if(res!=null){
                    console.log(res.object);
                    this.hayDatos=true;
                    this.diagnosticos = res.object;
                }
                else{
                    this.diagnosticos = [];
                    Swal.fire({
                        icon: 'info',
                        title: 'INFORMACION',
                        text: 'Aún no hay registros guardados en Diagnósticos',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }

            },error => {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Ocurrio un error al recuperar datos registrados anteriormente en esta consulta.',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        );
    }
    /**Funciones de Diagnostico*/

    openDiagnostico() {
        this.diagnosticoDialog = true;
        // this.isUpdate = false;
        this.formDiagnostico.reset();
        this.formDiagnostico.get('nombreUPS').setValue("CRED");
        this.formDiagnostico.get('cie10HIS').setValue("");
        this.formDiagnostico.get('cie10SIS').setValue("");
        this.diagnosticoDialog = true;
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
            icon: 'success',
            title: 'DIAGNOSTICOS...',
            text: 'GUARDADO',
            showConfirmButton: false,
            timer: 1000
        })
    }
    /*** funciones Procedimientos****/
    onChangePrestacion() {
        let codigoPrestacion:any;

            codigoPrestacion=this.formDiagnostico.value.prestacion.codigo;

        this.formDiagnostico.patchValue({ diagnosticoSIS: ""})
        this.formDiagnostico.patchValue({ cie10SIS: ""})
        this.PrestacionService.getDiagnosticoPorCodigo(codigoPrestacion).subscribe((res: any) => {
            // this.listaDeCIE = res.object.diagnostico;
            console.log(res.object);
            if(res.object.denominacion=='ANIOS')
            {
                if(this.dataConsulta.anio>=res.object.edadMin && this.dataConsulta.anio<=res.object.edadMax){
                    this.listaDeCIEHIS = res.object.diagnostico.filter(element=>element.estado=='ACTIVADO');
                }
                else{
                    this.messageService.add({severity:'error', summary: 'warn', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
                }
            }
            if(res.object.denominacion=='MESES')
            {
                let meses = this.dataConsulta.anio*12 + this.dataConsulta.mes + this.dataConsulta.dia/30;
                if(meses>=res.object.edadMin && meses <=res.object.edadMax){
                    this.listaDeCIEHIS = res.object.diagnostico.filter(element=>element.estado=='ACTIVADO');
                }
                else{
                    this.messageService.add({severity:'error', summary: 'warn', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
                }

            }
            if(res.object.denominacion=='DIAS')
            {
                if(this.dataConsulta.anio==0 && this.dataConsulta.mes==0){
                    if(this.dataConsulta.dia>=res.object.edadMin && this.dataConsulta.dia<=res.object.edadMax){
                        this.listaDeCIEHIS = res.object.diagnostico.filter(element=>element.estado=='ACTIVADO');
                    }
                    else{
                        this.messageService.add({severity:'error', summary: 'warn', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
                    }
                }
                else{
                    this.messageService.add({severity:'error', summary: 'warn', detail:'No hay diagnosticos disponibles para la edad del niño(a) en esta Prestación.'});
                }
            }

        })
    }

    selectDxSIS() {
        console.log(this.formDiagnostico.value.buscarDxSIS);
        this.formDiagnostico.patchValue({ diagnosticoSIS: this.formDiagnostico.value.buscarDxSIS.diagnostico})
        this.formDiagnostico.patchValue({ cie10SIS: this.formDiagnostico.value.buscarDxSIS.cie10});
        this.formDiagnostico.patchValue({ buscarDxSIS: ""})

    }


    selectedDxHIS(event: any) {
        console.log('lista de cie ', this.listaDeCIEHIS);
        console.log('evento desde diagnos ', event);
        console.log('evento desde diagnos ', this.formDiagnostico.value.buscarDxHIS);
        this.formDiagnostico.patchValue({ diagnosticoHIS: event.descripcionItem});
        this.formDiagnostico.patchValue({ buscarDxHIS: ""})
        this.formDiagnostico.patchValue({ cie10HIS: event});

    }

    filterCIE10(event: any) {
        this.cieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.listaDeCIEHIS = res.object
        })
    }

    eliminarDiagnostico(rowIndex: any) {
        console.log("entrando a editar diagnosticos",rowIndex);
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar este registro?',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.diagnosticos.splice(rowIndex, 1)
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500
                    })
            }
        })
    }


    /***funciones para guardar datos****/
    getDatatoSaveDx(){
        console.log(this.formDiagnostico.value.nombreUPS)
        let aux = {
            nro:this.diagnosticos.length +1,
            diagnosticoHIS:this.formDiagnostico.value.diagnosticoHIS,
            cie10HIS:this.formDiagnostico.value.cie10HIS.codigoItem,
            diagnosticoSIS:this.formDiagnostico.value.diagnosticoSIS,
            cie10SIS:this.formDiagnostico.value.cie10SIS,
            tipo:this.formDiagnostico.value.tipoDiagnostico,
            codPrestacion:this.formDiagnostico.value.prestacion.codigo,
            nombreUPS:this.formDiagnostico.value.nombreUPS,
            factorCondicional: this.formDiagnostico.value.factorCondicional,
            nombreUPSaux:"CRED",
            patologiaMaterna:null
        }
        var duplicado :boolean = this.diagnosticos.some(element=>element.diagnosticoHIS==aux.diagnosticoHIS)
        console.log(duplicado)
        this.diagnosticoDialog = false;
        if(!duplicado){
            this.diagnosticos.push(aux);
        }
        else{
            this.messageService.add({severity:'error', summary: 'Cuidado!', detail:'Ya ingreso este diagnóstico, vuelva a intentar.'});
        }


    }


    SaveDiagnostico() {

        if(!this.hayDatos){
            this.DiagnosticoService.addDiagnostico(this.dataConsulta.idConsulta, this.diagnosticos).subscribe(
                (resp) => {
                    console.log(resp);
                    Swal.fire({
                        icon: 'success',
                        title: 'DIAGNOSTICOS...',
                        text: 'Guardado correctamente',
                        showConfirmButton: false,
                        timer: 1000
                    })
                },error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'DIAGNOSTICOS...',
                        text: 'Hubo un error, vuelva a intentarlo',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        }
        else{
            this.DiagnosticoService.updateDiagnostico(this.dataConsulta.idConsulta, this.diagnosticos).subscribe(
                (resp) => {
                    console.log(resp);
                    Swal.fire({
                        icon: 'success',
                        title: 'DIAGNOSTICOS...',
                        text: 'Actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1000
                    })
                },error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'DIAGNOSTICOS...',
                        text: 'Hubo un error, vuelva a intentarlo',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        }
    }
}

interface diagnosticoInterface {
    nro?:number,
    diagnosticoHIS?:string,
    cie10HIS?:string,
    diagnosticoSIS?:string,
    cie10SIS?:string,
    tipo?:string,
    codPrestacion?:string,
    nombreUPS?:string,
    factorCondicional?:string
}

interface procedimiento {
    procedimientoHIS?:string,
    codProcedimientoHIS?:string,
    codProcedimientoSIS?:string,
    procedimientoSIS?:string,
    cie10SIS?:string,
    codPrestacion?:string

}

interface resultados{
    nombre?:string,
    evaluacion?:string,
    resultado?:string
}
interface lista{
    label?:string,
    value?:string,

}