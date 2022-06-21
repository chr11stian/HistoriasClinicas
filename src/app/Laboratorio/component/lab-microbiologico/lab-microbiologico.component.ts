import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LaboratoriosService} from "../../services/laboratorios.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-lab-microbiologico',
    templateUrl: './lab-microbiologico.component.html',
    styleUrls: ['./lab-microbiologico.component.css']
})
export class LabMicrobiologicoComponent implements OnInit {
    formMicrobiologico: FormGroup;
    formMicrobiologicoBody: FormGroup
    data: any
    fecha: Date = new Date()

    constructor(private laboratoriosService: LaboratoriosService,
                private fb: FormBuilder,
                private ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {
        console.log('conf', config.data.edit)
        config.data.edit === false ? this.data = config.data : this.data = config.data.data;
    }s

    ngOnInit(): void {
        this.buildForm()
        this.cargarData()
    }

    buildForm() {
        this.formMicrobiologico = new FormGroup({
            apellidosNombres: new FormControl(''),
            edad: new FormControl(''),
            nroCama: new FormControl(''),
            nroHistoria: new FormControl(''),
            nroSis: new FormControl(''),
            horaMuestra: new FormControl(''),
            nroMuestra: new FormControl(''),
            solicitante: new FormControl(''),
        })
        this.formMicrobiologicoBody = new FormGroup({
            leucocitos: new FormControl(''),
            campoLeucocitos: new FormControl(''),
            hematies: new FormControl(''),
            campoHematies: new FormControl(''),
            piocitos: new FormControl(''),
            bacterias: new FormControl(''),
            celulasEpiteliales: new FormControl(''),
            trichomonasVaginalis: new FormControl(''),
            hifasPseudohifas: new FormControl(''),
            levaduras: new FormControl(''),
            otrosAnalisis: new FormControl(''),
            bacilosGramPositivos: new FormControl(''),
            bacilosGramNegativos: new FormControl(''),
            cocosGramPositivos: new FormControl(''),
            cocosGramNegativos: new FormControl(''),
            gardnerella: new FormControl(''),
            campoGardnerella: new FormControl(''),
            mobiluncus: new FormControl(''),
            campoMobiluncus: new FormControl(''),
            floraDoderlein: new FormControl(''),
            otrosColoracion: new FormControl(''),
        })
    }

    cargarData() {
        console.log('XL', this.data)
        this.formMicrobiologico.get('apellidosNombres').setValue(this.data.datosPaciente.apePaterno + ' ' + this.data.datosPaciente.apeMaterno + ' ' + this.data.datosPaciente.primerNombre + ' ' + this.data.datosPaciente.otrosNombres);
        this.formMicrobiologico.get('edad').setValue(this.data.datosPaciente.edad);
        this.formMicrobiologico.get('nroHistoria').setValue(this.data.datosPaciente.nroHcl);
        this.formMicrobiologico.get('nroCama').setValue(this.data.datosPaciente.nroCama);
        this.formMicrobiologico.get('solicitante').setValue(this.data.profesionalAcargo.apePaterno + ' ' + this.data.profesionalAcargo.apeMaterno + ' ' + this.data.profesionalAcargo.primerNombre + ' ' + this.data.profesionalAcargo.otrosNombres);
        this.formMicrobiologico.get('horaMuestra').setValue(this.fecha)
        this.formMicrobiologico.get('nroMuestra').setValue(this.data.nroMuestra)

        this.formMicrobiologicoBody.get('leucocitos').setValue(this.data.analisisDirecto.leucocitos)
        this.formMicrobiologicoBody.get('campoLeucocitos').setValue(this.data.analisisDirecto.campoLeucocitos)
        this.formMicrobiologicoBody.get('hematies').setValue(this.data.analisisDirecto.hematies)
        this.formMicrobiologicoBody.get('campoHematies').setValue(this.data.analisisDirecto.campoHematies)
        this.formMicrobiologicoBody.get('piocitos').setValue(this.data.analisisDirecto.piocitos)
        this.formMicrobiologicoBody.get('bacterias').setValue(this.data.analisisDirecto.bacterias)
        this.formMicrobiologicoBody.get('celulasEpiteliales').setValue(this.data.analisisDirecto.celulasEpiteliales)
        this.formMicrobiologicoBody.get('trichomonasVaginalis').setValue(this.data.analisisDirecto.trichomonasVaginalis)
        this.formMicrobiologicoBody.get('hifasPseudohifas').setValue(this.data.analisisDirecto.hifasPseudohifas)
        this.formMicrobiologicoBody.get('levaduras').setValue(this.data.analisisDirecto.levaduras)
        this.formMicrobiologicoBody.get('otrosAnalisis').setValue(this.data.analisisDirecto.otros)

        this.formMicrobiologicoBody.get('bacilosGramPositivos').setValue(this.data.coloracionGram.bacilosGramPositivos)
        this.formMicrobiologicoBody.get('bacilosGramNegativos').setValue(this.data.coloracionGram.bacilosGramNegativos)
        this.formMicrobiologicoBody.get('cocosGramPositivos').setValue(this.data.coloracionGram.cocosGramPositivos)
        this.formMicrobiologicoBody.get('cocosGramNegativos').setValue(this.data.coloracionGram.cocosGramNegativos)
        this.formMicrobiologicoBody.get('gardnerella').setValue(this.data.coloracionGram.gardnerella)
        this.formMicrobiologicoBody.get('campoGardnerella').setValue(this.data.coloracionGram.campoGardnerella)
        this.formMicrobiologicoBody.get('mobiluncus').setValue(this.data.coloracionGram.mobiluncus)
        this.formMicrobiologicoBody.get('campoMobiluncus').setValue(this.data.coloracionGram.campoMobiluncus)
        this.formMicrobiologicoBody.get('floraDoderlein').setValue(this.data.coloracionGram.floraDoderlein)
        this.formMicrobiologicoBody.get('otrosColoracion').setValue(this.data.coloracionGram.otros)

    }

    Guardar() {
        let auxAnalisis: analisisDirectoInterface = {
            leucocitos: this.formMicrobiologicoBody.value.leucocitos,
            campoLeucocitos: this.formMicrobiologicoBody.value.campoLeucocitos,
            hematies: this.formMicrobiologicoBody.value.hematies,
            campoHematies: this.formMicrobiologicoBody.value.campoHematies,
            piocitos: this.formMicrobiologicoBody.value.piocitos,
            bacterias: this.formMicrobiologicoBody.value.bacterias,
            celulasEpiteliales: this.formMicrobiologicoBody.value.celulasEpiteliales,
            trichomonasVaginalis: this.formMicrobiologicoBody.value.trichomonasVaginalis,
            hifasPseudohifas: this.formMicrobiologicoBody.value.hifasPseudohifas,
            levaduras: this.formMicrobiologicoBody.value.levaduras,
            otros: this.formMicrobiologicoBody.value.otrosAnalisis
        }
        let auxColoracion: coloracionGramInterface = {
            bacilosGramPositivos: this.formMicrobiologicoBody.value.bacilosGramPositivos,
            bacilosGramNegativos: this.formMicrobiologicoBody.value.bacilosGramNegativos,
            cocosGramPositivos: this.formMicrobiologicoBody.value.cocosGramPositivos,
            cocosGramNegativos: this.formMicrobiologicoBody.value.cocosGramNegativos,
            gardnerella: this.formMicrobiologicoBody.value.gardnerella,
            campoGardnerella: this.formMicrobiologicoBody.value.campoGardnerella,
            mobiluncus: this.formMicrobiologicoBody.value.mobiluncus,
            campoMobiluncus: this.formMicrobiologicoBody.value.campoMobiluncus,
            floraDoderlein: this.formMicrobiologicoBody.value.floraDoderlein,
            otros: this.formMicrobiologicoBody.value.otrosColoracion,
        }
        let aux: microbiologicoInterface = {
            analisisDirecto: auxAnalisis,
            coloracionGram: auxColoracion,
            nroMuestra: this.formMicrobiologico.value.nroMuestra,
        }
        console.log('aux', aux)
        this.laboratoriosService.guardarLaboratorioMicrobiologico(this.config.data.id, aux).subscribe((r: any) => {
            console.log(r)
        })
        this.ref.close()
    }
}

export interface microbiologicoInterface {
    "analisisDirecto"?: analisisDirectoInterface
    "coloracionGram"?: coloracionGramInterface
    nroMuestra?: string | number
}

export interface analisisDirectoInterface {
    leucocitos?: string | number
    "campoLeucocitos"?: string | number
    "hematies"?: string | number
    "campoHematies"?: string | number
    "piocitos"?: string | number
    "bacterias"?: string | number
    "celulasEpiteliales"?: string | number
    "trichomonasVaginalis"?: string | number
    "hifasPseudohifas"?: string | number
    "levaduras"?: string | number
    "otros"?: string | number
}

export interface coloracionGramInterface {
    "bacilosGramPositivos"?: string | number
    "bacilosGramNegativos"?: string | number
    "cocosGramPositivos"?: string | number
    "cocosGramNegativos"?: string | number
    "gardnerella"?: string | number
    "campoGardnerella"?: string | number
    "mobiluncus"?: string | number
    "campoMobiluncus"?: string | number
    "floraDoderlein"?: string | number
    "otros"?: string | number
}