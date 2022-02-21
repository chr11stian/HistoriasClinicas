import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import Swal from "sweetalert2";
import {MotivosConsultaService} from "../../services/motivos-consulta.service";
import {dato, motivoConsultaInterface, ExamenesFisico} from "../../../../models/data";

interface formControlInterface {
    pro: string,
    label: string,
    nameFC: string
}

interface controlInterface {
    codigo: string;
    nombreForm: string;
}

@Component({
    selector: 'app-motivo-consulta',
    templateUrl: './motivo-consulta.component.html',
    styleUrls: ['./motivo-consulta.component.css']

})
export class MotivoConsultaComponent implements OnInit {
    data: dato
    attributeLocalS = 'documento'
    examFG: FormGroup;
    motivoFG: FormGroup;
    formExam: FormGroup;
    formExamNeurologico: FormGroup;
    headAlert: boolean = false;
    hairAlert: boolean = false;
    faceAlert: boolean = false;
    neckAlert: boolean = false;
    thoraxAlert: boolean = false;
    abdomenAlert: boolean = false;
    spineAlert: boolean = false;
    extremitiesAlert: boolean = false;
    genitourianAlert: boolean = false;
    anusAlert: boolean = false;
    skinAlert: boolean = false;
    olfactoryAlert: boolean = false;

    dataExamFisicos: formControlInterface[] = [
        {pro: 'temperatura', label: 'T°', nameFC: 'TFC'},
        {pro: 'presionSistolica', label: 'PS', nameFC: 'PSFC'},
        {pro: 'presionDiastolica', label: 'PD', nameFC: 'PDFC'},
        {pro: 'fc', label: 'FC:', nameFC: 'FC'},
        {pro: 'fr', label: 'FR', nameFC: 'FRFC'},
        {pro: 'peso', label: 'Peso ', nameFC: 'PesoFC'},
        {pro: 'talla', label: 'Talla ', nameFC: 'TallaFC'},
        {pro: 'imc', label: 'imc ', nameFC: 'imcFC'},
        {pro: 'perimetroCefalico', label: 'PC ', nameFC: 'PCFC'}
    ]

    ExamenFisico: controlInterface[] = [
        {
            codigo: 'PI',
            nombreForm: 'piel'
        },
        {
            codigo: 'CA',
            nombreForm: 'cabeza'
        },
        {
            codigo: 'CAR',
            nombreForm: 'cara'
        },
        {
            codigo: 'CU',
            nombreForm: 'cuello'
        },
        {
            codigo: 'TO',
            nombreForm: 'torax'
        },
        {
            codigo: 'AB',
            nombreForm: 'abdomen'
        },
        {
            codigo: 'CV',
            nombreForm: 'columnaVert'
        },
        {
            codigo: 'EX',
            nombreForm: 'extremidades'
        },
        {
            codigo: 'GE',
            nombreForm: 'genitouriano'
        },
        {
            codigo: 'AN',
            nombreForm: 'ano'
        }
    ]

    examenNeurologico: controlInterface [] = [
        {
            codigo: 'OL',
            nombreForm: 'olfatorio'
        },
        {
            codigo: 'OP',
            nombreForm: 'optico'
        },
        {
            codigo: 'OC',
            nombreForm: 'oculomotores'
        },
        {
            codigo: 'TR',
            nombreForm: 'trigemino'
        },
        {
            codigo: 'FA',
            nombreForm: 'facial'
        },
        {
            codigo: 'AU',
            nombreForm: 'auditivo'
        },
        {
            codigo: 'GL',
            nombreForm: 'glosoNeumo'
        },
        {
            codigo: 'ES',
            nombreForm: 'espinal'
        },
        {
            codigo: 'HI',
            nombreForm: 'hipogloso'
        },
    ]
    edad: number = 18;
    // genero: string = 'FEMENINO';
    genero: string = 'MASCULINO';
    motivosConsulta: motivoConsultaInterface;

    constructor(private motivosService: MotivosConsultaService) {
        this.buildFG()
        this.recuperarMotivos()
    }

