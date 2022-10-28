import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
@Component({
  selector: 'app-pn-dialog-gesta',
  templateUrl: './pn-dialog-gesta.component.html',
  styleUrls: ['./pn-dialog-gesta.component.css']
})
export class PnDialogGestaComponent implements OnInit {

  data:any []=[];
  display: boolean = true;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    config.data.edit === undefined ? this.data = config.data : this.data = config.data.data;
  }
  ngOnInit(): void {}
  

}
