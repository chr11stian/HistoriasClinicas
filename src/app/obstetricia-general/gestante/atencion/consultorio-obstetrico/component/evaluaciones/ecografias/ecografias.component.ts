import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecografias',
  templateUrl: './ecografias.component.html',
  styleUrls: ['./ecografias.component.css']
})
export class EcografiasComponent implements OnInit {

  solicitudesEco:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
