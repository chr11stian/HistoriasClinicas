import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giagnosticos',
  templateUrl: './giagnosticos.component.html',
  styleUrls: ['./giagnosticos.component.css']
})
export class GiagnosticosComponent implements OnInit {

  constructor() { }


  columns: number[];

  ngOnInit() {
    this.columns = [];
  }

  addColumn() {
    this.columns.push(this.columns.length);
  }

  removeColumn() {
    this.columns.splice(-1, 1);
  }
}
