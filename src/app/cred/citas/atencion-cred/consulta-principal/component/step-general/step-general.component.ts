import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {ConsultaGeneralService} from '../../services/consulta-general.service'
import {ApiConsulta} from '../../models/consultaGeneral'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
    selector: 'app-step-general',
    templateUrl: './step-general.component.html',
    styleUrls: ['./step-general.component.css']
})
export class StepGeneralComponent implements OnInit {
    /* lo que reciben del paso anterior */
    tipoDoc: string = ''
    nroDoc: string = ''
    /** key de lo que se guarda en el local storage */
    attributeLocalS = 'idConsulta'
    /* 61ae372a42e4dc7ba7de654e */

    options: data[]
    selectedOption: data
    items: MenuItem[]
    indiceActivo: number = 0
    stepName = 'datos'
    consulta: ApiConsulta

    constructor(private consultaGeneralService: ConsultaGeneralService,
                private route: ActivatedRoute,
                private router: Router) {
        this.options = [
            {name: 'DNI', code: 1},
            {name: 'CARNET RN', code: 2},
            {name: 'C EXTRANJERIA', code: 3},
            {name: 'OTROS', code: 4},
        ]
    }


    ngOnInit(): void {
        this.items = [
            {label: 'Datos Generales', styleClass: 'icon'},
            {label: 'Motivo de Consulta', styleClass: 'icon1'},
            {label: 'Diagnostico', styleClass: 'icon2'},
            {label: 'Tratamiento', styleClass: 'icon3'},
            {label: 'Finalizar', styleClass: 'icon4'},
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
        console.log(this.indiceActivo)
        switch (this.indiceActivo) {
            case 4:
                this.stepName = 'finalizar'
                break
            case 3:
                this.stepName = 'tratamiento'
                break
            case 2:
                this.stepName = 'diagnostico'
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
}

interface data {
    name: string
    code: number
}
