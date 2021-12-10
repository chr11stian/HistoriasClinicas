import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultadosService} from "../../services/resultados/resultados.service";
import {MessageService} from "primeng/api";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
    tipoDocRecuperado:string;
    nroDocRecuperado:string
    nroEmbarazo:string
    idConsultoriObstetrico:string;

    examenSeleccionado='otros';
    examenes = [
        {name: 'grupoSanguineo',code:1},
        {name: 'factorRH',code:2},
        {name: 'hemograma',code:3},
        {name: 'hemoglobina',code:4},
        {name: 'factorCorreccion',code:5},
        {name: 'hto',code:6},
        {name: 'glucosa',code:7},
        {name: 'toleranciaGlucosa',code:8},
        {name: 'exaOrina',code:9},
        {name: 'rpr',code:10},
        {name: 'rprReactivo',code:11},
        {name: 'exSecV',code:12},
        {name: 'proteinuriaCuantitativa',code:13},
        {name: 'proteinuriaCualitativa',code:14},
        {name: 'pruebaVIH',code:15},
        {name: 'prHepatitis',code:16},
        {name: 'elisa',code:17},
        {name: 'glicemia',code:18},
        {name: 'bacteriuria',code:19},
        {name: 'nitritos',code:20},
        {name: 'urocultivo',code:21},
        {name: 'bkEsputo',code:22},
        {name: 'wsternBlotlfi',code:23},
        {name: 'thlv1',code:24},
        {name: 'torch',code:25},
        {name: 'gotaGruesa',code:26},
        {name: 'pap',code:27},
        {name: 'ivaa',code:28}
    ]
    seleccionar(valor){
        this.examenSeleccionado=valor.value.code
        console.log(this.examenSeleccionado)
    }
    resultadoEcografiaFG: FormGroup;
    isUpdate: boolean = false;
    grupoSanguineo = [
        {name: 'A', code: 'A'},
        {name: 'B', code: 'B'},
        {name: 'AB', code: 'AB'},
        {name: 'O', code: 'O'}
    ];
    factorRH = [
        {name: '+', code: '+'},
        {name: '-', code: '-'}
    ]
    toleranciaGlucosa = [
        {name: 'normal', code: 'normal'},
        {name: 'anormal', code: 'anormal'},
        {name: 'no se hizo', code: 'no se hizo'},
        {name: 'no aplica', code: 'no aplica'},
    ]
    exaOrina = [
        {name: 'negativo', code: 'negativo'},
        {name: 'positivo', code: 'positivo'},
        {name: 'no se hizo', code: 'no se hizo'},
        {name: 'no aplica', code: 'no aplica'},
    ]
    rpr = [
        {name: 'reactivo', code: 'reactivo'},
        {name: 'no reactivo', code: 'no reactivo'},
        {name: 'no se hizo', code: 'no se hizo'},
        {name: 'no aplica', code: 'no aplica'},
    ]

    constructor(private resultadosService: ResultadosService,
                private messageService: MessageService,
                private obstetriciaGeneralService:ObstetriciaGeneralService ) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.idConsultoriObstetrico = this.obstetriciaGeneralService.idConsultoriObstetrico;
        // console.log(this.tipoDocRecuperado,this.nroDocRecuperado,this.nroEmbarazo,this.idConsultoriObstetrico)
        this.getResultados();
    }

    buildForm() {
        this.resultadoEcografiaFG = new FormGroup({
            grupoSanguineo: new FormControl('', [Validators.required]),
            fecha1: new FormControl('', [Validators.required]),
            factorRH: new FormControl('', [Validators.required]),
            fecha2: new FormControl('', [Validators.required]),
            hemograma: new FormControl('', [Validators.required]),
            fecha3: new FormControl('', [Validators.required]),
            hemoglobina: new FormControl('', [Validators.required]),
            fecha4: new FormControl('', [Validators.required]),
            factorCorrepcion: new FormControl('', [Validators.required]),
            fecha5: new FormControl('', [Validators.required]),
            hto: new FormControl('', [Validators.required]),
            fecha6: new FormControl('', [Validators.required]),
            glucosa: new FormControl('', [Validators.required]),
            fecha7: new FormControl('', [Validators.required]),
            toleranciaGlucosa: new FormControl('', [Validators.required]),
            fecha8: new FormControl('', [Validators.required]),
            exaOrina: new FormControl('', [Validators.required]),
            fecha9: new FormControl('', [Validators.required]),
            rpr: new FormControl('', [Validators.required]),
            fecha10: new FormControl('', [Validators.required]),
            rprReactivo: new FormControl('', [Validators.required]),
            fecha11: new FormControl('', [Validators.required]),
            exSecV: new FormControl('', [Validators.required]),
            fecha12: new FormControl('', [Validators.required]),
            protenuariaCuantitativa: new FormControl('', [Validators.required]),
            fecha13: new FormControl('', [Validators.required]),
            protenuariaCualitativa: new FormControl('', [Validators.required]),
            fecha14: new FormControl('', [Validators.required]),
            pruevaVIH: new FormControl('', [Validators.required]),
            fecha15: new FormControl('', [Validators.required]),
            pruHepatitis: new FormControl('', [Validators.required]),
            fecha16: new FormControl('', [Validators.required]),
            elisa: new FormControl('', [Validators.required]),
            fecha17: new FormControl('', [Validators.required]),
            glicemia: new FormControl('', [Validators.required]),
            fecha18: new FormControl('', [Validators.required]),
            bacteriuniria: new FormControl('', [Validators.required]),
            fecha19: new FormControl('', [Validators.required]),
            nitritos: new FormControl('', [Validators.required]),
            fecha20: new FormControl('', [Validators.required]),
            urocultivo: new FormControl('', [Validators.required]),
            fecha21: new FormControl('', [Validators.required]),
            bkEsputo: new FormControl('', [Validators.required]),
            fecha22: new FormControl('', [Validators.required]),
            wsternBlotlfi: new FormControl('', [Validators.required]),
            fecha23: new FormControl('', [Validators.required]),
            thlvl: new FormControl('', [Validators.required]),
            fecha24: new FormControl('', [Validators.required]),
            torch: new FormControl('', [Validators.required]),
            fecha25: new FormControl('', [Validators.required]),
            gotaGruesa: new FormControl('', [Validators.required]),
            fecha26: new FormControl('', [Validators.required]),
            pap: new FormControl('', [Validators.required]),
            fecha27: new FormControl('', [Validators.required]),
            ivaa: new FormControl('', [Validators.required]),
            fecha28: new FormControl('', [Validators.required]),

            fechaEcografia1: new FormControl('', [Validators.required]),
            resultado1: new FormControl('', [Validators.required]),
            semana1: new FormControl('', [Validators.required]),
            dia1: new FormControl('', [Validators.required]),
            // fechaEcografia2: new FormControl('', [Validators.required]),
            // resultado2: new FormControl('', [Validators.required]),
            // semana2: new FormControl('', [Validators.required]),
            // dia2: new FormControl('', [Validators.required]),
            // fechaEcografia3: new FormControl('', [Validators.required]),
            // resultado3: new FormControl('', [Validators.required]),
            // semana3: new FormControl('', [Validators.required]),
            // dia3: new FormControl('', [Validators.required]),

        })
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
            return yyyy + '-' + mm + '-' + dd + ' ' + hora
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
            // console.log("-->>",data.value)
        let examen
        for (const key in data) {
            examen=key
            if(examen!=null && data[key]['valor']!="" && data[key]['fecha']!=null){
            this.resultadosList.push({prueba:key,valor:data[key]['valor'],fecha:data[key]['fecha']})
            }
        }
        console.log('lista:',this.resultadosList)
    }
    getResultados() {
        const input = {
            // "nroHcl": this.nroDocRecuperado,
            "nroHcl": 10101013,
            // "nroEmbarazo": this.nroEmbarazo,
            "nroEmbarazo": 1,
            "nroAtencion": 1
        }
        this.resultadosService.getResultado(input).subscribe((resp) => {
            if (resp['object'] != null ) {
                this.isUpdate = true;
                const resultado = resp['object'][0]
                this.recuperarData(resultado['laboratorios']);
                console.log('resultado laboratorios->>>>',resultado['laboratorios'])
                this.getFC('grupoSanguineo').setValue(resultado.laboratorios.grupoSanguineo.valor);
                if(resultado.laboratorios.grupoSanguineo.fecha){
                this.getFC('fecha1').setValue(new Date(resultado.laboratorios.grupoSanguineo.fecha));
                }
                this.getFC('factorRH').setValue(resultado.laboratorios.factorRH.valor);
                if(resultado.laboratorios.factorRH.fecha!=null){
                this.getFC('fecha2').setValue(new Date(resultado.laboratorios.factorRH.fecha));
                }
                this.getFC('hemograma').setValue(resultado.laboratorios.hemograma.valor);
                if(resultado.laboratorios.hemograma.fecha!=null){
                this.getFC('fecha3').setValue(new Date(resultado.laboratorios.hemograma.fecha));
                }
                this.getFC('hemoglobina').setValue(resultado.laboratorios.hemoglobina.valor);
                if(resultado.laboratorios.hemoglobina.fecha!=null){
                this.getFC('fecha4').setValue(new Date(resultado.laboratorios.hemoglobina.fecha));
                }
                this.getFC('factorCorrepcion').setValue(resultado.laboratorios.factorCorreccion.valor);
                if(resultado.laboratorios.factorCorreccion.fecha){
                this.getFC('fecha5').setValue(new Date(resultado.laboratorios.factorCorreccion.fecha));
                }
                this.getFC('hto').setValue(resultado.laboratorios.hto.valor);
                if(resultado.laboratorios.hto.fecha!=null){
                this.getFC('fecha6').setValue(new Date(resultado.laboratorios.hto.fecha));
                }
                this.getFC('glucosa').setValue(resultado.laboratorios.glucosa.valor);
                if(resultado.laboratorios.glucosa.fecha!=null){
                this.getFC('fecha7').setValue(new Date(resultado.laboratorios.glucosa.fecha));
                }
                this.getFC('toleranciaGlucosa').setValue(resultado.laboratorios.toleranciaGlucosa.valor);
                if(resultado.laboratorios.toleranciaGlucosa.fecha!=null){
                this.getFC('fecha8').setValue(new Date(resultado.laboratorios.toleranciaGlucosa.fecha));
                }
                this.getFC('exaOrina').setValue(resultado.laboratorios.exaOrina.valor);
                if(resultado.laboratorios.exaOrina.fecha!=null){
                this.getFC('fecha9').setValue(new Date(resultado.laboratorios.exaOrina.fecha));
                }
                this.getFC('rpr').setValue(resultado.laboratorios.rpr.valor);
                if(resultado.laboratorios.rpr.fecha!=null){
                this.getFC('fecha10').setValue(new Date(resultado.laboratorios.rpr.fecha));
                }
                this.getFC('rprReactivo').setValue(resultado.laboratorios.rprReactivo.valor);
                if(resultado.laboratorios.rprReactivo.fecha!=null){
                this.getFC('fecha11').setValue(new Date(resultado.laboratorios.rprReactivo.fecha));
                }
                this.getFC('exSecV').setValue(resultado.laboratorios.exSecV.valor);
                if(resultado.laboratorios.exSecV.fecha!=null){
                this.getFC('fecha12').setValue(new Date(resultado.laboratorios.exSecV.fecha));
                }
                this.getFC('protenuariaCuantitativa').setValue(resultado.laboratorios.proteinuriaCuantitativa.valor);
                if(resultado.laboratorios.proteinuriaCuantitativa.fecha!=null){
                this.getFC('fecha13').setValue(new Date(resultado.laboratorios.proteinuriaCuantitativa.fecha));
                }
                this.getFC('protenuariaCualitativa').setValue(resultado.laboratorios.proteinuriaCualitativa.valor);
                if(resultado.laboratorios.proteinuriaCualitativa.fecha!=null){
                this.getFC('fecha14').setValue(new Date(resultado.laboratorios.proteinuriaCualitativa.fecha));
                }
                this.getFC('pruevaVIH').setValue(resultado.laboratorios.pruebaVIH.valor);
                if(resultado.laboratorios.pruebaVIH.fecha){
                this.getFC('fecha15').setValue(new Date(resultado.laboratorios.pruebaVIH.fecha));
                }
                this.getFC('pruHepatitis').setValue(resultado.laboratorios.prHepatitis.valor);
                if(resultado.laboratorios.prHepatitis.fecha!=null){
                this.getFC('fecha16').setValue(new Date(resultado.laboratorios.prHepatitis.fecha));
                }
                this.getFC('elisa').setValue(resultado.laboratorios.elisa.valor);
                if(resultado.laboratorios.elisa.fecha!=null){
                this.getFC('fecha17').setValue(new Date(resultado.laboratorios.elisa.fecha));
                }
                this.getFC('glicemia').setValue(resultado.laboratorios.glicemia.valor);
                if(resultado.laboratorios.glicemia.fecha!=null){
                this.getFC('fecha18').setValue(new Date(resultado.laboratorios.glicemia.fecha));
                }
                this.getFC('bacteriuniria').setValue(resultado.laboratorios.bacteriuria.valor);
                if(resultado.laboratorios.bacteriuria.fecha!=null){
                this.getFC('fecha19').setValue(new Date(resultado.laboratorios.bacteriuria.fecha));
                }
                this.getFC('nitritos').setValue(resultado.laboratorios.nitritos.valor);
                if(resultado.laboratorios.nitritos.fecha!=null){
                this.getFC('fecha20').setValue(new Date(resultado.laboratorios.nitritos.fecha));
                }
                this.getFC('urocultivo').setValue(resultado.laboratorios.urocultivo.valor);
                if(resultado.laboratorios.urocultivo.fecha){
                this.getFC('fecha21').setValue(new Date(resultado.laboratorios.urocultivo.fecha));
                }
                this.getFC('bkEsputo').setValue(resultado.laboratorios.bkEsputo.valor);
                if(resultado.laboratorios.bkEsputo.fecha){
                this.getFC('fecha22').setValue(new Date(resultado.laboratorios.bkEsputo.fecha));
                }
                this.getFC('wsternBlotlfi').setValue(resultado.laboratorios.wsternBlotlfi.valor);
                if(resultado.laboratorios.wsternBlotlfi.fecha){
                this.getFC('fecha23').setValue(new Date(resultado.laboratorios.wsternBlotlfi.fecha));
                }
                this.getFC('thlvl').setValue(resultado.laboratorios.thlv1.valor);
                if(resultado.laboratorios.thlv1.fecha){
                this.getFC('fecha24').setValue(new Date(resultado.laboratorios.thlv1.fecha));
                }
                this.getFC('torch').setValue(resultado.laboratorios.torch.valor);
                if(resultado.laboratorios.torch.fecha){
                this.getFC('fecha25').setValue(new Date(resultado.laboratorios.torch.fecha));
                }
                this.getFC('gotaGruesa').setValue(resultado.laboratorios.gotaGruesa.valor);
                if(resultado.laboratorios.gotaGruesa.fecha!=null){
                this.getFC('fecha26').setValue(new Date(resultado.laboratorios.gotaGruesa.fecha));
                }
                this.getFC('pap').setValue(resultado.laboratorios.pap.valor);
                if(resultado.laboratorios.pap.fecha){
                this.getFC('fecha27').setValue(new Date(resultado.laboratorios.pap.fecha));
                }
                this.getFC('ivaa').setValue(resultado.laboratorios.ivaa.valor);
                if(resultado.laboratorios.ivaa.valor){
                this.getFC('fecha28').setValue(new Date(resultado.laboratorios.ivaa.fecha));
                }
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
                this.messageService.add({severity: 'success', summary: 'Ingresar', detail: 'Ingrese nuevo registro'});
            }
        })
    }

    agregar() {
        const input = {
            nroHcl: "10101013",
            nroAtencion: 1,
            nroControlSis: 1,
            nroEmbarazo: 1,
            tipoDoc: "DNI",
            nroDoc: "10101013",
            laboratorios: {
                grupoSanguineo: {
                    valor: this.getFC("grupoSanguineo").value,
                    fecha: this.getFecha(this.getFC("fecha1").value)
                },
                factorRH: {valor: this.getFC("factorRH").value, fecha: this.getFecha(this.getFC("fecha2").value)},
                hemograma: {valor: this.getFC("hemograma").value, fecha: this.getFecha(this.getFC("fecha3").value)},
                hemoglobina: {valor: this.getFC("hemoglobina").value, fecha: this.getFecha(this.getFC("fecha4").value)},
                factorCorreccion: {
                    valor: this.getFC("factorCorrepcion").value,
                    fecha: this.getFecha(this.getFC("fecha5").value)
                },
                hto: {valor: this.getFC("hto").value, fecha: this.getFecha(this.getFC("fecha6").value)},
                glucosa: {valor: this.getFC("glucosa").value, fecha: this.getFecha(this.getFC("fecha7").value)},
                toleranciaGlucosa: {
                    valor: this.getFC("toleranciaGlucosa").value,
                    fecha: this.getFecha(this.getFC("fecha8").value)
                },
                exaOrina: {valor: this.getFC("exaOrina").value, fecha: this.getFecha(this.getFC("fecha9").value)},
                rpr: {valor: this.getFC("rpr").value, fecha: this.getFecha(this.getFC("fecha10").value)},
                rprReactivo: {
                    valor: this.getFC("rprReactivo").value,
                    fecha: this.getFecha(this.getFC("fecha11").value)
                },
                exSecV: {valor: this.getFC("exSecV").value, fecha: this.getFecha(this.getFC("fecha12").value)},
                proteinuriaCuantitativa: {
                    valor: this.getFC("protenuariaCuantitativa").value,
                    fecha: this.getFecha(this.getFC("fecha13").value)
                },
                proteinuriaCualitativa: {
                    valor: this.getFC("protenuariaCualitativa").value,
                    fecha: this.getFecha(this.getFC("fecha14").value)
                },
                pruebaVIH: {valor: this.getFC("pruevaVIH").value, fecha: this.getFecha(this.getFC("fecha15").value)},
                prHepatitis: {
                    valor: this.getFC("pruHepatitis").value,
                    fecha: this.getFecha(this.getFC("fecha16").value)
                },
                elisa: {valor: this.getFC("elisa").value, fecha: this.getFecha(this.getFC("fecha17").value)},
                glicemia: {valor: this.getFC("glicemia").value, fecha: this.getFecha(this.getFC("fecha18").value)},
                bacteriuria: {
                    valor: this.getFC("bacteriuniria").value,
                    fecha: this.getFecha(this.getFC("fecha19").value)
                },
                nitritos: {valor: this.getFC("nitritos").value, fecha: this.getFecha(this.getFC("fecha20").value)},
                urocultivo: {valor: this.getFC("urocultivo").value, fecha: this.getFecha(this.getFC("fecha21").value)},
                bkEsputo: {valor: this.getFC("bkEsputo").value, fecha: this.getFecha(this.getFC("fecha22").value)},
                wsternBlotlfi: {
                    valor: this.getFC("wsternBlotlfi").value,
                    fecha: this.getFecha(this.getFC("fecha23").value)
                },
                thlv1: {valor: this.getFC("thlvl").value, fecha: this.getFecha(this.getFC("fecha24").value)},
                torch: {valor: this.getFC("torch").value, fecha: this.getFecha(this.getFC("fecha25").value)},
                gotaGruesa: {valor: this.getFC("gotaGruesa").value, fecha: this.getFecha(this.getFC("fecha26").value)},
                pap: {valor: this.getFC("pap").value, fecha: this.getFecha(this.getFC("fecha27").value)},
                ivaa: {valor: this.getFC("ivaa").value, fecha: this.getFecha(this.getFC("fecha28").value)},
            },
            ecografia: {
                fecha: this.getFechaHora(this.getFC("fechaEcografia1").value),
                descripcion: this.getFC('resultado1').value,
                semanas: this.getFC('semana1').value,
                dias: this.getFC('dia1').value
            },
        }
        this.resultadosService.addresultado(input).subscribe((resp) => {
                console.log('-->', resp)
                if (this.isUpdate) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Ingresar',
                        detail: 'Datos actulizados satisfactoriamente'
                    });
                } else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Ingresar',
                        detail: 'Datos agregados satisfactoriamente'
                    });
                }
            },
            (error) => {
                console.log('error:', error);
            }
        )
    }
}
