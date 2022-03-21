import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FinalizarConsultaService} from '../../../services/finalizar-consulta.service';
import {
    Coordinacion,
    dato,
    Personal,
    ReferenciaInterface,
    laboratorio,
    datosLaboratorio,
    ExamenesAuxiliares
} from "../../../../../models/data";
import {DatePipe} from "@angular/common";

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
    fecha: Date = new Date()
    datePipe = new DatePipe('en-US');
    data: dato
    attributeLocalS = 'documento'
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
    selectedDestino = []
    selectedEspecialidad = []
    destino = [
        {name: 'Emergencia', code: 'Emergencia'},
        {name: 'Consulta Externa', code: 'Consulta Externa'},
        {name: 'Apoyo al diagnóstico', code: 'Apoyo al diagnóstico'}
    ];
    especialidad = [
        {name: 'Pediatria', code: 'Pediatria'},
        {name: 'Cirugía', code: 'Cirugía'},
        {name: 'Gineco Obstetra', code: 'Gineco Obstetra'},
        {name: 'Laboratorio', code: 'Laboratorio'},
        {name: 'Dx. Imagen', code: 'Dx. Imagen'},
        {name: 'Otros', code: 'Otros'},
    ];
    condicion = [
        {name: 'Estable', code: 'Estable'},
        {name: 'Mal estado', code: 'Mal estado'}
    ];

    examenAux: ExamenesAuxiliares[] = []

    constructor(private formBuilder: FormBuilder,
                private referenceService: FinalizarConsultaService) {
    }

    ngOnInit(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.buildForm()
        this.inicializar()
    }

    inicializar() {
        this.referenceService.searchLaboratorio(this.data.idConsulta).subscribe((r: any) => {
            let aux: laboratorio[] = r.object;
            aux.map((obj: laboratorio) => {
                    let aux_: ExamenesAuxiliares =
                        {
                            tipoExamAux: obj.datosLaboratorio.tipoLaboratorio,
                            subTipo: obj.datosLaboratorio.subTipo,
                            nombreExamen: obj.datosLaboratorio.nombreExamen
                        }
                    this.examenAux.push(aux_)
                }
            )
        })
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
            asegurado: new FormControl(true),
            sex: new FormControl(true),
            fecha: new FormControl("", []),
            hour: new FormControl("", []),
            fechaAtencion: new FormControl("", []),
            hourAtencion: new FormControl("", []),
            tipoSub: new FormControl("", []),
            subsidiado: new FormControl("", []),
            semisubsidiado: new FormControl("", []),
            otros: new FormControl("", []),
            origen: new FormControl("", []),
            destino: new FormControl("", []),
            sis: new FormControl("", []),
            historia: new FormControl("", []),
            nombre: new FormControl("", []),
            referencia: new FormControl("", []),
            especialidad: new FormControl("", []),
            condicion: new FormControl("", []),
            nombreAtendera: new FormControl("", []),
            nombreCoordino: new FormControl("", [])
        });
    }

    imc() {
        let peso = this.examFG.value.PesoFC
        let talla = this.examFG.value.TallaFC
        this.examFG.get('imcFC').setValue(peso / (talla * talla))
    }

    save() {

        let aux: ReferenciaInterface = {
            fecha: this.datePipe.transform(this.formReferencia.value.fecha, 'yyyy-MM-dd HH:mm:ss'),
            tipoSubsidio: this.formReferencia.value.tipoSub,
            coordinacion: {
                fechaAtendera: this.datePipe.transform(this.formReferencia.value.fechaAtencion, 'yyyy-MM-dd'),
                horaAtendera: this.datePipe.transform(this.formReferencia.value.hourAtencion, 'HH:mm'),
                personalAtendera: {
                    primerNombre: this.formReferencia.value.nombreAtendera
                },
                personalCoordino: {
                    primerNombre: this.formReferencia.value.nombreCoordino
                },
                tipoReferencia: this.formReferencia.value.referencia,
                especialidad: this.formReferencia.value.especialidad,
                condicionPacienteSalida: this.formReferencia.value.condicion,
                motivo: '',
                examenesAuxiliares: this.examenAux
            }
        }
        console.log('aux', aux)
        this.referenceService.addReference(this.data.idConsulta, aux).subscribe((r: any) => {
            console.log(r)
        })

        console.log(this.selectedDestino, this.selectedEspecialidad)
    }
}

