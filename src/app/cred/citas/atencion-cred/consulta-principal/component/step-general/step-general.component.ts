import { Component, OnInit, ViewChild, DoCheck } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { ConsultaGeneralService } from '../../services/consulta-general.service'
import { ApiConsulta } from '../../models/consultaGeneral'
import { ActivatedRoute, Router } from '@angular/router'
import { DatosGeneralesConsultaComponent } from '../datos-generales-consulta/datos-generales-consulta.component'
import { MotivoConsultaComponent } from '../motivo-consulta/motivo-consulta.component'
import { DiagnosticoConsultaComponent } from "../diagnostico-consulta/diagnostico-consulta.component";
import { TratamientoConsultaComponent } from "../tratamiento-consulta/tratamiento-consulta.component";
import { FinalizarConsultaComponent } from "../finalizar-consulta/finalizar-consulta.component";
import { EvaluacionesConsultaComponent } from '../evaluaciones-consulta/evaluaciones-consulta.component'
import { ExamenesAuxiliaresConsultaComponent } from '../examenes-auxiliares-consulta/examenes-auxiliares-consulta.component'


@Component({
    selector: 'app-step-general',
    templateUrl: './step-general.component.html',
    styleUrls: ['./step-general.component.css']
})
export class StepGeneralComponent implements OnInit, DoCheck {
    /* lo que reciben del paso anterior */
    tipoDoc: string = ''
    nroDoc: string = ''
    /** key de lo que se guarda en el local storage */
    attributeLocalS = 'idConsulta'
    /* 61ae372a42e4dc7ba7de654e */

    options: data[]
    selectedOption: data
    items: MenuItem[]
    j: number = 100
    indiceActivo: number = 0
    stepName = 'datos'
    consulta: ApiConsulta

    @ViewChild(DatosGeneralesConsultaComponent) datosGeneralesConsulta: DatosGeneralesConsultaComponent;
    @ViewChild(MotivoConsultaComponent) motivoConsulta: MotivoConsultaComponent
    @ViewChild(DiagnosticoConsultaComponent) diagnosticoConsulta: DiagnosticoConsultaComponent
    @ViewChild(TratamientoConsultaComponent) tratamientoConsulta: TratamientoConsultaComponent
    @ViewChild(FinalizarConsultaComponent) finalizarConsulta: FinalizarConsultaComponent
    @ViewChild(EvaluacionesConsultaComponent) evaluacionesConsulta: EvaluacionesConsultaComponent
    @ViewChild(ExamenesAuxiliaresConsultaComponent) examenesAuxConsulta: ExamenesAuxiliaresConsultaComponent

    constructor(private consultaGeneralService: ConsultaGeneralService,
        private route: ActivatedRoute,
        private router: Router) {
        this.options = [
            { name: 'DNI', code: 1 },
            { name: 'CARNET RN', code: 2 },
            { name: 'C EXTRANJERIA', code: 3 },
            { name: 'OTROS', code: 4 },
        ]
    }

    ngDoCheck() {
        this.saveStep()
    }

    ngOnInit(): void {
        this.items = [
            { label: 'Datos Generales', styleClass: 'icon' },
            { label: 'Motivo de Consulta', styleClass: 'icon1' },
            { label: 'Evaluaciones', styleClass: 'icon2' },
            { label: 'Exámenes Auxiliares', styleClass: 'icon3' },
            { label: 'Diagnostico', styleClass: 'icon4' },
            { label: 'Tratamiento', styleClass: 'icon5' },
            { label: 'Finalizar', styleClass: 'icon6' },
        ]
        this.getQueryParams()
    }

    getQueryParams(): void {
        this.route.queryParams
            .subscribe(params => {
                if (params['nroDoc'] && !localStorage.getItem(this.attributeLocalS)) {
                    this.tipoDoc = params['tipoDoc']
                    this.nroDoc = params['nroDoc']
                    this.getNuevaConsulta()
                } else if (localStorage.getItem(this.attributeLocalS)) {
                    this.getConsulta(localStorage.getItem(this.attributeLocalS))
                } else {
                    this.router.navigate(['/dashboard/cred/citas'])
                }
            })
    }

