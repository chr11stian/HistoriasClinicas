import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-descartes',
  templateUrl: './descartes.component.html',
  styleUrls: ['./descartes.component.css']
})
export class DescartesComponent implements OnInit {
  
  expandir: boolean=true; 

  constructor() { }

  ngOnInit(): void {
  }

}
