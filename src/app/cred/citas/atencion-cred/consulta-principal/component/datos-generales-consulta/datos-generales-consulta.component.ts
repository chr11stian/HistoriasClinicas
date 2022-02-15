import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ConsultaGeneralService} from '../../services/consulta-general.service'
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {dato, SignosVitales, triajeInterface} from "../../../../models/data";
import {ListaConsultaService} from "../../../../services/lista-consulta.service";

interface formInterface {
    pro: string,
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
    tipoDoc: string
    nroDoc: string
    anio: number = 0
    mes: number = 0
    dia: number = 0
    triaje: triajeInterface
    fecha_hoy: Date = new Date();
    data: dato
    my: boolean = true
    id: string;
    attributeLocalS = 'documento'
    anamnesisFC = new FormControl({value: '', disabled: false})
    auxDatosGeneralesConsulta: datosGeneralesConsulta
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
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.recuperarPersona()
        this.buildForm()
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.consulta.currentValue !== changes.consulta.previousValue) {
            //this.fillForm()
        }
    }

    recuperarPersona() {
        this.consultaGeneralService.datosGenerales({
            tipoDoc: this.data.tipoDoc,
            nroDoc: this.data.nroDocumento
        }).subscribe((r: any) => {
            let nombre = r.object.primerNombre + " " + r.object.otrosNombres + " " + r.object.apePaterno + " " + r.object.apeMaterno
            this.generalInfoFG.get('name').setValue(nombre)
            this.calcularEdad(r.object.nacimiento.fechaNacimiento)
            const edad = this.anio + ' años ' + this.mes + ' meses ' + this.dia + ' dias'
            this.generalInfoFG.get('year').setValue(edad)
            this.generalInfoFG.get('dateAttention').setValue(this.fecha_hoy)
            this.generalInfoFG.get('hour').setValue(this.fecha_hoy)
        })
    }

    recuperarData(id) {
        this.consultaGeneralService.getGenerales(id).subscribe((r: any) => {
            this.auxDatosGeneralesConsulta = r.object
            console.log('datosGeneralesConsulta', this.auxDatosGeneralesConsulta)
            this.generalInfoFG.get('name').setValue(r.object.datosGeneralesConsulta.nombresApellidos)
            this.calcularEdad(r.object.datosGeneralesConsulta.fechaNacimiento)
            const edad = this.anio + ' años ' + this.mes + ' meses ' + this.dia + ' dias'
            this.generalInfoFG.get('year').setValue(edad)
            const fecha = new Date(r.object.datosGeneralesConsulta.fechaAtencionConsulta)
            this.generalInfoFG.get('dateAttention').setValue(fecha)
            this.generalInfoFG.get('hour').setValue(fecha)
            //--actualizar datos generales
            if (this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M !== null) {
                this.twoMonthsFG.get('1').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[0].valor as boolean)
                this.twoMonthsFG.get('2').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[1].valor as boolean)
                this.twoMonthsFG.get('3').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[2].valor as boolean)
                this.twoMonthsFG.get('4').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[3].valor as boolean)
                this.twoMonthsFG.get('5').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[4].valor as boolean)
                this.twoMonthsFG.get('6').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[5].valor as boolean)
                this.twoMonthsFG.get('7').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[6].valor as boolean)
                this.twoMonthsFG.get('8').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2M[7].valor as boolean)
            }
            if (this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2Ma4A !== null) {
                this.twoMonthsMoreFG.get('1').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2Ma4A[0].valor as boolean)
                this.twoMonthsMoreFG.get('2').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2Ma4A[1].valor as boolean)
                this.twoMonthsMoreFG.get('3').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2Ma4A[2].valor as boolean)
                this.twoMonthsMoreFG.get('4').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2Ma4A[3].valor as boolean)
                this.twoMonthsMoreFG.get('5').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.menor2Ma4A[4].valor as boolean)
            }
            if (this.auxDatosGeneralesConsulta.descarteSignosPeligro.todasLasEdades !== null) {
                this.allYearFG.get('1').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.todasLasEdades[0].valor as boolean)
                this.allYearFG.get('2').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.todasLasEdades[1].valor as boolean)
                this.allYearFG.get('3').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.todasLasEdades[2].valor as boolean)
                this.allYearFG.get('4').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.todasLasEdades[3].valor as boolean)
                this.allYearFG.get('5').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.todasLasEdades[4].valor as boolean)
            }
            this.signoPeligroFG.get('presentSigns').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.noPresentaSigno)
            this.factorRiesgoFG.get('cuidaNinio').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.factorRiesgo.cuidaNinio)
            this.factorRiesgoFG.get('participaPadre').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.factorRiesgo.participaPadre)
            this.factorRiesgoFG.get('recibeAfecto').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.factorRiesgo.recibeAfecto)
            this.factorRiesgoFG.get('especificacion').setValue(this.auxDatosGeneralesConsulta.descarteSignosPeligro.factorRiesgo.especificacion)

            this.anamnesisFC.setValue(this.auxDatosGeneralesConsulta.anamnesis)
        })
    }

    buildForm(): void {

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

    ngOnInit(): void {
        //if (this.id !== null) this.recuperarData(this.id);
    }

    /**
     fillForm(): void {
        this.generalInfoFG.get('name').setValue(this.consulta.datosGenerales.datosGeneralesConsulta.nombresApellidos)
        this.generalInfoFG.get('dateAttention').setValue(new Date(this.consulta.created_at.substr(0, 10)))
        this.generalInfoFG.get('hour').setValue(new Date('' + this.consulta.created_at))
        const edad = this.consulta.datosGenerales.datosGeneralesConsulta.edad
        this.generalInfoFG.get('year').setValue(edad.anio + ' años ' + edad.mes + ' meses ' + edad.dia + ' dias')
    }**/

    save(): void {

        const aux: any[] = []
        this.twoMonths.map((element, index) => {
            aux.push({
                codSigno: (index + 1) + '',
                tipoEdad: 'Menor de 2 Meses',
                nombreSigno: element.label,
                valorSigno: this.twoMonthsFG.get(element.index).value === null ? false : this.twoMonthsFG.get(element.index).value as boolean
            })
        })
        this.twoMonthsMore.map((element, index) => {
            aux.push({
                codSigno: (index + 1) + '',
                tipoEdad: 'De 2 meses a 4 años',
                nombreSigno: element.label,
                valorSigno: this.twoMonthsMoreFG.get(element.index).value === null ? false : this.twoMonthsMoreFG.get(element.index).value as boolean
            })
        })
        this.allYear.map((element, index) => {
            aux.push({
                codSigno: (index + 1) + '',
                tipoEdad: 'Para todas las edades',
                nombreSigno: element.label,
                valorSigno: this.allYearFG.get(element.index).value === null ? false : this.allYearFG.get(element.index).value as boolean
            })
        })

        let signosVitales: SignosVitales = {
            temperatura: this.examFG.value.TFC,
            presionSistolica: this.examFG.value.PSFC,
            presionDiastolica: this.examFG.value.PDFC,
            fc: this.examFG.value.FC,
            fr: this.examFG.value.FRFC,
            peso: this.examFG.value.PesoFC,
            talla: this.examFG.value.TallaFC,
            imc: this.examFG.value.imcFC,
            perimetroCefalico: this.examFG.value.PCFC
        }
        const req: triajeInterface = {
            signosVitales: signosVitales,
            listaSignosAlarma: aux,
            noPresentaSigno: this.signoPeligroFG.get('presentSigns').value,
            factorRiesgo: this.factorRiesgoFG.value,
            anamnesis: this.anamnesisFC.value,
        }

        console.log('req', req)
        if (req) {
            this.consultaService.crearConsulta(this.data.nroDocumento, req).subscribe(
                (r: any) => {
                    let data: dato = {
                        nroDocumento: this.data.nroDocumento,
                        tipoDoc: this.data.tipoDoc,
                        idConsulta: r.object.id
                    }
                    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
                    console.log('respuesta ', r)
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        }
    }

    save2(): void {

    }

    calcularEdad(fecha: string) {
        let fechaNacimiento: Date = new Date(fecha);
        let dia = fechaNacimiento.getDate()
        let mes = fechaNacimiento.getMonth() + 1
        let ano = fechaNacimiento.getFullYear()

        // cogemos los valores actuales
        let ahora_ano = this.fecha_hoy.getFullYear()
        let ahora_mes = this.fecha_hoy.getMonth() + 1;
        let ahora_dia = this.fecha_hoy.getDate();

        let edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
            edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)) {
            edad--;
        }
        if (edad >= 1900) {
            edad -= 1900;
        }

        let meses = 0;
        if (ahora_mes > mes && dia > ahora_dia)
            meses = ahora_mes - mes - 1;
        else if (ahora_mes > mes)
            meses = ahora_mes - mes
        if (ahora_mes < mes && dia < ahora_dia)
            meses = 12 - (mes - ahora_mes);
        else if (ahora_mes < mes)
            meses = 12 - (mes - ahora_mes + 1);
        if (ahora_mes == mes && dia > ahora_dia)
            meses = 11;

        // calculamos los dias
        let dias = 0;
        if (ahora_dia > dia)
            dias = ahora_dia - dia;
        if (ahora_dia < dia) {
            let ultimoDiaMes: Date = new Date(ahora_ano, ahora_mes - 1, 0);
            dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        this.anio = edad
        this.mes = meses
        this.dia = dias
    }

    onNext() {
        this.save()
    }

    cambio(e) {
        this.my = !e.value
    }

    getExamenes(): void {
        this.router.navigate(['/dashboard/cred/citas/atencion/examenes'],
            {
                /**queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }**/
            })
    }

    getConsultaPrincipal(): void {
        this.router.navigate(['/dashboard/cred/citas/atencion/consulta-principal'],
            {
                /**queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }**/
            })
    }
}

interface datosGeneralesConsulta {
    anamnesis: string,
    descarteSignosPeligro: descarteSignosPeligroInterface,
    datosGeneralesConsulta: datosGeneralesConsultaInterface
}

interface datosGeneralesConsultaInterface {
    tipoDocPaciente: string,
    nroDocPaciente: string,
    nroHistoria: string,
    nombresApellidos: string,
    fechaAtencionConsulta: string,
    hora: string,
    fechaNacimiento: string,
    fechaActual: string,
    edad: edadInterface
}

interface descarteSignosPeligroInterface {
    menor2M: menor2MInterface[],
    menor2Ma4A: menor2MInterface[],
    todasLasEdades: menor2MInterface[],
    noPresentaSigno: boolean,
    factorRiesgo: factorRiesgoInterface
}

interface factorRiesgoInterface {
    cuidaNinio: string,
    participaPadre: string,
    recibeAfecto: string,
    especificacion: string
}

interface menor2MInterface {
    codigo: string,
    valor: boolean,
    descripcion: string,
}

interface formControlInterface {
    index: string,
    label: string,
    nameFC: string
}

interface data {
    tipoDoc: string,
    nroDoc: string
}

interface edadInterface {
    anio: number,
    mes: number,
    dia: number
}

