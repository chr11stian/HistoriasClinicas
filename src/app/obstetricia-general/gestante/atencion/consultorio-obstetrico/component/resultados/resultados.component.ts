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
        {name: 'grupoSanguineo',code:1,tipoInput:1,codeDrop:this.ABO},
        {name: 'factorRH',code:2,tipoInput:1,codeDrop:this.PN},
        {name: 'hemograma',code:3,tipoInput:3},
        {name: 'hemoglobina',code:4,tipoInput:2},
        {name: 'factorCorreccion',code:5,tipoInput:2},
        {name: 'hto',code:6,tipoInput:3},
        {name: 'glucosa',code:7,tipoInput:2},
        {name: 'toleranciaGlucosa',code:8,tipoInput:1,codeDrop:this.normalAnormal},
        {name: 'exaOrina',code:9,tipoInput:1,codeDrop:this.positivoNegativo},
        {name: 'rpr',code:10,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        {name: 'rprReactivo',code:11,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        {name: 'exSecV',code:12,tipoInput:1,codeDrop: this.normalAnormal},
        {name: 'proteinuriaCuantitativa',code:13,tipoInput:1,codeDrop: this.normalAnormal},
        {name: 'proteinuriaCualitativa',code:14,tipoInput:1,codeDrop: this.normalAnormal},
        {name: 'pruebaVIH',code:15,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        {name: 'prHepatitis',code:16,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        {name: 'elisa',code:17,tipoInput:1,codeDrop: this.reactivoNoReactivo},
        {name: 'glicemia',code:18,tipoInput:1,codeDrop: this.normalAnormal},
        {name: 'bacteriuria',code:19,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'nitritos',code:20,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'urocultivo',code:21,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'bkEsputo',code:22,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'wsternBlotlfi',code:23,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'thlv1',code:24,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'torch',code:25,tipoInput:1,codeDrop: this.positivoNegativo},
        {name: 'gotaGruesa',code:26,tipoInput:3},
        {name: 'pap',code:27,tipoInput:1,codeDrop: this.normalAnormal},
        {name: 'ivaa',code:28,tipoInput:1,codeDrop: this.normalAnormal}
    ]
    examenSeleccionado='otros';
    opcionesInput=[]
    tituloInput=''
    tipoInput1=0;
    seleccionar(itemSelected){
        this.tipoInput1=0;
        this.examenFG.setValue({resultado: '', fechaExamen: ''});
        console.log(this.examenFG.value)
        this.tipoInput1=itemSelected.value.tipoInput;
        // this.examenSeleccionado=itemSelected.value.code
        this.tituloInput=itemSelected.value.name;
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
            semana1: new FormControl('', [Validators.required]),
            dia1: new FormControl('', [Validators.required]),
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
            let dd = date.getDate();
            let mm = date.getMonth() + 1; //January is 0!
            let yyyy = date.getFullYear();
            return yyyy + '-' + mm + '-' + dd;
        } else {
            return '';
        }
    }
    getFechaHora(date: Date) {
        if (date.toString() !== '') {
            let hora = date.toLocaleTimeString();
            let dd = date.getDate();
            let mm = date.getMonth() + 1; //January is 0!
            let yyyy = date.getFullYear();
            return yyyy + '-' + mm + '-' + dd + ' ' + hora
        } else {
            return '';
        }
    }
    resultadosList=[];
    recuperarData(data){
        let examen
        for (const key in data) {
            if(data[key]!=null && data[key]['valor']!="" && data[key]['valor']!=null && data[key]['fecha']!=null){
            this.resultadosList.push({prueba:key,valor:data[key]['valor'],fecha:data[key]['fecha']})
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
                    this.getFC('fechaEcografia1').setValue(new Date(resultado.ecografia.fecha));
                    this.getFC('resultado1').setValue(resultado.ecografia.descripcion);
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
            prueba:this.tituloInput,
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
                descripcion: this.getFC('resultado1').value,
                semanas: this.getFC('semana1').value,
                dias: this.getFC('dia1').value
            },
        }
        this.resultadosService.addresultado(input).subscribe((resp) => {
            console.log('--->',resp)
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
        this.examenSeleccionado=found.name
        this.tituloInput=found.name;
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
