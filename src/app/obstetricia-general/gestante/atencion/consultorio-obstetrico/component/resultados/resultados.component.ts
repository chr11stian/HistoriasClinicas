import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultadosService} from "../../services/resultados/resultados.service";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
    resultadoEcografiaFG: FormGroup;
    isUpdate:boolean=false;
    constructor(private resultadosService:ResultadosService,
    private messageService: MessageService) {
        this.buildForm();
    }
    ngOnInit(): void {
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
            return yyyy + '-' + mm + '-' + dd+' '+hora
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
    getResultados() {
        const input = {
            "nroHcl": "10101013",
            "nroEmbarazo": 1,
            "nroAtencion": 1
        }
        this.resultadosService.getResultado(input).subscribe((resp)=>{
            if(resp['object']!=null){
                this.isUpdate=true;
            const resultado=resp['object'][0]
            this.getFC('grupoSanguineo').setValue(resultado.laboratorios.grupoSanguineo.valor);
                this.getFC('fecha1').setValue(new Date(resultado.laboratorios.grupoSanguineo.fecha));
            this.getFC('factorRH').setValue(resultado.laboratorios.factorRH.valor);
                this.getFC('fecha2').setValue(new Date(resultado.laboratorios.factorRH.fecha));
            this.getFC('hemograma').setValue(resultado.laboratorios.hemograma.valor);
                this.getFC('fecha3').setValue(new Date(resultado.laboratorios.hemograma.fecha));
            this.getFC('hemoglobina').setValue(resultado.laboratorios.hemoglobina.valor);
                this.getFC('fecha4').setValue(new Date(resultado.laboratorios.hemoglobina.fecha));
            this.getFC('factorCorrepcion').setValue(resultado.laboratorios.factorCorreccion.valor);
                this.getFC('fecha5').setValue(new Date(resultado.laboratorios.factorCorreccion.fecha));
            this.getFC('hto').setValue(resultado.laboratorios.hto.valor);
                this.getFC('fecha6').setValue(new Date(resultado.laboratorios.hto.fecha));
            this.getFC('glucosa').setValue(resultado.laboratorios.glucosa.valor);
                this.getFC('fecha7').setValue(new Date(resultado.laboratorios.glucosa.fecha));
            this.getFC('toleranciaGlucosa').setValue(resultado.laboratorios.toleranciaGlucosa.valor);
                this.getFC('fecha8').setValue(new Date(resultado.laboratorios.toleranciaGlucosa.fecha));
            this.getFC('exaOrina').setValue(resultado.laboratorios.exaOrina.valor);
                this.getFC('fecha9').setValue(new Date(resultado.laboratorios.exaOrina.fecha));
            this.getFC('rpr').setValue(resultado.laboratorios.rpr.valor);
                this.getFC('fecha10').setValue(new Date(resultado.laboratorios.rpr.fecha));
            this.getFC('rprReactivo').setValue(resultado.laboratorios.rprReactivo.valor);
                this.getFC('fecha11').setValue(new Date(resultado.laboratorios.rprReactivo.fecha));
            this.getFC('exSecV').setValue(resultado.laboratorios.exSecV.valor);
                this.getFC('fecha12').setValue(new Date(resultado.laboratorios.exSecV.fecha));
            this.getFC('protenuariaCuantitativa').setValue(resultado.laboratorios.proteinuriaCuantitativa.valor);
                this.getFC('fecha13').setValue(new Date(resultado.laboratorios.proteinuriaCuantitativa.fecha));
            this.getFC('protenuariaCualitativa').setValue(resultado.laboratorios.proteinuriaCualitativa.valor);
                this.getFC('fecha14').setValue(new Date(resultado.laboratorios.proteinuriaCualitativa.fecha));
            this.getFC('pruevaVIH').setValue(resultado.laboratorios.pruebaVIH.valor);
                this.getFC('fecha15').setValue(new Date(resultado.laboratorios.pruebaVIH.fecha));
            this.getFC('pruHepatitis').setValue(resultado.laboratorios.prHepatitis.valor);
                this.getFC('fecha16').setValue(new Date(resultado.laboratorios.prHepatitis.fecha));
            this.getFC('elisa').setValue(resultado.laboratorios.elisa.valor);
                this.getFC('fecha17').setValue(new Date(resultado.laboratorios.elisa.fecha));
            this.getFC('glicemia').setValue(resultado.laboratorios.glicemia.valor);
                this.getFC('fecha18').setValue(new Date(resultado.laboratorios.glicemia.fecha));
            this.getFC('bacteriuniria').setValue(resultado.laboratorios.bacteriuria.valor);
                this.getFC('fecha19').setValue(new Date(resultado.laboratorios.bacteriuria.fecha));
            this.getFC('nitritos').setValue(resultado.laboratorios.nitritos.valor);
                this.getFC('fecha20').setValue(new Date(resultado.laboratorios.nitritos.fecha));
            this.getFC('urocultivo').setValue(resultado.laboratorios.urocultivo.valor);
                this.getFC('fecha21').setValue(new Date(resultado.laboratorios.urocultivo.fecha));
            this.getFC('bkEsputo').setValue(resultado.laboratorios.bkEsputo.valor);
                this.getFC('fecha22').setValue(new Date(resultado.laboratorios.bkEsputo.fecha));
            this.getFC('wsternBlotlfi').setValue(resultado.laboratorios.wsternBlotlfi.valor);
                this.getFC('fecha23').setValue(new Date(resultado.laboratorios.wsternBlotlfi.fecha));
            this.getFC('thlvl').setValue(resultado.laboratorios.thlv1.valor);
                this.getFC('fecha24').setValue(new Date(resultado.laboratorios.thlv1.fecha));
            this.getFC('torch').setValue(resultado.laboratorios.torch.valor);
                this.getFC('fecha25').setValue(new Date(resultado.laboratorios.torch.fecha));
            this.getFC('gotaGruesa').setValue(resultado.laboratorios.gotaGruesa.valor);
                this.getFC('fecha26').setValue(new Date(resultado.laboratorios.gotaGruesa.fecha));
            this.getFC('pap').setValue(resultado.laboratorios.pap.valor);
                this.getFC('fecha27').setValue(new Date(resultado.laboratorios.pap.fecha));
            this.getFC('ivaa').setValue(resultado.laboratorios.ivaa.valor);
                this.getFC('fecha28').setValue(new Date(resultado.laboratorios.ivaa.fecha));
            this.getFC('fechaEcografia1').setValue(new Date(resultado.ecografia.fecha));
            this.getFC('resultado1').setValue(resultado.ecografia.descripcion);
            this.getFC('semana1').setValue(resultado.ecografia.semanas);
            this.getFC('dia1').setValue(resultado.ecografia.dias);
                this.messageService.add({severity:'info', summary:'Recuperado', detail:'registro recuperado satisfactoriamente'});
            }
            else{
                this.isUpdate=false;
                this.messageService.add({severity:'success', summary:'Ingresar', detail:'Ingrese nuevo registro'});
            }
        })
    }
    agregar() {
        const input={
            nroHcl: "10101013",
            nroAtencion: 1,
            nroControlSis: 1,
            nroEmbarazo: 1,
            tipoDoc: "DNI",
            nroDoc: "10101013",
            laboratorios:{
                grupoSanguineo: {valor: this.getFC("grupoSanguineo").value, fecha: this.getFecha(this.getFC("fecha1").value)},
                factorRH: {valor: this.getFC("factorRH").value, fecha: this.getFecha(this.getFC("fecha2").value)},
                hemograma: {valor: this.getFC("hemograma").value, fecha: this.getFecha(this.getFC("fecha3").value)},
                hemoglobina: {valor: this.getFC("hemoglobina").value, fecha: this.getFecha(this.getFC("fecha4").value)},
                factorCorreccion: {valor: this.getFC("factorCorrepcion").value, fecha: this.getFecha(this.getFC("fecha5").value)},
                hto: {valor: this.getFC("hto").value, fecha: this.getFecha(this.getFC("fecha6").value)},
                glucosa: {valor: this.getFC("glucosa").value, fecha: this.getFecha(this.getFC("fecha7").value)},
                toleranciaGlucosa: {valor: this.getFC("toleranciaGlucosa").value, fecha: this.getFecha(this.getFC("fecha8").value)},
                exaOrina: {valor: this.getFC("exaOrina").value, fecha: this.getFecha(this.getFC("fecha9").value)},
                rpr: {valor: this.getFC("rpr").value, fecha: this.getFecha(this.getFC("fecha10").value)},
                rprReactivo: {valor: this.getFC("rprReactivo").value, fecha: this.getFecha(this.getFC("fecha11").value)},
                exSecV: {valor: this.getFC("exSecV").value, fecha: this.getFecha(this.getFC("fecha12").value)},
                proteinuriaCuantitativa: {valor: this.getFC("protenuariaCuantitativa").value,fecha: this.getFecha(this.getFC("fecha13").value)},
                proteinuriaCualitativa: {valor: this.getFC("protenuariaCualitativa").value,fecha: this.getFecha(this.getFC("fecha14").value)},
                pruebaVIH: {valor: this.getFC("pruevaVIH").value, fecha: this.getFecha(this.getFC("fecha15").value)},
                prHepatitis: {valor: this.getFC("pruHepatitis").value, fecha: this.getFecha(this.getFC("fecha16").value)},
                elisa: {valor: this.getFC("elisa").value, fecha: this.getFecha(this.getFC("fecha17").value)},
                glicemia: {valor: this.getFC("glicemia").value, fecha: this.getFecha(this.getFC("fecha18").value)},
                bacteriuria: {valor: this.getFC("bacteriuniria").value, fecha: this.getFecha(this.getFC("fecha19").value)},
                nitritos: {valor: this.getFC("nitritos").value, fecha: this.getFecha(this.getFC("fecha20").value)},
                urocultivo: {valor: this.getFC("urocultivo").value, fecha: this.getFecha(this.getFC("fecha21").value)},
                bkEsputo: {valor: this.getFC("bkEsputo").value, fecha: this.getFecha(this.getFC("fecha22").value)},
                wsternBlotlfi: {valor: this.getFC("wsternBlotlfi").value, fecha: this.getFecha(this.getFC("fecha23").value)},
                thlv1: {valor: this.getFC("thlvl").value, fecha: this.getFecha(this.getFC("fecha24").value)},
                torch: {valor: this.getFC("torch").value, fecha: this.getFecha(this.getFC("fecha25").value)},
                gotaGruesa: {valor: this.getFC("gotaGruesa").value, fecha: this.getFecha(this.getFC("fecha26").value)},
                pap: {valor: this.getFC("pap").value, fecha: this.getFecha(this.getFC("fecha27").value)},
                ivaa: {valor: this.getFC("ivaa").value, fecha: this.getFecha(this.getFC("fecha28").value)},
            },
            ecografia:{
                fecha: this.getFechaHora(this.getFC("fechaEcografia1").value),
                descripcion:this.getFC('resultado1').value,
                semanas:this.getFC('semana1').value,
                dias:this.getFC('dia1').value},
        }
    this.resultadosService.addresultado(input).subscribe((resp)=>{
            console.log('-->',resp)
        if(this.isUpdate){
            this.messageService.add({severity:'success', summary:'Ingresar', detail:'Datos actulizados satisfactoriamente'});
        }
        else{
            this.messageService.add({severity:'success', summary:'Ingresar', detail:'Datos agregados satisfactoriamente'});
        }
        },
        (error)=>{
            console.log('error:',error);
        }
    )
    }
}
