import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {dato} from "../models/data";
import {ConsultaGeneralService} from "./consulta-principal/services/consulta-general.service";

// interface queryParams {
//     nroDoc: string
//     tipoDoc: string
// }


@Component({
    selector: 'app-atencion-cred',
    templateUrl: './atencion-cred.component.html',
    styleUrls: ['./atencion-cred.component.css']
})
export class AtencionCredComponent implements OnInit {
    attributeLocalS = 'documento'
    tipoDoc: string = ''
    nroDoc: string = ''
    hidden: boolean
    data: dato
    constructor(private route: ActivatedRoute,
                private router: Router,
                private consultaGeneralService:ConsultaGeneralService ) {
    }
    isTriajeTaken:boolean=false;//si retorna con id de una consulta
    havePlan:boolean=false
    tieneTriajeAndPlan:boolean=false
    tienePlan(){
        this.consultaGeneralService.tienePlanCred(this.data.nroDocumento).subscribe((resp:any)=>{
            if (resp.cod=='2121'){
               this.havePlan=resp.object.respuesta
                this.PrimeraConsulta()
            }
        },(error)=>{
        })
    }
    PrimeraConsulta(){        
        if (this.isTriajeTaken){        
            if(this.havePlan){   
                this.tieneTriajeAndPlan=true
            }
        }
    }
    ngOnInit(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.hidden = this.data.see
        this.isTriajeTaken=!this.hidden
        this.tienePlan()

        /**this.route.queryParams
         .subscribe(params => {
                console.log('params', params)
                if (params['nroDoc']) {
                    this.tipoDoc = params['tipoDoc']
                    this.nroDoc = params['nroDoc']
                } else {
                    this.router.navigate(['/dashboard/cred/citas'])
                }
            })**/
    }

    getTriaje(): void {
        this.router.navigate(['/dashboard/cred/citas/atencion/triaje'],
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

    getPlanAtencionIntegralPrincipal(): void {
        this.router.navigate(['/dashboard/cred/citas/atencion/plan-atencion-integral'],
            {
                /**queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }**/
            })
    }

}
