import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.css']
})
export class LayoutPrincipalComponent implements OnInit {
  hidden: boolean = false;
  ocultar:string=''
  constructor() { }
  ngOnInit(): void {
  }
  anchoSidebart(){
    if(this.hidden){
      this.ocultar='hidden'
      return 0;
    }
    else{
      this.ocultar='' 
      return 2;
    }

  }

}
