import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'

interface formControlInterface {
    label: string,
    nameFC: string
}

@Component({
    selector: 'app-motivo-consulta',
    templateUrl: './motivo-consulta.component.html',
    styleUrls: ['./motivo-consulta.component.css']

})
export class MotivoConsultaComponent implements OnInit {
    examFG: FormGroup
    motivoFG: FormGroup
    dataExamFisicos: formControlInterface[] = [
        {label: 'T°', nameFC: 'TFC'},
        {label: 'PA', nameFC: 'PAFC'},
        {label: 'FC:', nameFC: 'FC'},
        {label: 'FR', nameFC: 'FRFC'},
        {label: 'Peso ', nameFC: 'PesoFC'},
        {label: 'Talla ', nameFC: 'TallaFC'},
        {label: 'PC ', nameFC: 'PCFC'}
    ]

    constructor() {
        this.buildFG()
    }

    buildFG(): void {
        this.motivoFG = new FormGroup({
            detailMotivoFC: new FormControl({value: null, disabled: false}, []),
            enfermedadFC: new FormControl({value: null, disabled: false}, []),
            inicioFC: new FormControl({value: null, disabled: false}, []),
            cursoFC: new FormControl({value: null, disabled: false}, []),
        })
        /** examen fisico */
        this.examFG = new FormGroup({
            detailFC: new FormControl({value: null, disabled: false}, [])
        })
        const selectFC = new FormControl({value: null, disabled: false}, [])
        this.dataExamFisicos.forEach((v) => {
            this.examFG.addControl(v.nameFC, selectFC)
        })
    }

    ngOnInit(): void {
    }

}