    buildFG(): void {
        this.motivoFG = new FormGroup({
            detailMotivoFC: new FormControl({value: null, disabled: false}, []),
        })
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
        /** examen fisico */
        this.formExam = new FormGroup({
            piel: new FormControl(""),
            cabeza: new FormControl(""),
            cara: new FormControl(""),
            cuello: new FormControl(""),
            torax: new FormControl(""),
            abdomen: new FormControl(""),
            columnaVert: new FormControl(""),
            extremidades: new FormControl(""),
            genitouriano: new FormControl(""),
            ano: new FormControl(""),
            obsExamenFisico: new FormControl(""),
        });
        /** examen neurologico */
        this.formExamNeurologico = new FormGroup({
            olfatorio: new FormControl(""),
            optico: new FormControl(""),
            oculomotores: new FormControl(""),
            trigemino: new FormControl(""),
            facial: new FormControl(""),
            auditivo: new FormControl(""),
            glosoNeumo: new FormControl(""),
            espinal: new FormControl(""),
            hipogloso: new FormControl(""),
            obsExamenNeurologico: new FormControl(""),
        })
    }

    ngOnInit(): void {
    }

    /*  objeto motivo */
    recuperarMotivos() {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.motivosService.getMotivos(this.data.idConsulta).subscribe((r: any) => {
            //-- recupera informacion de motivos
            this.motivosConsulta = r.object;
            console.log('motivos', r)
            this.motivoFG.get('detailMotivoFC').setValue(this.motivosConsulta.motivoConsulta !== null ? this.motivosConsulta.motivoConsulta : '')

            this.examFG.get('TFC').setValue(this.motivosConsulta.signosVitales.temperatura)
            this.examFG.get('PSFC').setValue(this.motivosConsulta.signosVitales.presionSistolica)
            this.examFG.get('PDFC').setValue(this.motivosConsulta.signosVitales.presionDiastolica)
            this.examFG.get('FC').setValue(this.motivosConsulta.signosVitales.fc)
            this.examFG.get('FRFC').setValue(this.motivosConsulta.signosVitales.fr)
            this.examFG.get('PesoFC').setValue(this.motivosConsulta.signosVitales.peso)
            this.examFG.get('TallaFC').setValue(this.motivosConsulta.signosVitales.talla)
            this.examFG.get('imcFC').setValue(this.motivosConsulta.signosVitales.imc)
            this.examFG.get('PCFC').setValue(this.motivosConsulta.signosVitales.perimetroCefalico)
            this.examFG.get('detailFC').setValue(this.motivosConsulta.obsSignosVitales)

            if (this.motivosConsulta.examenesFisicos !== null) {
                this.formExam.get('piel').setValue(this.motivosConsulta.examenesFisicos[0].valor)
                this.formExam.get('cabeza').setValue(this.motivosConsulta.examenesFisicos[1].valor)
                this.formExam.get('cara').setValue(this.motivosConsulta.examenesFisicos[2].valor)
                this.formExam.get('cuello').setValue(this.motivosConsulta.examenesFisicos[3].valor)
                this.formExam.get('torax').setValue(this.motivosConsulta.examenesFisicos[4].valor)
                this.formExam.get('abdomen').setValue(this.motivosConsulta.examenesFisicos[5].valor)
                this.formExam.get('columnaVert').setValue(this.motivosConsulta.examenesFisicos[6].valor)
                this.formExam.get('extremidades').setValue(this.motivosConsulta.examenesFisicos[7].valor)
                this.formExam.get('genitouriano').setValue(this.motivosConsulta.examenesFisicos[8].valor)
                this.formExam.get('ano').setValue(this.motivosConsulta.examenesFisicos[9].valor)
                this.formExam.get('obsExamenFisico').setValue(this.motivosConsulta.obsExamenFisico)
            }

            if (this.motivosConsulta.examenNeurologico !== null) {
                this.formExamNeurologico.get('olfatorio').setValue(this.motivosConsulta.examenNeurologico[0].valor)
                this.formExamNeurologico.get('optico').setValue(this.motivosConsulta.examenNeurologico[1].valor)
                this.formExamNeurologico.get('oculomotores').setValue(this.motivosConsulta.examenNeurologico[2].valor)
                this.formExamNeurologico.get('trigemino').setValue(this.motivosConsulta.examenNeurologico[3].valor)
                this.formExamNeurologico.get('facial').setValue(this.motivosConsulta.examenNeurologico[4].valor)
                this.formExamNeurologico.get('auditivo').setValue(this.motivosConsulta.examenNeurologico[5].valor)
                this.formExamNeurologico.get('glosoNeumo').setValue(this.motivosConsulta.examenNeurologico[6].valor)
                this.formExamNeurologico.get('espinal').setValue(this.motivosConsulta.examenNeurologico[7].valor)
                this.formExamNeurologico.get('hipogloso').setValue(this.motivosConsulta.examenNeurologico[8].valor)
                this.formExamNeurologico.get('obsExamenNeurologico').setValue(this.motivosConsulta.obsExamenNeurologico)
            }
        })
    }

