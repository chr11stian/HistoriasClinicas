import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.css']
})
export class LayoutPrincipalComponent implements OnInit {

  // menuActive: boolean;
  // newsActive: boolean = true;
  hidden: boolean = true;
  number: number = 9;
  constructor() { }

  ngOnInit(): void {
  }
  anchoSidebart:number=2

}
