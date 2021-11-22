import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ipress',
  templateUrl: './ipress.component.html',
  styleUrls: ['./ipress.component.css']
})
export class IpressComponent implements OnInit {
  twoOptions:any[];
  constructor() {
    this.twoOptions=[{
      name:'si',code:'si'
    },{name:'no',code:'no'}]
  }

  ngOnInit(): void {
  }

}
