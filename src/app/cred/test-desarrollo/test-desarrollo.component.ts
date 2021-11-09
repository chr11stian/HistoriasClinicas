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
      { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
      { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
      { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
      { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
      { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
  ];
  }

}
