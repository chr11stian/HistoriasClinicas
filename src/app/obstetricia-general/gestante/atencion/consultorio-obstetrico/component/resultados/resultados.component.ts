import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultadosService} from "../../services/resultados/resultados.service";
import {MessageService} from "primeng/api";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
interface Employee {
    name: string;
    department: string;
    salary: number;}

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
    ABO = [
        {name: 'A', code: 'A'},
        {name: 'B', code: 'B'},
        {name: 'AB', code: 'AB'},
        {name: 'O', code: 'O'}
    ];
    PN = [
        {name: '+', code: '+'},
        {name: '-', code: '-'}
    ]
    normalAnormal = [
        {name: 'normal', code: 'normal'},
        {name: 'anormal', code: 'anormal'},
        {name: 'no se hizo', code: 'no se hizo'},
        {name: 'no aplica', code: 'no aplica'},
    ]
    positivoNegativo = [
        {name: 'positivo', code: 'positivo'},
        {name: 'negativo', code: 'negativo'},
        {name: 'no se hizo', code: 'no se hizo'},
        {name: 'no aplica', code: 'no aplica'},
    ]
    reactivoNoReactivo = [
        {name: 'reactivo', code: 'reactivo'},
        {name: 'no reactivo', code: 'no reactivo'},
        {name: 'no se hizo', code: 'no se hizo'},
        {name: 'no aplica', code: 'no aplica'},
    ]

    tipoDocRecuperado:string;
    nroDocRecuperado:string
    nroEmbarazo:string
    idConsultoriObstetrico:string;
    examenes = [
        { display:"Grupo Sanguineo",name: 'grupoSanguineo',code:1,tipoInput:1,codeDrop:this.ABO},
        { display:"Factor RH",name: 'factorRH',code:2,tipoInput:1,codeDrop:this.PN},
        { display:"Hemograma",name: 'hemograma',code:3,tipoInput:3},
        { display:"Hemoglobina",name: 'hemoglobina',code:4,tipoInput:2},
        { display:"Factor de Correccion",name: 'factorCorreccion',code:5,tipoInput:2},
        { display:"HTO",name: 'hto',code:6,tipoInput:3},
        { display:"Glucosa",name: 'glucosa',code:7,tipoInput:2},
        { display:"Tolerancia Glucosa",name: 'toleranciaGlucosa',code:8,tipoInput:1,codeDrop:this.normalAnormal},
        { display:"Examen de Orina",name: 'exaOrina',code:9,tipoInput:1,codeDrop:this.positivoNegativo},
        { display:"RPR",name: 'rpr',code:10,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        { display:"RPR Reactivo",name: 'rprReactivo',code:11,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        { display:"Examen Sec V",name: 'exSecV',code:12,tipoInput:1,codeDrop: this.normalAnormal},
        { display:"Protenuaria Cuantitativa",name: 'proteinuriaCuantitativa',code:13,tipoInput:1,codeDrop: this.normalAnormal},
        { display:"Protenuaria Cualitativa",name: 'proteinuriaCualitativa',code:14,tipoInput:1,codeDrop: this.normalAnormal},
        { display:"Prueva VIH",name: 'pruebaVIH',code:15,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        { display:"Prueba Hepatitis",name: 'prHepatitis',code:16,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        { display:"Elisa",name: 'elisa',code:17,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        { display:"Glicemia",name: 'glicemia',code:18,tipoInput:1,codeDrop: this.normalAnormal},
        { display:"Bacteriuria",name: 'bacteriuria',code:19,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"Nitritos",name: 'nitritos',code:20,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"Urocultivo",name: 'urocultivo',code:21,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"BK Esputo",name: 'bkEsputo',code:22,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"WS Term Blotkfi",name: 'wsternBlotlfi',code:23,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"TH lv1",name: 'thlv1',code:24,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"Toch",name: 'torch',code:25,tipoInput:1,codeDrop: this.positivoNegativo},
        { display:"Gota Gruesa",name: 'gotaGruesa',code:26,tipoInput:3},
        { display:"PAP",name: 'pap',code:27,tipoInput:1,codeDrop: this.normalAnormal},
        { display:"IVAA",name: 'ivaa',code:28,tipoInput:1,codeDrop: this.normalAnormal}
    ]
    displaySeleccionado='otros';
    pruebaSeleccionada=''
    opcionesInput=[]
    tipoInput1=0;
    seleccionar(itemSelected){
        this.tipoInput1=0;
        this.examenFG.setValue({resultado: '', fechaExamen: ''});
        console.log(this.examenFG.value)
        this.tipoInput1=itemSelected.value.tipoInput;
        this.pruebaSeleccionada=itemSelected.value.name
        this.displaySeleccionado=itemSelected.value.display;
        console.log(this.displaySeleccionado,this.pruebaSeleccionada)
        if(this.tipoInput1==1){
            this.opcionesInput=itemSelected.value.codeDrop;
        }
    }
    resultadoEcografiaFG: FormGroup;
    examenFG:FormGroup
    isUpdate: boolean = false;
    index=0;

    constructor(private resultadosService: ResultadosService,
                private messageService: MessageService,
                private obstetriciaGeneralService:ObstetriciaGeneralService ) {
        this.buildForm();
    }

    buildForm() {
        this.examenFG=new FormGroup({
            resultado:new FormControl('',[Validators.required]),
            fechaExamen:new FormControl('',[Validators.required])
        })
        this.resultadoEcografiaFG = new FormGroup({
            fechaEcografia1: new FormControl('', [Validators.required]),
            resultado1: new FormControl('', [Validators.required]),
            semana1: new FormControl('', [Validators.required,,Validators.min(1),Validators.max(40)]),
            dia1: new FormControl('', [Validators.required,Validators.min(1),Validators.max(7)]),
        })
    }
    ngOnInit(): void {
        this.examenFG.get('fechaExamen').setValue(new Date());
        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.idConsultoriObstetrico = this.obstetriciaGeneralService.idConsultoriObstetrico;
        this.getResultados();
    }


    getFC(control: string): AbstractControl {
        return this.resultadoEcografiaFG.get(control);
    }

    getFecha(date: Date) {
        if (date.toString() !== '') {
            let hora = date.toLocaleTimeString();
            let aux='';
            let dd = date.getDate();
            if(dd<10) {
                aux=''+dd
            }
            let mm = date.getMonth() + 1; //January is 0!
            let yyyy = date.getFullYear();
            return yyyy + '-' + mm + '-' + aux;
        } else {
            return '';
        }
    }
    getFechaHora(date: Date) {
        if (date.toString() !== '') {
            let hora = date.toLocaleTimeString();
            let aux='';
            let dd = date.getDate();
            if(dd<10) {
                aux=''+dd
            }
            let mm = date.getMonth() + 1;
            let yyyy = date.getFullYear();
            return yyyy + '-' + mm + '-' + aux + ' ' + hora
        } else {
            return '';
        }
    }
    resultadosList=[];
    recuperarData(data){
        let examen
        for (const key in data) {
            if(data[key]!=null && data[key]['valor']!="" && data[key]['valor']!=null && data[key]['fecha']!=null){
            const found = this.examenes.find(element => element.name  == key);
            this.resultadosList.push({display:found.display,prueba:key,valor:data[key]['valor'],fecha:data[key]['fecha']})
            }
        }
        // console.log('lista:',this.resultadosList)
    }

    getResultados() {
        const input = {
            "nroHcl": this.nroDocRecuperado,
            "nroEmbarazo": 1,
            "nroAtencion": 1
        }
        this.resultadosService.getResultado(input).subscribe((resp) => {
            if(resp['cod']='2401'){
                if (resp['object'][0]['laboratorios']!=null) {
                    this.isUpdate = true;
                    const resultado = resp['object'][0]
                    this.recuperarData(resultado['laboratorios']);
                    if(resultado.ecografia.fecha!=null){
                    this.getFC('fechaEcografia1').setValue(new Date(resultado.ecografia.fecha));
                    }
                    this.getFC('resultado1').setValue(resultado.ecografia.observaciones);
                    this.getFC('semana1').setValue(resultado.ecografia.semanas);
                    this.getFC('dia1').setValue(resultado.ecografia.dias);
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Recuperado',
                        detail: 'registro recuperado satisfactoriamente'
                    });
                } else {
                    this.isUpdate = false;
                    this.messageService.add({severity: 'success', summary: 'Ingresar', detail: 'Registro vacio'});
                }
                }
        })
    }
    desabilitado=true;
    updateIndex=0;
     guardarExamen(){
        let input={
            display:this.displaySeleccionado,
            prueba:this.pruebaSeleccionada,
            valor:this.examenFG.get('resultado').value,
            fecha:this.getFecha(this.examenFG.get('fechaExamen').value)
        }
        if (this.isUpdate){
            this.resultadosList.splice(this.updateIndex,1,input)
        }
        else{
            this.resultadosList.push(input);
        }
        this.tipoInput1=0;
        this.desabilitado=true;
        this.isUpdate=false;

    }
    generarCadena(){
        let cadena='';
        this.resultadosList.forEach((examen)=>{
            cadena+=`"${examen.prueba}":{"valor":"${examen.valor}","fecha":"${examen.fecha}"},`
                // examen.prueba+":{valor:'"+examen.valor+"',fecha:'"+examen.fecha+"'},
        })
        const nueva=cadena.slice(0,cadena.length-1);
        return `{${nueva}}`
    }
    agregar() {
        // console.log('hola desde agregar')
        const input = {
            nroHcl: this.nroDocRecuperado,
            nroAtencion: 1,
            nroControlSis: 1,
            nroEmbarazo: this.nroEmbarazo,
            tipoDoc: this.tipoDocRecuperado,
            nroDoc: this.nroDocRecuperado,
            laboratorios:JSON.parse(this.generarCadena()),
            ecografia: {
                fecha: this.getFechaHora(this.getFC("fechaEcografia1").value),
                // descripcion: this.getFC('resultado1').value,
                observaciones: this.getFC('resultado1').value,
                semanas: this.getFC('semana1').value,
                dias: this.getFC('dia1').value
            },
        }
        this.resultadosService.addresultado(input).subscribe((resp) => {

            console.log('--->',resp)
                this.messageService.add({severity:'success', summary:'Exito', detail:'Resultados agregados satisfactoriamente'});
            },
            (error)=>{
                console.log('->>>',error)
            }
        )
    }
    deleteExamen(index){
        this.resultadosList.splice(index,1)
    }
    examenSelect={};
    actualizarExamen(index,rowData){
        this.updateIndex=index;
        // console.log(rowData)
        const prueba=rowData['prueba'];
        const found = this.examenes.find(element => element.name  == prueba);
        // console.log('foound 1',found)
        this.examenSelect=found
        this.examenFG.get('resultado').reset();
        this.examenFG.get('fechaExamen').reset();
        console.log('estadofg',this.examenFG)
        this.pruebaSeleccionada=found.name
        this.displaySeleccionado=found.display;
        this.tipoInput1=found.tipoInput;
        this.examenFG.get('fechaExamen').setValue(new Date(rowData['fecha']));
        if(this.tipoInput1==1){
            this.opcionesInput=[]
            this.opcionesInput=found.codeDrop;
            const found2=found.codeDrop.find(element=>element.name==rowData['valor'])
            this.examenFG.get('resultado').setValue(found2['code']);
        }
        else{
            this.examenFG.get('resultado').setValue(rowData['valor'])
        }
    }
}
