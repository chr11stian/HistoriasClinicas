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
      { letter: 'A', }, { letter: 'B', }, { letter: 'C', }, { letter: 'D', }, { letter: 'E', }, { letter: 'F', }, { letter: 'G', },
      { letter: 'H', },{ letter: 'I', },{ letter: 'J', },{ letter: 'K', },{ letter: 'L', },
  ];
  }

}
