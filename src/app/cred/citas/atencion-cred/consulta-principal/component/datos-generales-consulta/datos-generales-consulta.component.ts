import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ConsultaGeneralService} from '../../services/consulta-general.service'
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {
    dato,
    outputTriajeInterface
} from "../../../../models/data";
import {ListaConsultaService} from "../../../../services/lista-consulta.service";

interface formControlInterface {
    index: string,
    label: string,
    nameFC: string
}

@Component({
    selector: 'app-datos-generales-consulta',
    templateUrl: './datos-generales-consulta.component.html',
    styleUrls: ['./datos-generales-consulta.component.css']
})

export class DatosGeneralesConsultaComponent implements OnInit, OnChanges {
    examFG: FormGroup;
    generalInfoFG: FormGroup
    signoPeligroFG: FormGroup
    factorRiesgoFG: FormGroup
    twoMonthsFG: FormGroup
    twoMonthsMoreFG: FormGroup
    allYearFG: FormGroup
    auxTriaje: outputTriajeInterface
    data: dato
    attributeLocalS = 'documento'
    anamnesisFC = new FormControl({value: '', disabled: false})
    obsFC = new FormControl({value: '', disabled: false})
    stateOptions = [
        {label: 'Si', value: true},
        {label: 'No', value: false}
    ]

    list: formControlInterface[] = [
        {
            index: '1',
            label: 'No quiere mamar ni succiona',
            nameFC: 'noMama',
        },
        {
            index: '2',
            label: 'Convulsiones',
            nameFC: 'convulsion',
        },
        {
            index: '3',
            label: 'Fontanela abombada',
            nameFC: 'abombada'
        },
        {
            index: '4',
            label: 'Enrojecimiento del ombligo se extiende a la piel',
            nameFC: 'enrojemiento'
        },
        {
            index: '5',
            label: 'Fiebre o temperatura baja',
            nameFC: 'temperatura'
        },
        {
            index: '6',
            label: 'Rigidez de nuca',
            nameFC: 'rigidezNuca'
        },
        {
            index: '7',
            label: 'Pústulas muchas y extensas',
            nameFC: 'pustulas'
        },
        {
            index: '8',
            label: 'Letárgico o comatoso',
            nameFC: 'letargico'
        },
        {
            index: '1',
            label: 'No puede beber o tomar el pecho',
            nameFC: 'noTomaPecho'
        },
        {
            index: '2',
            label: 'Convulsiones',
            nameFC: 'convulsionesMore'
        },
        {
            index: '3',
            label: 'Letárgico o comatoso',
            nameFC: 'letargicoMore'
        },
        {
            index: '4',
            label: 'Vomita todo',
            nameFC: 'vomitaTodo'
        },
        {
            index: '5',
            label: 'Estridor en reposo / tiraje subcostal',
            nameFC: 'tirajeSubcostal'
        },
        {
            index: '1',
            label: 'Emaciación visible grave',
            nameFC: 'emaciacionVisibleAll'
        },
        {
            index: '2',
            label: 'Piel vuelve muy lentamente',
            nameFC: 'pielvuelveAll'
        },
        {
            index: '3',
            label: 'Traumatismo / Quemaduras',
            nameFC: 'traumatismoQuemaduraAll'
        },
        {
            index: '4',
            label: 'Envenenamiento',
            nameFC: 'envenenamientoAll'
        },
        {
            index: '5',
            label: 'Palidez palmar intensa',
            nameFC: 'palidezAll'
        }
    ]
    twoMonths: formControlInterface[] = [
        {
            index: '1',
            label: 'No quiere mamar ni succiona',
            nameFC: 'noMama',
        },
        {
            index: '2',
            label: 'Convulsiones',
            nameFC: 'convulsion',
        },
        {
            index: '3',
            label: 'Fontanela abombada',
            nameFC: 'abombada'
        },
        {
            index: '4',
            label: 'Enrojecimiento del ombligo se extiende a la piel',
            nameFC: 'enrojemiento'
        },
        {
            index: '5',
            label: 'Fiebre o temperatura baja',
            nameFC: 'temperatura'
        },
        {
            index: '6',
            label: 'Rigidez de nuca',
            nameFC: 'rigidezNuca'
        },
        {
            index: '7',
            label: 'Pústulas muchas y extensas',
            nameFC: 'pustulas'
        },
        {
            index: '8',
            label: 'Letárgico o comatoso',
            nameFC: 'letargico'
        }
    ]
    twoMonthsMore: formControlInterface[] = [
        {
            index: '1',
            label: 'No puede beber o tomar el pecho',
            nameFC: 'noTomaPecho'
        },
        {
            index: '2',
            label: 'Convulsiones',
            nameFC: 'convulsionesMore'
        },
        {
            index: '3',
            label: 'Letárgico o comatoso',
            nameFC: 'letargicoMore'
        },
        {
            index: '4',
            label: 'Vomita todo',
            nameFC: 'vomitaTodo'
        },
        {
            index: '5',
            label: 'Estridor en reposo / tiraje subcostal',
            nameFC: 'tirajeSubcostal'
        }
    ]
    allYear: formControlInterface[] = [
        {
            index: '1',
            label: 'Emaciación visible grave',
            nameFC: 'emaciacionVisibleAll'
        },
        {
            index: '2',
            label: 'Piel vuelve muy lentamente',
            nameFC: 'pielvuelveAll'
        },
        {
            index: '3',
            label: 'Traumatismo / Quemaduras',
            nameFC: 'traumatismoQuemaduraAll'
        },
        {
            index: '4',
            label: 'Envenenamiento',
            nameFC: 'envenenamientoAll'
        },
        {
            index: '5',
            label: 'Palidez palmar intensa',
            nameFC: 'palidezAll'
        }
    ]

