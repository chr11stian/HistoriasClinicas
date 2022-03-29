import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-evaluacion-general',
  templateUrl: './evaluacion-general.component.html',
  styleUrls: ['./evaluacion-general.component.css']
})
export class EvaluacionGeneralComponent implements OnInit {
  @Input() isFirstConsulta=false
  @Output() onChangeIndice:EventEmitter<number>=new EventEmitter<number>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirigirConsulta(){
    this.router.navigate(['/dashboard/cred/citas/atencion'])
  }

}
