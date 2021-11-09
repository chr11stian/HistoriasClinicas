import { Component, OnInit } from '@angular/core';
import { Product, FechaEvaluacionAlimentacion } from '../models/EvaluacionAlimentacion';
import { EvalAlimenService } from '../service/eval-alimen.service';

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {

  products1: Product[];
  evaluacionAlimenticia: FechaEvaluacionAlimentacion[];
  constructor(private evalAlimenService: EvalAlimenService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    await this.evalAlimenService.getEvaluacionAlimenticia().then(data => this.evaluacionAlimenticia = data);
    console.log('evaluacion', this.evaluacionAlimenticia);
  }

  guardarEvaluacion(){
    console.log('entro gaurdar', this.evaluacionAlimenticia);
    
  }

  formatDate (date){
    console.log('llego format', date)
    var dateOut = new Date(date);
    return dateOut;
  }

}

