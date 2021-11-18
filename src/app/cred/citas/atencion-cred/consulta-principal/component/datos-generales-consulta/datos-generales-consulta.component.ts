import {Component, OnInit} from '@angular/core'
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms'

interface formControlInterface {
    label: string,
    nameFc: string
}

@Component({
    selector: 'app-datos-generales-consulta',
    templateUrl: './datos-generales-consulta.component.html',
    styleUrls: ['./datos-generales-consulta.component.css']
})


export class DatosGeneralesConsultaComponent implements OnInit {
    generalInfoFG: FormGroup
    signoPeligroFG: FormGroup

    /** Get one form control*/
    getGeneralInfoFC(control: string): AbstractControl {
        return this.generalInfoFG.get(control)
    }

    /** Get Value Form Control */
    valueGeneralInfoFC(control: string): any {
        return this.getGeneralInfoFC(control).value
    }

    /** Set Value Form Control */
    setValueGeneralInfoFC(formControl: string, value: any) {
        this.getGeneralInfoFC(formControl).setValue(value)
    }

    twoMonths: formControlInterface[] = [
        {
            label: 'No quiere mamar ni succiona',
            nameFc: 'noMama',
        },
        {
            label: 'Convulsiones',
            nameFc: 'convulsion',
        },
        {
            label: 'Fontanela abombada',
            nameFc: 'abombada'
        },
        {
            label: 'Enrojecimiento del ombligo se extiende a la piel',
            nameFc: 'enrojemiento'
        },
        {
            label: 'Fiebre o temperatura baja',
            nameFc: 'temperatura'
        },
        {
            label: 'Rigidez de nuca',
            nameFc: 'rigidezNuca'
        },
        {
            label: 'Pústulas muchas y extensas',
            nameFc: 'pustulas'
        },
        {
            label: 'Letárgico o comatoso',
            nameFc: 'letargico'
        }
    ]
    twoMonthsMore: formControlInterface[] = [
        {
            label: 'No puede beber o tomar el pecho',
            nameFc: 'noTomaPecho'
        },
        {
            label: 'Convulsiones',
            nameFc: 'convulsionesMore'
        },
        {
            label: 'Letárgico o comaloso',
            nameFc: 'letargicoMore'
        },
        {
            label: 'Vomita todo',
            nameFc: 'vomitaTodo'
        },
        {
            label: 'Estridor en reposo / tiraje subcostal',
            nameFc: 'tirajeSubcostal'
        }
    ]

    allYear: formControlInterface[] = [
        {
            label: 'Emaciación visible grave',
            nameFc: 'emaciacionVisibleAll'
        },
        {
            label: 'Piel duele muy lentamente',
            nameFc: 'pielDueleAll'
        },
        {
            label: 'Traumatismo / Quemaduras',
            nameFc: 'traumatismoQuemaduraAll'
        },
        {
            label: 'Envenenamiento',
            nameFc: 'envenenamientoAll'
        },
        {
            label: 'Palidez palmar intensa',
            nameFc: 'palidezAll'
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
        this.signoPeligroFG = new FormGroup({})
        const selectFC = new FormControl({value: null, disabled: false}, [])
        this.twoMonths.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFc, selectFC)
        })

        this.twoMonthsMore.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFc, selectFC)
        })

        this.allYear.forEach((v) => {
            this.signoPeligroFG.addControl(v.nameFc, selectFC)
        })
    }


    onNext() {
        console.log('hola mundo')
        alert('hola daniel')
    }
}

