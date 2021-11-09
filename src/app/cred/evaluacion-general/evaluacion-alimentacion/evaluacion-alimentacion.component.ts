import { Component, OnInit } from '@angular/core';
import { Product } from '../models/EvaluacionAlimentacion';
import { EvalAlimenService } from '../service/eval-alimen.service';

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {

  products1: Product[];
  constructor(private evalAlimenService: EvalAlimenService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    await this.evalAlimenService.getProductsSmall().then(data => this.products1 = data);
    console.log('this.products1', this.products1)

  }

  cambioProduct(event){
    console.log('enrtooo', event);
  }

  onEditInit(event) {
    console.log('event init',event)
  }

  onEditCancel(event){
    console.log('cancel edit',event)
  }
}

