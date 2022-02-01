import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {
  twoOption=[
    {code:'si',name :'Si'},
    {code:'no',name:'No'}
  ]
  fechaTentativaDisabled:boolean=true;

  fechaTentativa=new Date();
  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }
  ngOnInit(): void {
    this.fechaTentativa=new Date(`${this.config.data.fechaTentativa} 00:00:00` )
    console.log(this.config.data.fechaTentativa)
  }
  cambioEstado(valor){
    console.log('----------------')
    const recojido=valor.value;
    this.fechaTentativaDisabled=recojido==='si'?false:true
  }
  save(){

  }
  cancelar(){
    this.ref.close("");
  }

}
