import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-desarrollo',
  templateUrl: './test-desarrollo.component.html',
  styleUrls: ['./test-desarrollo.component.css']
})
export class TestDesarrolloComponent implements OnInit {

  sales: any[];
  constructor() { }

  ngOnInit(): void {
    this.sales = [
      { letter: 'A', img_1mes: '../../../assets/images/tdd_imagenes_letters/1_mes/1-1mes-01.svg'}, 
      { letter: 'B', },
      { letter: 'C', },
      { letter: 'D', },
      { letter: 'E', },
      { letter: 'F', },
      { letter: 'G', },
      { letter: 'H', },
      { letter: 'I', },
      { letter: 'J', },
      { letter: 'K', },
      { letter: 'L', },
  ];
  }

  cambiarEstado(){

  }

}
