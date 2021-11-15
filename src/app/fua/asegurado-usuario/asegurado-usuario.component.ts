import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asegurado-usuario',
  templateUrl: './asegurado-usuario.component.html',
  styleUrls: ['./asegurado-usuario.component.css']
})
export class AseguradoUsuarioComponent implements OnInit {
  twoOptions:any[];

  constructor() {
    this.twoOptions=[{code:"si",name:"si"},{
      code:"no",name:"no"
    }]
  }

  ngOnInit(): void {
  }

}
