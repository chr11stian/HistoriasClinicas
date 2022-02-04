import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tepsi',
  templateUrl: './tepsi.component.html',
  styleUrls: ['./tepsi.component.css']
})
export class TepsiComponent implements OnInit {

  constructor() { }
  display:boolean[]=[false,false,false]
  selectedValues1: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues2: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues3: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];

  acumulador:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  selectedValues23: boolean[] = [false,false,false,false,false,false,false,false];
  selectedValues24: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues26: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues27: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues212: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues213: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues214: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues215: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues216: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues217: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues218: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues223: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];
  selectedValues224: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false];

  resultado:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0]
  ngOnInit(): void {
  }
  abrimosModal(index){
    console.log(index)
    this.display[index]=true
  }
  evaluandoItem(valor,indexAcumulador,indexTest,minimo){
    if (valor.checked){
      this.acumulador[indexAcumulador]+=1
    }
    else{
      this.acumulador[indexAcumulador]-=1
    }
    if (this.acumulador[indexAcumulador]===minimo) {
      this.selectedValues2[indexTest]=true;
      this.resultado[indexTest]+=2
    }
    if (this.acumulador[indexAcumulador]===minimo-1){
      this.selectedValues2[indexTest]=false;
      this.resultado[indexTest]-=2
    }
    console.log(this.acumulador)
  }
  calcularSuma(valor,nroTest){
    if (valor.checked){
      this.resultado[nroTest-1]+=2
    }
    else{
      this.resultado[nroTest-1]-=2
    }

  }
}
