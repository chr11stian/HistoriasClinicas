import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-desarrollo',
  templateUrl: './test-desarrollo.component.html',
  styleUrls: ['./test-desarrollo.component.css']
})
export class TestDesarrolloComponent implements OnInit {

  box = []
  cols: any[];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];
  }

}
