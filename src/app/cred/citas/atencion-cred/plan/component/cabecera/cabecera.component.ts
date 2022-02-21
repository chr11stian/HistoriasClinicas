import {Component, OnInit, ViewChild, DoCheck} from "@angular/core"
import {MenuItem} from "primeng/api"
import {ActivatedRoute, Router} from '@angular/router'
import {ConsultaGeneralService} from "../../../consulta-principal/services/consulta-general.service";
import {ApiPlanAtencion} from "../../../consulta-principal/models/consultaGeneral";
import {DatosGeneralesComponent} from "../datos-generales/datos-generales.component";
import {AntecendentesComponent} from "../antecendentes/antecendentes.component";
import {PlanAtencionIntegralComponent} from "../plan-atencion-integral/plan-atencion-integral.component";
import {EvaluacionGeneralComponent} from "../evaluacion-general/evaluacion-general.component";
import {dato} from "../../../../models/data";

@Component({
    selector: "app-cabecera",
    templateUrl: "./cabecera.component.html",
    styleUrls: ["./cabecera.component.css"],
})
export class CabeceraComponent implements OnInit, DoCheck {
    /* lo que reciben del paso anterior */
    data: dato
    tipoDoc: string = ''
    nroDoc: string = ''
    /** key de lo que se guarda en el local storage */
    attributeLocalS = 'documento'
    options: data[]
    selectedOption: data
    items: MenuItem[]
    indiceActivo: number = 0
    stepName = "datos"
    consulta: ApiPlanAtencion
    j: number = 100

    @ViewChild(DatosGeneralesComponent) datosGenerales: DatosGeneralesComponent;
    @ViewChild(AntecendentesComponent) antecedentes: AntecendentesComponent;
    @ViewChild(PlanAtencionIntegralComponent) planAtencion: PlanAtencionIntegralComponent;
    @ViewChild(EvaluacionGeneralComponent) evaluacion: EvaluacionGeneralComponent;

    constructor(private consultaGeneralService: ConsultaGeneralService,
                private route: ActivatedRoute,
                private router: Router) {
        this.options = [
            {name: "DNI", code: 1},
            {name: "CARNET RN", code: 2},
            {name: "C EXTRANJERIA", code: 3},
            {name: "OTROS", code: 4},
        ]
    }

    ngDoCheck() {
        //this.saveStep()
    }

    ngOnInit(): void {
        this.items = [
            {label: "Datos Generales", styleClass: 'icon'},
            {label: "Antecedentes", styleClass: 'icon1'},
            {label: "Plan de Atención Integral", styleClass: 'icon2'},
            {label: "Evaluación General", styleClass: 'icon3'},
        ]
        this.getQueryParams()
    }

    getQueryParams(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.getPlan(this.data.nroDocumento)
        console.log('plan de atencion', this.data)
    }

    getPlan(dni: string) {
        this.consultaGeneralService.traerPlan(dni).subscribe(
            result => {
                if (result.cod === '2404') {
                    this.getNuevoPlan()
                    console.log('2404', result)
                }
                if (result.cod === '2403') {
                    this.consulta = result
                    console.log('2403', result)
                }
            }, err => {
                console.log(err)
            }
        )
    }

    getNuevoPlan(): void {
        this.consultaGeneralService.crearPlan(
            {
                'tipoDoc': this.data.tipoDoc,
                'nroDoc': this.data.nroDocumento
            }
        ).toPromise().then((result) => {
            this.consulta = result
        }).catch((err) => {
            console.log(err)
        })
    }

    //--cambia los nombres de los steps según el indice
    name() {
        switch (this.indiceActivo) {
            case 3:
                this.stepName = "evaluacion"
                break
            case 2:
                this.stepName = "plan"
                break
            case 1:
                this.stepName = "antecedentes"
                break
            case 0:
                this.stepName = "datos"
                break
        }
    }

    //--cambia step
    ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name()
    }

    // pasamos al siguiente step
    nextPage() {
        switch (this.stepName) {
            case 'datos':
                this.datosGenerales.save()
                this.stepName = 'antecedentes';
                this.indiceActivo = 0;
                break;
            case 'antecedentes':
                //this.antecedentes.save()
                this.stepName = 'plan';
                this.indiceActivo = 1;
                break;
            case 'plan':
                //this.planAtencion.save()
                this.stepName = 'evaluacion';
                this.indiceActivo = 2;
                break;
            case 'evaluacion':
                //this.evaluacion.save()
                break;
        }
    }

    // regresamos al anterior step
    prevPage() {
        switch (this.stepName) {
            case 'evaluacion':
                this.stepName = 'plan';
                this.indiceActivo = 2;
                break;
            case 'plan':
                this.stepName = 'antecedentes';
                this.indiceActivo = 1;
                break;
            case 'antecedentes':
                this.stepName = 'datos';
                this.indiceActivo = 0;
                break;
        }
    }

    saveStep() {
        if (this.indiceActivo !== this.j) {
            console.log('j ', this.indiceActivo, this.j)
            switch (this.j) {
                case 3:
                    //this.evaluacion.save()
                    break
                case 2:
                    //this.planAtencion.save()
                    break
                case 1:
                    //this.antecedentes.save()
                    break
                case 0:
                    this.datosGenerales.save()
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
