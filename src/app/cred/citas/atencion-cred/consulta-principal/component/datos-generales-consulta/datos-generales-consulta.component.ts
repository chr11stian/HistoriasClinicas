import {Component, OnInit} from '@angular/core'
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms'

interface formControlInterface {
    label: string,
    nameFC: string
}

@Component({
    selector: 'app-datos-generales-consulta',
    templateUrl: './datos-generales-consulta.component.html',
    styleUrls: ['./datos-generales-consulta.component.css']
})


export class DatosGeneralesConsultaComponent implements OnInit {
    generalInfoFG: FormGroup
    signoPeligroFG: FormGroup

    twoMonths: formControlInterface[] = [
        {
            label: 'No quiere mamar ni succiona',
            nameFC: 'noMama',
        },
        {
            label: 'Convulsiones',
            nameFC: 'convulsion',
        },
        {
            label: 'Fontanela abombada',
            nameFC: 'abombada'
        },
        {
            label: 'Enrojecimiento del ombligo se extiende a la piel',
            nameFC: 'enrojemiento'
        },
        {
            label: 'Fiebre o temperatura baja',
            nameFC: 'temperatura'
        },
        {
            label: 'Rigidez de nuca',
            nameFC: 'rigidezNuca'
        },
        {
            label: 'Pústulas muchas y extensas',
            nameFC: 'pustulas'
        },
        {
            label: 'Letárgico o comatoso',
            nameFC: 'letargico'
        }
    ]
    twoMonthsMore: formControlInterface[] = [
        {
            label: 'No puede beber o tomar el pecho',
            nameFC: 'noTomaPecho'
        },
        {
            label: 'Convulsiones',
            nameFC: 'convulsionesMore'
        },
        {
            label: 'Letárgico o comaloso',
            nameFC: 'letargicoMore'
        },
        {
            label: 'Vomita todo',
            nameFC: 'vomitaTodo'
        },
        {
            label: 'Estridor en reposo / tiraje subcostal',
            nameFC: 'tirajeSubcostal'
        }
    ]

    allYear: formControlInterface[] = [
        {
            label: 'Emaciación visible grave',
            nameFC: 'emaciacionVisibleAll'
        },
        {
            label: 'Piel vuelve muy lentamente',
            nameFC: 'pielvuelveAll'
        },
        {
            label: 'Traumatismo / Quemaduras',
            nameFC: 'traumatismoQuemaduraAll'
        },
        {
            label: 'Envenenamiento',
            nameFC: 'envenenamientoAll'
        },
        {
            label: 'Palidez palmar intensa',
            nameFC: 'palidezAll'
        }
    ]

    constructor() {
        this.buildForm()
    }

    ngOnInit(): void {
    }

    buildForm(): void {
        this.generalInfoFG = new FormGroup({
            name: new FormControl({value: '', disabled: false}, [Validators.required]),
            dateAttention: new FormControl({value: null, disabled: false}, [Validators.required]),
            hour: new FormControl({value: null, disabled: false}, [Validators.required]),
            year: new FormControl({value: null, disabled: false}, [Validators.required])
        })
        this.signoPeligroFG = new FormGroup({
            presentSigns: new FormControl({value: null, disabled: false}, [Validators.required])
        })
        const selectFC = new FormControl({value: null, disabled: false}, [])
        this.twoMonths.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFC, selectFC)
        })

        this.twoMonthsMore.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFC, selectFC)
        })

        this.allYear.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFC, selectFC)
        })
    }


    onNext() {
        console.log('hola mundo')
        alert('hola daniel')
    }
}