    getConsulta(idConsulta: string) {
        this.consultaGeneralService.traerConsulta(idConsulta).subscribe(
            result => {
                console.log(result)
            }, err => {
                console.log(err)
            }
        )
    }

    getNuevaConsulta(): void {
        this.consultaGeneralService.crearConsulta(
            {
                'tipoDoc': this.tipoDoc,
                'nroDoc': this.nroDoc,
                'tipoDocProfesional': 'DNI',
                'nroDocProfesional': '45678912'
            }
        ).toPromise().then((result) => {
            this.consulta = result
            localStorage.setItem(this.attributeLocalS, this.consulta.object.id)
        }).catch((err) => {
            console.log(err)
        })
    }

    //--cambia los nombres de los steps según el indice
    name() {
        switch (this.indiceActivo) {
            case 6:
                this.stepName = 'finalizar'
                break
            case 5:
                this.stepName = 'tratamiento'
                break
            case 4:
                this.stepName = 'diagnostico'
                break
            case 3:
                this.stepName = 'examenesAux'
                break
            case 2:
                this.stepName = 'evaluaciones'
                break
            case 1:
                this.stepName = 'motivo'
                break
            case 0:
                this.stepName = 'datos'
                break
        }
    }

    //--cambia step
    ChangeStep(event: number) {
        this.indiceActivo = event
        this.name()
    }

    // pasamos al siguiente step
    nextPage() {
        switch (this.stepName) {
            case 'datos':
                this.datosGeneralesConsulta.save()
                this.stepName = 'motivo';
                this.indiceActivo = 1;
                break;
            case 'motivo':
                this.motivoConsulta.save()
                this.stepName = 'diagnostico';
                this.indiceActivo = 2;
                break;
            case 'evaluaciones':
                // this.evaluacionesConsulta.save()
                this.stepName = 'examenesAux';
                this.indiceActivo = 3;
                break;
            case 'examenesAux':
                // this.diagnosticoConsulta.save()
                this.stepName = 'diagnostico';
                this.indiceActivo = 4;
                break;
            case 'diagnostico':
                this.diagnosticoConsulta.save()
                this.stepName = 'tratamiento';
                this.indiceActivo = 5;
                break;
            case 'tratamiento':
                this.tratamientoConsulta.save()
                this.stepName = 'finalizar';
                this.indiceActivo = 6;
                break;
            case 'finalizar':
                this.finalizarConsulta.save()
                break;
        }
    }

    // regresamos al anterior step
    prevPage() {
        switch (this.stepName) {
            case 'finalizar':
                console.log('fi ', this.stepName)
                this.stepName = 'tratamiento';
                this.indiceActivo = 3;
                break;
            case 'tratamiento':
                this.stepName = 'diagnostico';
                this.indiceActivo = 2;
                break;
            case 'diagnostico':
                this.stepName = 'examenesAux';
                this.indiceActivo = 1;
                break;
            case 'examenesAux':
                this.stepName = 'evaluaciones';
                this.indiceActivo = 1;
                break;
            case 'evaluaciones':
                this.stepName = 'motivo';
                this.indiceActivo = 1;
                break;
            case 'motivo':
                this.stepName = 'datos';
                this.indiceActivo = 0;
                break;
        }
    }

    saveStep() {
        if (this.indiceActivo !== this.j) {
            console.log('j ', this.indiceActivo, this.j)
            switch (this.j) {
                case 6:
                    this.finalizarConsulta.save()
                    break
                case 5:
                    this.tratamientoConsulta.save()
                    break
                case 4:
                    this.diagnosticoConsulta.save()
                    break
                case 3:
                    break
                case 2:
                    break
                case 1:
                    this.motivoConsulta.save()
                    break
                case 0:
                    this.datosGeneralesConsulta.save()
                    break
            }
            this.j = this.indiceActivo
        }
    }
}

interface data {
    name: string
    code: number
}
