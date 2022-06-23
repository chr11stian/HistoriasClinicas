import {Component, Input, OnInit} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {LaboratoriosService} from "../../services/laboratorios.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-lab-inmunologia',
    templateUrl: './lab-inmunologia.component.html',
    styleUrls: ['./lab-inmunologia.component.css']
})
export class LabInmunologiaComponent implements OnInit {
    dataInmunologia: inmunologiaInterface[]
    formInmunologia: FormGroup;
    data: any
    fecha: Date = new Date()

    constructor(private laboratoriosService: LaboratoriosService,
                private fb: FormBuilder,
                private ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {
        config.data.edit === undefined ? this.data = config.data : this.data = config.data.data;
    }

    ngOnInit(): void {
        this.buildForm()
        this.cargarData()
    }

    buildForm() {
        this.formInmunologia = new FormGroup({
            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            nroCama: new FormControl(''),
            nroHistoria: new FormControl(''),
            nroSis: new FormControl(''),
            horaMuestra: new FormControl(''),
            nroMuestra: new FormControl(''),
            solicitante: new FormControl(''),
        })
    }

    cargarData() {
        console.log('XL',this.data)
        this.formInmunologia.get('apellidosNombres').setValue(this.data.datosPaciente.apePaterno + ' ' + this.data.datosPaciente.apeMaterno + ' ' + this.data.datosPaciente.primerNombre + ' ' + this.data.datosPaciente.otrosNombres);
        this.formInmunologia.get('edad').setValue(this.data.datosPaciente.edad);
        this.formInmunologia.get('nroHistoria').setValue(this.data.datosPaciente.nroHcl);
        this.formInmunologia.get('nroCama').setValue(this.data.datosPaciente.nroCama);
        this.formInmunologia.get('solicitante').setValue(this.data.profesionalAcargo.apePaterno + ' ' + this.data.profesionalAcargo.apeMaterno + ' ' + this.data.profesionalAcargo.primerNombre + ' ' + this.data.profesionalAcargo.otrosNombres);
        this.formInmunologia.get('horaMuestra').setValue(this.fecha)
        this.formInmunologia.get('nroMuestra').setValue(this.data.nroMuestra)
        this.dataInmunologia = [{
            reaccionWidal: this.config.data.edit ? this.data.reaccionWidal : 0,
            proteinaCReactiva: this.config.data.edit ? this.data.proteinaCReactiva : 0,
            agTiphyco_o: this.config.data.edit ? this.data.agTiphyco_o : 0,
            factorReumatoideo: this.config.data.edit ? this.data.factorReumatoideo : 0,
            agTiphyco_h: this.config.data.edit ? this.data.agTiphyco_h : 0,
            antiestreptolisinasO: this.config.data.edit ? this.data.antiestreptolisinasO : 0,
            agTiphyco_a: this.config.data.edit ? this.data.agTiphyco_a : 0,
            rpr: this.config.data.edit ? this.data.rpr : 0,
            agTiphyco_b: this.config.data.edit ? this.data.agTiphyco_b : 0,
            sifilis: this.config.data.edit ? this.data.sifilis : 0,
            hbsAg: this.config.data.edit ? this.data.hbsAg : 0,
            vih12: this.config.data.edit ? this.data.vih12 : 0,
            grupoSanguineo: this.config.data.edit ? this.data.grupoSanguineo : 0,
            psaTotal: this.config.data.edit ? this.data.psaTotal : 0,
            factorRH: this.config.data.edit ? this.data.factorRH : 0,
            otros: this.config.data.edit ? this.data.otros : 0,
            bhcg: {
                resultado: this.config.data.edit ? this.data.bhcg.resultado : 0,
                muestra: this.config.data.edit ? this.data.bhcg.muestra : 0,
                reactivo: this.config.data.edit ? this.data.bhcg.reactivo : 0,
            },
            tipoMuestra: this.config.data.edit ? this.data.tipoMuestra : 0,
        }]
    }

    Guardar() {
        let aux: inmunologiaInterface = {
            reaccionWidal: this.dataInmunologia[0].reaccionWidal,
            proteinaCReactiva: this.dataInmunologia[0].proteinaCReactiva,
            agTiphyco_o: this.dataInmunologia[0].agTiphyco_o,
            factorReumatoideo:this.dataInmunologia[0].factorReumatoideo,
            agTiphyco_h: this.dataInmunologia[0].agTiphyco_h,
            antiestreptolisinasO: this.dataInmunologia[0].antiestreptolisinasO,
            agTiphyco_a: this.dataInmunologia[0].agTiphyco_a,
            rpr: this.dataInmunologia[0].rpr,
            agTiphyco_b: this.dataInmunologia[0].agTiphyco_b,
            sifilis: this.dataInmunologia[0].sifilis,
            hbsAg: this.dataInmunologia[0].hbsAg,
            vih12: this.dataInmunologia[0].vih12,
            grupoSanguineo: this.dataInmunologia[0].grupoSanguineo,
            psaTotal: this.dataInmunologia[0].psaTotal,
            factorRH: this.dataInmunologia[0].factorRH,
            otros: this.dataInmunologia[0].otros,
            bhcg: {
                resultado: this.dataInmunologia[0].bhcg.resultado,
                muestra: this.dataInmunologia[0].bhcg.muestra,
                reactivo: this.dataInmunologia[0].bhcg.reactivo,
            },
            tipoMuestra: this.dataInmunologia[0].tipoMuestra,
            nroMuestra: this.formInmunologia.value.nroMuestra,
        }
        this.laboratoriosService.guardarLaboratorioInmunologico(this.config.data.id, aux).subscribe((r: any) => {
            console.log(r)
        })
        this.ref.close()
    }
}

export interface inmunologiaInterface {
    nroMuestra?: string | number
    resultadoExamen?: string | number
    tipoMuestra?: string | number

    reaccionWidal?: string | number
    proteinaCReactiva?: string | number
    agTiphyco_o?: string | number
    factorReumatoideo?: string | number
    agTiphyco_h?: string | number
    antiestreptolisinasO?: string | number
    agTiphyco_a?: string | number
    rpr?: string | number
    agTiphyco_b?: string | number
    sifilis?: string | number
    hbsAg?: string | number
    vih12?: string | number
    grupoSanguineo?: string | number
    psaTotal?: string | number
    factorRH?: string | number
    otros?: string | number
    bhcg?: bhcgInterface
}
export interface bhcgInterface{
    resultado?: string | number
    muestra?: string | number
    reactivo?: string | number
}