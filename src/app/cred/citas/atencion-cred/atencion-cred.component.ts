import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {dato} from "../models/data";

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
                private router: Router) {
    }

    ngOnInit(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.hidden = this.data.see
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
