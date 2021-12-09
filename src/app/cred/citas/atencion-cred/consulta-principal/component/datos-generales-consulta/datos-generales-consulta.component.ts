import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ConsultaGeneralService} from '../../services/consulta-general.service'

interface formControlInterface {
    label: string,
    nameFC: string
}

@Component({
    selector: 'app-datos-generales-consulta',
    templateUrl: './datos-generales-consulta.component.html',
    styleUrls: ['./datos-generales-consulta.component.css']
})


export class DatosGeneralesConsultaComponent implements OnInit, OnChanges {
    // @Input() consulta: ConsultaGeneralInterface
    @Input() consulta: any
    generalInfoFG: FormGroup
    signoPeligroFG: FormGroup
    factorRiesgoFG: FormGroup

    anamnesisFC = new FormControl({value: '', disabled: false})


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

    constructor(private consultaGeneralService: ConsultaGeneralService) {
        this.buildForm()
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes.consulta.currentValue !== changes.consulta.previousValue) {
            this.fillForm()
        }

    }

    buildForm(): void {
        this.generalInfoFG = new FormGroup({
            name: new FormControl({value: '', disabled: true}, [Validators.required]),
            dateAttention: new FormControl({value: null, disabled: false}, [Validators.required]),
            hour: new FormControl({value: null, disabled: false}, [Validators.required]),
            year: new FormControl({value: null, disabled: true}, [Validators.required])
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

        /** form para factor de riesgo */
        this.factorRiesgoFG = new FormGroup({
            /** quien cuida al ninio */
            cuidaNinio: new FormControl({value: null, disabled: false}, [Validators.required]),
            /** participa el apdre en el cuidado del ninio: atributo tipo boolean*/
            participaPadre: new FormControl({value: null, disabled: false}, [Validators.required]),
            /** ninio recibe muestras de afecto : atributo tipo boolean */
            recibeAfecto: new FormControl({value: null, disabled: false}, [Validators.required]),
            /** detalle string*/
            especificacion: new FormControl({value: null, disabled: false}, [Validators.required]),
        })

    }

    ngOnInit(): void {
        // this.getDatos()
    }

    getDatos(): void {
        // this.consultaGeneralService.crearConsulta(
        //     {
        //         'tipoDoc': 'DNI',
        //         'nroDoc': '10102023',
        //         'tipoDocProfesional': 'DNI',
        //         'nroDocProfesional': '45678912'
        //     }
        // ).toPromise().then((result) => {
        //     this.consulta = result.object
        //     this.fillForm()
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    fillForm(): void {
        /** rellenar general infomación */
        this.generalInfoFG.get('name').setValue(this.consulta.datosGenerales.datosGeneralesConsulta.nombresApellidos)
        this.generalInfoFG.get('dateAttention').setValue(new Date(this.consulta.created_at.substr(0, 10)))
        this.generalInfoFG.get('hour').setValue(new Date('' + this.consulta.created_at))
        const edad = this.consulta.datosGenerales.datosGeneralesConsulta.edad
        this.generalInfoFG.get('year').setValue(edad.anio + ' años ' + edad.mes + ' meses ' + edad.dia + ' dias')
    }

    save(): void {
        // const consultaInput: ConsultaInputType = {
        const consultaInput: any = {
            anamnesis: this.anamnesisFC.value,
            datosGeneralesConsulta: {
                tipoDocPaciente: this.consulta.datosGenerales.datosGeneralesConsulta.tipoDocPaciente,
                nroDocPaciente: this.consulta.datosGenerales.datosGeneralesConsulta.nroDocPaciente,
                nroHistoria: this.consulta.datosGenerales.datosGeneralesConsulta.nroHistoria,
                nombresApellidos: this.consulta.datosGenerales.datosGeneralesConsulta.nombresApellidos,
                fechaAtencionConsulta: this.consulta.datosGenerales.datosGeneralesConsulta.fechaAtencionConsulta,
                edad: this.consulta.datosGenerales.datosGeneralesConsulta.edad,
                hora: this.consulta.datosGenerales.datosGeneralesConsulta.hora
            },
            descarteSignosPeligro: {
                factorRiesgo: this.factorRiesgoFG.value,
                menor2M: this.twoMonths.map((element, index) => {
                    return {
                        codigo: (index + 1) + '',
                        descripcion: element.label,
                        valor: this.signoPeligroFG.get(element.nameFC).value as boolean
                    }
                }),
                menor2Ma4A: this.twoMonthsMore.map((element, index) => {
                    return {
                        codigo: (index + 1) + '',
                        descripcion: element.label,
                        valor: this.signoPeligroFG.get(element.nameFC).value as boolean
                    }
                }),
                todasLasEdades: this.allYear.map((element, index) => {
                    return {
                        codigo: (index + 1) + '',
                        descripcion: element.label,
                        valor: this.signoPeligroFG.get(element.nameFC).value as boolean
                    }
                }),
                noPresentaSigno: this.signoPeligroFG.get('presentSigns').value
            }
        }
        console.log('guardar ')
        console.log(consultaInput)
    }


    onNext() {
        this.save()


    }
}

