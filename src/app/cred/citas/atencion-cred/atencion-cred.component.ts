import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

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
    tipoDoc: string = ''
    nroDoc: string = ''

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                console.log('params', params)
                if (params['nroDoc']) {
                    this.tipoDoc = params['tipoDoc']
                    this.nroDoc = params['nroDoc']
                } else {
                    this.router.navigate(['/dashboard/cred/citas'])
                }
            })
    }

    getConsultaPrincipal(): void {
        this.router.navigate(['/dashboard/cred/citas/atencion/consulta-principal'],
            {
                queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }
            })
    }
    getPlanAtencionIntegral(): void {
        this.router.navigate(['/dashboard/cred/citas/atencion/plan-atencion-integral'],
            {
                queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }
            })
    }

}
