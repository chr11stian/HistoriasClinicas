import { Component, OnInit } from '@angular/core';
import { FechaEvaluacionAlimentacion, Product, Preguntas } from '../../../../../plan/component/evaluacion-general/models/EvaluacionAlimentacion';
import {DatePipe} from "@angular/common";
import {EvaluacionAlimentacionService} from "../../services/evaluacion-alimentacion.service";
import Swal from "sweetalert2";
import {dato} from "../../../../../../models/data";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-evaluacion-alimentacion',
  templateUrl: './evaluacion-alimentacion.component.html',
  styleUrls: ['./evaluacion-alimentacion.component.css']
})
export class EvaluacionAlimentacionComponent implements OnInit {
  evaluacionAlimenticia=[];
  listaMesesEvaluar=['RN','1m','2m','3m','4m','5m','6m','7m','8m','9m','10m','11m','12m','14m','16m','18m','20m','22m','24m','27m','30m','33m','36m','39m','42m']
  listaPregunta=[
    
  ]
  constructor(){
  }
  ngOnInit(): void {
    
  } 
}