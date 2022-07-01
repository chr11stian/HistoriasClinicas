import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-atencion-adulto-mayor',
  templateUrl: './atencion-adulto-mayor.component.html',
  styleUrls: ['./atencion-adulto-mayor.component.css']
})
export class AtencionAdultoMayorComponent implements OnInit {
  tipoDoc: string = ''
  nroDoc:string=''
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
            this.router.navigate(['/dashboard/adulto-mayor/citas'])
          }
        })
  }

  irConsulta() {
      this.router.navigate(['/dashboard/adulto-mayor/citas/atencion/consulta'],
          {
              queryParams: {
                  'tipoDoc': this.tipoDoc,
                  'nroDoc': this.nroDoc,
              }
          })
  }
  irPlan() {
        this.router.navigate(['/dashboard/adulto-mayor/citas/atencion/plan'],
            {
                queryParams: {
                    'tipoDoc': this.tipoDoc,
                    'nroDoc': this.nroDoc,
                }
            })
    }

  // irPlan() {
  //   this.router.navigate(['/dashboard/adulto-mayor/citas/atencion/plan'],
  //       {
  //         queryParams: {
  //           'tipoDoc': this.tipoDoc,
  //           'nroDoc': this.nroDoc,
  //         }
  //       })
  // }

}