    constructor(private router: Router, private route: ActivatedRoute,
                private consultaService: ListaConsultaService,
                private consultaGeneralService: ConsultaGeneralService) {
    }

    buildForm(): void {
        /** Signos vitales */
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
        })
        this.generalInfoFG = new FormGroup({
            name: new FormControl({value: '', disabled: true}, [Validators.required]),
            dateAttention: new FormControl({value: '', disabled: true}, [Validators.required]),
            hour: new FormControl({value: null, disabled: false}, [Validators.required]),
            year: new FormControl({value: null, disabled: true}, [Validators.required])
        })
        this.signoPeligroFG = new FormGroup({
            presentSigns: new FormControl({value: false, disabled: false}, [Validators.required])
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

        this.twoMonthsFG = new FormGroup({
            1: new FormControl(false),
            2: new FormControl(false),
            3: new FormControl(false),
            4: new FormControl(false),
            5: new FormControl(false),
            6: new FormControl(false),
            7: new FormControl(false),
            8: new FormControl(false),
        })
        this.twoMonthsMoreFG = new FormGroup({
            1: new FormControl({value: false, disabled: false}, [Validators.required]),
            2: new FormControl({value: false, disabled: false}, [Validators.required]),
            3: new FormControl({value: false, disabled: false}, [Validators.required]),
            4: new FormControl({value: false, disabled: false}, [Validators.required]),
            5: new FormControl({value: false, disabled: false}, [Validators.required]),
        })
        this.allYearFG = new FormGroup({
            1: new FormControl({value: false, disabled: false}, [Validators.required]),
            2: new FormControl({value: false, disabled: false}, [Validators.required]),
            3: new FormControl({value: false, disabled: false}, [Validators.required]),
            4: new FormControl({value: false, disabled: false}, [Validators.required]),
            5: new FormControl({value: false, disabled: false}, [Validators.required]),
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

    ngOnChanges(changes: SimpleChanges) {
    }

    recuperarData(id) {
        this.consultaGeneralService.datosGenerales({
            tipoDoc: this.data.tipoDoc,
            nroDoc: this.data.nroDocumento
        }).subscribe((r: any) => {
            let nombre = r.object.primerNombre + " " + r.object.otrosNombres + " " + r.object.apePaterno + " " + r.object.apeMaterno
            this.generalInfoFG.get('name').setValue(nombre)
        })
        this.consultaService.getDatosGenerales(id).subscribe((r: any) => {
            this.auxTriaje = r.object
            console.log('aux: ', this.auxTriaje)
            let date: Date = new Date(this.auxTriaje.fecha)
            this.generalInfoFG.get('dateAttention').setValue(date)
            this.generalInfoFG.get('hour').setValue(date)
            let edad = this.auxTriaje.anioEdad + ' años ' + this.auxTriaje.mesEdad + ' meses ' + this.auxTriaje.diaEdad + ' dias'
            this.generalInfoFG.get('year').setValue(edad)

            this.examFG.get('TFC').setValue(this.auxTriaje.signosVitales.temperatura)
            this.examFG.get('PSFC').setValue(this.auxTriaje.signosVitales.presionSistolica)
            this.examFG.get('PDFC').setValue(this.auxTriaje.signosVitales.presionDiastolica)
            this.examFG.get('FC').setValue(this.auxTriaje.signosVitales.fc)
            this.examFG.get('FRFC').setValue(this.auxTriaje.signosVitales.fr)
            this.examFG.get('PesoFC').setValue(this.auxTriaje.signosVitales.peso)
            this.examFG.get('TallaFC').setValue(this.auxTriaje.signosVitales.talla)
            this.examFG.get('imcFC').setValue(this.auxTriaje.signosVitales.imc)
            this.examFG.get('PCFC').setValue(this.auxTriaje.signosVitales.perimetroCefalico)

            this.twoMonthsFG.get('1').setValue(this.auxTriaje.listaSignosAlarma[0].valorSigno as boolean)
            this.twoMonthsFG.get('2').setValue(this.auxTriaje.listaSignosAlarma[1].valorSigno as boolean)
            this.twoMonthsFG.get('3').setValue(this.auxTriaje.listaSignosAlarma[2].valorSigno as boolean)
            this.twoMonthsFG.get('4').setValue(this.auxTriaje.listaSignosAlarma[3].valorSigno as boolean)
            this.twoMonthsFG.get('5').setValue(this.auxTriaje.listaSignosAlarma[4].valorSigno as boolean)
            this.twoMonthsFG.get('6').setValue(this.auxTriaje.listaSignosAlarma[5].valorSigno as boolean)
            this.twoMonthsFG.get('7').setValue(this.auxTriaje.listaSignosAlarma[6].valorSigno as boolean)
            this.twoMonthsFG.get('8').setValue(this.auxTriaje.listaSignosAlarma[7].valorSigno as boolean)

            this.twoMonthsMoreFG.get('1').setValue(this.auxTriaje.listaSignosAlarma[8].valorSigno as boolean)
            this.twoMonthsMoreFG.get('2').setValue(this.auxTriaje.listaSignosAlarma[9].valorSigno as boolean)
            this.twoMonthsMoreFG.get('3').setValue(this.auxTriaje.listaSignosAlarma[10].valorSigno as boolean)
            this.twoMonthsMoreFG.get('4').setValue(this.auxTriaje.listaSignosAlarma[11].valorSigno as boolean)
            this.twoMonthsMoreFG.get('5').setValue(this.auxTriaje.listaSignosAlarma[12].valorSigno as boolean)

            this.allYearFG.get('1').setValue(this.auxTriaje.listaSignosAlarma[13].valorSigno as boolean)
            this.allYearFG.get('2').setValue(this.auxTriaje.listaSignosAlarma[14].valorSigno as boolean)
            this.allYearFG.get('3').setValue(this.auxTriaje.listaSignosAlarma[15].valorSigno as boolean)
            this.allYearFG.get('4').setValue(this.auxTriaje.listaSignosAlarma[16].valorSigno as boolean)
            this.allYearFG.get('5').setValue(this.auxTriaje.listaSignosAlarma[17].valorSigno as boolean)

            this.signoPeligroFG.get('presentSigns').setValue(this.auxTriaje.presentaSigno)
            this.factorRiesgoFG.get('cuidaNinio').setValue(this.auxTriaje.factorRiesgo.cuidaNinio)
            this.factorRiesgoFG.get('participaPadre').setValue(this.auxTriaje.factorRiesgo.participaPadre)
            this.factorRiesgoFG.get('recibeAfecto').setValue(this.auxTriaje.factorRiesgo.recibeAfecto)
            this.factorRiesgoFG.get('especificacion').setValue(this.auxTriaje.factorRiesgo.especificacion)

            this.anamnesisFC.setValue(this.auxTriaje.anamnesis)
            this.obsFC.setValue(this.auxTriaje.obsSignosVitales)
        })
    }

    ngOnInit(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        console.log('2')
        console.log('data', this.data)
        if (this.data.idConsulta !== '') this.recuperarData(this.data.idConsulta)
        this.buildForm()
    }

    save(): void {
        Swal.fire({
            icon: 'success',
            title: 'Actualizado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    onNext() {
        this.save()
    }
}