    save() {

        let req: motivoConsultaInterface =
            {
                motivoConsulta: this.motivoFG.value.detailMotivoFC,
                examenesFisicos: this.ExamenFisico.map((element) => {
                    return {
                        codigoExamen: element.codigo,
                        nombreExamen: element.codigo,
                        valor: this.formExam.get(element.nombreForm).value === null ? '' : this.formExam.get(element.nombreForm).value
                    }
                }),
                obsExamenFisico: this.formExam.value.obsExamenFisico,
                signosVitales: {
                    temperatura: this.examFG.value.TFC,
                    presionSistolica: this.examFG.value.PSFC,
                    presionDiastolica: this.examFG.value.PDFC,
                    fc: this.examFG.value.FC,
                    fr: this.examFG.value.FRFC,
                    peso: this.examFG.value.PesoFC,
                    talla: this.examFG.value.TallaFC,
                    imc: this.examFG.value.imcFC,
                    perimetroCefalico: this.examFG.value.PCFC
                },
                obsSignosVitales: this.examFG.value.detailFC,
                examenNeurologico: this.examenNeurologico.map((element) => {
                    return {
                        codigoExamen: element.codigo,
                        nombreExamen: element.codigo,
                        valor: this.formExamNeurologico.get(element.nombreForm).value === null ? '' : this.formExamNeurologico.get(element.nombreForm).value
                    }
                }),
                obsExamenNeurologico: this.formExamNeurologico.value.obsExamenNeurologico,
            }
        console.log('req', req)
        if (req) {
            this.motivosService.updateMotivos(this.data.idConsulta, req).subscribe(
                (resp) => {
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

    openAlert(key) {
        switch (key) {
            case 1:
                this.formExam.value.piel.length < 1 ? this.skinAlert = true : ''
                break;
            case 2:
                this.formExam.value.cabeza.length < 1 ? this.headAlert = true : ''
                break
            case 3:
                this.formExam.value.cara.length < 1 ? this.faceAlert = true : ''
                break
            case 4:
                this.formExam.value.cuello.length < 1 ? this.neckAlert = true : ''
                break
            case 5:
                this.formExam.value.torax.length < 1 ? this.thoraxAlert = true : ''
                break
            case 6:
                this.formExam.value.abdomen.length < 1 ? this.abdomenAlert = true : ''
                break
            case 7:
                this.formExam.value.columnaVert.length < 1 ? this.spineAlert = true : ''
                break
            case 8:
                this.formExam.value.extremidades.length < 1 ? this.extremitiesAlert = true : ''
                break
            case 9:
                this.formExam.value.genitouriano.length < 1 ? this.genitourianAlert = true : ''
                break
            case 10:
                this.formExam.value.ano.length < 1 ? this.anusAlert = true : ''
                break
            case 11:
                this.formExam.value.piel.length < 1 ? this.skinAlert = true : ''
                break
            case 11:
                this.formExam.value.piel.olfatorio < 1 ? this.olfactoryAlert = true : ''
                break
            default:
                break;
        }
    }
}