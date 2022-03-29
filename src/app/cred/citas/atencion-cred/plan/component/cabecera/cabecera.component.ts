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
export class CabeceraComponent implements OnInit {
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
    havenPlan:boolean//tiene plan hasta el momento
    // @ViewChild(DatosGeneralesComponent) datosGenerales: DatosGeneralesComponent;
    // @ViewChild(AntecendentesComponent) antecedentes: AntecendentesComponent;
    // @ViewChild(PlanAtencionIntegralComponent) planAtencion: PlanAtencionIntegralComponent;
    // @ViewChild(EvaluacionGeneralComponent) evaluacion: EvaluacionGeneralComponent;

    constructor(private consultaGeneralService: ConsultaGeneralService) {
        this.items = [
            {label: "Datos Generales", styleClass: 'icon'},
            {label: "Antecedentes", styleClass: 'icon1'},
            {label: "Plan de Atención Integral", styleClass: 'icon2'},
            {label: "Evaluación General", styleClass: 'icon3'},
        ]
    }
    ngOnInit(): void {
        this.getQueryParams()
        this.havePlan();
    }
    getQueryParams(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.getPlan(this.data.nroDocumento)
        console.log('plan de atencion', this.data)
    }
    havePlan(){
        this.consultaGeneralService.tienePlan(this.data.nroDocumento).subscribe((resp:any)=>{
            this.havenPlan=resp.object.planAtencion==null?false:true
        })
    }
    ChangeStep(indice){
        this.stepActivado=indice
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
    stepActivado:number=0; //step por defecto
    nextPage() {
        // console.log(this.stepName)
        switch (this.indiceActivo) {
            case 0:
                this.indiceActivo=1
                this.stepActivado=1;
                break;
            case 1:
                this.indiceActivo=2
                this.stepActivado=2;
                break;
            case 2:
                this.indiceActivo=3
                this.stepActivado=3;
                break;
        }
    }
    prevPage() {
        switch (this.indiceActivo) {
            case 3:
                this.indiceActivo=2
                this.stepActivado=2;
                break;
            case 2:
                this.indiceActivo=1
                this.stepActivado=1;
                break;
            case 1:
                this.indiceActivo=0
                this.stepActivado=0;
                break;
        }
    }
}
interface data {
    name: string
    code: number
}
