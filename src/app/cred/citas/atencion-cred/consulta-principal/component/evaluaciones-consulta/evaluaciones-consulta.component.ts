import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-evaluaciones-consulta',
  templateUrl: './evaluaciones-consulta.component.html',
  styleUrls: ['./evaluaciones-consulta.component.css']
})
export class EvaluacionesConsultaComponent implements OnInit {
 tipoDocRecuperado ="";
 nroDocRecuperado = "";
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
        .subscribe(params => {
          console.log('params', params)
          if (params['nroDoc']) {
            this.tipoDocRecuperado = params['tipoDoc']
            this.nroDocRecuperado = params['nroDoc']
          } else {
            this.router.navigate(['/dashboard/cred/citas'])
          }
        })
  }
  irEvaluacionAlimenticia(){
    this.router.navigate(['/dashboard/cred/citas/atencion/test-evaluacion-alimenticia-consulta'], {
      queryParams: {
        'tipoDoc': this.tipoDocRecuperado,
        'nroDoc': this.nroDocRecuperado,
      }
    })
  }


}
