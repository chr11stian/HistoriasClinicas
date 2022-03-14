import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

interface formControlInterface {
    pro: string,
    label: string,
    nameFC: string
}

@Component({
    selector: 'app-modal-referencia',
    templateUrl: './modal-referencia.component.html',
    styleUrls: ['./modal-referencia.component.css']
})
export class ModalReferenciaComponent implements OnInit {
    formReferencia: FormGroup
    examFG: FormGroup
    sis: string = 'CUZ-234234235'
    historia: string = "7023456"
    edad: string = "1 año 2 meses 5 dias"
    stateOptions = [
        {label: 'Si', value: true},
        {label: 'No', value: false}
    ]
    sexOptions = [
        {label: 'F', value: true},
        {label: 'M', value: false}
    ]

    dataExamFisicos: formControlInterface[] = [
        {pro: 'temperatura', label: 'T (c°)', nameFC: 'TFC'},
        {pro: 'presionSistolica', label: 'PS (pa)', nameFC: 'PSFC'},
        {pro: 'presionDiastolica', label: 'PD (pa)', nameFC: 'PDFC'},
        {pro: 'fc', label: 'FC (l*min):', nameFC: 'FC'},
        {pro: 'fr', label: 'FR', nameFC: 'FRFC'},
        {pro: 'peso', label: 'Peso (kg)', nameFC: 'PesoFC'},
        {pro: 'talla', label: 'Talla (m)', nameFC: 'TallaFC'},
        {pro: 'imc', label: 'imc(kg/m2)', nameFC: 'imcFC'},
        {pro: 'perimetroCefalico', label: 'PC (cm)', nameFC: 'PCFC'}
    ]

    constructor(private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.buildForm()
    }

    buildForm(): void {
        this.examFG = new FormGroup({
            obsFC: new FormControl({value: '', disabled: false}),
            TFC: new FormControl({value: null, disabled: false}, []),
            PSFC: new FormControl({value: null, disabled: false}, []),
            PDFC: new FormControl({value: null, disabled: false}, []),
            FC: new FormControl({value: null, disabled: false}, []),
            FRFC: new FormControl({value: null, disabled: false}, []),
            PesoFC: new FormControl({value: null, disabled: false}, []),
            TallaFC: new FormControl({value: null, disabled: false}, []),
            imcFC: new FormControl({value: null, disabled: false}, []),
            PCFC: new FormControl({value: null, disabled: false}, []),
            detailFC: new FormControl({value: null, disabled: false}, []),
        })
        this.formReferencia = this.formBuilder.group({
            fecha: new FormControl("", []),
            hour: new FormControl("", []),
            subsidiado: new FormControl("", []),
            semisubsidiado: new FormControl("", []),
            otros: new FormControl("", []),
            origen: new FormControl("", []),
            destino: new FormControl("", []),
            sis: new FormControl("", []),
            historia: new FormControl("", []),
            nombre: new FormControl("", [])
        });
    }

    imc() {
        let peso = this.examFG.value.PesoFC
        let talla = this.examFG.value.TallaFC
        this.examFG.get('imcFC').setValue(peso / (talla * talla))
    }
}
